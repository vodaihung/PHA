import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, MapPin, Phone, Mail, ExternalLink, Star, Sparkles, Heart, ChevronRight, Globe, Users, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { name: 'Section 8 Housing', href: '/section8', icon: Home, description: 'Find housing assistance' },
    { name: 'Admin Portal', href: '/auth', icon: Shield, description: 'Data management' }
  ];

  const stateLinks = [
    'California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania',
    'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'Virginia', 'Washington'
  ];

  const features = [
    { icon: Globe, title: 'Nationwide Coverage', description: '50 states, 2,500+ authorities' },
    { icon: Users, title: 'Trusted Platform', description: '100k+ families helped' },
    { icon: Clock, title: '24/7 Access', description: 'Search anytime, anywhere' },
    { icon: Zap, title: 'Always Free', description: 'No hidden fees or charges' }
  ];

  const resources = [
    { name: 'Housing Guide', href: '#', external: false },
    { name: 'Waitlist Tips', href: '#', external: false },
    { name: 'Eligibility Calculator', href: '#', external: false },
    { name: 'HUD Official Site', href: 'https://www.hud.gov', external: true }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>Trusted by 100,000+ Families</span>
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-blue-200">
                Your Journey to
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400">
                Better Housing
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with local resources for Section 8 housing assistance.
              <span className="font-semibold text-emerald-300"> Fast, free, and designed to help you succeed.</span>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Links Section */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              Quick Access
            </h3>
            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <link.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{link.name}</div>
                    <div className="text-gray-400 text-xs">{link.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Popular States */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Popular States
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {stateLinks.map((state, index) => (
                <Link
                  key={index}
                  to={`/state/${encodeURIComponent(state)}`}
                  className="group flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-sm"
                >
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium truncate">
                    {state}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Resources
            </h3>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                resource.external ? (
                  <a
                    key={index}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-sm"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors font-medium flex-1">
                      {resource.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-sm"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors font-medium flex-1">
                      {resource.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Contact & CTA */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Get Started
            </h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-black text-white mb-3">Need Help?</h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  Our platform is designed to help you find housing assistance quickly and easily.
                </p>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                  <Home className="w-5 h-5 mr-2" />
                  Start Your Search
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">support@assistancehub.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Available 24/7 Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo & Brand */}
            <div className="flex items-center gap-4">
              <img
                src="/lovable-uploads/221b75b2-2ed8-4872-b9ef-18b878e8e8fe.png"
                alt="PHA Logo"
                className="h-12 w-auto"
              />
              <div>
                <div className="text-xl font-black text-white">PHA</div>
                <div className="text-sm text-gray-400">Your path to better housing</div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-black text-white">2,500+</div>
                <div className="text-xs text-gray-400 font-medium">Housing Authorities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white">100k+</div>
                <div className="text-xs text-gray-400 font-medium">Families Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white">50</div>
                <div className="text-xs text-gray-400 font-medium">States Covered</div>
              </div>
            </div>
          </div>

          {/* Disclaimer & Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white mb-2 flex items-center gap-2">
                    Important Disclaimer
                    <Star className="w-4 h-4 text-yellow-400" />
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="font-semibold text-white">AssistanceHub</span> is a privately owned platform and is not affiliated with or endorsed by any government agency. 
                    The information provided on this site is for general educational purposes only and should not be considered 
                    legal or financial advice. Government programs may change without notice, and while we aim to keep information 
                    accurate and up to date, readers should verify details through official sources or directly with approved 
                    service providers.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>© 2024 AssistanceHub. Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for families in need.</span>
              </div>
              <div className="flex items-center gap-6">
                <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="#" className="hover:text-white transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
