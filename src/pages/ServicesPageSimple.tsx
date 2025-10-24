import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Bug, Home, Building, Zap, Clock, Star,
  ArrowLeft, Phone, Mail, Calendar, CheckCircle,
  ArrowRight, Target, Award
} from 'lucide-react';

export const ServicesPageSimple: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'residential-inspection',
      title: 'Residential Inspection',
      subtitle: 'Comprehensive Home Assessment',
      price: 8999, // in cents
      interval: 'one_time',
      icon: <Home className="w-8 h-8" />,
      description: 'Thorough property inspection to identify pest issues and prevention opportunities.',
      features: [
        'Complete interior and exterior inspection',
        'Detailed written report with findings',
        'Treatment recommendations',
        'Prevention strategy plan',
        'Follow-up consultation included'
      ],
      popular: false
    },
    {
      id: 'residential-treatment',
      title: 'Residential Treatment',
      subtitle: 'Complete Pest Elimination',
      price: 19999, // in cents
      interval: 'one_time',
      icon: <Shield className="w-8 h-8" />,
      description: 'Professional pest treatment using safe, effective methods for your home.',
      features: [
        'Targeted pest elimination',
        'Eco-friendly treatment options',
        'Interior and exterior application',
        'Safe for family and pets',
        '30-day service guarantee'
      ],
      popular: true
    },
    {
      id: 'commercial-service',
      title: 'Commercial Service',
      subtitle: 'Business Pest Management',
      price: 7999, // in cents
      interval: 'month',
      icon: <Building className="w-8 h-8" />,
      description: 'Ongoing pest control solutions designed for commercial properties.',
      features: [
        'Monthly scheduled service',
        'Customized treatment plans',
        'Compliance documentation',
        'Emergency response available',
        'Dedicated account manager'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      title: 'Termite Control',
      description: 'Specialized termite inspection, treatment, and prevention services.',
      icon: <Bug className="w-6 h-6" />,
      features: ['Wood-destroying insect inspection', 'Liquid and bait treatments', 'Damage repair consultation']
    },
    {
      title: 'Emergency Service',
      description: '24/7 emergency pest control for urgent situations.',
      icon: <Zap className="w-6 h-6" />,
      features: ['Same-day response', 'After-hours availability', 'Rapid treatment solutions']
    },
    {
      title: 'Preventive Maintenance',
      description: 'Ongoing protection plans to prevent future infestations.',
      icon: <Clock className="w-6 h-6" />,
      features: ['Quarterly treatments', 'Seasonal adjustments', 'Unlimited service calls']
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
    return `$${(cents / 100).toFixed(0)}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="font-display font-bold text-2xl text-primary-600 dark:text-primary-400">
            GRINNAGE
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('/')} className="nav-link">Home</button>
            <span className="nav-link-active">Services</span>
            <button onClick={() => navigate('/about')} className="nav-link">About</button>
            <button onClick={() => navigate('/contact')} className="nav-link">Contact</button>
          </nav>
          <div className="flex items-center gap-3">
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
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8 mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>

              <div className="badge-success mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Professional Pest Control Services
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Our
                <span className="text-primary-500 block">Services</span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto">
                Comprehensive pest control solutions for homes and businesses.
                Safe, effective treatments that protect what matters most to you.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="btn-primary"
                  onClick={() => navigate('/contact')}
                >
                  <Calendar className="w-5 h-5" />
                  Get Free Quote
                </button>
                <a href="tel:+15551234567" className="btn-outline">
                  <Phone className="w-5 h-5" />
                  Call (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Core Services
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Professional pest control solutions tailored to your specific needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`card relative ${service.popular ? 'border-2 border-primary-500' : ''}`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl mb-6">
                    <div className="text-primary-600 dark:text-primary-400">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
                        {formatCurrencyFromCents(service.price)}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">
                        {service.interval === 'one_time' ? 'One-time' : `/${service.interval}`}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`btn w-full ${service.popular ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => navigate('/contact')}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Additional Services
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Specialized pest control solutions for unique situations and ongoing protection.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4">
                    <div className="text-primary-600 dark:text-primary-400">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                        <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
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
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Pests We Control
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                We provide effective treatment for a wide range of common household and commercial pests.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pestTypes.map((pest, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <Bug className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                    {pest}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Our Process
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                A systematic approach to pest control that ensures effective, long-lasting results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full mb-6 mx-auto font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                  Why Choose Grinnage?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex-shrink-0">
                      <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                        Licensed & Certified
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        All technicians are state-licensed and EPA-certified professionals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                        Safe & Eco-Friendly
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        We use environmentally responsible treatments safe for families and pets.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex-shrink-0">
                      <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                        Guaranteed Results
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        100% satisfaction guarantee with follow-up service included.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-2xl p-8">
                <div className="text-center">
                  <Star className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                    20+ Years Experience
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Trusted by over 5,000 Bay Area customers for reliable pest control solutions.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                      98% Customer Satisfaction Rate
                    </div>
                    <div className="flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                      24/7 Emergency Service Available
                    </div>
                    <div className="flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                      Licensed in California, Nevada, Oregon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Contact us today for a free inspection and customized treatment plan.
                Professional pest control that protects what matters most.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="btn bg-white text-primary-600 hover:bg-neutral-100"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Free Inspection
                </button>
                <a
                  href="tel:+15551234567"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  <Phone className="w-5 h-5" />
                  Call (555) 123-4567
                </a>
              </div>
              <p className="text-primary-200 text-sm mt-4">
                Same-day service available • Licensed & insured professionals
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300">
        <div className="container py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="font-display font-bold text-2xl text-primary-400 mb-4">
                GRINNAGE
              </div>
              <p className="text-neutral-400 mb-6 max-w-md">
                Professional pest control services since 2003.
                Protecting Bay Area homes and businesses with safe, effective solutions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-primary-500 mr-3" />
                  <a href="tel:+15551234567" className="hover:text-primary-400 transition-colors">
                    (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-primary-500 mr-3" />
                  <a href="mailto:info@grinnage.com" className="hover:text-primary-400 transition-colors">
                    info@grinnage.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-primary-400 transition-colors">Home</button></li>
                <li><span className="text-primary-400">Services</span></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-primary-400 transition-colors">About</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-primary-400 transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-primary-400 transition-colors">Residential Inspection</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Residential Treatment</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Commercial Service</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Emergency Service</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-neutral-500 mb-4 sm:mb-0">
              © 2025 Grinnage Exterminating. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-neutral-500 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-neutral-500 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};