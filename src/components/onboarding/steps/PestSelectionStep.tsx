import React, { useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PEST_CATEGORIES, PEST_TYPES } from '../../../types/pest';
import type { OnboardingFormData } from '../../../types';
import { Bug, Shield, Target, HelpCircle } from 'lucide-react';

interface PestSelectionStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  selectedService?: any;
}

export const PestSelectionStep: React.FC<PestSelectionStepProps> = ({ register, errors, selectedService }) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof PEST_TYPES>('insects');

  const categoryIcons = {
    insects: <Bug className="w-6 h-6" />,
    rodents: <Target className="w-6 h-6" />,
    wildlife: <Shield className="w-6 h-6" />,
    other: <HelpCircle className="w-6 h-6" />
  };

  return (
    <div className="space-y-8">
      {selectedService && (
        <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
          <p className="text-sm text-neon-green">
            Pre-selected service: <span className="font-bold">{selectedService.title}</span>
          </p>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          What type of pest issue are you experiencing?
        </h3>
        <p className="text-gray-400 mb-6">
          Select the category that best matches your pest problem
        </p>
        
        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(PEST_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategory(key as keyof typeof PEST_TYPES)}
              className={`p-4 rounded-xl backdrop-blur-sm border-2 text-center transition-all duration-300
                        ${selectedCategory === key
                          ? 'border-neon-green bg-neon-green/20 text-neon-green shadow-glow' 
                          : 'border-dark-border bg-dark-surface/40 text-gray-400 hover:border-neon-green/30 hover:text-gray-300'}`}
            >
              <div className="flex flex-col items-center gap-2">
                {categoryIcons[key as keyof typeof categoryIcons]}
                <span className="font-semibold">{label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Pest Type Selection */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Select specific pest type
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PEST_TYPES[selectedCategory].map(({ id, label }) => (
              <label
                key={id}
                className="relative flex items-center p-4 rounded-xl backdrop-blur-sm border border-dark-border
                         cursor-pointer hover:border-neon-green/30 hover:bg-dark-surface/60
                         transition-all duration-300 group"
              >
                <input
                  type="radio"
                  value={id}
                  {...register('pestType')}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-full border-2 border-gray-500 mr-3 
                              peer-checked:border-neon-green peer-checked:bg-neon-green
                              peer-checked:shadow-glow transition-all
                              flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-dark-bg opacity-0 peer-checked:opacity-100" />
                </div>
                <span className="text-gray-300 peer-checked:text-white group-hover:text-white transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
          {errors.pestType && (
            <p className="mt-3 text-sm text-error-400 flex items-center gap-2">
              <span className="w-1 h-1 bg-error-400 rounded-full" />
              {errors.pestType.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
