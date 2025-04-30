import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../lib/validation/auth';
import { FormInput } from '../common/form/FormInput';
import { useSetAtom } from 'jotai';
import { setUserAtom } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const LoginForm = () => {
  const setUser = useSetAtom(setUserAtom);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userType: 'residential'
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // First authenticate the user
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (signInError) throw signInError;

      if (authData.user) {
        // Fetch the user's role from the user_roles table
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authData.user.id)
          .single();

        if (roleError) throw roleError;

        // Verify that the user's actual role matches their selected role
        if (roleData.role !== data.userType) {
          throw new Error('Invalid account type selected');
        }

        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        setUser({
          id: authData.user.id,
          email: authData.user.email!,
          fullName: profileData.full_name,
          role: roleData.role
        });

        reset();
        
        // Redirect based on user role
        switch (roleData.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'commercial':
            navigate('/commercial');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.message === 'Invalid account type selected') {
        setError('userType', {
          message: 'Invalid account type selected for this user',
        });
      } else {
        setError('root', {
          message: 'Invalid email or password',
        });
      }
    }
  };

  const handleCreateAdmin = () => {
    navigate('/create-admin');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white mb-2">
          Account Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' }
          ].map(({ value, label }) => (
            <label
              key={value}
              className={`relative flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-[#56e39f] transition-colors ${
                errors.userType ? 'border-red-500' : 'border-gray-600'
              } ${
                watch('userType') === value 
                  ? 'bg-[#56e39f] border-[#56e39f] text-[#313131]' 
                  : 'bg-[#313131] hover:bg-gray-600 text-white'
              }`}
            >
              <input
                type="radio"
                value={value}
                {...register('userType')}
                className="sr-only"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
        {errors.userType && (
          <p className="text-sm text-red-400">{errors.userType.message}</p>
        )}
      </div>

      <FormInput
        label="Email address"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />

      <FormInput
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        showPasswordToggle
      />

      {errors.root && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-sm text-red-400">
              {errors.root.message}
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-sm font-medium text-gray-900 bg-[#56e39f] hover:bg-[#48c98a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56e39f] focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>

      <div className="text-center text-sm text-gray-300">
        <p>Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-[#56e39f] hover:text-[#48c98a] font-medium"
          >
            Create an account
          </button>
        </p>
        <div className="mt-4 flex flex-col space-y-2">
          <button
            type="button"
            onClick={handleAdminLogin}
            className="text-[#56e39f] hover:text-[#48c98a] font-medium"
          >
            Admin Login
          </button>
          <button
            type="button"
            onClick={handleCreateAdmin}
            className="text-[#56e39f] hover:text-[#48c98a] font-medium"
          >
            Create Admin Account
          </button>
        </div>
      </div>
    </form>
  );
};