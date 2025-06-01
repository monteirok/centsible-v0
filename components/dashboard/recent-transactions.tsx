import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const transactions = [
  {
    id: "1",
    description: "Starbucks Coffee",
    amount: -4.95,
    category: "Food & Dining",
    date: "2024-01-15",
    type: "expense",
  },
  {
    id: "2",
    description: "Salary Deposit",
    amount: 2600.0,
    category: "Income",
    date: "2024-01-15",
    type: "income",
  },
  {
    id: "3",
    description: "Uber Ride",
    amount: -12.5,
    category: "Transportation",
    date: "2024-01-14",
    type: "expense",
  },
  {
    id: "4",
    description: "Amazon Purchase",
    amount: -89.99,
    category: "Shopping",
    date: "2024-01-14",
    type: "expense",
  },
  {
    id: "5",
    description: "Gym Membership",
    amount: -29.99,
    category: "Health & Fitness",
    date: "2024-01-13",
    type: "expense",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/transactions">
            View All
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {transaction.category}
                </Badge>
                <span
                  className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
