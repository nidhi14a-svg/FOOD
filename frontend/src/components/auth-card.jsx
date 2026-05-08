import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, register, forgotPassword } from "../services/api";
import { ArrowRight, Mail, Lock, Loader2, User, Building2, HeartHandshake, ChevronLeft } from "lucide-react";

export function AuthCard() {
  const [mode, setMode] = useState("login"); // 'login', 'signup', 'forgot'
  const [role, setRole] = useState("donor");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "login") {
        const res = await login(email, password);
        sessionStorage.setItem("foodWasteToken", res.access_token);
        window.location.reload();
      } else if (mode === "signup") {
        const res = await register(fullName, email, password, role);
        sessionStorage.setItem("foodWasteToken", res.access_token);
        window.location.reload();
      } else if (mode === "forgot") {
        const res = await forgotPassword(email);
        setMessage(res.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole) => {
    setLoading(true);
    setError(null);
    try {
      const demoEmail = `${demoRole}@demo.com`;
      const res = await login(demoEmail, "password123");
      sessionStorage.setItem("foodWasteToken", res.access_token);
      window.location.reload();
    } catch (err) {
      setError(`Demo account not found: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: "donor", label: "Donor", icon: <Building2 className="w-5 h-5" />, desc: "Restaurants & Hostels" },
    { id: "ngo", label: "NGO", icon: <User className="w-5 h-5" />, desc: "Charities & Food Banks" },
    { id: "volunteer", label: "Volunteer", icon: <HeartHandshake className="w-5 h-5" />, desc: "Pickups & Distribution" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl p-10 rounded-[3rem] bg-white border border-gray-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)]"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
          {mode === "login" ? "Welcome Back" : mode === "signup" ? "Join the Mission" : "Reset Password"}
        </h2>
        <p className="text-gray-500 text-lg font-medium">
          {mode === "login" ? "Enter your credentials to continue." : mode === "signup" ? "Create an account to start making an impact." : "Enter your email to receive a reset link."}
        </p>
      </div>

      {mode !== "forgot" && (
        <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => { setMode("login"); setError(null); setMessage(null); }}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${mode === "login" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(null); setMessage(null); }}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${mode === "signup" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            Sign Up
          </button>
        </div>
      )}

      {mode === "forgot" && (
        <button 
          onClick={() => { setMode("login"); setError(null); setMessage(null); }}
          className="flex items-center gap-2 text-sm font-black text-primary mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft size={18} />
          Back to Login
        </button>
      )}

      {message && (
        <div className="p-4 mb-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-sm font-bold">
          {message}
        </div>
      )}

      <AnimatePresence mode="wait">
        {mode === "signup" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1 mb-4 block">Select Your Role</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 ${role === r.id ? "border-primary bg-primary/5 text-primary" : "border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200"}`}
                >
                  {r.icon}
                  <span className="text-sm font-black">{r.label}</span>
                  <span className="text-[10px] font-medium opacity-60 leading-tight">{r.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="p-4 mb-8 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "signup" && (
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Full Name / Org Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-50 border border-transparent rounded-2xl py-5 pl-14 pr-6 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-primary/20 transition-all"
                placeholder={role === "donor" ? "Restaurant Name" : role === "ngo" ? "NGO Name" : "Your Name"}
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-3">
          <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-2xl py-5 pl-14 pr-6 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-primary/20 transition-all"
              placeholder="name@organization.com"
              required
            />
          </div>
        </div>

        {mode !== "forgot" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Password</label>
              {mode === "login" && (
                <button 
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs font-black text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-transparent rounded-2xl py-5 pl-14 pr-6 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-primary/20 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-xl hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
          <ArrowRight className="w-6 h-6" />
        </button>
      </form>

      {mode === "login" && (
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest text-center mb-6">Quick Demo Access</p>
          <div className="flex flex-wrap justify-center gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleDemoLogin(r.id)}
                className="px-6 py-2.5 rounded-xl bg-gray-50 text-gray-600 text-xs font-black hover:bg-primary/10 hover:text-primary transition-all"
              >
                {r.label} Demo
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
