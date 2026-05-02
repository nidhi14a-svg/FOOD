import { useState } from "react";

// FIXED imports (removed @/)
import Sidebar from "../components/dashboard/sidebar";
import Header from "../components/dashboard/header";
import AnalyticsStatsCards from "../components/analytics/analytics-stats-cards";
import DiseasesChart from "../components/analytics/diseases-chart";
import PatientTrendsChart from "../components/analytics/patient-trends-chart";
import InsightCard from "../components/analytics/insight-card";

export default function AnalyticsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <Header sidebarCollapsed={sidebarCollapsed} />

      <main
        className={`pt-0 transition-all duration-200 ${
          sidebarCollapsed ? "pl-20" : "pl-64"
        }`}
      >
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-500">Healthcare metrics and insights</p>
          </div>

          <div className="space-y-6">
            {/* Stats Cards */}
            <AnalyticsStatsCards />

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <DiseasesChart />
              <PatientTrendsChart />
            </div>

            {/* Insight Card */}
            <InsightCard />
          </div>
        </div>
      </main>
    </div>
  );
}