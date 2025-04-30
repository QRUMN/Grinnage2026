import React from 'react';
import { Container } from '../components/common/Container';
import { BackButton } from '../components/common/BackButton';
import { ConsultationSteps } from '../components/consultation/ConsultationSteps';

export const ConsultationPage = () => {
  return (
    <div className="min-h-screen bg-content-900 py-12">
      <Container>
        <BackButton className="mb-8 text-surface-50" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-surface-50">Schedule a Free Consultation</h1>
            <p className="mt-2 text-lg text-surface-200">
              Let our experts assess your pest control needs with a free consultation
            </p>
          </div>
          <div className="bg-surface-50/5 backdrop-blur-sm border border-surface-50/10 rounded-lg shadow-lg p-8">
            <ConsultationSteps />
          </div>
        </div>
      </Container>
    </div>
  );
};