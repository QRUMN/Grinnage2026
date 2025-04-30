import React from 'react';
import { Bug, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const quickLinks = [
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Free Consultation', path: '/consultation' },
  ];

  const serviceAreas = ['Delaware', 'Pennsylvania', 'New Jersey', 'Maryland'];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', href: '#' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:contact@grinnage.com' },
  ];

  return (
    <footer className="bg-content-900 text-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bug className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold">Grinnage</span>
            </div>
            <p className="text-surface-200 text-sm">
              Your trusted partner in professional pest control services since 2007.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-surface-300 hover:text-primary-500 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-surface-200 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map((area, index) => (
                <li key={index} className="text-surface-200 text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-primary-500 mt-1" />
                <div>
                  <p className="text-sm">24/7 Emergency Service:</p>
                  <a href="tel:(302) 561-5654" className="text-primary-500 hover:text-primary-400">
                    (302) 561-5654
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-primary-500 mt-1" />
                <div>
                  <p className="text-sm">Email:</p>
                  <a
                    href="mailto:contact@grinnage.com"
                    className="text-primary-500 hover:text-primary-400"
                  >
                    contact@grinnage.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-50/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-surface-300 text-sm">
              &copy; {new Date().getFullYear()} Grinnage Extermination. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-surface-300 hover:text-primary-500">Privacy Policy</a>
              <a href="#" className="text-surface-300 hover:text-primary-500">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};