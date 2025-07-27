import React from 'react';
import { Home, MapPin, Building, Users, TrendingUp, Clock, DollarSign, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StateAboutSectionProps {
  stateName: string;
  stateData: {
    totalUnits: string;
    agencies: string;
    cities: string;
    averageWaitTime: string;
    occupancyRate: string;
    lastUpdated: string;
  };
}

const StateAboutSection: React.FC<StateAboutSectionProps> = ({ stateName, stateData }) => {
  // Extract percentage from occupancy rate for progress bar
  const occupancyPercentage = parseInt(stateData.occupancyRate.replace('%', '')) || 0;
  
  // Generate additional state insights
  const stateInsights = [
    {
      title: 'Housing Market Overview',
      description: `${stateName} has a diverse housing market with ${stateData.totalUnits} Public Housing Agencies across ${stateData.cities} cities. The state maintains strong occupancy rates and continues to expand affordable housing options.`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Application Process',
      description: `The average wait time for housing assistance in ${stateName} is ${stateData.averageWaitTime}. Applications are processed on a first-come, first-served basis with priority given to families with urgent housing needs.`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Program Eligibility',
      description: `Most housing programs in ${stateName} are available to families earning up to 80% of the Area Median Income (AMI). Special programs exist for seniors, disabled individuals, and veterans.`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const keyMetrics = [
    {
      label: 'Public Housing Agencies',
      value: stateData.totalUnits,
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      label: 'Housing Authorities',
      value: stateData.agencies,
      icon: Home,
      color: 'text-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      label: 'Cities Served',
      value: stateData.cities,
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      label: 'Families Assisted',
      value: '125,000+',
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'from-teal-50 to-teal-100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main About Card */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-black text-gray-900">
                  Housing Assistance in {stateName}
                </CardTitle>
                <CardDescription className="text-base md:text-lg text-gray-600 mt-1">
                  Comprehensive guide to affordable housing programs and opportunities
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 font-bold px-4 py-2 text-sm">
              Active Programs
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className={`bg-gradient-to-br ${metric.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-md ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Occupancy Rate Progress */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Current Occupancy Rate</h3>
                  <p className="text-sm text-gray-600">Across all housing programs</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-green-600">{stateData.occupancyRate}</div>
                <div className="text-sm text-gray-600">of capacity</div>
              </div>
            </div>
            <Progress value={occupancyPercentage} className="h-3" />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* Main Description */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {stateName} maintains a robust network of <strong>{stateData.totalUnits}</strong> Public Housing Agencies 
              operating across <strong>{stateData.cities}</strong> cities and communities. With <strong>{stateData.agencies}</strong> certified 
              Public Housing Authorities, the state provides comprehensive affordable housing services including Section 8 Housing 
              Choice Vouchers, Public Housing, and specialized programs for seniors, disabled individuals, and families.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* State Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stateInsights.map((insight, index) => (
          <Card key={index} className={`${insight.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Update Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-blue-50/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> {stateData.lastUpdated} | 
                <strong className="ml-2">Data Source:</strong> HUD and State Housing Authorities | 
                <strong className="ml-2">Next Update:</strong> Monthly
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StateAboutSection;
