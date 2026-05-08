import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Heart } from "lucide-react";

export function HeroSection() {
  const features = [
    { icon: <Zap className="w-4 h-4" />, text: "Instant Pickups" },
    { icon: <Shield className="w-4 h-4" />, text: "Verified NGOs" },
    { icon: <Heart className="w-4 h-4" />, text: "Social Impact" },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 lg:py-24 gap-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] mb-8 text-gray-900">
          Transform <br />
          Food Waste <br />
          Into <br />
          <span className="text-primary">
            Community <br />
            Impact
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
          Connect surplus food from restaurants and businesses with nonprofits and communities that need it most. Real food. Real impact.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <button 
          onClick={() => window.location.hash = 'login'}
          className="px-12 py-5 bg-[#d1fae5] text-[#065f46] rounded-2xl font-bold text-xl hover:bg-[#bbf7d0] transition-all shadow-sm"
        >
          Sign In
        </button>
        <button 
          onClick={() => window.location.hash = 'register'}
          className="px-12 py-5 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-bold text-xl hover:border-gray-200 transition-all"
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  );
}
