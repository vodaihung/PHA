
import React from 'react';
import { Link } from "react-router-dom";
import PHADataManager from "@/components/PHADataManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, FileText, Users, Activity, LogOut, TrendingUp, Shield, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useDataAdminStats } from "@/hooks/useDataAdminStats";

const DataAdmin = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const { totalDataSources, filesProcessed, recordsManaged, lastActivity, isLoading } = useDataAdminStats();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  console.log('DataAdmin component rendering...');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Mobile-optimized Header */}
      <header className="relative z-10 bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 shadow-2xl border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img
                  src="/lovable-uploads/221b75b2-2ed8-4872-b9ef-18b878e8e8fe.png"
                  alt="PHA Logo"
                  className="h-10 sm:h-14 w-auto drop-shadow-sm"
                />
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="text-xs sm:text-sm text-white/90 hidden md:block">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Logged in as: <span className="font-semibold text-white break-all">{user?.email}</span></span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-1 sm:gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Mobile-optimized Page Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-2xl">
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
              Data Administration Dashboard
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed px-2">
            Comprehensive data management platform for all assistance programs.
            Monitor data quality, track import statistics, and maintain database integrity with enterprise-grade tools.
          </p>
        </div>

        {/* Mobile-optimized Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-bold text-white">Data Sources</CardTitle>
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                <Database className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                {isLoading ? '...' : totalDataSources}
              </div>
              <p className="text-xs sm:text-sm text-emerald-300 flex items-center gap-1 font-semibold">
                <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3" />
                Active integrations
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-bold text-white">Files Processed</CardTitle>
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                <FileText className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                {isLoading ? '...' : filesProcessed}
              </div>
              <p className="text-xs sm:text-sm text-blue-300 flex items-center gap-1 font-semibold">
                <Zap className="h-2 w-2 sm:h-3 sm:w-3" />
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-bold text-white">Records Managed</CardTitle>
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                {isLoading ? '...' : recordsManaged.toLocaleString()}
              </div>
              <p className="text-xs sm:text-sm text-purple-300 flex items-center gap-1 font-semibold">
                <Database className="h-2 w-2 sm:h-3 sm:w-3" />
                Across all databases
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-bold text-white">Last Activity</CardTitle>
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                <Activity className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                {isLoading ? '...' : lastActivity}
              </div>
              <p className="text-xs sm:text-sm text-orange-300 flex items-center gap-1 font-semibold">
                <Activity className="h-2 w-2 sm:h-3 sm:w-3" />
                PHA data update
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-optimized Data Sources */}
        <div className="space-y-8 sm:space-y-12">
          {/* PHA Data Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-2xl">
                <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                  Public Housing Authority (PHA) Data
                </h2>
                <p className="text-sm sm:text-base text-white/80">Manage and monitor HUD PHA database records</p>
              </div>
            </div>
            <PHADataManager />
          </div>



          {/* Additional Data Sources */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl shadow-2xl">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                  Additional Data Sources
                </h2>
                <p className="text-sm sm:text-base text-white/80">Extended integrations and future capabilities</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <Card className="border-2 border-dashed border-white/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:shadow-2xl transition-all duration-500 rounded-2xl">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="text-center">
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-xl">
                      <Database className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">Housing Listings</h3>
                    <p className="text-sm text-white/70 mb-2">Integration with housing listing APIs</p>
                    <p className="text-xs text-white/50">Real-time availability tracking</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-white/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:shadow-2xl transition-all duration-500 rounded-2xl">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="text-center">
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-xl">
                      <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">Waitlist Management</h3>
                    <p className="text-sm text-white/70 mb-2">Real-time waitlist status updates</p>
                    <p className="text-xs text-white/50">Automated notifications</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile-optimized System Information */}
        <div className="mt-12 sm:mt-16">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-3xl p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-black">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                System Information & Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl shadow-lg">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-base sm:text-lg">Data Quality</h3>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                      Automated validation checks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                      Duplicate detection
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                      Address standardization
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                      Contact verification
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-base sm:text-lg">Update Schedule</h3>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                      HUD PHA data: Monthly
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                      Waitlist status: Weekly
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                      User corrections: Real-time
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-base sm:text-lg">Data Sources</h3>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      HUD PHA Contact API
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      State housing databases
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      Community submissions
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataAdmin;
