import { useState } from "react"
import  Sidebar  from "../components/dashboard/sidebar"
import { Search, Bell, AlertTriangle } from "lucide-react"
import  CriticalAlerts from "../components/emergency/critical-alerts"
import  EmergencyAccess  from "../components/emergency/emergency-access"

export default function EmergencyDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Header */}
      <header
        className={`fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6 transition-all duration-200 ${
          sidebarCollapsed ? "left-20" : "left-64"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Emergency Dashboard</h1>
          </div>
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            5 Critical Cases
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patients..."
              className="h-10 w-64 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-xl p-2.5 text-muted-foreground transition duration-200 hover:bg-secondary hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-200 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Real-time monitoring and quick access to patient emergency information
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Section - Critical Alerts */}
            <CriticalAlerts />

            {/* Right Section - Emergency Access */}
            <EmergencyAccess />
          </div>
        </div>
      </main>
    </div>
  )
}