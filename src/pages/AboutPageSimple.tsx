import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Award, ArrowLeft, CheckCircle, Star, Phone, Mail, Calendar, Menu, X,
  User, Leaf, Heart, Zap, MapPin, Clock
} from 'lucide-react';

export const AboutPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const teamMembers = [
    {
      name: "Keith Grinnage",
      role: "CEO & Operator",
      description: "With over 17 years of experience in pest control, Keith leads our team with expertise and dedication to customer satisfaction.",
      experience: "17+ years"
    },
    {
      name: "Dawson Grinnage",
      role: "Social Media Manager",
      description: "Managing our digital presence and ensuring our clients stay informed about the latest pest control solutions and company updates.",
      experience: "Digital Marketing Expert"
    }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Delivering superior pest control solutions with unmatched expertise.",
      color: "neon"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description: "Eco-friendly practices that protect your space and the environment.",
      color: "cyan"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Focus",
      description: "Building lasting relationships through exceptional service.",
      color: "neon"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Continuously evolving with cutting-edge pest control methods.",
      color: "cyan"
    }
  ];

  const certifications = [
    { name: "EPA Certified", description: "Environmental Protection Agency certification" },
    { name: "State Licensed", description: "Licensed pest control professionals" },
    { name: "5C Certification", description: "Commercial pest control certification" },
    { name: "7A Certification", description: "Advanced pest management certification" },
    { name: "7B Certification", description: "Specialized treatment certification" }
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
            <button onClick={() => navigate('/services')} className="text-gray-300 hover:text-neon-green transition-all duration-300 font-medium relative
                     after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                     after:bg-neon-green after:shadow-glow after:transition-all after:duration-300 hover:after:w-full">
              Services
            </button>
            <span className="text-neon-green font-medium relative
                         after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 
                         after:bg-neon-green after:shadow-glow">
              About
            </span>
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
              <button onClick={() => { navigate('/services'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-neon-green hover:bg-dark-surface/40 rounded-lg transition-all">
                Services
              </button>
              <div className="px-4 py-3 text-neon-green font-medium bg-neon-green/10 rounded-lg">
                About
              </div>
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
                <Shield className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">About Our Company</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                About
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-accent-500">
                  Grinnage Exterminating
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Leading the industry in innovative and eco-friendly pest control solutions since 2007.
                We're committed to protecting your space while preserving our environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-8 py-4 bg-neon-green text-dark-bg rounded-xl font-bold
                           shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/contact')}
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Get Free Consultation
                </button>
                <button
                  className="px-8 py-4 backdrop-blur-sm border-2 border-neon-green/50 text-neon-green rounded-xl 
                           font-bold hover:bg-neon-green/10 hover:border-neon-green hover:shadow-glow
                           transition-all duration-300"
                  onClick={() => navigate('/services')}
                >
                  <Shield className="w-5 h-5 inline mr-2" />
                  Our Services
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="relative py-24">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                            rounded-full backdrop-blur-sm shadow-glow mb-6">
                <User className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">Meet Our Team</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                The People Behind Our Success
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our experienced professionals are dedicated to providing exceptional pest control services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                           border border-neon-green/20 rounded-3xl p-8 shadow-lg text-center
                           hover:shadow-glow hover:-translate-y-2 hover:border-neon-green/40
                           transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-green/20 
                                flex items-center justify-center text-neon-green shadow-glow">
                    <User className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-neon-green font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-400 mb-4 font-medium">
                    {member.experience}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-surface/50 to-transparent" />

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                            rounded-full backdrop-blur-sm shadow-glow mb-6">
                <Heart className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">Our Values</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                What Drives Our Mission
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                These core principles guide everything we do and ensure exceptional service.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                           border border-neon-green/20 rounded-2xl p-6 text-center
                           hover:shadow-glow hover:-translate-y-1 hover:border-neon-green/40 hover:scale-105
                           transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center
                                ${value.color === 'neon' ? 'bg-neon-green/20 text-neon-green shadow-glow' : 'bg-accent-500/20 text-accent-400 shadow-glow-cyan'}`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="relative py-24">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                            rounded-full backdrop-blur-sm shadow-glow mb-6">
                <Award className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-semibold text-neon-green">Our Certifications</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Licensed & Certified Professionals
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                We maintain the highest industry standards with comprehensive certifications.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                           border border-neon-green/20 rounded-2xl p-6 text-center
                           hover:shadow-glow hover:-translate-y-1 hover:border-neon-green/40
                           transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-neon-green" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {cert.description}
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
                  Ready to Work With Us?
                </h2>
                <p className="text-xl text-gray-300 mb-8 relative z-10">
                  Contact us today for a free consultation about your pest control needs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-4 bg-neon-green text-dark-bg rounded-xl font-bold text-lg
                             shadow-glow hover:shadow-glow-xl hover:scale-105 active:scale-95
                             transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Get Free Consultation
                  </button>

                  <a
                    href="tel:+13025625654"
                    className="px-8 py-4 backdrop-blur-sm border-2 border-neon-green/50 text-neon-green rounded-xl 
                             font-bold text-lg hover:bg-neon-green/10 hover:border-neon-green hover:shadow-glow
                             transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 inline mr-2" />
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
                  <button onClick={() => navigate('/services')} className="text-gray-400 hover:text-neon-green transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <span className="text-neon-green">About</span>
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
