import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import OfficeDetailsPanel from "@/components/OfficeDetailsPanel";
import PHADetailView from "@/components/PHADetailView";
import HousingListings from "@/components/HousingListings";
import MapContainer from "@/components/MapContainer";
import { Database } from "@/integrations/supabase/types";
import { X, Map, List, ArrowLeft, Navigation } from "lucide-react";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];
type ViewState = 'overview' | 'pha-detail' | 'housing-listings';

interface MobileSection8LayoutProps {
  mapboxToken: string;
  selectedOffice: PHAAgency | null;
  filteredLocation: any;
  mapRef: any;
  phaAgencies: PHAAgency[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  viewState: ViewState;
  detailOffice: PHAAgency | null;
  setSelectedOffice: (office: PHAAgency | null) => void;
  handleOfficeClick: (office: PHAAgency) => void;
  handleViewHousing: (office: PHAAgency) => void;
  handleBackToOverview: () => void;
  handleBackToPHADetail: () => void;
  handlePageChange: (page: number) => void;
  clearLocationFilter: () => void;
  setTokenError: (error: string | null) => void;
  selectedLocation: any;
}

const MobileSection8Layout: React.FC<MobileSection8LayoutProps> = ({
  mapboxToken,
  selectedOffice,
  filteredLocation,
  mapRef,
  phaAgencies,
  loading,
  currentPage,
  totalPages,
  totalCount,
  viewState,
  detailOffice,
  setSelectedOffice,
  handleOfficeClick,
  handleViewHousing,
  handleBackToOverview,
  handleBackToPHADetail,
  handlePageChange,
  clearLocationFilter,
  setTokenError,
  selectedLocation,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');

  const handleShowMap = (office?: PHAAgency) => {
    if (office) {
      setSelectedOffice(office);
    }
    setShowMap(true);
    setActiveView('map');
  };

  const handleShowList = () => {
    setActiveView('list');
    setShowMap(false);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setActiveView('list');
    setSelectedOffice(null);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'pha-detail':
        return detailOffice ? (
          <PHADetailView 
            office={detailOffice}
            onViewHousing={handleViewHousing}
            onBack={handleBackToOverview}
            onShowMap={() => handleShowMap(detailOffice)}
          />
        ) : null;
      
      case 'housing-listings':
        return detailOffice ? (
          <HousingListings 
            office={detailOffice}
            onBack={handleBackToPHADetail}
          />
        ) : null;
      
      default:
        return (
          <OfficeDetailsPanel
            selectedOffice={selectedOffice}
            onOfficeClick={handleOfficeClick}
            phaAgencies={phaAgencies}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            onShowAll={clearLocationFilter}
            hasFilter={!!filteredLocation}
            filteredLocation={filteredLocation}
            onShowMap={handleShowMap}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Mobile Navigation Toggle */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-center p-2">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <Button
              variant={activeView === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={handleShowList}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'list'
                  ? 'bg-white shadow-sm text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              Office List
            </Button>
            <Button
              variant={activeView === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleShowMap()}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'map'
                  ? 'bg-white shadow-sm text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="flex-1 flex flex-col">
          {/* Map Header */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedOffice ? selectedOffice.name : 'Interactive Map'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedOffice ? 'Selected Office' : 'Explore PHA locations'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseMap}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              ref={mapRef}
              mapboxToken={mapboxToken}
              phaAgencies={phaAgencies}
              onOfficeSelect={handleOfficeClick}
              onTokenError={setTokenError}
              selectedOffice={selectedOffice}
              selectedLocation={selectedLocation}
            />
            
            {/* Floating Action Button */}
            <div className="absolute bottom-4 right-4">
              <Button
                onClick={handleShowList}
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-full shadow-lg px-4 py-2 font-medium"
              >
                <List className="w-4 h-4 mr-2" />
                View List
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {!showMap && (
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      )}

      {/* Quick Stats Bar */}
      {!showMap && phaAgencies.length > 0 && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {totalCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Total Offices</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {totalPages}
                  </div>
                  <div className="text-xs text-gray-500">Pages</div>
                </div>
              </div>
              <Button
                onClick={() => handleShowMap()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg"
              >
                <Map className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSection8Layout;
