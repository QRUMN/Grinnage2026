import React from 'react';
import { CheckCircle, Calendar, X, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails?: {
    date: string;
    time: string;
    service?: string;
  };
}

export const ThankYouModal = ({ isOpen, onClose, appointmentDetails }: ThankYouModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const formattedDate = appointmentDetails?.date 
    ? new Date(appointmentDetails.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Soon';

  const formattedTime = appointmentDetails?.time 
    ? new Date(`2000-01-01T${appointmentDetails.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-content-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface-50/5 backdrop-blur-sm border border-surface-50/10 rounded-xl shadow-xl w-full max-w-md p-8 transform transition-all">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-surface-300 hover:text-surface-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 dark:bg-primary-900/30 mb-6">
            <CheckCircle className="w-8 h-8 text-primary-400" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-surface-50 mb-2">
            Thank You!
          </h2>

          {/* Appointment Details */}
          <div className="bg-surface-50/10 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-surface-50 mb-2">
              Your Consultation Details
            </h3>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center text-surface-200">
                <Calendar className="w-5 h-5 mr-2 text-primary-400" />
                <span>{formattedDate}</span>
              </div>
              
              {formattedTime && (
                <div className="flex items-center text-surface-200">
                  <Clock className="w-5 h-5 mr-2 text-primary-400" />
                  <span>{formattedTime}</span>
                </div>
              )}
              
              {appointmentDetails?.service && (
                <div className="flex items-center text-surface-200">
                  <MapPin className="w-5 h-5 mr-2 text-primary-400" />
                  <span>{appointmentDetails.service}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-surface-200 mb-6">
            One of our pest control experts will contact you shortly to confirm your appointment details.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/register')}
              className="w-full flex items-center justify-center px-6 py-3.5 bg-primary-500 text-surface-50 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Create an Account
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center px-6 py-3.5 text-surface-300 bg-surface-50/5 border border-surface-50/10 rounded-lg hover:bg-surface-50/10 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};