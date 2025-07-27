import React from 'react';
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Users, Home, Clock, Star } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAHeroSectionProps {
  office: PHAAgency;
}

const PHAHeroSection: React.FC<PHAHeroSectionProps> = ({ office }) => {
  const fullAddress = office.address || '';

  // Generate fake but realistic stats for demonstration
  const getOfficeStats = () => {
    const nameHash = office.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      units: (nameHash % 800) + 100,
      waitTime: Math.floor((nameHash % 24) + 1),
      rating: (4.2 + ((nameHash % 8) / 10)).toFixed(1),
      applications: (nameHash % 50) + 10
    };
  };

  const stats = getOfficeStats();

  return (
    <div className="relative overflow-hidden">
      {/* Modern Dark Hero Section */}
      <Card className="relative bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 border-0 shadow-2xl overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/30 to-purple-900/30"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
          {/* Floating orbs for depth */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative px-8 py-16 lg:py-20">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Building2 className="w-10 h-10 text-blue-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {office.name}
            </h1>

            {/* Address */}
            <div className="flex items-center justify-center gap-3 text-slate-300 text-lg mb-8">
              <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <span>{fullAddress || 'Address not available'}</span>
            </div>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Housing Units */}
            <div className="group">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <Home className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white mb-2">{stats.units}+</div>
                <div className="text-slate-400 text-sm font-medium">Housing Units</div>
              </div>
            </div>

            {/* Wait Time */}
            <div className="group">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-white mb-2">{stats.waitTime}</div>
                <div className="text-slate-400 text-sm font-medium">Avg. Wait (months)</div>
              </div>
            </div>

            {/* Rating */}
            <div className="group">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all duration-300">
                  <Star className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white mb-2">{stats.rating}</div>
                <div className="text-slate-400 text-sm font-medium">Community Rating</div>
              </div>
            </div>

            {/* Applications */}
            <div className="group">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all duration-300">
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-3xl font-black text-white mb-2">{stats.applications}</div>
                <div className="text-slate-400 text-sm font-medium">Applications This Month</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PHAHeroSection;
