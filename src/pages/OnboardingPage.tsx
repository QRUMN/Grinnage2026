import React from 'react';
import { OnboardingForm } from '../components/onboarding/OnboardingForm';
import { Container } from '../components/common/Container';
import { BackButton } from '../components/common/BackButton';

export const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-900 py-12">
      <Container>
        <BackButton className="mb-8" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Get Started with Pest Control</h1>
            <p className="mt-2 text-lg text-dark-600 dark:text-dark-300">
              Complete this form to schedule your free inspection and create your account
            </p>
          </div>
          <OnboardingForm />
        </div>
      </Container>
    </div>
  );
};