import React, { useState, useEffect } from 'react';
import { MapPin, Search, ArrowRight, Sparkles, Star, ChevronRight, Globe, Users, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const SearchByStateSection = () => {
  const [selectedState, setSelectedState] = useState('');
  const [hoveredState, setHoveredState] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];

  const popularStates = [
    { name: 'California', count: '450+ Authorities', color: 'from-blue-500 to-cyan-500' },
    { name: 'Texas', count: '320+ Authorities', color: 'from-red-500 to-pink-500' },
    { name: 'New York', count: '280+ Authorities', color: 'from-purple-500 to-indigo-500' },
    { name: 'Florida', count: '250+ Authorities', color: 'from-orange-500 to-yellow-500' },
    { name: 'Illinois', count: '180+ Authorities', color: 'from-green-500 to-emerald-500' },
    { name: 'Pennsylvania', count: '160+ Authorities', color: 'from-pink-500 to-rose-500' }
  ];

  const features = [
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Access housing authorities across all 50 states",
      stats: "2,500+ PHAs"
    },
    {
      icon: Users,
      title: "Real-Time Data",
      description: "Live updates on waitlist status and availability",
      stats: "Updated Daily"
    },
    {
      icon: TrendingUp,
      title: "Success Stories",
      description: "Join thousands who found their perfect home",
      stats: "100k+ Families"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    navigate(`/state/${encodeURIComponent(state)}`);
  };

  const handleQuickStateSelect = (state: string) => {
    navigate(`/state/${encodeURIComponent(state)}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Animated Lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-2xl text-sm font-bold mb-12 shadow-2xl">
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-white">Search By Location</span>
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block text-white mb-4 drop-shadow-2xl">
              Find Housing
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl">
              Near You
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-16">
            Discover affordable housing opportunities in your state with our comprehensive directory.
            <span className="font-bold text-blue-300"> Search by state</span> to find local housing authorities.
          </p>
        </div>

        {/* Main Search Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Search Interface */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white">Quick Search</h3>
                      <p className="text-white/80 text-lg">Select your state to get started</p>
                    </div>
                  </div>
                  
                  <Select onValueChange={handleStateSelect}>
                    <SelectTrigger className="w-full h-16 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl px-6 text-lg font-bold text-white shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:bg-white/30">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-blue-300" />
                        <SelectValue placeholder="Choose Your State" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                      {states.map((state) => (
                        <SelectItem 
                          key={state} 
                          value={state}
                          className="text-lg py-3 px-4 rounded-xl hover:bg-indigo-50 transition-colors"
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                    <p className="text-sm text-gray-600 text-center">
                      💡 <span className="font-semibold">Pro Tip:</span> We cover all 50 states with real-time data updates
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features Showcase */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 transform ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-105 shadow-2xl'
                      : 'bg-white/70 backdrop-blur-xl border border-white/20 hover:bg-white/90'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      activeFeature === index ? 'bg-white/20' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                    }`}>
                      <feature.icon className={`w-6 h-6 ${
                        activeFeature === index ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg font-black ${
                        activeFeature === index ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h4>
                      <p className={`text-sm ${
                        activeFeature === index ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                    <div className={`text-right ${
                      activeFeature === index ? 'text-white' : 'text-indigo-600'
                    }`}>
                      <div className="font-black text-lg">{feature.stats}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Popular States */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-black text-gray-900 mb-4">
                Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Destinations</span>
              </h3>
              <p className="text-gray-600 text-lg">
                Quick access to states with the most housing opportunities
              </p>
            </div>

            <div className="grid gap-4">
              {popularStates.map((state, index) => (
                <Card
                  key={state.name}
                  className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => handleQuickStateSelect(state.name)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${state.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <CardContent className="relative p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${state.color} flex items-center justify-center shadow-lg`}>
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-gray-900">{state.name}</h4>
                        <p className="text-sm text-gray-600 font-medium">{state.count}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* All States CTA */}
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <h4 className="text-2xl font-black text-white mb-3">
                  Can't Find Your State?
                </h4>
                <p className="text-indigo-100 mb-6">
                  Don't worry! We have housing authorities in all 50 states.
                </p>
                                 <Button
                   size="lg"
                   className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                   onClick={() => {
                     // Scroll to the select dropdown
                     document.querySelector('button[role="combobox"]')?.scrollIntoView({ behavior: 'smooth' });
                   }}
                 >
                   <Search className="w-5 h-5 mr-2" />
                   Browse All States
                   <ArrowRight className="w-5 h-5 ml-2" />
                 </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-16 shadow-2xl">
          <h3 className="text-5xl font-black text-white mb-8">
            Nationwide Housing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Network</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-6xl font-black text-white mb-3">50</div>
              <div className="text-blue-300 text-xl font-bold">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-white mb-3">2,500+</div>
              <div className="text-purple-300 text-xl font-bold">Housing Authorities</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-white mb-3">100k+</div>
              <div className="text-pink-300 text-xl font-bold">Families Helped</div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SearchByStateSection;
