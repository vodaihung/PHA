import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Users, MapPin, Clock, Globe, MessageCircle, Copy, ExternalLink } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAContactInfoProps {
  office: PHAAgency;
}

const PHAContactInfo: React.FC<PHAContactInfoProps> = ({ office }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Card className="shadow-lg border-0 bg-slate-800/90 backdrop-blur-sm border-slate-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl text-white">
          <Users className="w-6 h-6 text-emerald-400" />
          Contact Information
        </CardTitle>
        <CardDescription className="text-base text-slate-300">
          Multiple ways to get in touch with this housing authority
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Contact Methods */}
        <div className="space-y-4">
          {office.phone && (
            <div className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl border border-blue-400/30 group hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center group-hover:bg-blue-500/40 transition-colors duration-200">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-300 mb-1">Main Phone</div>
                    <div className="text-lg font-bold text-blue-300 group-hover:text-blue-200">
                      {office.phone}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700/80 hover:bg-slate-600 border-slate-600 text-slate-300"
                    onClick={() => copyToClipboard(office.phone)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open(`tel:${office.phone}`, '_self')}
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {office.email && (
            <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-xl border border-emerald-400/30 group hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors duration-200">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-300 mb-1">General Email</div>
                    <div className="text-sm font-bold text-emerald-300 group-hover:text-emerald-200 truncate">
                      {office.email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700/80 hover:bg-slate-600 border-slate-600 text-slate-300"
                    onClick={() => copyToClipboard(office.email)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => window.open(`mailto:${office.email}`, '_self')}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </div>
          )}

          {office.exec_dir_email && (
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-400/30 group hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center group-hover:bg-purple-500/40 transition-colors duration-200">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-300 mb-1">Executive Director</div>
                    <div className="text-sm font-bold text-purple-300 group-hover:text-purple-200 truncate">
                      {office.exec_dir_email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700/80 hover:bg-slate-600 border-slate-600 text-slate-300"
                    onClick={() => copyToClipboard(office.exec_dir_email)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => window.open(`mailto:${office.exec_dir_email}`, '_self')}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Address Information */}
        {office.address && (
          <div className="p-4 bg-gradient-to-r from-slate-600/20 to-slate-700/20 rounded-xl border border-slate-500/30">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-600/30 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-slate-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-300 mb-1">Office Address</div>
                <div className="text-white font-medium mb-3">{office.address}</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700/80 hover:bg-slate-600 border-slate-600 text-slate-300"
                    onClick={() => copyToClipboard(office.address)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-700/80 hover:bg-slate-600 border-slate-600 text-slate-300"
                    onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(office.address)}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Office Hours */}
        <div className="p-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl border border-amber-400/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-amber-500/30 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-300">Office Hours</div>
              <div className="text-amber-300 font-semibold">Monday - Friday</div>
            </div>
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span>Walk-in Hours:</span>
              <span className="font-medium text-white">9:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Phone Hours:</span>
              <span className="font-medium text-white">8:00 AM - 5:00 PM</span>
            </div>
            <div className="text-xs text-amber-300 mt-2">
              * Closed on federal holidays
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="p-4 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 rounded-xl border border-indigo-400/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-indigo-500/30 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-300">Best Contact Methods</div>
              <div className="text-indigo-300 font-semibold">For Different Purposes</div>
            </div>
          </div>
          <div className="text-sm text-slate-300 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span><strong className="text-white">Applications:</strong> Visit in person with documents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span><strong className="text-white">General Questions:</strong> Call or email</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span><strong className="text-white">Urgent Issues:</strong> Call during business hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span><strong className="text-white">Complaints:</strong> Email executive director</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl border border-red-400/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-300">Emergency Contact</div>
              <div className="text-red-300 font-semibold">After Hours Emergencies</div>
            </div>
          </div>
          <div className="text-sm text-slate-300">
            For housing emergencies after business hours, contact your local emergency services or housing authority's emergency line.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PHAContactInfo;
