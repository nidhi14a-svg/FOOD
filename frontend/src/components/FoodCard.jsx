import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Package, Check } from "lucide-react";

export default function FoodCard({ item, onComplete }) {
  const isExpiringSoon = () => {
    if (!item.expiry) return false;
    const expiryDate = new Date(item.expiry);
    const now = new Date();
    const diffHours = (expiryDate - now) / (1000 * 60 * 60);
    return diffHours < 12 && diffHours > 0;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2.5rem] p-8 flex flex-col gap-6 overflow-hidden relative group border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all"
    >
      {isExpiringSoon() && (
        <div className="absolute top-6 right-6 bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest z-10 shadow-lg shadow-red-500/30">
          Expiring Soon
        </div>
      )}

      <div className="w-full h-48 bg-gray-50 rounded-3xl flex items-center justify-center border border-transparent group-hover:bg-emerald-50 transition-all duration-500">
        <Package className="w-16 h-16 text-gray-200 group-hover:text-primary/30 transition-all duration-500" />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black text-gray-900 leading-tight">{item.name}</h3>
            <span className="text-[10px] font-black px-4 py-1.5 bg-emerald-50 text-primary rounded-full uppercase tracking-widest border border-emerald-100">
              {item.type}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
              <div className="p-2 bg-gray-50 rounded-lg text-primary">
                <Clock className="w-4 h-4" />
              </div>
              <span>Expires: {new Date(item.expiry).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
              <div className="p-2 bg-gray-50 rounded-lg text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
              <div className="p-2 bg-gray-50 rounded-lg text-primary">
                <Package className="w-4 h-4" />
              </div>
              <span>Quantity: {item.quantity}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onComplete(item.id)}
          className="w-full bg-emerald-950 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/10"
        >
          <Check className="w-5 h-5 text-primary" />
          Mark as Collected
        </button>
      </div>
    </motion.div>
  );
}
