import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Lock, User, Eye, EyeOff, ArrowLeft, Shield,
  AlertCircle
} from 'lucide-react';
import { useAdminAuth } from '../lib/auth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@grinnage.com',
      password: 'admin123'
    }
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);

    const result = await login(data.email, data.password);

    if (!result.success) {
      setLoginError(result.error || 'Login failed');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green rounded-full mix-blend-screen filter blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-screen filter blur-3xl animate-float" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </button>
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/40 to-dark-bg/60
                      border border-neon-green/20 rounded-3xl p-8 shadow-glow-lg relative overflow-hidden">
          {/* Animated Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-green via-accent-500 to-neon-green 
                        opacity-20 blur-xl animate-spin" style={{ animationDuration: '8s' }} />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-neon-green/20 rounded-2xl flex items-center justify-center shadow-glow">
                  <Shield className="w-8 h-8 text-neon-green" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-neon-green blur-md opacity-30 animate-neon-pulse" />
              </div>
              
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Admin Portal
              </h1>
              <p className="text-gray-400">
                Sign in to access the dashboard
              </p>
            </div>

            {/* Demo Credentials Notice */}
            <div className="mb-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
              <p className="text-sm text-neon-green font-medium mb-1">Demo Credentials</p>
              <p className="text-xs text-gray-400">admin@grinnage.com / admin123</p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-4 bg-error-500/10 border border-error-500/30 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-error-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error-400">{loginError}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                             rounded-xl text-white placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                             transition-all duration-300"
                    placeholder="admin@grinnage.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error-400">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="w-full pl-10 pr-12 py-3 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                             rounded-xl text-white placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                             transition-all duration-300"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-neon-green transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-400">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-neon-green text-dark-bg rounded-xl font-bold text-lg
                         shadow-glow hover:shadow-glow-xl hover:scale-105 active:scale-95
                         transition-all duration-300 relative overflow-hidden disabled:opacity-50
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                         before:via-white/30 before:to-transparent before:translate-x-[-100%] 
                         hover:before:translate-x-[100%] before:transition-transform before:duration-700
                         flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Protected by enterprise-grade security
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
