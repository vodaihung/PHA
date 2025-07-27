import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Home, Users, ArrowRight, MapPin, Star, Sparkles, Building2, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Real Estate Background with Modern Overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[20s] ease-linear"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`
          }}
        ></div>

        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-emerald-900/85 to-blue-900/90"></div>

        {/* Secondary depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Accent gradients for modern feel */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/8 via-transparent to-blue-500/8 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-amber-400/5 via-transparent to-transparent"></div>
        </div>

        {/* Floating geometric elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-amber-300 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Grid pattern overlay for modern tech feel */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Interactive Cursor Effect */}
      <div
        className="absolute pointer-events-none z-10 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-blue-400/15 rounded-full blur-3xl transition-all duration-500"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Modern Badge */}
          <div className={`inline-flex items-center gap-3 bg-emerald-500/10 backdrop-blur-xl border border-emerald-400/30 px-8 py-4 rounded-2xl text-white font-semibold mb-12 shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <Shield className="w-6 h-6 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-base">Empowering 100,000+ families to find affordable housing</span>
            <TrendingUp className="w-5 h-5 text-emerald-300" />
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-tight transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="block text-white mb-4 drop-shadow-2xl">
              Unlock Your
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 drop-shadow-2xl">
              Housing Future
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl font-bold text-white/90 mt-4 drop-shadow-xl">
              with Comprehensive PHA Resources
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto mb-14 leading-relaxed transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="font-light">Navigate the path to </span>
            <span className="font-bold text-emerald-300">affordable housing</span>
            <span className="font-light"> with our intelligent platform. Connect directly with Public Housing Authorities, access real-time availability, and transform your housing journey today.</span>
          </p>

          {/* CTA Buttons */}
          <div className={`flex justify-center mb-20 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link to="/section8">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-8 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 border-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Building2 className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
                Explore Housing Options
                <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { number: '3,200+', label: 'Public Housing Authorities', icon: Building2, color: 'from-emerald-500 to-teal-500' },
              { number: '2.2M+', label: 'Housing Units Available', icon: Home, color: 'from-blue-500 to-cyan-500' },
              { number: '50 States', label: 'Complete US Coverage', icon: MapPin, color: 'from-indigo-500 to-purple-500' }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-10 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-2xl`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl font-black text-white mb-3">{stat.number}</div>
                  <div className="text-white/80 font-semibold text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
