import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormInput } from '../../common/form/FormInput';
import { FormSelect } from '../../common/form/FormSelect';

interface PropertyFormData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  propertySize: string;
  [key: string]: unknown;
}

interface PropertyDetailsStepProps {
  form: UseFormReturn<PropertyFormData>;
}

export const PropertyDetailsStep = ({ form }: PropertyDetailsStepProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <FormInput
        label="Street Address"
        {...register('address')}
        error={errors.address?.message}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <FormInput
            label="City"
            {...register('city')}
            error={errors.city?.message}
          />
        </div>
        <div>
          <FormInput
            label="State"
            maxLength={2}
            {...register('state')}
            error={errors.state?.message}
          />
        </div>
        <div>
          <FormInput
            label="ZIP Code"
            {...register('zipCode')}
            error={errors.zipCode?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Property Type"
          {...register('propertyType')}
          error={errors.propertyType?.message}
        >
          <option value="">Select property type...</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </FormSelect>

        <FormSelect
          label="Property Size"
          {...register('propertySize')}
          error={errors.propertySize?.message}
        >
          <option value="">Select property size...</option>
          <option value="small">Small (less than 1000 sq ft)</option>
          <option value="medium">Medium (1000-2500 sq ft)</option>
          <option value="large">Large (more than 2500 sq ft)</option>
        </FormSelect>
      </div>
    </div>
  );
};