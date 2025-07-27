import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Download, 
  Users, 
  Shield, 
  Heart, 
  Calculator,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Globe,
  Mail,
  HelpCircle
} from 'lucide-react';

interface StateKeyFeaturesProps {
  stateName: string;
}

const StateKeyFeatures: React.FC<StateKeyFeaturesProps> = ({ stateName }) => {
  const resources = [
    {
      category: 'Applications & Forms',
      icon: FileText,
      items: [
        { title: 'Section 8 Application', type: 'form', urgent: true },
        { title: 'Public Housing Application', type: 'form' },
        { title: 'Reasonable Accommodation Request', type: 'form' },
        { title: 'Income Verification Forms', type: 'form' },
        { title: 'Landlord Participation Package', type: 'guide' }
      ]
    },
    {
      category: 'Eligibility & Requirements',
      icon: Calculator,
      items: [
        { title: 'Income Limits Calculator', type: 'tool', popular: true },
        { title: 'Eligibility Guidelines', type: 'guide' },
        { title: 'Required Documentation Checklist', type: 'checklist' },
        { title: 'Fair Market Rent Information', type: 'data' },
        { title: 'Citizenship Requirements', type: 'guide' }
      ]
    },
    {
      category: 'Support & Assistance',
      icon: HelpCircle,
      items: [
        { title: 'Housing Counseling Services', type: 'service', popular: true },
        { title: 'Legal Aid Resources', type: 'resource' },
        { title: 'Emergency Assistance Programs', type: 'service' },
        { title: 'Translation Services', type: 'service' },
        { title: 'Disability Accommodation Services', type: 'service' }
      ]
    },
    {
      category: 'State-Specific Information',
      icon: MapPin,
      items: [
        { title: `${stateName} Housing Authority Directory`, type: 'directory' },
        { title: 'State Housing Laws & Regulations', type: 'legal' },
        { title: 'Local Contact Information', type: 'contact' },
        { title: 'Regional Office Locations', type: 'directory' },
        { title: 'State Housing Plan', type: 'document' }
      ]
    }
  ];

  const quickStats = [
    { 
      label: 'Average Processing Time', 
      value: '45-60 days', 
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Success Rate', 
      value: '78%', 
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Active Programs', 
      value: '12+', 
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Certified Agencies', 
      value: '245', 
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const emergencyContacts = [
    {
      title: 'State Housing Crisis Hotline',
      phone: '1-800-XXX-XXXX',
      hours: '24/7',
      description: 'Immediate assistance for housing emergencies'
    },
    {
      title: `${stateName} Housing Authority`,
      phone: '1-800-XXX-XXXX',
      hours: 'Mon-Fri 8AM-5PM',
      description: 'General housing assistance and information'
    },
    {
      title: 'HUD Customer Service',
      phone: '1-800-955-2232',
      hours: 'Mon-Fri 8AM-8PM EST',
      description: 'Federal housing program information'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'form': return <FileText className="w-4 h-4" />;
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'tool': return <Calculator className="w-4 h-4" />;
      case 'service': return <Users className="w-4 h-4" />;
      case 'directory': return <MapPin className="w-4 h-4" />;
      case 'legal': return <Shield className="w-4 h-4" />;
      case 'contact': return <Phone className="w-4 h-4" />;
      case 'document': return <Download className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'form': return 'text-blue-600';
      case 'guide': return 'text-green-600';
      case 'tool': return 'text-purple-600';
      case 'service': return 'text-orange-600';
      case 'directory': return 'text-teal-600';
      case 'legal': return 'text-red-600';
      case 'contact': return 'text-indigo-600';
      case 'document': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stateName}</span> Resources & Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to navigate the housing assistance process, from applications to support services.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {quickStats.map((stat, index) => (
              <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${stat.color} mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-md`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {resources.map((category, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm">{item.title}</span>
                              {item.urgent && <Badge className="bg-red-100 text-red-700 text-xs font-bold">Urgent</Badge>}
                              {item.popular && <Badge className="bg-green-100 text-green-700 text-xs font-bold">Popular</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Contacts */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-red-50 to-orange-50 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                Emergency Housing Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{contact.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-600 text-lg">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600 text-sm">{contact.hours}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{contact.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Support */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Language Support */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Language Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Translation services available in multiple languages including Spanish, Chinese, Russian, and more.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Request Translation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Digital Resources */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get email updates about program changes, new opportunities, and important deadlines.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Subscribe to Updates
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StateKeyFeatures;
