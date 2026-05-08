import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Upload, Bell, BarChart3, Leaf, LogOut, Menu, X, Zap, Clock, Award, Settings } from 'lucide-react'
import { useState } from 'react'
import { clearToken } from '../../services/api'

export function Sidebar({ currentPage, setPage }) {
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'add-food', icon: Upload, label: 'Add Food' },
    { id: 'active-donations', icon: Zap, label: 'Active Donations' },
    { id: 'history', icon: Clock, label: 'Donation History' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'certificates', icon: Award, label: 'Certificates' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  const handleLogout = () => {
    clearToken();
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden p-3 rounded-2xl bg-white shadow-xl border border-gray-100 text-gray-900 transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 z-40 flex flex-col transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        {/* Logo */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-[1rem] flex items-center justify-center shadow-lg shadow-primary/20">
              <Leaf className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Foodies</h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Donor Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all group ${
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <item.icon
                  size={20}
                  className={`${isActive ? "text-white" : "group-hover:text-primary"} transition-colors`}
                />
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm lg:hidden z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
