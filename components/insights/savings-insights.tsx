"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Progress } from "@/components/ui/progress"

const savingsData = [
  { month: "Jan", actual: 600, optimal: 800 },
  { month: "Feb", actual: 700, optimal: 800 },
  { month: "Mar", actual: 800, optimal: 800 },
  { month: "Apr", actual: 900, optimal: 800 },
  { month: "May", actual: 750, optimal: 800 },
  { month: "Jun", actual: 850, optimal: 800 },
  { month: "Jul", actual: 950, optimal: 800 },
  { month: "Aug", actual: null, optimal: 800 },
  { month: "Sep", actual: null, optimal: 800 },
  { month: "Oct", actual: null, optimal: 800 },
  { month: "Nov", actual: null, optimal: 800 },
  { month: "Dec", actual: null, optimal: 800 },
]

const goals = [
  {
    name: "Emergency Fund",
    current: 8500,
    target: 10000,
    percentage: 85,
    timeToCompletion: "2 months",
  },
  {
    name: "Vacation",
    current: 2200,
    target: 3000,
    percentage: 73,
    timeToCompletion: "3 months",
  },
  {
    name: "New Car",
    current: 5000,
    target: 15000,
    percentage: 33,
    timeToCompletion: "10 months",
  },
]

export function SavingsInsights() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Savings Rate Analysis</CardTitle>
          <CardDescription>How your savings compare to recommended amounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={savingsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, ""]} />
                <Legend />
                <ReferenceLine y={800} label="Recommended" stroke="#ff7300" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="actual" name="Your Savings" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="optimal" name="Optimal Rate" stroke="#82ca9d" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium">Savings Rate: 22% of Income</p>
            <Progress value={22} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="font-medium text-amber-500">Recommended: 20%</span>
              <span>50%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Goal Progress</CardTitle>
          <CardDescription>AI analysis of your savings goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{goal.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={goal.percentage} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span
                    className={
                      goal.percentage >= 75
                        ? "text-green-500"
                        : goal.percentage >= 50
                          ? "text-amber-500"
                          : "text-muted-foreground"
                    }
                  >
                    {goal.percentage}% complete
                  </span>
                  <span className="text-muted-foreground">Estimated completion: {goal.timeToCompletion}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <h3 className="font-medium">AI Recommendation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on your current savings rate and spending patterns, you could increase your monthly contribution to
              your New Car goal by $150 without impacting your other financial goals. This would reduce your estimated
              completion time by 3 months.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
