import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Heart, 
  Shield, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Building,
  Accessibility,
  Baby,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface StateHousingProgramsProps {
  stateName: string;
}

const StateHousingPrograms: React.FC<StateHousingProgramsProps> = ({ stateName }) => {
  const programs = [
    {
      id: 'section8',
      title: 'Section 8 Housing Choice Vouchers',
      description: 'Rental assistance helping families afford decent, safe housing in the private market',
      icon: Home,
      color: 'blue',
      eligibility: 'Income ≤ 50% Area Median Income',
      waitTime: '12-24 months',
      benefits: [
        'Portable - use anywhere that accepts vouchers',
        'Pay ~30% of income toward rent',
        'Choose your own housing',
        'Utilities assistance included'
      ],
      availability: 'Open',
      stats: {
        vouchers: '45,000+',
        families: '38,200'
      }
    },
    {
      id: 'public',
      title: 'Public Housing',
      description: 'Government-owned housing with affordable rent based on income',
      icon: Building,
      color: 'green',
      eligibility: 'Income ≤ 80% Area Median Income',
      waitTime: '6-18 months',
      benefits: [
        'Rent based on 30% of income',
        'On-site management services',
        'Various unit sizes available',
        'Community amenities'
      ],
      availability: 'Limited',
      stats: {
        units: '12,500+',
        properties: '185'
      }
    },
    {
      id: 'senior',
      title: 'Senior Housing (62+)',
      description: 'Age-restricted affordable housing for seniors with supportive services',
      icon: Heart,
      color: 'purple',
      eligibility: 'Age 62+ with qualifying income',
      waitTime: '3-12 months',
      benefits: [
        'Age-restricted communities',
        'Accessible design features',
        'On-site support services',
        'Social activities and programs'
      ],
      availability: 'Open',
      stats: {
        communities: '78',
        residents: '8,900+'
      }
    },
    {
      id: 'disability',
      title: 'Disability Housing',
      description: 'Accessible housing for individuals with disabilities and special needs',
      icon: Accessibility,
      color: 'orange',
      eligibility: 'Documented disability + income limits',
      waitTime: '4-10 months',
      benefits: [
        'Fully accessible units',
        'Support service coordination',
        'Reasonable accommodations',
        'Independent living focus'
      ],
      availability: 'Open',
      stats: {
        units: '3,200+',
        supportServices: '15'
      }
    },
    {
      id: 'family',
      title: 'Family Housing',
      description: 'Housing assistance for families with children, including single parents',
      icon: Users,
      color: 'teal',
      eligibility: 'Families with qualifying income',
      waitTime: '8-20 months',
      benefits: [
        'Multiple bedroom options',
        'School district proximity',
        'Childcare assistance programs',
        'Family support services'
      ],
      availability: 'Open',
      stats: {
        families: '28,500+',
        children: '41,200+'
      }
    },
    {
      id: 'emergency',
      title: 'Emergency & Transitional',
      description: 'Immediate housing assistance for homeless individuals and families',
      icon: Shield,
      color: 'red',
      eligibility: 'Homeless or at risk of homelessness',
      waitTime: 'Immediate',
      benefits: [
        'Rapid rehousing assistance',
        'Temporary rental assistance',
        'Case management services',
        'Move-in cost assistance'
      ],
      availability: 'Open',
      stats: {
        assisted: '5,800+',
        programs: '42'
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-50 to-blue-100/50',
        border: 'border-blue-200/50',
        icon: 'text-blue-600',
        iconBg: 'bg-blue-100',
        text: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-700',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'from-green-50 to-green-100/50',
        border: 'border-green-200/50',
        icon: 'text-green-600',
        iconBg: 'bg-green-100',
        text: 'text-green-800',
        badge: 'bg-green-100 text-green-700',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'from-purple-50 to-purple-100/50',
        border: 'border-purple-200/50',
        icon: 'text-purple-600',
        iconBg: 'bg-purple-100',
        text: 'text-purple-800',
        badge: 'bg-purple-100 text-purple-700',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      orange: {
        bg: 'from-orange-50 to-orange-100/50',
        border: 'border-orange-200/50',
        icon: 'text-orange-600',
        iconBg: 'bg-orange-100',
        text: 'text-orange-800',
        badge: 'bg-orange-100 text-orange-700',
        button: 'bg-orange-600 hover:bg-orange-700'
      },
      teal: {
        bg: 'from-teal-50 to-teal-100/50',
        border: 'border-teal-200/50',
        icon: 'text-teal-600',
        iconBg: 'bg-teal-100',
        text: 'text-teal-800',
        badge: 'bg-teal-100 text-teal-700',
        button: 'bg-teal-600 hover:bg-teal-700'
      },
      red: {
        bg: 'from-red-50 to-red-100/50',
        border: 'border-red-200/50',
        icon: 'text-red-600',
        iconBg: 'bg-red-100',
        text: 'text-red-800',
        badge: 'bg-red-100 text-red-700',
        button: 'bg-red-600 hover:bg-red-700'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getAvailabilityBadge = (availability: string) => {
    if (availability === 'Open') {
      return <Badge className="bg-green-100 text-green-700 font-semibold">✓ Open</Badge>;
    } else if (availability === 'Limited') {
      return <Badge className="bg-yellow-100 text-yellow-700 font-semibold">⚠ Limited</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700 font-semibold">✗ Closed</Badge>;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Housing Programs in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stateName}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive affordable housing assistance programs designed to help individuals and families find safe, decent, and affordable housing.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {programs.map((program) => {
              const colors = getColorClasses(program.color);
              const IconComponent = program.icon;
              
              return (
                <Card 
                  key={program.id} 
                  className={`bg-gradient-to-br ${colors.bg} ${colors.border} border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className={`w-7 h-7 ${colors.icon}`} />
                      </div>
                      <div className="flex gap-2">
                        {getAvailabilityBadge(program.availability)}
                      </div>
                    </div>
                    <CardTitle className={`${colors.text} text-xl font-bold leading-tight`}>
                      {program.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white/60 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className={`text-sm font-bold ${colors.text}`}>{program.waitTime}</div>
                        <div className="text-xs text-gray-600">Wait Time</div>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className={`text-sm font-bold ${colors.text}`}>Income Based</div>
                        <div className="text-xs text-gray-600">Eligibility</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className={`font-semibold ${colors.text} mb-3 text-sm`}>Key Benefits:</h4>
                      <ul className="space-y-2">
                        {program.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className={`w-4 h-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stats */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        {Object.entries(program.stats).map(([key, value], index) => (
                          <div key={index}>
                            <div className={`text-lg font-black ${colors.text}`}>{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className={`w-full ${colors.button} text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Apply for Housing Assistance?
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Get started with your application today. Our team is here to help you navigate the process and find the right program for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-white/90 font-bold px-8 py-6 text-lg shadow-lg"
              >
                Start Application
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-6 text-lg backdrop-blur-sm"
              >
                View All Offices
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StateHousingPrograms;
