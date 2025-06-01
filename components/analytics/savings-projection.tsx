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
  ReferenceLine,
} from "recharts"

const data = [
  { month: "Jan", savings: 600, projected: 600 },
  { month: "Feb", savings: 1300, projected: 1200 },
  { month: "Mar", savings: 1900, projected: 1800 },
  { month: "Apr", savings: 2700, projected: 2400 },
  { month: "May", savings: 3500, projected: 3000 },
  { month: "Jun", savings: null, projected: 3600 },
  { month: "Jul", savings: null, projected: 4200 },
  { month: "Aug", savings: null, projected: 4800 },
  { month: "Sep", savings: null, projected: 5400 },
  { month: "Oct", savings: null, projected: 6000 },
  { month: "Nov", savings: null, projected: 6600 },
  { month: "Dec", savings: null, projected: 7200 },
]

export function SavingsProjection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-[400px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, ""]} />
          <Legend />
          <ReferenceLine y={5000} label="Goal: $5,000" stroke="red" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="savings"
            name="Actual Savings"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="projected" name="Projected Savings" stroke="#82ca9d" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
