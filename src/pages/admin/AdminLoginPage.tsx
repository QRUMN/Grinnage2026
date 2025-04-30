import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../../components/common/form/FormInput';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema)
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    try {
      setError(null);

      // First authenticate the user
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (signInError) throw signInError;

      if (authData.user) {
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authData.user.id)
          .single();

        if (roleError) throw roleError;

        if (roleData?.role !== 'admin') {
          throw new Error('Access denied. Admin privileges required.');
        }

        // Log successful admin login
        await supabase.from('admin_audit_logs').insert([{
          action: 'admin_login',
          entity_type: 'user',
          entity_id: authData.user.id,
          performed_by: authData.user.id,
          ip_address: window.location.hostname,
          user_agent: navigator.userAgent
        }]);

        navigate('/admin');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="w-12 h-12 text-[#56e39f]" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Secure access for administrative users
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              label="Email Address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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

            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#56e39f] hover:bg-[#48c98a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56e39f] focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/create-admin')}
                className="text-sm text-[#56e39f] hover:text-[#48c98a]"
              >
                Create Admin Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};