import React from "react";
import { Apple, Globe, Users, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-24 px-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary rounded-xl">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">Foodies</span>
          </div>
          <p className="text-gray-400 font-medium leading-relaxed mb-10">
            Pioneering the future of food rescue through intelligent logistics and community-driven action.
          </p>
          <div className="flex gap-4">
            {[Globe, Users, Mail, Apple].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Platform</h4>
          <ul className="space-y-4 text-gray-400 font-bold">
            <li><a href="#" className="hover:text-primary transition-colors">How it Works</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Partner with Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Safety Protocols</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Company</h4>
          <ul className="space-y-4 text-gray-400 font-bold">
            <li><a href="#about" className="hover:text-primary transition-colors">About Mission</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Official Website</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Legal</h4>
          <ul className="space-y-4 text-gray-400 font-bold">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-gray-500 font-bold text-sm">
          © 2026 Foodies Global. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-bold text-sm">Made for a sustainable future</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
    </footer>
  );
}
