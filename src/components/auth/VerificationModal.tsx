import React, { useState, useEffect } from 'react';
import { X, Loader, CheckCircle, RefreshCw } from 'lucide-react';
import { FormInput } from '../common/form/FormInput';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  email: string;
  onResendCode?: () => Promise<void>;
}

export const VerificationModal = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  email,
  onResendCode 
}: VerificationModalProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isOpen && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendCode = async () => {
    if (!onResendCode) return;
    try {
      setIsResending(true);
      await onResendCode();
      setTimeLeft(300); // Reset timer
      setError('');
    } catch (error) {
      setError('Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

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
                Your email has been verified. You can now access your account.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-4">
                Verify Your Email
              </h3>
              
              <p className="text-gray-300 mb-2">
                Please enter the verification code sent to:
              </p>
              <p className="text-[#56e39f] font-medium mb-6">
                {email}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  label="Verification Code"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setCode(value);
                  }}
                  placeholder="Enter 6-digit code"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-center text-lg tracking-wider"
                  maxLength={6}
                  disabled={isSubmitting}
                />

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <div className="text-center text-gray-400 text-sm">
                  Code expires in: <span className="text-white">{formatTime(timeLeft)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || code.length !== 6}
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

                {onResendCode && timeLeft <= 0 && (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="w-full py-2 px-4 text-[#56e39f] hover:text-[#48c98a] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend Code
                      </>
                    )}
                  </button>
                )}
              </form>

              <p className="mt-6 text-sm text-gray-400 text-center">
                Didn't receive the code? Check your spam folder or try resending the code.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};