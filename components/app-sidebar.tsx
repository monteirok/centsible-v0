"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  PlusCircle,
  Target,
  Upload,
  BarChart3,
  CreditCard,
  TrendingUp,
  MessageCircle,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Transactions", url: "/transactions", icon: CreditCard },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Add Transaction", url: "/transactions/new", icon: PlusCircle },
      { title: "Goals", url: "/goals", icon: Target },
      { title: "Upload Receipt", url: "/upload", icon: Upload },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "AI Insights", url: "/insights", icon: TrendingUp },
      { title: "Chat Assistant", url: "/chat", icon: MessageCircle },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            <TrendingUp className="h-4 w-4" />
          </motion.div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">BudgetTracker Pro</span>
            <span className="truncate text-xs text-muted-foreground">Smart Finance</span>
          </div>
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
          >
            <SidebarGroup>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: groupIndex * 0.1 + itemIndex * 0.05 + 0.2, duration: 0.5 }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                          <Link href={item.url}>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <item.icon className="h-4 w-4" />
                            </motion.div>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </motion.div>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/profile">
                  <User className="h-4 w-4" />
                  <span>Profile & Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </motion.div>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
