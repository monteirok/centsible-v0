"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

const data = [
  {
    name: "Housing",
    budget: 1200,
    actual: 1250,
    status: "over",
  },
  {
    name: "Food",
    budget: 500,
    actual: 450,
    status: "under",
  },
  {
    name: "Transport",
    budget: 300,
    actual: 320,
    status: "over",
  },
  {
    name: "Entertainment",
    budget: 200,
    actual: 180,
    status: "under",
  },
  {
    name: "Utilities",
    budget: 200,
    actual: 190,
    status: "under",
  },
  {
    name: "Other",
    budget: 100,
    actual: 120,
    status: "over",
  },
]

export function BudgetAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-[400px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, ""]} />
          <Legend />
          <Bar dataKey="budget" name="Budget" fill="#8884d8" />
          <Bar dataKey="actual" name="Actual">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.status === "over" ? "#ff8042" : "#82ca9d"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
