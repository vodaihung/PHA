import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePHAData } from '@/hooks/usePHAData';
import { filterPHAAgenciesByState } from '@/utils/mapUtils';
import { 
  CheckCircle, MapPin, Phone, Mail, Heart, Building, ArrowLeft, ChevronDown, Star, Clock, 
  Users, Award, Search, Filter, Map, List, SlidersHorizontal, ArrowRight, ExternalLink,
  Navigation, Copy, Share, Bookmark, CheckCircle2, X, Grid, LayoutGrid
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoogleMapsService } from '@/services/googleMapsService';

const StateOffices = () => {
  const { state } = useParams<{ state: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const stateName = state ? decodeURIComponent(state) : '';
  const cityFilter = searchParams.get('city');
  
  const { allPHAAgencies, loading } = usePHAData();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [noImageryAgencies, setNoImageryAgencies] = useState<Set<string>>(new Set());
  
  // Filter and search logic
  const filteredAndSortedAgencies = useMemo(() => {
    if (!stateName || !allPHAAgencies.length) return [];
    
    let filtered = filterPHAAgenciesByState(allPHAAgencies, stateName);
    
    // Apply city filter from URL
    if (cityFilter) {
      filtered = filtered.filter(agency => {
        const address = agency.address || '';
        const agencyName = agency.name || '';
        return address.toLowerCase().includes(cityFilter.toLowerCase()) ||
               agencyName.toLowerCase().includes(cityFilter.toLowerCase());
      });
    }
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(agency => {
        const searchTerm = searchQuery.toLowerCase();
        return (
          agency.name?.toLowerCase().includes(searchTerm) ||
          agency.address?.toLowerCase().includes(searchTerm) ||
          agency.phone?.includes(searchTerm) ||
          agency.email?.toLowerCase().includes(searchTerm)
        );
      });
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(agency => {
        if (filterType === 'phone') return agency.phone;
        if (filterType === 'email') return agency.email;
        return true;
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'location':
          return (a.address || '').localeCompare(b.address || '');
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [stateName, allPHAAgencies, cityFilter, searchQuery, filterType, sortBy]);

  const visibleAgencies = filteredAndSortedAgencies.slice(0, visibleCount);
  const hasMoreAgencies = visibleCount < filteredAndSortedAgencies.length;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, filteredAndSortedAgencies.length));
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDetailView = (agency: any) => {
    navigate(`/pha/${agency.id}`);
  };

  const handleToggleFavorite = (agency: any) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(agency.id)) {
        newFavorites.delete(agency.id);
      } else {
        newFavorites.add(agency.id);
      }
      // In a real app, you'd save this to localStorage or a backend
      return newFavorites;
    });
  };

  const handleGetDirections = (agency: any) => {
    if (agency.address) {
      const encodedAddress = encodeURIComponent(agency.address);
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleShare = async (agency: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: agency.name,
          text: `Check out ${agency.name} - Housing Authority`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleImageError = (agencyId: string) => {
    setImageErrors(prev => new Set([...prev, agencyId]));
  };

  const handleImageLoad = (agencyId: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    
    if (img.naturalWidth <= 1 || img.naturalHeight <= 1 || 
        (img.naturalWidth === 640 && img.naturalHeight === 640) ||
        img.src.includes('sorry') || 
        img.complete && img.naturalWidth < 100) {
      setNoImageryAgencies(prev => new Set([...prev, agencyId]));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading housing offices...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest information</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      {/* Enhanced Navigation Bar */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackClick}
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back</span>
              </Button>
              
              {/* Enhanced Breadcrumb */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-gray-500">Housing</span>
                <ChevronDown className="w-3 h-3 text-gray-400 rotate-[-90deg]" />
                <span className="text-blue-600 font-medium">{stateName}</span>
                {cityFilter && (
                  <>
                    <ChevronDown className="w-3 h-3 text-gray-400 rotate-[-90deg]" />
                    <span className="text-purple-600 font-medium">{cityFilter}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{filteredAndSortedAgencies.length}</div>
                <div className="text-xs text-gray-500">Offices Found</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-600">Active</div>
                <div className="text-xs text-gray-500">All Listings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="relative text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Column - Content */}
                <div className="text-center lg:text-left space-y-8">
                  {/* Status Badge */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="inline-flex items-center justify-center bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-6 py-3">
                      <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                      <span className="text-green-100 font-semibold">Live Directory</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none">
                      <span className="block text-white/90 mb-2">Housing Offices</span>
                      <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                        in {stateName}
                      </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl">
                      {cityFilter 
                        ? `Discover available housing opportunities in ${cityFilter}`
                        : 'Find your next home with comprehensive housing authority directory'
                      }
                    </p>
                  </div>
                  
                  {/* Enhanced Search Bar */}
                  <div className="max-w-lg mx-auto lg:mx-0">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search by name, location, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-12 py-6 text-lg bg-white/90 backdrop-blur-sm border-white/30 focus:bg-white rounded-2xl shadow-xl"
                      />
                      {searchQuery && (
                        <Button
                          onClick={() => setSearchQuery('')}
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Quick Filter Tags */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Button
                      onClick={() => setFilterType(filterType === 'phone' ? 'all' : 'phone')}
                      variant="outline"
                      size="sm"
                      className={`rounded-full px-4 py-2 transition-all duration-200 ${
                        filterType === 'phone' 
                          ? 'bg-white text-blue-600 border-white' 
                          : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                      }`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Has Phone
                    </Button>
                    <Button
                      onClick={() => setFilterType(filterType === 'email' ? 'all' : 'email')}
                      variant="outline"
                      size="sm"
                      className={`rounded-full px-4 py-2 transition-all duration-200 ${
                        filterType === 'email' 
                          ? 'bg-white text-blue-600 border-white' 
                          : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                      }`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Has Email
                    </Button>
                  </div>
                </div>
                
                {/* Right Column - Stats Dashboard */}
                <div className="space-y-6">
                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Building className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-black mb-2">{filteredAndSortedAgencies.length}</div>
                        <div className="text-white/80 text-sm font-medium">Active Offices</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-black mb-2">24/7</div>
                        <div className="text-white/80 text-sm font-medium">Support Available</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-black mb-2">Verified</div>
                        <div className="text-white/80 text-sm font-medium">Information</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Clock className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-black mb-2">Real-time</div>
                        <div className="text-white/80 text-sm font-medium">Updates</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls Section */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Search Results Info */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{filteredAndSortedAgencies.length}</span> office{filteredAndSortedAgencies.length !== 1 ? 's' : ''} found
                  {searchQuery && (
                    <span> for "<span className="font-medium text-blue-600">{searchQuery}</span>"</span>
                  )}
                </div>
                {(searchQuery || filterType !== 'all') && (
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('all');
                    }}
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-md"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-md"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Advanced Filters Toggle */}
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
            
            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200 shadow-lg animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Method</label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Offices</SelectItem>
                        <SelectItem value="phone">Has Phone Number</SelectItem>
                        <SelectItem value="email">Has Email Address</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Search</label>
                    <Input
                      placeholder="City, ZIP, or address..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterType('all');
                        setShowFilters(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Offices List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredAndSortedAgencies.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Building className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-600 mb-4">No Offices Found</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto mb-6">
                {searchQuery 
                  ? `No results found for "${searchQuery}". Try adjusting your search or filters.`
                  : cityFilter 
                    ? `We couldn't find any PHA offices in ${cityFilter}, ${stateName} at this time.`
                    : `We couldn't find any PHA offices for ${stateName} at this time.`
                }
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Clear Search & Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Office Cards */}
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
              }>
                {visibleAgencies.map((agency, index) => {
                  const hasImageError = imageErrors.has(agency.id);
                  const hasNoImagery = noImageryAgencies.has(agency.id);
                  const shouldShowGradient = hasImageError || hasNoImagery;
                  const fullAddress = agency.address || '';
                  const streetViewImage = fullAddress ? GoogleMapsService.getStreetViewImage({
                    address: fullAddress,
                    size: '400x200'
                  }) : null;
                  const isFavorite = favorites.has(agency.id);

                  return (
                    <Card 
                      key={agency.id} 
                      className={`group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:bg-white hover:scale-[1.02] animate-fade-in-up ${
                        viewMode === 'grid' ? 'h-full' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-0">
                        <div className={viewMode === 'grid' ? 'flex flex-col h-full' : 'flex flex-col lg:flex-row'}>
                          {/* Image Section */}
                          <div className={`relative overflow-hidden ${
                            viewMode === 'grid' 
                              ? 'w-full h-48' 
                              : 'w-full lg:w-80 h-48 lg:h-auto'
                          }`}>
                            {streetViewImage && !shouldShowGradient ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={streetViewImage}
                                  alt={`Street view of ${agency.name}`}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  onError={() => handleImageError(agency.id)}
                                  onLoad={(e) => handleImageLoad(agency.id, e)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-500"></div>
                                
                                {/* Floating Elements */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold">
                                    Section 8 PHA
                                  </Badge>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(agency);
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className={`rounded-full p-2 backdrop-blur-sm transition-all duration-300 ${
                                      isFavorite 
                                        ? 'bg-red-500/90 text-white hover:bg-red-600' 
                                        : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                  >
                                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                  </Button>
                                </div>
                                
                                <div className="absolute bottom-4 left-4 right-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                      <span className="text-white text-sm font-medium">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-white text-sm font-medium">4.8</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 relative overflow-hidden w-full h-full">
                                <div className="absolute inset-0 opacity-20" style={{
                                  backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                                  backgroundSize: '40px 40px'
                                }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                
                                {/* Floating Elements */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold">
                                    Section 8 PHA
                                  </Badge>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(agency);
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className={`rounded-full p-2 backdrop-blur-sm transition-all duration-300 ${
                                      isFavorite 
                                        ? 'bg-red-500/90 text-white hover:bg-red-600' 
                                        : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                  >
                                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                  </Button>
                                </div>
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <Building className="w-16 h-16 text-white/40 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                      <span className="text-white font-medium">Housing Authority</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="absolute bottom-4 left-4 right-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                      <span className="text-white text-sm font-medium">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-white text-sm font-medium">4.8</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Content Section */}
                          <div className={`${viewMode === 'grid' ? 'flex-1 p-6' : 'flex-1 p-6 lg:p-8'}`}>
                            <div className="flex flex-col h-full">
                              {/* Header */}
                              <div className="mb-6">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                      {agency.name}
                                    </h3>
                                    {agency.address && (
                                      <div className="flex items-start gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-blue-500" />
                                        <span className="text-sm leading-relaxed">{agency.address}</span>
                                      </div>
                                    )}
                                  </div>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleShare(agency);
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-400 hover:text-blue-600 rounded-full"
                                  >
                                    <Share className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Contact Information */}
                              <div className={`grid gap-3 mb-6 ${
                                viewMode === 'grid' 
                                  ? 'grid-cols-1' 
                                  : 'grid-cols-1 sm:grid-cols-2'
                              }`}>
                                {agency.phone && (
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCall(agency.phone);
                                    }}
                                    variant="outline"
                                    className="flex items-center justify-start gap-3 p-4 h-auto border-green-200 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 transition-all duration-200"
                                  >
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                      <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-left min-w-0 flex-1">
                                      <div className="text-xs text-green-600 font-medium">Call Now</div>
                                      <div className="font-semibold truncate">{agency.phone}</div>
                                    </div>
                                  </Button>
                                )}
                                
                                {agency.email && (
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEmail(agency.email);
                                    }}
                                    variant="outline"
                                    className="flex items-center justify-start gap-3 p-4 h-auto border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-all duration-200"
                                  >
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                      <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-left min-w-0 flex-1">
                                      <div className="text-xs text-blue-600 font-medium">Send Email</div>
                                      <div className="font-semibold truncate">{agency.email}</div>
                                    </div>
                                  </Button>
                                )}
                                
                                {agency.address && (
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleGetDirections(agency);
                                    }}
                                    variant="outline"
                                    className="flex items-center justify-start gap-3 p-4 h-auto border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 transition-all duration-200"
                                  >
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                      <Navigation className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-left min-w-0 flex-1">
                                      <div className="text-xs text-purple-600 font-medium">Get Directions</div>
                                      <div className="font-semibold text-sm">View in Maps</div>
                                    </div>
                                  </Button>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                <Button
                                  onClick={() => handleDetailView(agency)}
                                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                                >
                                  <CheckCircle2 className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                                  View Full Details
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                              </div>
                              
                              {/* Status Tags */}
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                    Housing Authority
                                  </Badge>
                                  {agency.program_type && (
                                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                                      {agency.program_type}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="text-xs font-medium">Active</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Enhanced Load More Button */}
              {hasMoreAgencies && (
                <div className="text-center pt-12">
                  <div className="inline-flex flex-col items-center gap-4">
                    <Button
                      onClick={handleShowMore}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/more"
                    >
                      <ChevronDown className="w-5 h-5 mr-3 group-hover/more:translate-y-1 transition-transform" />
                      Load More Offices
                      <ArrowRight className="w-5 h-5 ml-3 group-hover/more:translate-x-1 transition-transform" />
                    </Button>
                    <div className="text-gray-500 text-sm">
                      Showing <span className="font-semibold text-gray-900">{visibleCount}</span> of{' '}
                      <span className="font-semibold text-gray-900">{filteredAndSortedAgencies.length}</span> offices
                    </div>
                    <div className="w-64 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(visibleCount / filteredAndSortedAgencies.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StateOffices;
