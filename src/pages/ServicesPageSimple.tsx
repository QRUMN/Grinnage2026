import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Bug, Bird, ArrowRight, ArrowLeft, Phone, Check, Clock, Rat, Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';

export const ServicesPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Main services
  const mainServices = [
    {
      icon: <Shield className="w-10 h-10" />,
      name: "Advanced Guard",
      description: "Comprehensive pest protection with regular inspections and preventive treatments",
      features: [
        "Quarterly inspections",
        "All pest coverage",
        "Preventive treatments",
        "Priority service",
        "Extended warranty",
        "Free re-treatments"
      ],
      price: "$120",
      period: "per quarter"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      name: "Same Day Service",
      description: "Urgent pest control response for immediate issues with guaranteed results",
      features: [
        "Same-day response",
        "Emergency treatment",
        "Targeted solutions",
        "Expert technicians",
        "Immediate relief",
        "Follow-up inspection"
      ],
      price: "$225",
      period: "one-time"
    },
    {
      icon: <Bird className="w-10 h-10" />,
      name: "Wildlife Control",
      description: "Humane wildlife removal and exclusion services for all types of unwanted animals",
      features: [
        "Free inspection",
        "Humane removal",
        "Entry prevention",
        "Damage repair",
        "Habitat modification",
        "Ongoing protection"
      ],
      price: null,
      period: "estimate"
    },
    {
      icon: <Bug className="w-10 h-10" />,
      name: "Wood Eating Pest",
      description: "Termite and wood-destroying insect treatment with lasting protection",
      features: [
        "Free inspection",
        "Treatment plan",
        "Barrier protection",
        "Monitoring stations",
        "Annual inspections",
        "Damage warranty"
      ],
      price: null,
      period: "estimate"
    }
  ];

  // Special services
  const specialServices = [
    {
      icon: <Rat className="w-6 h-6" />,
      name: "Rodent Control",
      description: "Effective solutions for mice, rats, and other rodent infestations"
    },
    {
      icon: <Bug className="w-6 h-6" />,
      name: "Bed Bug Treatment",
      description: "Specialized heat treatments and targeted solutions for bed bug elimination"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      name: "Mosquito Control",
      description: "Yard treatments to reduce mosquito populations and protect your outdoor spaces"
    }
  ];

  // Service process steps
  const processSteps = [
    {
      step: 1,
      title: "Inspection",
      description: "We thoroughly inspect your property to identify pest issues and entry points"
    },
    {
      step: 2,
      title: "Treatment Plan",
      description: "We develop a customized treatment plan tailored to your specific situation"
    },
    {
      step: 3,
      title: "Implementation",
      description: "Our trained technicians implement the treatment using the latest methods"
    },
    {
      step: 4,
      title: "Follow-up",
      description: "We conduct follow-up visits to ensure the problem is completely resolved"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#111827] text-white">
      {/* Header/Navigation */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-xl">GRINNAGE</div>
          <nav className="hidden md:flex space-x-8">
            {['Services', 'About', 'Contact'].map(item => (
              <button 
                key={item}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
                className={`transition-colors ${item === 'Services' ? 'text-[#56e39f]' : 'text-gray-300 hover:text-[#56e39f]'}`}
              >
                {item}
              </button>
            ))}
          </nav>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => navigate('/login')}
          >
            Client Login
          </Button>
        </div>
      </header>

      <main>
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-300 hover:text-[#56e39f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>

        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center px-3 py-1 bg-[#56e39f]/10 rounded-full mb-4">
              <Shield className="w-4 h-4 mr-2 text-[#56e39f]" />
              <span className="text-sm font-medium text-[#56e39f]">Professional Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Pest Control Services
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive, effective, and eco-friendly pest control solutions tailored to your needs
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Featured Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#56e39f]/20 group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                        <p className="text-gray-300 mb-2">{service.description}</p>
                      </div>
                      <div className="p-3 bg-[#56e39f]/10 rounded-lg text-[#56e39f]">
                        {service.icon}
                      </div>
                    </div>

                    {service.price ? (
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-white">{service.price}</span>
                        <span className="text-gray-400 ml-2">{service.period}</span>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <span className="text-lg font-semibold text-[#56e39f]">Free Estimate</span>
                      </div>
                    )}
                    
                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-[#56e39f] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      variant={index === 0 ? "primary" : "outline"}
                      className={index !== 0 ? "border-[#56e39f]/30 text-[#56e39f] hover:bg-[#56e39f]/10 w-full" : "w-full"}
                      onClick={() => navigate('/consultation')}
                      icon={<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    >
                      {service.price ? 'Schedule Service' : 'Get Free Estimate'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Specialized Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {specialServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-[#56e39f]/20"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-[#56e39f]/10 rounded-lg text-[#56e39f] mr-4 mt-1">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                      <p className="text-gray-300 text-sm">{service.description}</p>
                      <button 
                        onClick={() => navigate('/consultation')}
                        className="text-[#56e39f] hover:text-[#48c98a] flex items-center text-sm font-medium mt-3"
                      >
                        Learn more <ArrowRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Our Process</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#56e39f]/20 text-[#56e39f] flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section (simplified) */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-2">How often should I schedule pest control service?</h3>
                  <p className="text-gray-300">For most homes, quarterly service provides the best protection. However, we can customize a schedule based on your specific needs and pest pressure in your area.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Are your treatments safe for children and pets?</h3>
                  <p className="text-gray-300">Yes, we use eco-friendly products that are safe for families and pets when used as directed. Our technicians are trained to apply treatments in a way that minimizes exposure to non-target organisms.</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="border-white/20 hover:bg-white/5"
                  onClick={() => navigate('/faq')}
                >
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-r from-[#56e39f]/20 to-blue-500/20 backdrop-blur-sm border border-[#56e39f]/30 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to get started?</h3>
                  <p className="text-gray-300">Contact us today for a free estimate or consultation</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate('/consultation')}
                    className="whitespace-nowrap"
                  >
                    Get Free Estimate
                  </Button>
                  <a 
                    href="tel:+13025615654"
                    className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (302) 561-5654
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 mt-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl mb-2">GRINNAGE</div>
              <p className="text-gray-400 text-sm">
                Professional pest control services since 2007.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Terms
              </a>
              <a href="/sitemap" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} GRINNAGE Pest Control. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
