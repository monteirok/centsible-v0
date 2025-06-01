import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { DashboardOverview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { GoalProgress } from "@/components/dashboard/goal-progress"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { PageTransition } from "@/components/ui/animated-components"

export default function DashboardPage() {
  return (
    <PageTransition>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <DashboardOverview />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <SpendingChart />
            </div>
            <div className="col-span-3">
              <GoalProgress />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <RecentTransactions />
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="font-semibold mb-2">AI Insights</h3>
              <p className="text-sm text-muted-foreground">
                Your spending on dining out has increased by 23% this month. Consider setting a stricter budget for
                restaurants.
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </PageTransition>
  )
}
