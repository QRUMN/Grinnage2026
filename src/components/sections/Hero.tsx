import * as React from 'react';
import { ArrowRight, Shield, Calendar, Bug, CheckCircle, Clock, Phone, Leaf, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-[#111827] via-[#1a2234] to-[#111827] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
            <g opacity="0.2">
              <path d="M100,100 L1100,100 L1100,1100 L100,1100 Z" stroke="#56e39f" strokeWidth="1" fill="none" />
              <path d="M200,200 L1000,200 L1000,1000 L200,1000 Z" stroke="#56e39f" strokeWidth="1" fill="none" />
              <path d="M300,300 L900,300 L900,900 L300,900 Z" stroke="#56e39f" strokeWidth="1" fill="none" />
              <path d="M400,400 L800,400 L800,800 L400,800 Z" stroke="#56e39f" strokeWidth="1" fill="none" />
              <circle cx="600" cy="600" r="500" stroke="#56e39f" strokeWidth="1" fill="none" />
              <circle cx="600" cy="600" r="400" stroke="#56e39f" strokeWidth="1" fill="none" />
              <circle cx="600" cy="600" r="300" stroke="#56e39f" strokeWidth="1" fill="none" />
              <circle cx="600" cy="600" r="200" stroke="#56e39f" strokeWidth="1" fill="none" />
            </g>
          </svg>
        </div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#56e39f] rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#56e39f] rounded-full filter blur-[100px] opacity-20"></div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center justify-center mb-3 px-4 py-1.5 bg-[#56e39f]/10 rounded-full">
              <Bug className="w-4 h-4 mr-2 text-[#56e39f]" />
              <span className="text-sm font-medium text-[#56e39f]">Eco-Friendly Pest Management</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Advanced Pest Control
              <span className="block mt-1 text-[#56e39f] bg-gradient-to-r from-[#56e39f] to-[#48c98a] bg-clip-text text-transparent">for Modern Living</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Protecting your space with eco-friendly pest management solutions. 
              Experience the future of pest control today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
                icon={<ArrowRight className="ml-2 w-5 h-5" />}
                className="group"
              >
                <span className="group-hover:mr-1 transition-all">Get Started</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/consultation')}
                icon={<Calendar className="ml-2 w-5 h-5" />}
                className="border-[#56e39f]/30 text-[#56e39f] hover:bg-[#56e39f]/10"
              >
                Free Consultation
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/services')}
                icon={<Shield className="ml-2 w-5 h-5" />}
                className="text-white hover:bg-white/5"
              >
                Our Services
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 justify-center lg:justify-start">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#56e39f] mr-2" />
                <span className="text-sm text-gray-300">Eco-friendly Solutions</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#56e39f] mr-2" />
                <span className="text-sm text-gray-300">24/7 Emergency Service</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-[#56e39f] mr-2" />
                <span className="text-sm text-gray-300">5-Star Rated Service</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 lg:max-w-md w-full">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#56e39f]/10 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#56e39f]/20 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-[#56e39f]" />
                  </div>
                  <div className="text-3xl font-bold text-white">15K+</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Satisfied Clients</h3>
                <p className="text-gray-400 text-sm">Our customers love our thorough and reliable service</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#56e39f]/10 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#56e39f]/20 rounded-xl">
                    <Leaf className="w-6 h-6 text-[#56e39f]" />
                  </div>
                  <div className="text-3xl font-bold text-white">17+</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Years Experience</h3>
                <p className="text-gray-400 text-sm">Nearly two decades of pest control excellence</p>
              </div>
            </div>

            {/* Call to action card */}
            <div className="bg-gradient-to-r from-[#56e39f]/20 to-[#48c98a]/20 backdrop-blur-lg border border-[#56e39f]/30 rounded-2xl p-6 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#56e39f]/30 rounded-xl">
                  <Phone className="w-6 h-6 text-[#56e39f]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Emergency Service</h3>
                  <p className="text-gray-300 text-sm">24/7 support when you need it most</p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="w-full mt-4"
                onClick={() => navigate('/contact')}
              >
                Contact Us Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111827] to-transparent"></div>
    </div>
  );
};