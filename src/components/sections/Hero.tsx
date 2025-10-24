import * as React from 'react';
import { ArrowRight, Shield, Calendar, Bug, CheckCircle, Clock, Phone, Leaf, Star, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Section, Container } from '../ui/Section';
import { Card, CardContent } from '../ui/card';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: CheckCircle,
      number: "15K+",
      label: "Satisfied Clients",
      description: "Customers trust our thorough and reliable service",
      color: "primary"
    },
    {
      icon: Leaf,
      number: "17+",
      label: "Years Experience",
      description: "Nearly two decades of pest control excellence",
      color: "success"
    },
    {
      icon: Zap,
      number: "98%",
      label: "Success Rate",
      description: "Proven effectiveness in pest elimination",
      color: "accent"
    }
  ];

  const trustIndicators = [
    { icon: CheckCircle, text: "Eco-friendly Solutions" },
    { icon: Clock, text: "24/7 Emergency Service" },
    { icon: Star, text: "5-Star Rated Service" },
    { icon: Shield, text: "Licensed & Insured" }
  ];

  return (
    <Section
      variant="hero"
      background="gradient"
      spacing="xl"
      fullHeight
      className="relative text-white overflow-hidden"
    >
      {/* Custom dark gradient background for hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-400/5 rounded-full blur-2xl animate-float" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-mesh bg-mesh opacity-20" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Hero Content */}
          <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full backdrop-blur-sm">
              <Bug className="w-4 h-4 mr-2 text-primary-400" />
              <span className="text-sm font-medium text-primary-300">Eco-Friendly Pest Management</span>
              <Sparkles className="w-4 h-4 ml-2 text-primary-400 animate-pulse" />
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-tight tracking-tight">
                <span className="block text-white">Advanced Pest Control</span>
                <span className="block bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400 bg-clip-text text-transparent animate-gradient-x">
                  for Modern Living
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Protecting your space with cutting-edge, eco-friendly pest management solutions.
                Experience the future of pest control with guaranteed results.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight />}
                iconPosition="right"
                className="group relative overflow-hidden shadow-glow hover:shadow-glow-lg"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/services')}
                icon={<Calendar />}
                iconPosition="right"
                className="border-primary-500/30 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400"
              >
                Free Consultation
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-8 max-w-lg mx-auto lg:mx-0">
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <indicator.icon className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {stats.map((stat, index) => (
              <Card
                key={index}
                variant="glass"
                hover
                className={`transform transition-all duration-500 ${
                  isVisible ? 'translate-x-0' : 'translate-x-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      stat.color === 'primary' ? 'bg-primary-500/20' :
                      stat.color === 'success' ? 'bg-success-500/20' :
                      'bg-accent-500/20'
                    }`}>
                      <stat.icon className={`w-6 h-6 ${
                        stat.color === 'primary' ? 'text-primary-400' :
                        stat.color === 'success' ? 'text-success-400' :
                        'text-accent-400'
                      }`} />
                    </div>
                    <div className={`text-3xl font-bold ${
                      stat.color === 'primary' ? 'text-primary-400' :
                      stat.color === 'success' ? 'text-success-400' :
                      'text-accent-400'
                    }`}>
                      {stat.number}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{stat.label}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>
                </CardContent>
              </Card>
            ))}

            {/* Emergency CTA Card */}
            <Card
              variant="soft"
              className={`bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-primary-500/30 transform transition-all duration-500 ${
                isVisible ? 'translate-x-0' : 'translate-x-8'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary-500/30 rounded-xl">
                    <Phone className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Emergency Service</h3>
                    <p className="text-gray-300 text-sm">24/7 support when you need it most</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate('/contact')}
                  className="shadow-lg"
                >
                  Contact Us Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
};