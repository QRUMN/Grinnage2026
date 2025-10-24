import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Send, Phone, Mail, MapPin, Clock, Star, Shield,
  CheckCircle, AlertCircle, Calendar
} from 'lucide-react';
import {
  contactFormSchema,
  type ContactFormData,
  serviceOptions,
  urgencyOptions,
  budgetOptions
} from '../../lib/validation/contact';
import { cn } from '../../lib/utils';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
  compact?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className,
  compact = false
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      propertyType: 'residential',
      urgency: 'medium',
      preferredContact: 'either',
      subject: 'inspection',
      consent: false
    }
  });

  const selectedUrgency = watch('urgency');
  const selectedSubject = watch('subject');

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default submission - would integrate with Supabase
        console.log('Contact form submission:', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={cn('card text-center', className)}>
        <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Thank you for contacting us. We'll respond within 24 hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="btn-outline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('space-y-6', className)}
    >
      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            Full Name *
          </label>
          <input
            type="text"
            {...register('name')}
            className={cn('input', errors.name && 'border-red-500 focus:ring-red-500')}
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            Email Address *
          </label>
          <input
            type="email"
            {...register('email')}
            className={cn('input', errors.email && 'border-red-500 focus:ring-red-500')}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            Phone Number
          </label>
          <input
            type="tel"
            {...register('phone')}
            className={cn('input', errors.phone && 'border-red-500 focus:ring-red-500')}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            Property Address
          </label>
          <input
            type="text"
            {...register('address')}
            className={cn('input', errors.address && 'border-red-500 focus:ring-red-500')}
            placeholder="123 Main St, City, State"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* Service Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            Service Needed *
          </label>
          <select
            {...register('subject')}
            className={cn('input', errors.subject && 'border-red-500 focus:ring-red-500')}
          >
            {serviceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
          {selectedSubject && (
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
              {serviceOptions.find(opt => opt.value === selectedSubject)?.description}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            Property Type *
          </label>
          <select
            {...register('propertyType')}
            className={cn('input', errors.propertyType && 'border-red-500 focus:ring-red-500')}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
          {errors.propertyType && (
            <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            Urgency Level *
          </label>
          <select
            {...register('urgency')}
            className={cn('input', errors.urgency && 'border-red-500 focus:ring-red-500')}
          >
            {urgencyOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
          {errors.urgency && (
            <p className="text-red-500 text-sm mt-1">{errors.urgency.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            Budget Range
          </label>
          <select
            {...register('budget')}
            className="input"
          >
            <option value="">Select budget (optional)</option>
            {budgetOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact Preferences */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            Preferred Contact Method *
          </label>
          <select
            {...register('preferredContact')}
            className="input"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="either">Either is fine</option>
          </select>
        </div>

        <div>
          <label className="label">
            Best Time to Call
          </label>
          <input
            type="text"
            {...register('preferredTime')}
            className="input"
            placeholder="e.g., Weekdays 9-5, Evenings"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="label">
          Describe Your Pest Problem *
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className={cn('input resize-none', errors.message && 'border-red-500 focus:ring-red-500')}
          placeholder="Please describe what type of pests you're seeing, where you've noticed them, and any other relevant details..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Consent */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          {...register('consent')}
          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
        />
        <label className="text-sm text-neutral-600 dark:text-neutral-400">
          I agree to be contacted by Grinnage Pest Control regarding my inquiry.
          Message and data rates may apply. You can opt out at any time. *
        </label>
      </div>
      {errors.consent && (
        <p className="text-red-500 text-sm">{errors.consent.message}</p>
      )}

      {/* Error State */}
      {submitStatus === 'error' && (
        <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
          <p className="text-red-700 dark:text-red-400">
            There was an error sending your message. Please try again or call us directly.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-1 text-primary-500" />
          Secure & Private
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-primary-500" />
          24hr Response
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-1 text-primary-500" />
          5-Star Service
        </div>
      </div>
    </form>
  );
};