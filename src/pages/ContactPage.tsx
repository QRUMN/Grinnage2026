import React from 'react';
import { Container } from '../components/common/Container';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactMap } from '../components/contact/ContactMap';
import { BackButton } from '../components/common/BackButton';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="py-24 bg-content-900">
      <Container>
        <BackButton className="mb-8 text-surface-50" />
        
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-surface-50 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-surface-200">
            We're here to help with all your pest control needs. Contact us today for a free consultation.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: <Phone className="w-6 h-6" />,
              title: "Call Us",
              info: "(302) 561-5654",
              subInfo: "24/7 Emergency Service"
            },
            {
              icon: <Mail className="w-6 h-6" />,
              title: "Email Us",
              info: "contact@grinnage.com",
              subInfo: "We'll respond within 24h"
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: "Business Hours",
              info: "Mon-Fri: 8am - 6pm",
              subInfo: "Sat: 9am - 2pm"
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: "Visit Us",
              info: "123 Pest Control St",
              subInfo: "City, State 12345"
            }
          ].map((item, index) => (
            <div key={index} className="bg-surface-50/5 backdrop-blur-sm p-6 rounded-lg text-center border border-surface-50/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10 text-primary-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-surface-50 mb-2">
                {item.title}
              </h3>
              <p className="text-surface-50 font-medium">
                {item.info}
              </p>
              <p className="text-surface-200 text-sm">
                {item.subInfo}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div>
            <div className="bg-surface-50/5 backdrop-blur-sm rounded-lg border border-surface-50/10 p-8">
              <h2 className="text-2xl font-bold text-surface-50 mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info & Map Section */}
          <div className="space-y-8">
            <div className="bg-surface-50/5 backdrop-blur-sm p-8 rounded-lg border border-surface-50/10">
              <h2 className="text-2xl font-bold text-surface-50 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <p className="font-medium text-surface-50">Phone</p>
                    <p className="text-surface-200">(302) 561-5654</p>
                    <p className="text-sm text-surface-300">
                      24/7 Emergency Service Available
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <p className="font-medium text-surface-50">Email</p>
                    <p className="text-surface-200">contact@grinnage.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <p className="font-medium text-surface-50">Service Areas</p>
                    <p className="text-surface-200">Delaware • Pennsylvania • New Jersey • Maryland</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <p className="font-medium text-surface-50">Hours</p>
                    <p className="text-surface-200">Monday - Friday: 8am - 5pm</p>
                    <p className="text-surface-200">Saturday: Closed (Emergency Service Available)</p>
                    <p className="text-surface-200">Sunday: Closed (Emergency Service Available)</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactMap />
          </div>
        </div>

        {/* Emergency Service Banner */}
        <div className="mt-16 bg-red-900/20 border border-red-500/20 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-surface-50 mb-2">
                Emergency Pest Control
              </h3>
              <p className="text-surface-200">
                Available 24/7 for urgent pest control situations
              </p>
            </div>
            <a 
              href="tel:(302) 561-5654"
              className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-surface-50 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};