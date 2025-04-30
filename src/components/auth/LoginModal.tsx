import React from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-dark-800 rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-dark-900 dark:text-white">Sign In</h2>
            <button 
              onClick={onClose}
              className="text-dark-500 hover:text-dark-700 dark:text-dark-400 dark:hover:text-dark-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};