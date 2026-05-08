import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, Send, Smile, Heart } from 'lucide-react'

export function ShareImpactModal({ isOpen, onClose }) {
  const [message, setMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        setMessage('')
        setImageUrl('')
      }, 2000)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-12 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
                >
                  <Heart size={40} fill="white" />
                </motion.div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">Impact Shared!</h3>
                <p className="text-gray-500 font-medium">Your story is now inspiring others in the community.</p>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-emerald-50/30">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Share Your Impact</h3>
                    <p className="text-xs font-black text-primary uppercase tracking-widest mt-1">Inspire the community</p>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">
                      Donation Photo URL
                    </label>
                    <div className="relative group">
                      <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      <input
                        required
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Paste an image link of your donation..."
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    {imageUrl && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 h-40 rounded-2xl overflow-hidden border border-gray-100"
                      >
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">
                      How did it feel?
                    </label>
                    <div className="relative">
                      <Smile className="absolute left-4 top-4 text-gray-400" size={20} />
                      <textarea
                        required
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the donation experience..."
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Post My Story
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
