import  Sidebar  from "../components/dashboard/sidebar"
import  Header from "../components/dashboard/header"
import  StatsCards  from "../components/dashboard/stats-cards"
import  PatientTable  from "../components/dashboard/patient-table"
import  AnalyticsChart  from "../components/dashboard/analytics-chart"
import  InsightCard from "../components/dashboard/insight-card"
import  QuickActionsCard from "../components/dashboard/quick-actions-card";
import { useState } from "react";

export default function DashboardPage() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className={`${sidebarCollapsed ? "ml-20" : "ml-64"}`}>
        <Header />
        
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Good morning, Dr. Wilson
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s an overview of your practice today
            </p>
          </div>
          
          {/* Stats Cards */}
          <StatsCards />
          
          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">

  {/* LEFT SIDE (big content) */}
  <div className="lg:col-span-2 space-y-6">
    <InsightCard />
    <AnalyticsChart />
  </div>

  {/* RIGHT SIDE (sidebar content) */}
  <div className="space-y-6">
    <QuickActionsCard />   {/* ✅ ADD HERE */}
    <PatientTable />
  </div>

</div>
        </main>
      </div>
    </div>
  )
}
