import React from 'react';
import { Hero } from '../components/sections/Hero';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { Services } from '../components/sections/Services';
import { Testimonials } from '../components/sections/Testimonials';
import { ContactSection } from '../components/sections/ContactSection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
    </>
  );
};