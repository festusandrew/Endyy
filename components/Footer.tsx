import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle, ArrowRight, Cake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-10 pb-10 px-4 container mx-auto mb-12">
        <div className="flex flex-col gap-6">

            {/* 1. CTA Banner */}
            <div className="bg-brand-50 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-950 tracking-tight uppercase leading-none">
                        EXCITED? US TOO.<br/>
                        LET'S GET <span className="text-brand-500">BAKING.</span>
                    </h2>
                </div>
                <div className="mt-8 md:mt-0 relative z-10">
                     <Link to="/shop" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-xl shadow-brand-200 hover:scale-105 active:scale-95">
                        Start Order <ArrowRight size={20} />
                     </Link>
                </div>
            </div>

            {/* 2. Middle Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Brand Card (Blue) */}
                <div className="lg:col-span-2 bg-brand-600 rounded-[2.5rem] p-10 flex flex-col justify-between text-white min-h-[350px] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="bg-white/20 w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-white/10">
                            Since 2024
                        </div>
                        <h3 className="text-5xl font-display font-bold leading-none tracking-tighter">
                            enddy's<br/>studio
                        </h3>
                         <div className="mt-2 w-12 h-1 bg-accent-pink rounded-full"></div>
                    </div>
                    
                    {/* Decorative Icon */}
                    <img src="/logo.png" alt="Enddy's Logo" className="absolute -bottom-10 -right-10 w-64 h-64 object-contain opacity-50 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
                    <div className="absolute top-10 right-10 w-20 h-20 bg-brand-500 rounded-full blur-2xl opacity-50"></div>

                    <div className="relative z-10">
                         <p className="text-brand-100 font-medium tracking-wide">Kaduna, Nigeria</p>
                    </div>
                </div>

                {/* Links Card (Light) */}
                <div className="lg:col-span-3 bg-brand-50 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[350px]">
                    <div className="flex justify-between items-start">
                         <div className="bg-white px-4 py-2 rounded-lg text-xs font-bold text-brand-900 shadow-sm border border-brand-100 flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                             Accepting Orders
                         </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 mt-12 mb-12">
                         <div className="flex flex-col gap-3">
                            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Discover</span>
                            <Link to="/shop" className="text-brand-950 font-bold hover:text-brand-600 transition-colors text-lg">Menu</Link>
                            <Link to="/shop?cat=Cakes" className="text-brand-950 font-bold hover:text-brand-600 transition-colors text-lg">Cakes</Link>
                            <Link to="/training" className="text-brand-950 font-bold hover:text-brand-600 transition-colors text-lg">Training</Link>
                         </div>
                         <div className="flex flex-col gap-3">
                             <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Company</span>
                             <Link to="/about" className="text-brand-950 font-bold hover:text-brand-600 transition-colors text-lg">About</Link>
                             <Link to="/contact" className="text-brand-950 font-bold hover:text-brand-600 transition-colors text-lg">Contact</Link>
                         </div>
                         <div className="flex flex-col gap-3">
                             <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Legal</span>
                             <Link to="#" className="text-brand-950 font-bold hover:text-brand-600 transition-colors text-lg">Terms</Link>
                             <Link to="#" className="text-brand-950 font-bold hover:text-brand-600 transition-colors text-lg">Privacy</Link>
                         </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end text-xs text-brand-400 uppercase tracking-widest font-bold border-t border-brand-200 pt-6">
                        <span>© {new Date().getFullYear()} Enddy Cakes & Bakes.</span>
                        <span className="mt-2 md:mt-0">Baked with Love.</span>
                    </div>
                </div>
            </div>

            {/* 3. Social Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="#" className="bg-brand-50 hover:bg-brand-100 hover:scale-[1.02] rounded-[2rem] h-32 flex items-center justify-center transition-all duration-300 group">
                     {/* X Logo simulation */}
                    <Twitter size={40} className="text-brand-950 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="bg-brand-50 hover:bg-brand-100 hover:scale-[1.02] rounded-[2rem] h-32 flex items-center justify-center transition-all duration-300 group">
                    <Instagram size={40} className="text-brand-950 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="bg-brand-50 hover:bg-brand-100 hover:scale-[1.02] rounded-[2rem] h-32 flex items-center justify-center transition-all duration-300 group">
                    <div className="w-10 h-10 border-2 border-brand-950 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="font-bold text-brand-950">in</span>
                    </div>
                </a>
                <a href="#" className="bg-brand-50 hover:bg-brand-100 hover:scale-[1.02] rounded-[2rem] h-32 flex items-center justify-center transition-all duration-300 group">
                    <Facebook size={40} className="text-brand-950 group-hover:scale-110 transition-transform" />
                </a>
            </div>

        </div>
    </footer>
  );
};