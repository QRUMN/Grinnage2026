import * as React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0f1729] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">GRINNAGE</h2>
              <div className="w-12 h-1 bg-[#56e39f] rounded-full"></div>
            </div>
            <p className="text-gray-400">
              Professional pest control services with a focus on eco-friendly solutions and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Services */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link to="/services/residential" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Residential Pest Control</span>
                </Link>
              </li>
              <li>
                <Link to="/services/commercial" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Commercial Pest Control</span>
                </Link>
              </li>
              <li>
                <Link to="/services/termite" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Termite Treatment</span>
                </Link>
              </li>
              <li>
                <Link to="/services/wildlife" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Wildlife Removal</span>
                </Link>
              </li>
              <li>
                <Link to="/services/mosquito" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Mosquito Control</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Quick Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-[#56e39f] transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Careers</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#56e39f] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">123 Pest Control Way<br />Atlanta, GA 30303</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#56e39f] mr-3 flex-shrink-0" />
                <a href="tel:+18005551234" className="text-gray-400 hover:text-[#56e39f] transition-colors">
                  (800) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#56e39f] mr-3 flex-shrink-0" />
                <a href="mailto:info@grinnage.com" className="text-gray-400 hover:text-[#56e39f] transition-colors">
                  info@grinnage.com
                </a>
              </li>
            </ul>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 inline-flex items-center">
              <Shield className="w-5 h-5 text-[#56e39f] mr-2" />
              <span className="text-white text-sm font-medium">24/7 Emergency Service Available</span>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} GRINNAGE Pest Control. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
