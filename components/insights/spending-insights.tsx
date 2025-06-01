"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

const anomalies = [
  {
    category: "Restaurants",
    currentSpending: 450,
    averageSpending: 310,
    percentageChange: 45,
    trend: "increase",
  },
  {
    category: "Groceries",
    currentSpending: 320,
    averageSpending: 380,
    percentageChange: 16,
    trend: "decrease",
  },
  {
    category: "Entertainment",
    currentSpending: 220,
    averageSpending: 150,
    percentageChange: 47,
    trend: "increase",
  },
]

const data = [
  {
    name: "Restaurants",
    current: 450,
    average: 310,
  },
  {
    name: "Groceries",
    current: 320,
    average: 380,
  },
  {
    name: "Entertainment",
    current: 220,
    average: 150,
  },
  {
    name: "Transportation",
    current: 180,
    average: 190,
  },
  {
    name: "Shopping",
    current: 260,
    average: 240,
  },
]

export function SpendingInsights() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spending Anomalies</CardTitle>
          <CardDescription>Categories where your spending differs significantly from your average</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, ""]} />
                  <Legend />
                  <Bar dataKey="average" name="Your Average" fill="#8884d8" />
                  <Bar dataKey="current" name="Current Month">
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.current > entry.average * 1.2
                            ? "#ff8042"
                            : entry.current < entry.average * 0.8
                              ? "#82ca9d"
                              : "#ffc658"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {anomalies.map((anomaly, index) => (
                <motion.div
                  key={anomaly.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-medium">{anomaly.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {anomaly.trend === "increase"
                          ? `${anomaly.percentageChange}% higher than your average`
                          : `${anomaly.percentageChange}% lower than your average`}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Current</p>
                        <p
                          className={
                            anomaly.trend === "increase"
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }
                        >
                          ${anomaly.currentSpending}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Average</p>
                        <p className="text-muted-foreground">${anomaly.averageSpending}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spending Patterns</CardTitle>
          <CardDescription>AI analysis of your spending habits</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert">
          <p>
            <strong>Weekend spending:</strong> You tend to spend 65% more on weekends compared to weekdays, primarily on
            dining out and entertainment.
          </p>
          <p>
            <strong>End-of-month behavior:</strong> Your spending increases by approximately 30% during the last week of
            each month.
          </p>
          <p>
            <strong>Subscription timing:</strong> Most of your subscription payments (80%) occur in the first week of
            the month, creating a potential cash flow constraint.
          </p>
          <p>
            <strong>Recommendation:</strong> Consider spreading out subscription renewals throughout the month to better
            manage cash flow.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
