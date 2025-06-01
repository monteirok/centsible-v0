"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Target } from "lucide-react"
import { motion } from "framer-motion"
import { SlideUp } from "@/components/ui/animated-components"

const stats = [
  {
    title: "Total Balance",
    value: "$12,345.67",
    change: "+2.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Monthly Income",
    value: "$5,200.00",
    change: "+8.2%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Monthly Expenses",
    value: "$3,847.23",
    change: "-1.4%",
    trend: "down",
    icon: TrendingDown,
  },
  {
    title: "Savings Goal",
    value: "68%",
    change: "On track",
    trend: "up",
    icon: Target,
  },
]

export function DashboardOverview() {
  return (
    <>
      {stats.map((stat, index) => (
        <SlideUp key={stat.title} delay={index * 0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <motion.div
                whileHover={{ rotate: stat.trend === "up" ? 15 : -15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="text-2xl font-bold"
              >
                {stat.value}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change} from last month
              </motion.p>
            </CardContent>
          </Card>
        </SlideUp>
      ))}
    </>
  )
}
