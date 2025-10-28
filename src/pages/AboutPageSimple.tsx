import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Award, Users, Target, ArrowLeft, CheckCircle,
  Star, Phone, Mail, Calendar, Menu, X, User, Leaf,
  Heart, Zap, Building
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Section, Container, SectionHeader } from '../components/ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const AboutPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const teamMembers = [
    {
      name: "Keith Grinnage",
      role: "CEO & Operator",
      image: "/images/keith-grinnage.jpg", // Placeholder path
      description: "With over 17 years of experience in pest control, Keith leads our team with expertise and dedication to customer satisfaction.",
      experience: "17+ years"
    },
    {
      name: "Dawson Grinnage",
      role: "Social Media Manager",
      image: "/images/dawson-grinnage.jpg", // Placeholder path
      description: "Managing our digital presence and ensuring our clients stay informed about the latest pest control solutions and company updates.",
      experience: "Digital Marketing Expert"
    }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Delivering superior pest control solutions with unmatched expertise and professionalism.",
      color: "primary"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description: "Committed to eco-friendly practices that protect both your space and the environment.",
      color: "success"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Focus",
      description: "Building lasting relationships through exceptional service and transparent communication.",
      color: "accent"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Continuously evolving our methods to provide cutting-edge pest control solutions.",
      color: "purple"
    }
  ];

  const certifications = [
    { name: "EPA Certified", description: "Environmental Protection Agency certification" },
    { name: "State Licensed", description: "Licensed pest control professionals" },
    { name: "5C Certification", description: "Commercial pest control certification" },
    { name: "7A Certification", description: "Advanced pest management certification" },
    { name: "7B Certification", description: "Specialized treatment certification" }
  ];

  const getValueColor = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400';
      case 'success': return 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400';
      case 'accent': return 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      default: return 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
        <Container>
          <div className="flex justify-between items-center py-4">
            <div className="font-display font-bold text-2xl text-primary-600 dark:text-primary-400">
              GRINNAGE
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</button>
              <button onClick={() => navigate('/services')} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Services</button>
              <span className="text-primary-600 dark:text-primary-400 font-medium">About</span>
              <button onClick={() => navigate('/contact')} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</button>
            </nav>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin-login')}
                className="hidden md:inline-flex"
              >
                Admin Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/contact')}
                className="hidden md:inline-flex"
              >
                Get Quote
              </Button>
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
              <nav className="py-4 space-y-2">
                <button
                  onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => { navigate('/services'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Services
                </button>
                <div className="px-4 py-3 text-primary-600 dark:text-primary-400 font-medium">
                  About
                </div>
                <button
                  onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Contact
                </button>
                <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 space-y-2">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => { navigate('/admin-login'); setIsMobileMenuOpen(false); }}
                  >
                    Admin Login
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                  >
                    Get Quote
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </Container>
      </header>

      <main>
        {/* Hero Section */}
        <Section spacing="xl" background="gradient">
          <Container className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>

            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-full mb-6">
              <Building className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">About Our Company</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              About
              <span className="block text-primary-600 dark:text-primary-400">Grinnage Extermination</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Leading the industry in innovative and eco-friendly pest control solutions since 2007.
              We're committed to protecting your space while preserving our environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact')}
                icon={<Calendar />}
                iconPosition="right"
              >
                Get Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/services')}
                icon={<Shield />}
                iconPosition="right"
              >
                Our Services
              </Button>
            </div>
          </Container>
        </Section>

        {/* Our Team Section */}
        <Section spacing="lg" background="transparent">
          <Container>
            <SectionHeader
              subtitle="Meet Our Team"
              title="The People Behind Our Success"
              description="Our experienced professionals are dedicated to providing exceptional pest control services with expertise and care."
              centered
            />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} variant="elevated" hover className="text-center">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full mx-auto mb-6">
                      <User className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                      {member.experience}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Our Values Section */}
        <Section spacing="lg" background="gray">
          <Container>
            <SectionHeader
              subtitle="Our Values"
              title="What Drives Our Mission"
              description="These core principles guide everything we do and ensure we deliver exceptional service to every client."
              centered
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} variant="soft" hover className="text-center h-full">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4 ${getValueColor(value.color)}`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Certifications Section */}
        <Section spacing="lg" background="transparent">
          <Container>
            <SectionHeader
              subtitle="Our Certifications"
              title="Licensed & Certified Professionals"
              description="We maintain the highest industry standards with comprehensive certifications and ongoing training."
              centered
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <Card key={index} variant="bordered" hover className="text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-xl mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section variant="cta" spacing="lg">
          <Container className="text-center">
            <div className="max-w-3xl mx-auto">
              <Star className="w-16 h-16 text-white mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
                Ready to work with us?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Contact us today for a free consultation about your pest control needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  icon={<Calendar />}
                  iconPosition="right"
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  Get Free Consultation
                </Button>
                <a
                  href="tel:+13025625654"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  (302) 562-5654
                </a>
              </div>
            </div>
          </Container>
        </Section>

        {/* Contact Info Footer */}
        <Section spacing="sm" background="gray">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-500 mr-3" />
                  <a href="tel:+13025625654" className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    (302) 562-5654
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-500 mr-3" />
                  <a href="mailto:contact@grinnagex.com" className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    contact@grinnagex.com
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
};