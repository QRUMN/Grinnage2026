import React from 'react';
import { Search, ClipboardCheck, Zap, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Inspection",
    description: "Our certified technicians conduct a comprehensive property assessment, identifying active pest issues, potential entry points, and risk factors."
  },
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Treatment Plan",
    description: "Based on our inspection findings, we develop a customized treatment strategy specifically for your property."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Treatment",
    description: "Our licensed professionals execute your customized treatment plan using industry-leading products and techniques."
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Follow-up",
    description: "We conduct scheduled follow-up visits to monitor treatment effectiveness and make any necessary adjustments."
  }
];

export const ServiceProcess = () => {
  return (
    <section className="py-20 bg-content-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-surface-50">
        Our Process
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center p-6 bg-surface-50/5 backdrop-blur-sm rounded-lg border border-surface-50/10 hover:bg-surface-50/10 transition-all duration-300">
            <div className="text-primary-400 mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-4 text-surface-50">{step.title}</h3>
            <p className="text-surface-200 text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};