import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import type { OnboardingFormData } from '../../../types';
import { Phone, MapPin, Map, Home } from 'lucide-react';

interface PropertyDetailsStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
}

export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({ register, errors }) => {
  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Property Information
        </h3>
        <p className="text-gray-400 mb-6">
          Tell us about your property so we can serve you better
        </p>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="tel"
              {...register('phone', {
                onChange: (e) => {
                  e.target.value = formatPhoneNumber(e.target.value);
                },
              })}
              placeholder="(302) 562-5654"
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300"
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-sm text-error-400">{errors.phone.message}</p>
          )}
        </div>

        {/* Street Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Street Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              {...register('address')}
              placeholder="123 Main Street"
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300"
            />
          </div>
          {errors.address && (
            <p className="mt-2 text-sm text-error-400">{errors.address.message}</p>
          )}
        </div>

        {/* City & State */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              City
            </label>
            <div className="relative">
              <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                {...register('city')}
                placeholder="Wilmington"
                className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                         rounded-xl text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                         transition-all duration-300"
              />
            </div>
            {errors.city && (
              <p className="mt-2 text-sm text-error-400">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              State
            </label>
            <input
              type="text"
              {...register('state')}
              placeholder="DE"
              maxLength={2}
              className="w-full px-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500 uppercase
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300"
            />
            {errors.state && (
              <p className="mt-2 text-sm text-error-400">{errors.state.message}</p>
            )}
          </div>
        </div>

        {/* Property Size */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Property Size
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'small', label: 'Small', desc: '< 1,000 sq ft' },
              { value: 'medium', label: 'Medium', desc: '1K - 2.5K sq ft' },
              { value: 'large', label: 'Large', desc: '> 2,500 sq ft' }
            ].map((size) => (
              <label key={size.value} className="relative">
                <input
                  type="radio"
                  value={size.value}
                  {...register('propertySize')}
                  className="peer sr-only"
                />
                <div className="p-4 rounded-xl backdrop-blur-sm border-2 border-dark-border
                              peer-checked:border-neon-green peer-checked:bg-neon-green/10 peer-checked:shadow-glow
                              hover:border-neon-green/30 cursor-pointer transition-all duration-300 text-center">
                  <div className="font-semibold text-white mb-1">{size.label}</div>
                  <div className="text-xs text-gray-400">{size.desc}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.propertySize && (
            <p className="mt-2 text-sm text-error-400">{errors.propertySize.message}</p>
          )}
        </div>

        {/* Problem Area */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Where is the pest problem?
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <textarea
              {...register('problemArea')}
              placeholder="e.g., kitchen, basement, yard, multiple areas"
              rows={3}
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300 resize-none"
            />
          </div>
          {errors.problemArea && (
            <p className="mt-2 text-sm text-error-400">{errors.problemArea.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
