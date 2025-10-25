import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the content structure for different sections
export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      price: number;
      interval: 'one_time' | 'month' | 'year';
      features: string[];
      popular: boolean;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    stats: Array<{
      label: string;
      value: string;
    }>;
    story: {
      title: string;
      content: string[];
    };
    team: Array<{
      name: string;
      role: string;
      credentials: string;
      experience: string;
      specialties: string[];
    }>;
  };
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image?: string;
  }>;
  contact: {
    title: string;
    subtitle: string;
    description: string;
    info: Array<{
      type: 'phone' | 'email' | 'address' | 'hours';
      title: string;
      content: string;
      description: string;
      action?: string;
    }>;
  };
  siteSettings: {
    companyName: string;
    phone: string;
    email: string;
    serviceArea: string;
    metaTitle: string;
    metaDescription: string;
  };
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: any) => void;
  isLoading: boolean;
  lastUpdated: Date | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Default content structure
const defaultContent: SiteContent = {
  hero: {
    title: 'Professional Pest Control',
    subtitle: 'Bay Area Experts',
    description: 'Protecting your home and business with safe, effective pest control solutions. Licensed professionals, guaranteed results.',
    buttonText: 'Get Free Quote',
    buttonLink: '/contact'
  },
  services: {
    title: 'Our Services',
    subtitle: 'Comprehensive Pest Control Solutions',
    description: 'From residential inspections to commercial treatments, we provide complete pest management services.',
    items: [
      {
        id: 'residential-inspection',
        title: 'Residential Inspection',
        subtitle: 'Comprehensive Home Assessment',
        description: 'Thorough property inspection to identify pest issues and prevention opportunities.',
        price: 8999,
        interval: 'one_time',
        features: [
          'Complete interior and exterior inspection',
          'Detailed written report with findings',
          'Treatment recommendations',
          'Prevention strategy plan',
          'Follow-up consultation included'
        ],
        popular: false
      },
      {
        id: 'residential-treatment',
        title: 'Residential Treatment',
        subtitle: 'Complete Pest Elimination',
        description: 'Professional pest treatment using safe, effective methods for your home.',
        price: 19999,
        interval: 'one_time',
        features: [
          'Targeted pest elimination',
          'Eco-friendly treatment options',
          'Interior and exterior application',
          'Safe for family and pets',
          '30-day service guarantee'
        ],
        popular: true
      },
      {
        id: 'commercial-service',
        title: 'Commercial Service',
        subtitle: 'Business Pest Management',
        description: 'Ongoing pest control solutions designed for commercial properties.',
        price: 7999,
        interval: 'month',
        features: [
          'Monthly scheduled service',
          'Customized treatment plans',
          'Compliance documentation',
          'Emergency response available',
          'Dedicated account manager'
        ],
        popular: false
      }
    ]
  },
  about: {
    title: 'About Grinnage Exterminating',
    subtitle: 'Trusted Pest Control Experts',
    description: 'For over two decades, we\'ve been protecting Bay Area homes and businesses with safe, effective pest control solutions.',
    stats: [
      { label: 'Years Experience', value: '20+' },
      { label: 'Homes Protected', value: '5,000+' },
      { label: 'Satisfaction Rate', value: '98%' },
      { label: 'Emergency Service', value: '24/7' }
    ],
    story: {
      title: 'Our Story',
      content: [
        'Founded in 2003, Grinnage Exterminating began with a simple mission: to provide the Bay Area with reliable, safe, and effective pest management solutions. What started as a small local business has grown into a trusted name in residential and commercial pest control.',
        'Our founder, Keith Grinnage, recognized the need for a pest control company that prioritized customer education, environmental responsibility, and long-term prevention strategies. This vision continues to guide everything we do today.',
        'We\'ve built our reputation on transparency, quality service, and genuine care for our community. Every member of our team shares a commitment to protecting what matters most to you – your family, your property, and your peace of mind.'
      ]
    },
    team: [
      {
        name: 'Keith Grinnage',
        role: 'Founder & Lead Technician',
        credentials: 'Licensed Pest Control Professional',
        experience: '20+ years in pest management',
        specialties: ['Residential Treatment', 'Commercial Solutions', 'Eco-Friendly Methods']
      },
      {
        name: 'Sarah Martinez',
        role: 'Operations Manager',
        credentials: 'Certified Pest Control Operator',
        experience: '15+ years in customer service',
        specialties: ['Customer Relations', 'Treatment Planning', 'Quality Assurance']
      },
      {
        name: 'Mike Chen',
        role: 'Senior Technician',
        credentials: 'State Licensed Applicator',
        experience: '12+ years field experience',
        specialties: ['Termite Treatment', 'Commercial Properties', 'Integrated Pest Management']
      }
    ]
  },
  testimonials: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Homeowner',
      company: 'San Francisco',
      content: 'Grinnage solved our ant problem quickly and professionally. The technician was knowledgeable and explained everything clearly.',
      rating: 5
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'Property Manager',
      company: 'TechCorp Buildings',
      content: 'Excellent commercial pest control service. They\'ve been maintaining our office buildings for 3 years with outstanding results.',
      rating: 5
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      role: 'Restaurant Owner',
      company: 'Downtown Bistro',
      content: 'Professional, reliable, and discreet service. They understand the unique needs of food service businesses.',
      rating: 5
    }
  ],
  contact: {
    title: 'Contact Our Expert Team',
    subtitle: 'Get In Touch Today',
    description: 'Ready to solve your pest problem? Our licensed professionals are standing by to provide you with a free consultation and customized treatment plan.',
    info: [
      {
        type: 'phone',
        title: 'Call Us',
        content: '(302) 562-5654',
        description: 'Available 24/7 for emergencies',
        action: 'tel:+13025625654'
      },
      {
        type: 'email',
        title: 'Email Us',
        content: 'contact@grinnagex.com',
        description: 'We respond within 24 hours',
        action: 'mailto:contact@grinnagex.com'
      },
      {
        type: 'address',
        title: 'Service Area',
        content: 'San Francisco Bay Area',
        description: 'Licensed in CA, NV, OR'
      },
      {
        type: 'hours',
        title: 'Business Hours',
        content: 'Mon-Fri 8AM-6PM',
        description: 'Saturday 9AM-4PM'
      }
    ]
  },
  siteSettings: {
    companyName: 'Grinnage Exterminating',
    phone: '(302) 562-5654',
    email: 'contact@grinnagex.com',
    serviceArea: 'San Francisco Bay Area',
    metaTitle: 'Professional Pest Control | Grinnage Exterminating',
    metaDescription: 'Professional pest control services in the San Francisco Bay Area. Licensed technicians, guaranteed results, 20+ years experience.'
  }
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent(parsed);
        const lastUpdatedStr = localStorage.getItem('siteContentLastUpdated');
        if (lastUpdatedStr) {
          setLastUpdated(new Date(lastUpdatedStr));
        }
      } catch (error) {
        console.error('Failed to load saved content:', error);
      }
    }
  }, []);

  const updateContent = async (section: keyof SiteContent, data: any) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedContent = {
        ...content,
        [section]: data
      };

      setContent(updatedContent);
      setLastUpdated(new Date());

      // Save to localStorage (in production, this would be an API call)
      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      localStorage.setItem('siteContentLastUpdated', new Date().toISOString());

    } catch (error) {
      console.error('Failed to update content:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateContent,
      isLoading,
      lastUpdated
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};