"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, PiggyBank, Target, TrendingUp, AlertCircle, DollarSign } from "lucide-react"
import Link from "next/link"

type InsightCardProps = {
  title: string
  description: string
  action: string
  actionUrl: string
  icon: "alert" | "piggyBank" | "target" | "trending" | "warning" | "dollar"
  color: "red" | "amber" | "green" | "blue" | "purple" | "gray"
}

export function InsightCard({ title, description, action, actionUrl, icon, color }: InsightCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "alert":
        return <AlertTriangle className="h-5 w-5" />
      case "piggyBank":
        return <PiggyBank className="h-5 w-5" />
      case "target":
        return <Target className="h-5 w-5" />
      case "trending":
        return <TrendingUp className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      case "dollar":
        return <DollarSign className="h-5 w-5" />
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case "red":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      case "amber":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
      case "green":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      case "blue":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
      case "purple":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
      case "gray":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ y: -5 }}
    >
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`rounded-full p-2 ${getColorClasses()}`}>{getIcon()}</div>
            <div className="space-y-1">
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost" className="w-full">
            <Link href={actionUrl}>{action}</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
