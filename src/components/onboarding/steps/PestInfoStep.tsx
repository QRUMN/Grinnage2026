import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { OnboardingFormData } from '../../../types';
import { FileText, Calendar, MessageSquare } from 'lucide-react';

interface PestInfoStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
}

export const PestInfoStep: React.FC<PestInfoStepProps> = ({ register, errors }) => {
  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Tell Us About Your Pest Problem
        </h3>
        <p className="text-gray-400 mb-6">
          Help us prepare for your service with additional details
        </p>

        {/* Pest Problem Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe Your Pest Problem
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <textarea
              {...register('pestProblem')}
              rows={4}
              placeholder="Please describe the pest issues you're experiencing, how long it's been happening, and any other relevant details..."
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300 resize-none"
            />
          </div>
          {errors.pestProblem && (
            <p className="mt-2 text-sm text-error-400">{errors.pestProblem.message}</p>
          )}
        </div>

        {/* Preferred Inspection Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Preferred Inspection Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="date"
              {...register('preferredDate')}
              min={minDate}
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300"
            />
          </div>
          {errors.preferredDate && (
            <p className="mt-2 text-sm text-error-400">{errors.preferredDate.message}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            We'll contact you to confirm your preferred time
          </p>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional Notes or Concerns (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <textarea
              {...register('additionalNotes')}
              rows={3}
              placeholder="Any allergies, pets, access instructions, or special concerns we should know about..."
              className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                       rounded-xl text-white placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                       transition-all duration-300 resize-none"
            />
          </div>
        </div>

        {/* Summary Box */}
        <div className="mt-8 p-6 bg-neon-green/10 border border-neon-green/30 rounded-xl">
          <h4 className="text-sm font-semibold text-neon-green mb-3">
            What happens next?
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-neon-green mt-0.5">✓</span>
              <span>You'll receive an email confirmation immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-green mt-0.5">✓</span>
              <span>We'll call within 1 hour to confirm your inspection time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-green mt-0.5">✓</span>
              <span>Our expert will arrive on schedule with a free inspection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neon-green mt-0.5">✓</span>
              <span>You'll get instant access to your client dashboard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
