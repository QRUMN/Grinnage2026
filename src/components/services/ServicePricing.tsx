import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: 99,
    features: [
      "Quarterly inspections",
      "Common pest treatment",
      "Free re-service",
      "Basic warranty"
    ]
  },
  {
    name: "Advanced",
    price: 199,
    features: [
      "Monthly inspections",
      "All pest treatment",
      "Priority service",
      "Extended warranty",
      "Preventive treatments"
    ]
  }
];

export const ServicePricing = () => {
  return (
    <section className="py-20 bg-content-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-surface-50">
        Service Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className="p-8 bg-surface-50/5 backdrop-blur-sm border border-surface-50/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-surface-50">{plan.name}</h3>
            <p className="text-3xl font-bold text-primary-400 mb-6">${plan.price}/mo</p>
            <ul className="space-y-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-surface-200">
                  <Check className="w-5 h-5 text-primary-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};