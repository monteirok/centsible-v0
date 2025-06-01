import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

const goals = [
  {
    id: "1",
    title: "Emergency Fund",
    target: 10000,
    current: 6800,
    deadline: "2024-12-31",
  },
  {
    id: "2",
    title: "Vacation to Japan",
    target: 5000,
    current: 2100,
    deadline: "2024-08-15",
  },
  {
    id: "3",
    title: "New Laptop",
    target: 2000,
    current: 1650,
    deadline: "2024-03-01",
  },
]

export function GoalProgress() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Savings Goals</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/goals">
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-muted-foreground">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{progress.toFixed(1)}% complete</span>
                  <span>Due: {goal.deadline}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
