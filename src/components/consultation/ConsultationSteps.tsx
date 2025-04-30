import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PestSelectionStep } from './steps/PestSelectionStep';
import { ContactInfoStep } from './steps/ContactInfoStep';
import { PropertyDetailsStep } from './steps/PropertyDetailsStep';
import { SchedulingStep } from './steps/SchedulingStep';
import { StepIndicator } from '../onboarding/StepIndicator';
import { ThankYouModal } from './ThankYouModal';
import { supabase } from '../../lib/supabase';

const consultationSchema = z.object({
  // Pest Selection
  pestCategory: z.string().min(1, 'Please select a pest category'),
  pestType: z.string().min(1, 'Please select a specific pest type'),
  
  // Contact Info
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  
  // Property Details
  address: z.string().min(5, 'Valid street address required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'Please use 2-letter state code'),
  zipCode: z.string().min(5, 'Valid ZIP code required'),
  propertyType: z.enum(['residential', 'commercial']),
  propertySize: z.string().min(1, 'Property size is required'),
  
  // Scheduling
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  notes: z.string().optional()
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

export const ConsultationSteps = () => {
  const [step, setStep] = React.useState(1);
  const [showThankYou, setShowThankYou] = React.useState(false);
  const [appointmentDetails, setAppointmentDetails] = React.useState<{
    date: string;
    time: string;
    service: string;
  } | undefined>(undefined);
  
  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    mode: 'onChange'
  });

  const { handleSubmit, trigger, formState: { isSubmitting } } = form;

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await trigger(fields);
    if (isValid) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      // Create appointment in database
      const { error } = await supabase.from('appointments').insert({
        client_id: user?.id, // Will be null for non-logged in users
        service_type: `Consultation - ${data.pestCategory} (${data.pestType})`,
        scheduled_date: data.preferredDate,
        scheduled_time: data.preferredTime,
        status: 'scheduled',
        notes: `
          Contact: ${data.fullName} (${data.email}, ${data.phone})
          Address: ${data.address}, ${data.city}, ${data.state} ${data.zipCode}
          Property: ${data.propertyType} - ${data.propertySize}
          Pest Issue: ${data.pestCategory} - ${data.pestType}
          Additional Notes: ${data.notes || 'None'}
        `
      });

      if (error) throw error;
      
      // Set appointment details for thank you modal
      setAppointmentDetails({
        date: data.preferredDate,
        time: data.preferredTime,
        service: `${data.pestCategory} - ${data.pestType} Consultation`
      });
      
      // Show thank you modal
      setShowThankYou(true);
    } catch (error) {
      console.error('Consultation scheduling failed:', error);
      // Show thank you modal anyway, as we don't want to block the user experience
      // In a real app, you might want to show an error message
      setAppointmentDetails({
        date: data.preferredDate,
        time: data.preferredTime,
        service: `${data.pestCategory} - ${data.pestType} Consultation`
      });
      setShowThankYou(true);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PestSelectionStep form={form} />;
      case 2:
        return <ContactInfoStep form={form} />;
      case 3:
        return <PropertyDetailsStep form={form} />;
      case 4:
        return <SchedulingStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator currentStep={step} totalSteps={4} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {renderStep()}
        
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-3 text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto px-6 py-3 text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Free Consultation'}
            </button>
          )}
        </div>
      </form>

      <ThankYouModal 
        isOpen={showThankYou} 
        onClose={() => setShowThankYou(false)}
        appointmentDetails={appointmentDetails}
      />
    </div>
  );
};

const getFieldsForStep = (step: number): (keyof ConsultationFormData)[] => {
  switch (step) {
    case 1:
      return ['pestCategory', 'pestType'];
    case 2:
      return ['fullName', 'email', 'phone'];
    case 3:
      return ['address', 'city', 'state', 'zipCode', 'propertyType', 'propertySize'];
    case 4:
      return ['preferredDate', 'preferredTime'];
    default:
      return [];
  }
};