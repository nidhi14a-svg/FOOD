import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Zap, TrendingUp, Award, Leaf, Users, Globe, Smile, AlertCircle, MapPin } from 'lucide-react'
import { ShareImpactModal } from './share-impact-modal'

const suggestions = [
  { id: 1, text: 'Donate within 30 mins for extra impact points!', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 2, text: 'Rice expires soon (in 2 days). Donate now?', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 3, text: 'Safe Hands NGO is only 200m away. Open for pickup.', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50' },
]

export function SmartSuggestions({ setPage }) {
  const handleAction = (text) => {
    if (text.includes('Donate')) {
      setPage('add-food');
    } else {
      alert(`AI Action Triggered: ${text}\nOptimizing your pickup route...`);
    }
  };

  return (
    <div className="bg-gray-950 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="max-w-xs text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary rounded-xl text-white">
              <Lightbulb size={24} />
            </div>
            <h4 className="text-2xl font-black">Smart Actions</h4>
          </div>
          <p className="text-gray-400 font-medium leading-relaxed">
            Our AI analyzes your inventory and nearby needs to suggest the most impactful donations.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestions.map((s, index) => (
            <motion.div 
              key={s.id}
              onClick={() => handleAction(s.text)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon className={s.color} size={24} />
              </div>
              <p className="text-sm font-bold text-gray-200 leading-relaxed">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ImpactSection({ setPage }) {
  const handleShare = () => {
    setPage('share-impact')
  };

  return (
    <>
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-12 rounded-[4rem] border border-emerald-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Globe size={300} />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-gray-900 mb-4"
            >
              Your Global <span className="text-primary">Impact</span>
            </motion.h4>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">Sustainability Milestone Reach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'People Fed', value: '12,450', icon: Smile, color: 'text-pink-500' },
              { label: 'Food Rescued', value: '4.8 Tons', icon: Leaf, color: 'text-emerald-500' },
              { label: 'Environmental Impact', value: '92%', icon: Award, color: 'text-blue-500' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-white shadow-xl shadow-gray-200/50 mb-6 text-primary">
                  <item.icon size={40} className={item.color} />
                </div>
                <h5 className="text-3xl font-black text-gray-900 mb-1">{item.value}</h5>
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-emerald-100/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white text-xs font-black shadow-lg">
                  +45
                </div>
              </div>
              <p className="text-sm font-bold text-gray-600">Joined by 45 other local restaurants</p>
            </div>
            
            <button 
              onClick={handleShare}
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Share My Impact
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
