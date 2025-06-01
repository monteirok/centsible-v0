"use client"

import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Housing", value: 1200, color: "#8884d8" },
  { name: "Food", value: 450, color: "#82ca9d" },
  { name: "Transportation", value: 300, color: "#ffc658" },
  { name: "Entertainment", value: 200, color: "#ff8042" },
  { name: "Utilities", value: 180, color: "#0088fe" },
  { name: "Other", value: 120, color: "#00C49F" },
]

export function SpendingByCategory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
