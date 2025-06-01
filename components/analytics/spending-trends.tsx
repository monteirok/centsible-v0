"use client"

import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const data = [
  { name: "Jan", income: 3000, expenses: 2400 },
  { name: "Feb", income: 3500, expenses: 2800 },
  { name: "Mar", income: 3200, expenses: 2900 },
  { name: "Apr", income: 4000, expenses: 3100 },
  { name: "May", income: 3800, expenses: 2800 },
  { name: "Jun", income: 4200, expenses: 3300 },
  { name: "Jul", income: 4100, expenses: 3500 },
]

const detailedData = [
  {
    name: "Week 1",
    income: 1000,
    housing: 600,
    food: 200,
    transport: 100,
    entertainment: 50,
    utilities: 150,
    other: 50,
  },
  {
    name: "Week 2",
    income: 1000,
    housing: 600,
    food: 180,
    transport: 120,
    entertainment: 70,
    utilities: 150,
    other: 30,
  },
  {
    name: "Week 3",
    income: 1000,
    housing: 600,
    food: 220,
    transport: 90,
    entertainment: 40,
    utilities: 150,
    other: 60,
  },
  {
    name: "Week 4",
    income: 1000,
    housing: 600,
    food: 190,
    transport: 110,
    entertainment: 80,
    utilities: 150,
    other: 40,
  },
]

export function SpendingTrends({ detailed = false }: { detailed?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        {!detailed ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={(value) => [`$${value}`, ""]} />
            <Legend />
            <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        ) : (
          <LineChart data={detailedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, ""]} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <Line type="monotone" dataKey="housing" stroke="#82ca9d" />
            <Line type="monotone" dataKey="food" stroke="#ffc658" />
            <Line type="monotone" dataKey="transport" stroke="#ff8042" />
            <Line type="monotone" dataKey="entertainment" stroke="#0088fe" />
            <Line type="monotone" dataKey="utilities" stroke="#00C49F" />
            <Line type="monotone" dataKey="other" stroke="#FFBB28" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  )
}
