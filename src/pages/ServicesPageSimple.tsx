import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Bug, Home, Building, Zap, Clock, Star,
  ArrowLeft, Phone, Mail, Calendar, CheckCircle,
  ArrowRight, Target, Award, Menu, X
} from 'lucide-react';

export const ServicesPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const services = [
    {
      id: 'advanced-guard',
      title: 'Advanced Guard',
      subtitle: 'Comprehensive pest protection with regular inspections and preventive treatments',
      price: 12000, // in cents
      interval: 'quarter',
      icon: <Shield className="w-8 h-8" />,
      description: 'Complete pest protection with quarterly service and preventive treatments.',
      features: [
        'Quarterly inspections',
        'All pest coverage',
        'Preventive treatments',
        'Priority service',
        'Ongoing protection guarantee'
      ],
      popular: true
    },
    {
      id: 'same-day-service',
      title: 'Same Day Service',
      subtitle: 'Urgent pest control response for immediate issues with guaranteed results',
      price: 22500, // in cents
      interval: 'one_time',
      icon: <Zap className="w-8 h-8" />,
      description: 'Emergency pest control when you need it most - same day response guaranteed.',
      features: [
        'Same-day response',
        'Emergency treatment',
        'Targeted solutions',
        'Expert technicians',
        'Guaranteed results'
      ],
      popular: false
    },
    {
      id: 'wildlife-control',
      title: 'Wildlife Control',
      subtitle: 'Humane wildlife removal and exclusion services for all types of unwanted animals',
      price: 0, // Free estimate
      interval: 'estimate',
      icon: <Target className="w-8 h-8" />,
      description: 'Professional wildlife removal with humane methods and prevention strategies.',
      features: [
        'Free inspection',
        'Humane removal',
        'Entry prevention',
        'Damage repair consultation',
        'Long-term exclusion'
      ],
      popular: false
    },
    {
      id: 'wood-eating-pest',
      title: 'Wood Eating Pest',
      subtitle: 'Termite and wood-destroying insect treatment with lasting protection',
      price: 0, // Free estimate
      interval: 'estimate',
      icon: <Bug className="w-8 h-8" />,
      description: 'Comprehensive termite and wood-destroying insect protection for your property.',
      features: [
        'Free inspection',
        'Custom treatment plan',
        'Barrier protection',
        'Monitoring stations',
        'Ongoing monitoring'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      title: 'Rodent Control',
      description: 'Effective solutions for mice, rats, and other rodent infestations.',
      icon: <Target className="w-6 h-6" />,
      features: ['Complete inspection', 'Exclusion services', 'Bait stations', 'Ongoing monitoring']
    },
    {
      title: 'Bed Bug Treatment',
      description: 'Specialized heat treatments and targeted solutions for bed bug elimination.',
      icon: <Bug className="w-6 h-6" />,
      features: ['Heat treatment', 'Chemical applications', 'Follow-up inspections', 'Prevention education']
    },
    {
      title: 'Mosquito Control',
      description: 'Yard treatments to reduce mosquito populations and protect your outdoor spaces.',
      icon: <Shield className="w-6 h-6" />,
      features: ['Property inspection', 'Breeding site elimination', 'Targeted treatments', 'Seasonal programs']
    }
  ];

  const pestTypes = [
    'Ants', 'Cockroaches', 'Spiders', 'Termites', 'Rodents', 'Wasps',
    'Bed Bugs', 'Fleas', 'Silverfish', 'Earwigs', 'Moths', 'Beetles'
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Inspection',
      description: 'Comprehensive property assessment to identify pest issues and entry points.'
    },
    {
      step: 2,
      title: 'Treatment Plan',
      description: 'Custom treatment strategy based on pest type, property size, and your preferences.'
    },
    {
      step: 3,
      title: 'Treatment',
      description: 'Professional application of safe, effective pest control solutions.'
    },
    {
      step: 4,
      title: 'Follow-up',
      description: 'Monitoring and additional treatments as needed to ensure complete elimination.'
    }
  ];

  const formatCurrencyFromCents = (cents: number): string => {
    if (cents === 0) return 'Free Estimate';
    return `$${(cents / 100).toFixed(0)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#111827]">
      {/* Header */}
      <header className="sticky top-0 bg-[#0f1729]/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="font-display font-bold text-2xl text-[#56e39f]">
            GRINNAGE
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('/')} className="text-gray-300 hover:text-[#56e39f] transition-colors">Home</button>
            <span className="text-[#56e39f] font-medium">Services</span>
            <button onClick={() => navigate('/about')} className="text-gray-300 hover:text-[#56e39f] transition-colors">About</button>
            <button onClick={() => navigate('/contact')} className="text-gray-300 hover:text-[#56e39f] transition-colors">Contact</button>
          </nav>
          <div className="flex items-center gap-3">
            <button
              className="hidden md:block px-4 py-2 text-gray-300 hover:text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => navigate('/admin-login')}
            >
              Admin Login
            </button>
            <button
              className="hidden md:block px-4 py-2 bg-[#56e39f] text-[#0f1729] rounded-lg hover:bg-[#48c98a] transition-colors font-medium"
              onClick={() => navigate('/contact')}
            >
              Get Quote
            </button>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0f1729]/95 backdrop-blur-md border-t border-white/10">
            <nav className="container mx-auto py-4 space-y-2">
              <button
                onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-[#56e39f] hover:bg-white/5 rounded-lg transition-colors"
              >
                Home
              </button>
              <div className="px-4 py-3 text-[#56e39f] font-medium">
                Services
              </div>
              <button
                onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-[#56e39f] hover:bg-white/5 rounded-lg transition-colors"
              >
                About
              </button>
              <button
                onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-[#56e39f] hover:bg-white/5 rounded-lg transition-colors"
              >
                Contact
              </button>
              <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                <button
                  onClick={() => { navigate('/admin-login'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Admin Login
                </button>
                <button
                  onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 bg-[#56e39f] text-[#0f1729] rounded-lg hover:bg-[#48c98a] transition-colors font-medium"
                >
                  Get Quote
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-300 hover:text-[#56e39f] transition-colors mb-8 mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>

              <div className="inline-flex items-center px-3 py-1 bg-[#56e39f]/10 border border-[#56e39f]/30 rounded-full mb-6">
                <Shield className="w-4 h-4 mr-2 text-[#56e39f]" />
                <span className="text-sm font-medium text-[#56e39f]">Professional Pest Control Services</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Our
                <span className="text-[#56e39f] block">Services</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Comprehensive pest control solutions for homes and businesses.
                Safe, effective treatments that protect what matters most to you.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <button
                  className="inline-flex items-center px-6 py-3 bg-[#56e39f] text-[#0f1729] rounded-lg hover:bg-[#48c98a] transition-colors font-medium"
                  onClick={() => navigate('/contact')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Get Free Quote
                </button>
                <a href="tel:+15551234567" className="inline-flex items-center px-6 py-3 border-2 border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Core Services
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Professional pest control solutions tailored to your specific needs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-8 relative ${service.popular ? 'border-[#56e39f]' : 'border-white/10'}`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#56e39f] text-[#0f1729] px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center w-16 h-16 bg-[#56e39f]/10 rounded-2xl mb-6">
                    <div className="text-[#56e39f]">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#56e39f] font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-300 mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">
                        {formatCurrencyFromCents(service.price)}
                      </span>
                      {service.price > 0 && (
                        <span className="text-gray-400 ml-2">
                          {service.interval === 'one_time' ? 'One-time' :
                           service.interval === 'quarter' ? 'per quarter' :
                           service.interval === 'estimate' ? '' : `/${service.interval}`}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#56e39f] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      service.popular 
                        ? 'bg-[#56e39f] text-[#0f1729] hover:bg-[#48c98a]' 
                        : 'border border-[#56e39f]/30 text-[#56e39f] hover:bg-[#56e39f]/10'
                    }`}
                    onClick={() => navigate('/contact')}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Additional Services
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Specialized pest control solutions for unique situations and ongoing protection.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#56e39f]/10 rounded-xl mb-4">
                    <div className="text-[#56e39f]">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-[#56e39f] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pest Types */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Pests We Control
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                We provide effective treatment for a wide range of common household and commercial pests.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {pestTypes.map((pest, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <Bug className="w-5 h-5 text-[#56e39f] flex-shrink-0" />
                  <span className="text-white font-medium">
                    {pest}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Our Process
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                A systematic approach to pest control that ensures effective, long-lasting results.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#56e39f] text-[#0f1729] rounded-full mb-6 mx-auto font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
                  Why Choose Grinnage?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#56e39f]/10 rounded-xl flex-shrink-0">
                      <Award className="w-6 h-6 text-[#56e39f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Licensed & Certified
                      </h3>
                      <p className="text-gray-300">
                        All technicians are state-licensed and EPA-certified professionals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#56e39f]/10 rounded-xl flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#56e39f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Safe & Eco-Friendly
                      </h3>
                      <p className="text-gray-300">
                        We use environmentally responsible treatments safe for families and pets.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#56e39f]/10 rounded-xl flex-shrink-0">
                      <Target className="w-6 h-6 text-[#56e39f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Guaranteed Results
                      </h3>
                      <p className="text-gray-300">
                        100% satisfaction guarantee with follow-up service included.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#56e39f]/20 to-blue-500/20 border border-[#56e39f]/30 rounded-2xl p-8">
                <div className="text-center">
                  <Star className="w-16 h-16 text-[#56e39f] mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    20+ Years Experience
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Trusted by over 5,000 Bay Area customers for reliable pest control solutions.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#56e39f] mr-2" />
                      98% Customer Satisfaction Rate
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#56e39f] mr-2" />
                      24/7 Emergency Service Available
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#56e39f] mr-2" />
                      Licensed in California, Nevada, Oregon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#56e39f]/20 to-blue-500/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Contact us today for a free inspection and customized treatment plan.
                Professional pest control that protects what matters most.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center px-6 py-3 bg-[#56e39f] text-[#0f1729] rounded-lg hover:bg-[#48c98a] transition-colors font-medium"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Inspection
                </button>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#0f1729] transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (555) 123-4567
                </a>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Same-day service available • Licensed & insured professionals
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0f1a] border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="font-display font-bold text-2xl text-[#56e39f] mb-4">
                GRINNAGE
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Professional pest control services since 2003.
                Protecting Bay Area homes and businesses with safe, effective solutions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-[#56e39f] mr-3" />
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-[#56e39f] transition-colors">
                    (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-[#56e39f] mr-3" />
                  <a href="mailto:info@grinnage.com" className="text-gray-300 hover:text-[#56e39f] transition-colors">
                    info@grinnage.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/')} className="text-gray-400 hover:text-[#56e39f] transition-colors">Home</button></li>
                <li><span className="text-[#56e39f]">Services</span></li>
                <li><button onClick={() => navigate('/about')} className="text-gray-400 hover:text-[#56e39f] transition-colors">About</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-gray-400 hover:text-[#56e39f] transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-400 hover:text-[#56e39f] transition-colors">Advanced Guard</span></li>
                <li><span className="text-gray-400 hover:text-[#56e39f] transition-colors">Same Day Service</span></li>
                <li><span className="text-gray-400 hover:text-[#56e39f] transition-colors">Wildlife Control</span></li>
                <li><span className="text-gray-400 hover:text-[#56e39f] transition-colors">Wood Eating Pest</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              © 2025 Grinnage Exterminating. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-500 hover:text-[#56e39f] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-[#56e39f] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};