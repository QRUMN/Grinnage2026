import React from 'react';
import { Shield, Clock, Award, Leaf, Bug, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Bug className="w-12 h-12" />,
    title: "Expert Pest Control",
    description: "Our certified technicians use the latest techniques and equipment for effective pest elimination."
  },
  {
    icon: <ShieldCheck className="w-12 h-12" />,
    title: "Safe & Reliable",
    description: "Family and pet-friendly solutions that protect your space without compromising safety."
  },
  {
    icon: <Leaf className="w-12 h-12" />,
    title: "Eco-Friendly",
    description: "Environmental-conscious pest control methods safe for your family and pets."
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: "24/7 Emergency Service",
    description: "Round-the-clock support for urgent pest control needs with rapid response times."
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Guaranteed Results",
    description: "Our proven methods ensure lasting results, backed by our satisfaction guarantee."
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Licensed & Insured",
    description: "Fully certified professionals with comprehensive insurance coverage for your peace of mind."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-surface-50 dark:bg-content-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-content-900 dark:text-surface-50">
            Why Choose Us
          </h2>
          <p className="mt-4 text-xl text-content-700 dark:text-surface-200">
            Experience the difference with our professional pest control services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 bg-surface-50 dark:bg-content-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-content-200/5 dark:border-surface-50/5"
            >
              <div className="flex justify-center mb-4 text-primary-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-content-900 dark:text-surface-50">
                {feature.title}
              </h3>
              <p className="text-content-700 dark:text-surface-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};