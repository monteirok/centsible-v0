import type { Metadata } from "next"
import { InsightsOverview } from "@/components/insights/overview"

export const metadata: Metadata = {
  title: "AI Insights | BudgetTracker Pro",
  description: "AI-powered financial insights and recommendations for your finances.",
}

export default function InsightsPage() {
  return <InsightsOverview />
}
