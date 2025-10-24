import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, Mail, Clock, MapPin, ArrowLeft, Shield, Star,
  MessageCircle, Calendar, Award, Users
} from 'lucide-react';
import { ContactForm } from '../components/forms/ContactForm';
import { ContactFormData } from '../lib/validation/contact';

export const ContactPageSimple: React.FC = () => {
  const navigate = useNavigate();

  // Handle form submission and create CRM lead
  const handleContactSubmit = async (data: ContactFormData) => {
    try {
      // This would integrate with Supabase to create a lead
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        source: 'contact_form',
        status: 'new',
        service_type: data.subject,
        property_type: data.propertyType,
        urgency: data.urgency,
        budget: data.budget || null,
        address: data.address || null,
        preferred_contact: data.preferredContact,
        preferred_time: data.preferredTime || null,
        created_at: new Date().toISOString()
      };

      console.log('Creating lead:', leadData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Integrate with Supabase
      // await supabase.from('leads').insert([leadData]);

      // TODO: Send email notification to admin

    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "(555) 123-4567",
      description: "Available 24/7 for emergencies",
      action: "tel:+15551234567"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "info@grinnage.com",
      description: "We respond within 24 hours",
      action: "mailto:info@grinnage.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Service Area",
      content: "San Francisco Bay Area",
      description: "Licensed in CA, NV, OR",
      action: null
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      content: "Mon-Fri 8AM-6PM",
      description: "Saturday 9AM-4PM",
      action: null
    }
  ];

  const whyContactUs = [
    {
      icon: <Star className="w-5 h-5" />,
      title: "Free Consultation",
      description: "No obligation assessment and quote"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Licensed Professionals",
      description: "Certified and insured technicians"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Satisfaction Guarantee",
      description: "100% guarantee on all services"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Local Experts",
      description: "20+ years serving the Bay Area"
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
          <nav className="hidden md:flex items-center space-x-8">
            {['Services', 'About'].map(item => (
              <button
                key={item}
                className="nav-link"
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </button>
            ))}
            <span className="nav-link-active">Contact</span>
          </nav>
          <div className="flex items-center gap-3">
            <button
              className="btn-secondary"
              onClick={() => navigate('/login')}
            >
              Client Login
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <div className="badge-success mb-6">
                <MessageCircle className="w-4 h-4 mr-2" />
                Get In Touch Today
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Contact Our
                <span className="text-primary-500 block">Expert Team</span>
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto">
                Ready to solve your pest problem? Our licensed professionals are standing by
                to provide you with a free consultation and customized treatment plan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+15551234567" className="btn-primary">
                  <Phone className="w-5 h-5" />
                  Call (555) 123-4567
                </a>
                <a href="#contact-form" className="btn-outline">
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl mb-6 mx-auto group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <div className="text-primary-600 dark:text-primary-400">
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    {info.title}
                  </h3>
                  {info.action ? (
                    <a
                      href={info.action}
                      className="text-lg font-medium text-primary-600 dark:text-primary-400 hover:underline block mb-1"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      {info.content}
                    </p>
                  )}
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Contact Us */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                Why Choose Grinnage?
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                When you contact us, you're getting more than just pest control—you're getting peace of mind.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyContactUs.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4 mx-auto">
                    <div className="text-primary-600 dark:text-primary-400">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="section bg-white dark:bg-neutral-900">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                  Get Your Free Quote
                </h2>
                <p className="text-xl text-neutral-600 dark:text-neutral-400">
                  Tell us about your pest problem and we'll provide a customized solution.
                </p>
              </div>

              <div className="card">
                <ContactForm onSubmit={handleContactSubmit} />
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="section bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold mb-6">
                Need Emergency Service?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Don't wait! Our emergency response team is available 24/7 for urgent pest problems.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+15551234567"
                  className="btn bg-white text-primary-600 hover:bg-neutral-100"
                >
                  <Phone className="w-5 h-5" />
                  Emergency Hotline
                </a>
                <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
                  <Calendar className="w-5 h-5" />
                  Schedule Same-Day Service
                </button>
              </div>
              <p className="text-primary-200 text-sm mt-4">
                Same-day service available • Licensed & insured professionals
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
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
                <li><button onClick={() => navigate('/about')} className="hover:text-primary-400 transition-colors">About</button></li>
                <li><span className="text-primary-400">Contact</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-primary-400 transition-colors">Pest Inspection</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Pest Treatment</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Emergency Service</span></li>
                <li><span className="hover:text-primary-400 transition-colors">Maintenance Plans</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-neutral-500 mb-4 sm:mb-0">
              © 2025 Grinnage Pest Control. All rights reserved.
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