import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export const ContactPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, for example sending the data to your backend
    console.log('Form submitted:', formState);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormState({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      info: "(302) 561-5654",
      subInfo: "24/7 Emergency Service"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      info: "contact@grinnage.com",
      subInfo: "We'll respond within 24h"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      info: "Mon-Fri: 8am - 6pm",
      subInfo: "Sat: 9am - 2pm"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      info: "123 Pest Control St",
      subInfo: "City, State 12345"
    }
  ];

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
                className={`transition-colors ${item === 'Contact' ? 'text-[#56e39f]' : 'text-gray-300 hover:text-[#56e39f]'}`}
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
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-300 hover:text-[#56e39f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>

        {/* Contact Hero Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center px-3 py-1 bg-[#56e39f]/10 rounded-full mb-4">
              <Mail className="w-4 h-4 mr-2 text-[#56e39f]" />
              <span className="text-sm font-medium text-[#56e39f]">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're here to help with all your pest control needs. Contact us today for a free consultation.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-[#56e39f]/20">
                  <div className="p-3 bg-[#56e39f]/10 rounded-lg text-[#56e39f] mb-4 inline-block">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white">
                    {item.info}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {item.subInfo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#56e39f]/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#56e39f]/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#56e39f]/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#56e39f]/50"
                      >
                        <option value="" className="bg-[#111827]">Select a service</option>
                        <option value="residential" className="bg-[#111827]">Residential Pest Control</option>
                        <option value="commercial" className="bg-[#111827]">Commercial Pest Control</option>
                        <option value="termite" className="bg-[#111827]">Termite Treatment</option>
                        <option value="wildlife" className="bg-[#111827]">Wildlife Removal</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#56e39f]/50"
                    ></textarea>
                  </div>
                  <Button 
                    variant="primary"
                    type="submit"
                    icon={<ArrowRight className="ml-2 w-5 h-5" />}
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Google Map */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-[400px]">
                {/* For a real implementation, you would integrate Google Maps here */}
                <div className="w-full h-full bg-[#1a2234] flex items-center justify-center">
                  <div className="text-center px-6">
                    <MapPin className="w-12 h-12 text-[#56e39f] mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Our Location</h3>
                    <p className="text-gray-300">123 Pest Control Street</p>
                    <p className="text-gray-300">City, State 12345</p>
                    <p className="mt-4 text-[#56e39f]">Map integration would be here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-r from-[#56e39f]/20 to-blue-500/20 backdrop-blur-sm border border-[#56e39f]/30 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Need emergency assistance?</h3>
                  <p className="text-gray-300">Our technicians are available 24/7 for emergency pest control services</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="tel:+13025615654"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#56e39f] text-white rounded-lg hover:bg-[#48c98a] transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl mb-2">GRINNAGE</div>
              <p className="text-gray-400 text-sm">
                Professional pest control services since 2007.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Terms
              </a>
              <a href="/sitemap" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} GRINNAGE Pest Control. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
