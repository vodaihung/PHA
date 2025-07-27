import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Heart, Phone, Building2, ExternalLink, Users, Calendar, Star, 
  Navigation, Mail, ArrowRight, CheckCircle2, Share, Clock
} from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { getPHATypeFromData, getPHATypeColor } from "@/utils/mapUtils";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAOfficeCardProps {
  agency: PHAAgency;
  onOfficeClick?: (office: PHAAgency) => void;
}

const PHAOfficeCard = ({ agency, onOfficeClick }: PHAOfficeCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const fullAddress = agency.address || 'Address not available';
  const phaType = getPHATypeFromData(agency);

  const handleClick = () => {
    navigate(`/pha/${agency.id}`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agency.phone) {
      window.location.href = `tel:${agency.phone}`;
    }
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agency.email) {
      window.location.href = `mailto:${agency.email}`;
    }
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agency.address) {
      const encodedAddress = encodeURIComponent(agency.address);
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: agency.name,
        text: `Check out ${agency.name} - Housing Authority`,
        url: window.location.href
      });
    }
  };

  return (
    <Card
      className="group relative overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer border border-gray-700/50 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 hover:border-blue-500/30 hover:scale-[1.02] backdrop-blur-sm"
      onClick={handleClick}
    >
      {/* Compact Modern Header */}
      <div className="relative p-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/30">
        <div className="relative flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            {/* Compact icon */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-4 h-4 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-xs leading-tight line-clamp-2 group-hover:text-blue-100 transition-colors duration-300">
                {agency.name}
              </h4>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-400 bg-gray-800/50 px-1.5 py-0.5 rounded-full border border-gray-600/50">
                  {agency.program_type || 'Housing Authority'}
                </span>
                <div className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                  <span className="text-xs text-yellow-400 font-medium">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact status */}
          <div className="flex items-center gap-1 bg-green-500/10 px-1.5 py-0.5 rounded-full border border-green-500/20">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">Available</span>
          </div>
        </div>
      </div>

      {/* Compact Modern Content */}
      <div className="relative p-3 space-y-2">
        {/* Compact Address */}
        {fullAddress && (
          <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-colors duration-300">
            <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3 h-3 text-blue-400" />
            </div>
            <p className="text-xs text-gray-300 truncate flex-1">{fullAddress}</p>
          </div>
        )}

        {/* Compact Contact Info */}
        <div className="grid grid-cols-1 gap-1">
          {agency.phone && (
            <div className="flex items-center gap-2 p-1.5 bg-gray-800/20 rounded-lg border border-gray-700/20 hover:bg-gray-800/40 transition-all duration-300">
              <div className="w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-2.5 h-2.5 text-green-400" />
              </div>
              <span className="text-xs text-gray-300 font-medium">{agency.phone}</span>
            </div>
          )}

          {agency.email && (
            <div className="flex items-center gap-2 p-1.5 bg-gray-800/20 rounded-lg border border-gray-700/20 hover:bg-gray-800/40 transition-all duration-300">
              <div className="w-5 h-5 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-2.5 h-2.5 text-blue-400" />
              </div>
              <span className="text-xs text-gray-300 font-medium truncate">{agency.email}</span>
            </div>
          )}
        </div>

        {/* Compact Services */}
        <div className="flex flex-wrap gap-1">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30 text-xs px-1.5 py-0.5 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
            Section 8
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 text-xs px-1.5 py-0.5 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300">
            Public Housing
          </Badge>
        </div>

        {/* Compact Stats */}
        <div className="grid grid-cols-2 gap-2 p-2 bg-gradient-to-r from-gray-800/30 to-gray-700/20 rounded-lg border border-gray-700/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 mb-0.5">
              <Users className="w-2.5 h-2.5 text-blue-400" />
              <span className="text-xs text-gray-400">Families</span>
            </div>
            <p className="text-xs font-bold text-white">1,200+</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 mb-0.5">
              <Calendar className="w-2.5 h-2.5 text-green-400" />
              <span className="text-xs text-gray-400">Wait List</span>
            </div>
            <p className="text-xs font-bold text-green-400">Open</p>
          </div>
        </div>
      </div>

      {/* Modern hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"></div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-500/20 transition-all duration-500 pointer-events-none"></div>
    </Card>
  );
};

export default PHAOfficeCard;
