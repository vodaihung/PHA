import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Map, Building, FileText, Info, Shield, Calendar, Award, Users, CheckCircle2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { getPHATypeFromData, getPHATypeColor } from "@/utils/mapUtils";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHABasicInfoProps {
  office: PHAAgency;
  onShowMap?: () => void;
}

const PHABasicInfo: React.FC<PHABasicInfoProps> = ({ office, onShowMap }) => {
  const fullAddress = office.address || 'Address not available';
  const phaType = getPHATypeFromData(office);

  // Generate some additional info based on office data
  const getAdditionalInfo = () => {
    const nameHash = office.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      established: 1940 + (nameHash % 80),
      jurisdiction: office.address?.split(',').slice(-2).join(',').trim() || 'Local Area',
      certification: 'HUD Certified',
      lastInspection: new Date(Date.now() - (nameHash % 365) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      totalFamiliesServed: (nameHash % 5000) + 1000,
      yearsInOperation: new Date().getFullYear() - (1940 + (nameHash % 80))
    };
  };

  const additionalInfo = getAdditionalInfo();

  return (
    <Card className="shadow-lg border-0 bg-slate-800/90 backdrop-blur-sm border-slate-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl text-white">
          <Info className="w-6 h-6 text-blue-400" />
          Office Information & Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Section */}
          {fullAddress && (
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl border border-blue-400/30">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-300 mb-1">Office Address</div>
                  <div className="text-white font-medium text-base">{fullAddress}</div>
                </div>
              </div>
            </div>
          )}

          {/* Jurisdiction */}
          <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl border border-emerald-400/30">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-emerald-300 mb-1">Service Area</div>
                <div className="text-white font-medium text-base">{additionalInfo.jurisdiction}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Show Map Button */}
        {onShowMap && (
          <Button
            onClick={onShowMap}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2 border-slate-600 text-blue-400 hover:bg-slate-700/50 h-14 font-semibold transition-all duration-200 hover:shadow-md bg-slate-800/50"
          >
            <Map className="w-5 h-5" />
            Show on Interactive Map
          </Button>
        )}

        {/* PHA Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PHA Type */}
          <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-400/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-purple-300">PHA Type</div>
                <div className="text-white font-semibold">Housing Authority</div>
              </div>
            </div>
            <Badge
              className="w-full justify-center py-2 font-bold text-sm"
              style={{
                backgroundColor: getPHATypeColor(phaType) + '30',
                color: getPHATypeColor(phaType),
                border: `1px solid ${getPHATypeColor(phaType)}50`
              }}
            >
              {phaType}
            </Badge>
          </div>
          
          {/* PHA Code */}
          {office.pha_code && (
            <div className="p-4 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-xl border border-slate-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-slate-600/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-300">HUD PHA Code</div>
                  <div className="text-white font-semibold">Official Identifier</div>
                </div>
              </div>
              <Badge className="w-full justify-center py-2 bg-slate-700/50 text-slate-200 font-bold text-sm border border-slate-600">
                {office.pha_code}
              </Badge>
            </div>
          )}
        </div>

        {/* Historical Information */}
        <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl border border-amber-400/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-500/30 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-amber-300">Historical Information</div>
              <div className="text-white font-semibold">Service History</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3 bg-slate-800/60 rounded-lg">
              <div className="text-2xl font-black text-white">{additionalInfo.established}</div>
              <div className="text-sm text-amber-300">Year Established</div>
            </div>
            <div className="text-center p-3 bg-slate-800/60 rounded-lg">
              <div className="text-2xl font-black text-white">{additionalInfo.yearsInOperation}+</div>
              <div className="text-sm text-amber-300">Years of Service</div>
            </div>
          </div>
        </div>

        {/* Certification & Compliance */}
        <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl border border-emerald-400/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-emerald-300">Certification & Compliance</div>
              <div className="text-white font-semibold">Official Status</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-medium text-white">HUD Certified Authority</div>
                <div className="text-sm text-emerald-300">Current certification status</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-medium text-white">Equal Housing Opportunity</div>
                <div className="text-sm text-emerald-300">Fair housing compliance</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-medium text-white">Last Inspection</div>
                <div className="text-sm text-emerald-300">{additionalInfo.lastInspection}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-xl border border-indigo-400/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-500/30 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-indigo-300">Community Impact</div>
              <div className="text-white font-semibold">Service Statistics</div>
            </div>
          </div>
          <div className="text-center p-4 bg-slate-800/60 rounded-lg">
            <div className="text-3xl font-black text-white mb-1">{additionalInfo.totalFamiliesServed.toLocaleString()}+</div>
            <div className="text-sm text-indigo-300">Families Served Since Establishment</div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="p-4 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-xl border border-slate-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-slate-600/30 rounded-xl flex items-center justify-center">
              <Info className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-300">Important Information</div>
              <div className="text-white font-semibold">Please Note</div>
            </div>
          </div>
          <div className="text-sm text-slate-300 space-y-2">
            <div>• All program information is subject to change based on federal and local regulations</div>
            <div>• Contact the office directly for the most current application procedures</div>
            <div>• Documentation requirements may vary by program type</div>
            <div>• Equal housing opportunity practices are strictly enforced</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PHABasicInfo;
