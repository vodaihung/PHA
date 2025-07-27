import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OfficeDetailsPanel from "@/components/OfficeDetailsPanel";
import MapContainer from "@/components/MapContainer";
import Header from "@/components/Header";
import MobileSection8Layout from "@/components/MobileSection8Layout";
import { useMapLogic } from "@/hooks/useMapLogic";
import { useIsMobile } from "@/hooks/use-mobile";
import { Database } from "@/integrations/supabase/types";
import { Search, MapPin, Building2, Phone, Clock, Users, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

const Section8 = () => {
  console.log('Section8 component rendering...');
  
  const location = useLocation();
  const searchLocation = location.state?.searchLocation;
  const [showHero, setShowHero] = useState(true);
  
  const {
    mapboxToken,
    selectedOffice,
    selectedLocation,
    filteredLocation,
    tokenError,
    mapRef,
    phaAgencies,
    loading,
    currentPage,
    totalPages,
    totalCount,
    setSelectedOffice,
    setTokenError,
    handleTokenChange,
    handlePageChange,
    handleCitySelect,
    setSelectedLocation,
    clearLocationFilter,
    resetToUSView,
  } = useMapLogic();

  const isMobile = useIsMobile();

  // Handle navigation from state page
  useEffect(() => {
    if (searchLocation && mapRef.current) {
      console.log('🏛️ Received search location from state page:', searchLocation);
      handleCitySelect(searchLocation);
      setShowHero(false);
    }
  }, [searchLocation, handleCitySelect]);

  // Reset to US view when component mounts (only if no search location)
  useEffect(() => {
    if (!searchLocation) {
      const timer = setTimeout(() => {
        if (mapRef.current) {
          console.log('🇺🇸 Initial page load - showing US map');
          resetToUSView();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchLocation]);

  // Hide hero when user performs a search
  useEffect(() => {
    if (filteredLocation || selectedLocation) {
      setShowHero(false);
    }
  }, [filteredLocation, selectedLocation]);

  const handleOfficeClick = (office: PHAAgency) => {
    console.log('🎯 Office clicked from panel:', office.name);
    setSelectedOffice(office);
  };

  const handleHeaderCitySelect = (location: any) => {
    console.log('🏙️ Section8 received location selection:', location);
    handleCitySelect(location);
    setShowHero(false);
  };

  if (!mapboxToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Configuration Required</h2>
          <p className="text-white/80">Please configure your Mapbox token to view the interactive map.</p>
        </div>
      </div>
    );
  }

  const heroSection = showHero && (
    <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl lg:text-6xl font-black mb-2 drop-shadow-2xl">
                Section 8 Housing
              </h1>
              <p className="text-2xl text-emerald-100 font-semibold">
                Find affordable housing assistance near you
              </p>
            </div>
          </div>

          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Search thousands of Public Housing Authorities (PHAs) across the United States.
            Find contact information, program details, and apply for housing assistance in your area.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Search className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-black text-white">Find Housing Assistance</h2>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center gap-4">
                <MapPin className="w-8 h-8 text-emerald-300" />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter your city, county, or ZIP code..."
                    className="w-full text-xl text-white placeholder-white/60 border-none outline-none bg-transparent font-semibold"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // Handle search
                        setShowHero(false);
                      }
                    }}
                  />
                </div>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setShowHero(false)}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/15 backdrop-blur-xl border border-white/30 text-white p-8 hover:bg-white/25 transition-all duration-500 transform hover:scale-105 shadow-2xl rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl">Nationwide Coverage</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">
              Access information for thousands of PHAs across all 50 states and territories.
            </p>
          </Card>

          <Card className="bg-white/15 backdrop-blur-xl border border-white/30 text-white p-8 hover:bg-white/25 transition-all duration-500 transform hover:scale-105 shadow-2xl rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl">Direct Contact</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">
              Get phone numbers, addresses, and contact information for each PHA office.
            </p>
          </Card>

          <Card className="bg-white/15 backdrop-blur-xl border border-white/30 text-white p-8 hover:bg-white/25 transition-all duration-500 transform hover:scale-105 shadow-2xl rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl">Real-time Updates</h3>
            </div>
            <p className="text-purple-100">
              Current information on housing programs, waiting lists, and application status.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col relative overflow-hidden">
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
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header
          showSearch={true}
          onCitySelect={handleHeaderCitySelect}
        />
      </div>


      {/* Main Content */}
      <div className="flex-1 relative z-10">
        {isMobile ? (
          <MobileSection8Layout
            mapboxToken={mapboxToken}
            selectedOffice={selectedOffice}
            filteredLocation={filteredLocation}
            mapRef={mapRef}
            phaAgencies={phaAgencies}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            viewState="overview"
            detailOffice={null}
            setSelectedOffice={setSelectedOffice}
            handleOfficeClick={handleOfficeClick}
            handleViewHousing={() => {}}
            handleBackToOverview={() => {}}
            handleBackToPHADetail={() => {}}
            handlePageChange={handlePageChange}
            clearLocationFilter={clearLocationFilter}
            setTokenError={setTokenError}
            selectedLocation={selectedLocation}
          />
        ) : (
          <div className="h-[calc(100vh-64px)] overflow-hidden">
             <div className="flex h-full bg-gray-900/50 backdrop-blur-xl">
                {/* Left Panel - Map */}
                <div className="w-3/5 h-full bg-gray-800/50 backdrop-blur-xl border-r border-white/10">
                  <MapContainer
                    ref={mapRef}
                    mapboxToken={mapboxToken}
                    phaAgencies={phaAgencies}
                    onOfficeSelect={handleOfficeClick}
                    onTokenError={setTokenError}
                    selectedOffice={selectedOffice}
                    selectedLocation={selectedLocation}
                  />
                </div>

                {/* Right Panel - Office List */}
                <div className="w-2/5 h-full overflow-y-auto bg-gray-900/80 backdrop-blur-xl">
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
                  />
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section8;
