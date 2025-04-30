import React from 'react';
import { Bug, Rat, Bird, Shield } from 'lucide-react';

const services = [
  {
    icon: <Bug className="w-8 h-8" />,
    title: "Insect Control",
    description: "Treatment for ants, roaches, spiders, and other common insects"
  },
  {
    icon: <Rat className="w-8 h-8" />,
    title: "Rodent Control",
    description: "Effective solutions for mice, rats, and other rodents"
  },
  {
    icon: <Bird className="w-8 h-8" />,
    title: "Wildlife Management",
    description: "Humane removal of birds, raccoons, and other wildlife"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Preventive Services",
    description: "Regular inspections and preventive treatments"
  }
];

export const ServicesList = () => {
  return (
    <section className="py-20 bg-surface-50 dark:bg-content-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-content-900 dark:text-surface-50">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="p-6 bg-surface-100 dark:bg-content-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-content-200/10 dark:border-surface-50/10">
            <div className="text-primary-500 mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-content-900 dark:text-surface-50">{service.title}</h3>
            <p className="text-content-700 dark:text-surface-200">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};