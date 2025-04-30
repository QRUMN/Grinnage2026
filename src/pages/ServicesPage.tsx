import React from 'react';
import { Container } from '../components/common/Container';
import { ServiceHero } from '../components/services/ServiceHero';
import { ServicesList } from '../components/services/ServicesList';
import { ServiceProcess } from '../components/services/ServiceProcess';
import { ServicePricing } from '../components/services/ServicePricing';
import { ServiceFAQ } from '../components/services/ServiceFAQ';
import { BackButton } from '../components/common/BackButton';

export const ServicesPage = () => {
  return (
    <div className="bg-surface-50 dark:bg-content-900">
      <Container>
        <BackButton className="pt-8 mb-8" />
      </Container>
      <ServiceHero />
      <Container>
        <ServicesList />
        <ServiceProcess />
        <ServicePricing />
        <ServiceFAQ />
      </Container>
    </div>
  );
};