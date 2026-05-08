import React from "react";
import { motion } from "framer-motion";
import { Apple } from "lucide-react";

export function NavHeader({ onContactOpen }) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="relative z-50 w-full px-12 py-8 flex items-center justify-between"
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.hash = ''}>
        <div className="p-2.5 bg-primary rounded-2xl shadow-lg shadow-primary/20">
          <Apple className="w-7 h-7 text-white" />
        </div>
        <span className="text-3xl font-black text-gray-900 tracking-tighter">
          Foodies
        </span>
      </div>

      <nav className="flex items-center gap-12">
        <a href="#about" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">About</a>
        <a href="#impact" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">Impact</a>
        <a 
          href="#contact" 
          className="px-6 py-2.5 bg-gray-900 text-white text-sm font-black rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200"
          onClick={(e) => { e.preventDefault(); onContactOpen(); }}
        >
          Contact Us
        </a>
      </nav>
    </motion.header>
  );
}
