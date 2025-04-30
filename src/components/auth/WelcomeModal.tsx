import React, { useEffect } from 'react';
import { CheckCircle, Mail } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountType: 'residential' | 'commercial';
}

export const WelcomeModal = ({ isOpen, onClose, accountType }: WelcomeModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Add no-scroll class to body when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white dark:bg-dark-800 rounded-xl shadow-xl w-full max-w-md p-8 transform animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-mint-100 dark:bg-mint-900/30 mb-6">
            <CheckCircle className="w-8 h-8 text-mint-600 dark:text-mint-400" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Account Successfully Created!
          </h2>

          {/* Email Verification Message */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-mint-500" />
            <p className="text-gray-600 dark:text-gray-300">
              Please check your email to verify your account
            </p>
          </div>

          {/* Welcome Message */}
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {accountType === 'commercial' 
              ? "Welcome to your business account! We're excited to help protect your properties."
              : "Welcome to Grinnage Extermination! We're excited to help protect your home."}
          </p>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-white bg-mint-600 rounded-lg hover:bg-mint-700 transition-colors focus:outline-none focus:ring-2 focus:ring-mint-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800"
            aria-label="Continue to dashboard"
          >
            Continue to Dashboard
          </button>

          {/* Note about account status */}
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Some features may be limited until your email is verified
          </p>
        </div>
      </div>
    </div>
  );
};