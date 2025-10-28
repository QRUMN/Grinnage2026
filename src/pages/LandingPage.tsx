import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Bug, Star, Check, Mail, Phone, Clock,
  Users, Zap, Leaf, Award, MapPin, Calendar, Menu, X, ChevronRight, Search
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
      icon: <Shield className="w-8 h-8" />,
      features: ["Detailed inspection", "Problem ID", "Recommendations"],
      color: 'neon'
    },
    {
      ...defaultServices[1],
      icon: <Bug className="w-8 h-8" />,
      features: ["Eco-friendly", "Same-day service", "30-day guarantee"],
      color: 'cyan'
    },
    {
      ...defaultServices[2],
      icon: <Calendar className="w-8 h-8" />,
      features: ["Regular monitoring", "Priority scheduling", "24/7 support"],
      color: 'neon'
    }
  ];

  // Key benefits with icons
  const benefits = [
    { icon: <Leaf className="w-5 h-5" />, text: "Eco-friendly & safe" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 emergency" },
    { icon: <Award className="w-5 h-5" />, text: "Licensed experts" },
    { icon: <Shield className="w-5 h-5" />, text: "100% guarantee" },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      location: "San Francisco, CA",
      content: "Grinnage solved our ant problem quickly and safely. Professional team and amazing results!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Restaurant Owner",
      location: "Oakland, CA",
      content: "3 years with Grinnage. Their preventive approach keeps our establishment pest-free.",
      rating: 5
    },
    {
      name: "Linda Rodriguez",
      role: "Property Manager",
      location: "Berkeley, CA",
      content: "Reliable, effective, and great communication. Our go-to for all 12 properties.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Glass Navbar */}
      <header className="sticky top-0 glass-dark border-b border-neon-green/20 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo with Glow */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-green-dark flex items-center justify-center shadow-glow">
                <Shield className="w-6 h-6 text-dark-bg" />
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-full bg-neon-green blur-md opacity-50 animate-neon-pulse" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Grinnage Exterminating
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Contact'].map(item => (
              <button
                key={item}
                className="text-gray-300 hover:text-neon-green transition-all duration-300 font-medium relative
                         after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                         after:bg-neon-green after:shadow-glow after:transition-all after:duration-300 hover:after:w-full"
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="px-4 py-2 text-gray-300 hover:text-neon-green backdrop-blur-sm border border-dark-border 
                       rounded-lg hover:border-neon-green/30 transition-all duration-300"
              onClick={() => navigate('/admin-login')}
            >
              Admin
            </button>
            <button
              className="px-6 py-2.5 bg-neon-green text-dark-bg rounded-lg font-semibold
                       shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95
                       transition-all duration-300 relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                       before:via-white/30 before:to-transparent before:translate-x-[-100%] 
                       hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              onClick={() => navigate('/contact')}
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-neon-green transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-dark border-t border-neon-green/20 animate-fade-in-down">
            <nav className="container py-4 space-y-2">
              {['Services', 'About', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => { navigate(`/${item.toLowerCase()}`); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-neon-green 
                           hover:bg-dark-surface/40 rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
              <div className="border-t border-dark-border pt-4 space-y-2">
                <button
                  onClick={() => { navigate('/admin-login'); setIsMobileMenuOpen(false); }}
                  className="block w-full px-4 py-3 text-gray-300 backdrop-blur-sm border border-dark-border 
                           rounded-lg hover:border-neon-green/30 transition-all"
                >
                  Admin Login
                </button>
                <button
                  onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                  className="block w-full px-4 py-3 bg-neon-green text-dark-bg rounded-lg font-semibold
                           shadow-glow hover:shadow-glow-lg"
                >
                  Get Quote
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section with Floating 3D Elements */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Animated Background Gradient Orbs */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green rounded-full mix-blend-screen filter blur-3xl animate-float-slow" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent-500 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-neon-cyan rounded-full mix-blend-screen filter blur-3xl animate-float-fast" style={{ animationDelay: '4s' }} />
          </div>

          <div className="container relative z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Hero Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                              rounded-full backdrop-blur-sm shadow-glow animate-fade-in">
                  <Shield className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-semibold text-neon-green">Professional Pest Control</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-tight animate-fade-in-up">
                  Effective Pest Solutions for Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-accent-500">
                    Home & Business
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Protect your property with eco-friendly pest control services. 
                  Safe for your family, tough on pests.
                </p>

                {/* Quick Benefits */}
                <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-neon-green/20 flex items-center justify-center text-neon-green shadow-glow">
                        {benefit.icon}
                      </div>
                      <span className="text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <button
                    className="group px-8 py-4 bg-neon-green text-dark-bg rounded-xl font-bold text-lg
                             shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95
                             transition-all duration-300 relative overflow-hidden
                             before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                             before:via-white/30 before:to-transparent before:translate-x-[-100%] 
                             hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    onClick={() => navigate('/contact')}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Free Estimate
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <a
                    href="tel:+13025625654"
                    className="group px-8 py-4 backdrop-blur-sm border-2 border-neon-green/50 text-neon-green rounded-xl 
                             font-bold text-lg hover:bg-neon-green/10 hover:border-neon-green hover:shadow-glow
                             transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    (302) 562-5654
                  </a>
                </div>
              </div>

              {/* Right Column - Floating Logo */}
              <div className="hidden lg:flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="relative">
                  {/* Main Logo Circle with Glow */}
                  <div className="relative w-96 h-96 rounded-full border-4 border-neon-green shadow-glow-xl animate-float-slow">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-dark-surface to-dark-card" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green/20 to-transparent" />
                    
                    {/* Inner Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-12">
                      <Shield className="w-32 h-32 text-neon-green mb-4 drop-shadow-[0_0_20px_rgba(57,255,20,0.6)]" />
                      <span className="text-3xl font-display font-bold text-white mb-2">GRINNAGE</span>
                      <span className="text-lg text-neon-green font-medium">EXTERMINATING</span>
                      <div className="mt-4 px-4 py-2 bg-neon-green/20 border border-neon-green/30 rounded-full">
                        <span className="text-sm text-neon-green font-semibold">Family Owned • Minority Owned</span>
                      </div>
                    </div>

                    {/* Rotating Border Glow */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-green via-accent-500 to-neon-green 
                                  opacity-20 blur-lg animate-spin" style={{ animationDuration: '10s' }} />
                  </div>

                  {/* Floating Accent Circles */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-neon-cyan rounded-full shadow-glow-cyan animate-float-fast" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-neon-green rounded-full shadow-glow animate-float" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Floating Glass Cards */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-surface/50 to-transparent" />
          
          <div className="container relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                            rounded-full backdrop-blur-sm shadow-glow mb-6">
                <Bug className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">Our Services</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Premium Pest Control Solutions
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Choose the perfect plan for your needs. All backed by our satisfaction guarantee.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <div
                  key={index}
                  className="group relative backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                           border border-neon-green/20 rounded-2xl p-6 shadow-lg
                           hover:shadow-glow hover:-translate-y-2 hover:scale-105 hover:border-neon-green/40
                           transition-all duration-500 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate('/services')}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                bg-gradient-to-r from-transparent via-neon-green/5 to-transparent
                                transition-transform duration-1000 pointer-events-none" />

                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center mb-4
                                ${service.color === 'neon' ? 'bg-neon-green/20 text-neon-green shadow-glow' : 'bg-accent-500/20 text-accent-400 shadow-glow-cyan'}`}>
                    {service.icon}
                  </div>

                  {/* Service Info */}
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {service.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-neon-green font-mono">
                      {formatCurrencyFromCents(service.price)}
                    </span>
                    <span className="text-gray-400 text-sm">per service</span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-neon-green flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button className="w-full py-3 backdrop-blur-sm border-2 border-neon-green/50 text-neon-green rounded-xl 
                                   font-semibold hover:bg-neon-green/10 hover:border-neon-green hover:shadow-glow
                                   transition-all duration-300 flex items-center justify-center gap-2
                                   group-hover:bg-neon-green group-hover:text-dark-bg">
                    Learn More
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            {/* View All Services Link */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-2 text-neon-green font-semibold hover:gap-3 transition-all"
              >
                View All Services
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Instant Quote Calculator Section */}
        <section className="relative py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/40 to-dark-bg/60
                            border border-neon-green/30 rounded-3xl p-8 md:p-12 shadow-glow-lg
                            relative overflow-hidden">
                {/* Animated Border Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-green via-accent-500 to-neon-green 
                              opacity-20 blur-xl animate-spin" style={{ animationDuration: '8s' }} />

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                                  rounded-full backdrop-blur-sm shadow-glow mb-4">
                      <Zap className="w-4 h-4 text-neon-green" />
                      <span className="text-sm font-semibold text-neon-green">Instant Quote</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                      Get Your Quote in Seconds
                    </h2>
                    <p className="text-gray-300 text-lg">
                      No forms, no waiting. Select your service and get instant pricing.
                    </p>
                  </div>

                  {/* Quick Service Selector */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {['Inspection', 'Treatment', 'Maintenance'].map((service, index) => (
                      <button
                        key={service}
                        className="group p-6 backdrop-blur-sm bg-dark-surface/40 border border-dark-border
                                 rounded-xl hover:border-neon-green/50 hover:shadow-glow hover:scale-105
                                 transition-all duration-300 text-center"
                      >
                        <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-neon-green/20 
                                      flex items-center justify-center text-neon-green
                                      group-hover:shadow-glow transition-all">
                          {index === 0 && <Search className="w-6 h-6" />}
                          {index === 1 && <Bug className="w-6 h-6" />}
                          {index === 2 && <Shield className="w-6 h-6" />}
                        </div>
                        <div className="font-semibold text-white mb-1">{service}</div>
                        <div className="text-sm text-gray-400">From $99</div>
                      </button>
                    ))}
                  </div>

                  {/* Quick Action Button */}
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-5 bg-neon-green text-dark-bg rounded-xl font-bold text-lg
                             shadow-glow hover:shadow-glow-xl hover:scale-105 active:scale-95
                             transition-all duration-300 relative overflow-hidden
                             before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                             before:via-white/30 before:to-transparent before:translate-x-[-100%] 
                             hover:before:translate-x-[100%] before:transition-transform before:duration-700
                             flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Free Consultation
                  </button>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-neon-green" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-neon-green" />
                      <span>Same-day service available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                            rounded-full backdrop-blur-sm shadow-glow mb-6">
                <Star className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">Trusted by Thousands</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join our satisfied customers who trust us with their pest control needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                           border border-neon-green/20 rounded-2xl p-6 shadow-lg
                           hover:shadow-glow hover:-translate-y-1 hover:border-neon-green/40
                           transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-neon-green fill-neon-green" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-dark-surface to-accent-500/10" />
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="backdrop-blur-xl bg-dark-surface/40 border-2 border-neon-green/30 
                            rounded-3xl p-12 shadow-glow-xl relative overflow-hidden">
                {/* Animated Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent
                              -translate-x-full animate-shimmer" style={{ animationDuration: '3s', animationIterationCount: 'infinite' }} />

                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-8 relative z-10">
                  Join thousands of satisfied customers who trust Grinnage for pest-free living.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-4 bg-neon-green text-dark-bg rounded-xl font-bold text-lg
                             shadow-glow hover:shadow-glow-xl hover:scale-105 active:scale-95
                             transition-all duration-300 relative overflow-hidden
                             before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                             before:via-white/30 before:to-transparent before:translate-x-[-100%] 
                             hover:before:translate-x-[100%] before:transition-transform before:duration-700
                             flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Free Consultation
                  </button>

                  <a
                    href="tel:+13025625654"
                    className="px-8 py-4 backdrop-blur-sm border-2 border-neon-green/50 text-neon-green rounded-xl 
                             font-bold text-lg hover:bg-neon-green/10 hover:border-neon-green hover:shadow-glow
                             transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    (302) 562-5654
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="relative backdrop-blur-md bg-dark-surface/20 border-t border-neon-green/20">
        <div className="container py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-green-dark flex items-center justify-center shadow-glow">
                  <Shield className="w-6 h-6 text-dark-bg" />
                </div>
                <span className="font-display font-bold text-2xl text-white">
                  Grinnage Exterminating
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Professional pest control services since 2007. 
                Protecting homes and businesses with eco-friendly solutions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neon-green" />
                  <a href="tel:+13025625654" className="text-gray-300 hover:text-neon-green transition-colors">
                    (302) 562-5654
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neon-green" />
                  <a href="mailto:contact@grinnagex.com" className="text-gray-300 hover:text-neon-green transition-colors">
                    contact@grinnagex.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neon-green" />
                  <span className="text-gray-300">Serving all of Delaware</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Services', 'About', 'Contact'].map(item => (
                  <li key={item}>
                    <button 
                      onClick={() => navigate(`/${item.toLowerCase()}`)}
                      className="text-gray-400 hover:text-neon-green transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => navigate('/admin-login')}
                    className="text-gray-400 hover:text-neon-green transition-colors"
                  >
                    Admin Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Pest Inspection</li>
                <li>Pest Treatment</li>
                <li>Termite Control</li>
                <li>Emergency Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {currentYear} Grinnage Exterminating. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neon-green/20 border border-neon-green/30 rounded-full">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-neon-pulse" />
                <span className="text-xs font-semibold text-neon-green">Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
