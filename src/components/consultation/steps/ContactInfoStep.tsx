import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormInput } from '../../common/form/FormInput';

interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  [key: string]: unknown;
}

interface ContactInfoStepProps {
  form: UseFormReturn<ConsultationFormData>;
}

export const ContactInfoStep = ({ form }: ContactInfoStepProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <FormInput
        label="Full Name"
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      <FormInput
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormInput
        label="Phone Number"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />
    </div>
  );
};