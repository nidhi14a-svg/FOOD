import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFoodList, completeFood } from '../services/api'
import { Clock, MapPin, Scale, Leaf, AlertCircle, CheckCircle } from 'lucide-react'

function CountdownTimer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(expiryDate) - new Date()
      if (difference <= 0) return 'Expired'
      
      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)
      
      return `${hours}h ${minutes}m ${seconds}s`
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())
    return () => clearInterval(timer)
  }, [expiryDate])

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
      timeLeft === 'Expired' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
    }`}>
      <Clock size={14} className={timeLeft !== 'Expired' ? 'animate-pulse' : ''} />
      {timeLeft}
    </div>
  )
}

export default function ActiveDonationsPage() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDonations = async () => {
    try {
      setLoading(true)
      const data = await getFoodList({ status: 'AVAILABLE' })
      setDonations(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  const handleComplete = async (id) => {
    // Optimistic UI update for "vanishing" effect
    setDonations(prev => prev.filter(item => item.id !== id))
    
    try {
      await completeFood(id)
      // fetchDonations() // Optional: re-sync if needed
    } catch (err) {
      setError(err.message)
      fetchDonations() // Revert on error
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/30 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary rounded-xl text-white">
              <Zap size={24} />
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Active Donations</h2>
          </div>
          <p className="text-gray-500 font-medium text-lg">Track your live listings and manage pickups in real-time.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-white rounded-[3rem] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Leaf size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No Active Donations</h3>
            <p className="text-gray-400 font-medium mb-8">Start by listing your surplus food to see them here.</p>
            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20">
              Post New Food
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {donations.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/800x400?text=No+Food+Image+Provided'} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <CountdownTimer expiryDate={item.expiry_time} />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                      {item.food_type}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="text-xl font-black text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-6">{item.description}</p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-gray-400">
                        <MapPin size={16} />
                        <span className="text-xs font-bold">{item.pickup_location?.address || 'Location detected'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <Scale size={16} />
                        <span className="text-xs font-bold">{item.quantity_kg} kg</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleComplete(item.id)}
                      className="mt-auto w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Mark as Completed
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

import { Zap } from 'lucide-react'
