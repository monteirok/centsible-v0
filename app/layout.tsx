import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientRootLayout from "./clientLayout"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BudgetTracker Pro - Smart Personal Finance Management",
  description: "AI-powered budgeting and spending tracker with OCR receipt scanning and intelligent financial insights",
  keywords: "budgeting, finance, spending tracker, AI, OCR, personal finance",
  generator: "v0.dev",
}

export default function RootLayout({ children,}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRootLayout>
          {children}
        </ClientRootLayout>

        {/* VERCEL */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
