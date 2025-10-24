import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Bug, Star, Check, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Top services
  const services = [
    {
      icon: <Shield className="w-6 h-6" />,
      name: "Advanced Guard",
      description: "Comprehensive pest protection with regular inspections"
    },
    {
      icon: <Bug className="w-6 h-6" />,
      name: "Wood Eating Pest",
      description: "Termite and wood-destroying insect treatment"
    }
  ];

  // Key benefits
  const benefits = [
    "Eco-friendly solutions",
    "24/7 emergency service",
    "Certified professionals",
    "Free inspections",
    "Satisfaction guarantee",
    "Pet & child safe treatments"
  ];

  // Testimonial
  const testimonial = {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "The team was professional and thorough. Haven't seen a single pest since their treatment!",
    rating: 5
  };

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
                className="text-gray-300 hover:text-[#56e39f] transition-colors"
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
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="inline-flex items-center px-3 py-1 bg-[#56e39f]/10 rounded-full mb-4">
                <Shield className="w-4 h-4 mr-2 text-[#56e39f]" />
                <span className="text-sm font-medium text-[#56e39f]">Professional Pest Control</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Effective Pest Solutions for Your Home & Business
              </h1>
              <p className="text-gray-300 mb-6">
                Protect your property with our eco-friendly pest control services. Safe for your family, tough on pests.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/consultation')}
                  icon={<ArrowRight className="ml-2 w-5 h-5" />}
                >
                  Get Free Estimate
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#56e39f]/30 text-[#56e39f] hover:bg-[#56e39f]/10"
                  onClick={() => navigate('/services')}
                >
                  View Services
                </Button>
              </div>
              
              {/* Dashboard Demo Links */}
              <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <p className="text-white text-sm mb-3">View Dashboard Demos:</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    onClick={() => navigate('/demo/client-dashboard')}
                  >
                    Client Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                    onClick={() => navigate('/demo/admin-dashboard')}
                  >
                    Admin Dashboard
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Placeholder for illustration - could be replaced with an actual image */}
                <div className="w-72 h-72 bg-gradient-to-br from-[#56e39f]/20 to-blue-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-20 h-20 text-[#56e39f]" />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#56e39f]/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Services */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#56e39f]/20 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="p-3 bg-[#56e39f]/10 rounded-lg text-[#56e39f] mr-4">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                      <p className="text-gray-300 mb-3">{service.description}</p>
                      <button 
                        onClick={() => navigate('/services')}
                        className="text-[#56e39f] hover:text-[#48c98a] flex items-center text-sm font-medium"
                      >
                        Learn more <ArrowRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/services')}
                className="border-white/20 hover:bg-white/5"
              >
                View All Services
              </Button>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-[#56e39f] mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-r from-[#56e39f]/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#56e39f] fill-[#56e39f]" />
                ))}
              </div>
              <p className="text-lg text-gray-200 my-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/CTA */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
                  <p className="text-gray-300">Contact us today for a free estimate or consultation</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate('/contact')}
                  >
                    Get Free Estimate
                  </Button>
                  <a 
                    href="tel:+18005551234"
                    className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (800) 555-1234
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl mb-2">GRINNAGE</div>
              <p className="text-gray-400 text-sm max-w-xs">
                Professional pest control services with a focus on eco-friendly solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-[#56e39f] mr-2" />
                <a href="tel:+18005551234" className="text-gray-300 hover:text-[#56e39f] transition-colors">
                  (800) 555-1234
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-[#56e39f] mr-2" />
                <a href="mailto:info@grinnage.com" className="text-gray-300 hover:text-[#56e39f] transition-colors">
                  info@grinnage.com
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 sm:mb-0">
              © {currentYear} GRINNAGE Pest Control. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
