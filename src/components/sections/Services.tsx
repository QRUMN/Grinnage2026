import React from 'react';
import { Shield, Clock, Bug, Rat, Bird, Trees as Tree, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Shield className="w-12 h-12" />,
      name: "Advanced Guard",
      price: 120,
      period: "per quarter",
      description: "Comprehensive pest protection with regular inspections and preventive treatments",
      features: [
        "Quarterly inspections",
        "All pest coverage",
        "Preventive treatments",
        "Priority service",
        "Extended warranty",
        "Free re-treatments"
      ]
    },
    {
      icon: <Clock className="w-12 h-12" />,
      name: "Same Day Service",
      price: 225,
      period: "one-time",
      description: "Urgent pest control response for immediate issues",
      features: [
        "Same-day response",
        "Emergency treatment",
        "Targeted solutions",
        "Expert technicians",
        "Immediate relief",
        "Follow-up inspection"
      ]
    },
    {
      icon: <Bird className="w-12 h-12" />,
      name: "Wildlife Control",
      price: null,
      period: "estimate",
      description: "Humane wildlife removal and exclusion services",
      features: [
        "Free inspection",
        "Humane removal",
        "Entry prevention",
        "Damage repair",
        "Habitat modification",
        "Ongoing protection"
      ]
    },
    {
      icon: <Bug className="w-12 h-12" />,
      name: "Wood Eating Pest",
      price: null,
      period: "estimate",
      description: "Termite and wood-destroying insect treatment",
      features: [
        "Free inspection",
        "Treatment plan",
        "Barrier protection",
        "Monitoring stations",
        "Annual inspections",
        "Damage warranty"
      ]
    }
  ];

  return (
    <section className="py-24 bg-content-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-surface-50">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-surface-200">
            Professional pest control solutions tailored to your needs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-surface-50/5 backdrop-blur-sm border border-surface-50/10 rounded-2xl p-8 hover:bg-surface-50/10 transition-all duration-300"
            >
              <div className="flex justify-center text-primary-400 mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-surface-50 text-center mb-2">
                {service.name}
              </h3>
              <div className="text-center mb-4">
                {service.price ? (
                  <>
                    <span className="text-4xl font-bold text-primary-400">${service.price}</span>
                    <span className="text-surface-200 ml-2">{service.period}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary-400">Free Estimate</span>
                )}
              </div>
              <p className="text-surface-200 text-center mb-6">
                {service.description}
              </p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-surface-200">
                    <Shield className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/consultation')}
                className="w-full bg-primary-500 text-surface-50 py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center"
              >
                {service.price ? 'Schedule Service' : 'Get Free Estimate'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};