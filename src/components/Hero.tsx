import React from 'react';
import { ArrowRight, Shield, Bug, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-dark-900 to-dark-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAyNGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvZz48L3N2Zz4=')] bg-repeat opacity-5" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6 space-x-2">
              <Bug className="w-10 h-10 text-mint-400" />
              <span className="text-xl sm:text-2xl font-bold text-mint-400">Grinnage Extermination</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Advanced Pest Control <br className="hidden sm:block" />
              <span className="text-mint-400">for Modern Living</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Protecting your space with eco-friendly pest management solutions. 
              Experience the future of pest control today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/register')}
                className="btn-primary group w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/consultation')}
                className="btn-secondary group w-full sm:w-auto"
              >
                Free Consultation
                <Calendar className="ml-2 w-5 h-5 inline" />
              </button>
              <button 
                onClick={() => navigate('/services')}
                className="btn-secondary group w-full sm:w-auto"
              >
                Our Services
                <Shield className="ml-2 w-5 h-5 inline" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:max-w-md w-full">
            {[
              { number: "17+", label: "Years Experience" },
              { number: "15K+", label: "Satisfied Clients" },
              { number: "24/7", label: "Emergency Service" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
              >
                <p className="text-2xl sm:text-3xl font-bold text-mint-400">{stat.number}</p>
                <p className="text-xs sm:text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" className="w-full h-auto">
          <path 
            fill="rgb(247, 247, 255)" 
            fillOpacity="1" 
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,112C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};