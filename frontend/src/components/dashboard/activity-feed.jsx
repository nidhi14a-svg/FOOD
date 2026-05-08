import React from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, AlertCircle, Heart, MapPin, ArrowRight } from 'lucide-react'

const activities = [
  { id: 1, type: 'donation', title: 'Food Donated', desc: '50kg Rice & Veggies to Feed India', time: '2h ago', status: 'completed' },
  { id: 2, type: 'pickup', title: 'NGO Pickup', desc: 'Volunteer assigned for 20kg Packaged Food', time: '4h ago', status: 'pending' },
  { id: 3, type: 'update', title: 'Delivery Update', desc: 'Food delivered to community center', time: '6h ago', status: 'completed' },
]

const ngoRequests = [
  { id: 1, name: 'Happy Meals Foundation', distance: '1.2 km away', urgent: true, items: ['Grains', 'Vegetables'] },
  { id: 2, name: 'Safe Hands NGO', distance: '3.5 km away', urgent: false, items: ['Bread', 'Dairy'] },
  { id: 3, name: 'Care & Feed Charity', distance: '0.8 km away', urgent: true, items: ['Cooked Meals'] },
]

export function ActivityFeed() {
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 h-full">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-black text-gray-900">Recent Activity</h4>
        <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</button>
      </div>

      <div className="space-y-8">
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 group cursor-default"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
              activity.status === 'completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
            }`}>
              {activity.status === 'completed' ? <Check size={20} /> : <Clock size={20} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-gray-900 group-hover:text-primary transition-colors">{activity.title}</p>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{activity.time}</span>
              </div>
              <p className="text-xs font-medium text-gray-500 mt-1">{activity.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function NGORequestsPanel({ setPage }) {
  const [accepted, setAccepted] = React.useState([])

  const handleAccept = (id) => {
    setAccepted([...accepted, id])
    // Mock API call delay
    setTimeout(() => {
      setPage('request-confirmation')
    }, 500)
  }

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 h-full">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-black text-gray-900">NGO Requests</h4>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{ngoRequests.length - accepted.length} Priority Requests</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ngoRequests.filter(ngo => !accepted.includes(ngo.id)).map((ngo, index) => (
          <motion.div
            key={ngo.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 hover:border-primary/20 hover:bg-white transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:text-primary transition-colors">
                <Heart size={20} />
              </div>
              {ngo.urgent && (
                <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100">
                  Urgent
                </span>
              )}
            </div>
            
            <h5 className="font-black text-gray-900 mb-1">{ngo.name}</h5>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4">
              <MapPin size={12} />
              <span>{ngo.distance}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {ngo.items.map(item => (
                <span key={item} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-tight">
                  {item}
                </span>
              ))}
            </div>

            <button 
              onClick={() => handleAccept(ngo.id)}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              Accept Request
              <ArrowRight size={14} />
            </button>
          </motion.div>
        ))}
        {accepted.length === ngoRequests.length && (
          <div className="col-span-full py-12 text-center text-gray-400 font-bold">
            All requests handled. Great job!
          </div>
        )}
      </div>
    </div>
  )
}
