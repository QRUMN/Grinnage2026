import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../common/form/FormInput';
import { FormSelect } from '../common/form/FormSelect';
import { FormTextarea } from '../common/form/FormTextarea';
import { PEST_CATEGORIES, PEST_TYPES } from '../../types/pest';

const consultationSchema = z.object({
  pestCategory: z.string().min(1, 'Please select a pest category'),
  pestType: z.string().min(1, 'Please select a specific pest type'),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Valid street address required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'Please use 2-letter state code'),
  zipCode: z.string().min(5, 'Valid ZIP code required'),
  propertyType: z.enum(['residential', 'commercial']),
  propertySize: z.string().min(1, 'Property size is required'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  notes: z.string().optional()
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

export const ConsultationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema)
  });

  const selectedCategory = watch('pestCategory') as keyof typeof PEST_TYPES;

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      // Handle consultation form submission
      console.log('Consultation data:', data);
    } catch (error) {
      console.error('Consultation scheduling failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Pest Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pest Category
          </label>
          <select
            {...register('pestCategory')}
            className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white shadow-sm focus:border-mint-500 focus:ring-mint-500"
          >
            <option value="">Select pest category...</option>
            {Object.entries(PEST_CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          {errors.pestCategory && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pestCategory.message}</p>
          )}
        </div>

        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pest Type
            </label>
            <select
              {...register('pestType')}
              className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white shadow-sm focus:border-mint-500 focus:ring-mint-500"
            >
              <option value="">Select specific pest...</option>
              {PEST_TYPES[selectedCategory].map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
            {errors.pestType && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pestType.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Full Name"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <FormInput
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <FormInput
        label="Phone Number"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <FormInput
        label="Street Address"
        {...register('address')}
        error={errors.address?.message}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <FormInput
            label="City"
            {...register('city')}
            error={errors.city?.message}
          />
        </div>
        <div>
          <FormInput
            label="State"
            maxLength={2}
            {...register('state')}
            error={errors.state?.message}
          />
        </div>
        <div>
          <FormInput
            label="ZIP Code"
            {...register('zipCode')}
            error={errors.zipCode?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Property Type"
          {...register('propertyType')}
          error={errors.propertyType?.message}
        >
          <option value="">Select property type...</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </FormSelect>

        <FormSelect
          label="Property Size"
          {...register('propertySize')}
          error={errors.propertySize?.message}
        >
          <option value="">Select property size...</option>
          <option value="small">Small (less than 1000 sq ft)</option>
          <option value="medium">Medium (1000-2500 sq ft)</option>
          <option value="large">Large (more than 2500 sq ft)</option>
        </FormSelect>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Preferred Date"
          type="date"
          {...register('preferredDate')}
          error={errors.preferredDate?.message}
        />

        <FormSelect
          label="Preferred Time"
          {...register('preferredTime')}
          error={errors.preferredTime?.message}
        >
          <option value="">Select preferred time...</option>
          <option value="morning">Morning (8am - 12pm)</option>
          <option value="afternoon">Afternoon (12pm - 4pm)</option>
          <option value="evening">Evening (4pm - 7pm)</option>
        </FormSelect>
      </div>

      <FormTextarea
        label="Additional Notes"
        {...register('notes')}
        error={errors.notes?.message}
        placeholder="Any additional information you'd like us to know..."
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 text-white bg-mint-500 rounded-lg hover:bg-mint-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Scheduling...' : 'Schedule Free Consultation'}
      </button>
    </form>
  );
};