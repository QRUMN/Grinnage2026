import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../common/form/FormInput';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const registerSchema = z.object({
  accountType: z.enum(['residential', 'commercial']),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Valid street address required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'Please use 2-letter state code'),
  zipCode: z.string().min(5, 'Valid ZIP code required'),
  newsletter: z.boolean().optional(),
  howHeard: z.enum(['search', 'social', 'referral', 'other'])
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'residential',
      newsletter: false,
      howHeard: 'search'
    }
  });

  const accountType = watch('accountType');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            account_type: data.accountType,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            newsletter: data.newsletter,
            howHeard: data.howHeard
          }
        }
      });

      if (error) throw error;
      
      // Navigate to the appropriate dashboard
      navigate(accountType === 'commercial' ? '/commercial' : '/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Account Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' }
          ].map(({ value, label }) => (
            <label
              key={value}
              className={`relative flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-mint-500 transition-colors ${
                errors.accountType ? 'border-red-300' : 'border-gray-300 dark:border-dark-600'
              } ${
                watch('accountType') === value 
                  ? 'bg-mint-500 border-mint-500 text-white' 
                  : 'bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 text-gray-900 dark:text-white'
              }`}
            >
              <input
                type="radio"
                value={value}
                {...register('accountType')}
                className="sr-only"
              />
              <span className="text-sm font-medium">{label}</span>
            </label>
          ))}
        </div>
      </div>

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

      <FormInput
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

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

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('newsletter')}
            className="h-4 w-4 text-mint-500 border-gray-300 rounded focus:ring-mint-500"
          />
          <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Subscribe to our newsletter for pest control tips and updates
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            How did you hear about us?
          </label>
          <select
            {...register('howHeard')}
            className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white shadow-sm focus:border-mint-500 focus:ring-mint-500"
          >
            <option value="search">Search Engine</option>
            <option value="social">Social Media</option>
            <option value="referral">Referral</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 text-white bg-mint-500 rounded-lg hover:bg-mint-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </button>

      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-mint-500 hover:text-mint-600 font-medium">
            Sign in
          </a>
        </p>
        <a 
          href="/consultation" 
          className="text-mint-500 hover:text-mint-600 font-medium"
        >
          Schedule a Consultation
        </a>
      </div>
    </form>
  );
};