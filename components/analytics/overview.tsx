"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpendingByCategory } from "./spending-by-category"
import { SpendingTrends } from "./spending-trends"
import { BudgetAnalysis } from "./budget-analysis"
import { SavingsProjection } from "./savings-projection"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function AnalyticsOverview() {
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container space-y-6 py-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Detailed analysis of your spending habits and financial patterns.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <DateRangePicker
                initialDateFrom={date.from}
                initialDateTo={date.to}
                onUpdate={(range) => {
                  if (range?.from && range?.to) {
                    setDate({ from: range.from, to: range.to })
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,456.89</div>
                  <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,120.00</div>
                  <p className="text-xs text-muted-foreground">+2.1% from previous period</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">40.4%</div>
                  <p className="text-xs text-muted-foreground">+5.2% from previous period</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Adherence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">-3% from previous period</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Spending Trends</CardTitle>
                  <CardDescription>Your spending patterns over the selected period</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SpendingTrends />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                  <CardDescription>Breakdown of your expenses by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <SpendingByCategory />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="spending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Spending Analysis</CardTitle>
                <CardDescription>Comprehensive breakdown of your spending habits</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SpendingTrends detailed />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Analysis</CardTitle>
                <CardDescription>How well you're sticking to your budget</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="savings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Savings Projection</CardTitle>
                <CardDescription>Projected savings based on current habits</CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsProjection />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
