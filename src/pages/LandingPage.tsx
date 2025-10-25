import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Bug, Star, Check, Mail, Phone, Clock,
  Users, Zap, Leaf, Award, MapPin, Calendar, Menu, X
} from 'lucide-react';
import { formatCurrencyFromCents } from '../lib/utils';
import { defaultServices } from '../lib/stripe';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Featured services with pricing
  const featuredServices = [
    {
      ...defaultServices[0],
      icon: <Shield className="w-6 h-6" />,
      features: ["Detailed inspection report", "Problem identification", "Treatment recommendations"]
    },
    {
      ...defaultServices[1],
      icon: <Bug className="w-6 h-6" />,
      features: ["Eco-friendly treatments", "Same-day service", "30-day guarantee"]
    },
    {
      ...defaultServices[2],
      icon: <Calendar className="w-6 h-6" />,
      features: ["Regular monitoring", "Priority scheduling", "24/7 support"]
    }
  ];

  // Key benefits with icons
  const benefits = [
    { icon: <Leaf className="w-5 h-5" />, text: "Eco-friendly & safe solutions" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 emergency response" },
    { icon: <Award className="w-5 h-5" />, text: "Licensed & certified experts" },
    { icon: <Shield className="w-5 h-5" />, text: "100% satisfaction guarantee" },
    { icon: <Users className="w-5 h-5" />, text: "Family & pet safe treatments" },
    { icon: <Zap className="w-5 h-5" />, text: "Fast & effective results" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      location: "San Francisco, CA",
      content: "Grinnage solved our ant problem quickly and safely. Their team was professional and the results speak for themselves!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Restaurant Owner",
      location: "Oakland, CA",
      content: "We've been using Grinnage for 3 years. Their preventive approach has kept our establishment pest-free.",
      rating: 5
    },
    {
      name: "Linda Rodriguez",
      role: "Property Manager",
      location: "Berkeley, CA",
      content: "Reliable, effective, and great communication. Grinnage is our go-to for all 12 properties we manage.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Modern Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="font-display font-bold text-2xl text-primary-600 dark:text-primary-400">
            GRINNAGE
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Services', 'About', 'Contact'].map(item => (
              <button
                key={item}
                className="nav-link"
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="btn-secondary"
              onClick={() => navigate('/admin-login')}
            >
              Admin Login
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate('/contact')}
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md">
            <nav className="container mx-auto py-4 space-y-4">
              {['Services', 'About', 'Contact'].map(item => (
                <button
                  key={item}
                  className="block w-full text-left py-2 px-4 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  onClick={() => {
                    navigate(`/${item.toLowerCase()}`);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                <button
                  className="btn-secondary w-full justify-center"
                  onClick={() => {
                    navigate('/admin-login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Admin Login
                </button>
                <button
                  className="btn-primary w-full justify-center"
                  onClick={() => {
                    navigate('/contact');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Quote
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Modern Hero Section */}
        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="badge-success mb-6">
                  <Shield className="w-4 h-4 mr-2" />
                  Professional Pest Control Since 2003
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6 leading-tight">
                  Protect What
                  <span className="text-primary-500 block">Matters Most</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl">
                  Safe, effective pest control solutions for your home and business.
                  Licensed professionals using eco-friendly treatments that work.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="btn-primary"
                    onClick={() => navigate('/contact')}
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Inspection
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <a
                    href="tel:+13025625654"
                    className="btn-outline"
                  >
                    <Phone className="w-5 h-5" />
                    Call (302) 562-5654
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary-500" />
                    Licensed & Insured
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary-500" />
                    Same-Day Service
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary-500" />
                    100% Guarantee
                  </div>
                </div>
              </div>

              <div className="relative animate-float">
                <div className="card-hover bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 p-8">
                  <div className="flex items-center justify-center w-24 h-24 bg-primary-500 rounded-2xl mb-6 mx-auto">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">
                    Free Inspection & Quote
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-center">
                    Get a comprehensive property assessment and detailed treatment plan at no cost.
                  </p>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-200 dark:bg-accent-800 rounded-full opacity-30 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services with Pricing */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Professional Services
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Comprehensive pest control solutions tailored to your specific needs.
                Transparent pricing with no hidden fees.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredServices.map((service, index) => (
                <div key={service.id} className="card-hover group">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <div className="text-primary-600 dark:text-primary-400">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                    {service.name}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                        {formatCurrencyFromCents(service.price)}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {service.interval === 'one_time' ? 'One-time service' : `Per ${service.interval}`}
                      </div>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => navigate('/contact')}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                className="btn-outline"
                onClick={() => navigate('/contact')}
              >
                View All Services & Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Why Choose Grinnage
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Over 20 years of experience protecting homes and businesses with safe, effective solutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="card text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4 mx-auto group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <div className="text-primary-600 dark:text-primary-400">
                      {benefit.icon}
                    </div>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                What Our Clients Say
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400">
                Real experiences from satisfied customers across the Bay Area.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />
                    ))}
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Protect Your Property?
              </h2>
              <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Get a free inspection and personalized treatment plan.
                No obligation, just expert advice from certified professionals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  className="btn bg-white text-primary-600 hover:bg-neutral-100"
                  onClick={() => navigate('/contact')}
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Free Inspection
                </button>
                <a
                  href="tel:+13025625654"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  <Phone className="w-5 h-5" />
                  Call (302) 562-5654
                </a>
              </div>
              <p className="text-primary-200 text-sm mt-4">
                Available 24/7 for emergency services
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300">
        <div className="container py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="font-display font-bold text-2xl text-primary-400 mb-4">
                GRINNAGE
              </div>
              <p className="text-neutral-400 mb-6 max-w-md">
                Professional pest control services since 2003.
                Protecting Bay Area homes and businesses with safe, effective, eco-friendly solutions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-primary-500 mr-3" />
                  <a href="tel:+13025625654" className="hover:text-primary-400 transition-colors">
                    (302) 562-5654
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-primary-500 mr-3" />
                  <a href="mailto:contact@grinnagex.com" className="hover:text-primary-400 transition-colors">
                    contact@grinnagex.com
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-primary-500 mr-3" />
                  <span>San Francisco Bay Area</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services" className="hover:text-primary-400 transition-colors">Pest Inspection</a></li>
                <li><a href="/services" className="hover:text-primary-400 transition-colors">Pest Treatment</a></li>
                <li><a href="/services" className="hover:text-primary-400 transition-colors">Monthly Maintenance</a></li>
                <li><a href="/services" className="hover:text-primary-400 transition-colors">Emergency Service</a></li>
                <li><a href="/services" className="hover:text-primary-400 transition-colors">Commercial Services</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-primary-400 transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary-400 transition-colors">Contact</a></li>
                <li><a href="/login" className="hover:text-primary-400 transition-colors">Client Portal</a></li>
                <li><a href="/careers" className="hover:text-primary-400 transition-colors">Careers</a></li>
                <li><a href="/reviews" className="hover:text-primary-400 transition-colors">Reviews</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-neutral-500 mb-4 sm:mb-0">
              © {currentYear} Grinnage Exterminating. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-neutral-500 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-neutral-500 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-neutral-500 hover:text-primary-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
