import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Phone, Mail, MapPin, Calendar, Send, ArrowLeft,
  Clock, Star, Menu, X, CheckCircle, Zap
} from 'lucide-react';

export const ContactPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: 'inspection',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '', service: 'inspection', message: '' });
    }, 3000);
  };

  const quickServices = [
    { id: 'inspection', label: 'Free Inspection', icon: <Shield /> },
    { id: 'treatment', label: 'Pest Treatment', icon: <Zap /> },
    { id: 'emergency', label: 'Emergency Service', icon: <Clock /> },
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
            <button onClick={() => navigate('/about')} className="text-gray-300 hover:text-neon-green transition-all duration-300 font-medium relative
                     after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                     after:bg-neon-green after:shadow-glow after:transition-all after:duration-300 hover:after:w-full">
              About
            </button>
            <span className="text-neon-green font-medium relative
                         after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 
                         after:bg-neon-green after:shadow-glow">
              Contact
            </span>
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
            <a
              href="tel:+13025625654"
              className="px-6 py-2.5 bg-neon-green text-dark-bg rounded-lg font-semibold
                       shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95
                       transition-all duration-300"
            >
              Call Now
            </a>
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
              <button onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-neon-green hover:bg-dark-surface/40 rounded-lg transition-all">
                About
              </button>
              <div className="px-4 py-3 text-neon-green font-medium bg-neon-green/10 rounded-lg">
                Contact
              </div>
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </button>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                              rounded-full backdrop-blur-sm shadow-glow mb-6">
                  <Send className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-semibold text-neon-green">Get in Touch</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                  Contact Us
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-accent-500">
                    We're Here to Help
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Get your free consultation and instant quote. We respond to all inquiries within 1 hour.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/40 to-dark-bg/60
                              border border-neon-green/20 rounded-3xl p-8 shadow-glow relative overflow-hidden">
                  {/* Success Overlay */}
                  {isSuccess && (
                    <div className="absolute inset-0 bg-dark-bg/95 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4 animate-scale-in" />
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-300">We'll get back to you within 1 hour.</p>
                      </div>
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                                 rounded-xl text-white placeholder-gray-500
                                 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 focus:outline-none
                                 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                                 rounded-xl text-white placeholder-gray-500
                                 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 focus:outline-none
                                 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                                 rounded-xl text-white placeholder-gray-500
                                 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 focus:outline-none
                                 transition-all duration-300"
                        placeholder="(302) 555-0100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Service Needed</label>
                      <div className="grid grid-cols-3 gap-3">
                        {quickServices.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: service.id })}
                            className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300
                                     ${formData.service === service.id 
                                       ? 'bg-neon-green/20 border-neon-green text-neon-green shadow-glow' 
                                       : 'bg-dark-surface/40 border-dark-border text-gray-300 hover:border-neon-green/30'}`}
                          >
                            <div className="w-8 h-8 mx-auto mb-2">
                              {service.icon}
                            </div>
                            <div className="text-xs font-medium">{service.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                                 rounded-xl text-white placeholder-gray-500
                                 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 focus:outline-none
                                 transition-all duration-300 resize-none"
                        placeholder="Tell us about your pest problem..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-neon-green text-dark-bg rounded-xl font-bold text-lg
                               shadow-glow hover:shadow-glow-xl hover:scale-105 active:scale-95
                               transition-all duration-300 relative overflow-hidden disabled:opacity-50
                               before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                               before:via-white/30 before:to-transparent before:translate-x-[-100%] 
                               hover:before:translate-x-[100%] before:transition-transform before:duration-700
                               flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                      We'll respond within <span className="text-neon-green font-semibold">1 hour</span>
                    </p>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  {/* Quick Contact Card */}
                  <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/40 to-dark-bg/60
                                border border-neon-green/20 rounded-3xl p-8 shadow-glow">
                    <h3 className="text-2xl font-bold text-white mb-6">Get Instant Help</h3>

                    <div className="space-y-6">
                      {/* Phone */}
                      <a
                        href="tel:+13025625654"
                        className="group flex items-start gap-4 p-4 rounded-xl bg-dark-surface/40 border border-dark-border
                                 hover:border-neon-green/30 hover:shadow-glow transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center 
                                      text-neon-green shadow-glow shrink-0">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Call Us</div>
                          <div className="text-xl font-bold text-neon-green group-hover:text-neon-green-dark transition-colors">
                            (302) 562-5654
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Available 24/7</div>
                        </div>
                      </a>

                      {/* Email */}
                      <a
                        href="mailto:contact@grinnagex.com"
                        className="group flex items-start gap-4 p-4 rounded-xl bg-dark-surface/40 border border-dark-border
                                 hover:border-neon-green/30 hover:shadow-glow transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-lg bg-accent-500/20 flex items-center justify-center 
                                      text-accent-400 shadow-glow-cyan shrink-0">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Email Us</div>
                          <div className="text-lg font-semibold text-white group-hover:text-neon-green transition-colors">
                            contact@grinnagex.com
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Response within 1 hour</div>
                        </div>
                      </a>

                      {/* Location */}
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-surface/40 border border-dark-border">
                        <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center 
                                      text-neon-green shadow-glow shrink-0">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Service Area</div>
                          <div className="text-lg font-semibold text-white">
                            All of Delaware
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Same-day service available</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours Card */}
                  <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/40 to-dark-bg/60
                                border border-neon-green/20 rounded-3xl p-8 shadow-glow">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-neon-green" />
                      Business Hours
                    </h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="text-neon-green font-semibold">8AM - 6PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="text-neon-green font-semibold">9AM - 4PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="text-gray-500">Closed</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-dark-border">
                        <div className="flex items-center gap-2 text-neon-green">
                          <div className="w-2 h-2 bg-neon-green rounded-full animate-neon-pulse" />
                          <span className="text-sm font-semibold">Emergency Service Available 24/7</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-neon-green transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <span className="text-neon-green">Contact</span>
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
