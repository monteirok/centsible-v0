export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  type: "income" | "expense"
  merchant?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Goal {
  id: string
  title: string
  description: string
  target: number
  current: number
  deadline: string
  status: "on-track" | "behind" | "ahead" | "completed"
  monthlyContribution: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  type: "income" | "expense"
  budget?: number
  color?: string
}

export interface User {
  id: string
  email: string
  name: string
  preferences: {
    currency: string
    timezone: string
    notifications: boolean
  }
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  context?: any
}
