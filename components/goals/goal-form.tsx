"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function GoalForm() {
  const [targetDate, setTargetDate] = useState<Date>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const goalData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      target_amount: Number.parseFloat(formData.get("target_amount") as string),
      target_date: targetDate?.toISOString().split("T")[0],
      monthly_contribution: Number.parseFloat(formData.get("monthly_contribution") as string) || 0,
    }

    console.log("Goal data:", goalData)
    // TODO: Implement API call
    alert("Goal created successfully!")
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Savings Goal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input id="title" name="title" placeholder="e.g., Emergency Fund" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" name="description" placeholder="Describe your savings goal..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target_amount">Target Amount ($)</Label>
              <Input
                id="target_amount"
                name="target_amount"
                type="number"
                step="0.01"
                placeholder="10000.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly_contribution">Monthly Contribution ($)</Label>
              <Input
                id="monthly_contribution"
                name="monthly_contribution"
                type="number"
                step="0.01"
                placeholder="500.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Target Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !targetDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {targetDate ? targetDate.toLocaleDateString() : <span>Pick a target date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={targetDate} onSelect={setTargetDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
