import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Filter, Building2, Search } from "lucide-react";
import PHAOfficeCard from "./PHAOfficeCard";
import EmptyOfficeState from "./EmptyOfficeState";
import { Database } from "@/integrations/supabase/types";
import { USLocation } from "@/data/usLocations";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface OfficeDetailsPanelProps {
  selectedOffice: PHAAgency | null;
  onOfficeClick: (office: PHAAgency) => void;
  phaAgencies: PHAAgency[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onShowAll?: () => void;
  hasFilter?: boolean;
  filteredLocation?: USLocation | null;
  onShowMap?: (office?: PHAAgency) => void;
}

const OfficeDetailsPanel: React.FC<OfficeDetailsPanelProps> = ({
  selectedOffice,
  onOfficeClick,
  phaAgencies,
  loading,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onShowAll,
  hasFilter,
  filteredLocation,
  onShowMap
}) => {
  // Show empty state when no agencies are available
  if (phaAgencies.length === 0 && !loading) {
    return (
      <EmptyOfficeState 
        loading={loading} 
        onShowAll={onShowAll}
        hasFilter={hasFilter}
        filteredLocation={filteredLocation}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black">
      {/* Modern Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl sticky top-0 z-10">
        <div className="p-4 lg:p-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">
                  PHA Offices
                </h2>
                <p className="text-sm text-white/70 font-semibold">
                  Find housing assistance near you
                </p>
              </div>
            </div>

            {hasFilter && onShowAll && (
              <Button
                onClick={onShowAll}
                variant="outline"
                size="sm"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 border-emerald-400/30 px-4 py-2 font-semibold"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filter
              </Button>
            )}
          </div>
          
          {/* Search Context */}
          {hasFilter && filteredLocation && (
            <Card className="bg-emerald-500/10 backdrop-blur-xl border border-emerald-400/30 p-4 mb-4 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-emerald-300 mb-1">
                    Search Results
                  </div>
                  <div className="text-sm text-white/80">
                    {filteredLocation.type === 'state' && (
                      <span>All offices in {filteredLocation.name}</span>
                    )}
                    {filteredLocation.type === 'city' && (
                      <span>Within 25 miles of {filteredLocation.name}, {filteredLocation.stateCode}</span>
                    )}
                    {filteredLocation.type === 'county' && (
                      <span>In {filteredLocation.name}, {filteredLocation.stateCode}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {loading ? (
                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-semibold">Loading offices...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">
                    {totalCount.toLocaleString()} office{totalCount !== 1 ? 's' : ''} found
                  </span>
                </div>
              )}
            </div>

            {/* Page indicator */}
            {totalPages > 1 && (
              <div className="bg-white/10 backdrop-blur-xl px-3 py-1 rounded-full border border-white/20">
                <span className="text-xs font-semibold text-white/80">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-semibold">Loading PHA offices...</p>
            <p className="text-sm text-white/70 mt-1">Please wait while we fetch the latest data</p>
          </div>
        </div>
      )}

      {/* Office List */}
      {!loading && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 space-y-4">
            {phaAgencies.map((office, index) => (
              <div 
                key={office.id} 
                className="transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <PHAOfficeCard
                  agency={office}
                  onOfficeClick={() => onOfficeClick(office)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modern Pagination */}
      {!loading && totalPages > 1 && (
        <div className="bg-gray-900/80 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center gap-2 px-4 py-2 font-semibold disabled:opacity-50 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-400/30 text-white border-white/30 bg-gray-800/50"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
                <span className="hidden sm:inline text-white">Previous</span>
                <span className="sm:hidden text-white">Prev</span>
              </Button>
              
              {/* Enhanced Page Info */}
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-white">
                    {currentPage} of {totalPages}
                  </div>
                  <div className="text-xs text-white/70">
                    {totalCount.toLocaleString()} total results
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-2 px-4 py-2 font-semibold disabled:opacity-50 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-400/30 text-white border-white/30 bg-gray-800/50"
              >
                <span className="hidden sm:inline text-white">Next</span>
                <span className="sm:hidden text-white">Next</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </Button>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="mt-4 w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              >
                <div className="h-full bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeDetailsPanel;
