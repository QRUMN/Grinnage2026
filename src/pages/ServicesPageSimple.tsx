import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Bug, Zap, Star, ArrowLeft, Phone, Mail, Calendar, CheckCircle,
  ArrowRight, Target, Award, Menu, X, MapPin, Clock, Leaf
} from 'lucide-react';

export const ServicesPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const services = [
    {
      id: 'residential-inspection',
      title: 'Residential Inspection',
      subtitle: 'Comprehensive Home Assessment',
      price: '$89.99',
      interval: 'one-time',
      icon: <Shield className="w-10 h-10" />,
      description: 'Thorough property inspection to identify pest issues and prevention opportunities.',
      features: [
        'Complete interior and exterior inspection',
        'Detailed written report with findings',
        'Treatment recommendations',
        'Prevention strategy plan',
        'Follow-up consultation included'
      ],
      popular: false,
      color: 'neon'
    },
    {
      id: 'residential-treatment',
      title: 'Residential Treatment',
      subtitle: 'Complete Pest Elimination',
      price: '$199.99',
      interval: 'one-time',
      icon: <Bug className="w-10 h-10" />,
      description: 'Professional pest treatment using safe, effective methods for your home.',
      features: [
        'Targeted pest elimination',
        'Eco-friendly treatment options',
        'Interior and exterior application',
        'Safe for family and pets',
        '30-day service guarantee'
      ],
      popular: true,
      color: 'cyan'
    },
    {
      id: 'commercial-service',
      title: 'Commercial Service',
      subtitle: 'Business Pest Management',
      price: '$79.99',
      interval: 'per month',
      icon: <Target className="w-10 h-10" />,
      description: 'Ongoing pest control solutions designed for commercial properties.',
      features: [
        'Monthly scheduled service',
        'Customized treatment plans',
        'Compliance documentation',
        'Emergency response available',
        'Dedicated account manager'
      ],
      popular: false,
      color: 'neon'
    },
    {
      id: 'quarterly-maintenance',
      title: 'Quarterly Maintenance',
      subtitle: 'Seasonal Pest Prevention',
      price: '$159.99',
      interval: 'every 3 months',
      icon: <Clock className="w-10 h-10" />,
      description: 'Seasonal pest prevention service to keep your property protected year-round.',
      features: [
        'Quarterly inspections',
        'Preventive treatments',
        'Seasonal pest focus',
        'Priority scheduling',
        'Extended warranty'
      ],
      popular: false,
      color: 'cyan'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Free Inspection',
      description: 'Our experts identify the pest problem and assess your property',
      icon: <Shield className="w-6 h-6" />
    },
    {
      number: '02',
      title: 'Custom Solution',
      description: 'We create a tailored treatment plan for your specific needs',
      icon: <Target className="w-6 h-6" />
    },
    {
      number: '03',
      title: 'Safe Treatment',
      description: 'Eco-friendly application that is safe for family and pets',
      icon: <Leaf className="w-6 h-6" />
    },
    {
      number: '04',
      title: 'Guaranteed Results',
      description: 'We ensure complete pest elimination with follow-up protection',
      icon: <Award className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Glass Navbar */}
      <header className="sticky top-0 glass-dark border-b border-neon-green/20 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo */}
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
            <button onClick={() => navigate('/')} className="text-gray-300 hover:text-neon-green transition-all duration-300 font-medium relative
                     after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                     after:bg-neon-green after:shadow-glow after:transition-all after:duration-300 hover:after:w-full">
              Home
            </button>
            <span className="text-neon-green font-medium relative
                         after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 
                         after:bg-neon-green after:shadow-glow">
              Services
            </span>
            <button onClick={() => navigate('/about')} className="text-gray-300 hover:text-neon-green transition-all duration-300 font-medium relative
                     after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                     after:bg-neon-green after:shadow-glow after:transition-all after:duration-300 hover:after:w-full">
              About
            </button>
            <button onClick={() => navigate('/contact')} className="text-gray-300 hover:text-neon-green transition-all duration-300 font-medium relative
                     after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                     after:bg-neon-green after:shadow-glow after:transition-all after:duration-300 hover:after:w-full">
              Contact
            </button>
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
                       transition-all duration-300"
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
          <div className="md:hidden glass-dark border-t border-neon-green/20">
            <nav className="container py-4 space-y-2">
              <button onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-neon-green hover:bg-dark-surface/40 rounded-lg transition-all">
                Home
              </button>
              <div className="px-4 py-3 text-neon-green font-medium bg-neon-green/10 rounded-lg">
                Services
              </div>
              <button onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-neon-green hover:bg-dark-surface/40 rounded-lg transition-all">
                About
              </button>
              <button onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-neon-green hover:bg-dark-surface/40 rounded-lg transition-all">
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-green rounded-full mix-blend-screen filter blur-3xl animate-float-slow" />
            <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-accent-500 rounded-full mix-blend-screen filter blur-3xl animate-float" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                            rounded-full backdrop-blur-sm shadow-glow mb-6">
                <Bug className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">Complete Service Portfolio</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                Pest Control
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-accent-500">
                  Services & Pricing
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Professional pest control solutions for residential and commercial properties. 
                Eco-friendly, effective, and guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-8 py-4 bg-neon-green text-dark-bg rounded-xl font-bold
                           shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/contact')}
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Schedule Free Consultation
                </button>
                <a
                  href="tel:+13025625654"
                  className="px-8 py-4 backdrop-blur-sm border-2 border-neon-green/50 text-neon-green rounded-xl 
                           font-bold hover:bg-neon-green/10 hover:border-neon-green hover:shadow-glow
                           transition-all duration-300"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Call (302) 562-5654
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                           border border-neon-green/20 rounded-3xl p-8 shadow-lg
                           hover:shadow-glow hover:-translate-y-2 hover:scale-105 hover:border-neon-green/40
                           transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-3 right-8 px-4 py-1.5 bg-neon-green text-dark-bg rounded-full 
                                  text-xs font-bold shadow-glow">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                bg-gradient-to-r from-transparent via-neon-green/5 to-transparent
                                transition-transform duration-1000 pointer-events-none rounded-3xl" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6
                                  ${service.color === 'neon' ? 'bg-neon-green/20 text-neon-green shadow-glow' : 'bg-accent-500/20 text-accent-400 shadow-glow-cyan'}`}>
                      {service.icon}
                    </div>

                    {/* Title & Price */}
                    <div className="mb-6">
                      <h3 className="text-3xl font-display font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{service.subtitle}</p>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-neon-green font-mono">
                          {service.price}
                        </span>
                        <span className="text-gray-400">{service.interval}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate('/contact')}
                      className="w-full py-4 bg-neon-green text-dark-bg rounded-xl font-bold
                               shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95
                               transition-all duration-300 relative overflow-hidden
                               before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                               before:via-white/30 before:to-transparent before:translate-x-[-100%] 
                               hover:before:translate-x-[100%] before:transition-transform before:duration-700
                               flex items-center justify-center gap-2"
                    >
                      Get This Service
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-surface/50 to-transparent" />

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                            rounded-full backdrop-blur-sm shadow-glow mb-6">
                <Award className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">Our Process</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                How We Work
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Simple, effective, and guaranteed pest control in four easy steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                           border border-neon-green/20 rounded-2xl p-6
                           hover:shadow-glow hover:border-neon-green/40 hover:scale-105
                           transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-neon-green 
                                flex items-center justify-center shadow-glow">
                    <span className="text-dark-bg font-bold font-mono">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center 
                                text-neon-green shadow-glow mt-4 mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-dark-surface to-accent-500/10" />

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-xl bg-dark-surface/40 border-2 border-neon-green/30 
                            rounded-3xl p-12 shadow-glow-xl text-center relative overflow-hidden">
                {/* Animated Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent
                              -translate-x-full animate-shimmer" style={{ animationDuration: '3s', animationIterationCount: 'infinite' }} />

                <Star className="w-16 h-16 text-neon-green mx-auto mb-6 drop-shadow-[0_0_20px_rgba(57,255,20,0.6)]" />
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">
                  Ready to Protect Your Property?
                </h2>
                <p className="text-xl text-gray-300 mb-8 relative z-10">
                  Get started with a free consultation and instant quote.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-4 bg-neon-green text-dark-bg rounded-xl font-bold text-lg
                             shadow-glow hover:shadow-glow-xl hover:scale-105 active:scale-95
                             transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Free Consultation
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
                <li>
                  <button onClick={() => navigate('/')} className="text-gray-400 hover:text-neon-green transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <span className="text-neon-green">Services</span>
                </li>
                <li>
                  <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-neon-green transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/contact')} className="text-gray-400 hover:text-neon-green transition-colors">
                    Contact
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
              © {new Date().getFullYear()} Grinnage Exterminating. All rights reserved.
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
