import React, { useState } from 'react';
import { X, Loader, CheckCircle } from 'lucide-react';
import { FormInput } from '../common/form/FormInput';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  email: string;
}

export const VerificationModal = ({ isOpen, onClose, onVerify, email }: VerificationModalProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onVerify(code);
      setIsSuccess(true);
    } catch (error) {
      setError('Invalid verification code');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#56e39f] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Verification Successful
              </h3>
              <p className="text-gray-300 mb-6">
                Your admin account has been created. Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-4">
                Verify Your Email
              </h3>
              
              <p className="text-gray-300 mb-6">
                Please enter the verification code sent to {email}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  label="Verification Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  maxLength={6}
                  disabled={isSubmitting}
                />

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#56e39f] text-white rounded-lg hover:bg-[#48c98a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};