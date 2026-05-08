import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, Send, Smile, Heart, Upload, Link as LinkIcon, X, ArrowLeft } from 'lucide-react'

export default function ShareImpactPage({ setPage }) {
  const [message, setMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploadMode, setUploadMode] = useState('link') // 'link' or 'file'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setPage('dashboard')
      }, 2500)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-2xl shadow-emerald-500/40"
          >
            <Heart size={48} fill="white" />
          </motion.div>
          <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Story Published!</h2>
          <p className="text-gray-500 text-xl font-medium">Thank you for inspiring the community with your kindness.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.button 
        onClick={() => setPage('dashboard')}
        className="flex items-center gap-2 text-gray-400 hover:text-primary font-black uppercase tracking-widest text-xs mb-12 group transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </motion.button>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-black mb-6">
          <Heart size={16} fill="currentColor" />
          <span>COMMUNITY STORY</span>
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Share Your <span className="text-primary">Impact</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium max-w-xl">
          Tell the community how it felt to rescue food today. Your stories inspire more businesses to join the cause.
        </p>
      </div>

      <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          {/* Image Source Selection */}
          <div className="space-y-6">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 block">
              Donation Photo
            </label>
            
            <div className="flex gap-4 p-2 bg-gray-50 rounded-2xl w-fit">
              <button
                type="button"
                onClick={() => { setUploadMode('file'); setImageUrl('') }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  uploadMode === 'file' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Upload size={16} />
                Device
              </button>
              <button
                type="button"
                onClick={() => { setUploadMode('link'); setImageUrl('') }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  uploadMode === 'link' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <LinkIcon size={16} />
                URL Link
              </button>
            </div>

            <div className="relative">
              {uploadMode === 'link' ? (
                <div className="relative group">
                  <Camera className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
                  <input
                    required
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-emerald-50/30 border-2 border-transparent rounded-[2rem] py-6 pl-16 pr-8 text-gray-900 font-semibold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  />
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 bg-emerald-50/30 border-2 border-dashed border-emerald-100 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/50 transition-all group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <p className="text-gray-500 font-bold">Click to upload from gallery</p>
                  <p className="text-gray-400 text-xs mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                </div>
              )}
            </div>

            {imageUrl && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative h-64 rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg"
              >
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 block">
              Your Story
            </label>
            <div className="relative">
              <Smile className="absolute left-6 top-6 text-gray-400" size={24} />
              <textarea
                required
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Today we donated 20kg of surplus organic veggies. It feels amazing to know they'll feed families tonight instead of being wasted!"
                className="w-full bg-emerald-50/30 border-2 border-transparent rounded-[2rem] py-6 pl-16 pr-8 text-gray-900 font-semibold focus:bg-white focus:border-primary/20 transition-all resize-none outline-none"
              />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className="w-full py-6 bg-primary text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4 group"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Post Impact Story
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
