import React from 'react';
import { Container } from '../common/Container';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section className="py-24 bg-content-900">
      <Container>
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
              info: "Delaware Region",
              subInfo: "Serving DE, PA, NJ, MD"
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

        {/* Contact Form */}
        <div className="bg-surface-50/5 backdrop-blur-sm border border-surface-50/10 rounded-lg p-8 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-surface-200 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3.5 rounded-lg bg-surface-50/10 border border-surface-50/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-surface-50 placeholder-surface-400"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-200 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3.5 rounded-lg bg-surface-50/10 border border-surface-50/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-surface-50 placeholder-surface-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-200 mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3.5 rounded-lg bg-surface-50/10 border border-surface-50/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-surface-50 placeholder-surface-400 resize-none"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3.5 bg-primary-500 text-surface-50 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </form>
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
    </section>
  );
};