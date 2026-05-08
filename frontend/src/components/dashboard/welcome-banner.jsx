import React from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Quote } from 'lucide-react'

export function WelcomeBanner({ setPage }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full bg-gradient-to-r from-emerald-600 to-primary p-12 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-primary/20"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {greeting}, Rajesh!
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Ready to make an <span className="text-emerald-200">Impact</span> today?
          </h1>
          
          <div className="flex items-start gap-4 text-white/80 italic font-medium max-w-lg">
            <Quote className="flex-shrink-0 opacity-40" size={24} />
            <p className="text-lg">
              "We make a living by what we get, but we make a life by what we give."
            </p>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPage('add-food')}
          className="group flex items-center gap-4 bg-white text-primary px-8 py-5 rounded-[2.5rem] font-black text-lg shadow-xl shadow-black/10 hover:bg-emerald-50 transition-all"
        >
          <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
            <PlusCircle size={24} />
          </div>
          Quick Donation
        </motion.button>
      </div>
    </motion.div>
  )
}
