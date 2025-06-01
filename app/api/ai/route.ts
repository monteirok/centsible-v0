import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    const supabase = createClient()

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user's financial data for context
    const [transactionsResult, goalsResult] = await Promise.all([
      supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false })
        .limit(10),
      supabase.from("goals").select("*").eq("user_id", user.id).eq("status", "active"),
    ])

    const transactions = transactionsResult.data || []
    const goals = goalsResult.data || []

    // Calculate financial summary
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.transaction_date)
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
    })

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.transaction_type === "income")
      .reduce((sum, t) => sum + t.amount, 0)

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.transaction_type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    // Create context for AI
    const context = {
      monthlyIncome,
      monthlyExpenses,
      recentTransactions: transactions.slice(0, 5),
      activeGoals: goals,
      totalGoals: goals.length,
      completedGoalsPercentage:
        goals.length > 0 ? goals.filter((g) => g.current_amount >= g.target_amount).length / goals.length : 0,
    }

    // Generate AI response using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a helpful AI financial advisor. You have access to the user's financial data and should provide personalized advice based on their spending patterns, goals, and financial situation. Be concise, helpful, and encouraging.

Current financial context:
- Monthly income: $${monthlyIncome.toFixed(2)}
- Monthly expenses: $${monthlyExpenses.toFixed(2)}
- Active goals: ${goals.length}
- Recent transactions: ${transactions.length}

Provide specific, actionable advice based on their actual financial data.`,
      prompt: message,
    })

    // Save the conversation to the database
    await supabase.from("chat_messages").insert([
      {
        user_id: user.id,
        content: message,
        sender: "user",
        context,
      },
      {
        user_id: user.id,
        content: text,
        sender: "ai",
        context,
      },
    ])

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI API error:", error)
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 })
  }
}
