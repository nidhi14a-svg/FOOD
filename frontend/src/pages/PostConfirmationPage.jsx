import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, MapPin, Calendar, Scale, Tag, ArrowRight, Zap } from 'lucide-react'

export default function PostConfirmationPage({ food, setPage }) {
  if (!food) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-2xl shadow-emerald-500/40"
        >
          <CheckCircle size={48} />
        </motion.div>
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Listing <span className="text-primary">Confirmed!</span></h1>
        <p className="text-gray-500 text-xl font-medium">Your donation is now visible to nearby NGOs and volunteers.</p>
      </div>

      <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 h-80 md:h-auto relative">
          <img 
            src={food.image_url || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800'} 
            alt={food.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-primary">
            {food.food_type}
          </div>
        </div>

        <div className="md:w-1/2 p-12 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{food.title}</h2>
            <p className="text-gray-500 font-medium leading-relaxed">{food.description}</p>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-xl">
                <MapPin size={20} className="text-primary" />
              </div>
              <span className="font-bold">{food.pickup_location?.address || 'Location provided'}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-xl">
                <Calendar size={20} className="text-primary" />
              </div>
              <span className="font-bold">Expires: {new Date(food.expiry_time).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-xl">
                <Scale size={20} className="text-primary" />
              </div>
              <span className="font-bold">{food.quantity_kg} kg</span>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <button 
              onClick={() => setPage('active-donations')}
              className="w-full py-5 bg-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <Zap size={20} />
              View Active Donations
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setPage('dashboard')}
              className="w-full py-5 bg-gray-50 text-gray-400 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-gray-100 hover:text-gray-600 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
