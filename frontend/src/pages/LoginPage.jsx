import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavHeader } from '../components/nav-header'
import { HeroSection } from '../components/hero-section'
import { AuthCard } from '../components/auth-card'
import { Footer } from '../components/footer'
import { ContactModal } from '../components/contact-modal'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Leaf, Users, Globe, TrendingUp, Award } from 'lucide-react'

const impactData = [
  { month: 'Jan', meals: 125000 },
  { month: 'Feb', meals: 152000 },
  { month: 'Mar', meals: 148000 },
  { month: 'Apr', meals: 181000 },
  { month: 'May', meals: 195000 },
  { month: 'Jun', meals: 247000 },
]

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setShowAuth(window.location.hash === '#login' || window.location.hash === '#register');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <main className={`relative w-full min-h-screen flex flex-col overflow-x-hidden ${!showAuth ? 'landing-bg' : 'bg-white'}`}>
      <NavHeader onContactOpen={() => setIsContactOpen(true)} />
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <div className="relative z-10 flex-1 flex flex-col w-full">
        {!showAuth ? (
          <>
            {/* Hero Section */}
            <div className="min-h-[80vh] flex flex-col items-center justify-center">
              <HeroSection />
            </div>

            {/* About Section */}
            <section id="about" className="py-24 bg-white/30 backdrop-blur-sm border-y border-white/10">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="lg:w-1/2">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight">
                        Ending Hunger Through <span className="text-primary">Innovation</span>
                      </h2>
                      <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
                        Foodies is more than just a platform; it's a movement. We bridge the gap between food surplus and food scarcity by connecting local businesses directly with community distributors.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                            <Leaf size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 mb-1 text-lg">Eco Friendly</h4>
                            <p className="text-gray-500 text-sm font-medium">Reducing landfill waste and carbon footprint.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                            <Users size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 mb-1 text-lg">Community First</h4>
                            <p className="text-gray-500 text-sm font-medium">Supporting thousands of local NGOs daily.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="lg:w-1/2 relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
                    >
                      <img 
                        src="/donor-receiver-relationship.png" 
                        alt="Our Impact" 
                        className="w-full h-auto object-cover"
                      />
                    </motion.div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full -z-10 blur-2xl opacity-20" />
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-24 bg-white/50 backdrop-blur-md overflow-hidden border-b border-white/10">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-5xl font-black text-gray-900 mb-6">Our Growing <span className="text-primary">Impact</span></h2>
                  <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                    Real-time data reflecting the millions of meals rescued and communities served across the nation.
                  </p>
                </motion.div>
              </div>

              <div className="max-w-6xl mx-auto px-6 lg:px-12 h-[500px] bg-white p-8 rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-500/5 relative overflow-hidden group">
                <div className="absolute top-10 left-12 z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500 rounded-lg text-white">
                      <TrendingUp size={16} />
                    </div>
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Growth Analytics</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900">2.4M+ Meals Rescued</h3>
                </div>

                <div className="absolute inset-0 z-10 opacity-50">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={impactData} margin={{ top: 120, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '1.5rem', 
                          border: 'none', 
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          padding: '1rem 1.5rem'
                        }}
                        labelStyle={{ fontWeight: 900, color: '#111827', marginBottom: '0.25rem' }}
                        itemStyle={{ color: '#10b981', fontWeight: 700 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="meals" 
                        stroke="#10b981" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorMeals)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100">
                  <h3 className="text-4xl font-black text-emerald-600 mb-2">1.2M+</h3>
                  <p className="text-emerald-900/60 font-bold uppercase tracking-widest text-xs">Meals Rescued</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-teal-50 border border-teal-100">
                  <h3 className="text-4xl font-black text-teal-600 mb-2">450+</h3>
                  <p className="text-teal-900/60 font-bold uppercase tracking-widest text-xs">Active NGOs</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100">
                  <h3 className="text-4xl font-black text-blue-600 mb-2">800t</h3>
                  <p className="text-blue-900/60 font-bold uppercase tracking-widest text-xs">CO2 Prevented</p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)]">
            {/* Left Side: Relationship Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-emerald-50 items-center justify-center p-12">
              <div className="relative z-10 max-w-lg text-center lg:text-left">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-black text-emerald-950 mb-6 leading-tight"
                >
                  From <span className="text-primary">Surplus</span> to <span className="text-primary">Impact</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-emerald-900/70 font-medium mb-12"
                >
                  Join our network of food donors and community heroes. Together, we've rescued over 1 million meals and counting.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img 
                    src="/donor-receiver-relationship.png" 
                    alt="Donor and NGO connection" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
                </motion.div>
              </div>
            </div>

            {/* Right Side: Auth Card */}
            <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 bg-white lg:rounded-l-[4rem] shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">
              <div className="w-full max-w-xl">
                <AuthCard />
                <button 
                  onClick={() => window.location.hash = ''}
                  className="mt-10 w-full text-center text-sm font-black text-gray-400 hover:text-primary tracking-widest uppercase transition-colors"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
