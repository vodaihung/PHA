import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Search, MapPin, Home, CheckCircle, ArrowRight, Zap, Shield, Users, Clock, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Section 8 Housing",
      subtitle: "Housing Choice Voucher Program",
      description: "Discover affordable housing opportunities through our comprehensive PHA network. Find your perfect home with personalized assistance and real-time availability.",
      icon: Home,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      features: [
        "Smart PHA locator with real-time data",
        "Waitlist status notifications",
        "Instant contact information",
        "Application guidance & support"
      ],
      stats: { number: "2,500+", label: "Housing Authorities" },
      link: "/section8",
      buttonText: "Find Housing",
      accent: "emerald"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized search engine",
      color: "from-emerald-400 to-teal-400"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your information is protected with enterprise-grade security",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 guidance from housing assistance specialists",
      color: "from-indigo-400 to-blue-400"
    },
    {
      icon: Clock,
      title: "Always Updated",
      description: "Real-time data ensures you get the latest information",
      color: "from-teal-400 to-emerald-400"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Animated Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-2xl text-sm font-bold mb-12 shadow-2xl">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-white">Comprehensive Housing Assistance</span>
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block text-white mb-4 drop-shadow-2xl">
              Your Housing
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 drop-shadow-2xl">
              Journey Begins
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed">
            Experience the future of housing assistance with our comprehensive platform.
            <span className="font-bold text-emerald-300"> Connect, discover, and find your perfect home</span> with confidence.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid lg:grid-cols-1 gap-16 mb-24 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-xl shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:scale-105 cursor-pointer rounded-3xl border border-white/20"
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Modern Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Floating Geometric Elements */}
              <div className="absolute top-8 right-8 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-br from-teal-400/15 to-cyan-400/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
              
              <CardHeader className="relative z-10 pb-8 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-white mb-1">{service.stats.number}</div>
                    <div className="text-sm text-emerald-300 font-bold uppercase tracking-wider">{service.stats.label}</div>
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-black text-white mb-3">
                  {service.title}
                </CardTitle>
                <p className="text-base font-bold text-emerald-300 uppercase tracking-wide mb-4">
                  {service.subtitle}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-8 px-8 pb-8">
                <p className="text-white/90 text-xl leading-relaxed font-medium">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={`flex items-center gap-4 transform transition-all duration-500 delay-${featureIndex * 100} ${
                        activeCard === service.id ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-80'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-xl`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Link to={service.link} className="inline-block mt-10">
                  <Button
                    className={`group relative overflow-hidden bg-white text-gray-900 hover:bg-gray-50 px-10 py-6 text-xl font-black rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-500 transform hover:scale-105`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center gap-3">
                      <Search className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      {service.buttonText}
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <h3 className="text-5xl font-black text-center text-white mb-16">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AssistanceHub</span>?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-white/10"
              >
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-black text-white mb-4">{feature.title}</h4>
                <p className="text-white/80 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-16 shadow-2xl">
          <h3 className="text-5xl font-black text-white mb-6">
            Ready to Find Your Home?
          </h3>
          <p className="text-white/90 text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of families who have found their perfect home through our comprehensive platform.
          </p>
          <div className="flex justify-center">
            <Link to="/section8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-12 py-6 text-2xl font-black rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <Home className="w-8 h-8 mr-4" />
                Start Your Housing Search
                <ArrowRight className="w-8 h-8 ml-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
