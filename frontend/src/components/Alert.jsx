import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export default function Alert({ type = "info", children, dismissible = false }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
  };

  const colors = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
    error: "bg-rose-500/10 border-rose-500/20 text-rose-200",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`p-4 rounded-xl border flex items-start gap-3 mb-4 backdrop-blur-md ${colors[type] || colors.info}`}
      >
        <div className="mt-0.5">{icons[type] || icons.info}</div>
        <div className="flex-1 text-sm font-medium">{children}</div>
        {dismissible && (
          <button
            onClick={() => setVisible(false)}
            className="hover:opacity-70 transition-opacity p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
