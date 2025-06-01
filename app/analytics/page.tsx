import type { Metadata } from "next"
import { AnalyticsOverview } from "@/components/analytics/overview"

export const metadata: Metadata = {
  title: "Analytics | BudgetTracker Pro",
  description: "Detailed financial analytics and insights for your spending habits.",
}

export default function AnalyticsPage() {
  return <AnalyticsOverview />
}
