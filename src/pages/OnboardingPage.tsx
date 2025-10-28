import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OnboardingForm } from '../components/onboarding/OnboardingForm';
import { ArrowLeft, Shield } from 'lucide-react';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedService = location.state?.selectedService;

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Glass Navbar */}
      <header className="sticky top-0 glass-dark border-b border-neon-green/20 z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
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
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green/30 
                          rounded-full backdrop-blur-sm shadow-glow mb-6">
              <Shield className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-semibold text-neon-green">New Client Registration</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Get Started with 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-accent-500">
                Professional Pest Control
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete this quick form to schedule your free inspection and create your account
            </p>

            {selectedService && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-accent-500/20 border border-accent-500/30 
                            rounded-full backdrop-blur-sm">
                <span className="text-sm text-accent-400">
                  Selected: <span className="font-semibold">{selectedService.title}</span>
                </span>
              </div>
            )}
          </div>

          {/* Onboarding Form */}
          <OnboardingForm selectedService={selectedService} />
        </div>
      </main>
    </div>
  );
};
