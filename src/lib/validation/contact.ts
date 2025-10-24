import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),

  phone: z.string()
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),

  subject: z.enum([
    'inspection',
    'treatment',
    'emergency',
    'maintenance',
    'commercial',
    'other'
  ], {
    errorMap: () => ({ message: 'Please select a service type' })
  }),

  propertyType: z.enum(['residential', 'commercial'], {
    errorMap: () => ({ message: 'Please select property type' })
  }),

  urgency: z.enum(['low', 'medium', 'high', 'emergency'], {
    errorMap: () => ({ message: 'Please select urgency level' })
  }),

  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .or(z.literal('')),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),

  preferredContact: z.enum(['email', 'phone', 'either'], {
    errorMap: () => ({ message: 'Please select preferred contact method' })
  }),

  preferredTime: z.string().optional(),

  budget: z.enum(['under-100', '100-300', '300-500', '500-plus', 'not-sure'], {
    errorMap: () => ({ message: 'Please select budget range' })
  }).optional(),

  // Marketing fields
  source: z.string().optional(), // How they found us
  consent: z.boolean().refine(val => val === true, {
    message: 'You must agree to be contacted'
  })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Quick quote form (simplified)
export const quickQuoteSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Valid phone required'),
  serviceType: z.enum(['inspection', 'treatment', 'maintenance']),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code required'),
  urgency: z.enum(['low', 'medium', 'high', 'emergency'])
});

export type QuickQuoteData = z.infer<typeof quickQuoteSchema>;

// Service options for forms
export const serviceOptions = [
  { value: 'inspection', label: 'Property Inspection', description: 'Comprehensive pest assessment' },
  { value: 'treatment', label: 'Pest Treatment', description: 'Active pest elimination' },
  { value: 'emergency', label: 'Emergency Service', description: '24/7 urgent response' },
  { value: 'maintenance', label: 'Ongoing Maintenance', description: 'Preventive pest control' },
  { value: 'commercial', label: 'Commercial Service', description: 'Business pest management' },
  { value: 'other', label: 'Other', description: 'Custom requirements' }
];

export const urgencyOptions = [
  { value: 'low', label: 'Low', description: 'Within 1-2 weeks', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', description: 'Within a few days', color: 'text-yellow-600' },
  { value: 'high', label: 'High', description: 'Within 24 hours', color: 'text-orange-600' },
  { value: 'emergency', label: 'Emergency', description: 'ASAP - same day', color: 'text-red-600' }
];

export const budgetOptions = [
  { value: 'under-100', label: 'Under $100' },
  { value: '100-300', label: '$100 - $300' },
  { value: '300-500', label: '$300 - $500' },
  { value: '500-plus', label: '$500+' },
  { value: 'not-sure', label: 'Not sure yet' }
];