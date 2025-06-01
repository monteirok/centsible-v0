"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Trash2, Download, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  context?: any
}

interface QuickAction {
  id: string
  label: string
  prompt: string
  category: string
}

const quickActions: QuickAction[] = [
  {
    id: "spending-summary",
    label: "Monthly Spending Summary",
    prompt: "Show me my spending summary for this month",
    category: "Analysis",
  },
  {
    id: "budget-status",
    label: "Budget Status",
    prompt: "How am I doing with my budget this month?",
    category: "Budget",
  },
  {
    id: "goal-progress",
    label: "Goal Progress",
    prompt: "What's the progress on my savings goals?",
    category: "Goals",
  },
  {
    id: "spending-trends",
    label: "Spending Trends",
    prompt: "Show me my spending trends over the last 3 months",
    category: "Analysis",
  },
  {
    id: "unusual-spending",
    label: "Unusual Spending",
    prompt: "Have there been any unusual spending patterns recently?",
    category: "Insights",
  },
  {
    id: "budget-advice",
    label: "Budget Optimization",
    prompt: "How can I optimize my budget to save more money?",
    category: "Advice",
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI Finance Manager. I can help you analyze your spending, track your goals, and provide personalized financial advice. What would you like to know about your finances today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const sendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim()
    if (!content) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Simulate AI response for now
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(content),
          sender: "ai",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error getting AI response:", error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
      setIsLoading(false)
    }
  }

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("spending") || lowerInput.includes("spent")) {
      return `Based on your recent transactions, here's your spending breakdown for this month:

**Total Spent:** $3,847.23

**Top Categories:**
• Food & Dining: $1,234.50 (32%)
• Transportation: $567.80 (15%)
• Shopping: $445.20 (12%)
• Entertainment: $289.15 (7%)
• Utilities: $234.67 (6%)

You're spending 23% more on dining compared to last month. Consider meal planning to reduce restaurant expenses.`
    }

    if (lowerInput.includes("budget") || lowerInput.includes("limit")) {
      return `Here's your current budget status:

**Monthly Budget:** $4,500
**Spent So Far:** $3,847.23 (85%)
**Remaining:** $652.77

**Category Status:**
• Food & Dining: 89% used (⚠️ Close to limit)
• Transportation: 67% used (✅ On track)
• Shopping: 78% used (⚠️ Monitor closely)
• Entertainment: 45% used (✅ Good)

**Recommendation:** You're close to your dining budget limit. Consider cooking at home more often this week.`
    }

    if (lowerInput.includes("goal") || lowerInput.includes("save")) {
      return `Here's your savings goals progress:

**Emergency Fund**
• Target: $10,000
• Current: $6,800 (68%)
• Monthly contribution: $400
• On track to complete by: October 2024

**Vacation Fund**
• Target: $5,000
• Current: $2,100 (42%)
• Monthly contribution: $500
• Target date: August 2024 (⚠️ Behind schedule)

**New Laptop**
• Target: $2,000
• Current: $1,650 (83%)
• Almost there! Just $350 to go.

**Suggestion:** Increase your vacation fund contribution to $650/month to stay on track.`
    }

    if (lowerInput.includes("trend") || lowerInput.includes("pattern")) {
      return `Here are your spending trends over the last 3 months:

**Monthly Comparison:**
• January: $3,654 (↓ 5% from December)
• February: $4,123 (↑ 13% from January)
• March: $3,847 (↓ 7% from February)

**Notable Patterns:**
• Dining expenses peak on weekends
• Transportation costs increased 15% (gas prices)
• You spend 40% more during the first week of each month
• Entertainment spending is seasonal (higher in winter)

**Insight:** Your spending is relatively stable, but there's room to optimize weekend dining habits.`
    }

    if (lowerInput.includes("unusual") || lowerInput.includes("anomaly")) {
      return `I've detected some unusual spending patterns:

**Recent Anomalies:**
• $289.99 Amazon purchase (3x your typical online shopping)
• $156 Uber rides in one day (unusual for you)
• $89 restaurant bill (2x your average meal cost)

**Spending Spikes:**
• 45% increase in entertainment last weekend
• Grocery spending down 30% (eating out more?)

**Recommendation:** The Amazon purchase seems like a one-time expense, but consider if the increased dining out is intentional or habitual.`
    }

    if (lowerInput.includes("optimize") || lowerInput.includes("advice") || lowerInput.includes("save more")) {
      return `Here are personalized recommendations to optimize your budget:

**Quick Wins:**
• Cook 2 more meals at home per week → Save $120/month
• Use public transport twice a week → Save $80/month
• Cancel unused subscriptions → Save $45/month

**Medium-term Strategies:**
• Set up automatic transfers to savings on payday
• Use the 24-hour rule for purchases over $100
• Track daily expenses with photos of receipts

**Long-term Goals:**
• Build an emergency fund to 6 months of expenses
• Consider investing surplus savings in index funds
• Review and negotiate insurance rates annually

**Potential Monthly Savings:** $245 with these changes!`
    }

    return `I can help you with various financial topics:

• **Spending Analysis** - Track where your money goes
• **Budget Management** - Stay on top of your limits
• **Goal Tracking** - Monitor your savings progress
• **Financial Insights** - Discover spending patterns
• **Personalized Advice** - Get recommendations for your situation

What specific aspect of your finances would you like to explore?`
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm your AI Finance Manager. I can help you analyze your spending, track your goals, and provide personalized financial advice. What would you like to know about your finances today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ])
  }

  const exportChat = () => {
    const chatContent = messages
      .map((msg) => `[${msg.timestamp.toLocaleString()}] ${msg.sender.toUpperCase()}: ${msg.content}`)
      .join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `finance-chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Bot className="h-5 w-5" />
            </motion.div>
            <div>
              <h2 className="font-semibold">AI Finance Manager</h2>
              <p className="text-sm text-muted-foreground">Your personal financial advisor</p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={exportChat}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={clearChat}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="border-b p-4"
      >
        <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 400, damping: 25 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="sm" onClick={() => sendMessage(action.prompt)} className="text-xs">
                <Badge variant="secondary" className="mr-2 text-xs">
                  {action.category}
                </Badge>
                {action.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn("flex gap-3", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                {message.sender === "ai" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Bot className="h-4 w-4" />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-3",
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted border",
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </motion.div>
                {message.sender === "user" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted"
                  >
                    <User className="h-4 w-4" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-3 justify-start"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted border rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Analyzing your financial data...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="border-t p-4"
      >
        <div className="flex gap-3">
          <Input
            ref={inputRef}
            placeholder="Ask me anything about your finances..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            className="flex-1"
            disabled={isLoading}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => sendMessage()} disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
      </motion.div>
    </div>
  )
}
