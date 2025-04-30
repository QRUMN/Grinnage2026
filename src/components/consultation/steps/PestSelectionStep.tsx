import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PEST_CATEGORIES, PEST_TYPES } from '../../../types/pest';

interface PestSelectionStepProps {
  form: UseFormReturn<any>;
}

export const PestSelectionStep = ({ form }: PestSelectionStepProps) => {
  const { register, watch, formState: { errors } } = form;
  const selectedCategory = watch('pestCategory') as keyof typeof PEST_TYPES;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          What type of pest issue are you experiencing?
        </label>
        
        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(PEST_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => form.setValue('pestCategory', key)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                selectedCategory === key
                  ? 'border-[#56e39f] bg-[#56e39f] text-white'
                  : 'border-gray-300 hover:border-[#56e39f] bg-white text-black hover:bg-[#56e39f]/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select Specific Pest
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PEST_TYPES[selectedCategory].map(({ id, label }) => (
                <label
                  key={id}
                  className="relative flex items-center p-4 rounded-lg border cursor-pointer bg-white hover:bg-[#56e39f]/10 border-gray-300 hover:border-[#56e39f]"
                >
                  <input
                    type="radio"
                    value={id}
                    {...register('pestType')}
                    className="h-4 w-4 text-[#56e39f] border-gray-300 focus:ring-[#56e39f]"
                  />
                  <span className="ml-3 text-black">{label}</span>
                </label>
              ))}
            </div>
            {errors.pestType && (
              <p className="mt-2 text-sm text-red-400">{errors.pestType.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};