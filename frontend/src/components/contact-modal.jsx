import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Send, Loader2, CheckCircle } from "lucide-react";

export function ContactModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Side: Info */}
            <div className="bg-primary p-10 md:w-5/12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black mb-6">Get in Touch</h3>
                <p className="text-white/80 font-medium mb-12">
                  Have questions about food rescue? Our team is here to help you 24/7.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest opacity-60">Email Us</p>
                      <p className="font-bold">support@foodies.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest opacity-60">Call Us</p>
                      <p className="font-bold">+1 (800) FOOD-SOS</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm font-medium italic opacity-80">
                  "Every conversation is a step towards zero hunger."
                </p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-10 flex-1 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-500 font-medium">We'll get back to you within 2 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                      <input 
                        required
                        type="text"
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        required
                        type="email"
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea 
                        required
                        rows="4"
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-gray-900 font-medium focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-gray-200"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
                      {!loading && <Send size={20} />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
