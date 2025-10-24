import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Award, Leaf, Target, ArrowLeft, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

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
    icon: <Shield className="w-6 h-6 text-[#56e39f]" />,
    title: 'Excellence',
    description: 'Delivering superior pest control solutions with unmatched expertise and professionalism.'
  },
  {
    icon: <Leaf className="w-6 h-6 text-[#56e39f]" />,
    title: 'Sustainability',
    description: 'Committed to eco-friendly practices that protect both your space and the environment.'
  },
  {
    icon: <Users className="w-6 h-6 text-[#56e39f]" />,
    title: 'Customer Focus',
    description: 'Building lasting relationships through exceptional service and transparent communication.'
  },
  {
    icon: <Target className="w-6 h-6 text-[#56e39f]" />,
    title: 'Innovation',
    description: 'Continuously evolving our methods to provide cutting-edge pest control solutions.'
  }
];

const certifications = [
  { icon: <Award className="w-5 h-5" />, label: 'EPA Certified' },
  { icon: <Shield className="w-5 h-5" />, label: 'State Licensed' },
  { icon: <Award className="w-5 h-5" />, label: '5C Certification' },
  { icon: <Award className="w-5 h-5" />, label: '7A Certification' }
];

export const AboutPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - 2007;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#111827] text-white">
      {/* Header/Navigation */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-xl">GRINNAGE</div>
          <nav className="hidden md:flex space-x-8">
            {['Services', 'About', 'Contact'].map(item => (
              <button 
                key={item}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
                className={`transition-colors ${item === 'About' ? 'text-[#56e39f]' : 'text-gray-300 hover:text-[#56e39f]'}`}
              >
                {item}
              </button>
            ))}
          </nav>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => navigate('/login')}
          >
            Client Login
          </Button>
        </div>
      </header>

      <main>
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-300 hover:text-[#56e39f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>

        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center px-3 py-1 bg-[#56e39f]/10 rounded-full mb-4">
              <Users className="w-4 h-4 mr-2 text-[#56e39f]" />
              <span className="text-sm font-medium text-[#56e39f]">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Grinnage Extermination
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Leading the industry in innovative and eco-friendly pest control solutions since 2007. 
              We're committed to protecting your space while preserving our environment.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-1">{yearsExperience}+</div>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-1">15K+</div>
                <p className="text-gray-400">Satisfied Clients</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <p className="text-gray-400">Team Members</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <p className="text-gray-400">Service Areas</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#56e39f]/30"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-[#56e39f] font-medium text-sm mb-1">{member.role}</p>
                      <p className="text-gray-300 text-sm">{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-[#56e39f]/10 rounded-lg text-[#56e39f] mr-4">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Certifications Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Our Certifications</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center p-3">
                    <div className="p-2 bg-[#56e39f]/10 rounded-lg text-[#56e39f] mr-3">
                      {cert.icon}
                    </div>
                    <span className="text-gray-300">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-r from-[#56e39f]/20 to-blue-500/20 backdrop-blur-sm border border-[#56e39f]/30 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to work with us?</h3>
                  <p className="text-gray-300">Contact us today for a free consultation about your pest control needs</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate('/contact')}
                    className="whitespace-nowrap"
                  >
                    Contact Us
                  </Button>
                  <a 
                    href="tel:+13025615654"
                    className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (302) 561-5654
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 mt-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl mb-2">GRINNAGE</div>
              <p className="text-gray-400 text-sm">
                Professional pest control services since 2007.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Terms
              </a>
              <a href="/sitemap" className="text-gray-500 hover:text-[#56e39f] text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} GRINNAGE Pest Control. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
