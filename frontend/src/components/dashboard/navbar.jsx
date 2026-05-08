import React, { useState } from 'react'
import { Search, Bell, MapPin, ChevronDown, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export function DashboardNavbar() {
  const [isDark, setIsDark] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-30 px-8 flex items-center justify-between"
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search donations, NGOs, or analytics..." 
            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Location */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-primary border border-emerald-100">
          <MapPin size={16} className="animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">New York, NY</span>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-900 transition-all hover:scale-110 active:scale-95"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-900 transition-all hover:scale-110 active:scale-95">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-gray-900 leading-tight">Olive Garden</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Premium Donor</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            OG
          </div>
          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
        </div>
      </div>
    </motion.nav>
  )
}
