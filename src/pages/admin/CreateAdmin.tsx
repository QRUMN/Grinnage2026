import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../../components/common/form/FormInput';
import { Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const createAdminSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CreateAdminFormData = z.infer<typeof createAdminSchema>;

export const CreateAdmin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<CreateAdminFormData>({
    resolver: zodResolver(createAdminSchema)
  });

  const onSubmit = async (data: CreateAdminFormData) => {
    try {
      // Check if admin already exists
      const { data: existingAdmins, error: queryError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin')
        .limit(1);

      if (queryError) throw queryError;

      if (existingAdmins && existingAdmins.length > 0) {
        throw new Error('An admin account already exists');
      }

      // Create admin user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Failed to create admin account');

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          account_type: 'personal'
        }]);

      if (profileError) {
        // Cleanup: Delete the auth user if profile creation fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }

      // Create admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: authData.user.id,
          role: 'admin'
        }]);

      if (roleError) {
        // Cleanup: Delete the auth user and profile if role creation fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw roleError;
      }

      // Sign in the newly created admin before creating user status
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (signInError) throw signInError;

      // Create user status after signing in
      const { error: statusError } = await supabase
        .from('user_status')
        .insert([{
          user_id: authData.user.id,
          status: 'active'
        }]);

      if (statusError) {
        console.error('Failed to create user status:', statusError);
        // Continue despite status error since the admin account is created
      }

      // Log successful creation
      await supabase.from('admin_audit_logs').insert([{
        action: 'admin_creation',
        entity_type: 'user',
        entity_id: authData.user.id,
        changes: { email: data.email, success: true },
        performed_by: authData.user.id,
        ip_address: window.location.hostname,
        user_agent: navigator.userAgent
      }]);

      // Navigate to admin dashboard
      navigate('/admin');
    } catch (error: any) {
      console.error('Admin creation failed:', error);
      setError('root', { 
        message: error.message || 'Failed to create admin account. Please try again.' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Lock className="w-12 h-12 text-[#56e39f]" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Create Admin Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Set up your administrative account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                {...register('firstName')}
                error={errors.firstName?.message}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <FormInput
                label="Last Name"
                {...register('lastName')}
                error={errors.lastName?.message}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <FormInput
              label="Email Address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />

            <FormInput
              label="Phone Number"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              placeholder="(302) 562-5654"
            />

            <div className="relative">
              <FormInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={errors.password?.message}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <FormInput
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {errors.root && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#56e39f] hover:bg-[#48c98a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56e39f] focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};