import * as React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "The team was professional and thorough. Haven't seen a single pest since their treatment!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Mark Thompson",
    role: "Restaurant Owner",
    content: "Their commercial pest control service is outstanding. They understand the unique needs of food businesses.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Emily Chen",
    role: "Property Manager",
    content: "Reliable, efficient, and always available for emergencies. Exactly what we needed for our properties.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0f1729] to-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#56e39f]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center mb-3 px-4 py-1.5 bg-[#56e39f]/10 rounded-full">
            <Star className="w-4 h-4 mr-2 text-[#56e39f] fill-[#56e39f]" />
            <span className="text-sm font-medium text-[#56e39f]">Customer Success</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-300">
            We've helped thousands of homeowners and businesses solve their pest problems
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#56e39f]/5 hover:border-[#56e39f]/20 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <Quote className="w-10 h-10 text-[#56e39f]/50 rotate-180" />
              </div>
              
              <div className="p-8 relative z-10">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#56e39f] fill-[#56e39f]" />
                  ))}
                </div>
              
                <p className="text-gray-300 text-lg mb-8 relative z-10">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#56e39f]/20 group-hover:ring-[#56e39f]/50 transition-all"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonial stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
            <p className="text-gray-400">Happy Customers</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
            <p className="text-gray-400">Success Rate</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10+</div>
            <p className="text-gray-400">Years Experience</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <p className="text-gray-400">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};