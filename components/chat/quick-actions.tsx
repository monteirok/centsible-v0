"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, PieChart, AlertTriangle, Lightbulb, Calculator } from "lucide-react"

interface QuickAction {
  id: string
  label: string
  prompt: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const quickActions: QuickAction[] = [
  {
    id: "spending-summary",
    label: "Spending Summary",
    prompt: "Show me my spending summary for this month",
    category: "Analysis",
    icon: PieChart,
    description: "Get a breakdown of your monthly expenses",
  },
  {
    id: "budget-status",
    label: "Budget Check",
    prompt: "How am I doing with my budget this month?",
    category: "Budget",
    icon: Calculator,
    description: "Check your budget progress and remaining amounts",
  },
  {
    id: "goal-progress",
    label: "Goal Progress",
    prompt: "What's the progress on my savings goals?",
    category: "Goals",
    icon: Target,
    description: "Review your savings goals and milestones",
  },
  {
    id: "spending-trends",
    label: "Spending Trends",
    prompt: "Show me my spending trends over the last 3 months",
    category: "Analysis",
    icon: TrendingUp,
    description: "Analyze your spending patterns over time",
  },
  {
    id: "unusual-spending",
    label: "Unusual Activity",
    prompt: "Have there been any unusual spending patterns recently?",
    category: "Insights",
    icon: AlertTriangle,
    description: "Detect anomalies in your spending behavior",
  },
  {
    id: "budget-advice",
    label: "Optimization Tips",
    prompt: "How can I optimize my budget to save more money?",
    category: "Advice",
    icon: Lightbulb,
    description: "Get personalized recommendations to improve your finances",
  },
]

interface QuickActionsProps {
  onActionClick: (prompt: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="outline"
                onClick={() => onActionClick(action.prompt)}
                className="h-auto p-4 flex flex-col items-start gap-2 text-left"
              >
                <div className="flex items-center gap-2 w-full">
                  <Icon className="h-4 w-4" />
                  <Badge variant="secondary" className="text-xs">
                    {action.category}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
