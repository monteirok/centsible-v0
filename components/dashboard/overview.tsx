import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Target } from "lucide-react"

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
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
