import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '../../lib/validation/auth';
import { FormInput } from '../common/form/FormInput';
import { authApi } from '../../lib/api/auth';
import { Mail, Loader, AlertCircle, CheckCircle } from 'lucide-react';

export const ResetPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await authApi.resetPassword(data.email);
      setIsSubmitted(true);
    } catch (error) {
      setError('root', {
        message: 'Failed to send reset instructions. Please try again.',
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-mint-100 text-mint-600 mb-4">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Check your email
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          We've sent password reset instructions to your email address.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-mint-100 text-mint-600 mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Reset your password
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <FormInput
        label="Email address"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />

      {errors.root && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.root.message}
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-mint-500 hover:bg-mint-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Send reset instructions'
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-sm text-mint-600 hover:text-mint-500"
        >
          Back to sign in
        </button>
      </div>
    </form>
  );
};