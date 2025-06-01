import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, DollarSign } from "lucide-react"

const goals = [
  {
    id: "1",
    title: "Emergency Fund",
    description: "Build a 6-month emergency fund for financial security",
    target: 10000,
    current: 6800,
    deadline: "2024-12-31",
    status: "on-track",
    monthlyContribution: 400,
  },
  {
    id: "2",
    title: "Vacation to Japan",
    description: "Save for a 2-week trip to Japan including flights and accommodation",
    target: 5000,
    current: 2100,
    deadline: "2024-08-15",
    status: "behind",
    monthlyContribution: 500,
  },
  {
    id: "3",
    title: "New Laptop",
    description: "MacBook Pro for work and personal projects",
    target: 2000,
    current: 1650,
    deadline: "2024-03-01",
    status: "ahead",
    monthlyContribution: 200,
  },
  {
    id: "4",
    title: "House Down Payment",
    description: "Save 20% down payment for first home purchase",
    target: 50000,
    current: 12500,
    deadline: "2026-06-01",
    status: "on-track",
    monthlyContribution: 1200,
  },
]

export function GoalsList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {goals.map((goal) => {
        const progress = (goal.current / goal.target) * 100
        const remaining = goal.target - goal.current
        const monthsRemaining = Math.ceil(
          (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30),
        )

        return (
          <Card key={goal.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
              <Badge
                variant={goal.status === "ahead" ? "default" : goal.status === "behind" ? "destructive" : "secondary"}
              >
                {goal.status === "ahead" ? "Ahead" : goal.status === "behind" ? "Behind" : "On Track"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{progress.toFixed(1)}% complete</span>
                  <span>${remaining.toLocaleString()} remaining</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Monthly Contribution</p>
                  <p className="font-medium">${goal.monthlyContribution}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deadline</p>
                  <p className="font-medium">{goal.deadline}</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {monthsRemaining > 0 ? (
                  <p>
                    {monthsRemaining} months remaining • Need ${Math.ceil(remaining / monthsRemaining)}/month to reach
                    goal
                  </p>
                ) : (
                  <p>Goal deadline has passed</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add Money
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
