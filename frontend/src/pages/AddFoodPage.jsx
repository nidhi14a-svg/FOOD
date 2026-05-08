import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { addFood } from '../services/api'
import { 
  Package, 
  MapPin, 
  Calendar, 
  Tag, 
  Camera, 
  Upload, 
  Link as LinkIcon,
  PlusCircle, 
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Scale,
  Navigation,
  Map as MapIcon,
  Zap
} from 'lucide-react'

export default function AddFoodPage({ setPage, setLastPostedFood }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    latitude: 12.9716, // Default Bengaluru
    longitude: 77.5946,
    expiry_time: '',
    quantity_kg: 1,
    food_type: 'PREPARED',
    image_url: ''
  })
  const [uploadMode, setUploadMode] = useState('link')
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLiveLocation = () => {
    setLocating(true)
    setError(null)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          const data = await response.json()
          setFormData({ 
            ...formData, 
            latitude, 
            longitude, 
            address: data.display_name || `Lat: ${latitude}, Lon: ${longitude}` 
          })
        } catch (err) {
          setFormData({ ...formData, latitude, longitude, address: `Lat: ${latitude}, Lon: ${longitude}` })
        } finally {
          setLocating(false)
        }
      }, (err) => {
        setError("Location access denied. Please allow location access in your browser.")
        setLocating(false)
      })
    } else {
      setError("Geolocation not supported by your browser.")
      setLocating(false)
    }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    if (parseFloat(formData.quantity_kg) <= 0) {
      setError("Quantity must be at least 0.1 kg.")
      return
    }
    
    setLoading(true)
    setError(null)
    
    // Map to backend schema
    const payload = {
      title: formData.title,
      description: formData.description,
      quantity_kg: parseFloat(formData.quantity_kg),
      food_type: formData.food_type,
      expiry_time: new Date(formData.expiry_time).toISOString(),
      pickup_location: {
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address
      },
      image_url: formData.image_url
    }

    try {
      const res = await addFood(payload)
      setLastPostedFood({ ...formData, id: res.id || Date.now() })
      setPage('post-confirmation')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <button 
            onClick={() => setPage('dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-primary font-black uppercase tracking-widest text-xs mb-8 group transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none">
            Post New <span className="text-primary">Donation</span>
          </h1>
          <p className="text-gray-500 font-medium text-xl mt-4 max-w-lg">Fill in the details to rescue your surplus food and feed those in need.</p>
        </div>
        <div className="flex items-center gap-6 px-8 py-6 bg-emerald-50 rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-900/5">
          <div className="p-4 bg-white rounded-2xl text-primary shadow-sm ring-4 ring-emerald-50">
            <Zap size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Instant Impact</p>
            <p className="text-lg font-black text-gray-800">Verified Listing</p>
          </div>
        </div>
      </div>

      <form onSubmit={handlePost} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Core Details */}
        <div className="lg:col-span-8 space-y-12">
          <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Food Title</label>
                <div className="relative group">
                  <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
                  <input
                    required
                    type="text"
                    placeholder="e.g. 50 Servings of Pasta"
                    className="w-full bg-emerald-50/50 border-2 border-transparent rounded-[2rem] py-6 pl-16 pr-8 text-base font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Category</label>
                <div className="flex gap-2 p-2 bg-emerald-50/50 rounded-[2.5rem]">
                  {[
                    { id: 'PREPARED', label: 'Prepared' },
                    { id: 'PRODUCE', label: 'Produce' },
                    { id: 'PACKAGED', label: 'Packaged' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({...formData, food_type: t.id})}
                      className={`flex-1 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.food_type === t.id ? 'bg-white text-primary shadow-lg ring-1 ring-primary/10' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Description</label>
              <textarea
                required
                rows="4"
                placeholder="Details about food items, allergens, or special handling..."
                className="w-full bg-emerald-50/50 border-2 border-transparent rounded-[3rem] p-10 text-base font-bold focus:bg-white focus:border-primary/20 transition-all outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pickup Location</label>
                  <button 
                    type="button"
                    onClick={handleLiveLocation}
                    className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                  >
                    <Navigation size={12} className={locating ? 'animate-spin' : ''} />
                    Live Location
                  </button>
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
                  <input
                    required
                    type="text"
                    placeholder="Enter address..."
                    className="w-full bg-emerald-50/50 border-2 border-transparent rounded-[2rem] py-6 pl-16 pr-8 text-base font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Expiry Time</label>
                <div className="relative group">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
                  <input
                    required
                    type="datetime-local"
                    className="w-full bg-emerald-50/50 border-2 border-transparent rounded-[2rem] py-6 pl-16 pr-8 text-base font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                    value={formData.expiry_time}
                    onChange={(e) => setFormData({...formData, expiry_time: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Quantity (kg)</label>
              <div className="relative group">
                <Scale className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
                <input
                  required
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder="e.g. 15.5"
                  className="w-full bg-emerald-50/50 border-2 border-transparent rounded-[2rem] py-6 pl-16 pr-8 text-base font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  value={formData.quantity_kg}
                  onChange={(e) => setFormData({...formData, quantity_kg: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Mock Map Section */}
          <div className="bg-white p-10 rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                  <MapIcon size={20} />
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Location Preview</h3>
             </div>
             <div className="h-64 bg-gray-100 rounded-[2.5rem] relative overflow-hidden group">
                <img 
                  src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200&h=600`} 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 border-4 border-white"
                  >
                    <MapPin size={32} />
                  </motion.div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Active Zone</p>
                  <p className="text-sm font-bold text-gray-800 line-clamp-1">{formData.address || 'Select a location to see coverage'}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Visual Preview & Submit */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-white p-10 rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 sticky top-24">
            <h3 className="text-2xl font-black text-gray-900 mb-10 tracking-tight">Media & Launch</h3>
            
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex gap-2 p-2 bg-gray-50 rounded-[2rem]">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                      uploadMode === 'file' ? 'bg-white text-primary shadow-lg' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Upload size={16} />
                    Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('link')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                      uploadMode === 'link' ? 'bg-white text-primary shadow-lg' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <LinkIcon size={16} />
                    URL
                  </button>
                </div>

                <div className="relative group">
                  {uploadMode === 'link' ? (
                    <div className="relative">
                      <Camera className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      <input
                        type="url"
                        placeholder="Paste image link..."
                        className="w-full bg-emerald-50/50 border-2 border-transparent rounded-[1.5rem] py-5 pl-14 pr-6 text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-56 bg-emerald-50/50 border-2 border-dashed border-emerald-100 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/80 transition-all group overflow-hidden relative shadow-inner"
                    >
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                      {formData.image_url && uploadMode === 'file' ? (
                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform ring-4 ring-emerald-50/50">
                            <Upload size={32} />
                          </div>
                          <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Select Image</p>
                        </>
                      )}
                    </div>
                  )}

                  {formData.image_url && uploadMode === 'link' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 h-56 rounded-[3rem] overflow-hidden border border-gray-100 shadow-xl ring-4 ring-white"
                    >
                      <img 
                        src={formData.image_url} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={() => setError('Invalid image URL')}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <motion.button
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full relative py-4 bg-gradient-to-r from-emerald-600 via-primary to-teal-500 text-white rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-4 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      List Food Now
                      <ChevronRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                    </>
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-6 bg-red-50 text-red-500 rounded-3xl flex items-center gap-4 text-xs font-black uppercase tracking-widest border border-red-100 shadow-sm"
                    >
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <AlertCircle size={20} />
                      </div>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
