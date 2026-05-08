import React from 'react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts'
import { motion } from 'framer-motion'

const weeklyData = [
  { day: 'Mon', donations: 12 },
  { day: 'Tue', donations: 19 },
  { day: 'Wed', donations: 15 },
  { day: 'Thu', donations: 22 },
  { day: 'Fri', donations: 30 },
  { day: 'Sat', donations: 25 },
  { day: 'Sun', donations: 18 },
]

const categoryData = [
  { name: 'Cooked Food', value: 45 },
  { name: 'Raw Materials', value: 30 },
  { name: 'Packaged', value: 25 },
]

const COLORS = ['#10b981', '#34d399', '#6ee7b7']

export function AnalyticsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Weekly Trends */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-xl font-black text-gray-900">Weekly Donations</h4>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Last 7 Days Performance</p>
          </div>
          <div className="px-4 py-2 bg-emerald-50 text-primary text-xs font-black rounded-xl">
            +24% Growth
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                itemStyle={{ color: '#10b981', fontWeight: 700 }}
              />
              <Area 
                type="monotone" 
                dataKey="donations" 
                stroke="#10b981" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorDonations)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Category Distribution */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-xl font-black text-gray-900">Food Categories</h4>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Donation Distribution</p>
          </div>
        </div>

        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={8}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+18px)] text-center">
            <p className="text-3xl font-black text-gray-900">100%</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rescued</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
