import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform, animate } from 'framer-motion'
import { Heart, Utensils, Users, Leaf, TrendingUp } from 'lucide-react'

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (latest) => setCount(Math.floor(latest))
    })
    return () => controls.stop()
  }, [value])

  return <span>{count.toLocaleString()}{suffix}</span>
}

const stats = [
  { label: 'Total Donations', value: 124, suffix: '+', icon: Heart, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50' },
  { label: 'Meals Saved', value: 4850, suffix: '', icon: Utensils, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
  { label: 'NGOs Served', value: 42, suffix: '', icon: Users, color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50' },
  { label: 'CO₂ Saved', value: 850, suffix: 'kg', icon: Leaf, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50' },
]

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="relative bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 group overflow-hidden"
        >
          {/* Decorative background icon */}
          <stat.icon className="absolute -right-4 -bottom-4 w-32 h-32 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-7 h-7 text-gradient bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
              {/* Fallback for icon color if gradient text fails */}
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl bg-gradient-to-br ${stat.color}`} />
            </div>
            
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
            
            <div className="flex items-baseline gap-1">
              <h3 className="text-4xl font-black text-gray-900 tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-xs">
              <div className="p-1 bg-emerald-100 rounded-lg">
                <TrendingUp size={12} />
              </div>
              <span>+12% from last month</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
