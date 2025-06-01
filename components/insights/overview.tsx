"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsightCard } from "./insight-card"
import { RecommendationList } from "./recommendation-list"
import { SpendingInsights } from "./spending-insights"
import { SavingsInsights } from "./savings-insights"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

export function InsightsOverview() {
  const [loading, setLoading] = useState(false)

  const refreshInsights = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container space-y-6 py-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">Personalized financial insights and recommendations powered by AI.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Button onClick={refreshInsights} disabled={loading} className="flex items-center gap-2">
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Insights
          </Button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <InsightCard
                title="Unusual Spending"
                description="Your restaurant spending is 45% higher than last month."
                action="Review Transactions"
                actionUrl="/transactions"
                icon="alert"
                color="amber"
              />
              <InsightCard
                title="Savings Opportunity"
                description="You could save $120/month by reducing subscription services."
                action="View Details"
                actionUrl="#"
                icon="piggyBank"
                color="green"
              />
              <InsightCard
                title="Goal Progress"
                description="You're on track to reach your vacation savings goal 2 months early!"
                action="View Goals"
                actionUrl="/goals"
                icon="target"
                color="blue"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>This Month's Summary</CardTitle>
                <CardDescription>AI-generated summary of your financial activity</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert">
                <p>
                  This month, you've managed your finances well overall. Your total spending of $2,456 is within your
                  monthly budget, and you've saved $1,664 (40% of your income).
                </p>
                <p>
                  <strong>Positive trends:</strong> Your grocery spending decreased by 12% compared to last month, and
                  you've consistently contributed to your emergency fund.
                </p>
                <p>
                  <strong>Areas for improvement:</strong> Entertainment expenses increased by 30%, primarily due to
                  three concert ticket purchases. Consider setting a specific entertainment budget for next month.
                </p>
                <p>
                  <strong>Recommendation:</strong> Based on your spending patterns, you could increase your investment
                  contributions by $200/month without impacting your lifestyle.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="spending" className="space-y-4">
            <SpendingInsights />
          </TabsContent>
          <TabsContent value="savings" className="space-y-4">
            <SavingsInsights />
          </TabsContent>
          <TabsContent value="recommendations" className="space-y-4">
            <RecommendationList />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
