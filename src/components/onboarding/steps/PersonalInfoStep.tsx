import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import type { OnboardingFormData } from '../../../types';
import { User, Mail, Lock, Building, Home } from 'lucide-react';

interface PersonalInfoStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ register, errors, watch }) => {
  const clientType = watch('clientType');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Account Information
        </h3>
        <p className="text-gray-400 mb-6">
          Create your account to access our services
        </p>

        {/* Client Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative">
              <input
                type="radio"
                value="residential"
                {...register('clientType')}
                className="peer sr-only"
              />
              <div className="p-6 rounded-xl backdrop-blur-sm border-2 border-dark-border
                            peer-checked:border-neon-green peer-checked:bg-neon-green/10 peer-checked:shadow-glow
                            hover:border-neon-green/30 cursor-pointer transition-all duration-300">
                <Home className="w-8 h-8 text-gray-400 peer-checked:text-neon-green mx-auto mb-2" />
                <div className="text-center">
                  <div className="font-semibold text-white mb-1">Residential</div>
                  <div className="text-xs text-gray-400">Home & apartment</div>
                </div>
              </div>
            </label>

            <label className="relative">
              <input
                type="radio"
                value="commercial"
                {...register('clientType')}
                className="peer sr-only"
              />
              <div className="p-6 rounded-xl backdrop-blur-sm border-2 border-dark-border
                            peer-checked:border-neon-green peer-checked:bg-neon-green/10 peer-checked:shadow-glow
                            hover:border-neon-green/30 cursor-pointer transition-all duration-300">
                <Building className="w-8 h-8 text-gray-400 peer-checked:text-neon-green mx-auto mb-2" />
                <div className="text-center">
                  <div className="font-semibold text-white mb-1">Commercial</div>
                  <div className="text-xs text-gray-400">Business property</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {clientType === 'commercial' ? 'Business Name' : 'Full Name'}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              {...register('fullName')}
              placeholder={clientType === 'commercial' ? 'Your Business Name' : 'John Doe'}
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300"
            />
          </div>
          {errors.fullName && (
            <p className="mt-2 text-sm text-error-400">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-error-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Create Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              {...register('password')}
              placeholder="Minimum 8 characters"
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300"
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-error-400">{errors.password.message}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Must contain uppercase, lowercase, number, and special character
          </p>
        </div>

        <div className="mt-6 p-4 bg-dark-surface/40 border border-dark-border rounded-xl">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            We'll create your account and send you confirmation via email.
          </p>
        </div>
      </div>
    </div>
  );
};
