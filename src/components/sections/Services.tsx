import { Shield, Clock, Bug, Bird, Check, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';

export const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Shield className="w-14 h-14" />,
      badge: 'Most Popular',
      color: 'blue',
      name: "Advanced Guard",
      price: 120,
      period: "per quarter",
      description: "Comprehensive pest protection with regular inspections and preventive treatments",
      features: [
        "Quarterly inspections",
        "All pest coverage",
        "Preventive treatments",
        "Priority service",
        "Extended warranty",
        "Free re-treatments"
      ]
    },
    {
      icon: <Clock className="w-14 h-14" />,
      badge: 'Quick Response',
      color: 'red',
      name: "Same Day Service",
      price: 225,
      period: "one-time",
      description: "Urgent pest control response for immediate issues",
      features: [
        "Same-day response",
        "Emergency treatment",
        "Targeted solutions",
        "Expert technicians",
        "Immediate relief",
        "Follow-up inspection"
      ]
    },
    {
      icon: <Bird className="w-14 h-14" />,
      badge: 'Humane Solutions',
      color: 'green',
      name: "Wildlife Control",
      price: null,
      period: "estimate",
      description: "Humane wildlife removal and exclusion services",
      features: [
        "Free inspection",
        "Humane removal",
        "Entry prevention",
        "Damage repair",
        "Habitat modification",
        "Ongoing protection"
      ]
    },
    {
      icon: <Bug className="w-14 h-14" />,
      badge: 'Specialized',
      color: 'purple',
      name: "Wood Eating Pest",
      price: null,
      period: "estimate",
      description: "Termite and wood-destroying insect treatment",
      features: [
        "Free inspection",
        "Treatment plan",
        "Barrier protection",
        "Monitoring stations",
        "Annual inspections",
        "Damage warranty"
      ]
    }
  ];

  const getBadgeColor = (color: string) => {
    switch(color) {
      case 'blue':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'red':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'green':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'purple':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
      default:
        return 'bg-[#56e39f]/10 text-[#56e39f] border-[#56e39f]/30';
    }
  };

  const getIconBgColor = (color: string) => {
    switch(color) {
      case 'blue':
        return 'bg-blue-500/10 text-blue-500';
      case 'red':
        return 'bg-red-500/10 text-red-500';
      case 'green':
        return 'bg-green-500/10 text-green-500';
      case 'purple':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-[#56e39f]/10 text-[#56e39f]';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#111827] to-[#0f1729]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-3 px-4 py-1.5 bg-[#56e39f]/10 rounded-full">
            <Shield className="w-4 h-4 mr-2 text-[#56e39f]" />
            <span className="text-sm font-medium text-[#56e39f]">Tailored Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Our Professional Services
          </h2>
          <p className="text-lg text-gray-300">
            Professional pest control solutions tailored to your needs with eco-friendly options
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#56e39f]/5 hover:border-[#56e39f]/20 group hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                {/* Decorative header */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-white/10 to-transparent opacity-30"></div>
                
                {/* Content */}
                <div className="px-8 pt-8 pb-8 relative z-10">
                  {/* Service badge */}
                  {service.badge && (
                    <div className={`inline-block mb-6 px-3 py-1 text-xs font-medium rounded-full border ${getBadgeColor(service.color)}`}>
                      {service.badge}
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-300 mb-6">
                        {service.description}
                      </p>
                    </div>
                    <div className={`p-4 rounded-2xl ${getIconBgColor(service.color)}`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    {service.price ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-white">${service.price}</span>
                        <span className="text-gray-400 ml-2">{service.period}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-[#56e39f] mr-2" />
                        <span className="text-xl font-semibold text-white">Free Estimate</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-[#56e39f] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Button
                    variant={index === 0 ? "primary" : "outline"}
                    size="lg"
                    className={index !== 0 ? "border-[#56e39f]/30 text-[#56e39f] hover:bg-[#56e39f]/10 w-full" : "w-full"}
                    onClick={() => navigate('/consultation')}
                    icon={<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  >
                    {service.price ? 'Schedule Service' : 'Get Free Estimate'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional CTA */}
      <div className="max-w-5xl mx-auto mt-20 px-4">
        <div className="bg-gradient-to-r from-[#56e39f]/20 to-[#48c98a]/20 backdrop-blur-lg border border-[#56e39f]/30 rounded-2xl p-8 sm:p-10 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Not sure what you need?</h3>
              <p className="text-gray-300">Our experts can help identify your pest issues and recommend the right solution</p>
            </div>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/contact')}
              className="whitespace-nowrap"
            >
              Contact Us Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};