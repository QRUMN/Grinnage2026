import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { FormInput } from '../components/common/form/FormInput';
import { VerificationModal } from '../components/auth/VerificationModal';
import { Container } from '../components/common/Container';
import { BackButton } from '../components/common/BackButton';

const registerSchema = z.object({
  accountType: z.enum(['residential', 'commercial']),
  fullName: z.string().min(2, 'Full name is required'),
  businessName: z.string().optional(),
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

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = React.useState(false);
  const [accountType, setAccountType] = React.useState<'residential' | 'commercial'>('residential');
  
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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Prepare user metadata
      const metadata = {
        full_name: data.fullName,
        account_type: data.accountType,
        business_name: data.businessName || null,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state.toUpperCase(),
        zip_code: data.zipCode,
        newsletter: data.newsletter || false,
        how_heard: data.howHeard
      };

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
      setAccountType(data.accountType);
      setShowVerification(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-content-900 py-12">
      <Container>
        <BackButton className="mb-8 text-surface-50" />
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-surface-50">Create Your Account</h1>
            <p className="mt-2 text-lg text-surface-200">
              Join us to protect your space from unwanted pests
            </p>
          </div>

          <div className="bg-surface-50/5 backdrop-blur-sm border border-surface-50/10 rounded-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-surface-50">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'residential', label: 'Residential' },
                    { value: 'commercial', label: 'Commercial' }
                  ].map(({ value, label }) => (
                    <label
                      key={value}
                      className={`relative flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-primary-500 transition-colors ${
                        errors.accountType ? 'border-red-500' : 'border-surface-50/20'
                      } ${
                        watch('accountType') === value 
                          ? 'bg-primary-500 border-primary-500 text-surface-50' 
                          : 'bg-surface-50/5 hover:bg-surface-50/10 text-surface-50'
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
                className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
              />

              {watch('accountType') === 'commercial' && (
                <FormInput
                  label="Business Name"
                  {...register('businessName')}
                  error={errors.businessName?.message}
                  className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
                />
              )}

              <FormInput
                label="Email Address"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
              />

              <FormInput
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
              />

              <FormInput
                label="Phone Number"
                type="tel"
                {...register('phone')}
                error={errors.phone?.message}
                className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
              />

              <FormInput
                label="Street Address"
                {...register('address')}
                error={errors.address?.message}
                className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <FormInput
                    label="City"
                    {...register('city')}
                    error={errors.city?.message}
                    className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
                  />
                </div>
                <div>
                  <FormInput
                    label="State"
                    maxLength={2}
                    {...register('state')}
                    error={errors.state?.message}
                    className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
                  />
                </div>
                <div>
                  <FormInput
                    label="ZIP Code"
                    {...register('zipCode')}
                    error={errors.zipCode?.message}
                    className="bg-surface-50/5 border-surface-50/20 text-surface-50 placeholder-surface-400"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('newsletter')}
                    className="h-4 w-4 text-primary-500 border-surface-50/20 rounded focus:ring-primary-500 bg-surface-50/5"
                  />
                  <label className="ml-2 text-sm text-surface-200">
                    Subscribe to our newsletter for pest control tips and updates
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-50 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    {...register('howHeard')}
                    className="block w-full rounded-lg border-surface-50/20 bg-surface-50/5 text-surface-50 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
                className="w-full px-6 py-3 text-surface-50 bg-primary-500 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="text-center">
                <p className="text-sm text-surface-200">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <VerificationModal 
          isOpen={showVerification}
          onClose={() => setShowVerification(false)}
          accountType={accountType}
        />
      </Container>
    </div>
  );
};