import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Home, Shield, Bell, Sparkles } from "lucide-react";
import { USLocation } from "@/data/usLocations";
import CitySearch from "./CitySearch";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCitySelect?: (location: USLocation) => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onCitySelect, showSearch = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCitySelectFromHeader = (location: USLocation) => {
    console.log('🏙️ Header location selected:', location);
    if (onCitySelect) {
      onCitySelect(location);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigation = [
    {
      name: 'Section 8',
      href: '/section8',
      icon: Home,
      description: 'Housing Assistance'
    },
    {
      name: 'Admin',
      href: '/auth',
      icon: Shield,
      description: 'Management'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Notice Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center gap-2 text-center">
            <Bell className="w-4 h-4 text-amber-600" />
            <p className="text-sm text-amber-800 font-medium">
              <span className="font-semibold">Notice:</span> This is a private platform, not affiliated with government agencies.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 transition-all duration-300 ${
        scrolled ? 'shadow-xl bg-white/98' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition-all duration-300 hover:scale-105">
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
                    alt="PHA Logo"
                    className="w-14 h-14 rounded-2xl object-cover shadow-xl border-2 border-emerald-200 group-hover:border-emerald-300 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl group-hover:from-emerald-500/30 group-hover:to-blue-500/30 transition-all duration-300"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-2xl font-black text-gray-900 tracking-tight">
                    <span className="text-emerald-600">PHA</span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-600 -mt-1 flex items-center gap-1">
                    <span>Housing Assistance Directory</span>
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Search */}
            {!isMobile && showSearch && onCitySelect && (
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent bg-white shadow-sm">
                    <CitySearch 
                      onCitySelect={handleCitySelectFromHeader}
                      placeholder="Search your city, county, or ZIP code..."
                      variant="header"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </nav>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-3 rounded-xl text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Search */}
          {isMobile && showSearch && onCitySelect && (
            <div className="pb-4 border-t border-gray-100">
              <div className="pt-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent bg-white shadow-sm">
                    <CitySearch 
                      onCitySelect={handleCitySelectFromHeader}
                      placeholder="Search your location..."
                      variant="header"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && isMobileMenuOpen && (
            <div className="border-t border-gray-100 py-4">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 hover:shadow-md'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive(item.href) ? 'bg-white/20' : 'bg-emerald-100'
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        isActive(item.href) ? 'text-white' : 'text-emerald-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className={`text-sm ${
                        isActive(item.href) ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
