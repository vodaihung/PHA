import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Clock, Home, Building, MapPin, Users, Search, ArrowRight, Star, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GoogleMapsService } from '@/services/googleMapsService';

interface StateData {
  totalUnits: string;
  properties: string;
  cities: string;
  agencies: string;
  averageWaitTime: string;
  lastUpdated: string;
  occupancyRate: string;
  quickStats: Array<{
    label: string;
    value: string;
    icon: React.ComponentType<any>;
    color: string;
    bgColor: string;
  }>;
}

interface StateHeroSectionProps {
  stateName: string;
  stateData: StateData;
}

const StateHeroSection: React.FC<StateHeroSectionProps> = ({ stateName, stateData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  // Rotate stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % stateData.quickStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stateData.quickStats.length]);

  // Enhanced state information
  const stateInfo = {
    population: '15.2M', // You could make this dynamic based on the state
    majorCities: '245',
    federalDistricts: '12',
    averageRent: '$1,485',
    housingAffordability: '72%'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter
      console.log('Search for:', searchQuery);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: `url('/lovable-uploads/6fec7525-51b9-405f-a872-6143d0c0924a.png')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* State Badge */}
              <div className="flex justify-center lg:justify-start">
                <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-lg font-semibold backdrop-blur-sm">
                  <MapPin className="w-5 h-5 mr-2" />
                  {stateName}
                </Badge>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none">
                  <span className="block text-3xl md:text-5xl lg:text-6xl mb-2 text-white/90">Section 8 Housing</span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                    in {stateName}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl">
                  Find affordable housing opportunities, connect with local authorities, and access housing assistance programs across the state.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by city or zip code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-6 text-lg bg-white/90 backdrop-blur-sm border-white/30 focus:bg-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-6 text-lg shadow-xl"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </form>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 font-semibold px-8 py-6 backdrop-blur-sm"
                  variant="outline"
                >
                  View All Offices
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6"
                >
                  Application Guide
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Column - Stats Dashboard */}
            <div className="space-y-6">
              {/* Main Stats Grid */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {stateData.quickStats.map((stat, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-4 rounded-xl transition-all duration-500 ${
                        index === activeStatIndex 
                          ? 'bg-white/20 shadow-lg transform scale-105' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${stat.bgColor} flex items-center justify-center backdrop-blur-xl shadow-lg`}>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/80 font-medium leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics */}
                <div className="space-y-4 pt-6 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 font-medium">Occupancy Rate</span>
                    <span className="text-white font-bold">{stateData.occupancyRate}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: stateData.occupancyRate }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 font-medium">Average Wait Time</span>
                    <span className="text-white font-bold">{stateData.averageWaitTime}</span>
                  </div>
                </div>
              </div>

              {/* State Quick Facts */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  {stateName} Quick Facts
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{stateInfo.population}</div>
                    <div className="text-white/70 text-sm">Population</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{stateInfo.majorCities}</div>
                    <div className="text-white/70 text-sm">Major Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{stateInfo.averageRent}</div>
                    <div className="text-white/70 text-sm">Avg. Rent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{stateInfo.housingAffordability}</div>
                    <div className="text-white/70 text-sm">Affordability</div>
                  </div>
                </div>
              </div>

              {/* Last Updated & Certifications */}
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-blue-300" />
                  <span className="text-white/90 text-sm">Updated: {stateData.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-green-300" />
                  <span className="text-white/90 text-sm">HUD Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <TrendingUp className="w-4 h-4 text-yellow-300" />
                  <span className="text-white/90 text-sm">Active Programs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateHeroSection;
