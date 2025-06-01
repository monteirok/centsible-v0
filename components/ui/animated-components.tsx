"use client"

import React from "react"

import { motion } from "framer-motion"
import { fadeIn, scale, staggerContainer, staggerItem, buttonHover, buttonTap } from "@/lib/animations"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Animated Card Components
export const AnimatedCard = motion(Card)
export const AnimatedCardHeader = motion(CardHeader)
export const AnimatedCardContent = motion(CardContent)
export const AnimatedCardFooter = motion(CardFooter)

// Animated Dialog
export const AnimatedDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => (
  <DialogContent ref={ref} className={cn("p-0 overflow-hidden", className)} {...props}>
    <motion.div initial="hidden" animate="visible" exit="exit" variants={scale} className="p-6">
      {children}
    </motion.div>
  </DialogContent>
))
AnimatedDialogContent.displayName = "AnimatedDialogContent"

// Animated Button
export const AnimatedButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, children, ...props }, ref) => (
  <Button ref={ref} className={className} {...props} asChild>
    <motion.button whileHover={buttonHover} whileTap={buttonTap}>
      {children}
    </motion.button>
  </Button>
))
AnimatedButton.displayName = "AnimatedButton"

// Animated List Container
export const AnimatedList = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className={className} {...props}>
    {children}
  </motion.div>
)

// Animated List Item
export const AnimatedListItem = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div variants={staggerItem} className={className} {...props}>
    {children}
  </motion.div>
)

// Page Transition Wrapper
export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeIn} className="h-full">
    {children}
  </motion.div>
)

// Fade In Component
export const FadeIn = ({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  [key: string]: any
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

// Slide Up Component
export const SlideUp = ({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  [key: string]: any
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 25,
      delay,
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)
