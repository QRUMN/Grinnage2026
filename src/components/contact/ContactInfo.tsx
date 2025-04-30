import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="bg-surface-50/5 backdrop-blur-sm p-8 rounded-lg border border-surface-50/10">
      <h2 className="text-2xl font-bold text-surface-50 mb-6">
        Contact Information
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <Phone className="w-6 h-6 text-primary-400 mt-1" />
          <div className="ml-4">
            <h3 className="font-semibold text-surface-50">Phone</h3>
            <p className="text-surface-200">(302) 561-5654</p>
            <p className="text-sm text-surface-300">
              24/7 Emergency Service Available
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Mail className="w-6 h-6 text-primary-400 mt-1" />
          <div className="ml-4">
            <h3 className="font-semibold text-surface-50">Email</h3>
            <p className="text-surface-200">contact@grinnage.com</p>
          </div>
        </div>

        <div className="flex items-start">
          <MapPin className="w-6 h-6 text-primary-400 mt-1" />
          <div className="ml-4">
            <h3 className="font-semibold text-surface-50">Service Areas</h3>
            <p className="text-surface-200">
              Delaware • Pennsylvania • New Jersey • Maryland
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="w-6 h-6 text-primary-400 mt-1" />
          <div className="ml-4">
            <h3 className="font-semibold text-surface-50">Hours</h3>
            <p className="text-surface-200">
              Monday - Friday: 8am - 5pm
            </p>
            <p className="text-surface-200">
              Saturday: Closed (Emergency Service Available)
            </p>
            <p className="text-surface-200">
              Sunday: Closed (Emergency Service Available)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};