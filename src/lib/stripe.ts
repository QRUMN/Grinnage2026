import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;

// Stripe configuration
export const stripeConfig = {
  currency: 'usd',
  locale: 'en-US',
  mode: 'payment' as const,
  success_url: `${window.location.origin}/payment/success`,
  cancel_url: `${window.location.origin}/payment/cancel`,
};

// Service pricing (admin-configurable)
export const defaultServices = [
  {
    id: 'pest-inspection',
    name: 'Property Inspection',
    description: 'Comprehensive pest inspection and assessment',
    price: 8999, // $89.99 in cents
    interval: 'one_time' as const,
  },
  {
    id: 'pest-treatment',
    name: 'Pest Treatment',
    description: 'Professional pest elimination service',
    price: 19999, // $199.99 in cents
    interval: 'one_time' as const,
  },
  {
    id: 'monthly-maintenance',
    name: 'Monthly Maintenance',
    description: 'Ongoing pest prevention and monitoring',
    price: 7999, // $79.99 in cents
    interval: 'month' as const,
  },
  {
    id: 'quarterly-maintenance',
    name: 'Quarterly Maintenance',
    description: 'Seasonal pest prevention service',
    price: 15999, // $159.99 in cents
    interval: 'month' as const,
    interval_count: 3,
  },
];

// Create Stripe checkout session
export const createCheckoutSession = async (serviceId: string, customerEmail?: string) => {
  const service = defaultServices.find(s => s.id === serviceId);
  if (!service) throw new Error('Service not found');

  // This would integrate with your backend to create a Stripe session
  // For now, return a mock response
  return {
    sessionId: 'mock_session_' + Date.now(),
    url: '#', // Would be actual Stripe checkout URL
    service,
  };
};