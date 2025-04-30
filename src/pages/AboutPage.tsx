import React from 'react';
import { Container } from '../components/common/Container';
import { BackButton } from '../components/common/BackButton';
import { Shield, Users, Award, Leaf, Target, Clock, Bug } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '17+' },
  { label: 'Satisfied Clients', value: '15K+' },
  { label: 'Team Members', value: '50+' },
  { label: 'Service Areas', value: '100+' }
];

const team = [
  {
    name: 'Keith Grinnage',
    role: 'CEO & Operator',
    image: 'https://github.com/QRUMN/Grinnagex2025/blob/main/grinnage.png?raw=true',
    description: 'With over 17 years of experience in pest control, Keith leads our team with expertise and dedication to customer satisfaction.'
  },
  {
    name: 'Dawson Grinnage',
    role: 'Social Media Manager',
    image: 'https://github.com/QRUMN/Grinnagex2025/blob/main/1.jpg?raw=true',
    description: 'Managing our digital presence and ensuring our clients stay informed about the latest pest control solutions and company updates.'
  }
];

const values = [
  {
    icon: <Shield className="w-8 h-8 text-primary-500" />,
    title: 'Excellence',
    description: 'Delivering superior pest control solutions with unmatched expertise and professionalism.'
  },
  {
    icon: <Leaf className="w-8 h-8 text-primary-500" />,
    title: 'Sustainability',
    description: 'Committed to eco-friendly practices that protect both your space and the environment.'
  },
  {
    icon: <Users className="w-8 h-8 text-primary-500" />,
    title: 'Customer Focus',
    description: 'Building lasting relationships through exceptional service and transparent communication.'
  },
  {
    icon: <Target className="w-8 h-8 text-primary-500" />,
    title: 'Innovation',
    description: 'Continuously evolving our methods to provide cutting-edge pest control solutions.'
  }
];

const certifications = [
  { icon: <Award className="w-12 h-12" />, label: 'EPA Certified' },
  { icon: <Shield className="w-12 h-12" />, label: 'State Licensed' },
  { icon: <Award className="w-12 h-12" />, label: '5C Certification' },
  { icon: <Award className="w-12 h-12" />, label: '7A Certification' },
  { icon: <Award className="w-12 h-12" />, label: '7B Certification' },
  { icon: <Leaf className="w-12 h-12" />, label: 'Green Pro Certified' }
];

const whyChooseUs = [
  {
    icon: <Bug className="w-12 h-12" />,
    title: "Expert Technicians",
    description: "Certified and trained professionals delivering top-notch service."
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Safe Solutions",
    description: "Family and pet-friendly pest control methods."
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: "24/7 Support",
    description: "Emergency services available around the clock."
  },
  {
    icon: <Leaf className="w-12 h-12" />,
    title: "Eco-Friendly Practices",
    description: "Sustainable pest control methods that protect the environment."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "The team was professional and thorough. Haven't seen a single pest since their treatment!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Mark Thompson",
    role: "Restaurant Owner",
    content: "Their commercial pest control service is outstanding. They understand the unique needs of food businesses.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export const AboutPage = () => {
  return (
    <div className="bg-surface-50 dark:bg-content-900">
      <Container>
        <BackButton className="pt-8 mb-8" />
        
        {/* Hero Section */}
        <div className="py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-content-900 dark:text-surface-50 mb-6">
              About Grinnage Extermination
            </h1>
            <p className="text-xl text-content-700 dark:text-surface-200">
              Leading the industry in innovative and eco-friendly pest control solutions since 2007. 
              We're committed to protecting your space while preserving our environment.
            </p>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-content-900 dark:text-surface-50 mb-6">
              Our Team
            </h2>
            <p className="text-xl text-content-700 dark:text-surface-200 max-w-3xl mx-auto">
              Meet the dedicated professionals behind Grinnage Extermination's success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-content-800 rounded-xl p-8 shadow-lg border border-surface-50/10">
                <div className="flex items-center space-x-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-surface-50">
                      {member.name}
                    </h3>
                    <p className="text-primary-500 font-medium mb-2">{member.role}</p>
                    <p className="text-surface-200 text-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-20 bg-content-800 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-50 mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-surface-200 max-w-3xl mx-auto">
              We provide exceptional pest control services with a focus on safety, sustainability, and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-surface-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-200">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-content-900 dark:text-surface-50 mb-6">
              Our Certifications
            </h2>
            <p className="text-xl text-content-700 dark:text-surface-200 max-w-3xl mx-auto">
              We maintain the highest industry standards through continuous training and certification.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary-500">
                  {cert.icon}
                </div>
                <p className="font-semibold text-content-900 dark:text-surface-50">
                  {cert.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 bg-content-800 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-50 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-surface-200 max-w-3xl mx-auto">
              The core principles that guide our approach to pest control
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-surface-50 mb-2">
                  {value.title}
                </h3>
                <p className="text-surface-200">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-content-900 dark:text-surface-50 mb-6">
              Testimonials
            </h2>
            <p className="text-xl text-content-700 dark:text-surface-200 max-w-3xl mx-auto">
              See what our satisfied customers are saying about our services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-content-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-surface-50">
                      {testimonial.name}
                    </h3>
                    <p className="text-surface-200 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-surface-200">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-content-900 dark:text-surface-50 mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-content-700 dark:text-surface-200 mb-4">
              We're here to help with all your pest control needs. Contact us today for a free consultation.
            </p>
            <p className="text-2xl font-bold text-primary-500">
              (302) 561-5654
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};