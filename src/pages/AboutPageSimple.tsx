import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Award, Users, Clock, ArrowLeft, CheckCircle,
  Star, MapPin, Phone, Mail, Calendar, Target, Menu, X
} from 'lucide-react';

export const AboutPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description: "We prioritize the safety of your family, pets, and property with eco-friendly treatments and proven methods."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "Our certified technicians deliver exceptional service backed by industry-leading training and experience."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Focus",
      description: "Every solution is tailored to your specific needs with transparent pricing and clear communication."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Reliability",
      description: "Count on us for prompt service, consistent results, and long-term pest prevention strategies."
    }
  ];

  const stats = [
    { number: "20+", label: "Years Experience" },
    { number: "5,000+", label: "Homes Protected" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Emergency Service" }
  ];

  const team = [
    {
      name: "Keith Grinnage",
      role: "Founder & Lead Technician",
      credentials: "Licensed Pest Control Professional",
      experience: "20+ years in pest management",
      specialties: ["Residential Treatment", "Commercial Solutions", "Eco-Friendly Methods"]
    },
    {
      name: "Sarah Martinez",
      role: "Operations Manager",
      credentials: "Certified Pest Control Operator",
      experience: "15+ years in customer service",
      specialties: ["Customer Relations", "Treatment Planning", "Quality Assurance"]
    },
    {
      name: "Mike Chen",
      role: "Senior Technician",
      credentials: "State Licensed Applicator",
      experience: "12+ years field experience",
      specialties: ["Termite Treatment", "Commercial Properties", "Integrated Pest Management"]
    }
  ];

  const certifications = [
    "California Structural Pest Control License",
    "EPA Certified Technicians",
    "National Pest Management Association Member",
    "Better Business Bureau A+ Rating",
    "State Licensed & Bonded",
    "Comprehensive Liability Insurance"
  ];

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
            <button onClick={() => navigate('/services')} className="text-gray-300 hover:text-[#56e39f] transition-colors">Services</button>
            <span className="text-[#56e39f] font-medium">About</span>
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
              <button
                onClick={() => { navigate('/services'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-[#56e39f] hover:bg-white/5 rounded-lg transition-colors"
              >
                Services
              </button>
              <div className="px-4 py-3 text-[#56e39f] font-medium">
                About
              </div>
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
                Trusted Pest Control Experts
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                About
                <span className="text-primary-500 block">Grinnage Exterminating</span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto">
                For over two decades, we've been protecting Bay Area homes and businesses
                with safe, effective pest control solutions. Our mission is simple: provide
                exceptional service that gives you peace of mind.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <button
                  className="btn-primary"
                  onClick={() => navigate('/contact')}
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Consultation
                </button>
                <a href="tel:+15551234567" className="btn-outline">
                  <Phone className="w-5 h-5" />
                  Call (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                  <p>
                    Founded in 2003, Grinnage Exterminating began with a simple mission:
                    to provide the Bay Area with reliable, safe, and effective pest management
                    solutions. What started as a small local business has grown into a trusted
                    name in residential and commercial pest control.
                  </p>
                  <p>
                    Our founder, Keith Grinnage, recognized the need for a pest control
                    company that prioritized customer education, environmental responsibility,
                    and long-term prevention strategies. This vision continues to guide
                    everything we do today.
                  </p>
                  <p>
                    We've built our reputation on transparency, quality service, and
                    genuine care for our community. Every member of our team shares a
                    commitment to protecting what matters most to you – your family,
                    your property, and your peace of mind.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="w-24 h-24 text-primary-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                      Licensed & Insured
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Professional pest control services you can trust
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Our Values
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                These core principles guide every decision we make and every service we provide.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl mb-6 mx-auto">
                    <div className="text-primary-600 dark:text-primary-400">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Our certified professionals bring decades of combined experience to every job.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {team.map((member, index) => (
                <div key={index} className="card text-center">
                  <div className="flex items-center justify-center w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full mb-6 mx-auto">
                    <Users className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    {member.credentials}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    {member.experience}
                  </p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <div key={idx} className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full inline-block mr-1">
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Certifications & Licenses
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                We maintain the highest industry standards through ongoing certification and training.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                  Service Area
                </h2>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
                  We proudly serve the entire San Francisco Bay Area with
                  comprehensive pest control solutions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-neutral-900 dark:text-neutral-100">San Francisco County</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-neutral-900 dark:text-neutral-100">San Mateo County</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-neutral-900 dark:text-neutral-100">Santa Clara County</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-neutral-900 dark:text-neutral-100">Alameda County</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Target className="w-24 h-24 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    Local Expertise
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Deep knowledge of Bay Area pest challenges and solutions
                  </p>
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
                Ready to Protect Your Property?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of satisfied customers who trust Grinnage for all their pest control needs.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="btn bg-white text-primary-600 hover:bg-neutral-100"
                >
                  <Calendar className="w-5 h-5" />
                  Get Free Quote
                </button>
                <a
                  href="tel:+15551234567"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  <Phone className="w-5 h-5" />
                  Call (555) 123-4567
                </a>
              </div>
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
                <li><button onClick={() => navigate('/services')} className="hover:text-primary-400 transition-colors">Services</button></li>
                <li><span className="text-primary-400">About</span></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-primary-400 transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-primary-400 transition-colors">Pest Inspection</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Pest Treatment</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Termite Control</span></li>
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