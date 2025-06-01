"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const recommendations = [
  {
    id: 1,
    title: "Reduce subscription services",
    description:
      "You're currently spending $65/month on streaming services. Consider consolidating to save approximately $25/month.",
    impact: "Save $300/year",
    category: "Spending",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Increase retirement contributions",
    description:
      "Based on your current savings rate, you could increase your 401(k) contributions by 2% without significantly impacting your monthly budget.",
    impact: "Grow retirement by $15,000 over 10 years",
    category: "Savings",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Refinance your student loans",
    description:
      "Current interest rates are lower than your existing student loan rate. Refinancing could save you money over the life of the loan.",
    impact: "Save $2,500 over the loan term",
    category: "Debt",
    difficulty: "Medium",
  },
  {
    id: 4,
    title: "Set up automatic transfers to savings",
    description:
      "Based on your cash flow, you could automatically transfer $100 more per month to your savings account.",
    impact: "Save $1,200 more per year",
    category: "Automation",
    difficulty: "Easy",
  },
  {
    id: 5,
    title: "Review your cell phone plan",
    description:
      "You're consistently using less data than your plan provides. Switching to a lower-tier plan could reduce your monthly bill.",
    impact: "Save $120/year",
    category: "Spending",
    difficulty: "Easy",
  },
]

export function RecommendationList() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>AI-generated suggestions to improve your financial health</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{recommendation.title}</h3>
                    <Badge variant="outline">{recommendation.category}</Badge>
                    <Badge
                      variant={
                        recommendation.difficulty === "Easy"
                          ? "success"
                          : recommendation.difficulty === "Medium"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {recommendation.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">{recommendation.impact}</p>
                </div>
                <div className="flex shrink-0 gap-2 pt-2 md:pt-0">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Accept</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
