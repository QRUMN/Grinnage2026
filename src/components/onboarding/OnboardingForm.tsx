import React from 'react';
import { useOnboardingForm } from '../../hooks/useOnboardingForm';
import { Check, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { PestSelectionStep } from './steps/PestSelectionStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { PropertyDetailsStep } from './steps/PropertyDetailsStep';
import { PestInfoStep } from './steps/PestInfoStep';

interface OnboardingFormProps {
  selectedService?: any;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ selectedService }) => {
  const { 
    step, 
    form: { register, handleSubmit, formState: { errors, isSubmitting }, watch },
    onSubmit,
    nextStep,
    prevStep 
  } = useOnboardingForm();

  const steps = [
    { number: 1, title: 'Service', description: 'What do you need?' },
    { number: 2, title: 'Contact', description: 'Your information' },
    { number: 3, title: 'Property', description: 'Location details' },
    { number: 4, title: 'Details', description: 'Pest problem' }
  ];

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <PestSelectionStep register={register} errors={errors} selectedService={selectedService} />;
      case 2:
        return <PersonalInfoStep register={register} errors={errors} watch={watch} />;
      case 3:
        return <PropertyDetailsStep register={register} errors={errors} />;
      case 4:
        return <PestInfoStep register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/40 to-dark-bg/60
                  border border-neon-green/20 rounded-3xl shadow-glow-lg relative overflow-hidden">
      {/* Animated Border Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-green via-accent-500 to-neon-green 
                    opacity-20 blur-xl animate-spin pointer-events-none" style={{ animationDuration: '8s' }} />

      <div className="relative z-10 p-8 md:p-12">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center flex-1">
                  {/* Step Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                transition-all duration-300 relative
                                ${step >= s.number 
                                  ? 'bg-neon-green text-dark-bg shadow-glow' 
                                  : 'bg-dark-surface/60 text-gray-500 border border-dark-border'}`}>
                    {step > s.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      s.number
                    )}
                  </div>
                  {/* Step Label */}
                  <div className="mt-2 text-center hidden sm:block">
                    <div className={`text-sm font-semibold ${step >= s.number ? 'text-white' : 'text-gray-500'}`}>
                      {s.title}
                    </div>
                    <div className="text-xs text-gray-500">{s.description}</div>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-all duration-300 -mt-6
                                ${step > s.number ? 'bg-neon-green shadow-glow' : 'bg-dark-border'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="min-h-[400px]">
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-dark-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 backdrop-blur-sm border border-dark-border text-gray-300 rounded-xl
                         hover:border-neon-green/30 hover:text-neon-green transition-all duration-300
                         flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-neon-green text-dark-bg rounded-xl font-semibold
                         shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300
                         flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-neon-green text-dark-bg rounded-xl font-bold
                         shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
