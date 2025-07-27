import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Home, CheckCircle2, Star, TrendingUp, MessageSquare, Shield } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import PHAHeroSection from "./PHADetailView/PHAHeroSection";
import PHABasicInfo from "./PHADetailView/PHABasicInfo";
import PHAContactInfo from "./PHADetailView/PHAContactInfo";
import PHAHousingPrograms from "./PHADetailView/PHAHousingPrograms";
import PHAWalkScore from "./PHADetailView/PHAWalkScore";
import PHALastUpdated from "./PHADetailView/PHALastUpdated";
import PHADataSource from "./PHADetailView/PHADataSource";
import PHAMapSection from "./PHADetailView/PHAMapSection";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHADetailViewProps {
  office: PHAAgency;
  onViewHousing: (office: PHAAgency) => void;
  onBack: () => void;
  onShowMap?: () => void;
}

const PHADetailView: React.FC<PHADetailViewProps> = ({ office, onViewHousing, onBack, onShowMap }) => {
  // Generate stats for the office
  const getOfficeStats = () => {
    const nameHash = office.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      units: (nameHash % 800) + 100,
      waitTime: Math.floor((nameHash % 24) + 1),
      rating: 4.2 + ((nameHash % 8) / 10),
      applications: (nameHash % 50) + 10,
      occupancy: Math.floor((nameHash % 20) + 80),
      satisfaction: Math.floor((nameHash % 15) + 85)
    };
  };

  const stats = getOfficeStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Modern Header with Gradient */}
      <div className="bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-700/50 sticky top-0 z-20 animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-all duration-200 font-medium hover-scale"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Button>
        </div>
      </div>

      {/* Main Content with Increased Width */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section - Full Width */}
        <div className="mb-8 animate-fade-in-up">
          <PHAHeroSection office={office} />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 shadow-lg hover-lift animate-stagger-1 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center animate-float">
                  <Home className="w-6 h-6 text-blue-400" />
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 font-semibold animate-pulse-slow border-blue-400/30">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-white mb-1">{stats.units}+</div>
              <div className="text-blue-300 text-sm font-medium">Available Units</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 shadow-lg hover-lift animate-stagger-2 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 font-semibold border-purple-400/30">Avg</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-white mb-1">{stats.waitTime} mo</div>
              <div className="text-purple-300 text-sm font-medium">Average Wait Time</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 shadow-lg hover-lift animate-stagger-3 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Star className="w-6 h-6 text-emerald-400" />
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 font-semibold border-emerald-400/30">Rated</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-white mb-1">{stats.rating}/5</div>
              <div className="text-emerald-300 text-sm font-medium">Community Rating</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 shadow-lg hover-lift animate-stagger-4 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-orange-500/30 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <Badge className="bg-orange-500/20 text-orange-300 font-semibold border-orange-400/30">This Month</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-white mb-1">{stats.applications}</div>
              <div className="text-orange-300 text-sm font-medium">New Applications</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 shadow-lg hover-lift animate-slide-in-left backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Occupancy Rate</span>
                <span className="text-lg font-bold text-white">{stats.occupancy}%</span>
              </div>
              <div className="w-full bg-slate-600/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.occupancy}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Resident Satisfaction</span>
                <span className="text-lg font-bold text-white">{stats.satisfaction}%</span>
              </div>
              <div className="w-full bg-slate-600/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.satisfaction}%`, animationDelay: '0.5s' }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 shadow-lg hover-lift animate-slide-in-right backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-emerald-400" />
                Safety & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 animate-stagger-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-slate-300">HUD Compliance Certified</span>
              </div>
              <div className="flex items-center gap-3 animate-stagger-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-slate-300">Equal Housing Opportunity</span>
              </div>
              <div className="flex items-center gap-3 animate-stagger-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-slate-300">Regular Safety Inspections</span>
              </div>
              <div className="flex items-center gap-3 animate-stagger-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-slate-300">Community Support Services</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid - Two Column Layout on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="animate-fade-in-stagger">
              <PHABasicInfo office={office} onShowMap={onShowMap} />
            </div>

            {/* Map Section */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.1s' }}>
              <PHAMapSection office={office} />
            </div>

            {/* Program Information */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.2s' }}>
              <PHAHousingPrograms office={office} />
            </div>

            {/* Walk Score Section */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.3s' }}>
              <PHAWalkScore office={office} />
            </div>
          </div>

          {/* Right Column - Contact & Meta Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.1s' }}>
              <PHAContactInfo office={office} />
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600/50 shadow-lg hover-lift animate-fade-in-stagger backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 rounded-xl shadow-lg hover-scale transition-all duration-200"
                  onClick={() => onViewHousing(office)}
                >
                  Apply for Housing
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white font-semibold py-6 rounded-xl hover-scale transition-all duration-200"
                >
                  Schedule Tour
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white font-semibold py-6 rounded-xl hover-scale transition-all duration-200"
                >
                  Download Application
                </Button>
              </CardContent>
            </Card>

            {/* Office Details */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.3s' }}>
              <PHALastUpdated office={office} />
            </div>

            {/* Data Source Footer */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.4s' }}>
              <PHADataSource />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHADetailView;
