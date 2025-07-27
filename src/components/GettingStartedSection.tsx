import React, { useState } from 'react';
import { Search, MapPin, Phone, CheckCircle, ArrowRight, Play, Sparkles, Star, Zap, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GettingStartedSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Search Your Area",
      description: "Enter your city, state, or ZIP code to find housing authorities near you",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      features: ["Real-time search results", "Location-based filtering", "Comprehensive database"],
      tip: "Pro tip: Use your ZIP code for the most accurate results"
    },
    {
      id: 2,
      title: "Browse Resources",
      description: "View detailed information about housing authorities, waitlist status, and available programs",
      icon: MapPin,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      features: ["Interactive maps", "Detailed listings", "Contact information"],
      tip: "Check waitlist status to save time on your applications"
    },
    {
      id: 3,
      title: "Connect & Apply",
      description: "Contact housing authorities directly with provided phone numbers and application guidance",
      icon: Phone,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      features: ["Direct contact info", "Application guidance", "Office hours"],
      tip: "Call during business hours for fastest response times"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds",
      color: "from-emerald-400 to-teal-400"
    },
    {
      icon: Shield,
      title: "100% Free",
      description: "No hidden fees or charges",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Users,
      title: "Trusted Platform",
      description: "Used by 100k+ families",
      color: "from-indigo-400 to-blue-400"
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Search anytime, anywhere",
      color: "from-teal-400 to-emerald-400"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "California",
      quote: "Found my perfect apartment in just 2 days! The search was so easy and the information was accurate.",
      rating: 5
    },
    {
      name: "Michael R.",
      location: "Texas",
      quote: "AssistanceHub helped me navigate the complex process. The guidance was invaluable.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      location: "New York",
      quote: "Quick, reliable, and completely free. Exactly what I needed during a difficult time.",
      rating: 5
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Animated Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-2xl text-sm font-bold mb-12 shadow-2xl">
            <Play className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-white">Simple Process</span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block text-white mb-4 drop-shadow-2xl">
              Getting Started
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 drop-shadow-2xl">
              Is This Easy
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed">
            Follow our simple 3-step process to find the housing assistance you need.
            <span className="font-bold text-emerald-300"> No paperwork, no fees</span> - just results.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <Card
                key={step.id}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:scale-105 cursor-pointer rounded-3xl"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(0)}
              >
                {/* Step Number */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                  <span className="text-3xl font-black text-white">{step.id}</span>
                </div>

                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <CardHeader className="relative z-10 p-8">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-2xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-black text-white mb-6">
                    {step.title}
                  </CardTitle>
                  <p className="text-white/90 text-xl leading-relaxed">
                    {step.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  {/* Features */}
                  <div className="space-y-4">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`flex items-center gap-4 transform transition-all duration-500 ${
                          activeStep === index ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-80'
                        }`}
                      >
                        <CheckCircle className={`w-6 h-6 text-emerald-400 flex-shrink-0`} />
                        <span className="text-white font-semibold text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tip */}
                  <div className="mt-8 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                    <p className="text-base text-white/90">
                      <span className="font-bold text-cyan-300">💡 {step.tip}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-24">
          <h3 className="text-5xl font-black text-center text-white mb-16">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AssistanceHub</span>?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-white/10"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-black text-white mb-4">{benefit.title}</h4>
                <p className="text-white/80 leading-relaxed text-lg">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-12">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Users Say</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-16 shadow-2xl">
          <h3 className="text-5xl md:text-6xl font-black text-white mb-8">
            Ready to Find Your Home?
          </h3>
          <p className="text-white/90 text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of families who have successfully found housing assistance through our platform.
            Your perfect home is just a search away.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-12 py-6 text-2xl font-black rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <Search className="w-8 h-8 mr-4" />
              Start Your Search Now
              <ArrowRight className="w-8 h-8 ml-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-12 py-6 text-2xl font-black rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <MapPin className="w-8 h-8 mr-4" />
              Browse by Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedSection;
