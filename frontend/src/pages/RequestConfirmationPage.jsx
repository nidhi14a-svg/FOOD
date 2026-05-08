import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, MapPin, Phone, Clock, ShieldCheck, ArrowRight } from 'lucide-react'

export default function RequestConfirmationPage({ setPage }) {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden"
      >
        <div className="bg-emerald-500 p-12 text-center text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 shadow-xl"
          >
            <CheckCircle size={40} />
          </motion.div>
          <h2 className="text-4xl font-black mb-2">Request Accepted!</h2>
          <p className="text-emerald-50 font-medium opacity-90">Pickup coordinated with Happy Meals Foundation</p>
        </div>

        <div className="p-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pickup Details</p>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-black text-gray-900">Estimated Arrival</p>
                  <p className="text-sm text-gray-500 font-medium">15 - 20 Minutes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Security PIN</p>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-black text-gray-900">Verification Code</p>
                  <p className="text-xl font-black text-blue-600 tracking-widest">4852</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://i.pravatar.cc/100?img=12" alt="Volunteer" />
              </div>
              <div>
                <p className="font-black text-gray-900">Arjun Singh</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Assigned Volunteer</p>
              </div>
            </div>
            <button className="p-3 bg-white text-emerald-500 rounded-xl shadow-sm hover:scale-110 transition-transform">
              <Phone size={20} />
            </button>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button 
              onClick={() => setPage('dashboard')}
              className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 group"
            >
              Back to Dashboard
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
