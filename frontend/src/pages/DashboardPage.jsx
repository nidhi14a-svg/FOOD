import React from 'react'
import { motion } from 'framer-motion'

import { WelcomeBanner } from '../components/dashboard/welcome-banner'
import { StatsSection } from '../components/dashboard/stats-card'
import { AnalyticsSection } from '../components/dashboard/analytics-charts'
import { SmartSuggestions, ImpactSection } from '../components/dashboard/smart-suggestions'
import { ActivityFeed, NGORequestsPanel } from '../components/dashboard/activity-feed'

export default function DonorDashboard({ setPage }) {
  return (
    <div className="w-full min-h-screen bg-gray-50/30 pb-24">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        {/* 1. Welcome Banner */}
        <section className="mb-12">
          <WelcomeBanner setPage={setPage} />
        </section>

        {/* 2. Statistics Cards */}
        <section className="mb-12">
          <StatsSection />
        </section>

        {/* 3. Analytics Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8 ml-2">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Performance Overview</h3>
          </div>
          <AnalyticsSection />
        </section>

        {/* 4. Activity & Requests Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 h-full">
            <ActivityFeed />
          </div>
          <div className="lg:col-span-2 h-full">
            <NGORequestsPanel setPage={setPage} />
          </div>
        </section>

        {/* 5. Smart Suggestions Widget */}
        <section className="mb-12">
          <SmartSuggestions setPage={setPage} />
        </section>

        {/* 6. Impact Section */}
        <section>
          <div className="flex items-center gap-3 mb-8 ml-2">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Social Contributions</h3>
          </div>
          <ImpactSection setPage={setPage} />
        </section>
      </div>
    </div>
  )
}
