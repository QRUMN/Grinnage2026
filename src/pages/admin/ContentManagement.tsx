import React, { useState } from 'react';
import {
  FileText, Edit3, Save, X, Plus, Trash2, Eye,
  Image as ImageIcon, Type, Layout, Globe,
  Settings, RefreshCw, CheckCircle, AlertCircle,
  Star, Phone, Mail, MapPin, Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useContent } from '../../lib/content-context';

export const ContentManagement: React.FC = () => {
  const { content, updateContent, isLoading, lastUpdated } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'about' | 'testimonials' | 'contact' | 'settings'>('hero');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: <Layout className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Settings className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <FileText className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Type className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Info', icon: <Phone className="w-4 h-4" /> },
    { id: 'settings', label: 'Site Settings', icon: <Globe className="w-4 h-4" /> }
  ];

  const handleSaveChanges = async () => {
    // Changes are saved automatically when updateContent is called
    setUnsavedChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50">
            Content Management
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage your website content and settings
          </p>
          {lastUpdated && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-outline">
            <Eye className="w-4 h-4" />
            Preview Site
          </button>
          {isLoading && (
            <div className="flex items-center text-primary-600 dark:text-primary-400">
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              Saving...
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Hero Section */}
        {activeTab === 'hero' && (
          <HeroSection
            content={content.hero}
            updateContent={updateContent}
            isLoading={isLoading}
          />
        )}

        {/* Services Section */}
        {activeTab === 'services' && (
          <ServicesSection
            content={content.services}
            updateContent={updateContent}
            isLoading={isLoading}
          />
        )}

        {/* About Section */}
        {activeTab === 'about' && (
          <AboutSection
            content={content.about}
            updateContent={updateContent}
            isLoading={isLoading}
          />
        )}

        {/* Testimonials Section */}
        {activeTab === 'testimonials' && (
          <TestimonialsSection
            content={content.testimonials}
            updateContent={updateContent}
            isLoading={isLoading}
          />
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <ContactSection
            content={content.contact}
            updateContent={updateContent}
            isLoading={isLoading}
          />
        )}

        {/* Site Settings */}
        {activeTab === 'settings' && (
          <SiteSettingsSection
            content={content.siteSettings}
            updateContent={updateContent}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC<{
  content: any;
  updateContent: (section: string, data: any) => void;
  isLoading: boolean;
}> = ({ content, updateContent, isLoading }) => {
  const [editData, setEditData] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    await updateContent('hero', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(content);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Hero Section
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-outline"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="btn-primary"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn-outline"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={editData.subtitle}
              onChange={(e) => setEditData(prev => ({ ...prev, subtitle: e.target.value }))}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Description
            </label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="input w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={editData.buttonText}
                onChange={(e) => setEditData(prev => ({ ...prev, buttonText: e.target.value }))}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Button Link
              </label>
              <input
                type="text"
                value={editData.buttonLink}
                onChange={(e) => setEditData(prev => ({ ...prev, buttonLink: e.target.value }))}
                className="input w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
              {content.title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400">{content.subtitle}</p>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">{content.description}</p>
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg">
            {content.buttonText} → {content.buttonLink}
          </div>
        </div>
      )}
    </div>
  );
};

// Services Section Component
const ServicesSection: React.FC<{
  content: any;
  updateContent: (section: string, data: any) => void;
  isLoading: boolean;
}> = ({ content, updateContent, isLoading }) => {
  const [editData, setEditData] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    await updateContent('services', editData);
    setIsEditing(false);
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(0)}`;

  return (
    <div className="space-y-6">
      {/* Services Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Services Header
          </h2>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-outline">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button onClick={handleSave} disabled={isLoading} className="btn-primary">
                <Save className="w-4 h-4" />
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="btn-outline">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
              className="input w-full"
              placeholder="Services Title"
            />
            <input
              type="text"
              value={editData.subtitle}
              onChange={(e) => setEditData(prev => ({ ...prev, subtitle: e.target.value }))}
              className="input w-full"
              placeholder="Services Subtitle"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="input w-full"
              placeholder="Services Description"
            />
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              {content.title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 mb-2">{content.subtitle}</p>
            <p className="text-neutral-600 dark:text-neutral-400">{content.description}</p>
          </div>
        )}
      </div>

      {/* Service Items */}
      <div className="grid lg:grid-cols-2 gap-6">
        {content.items.map((service, index) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard: React.FC<{ service: any }> = ({ service }) => {
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(0)}`;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {service.title}
            </h3>
            {service.popular && (
              <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {service.subtitle}
          </p>
        </div>
        <button className="p-2 text-neutral-400 hover:text-primary-600">
          <Edit3 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
        {service.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(service.price)}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm ml-1">
            {service.interval === 'one_time' ? 'one-time' : `/${service.interval}`}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {service.features.slice(0, 3).map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
            {feature}
          </div>
        ))}
        {service.features.length > 3 && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            +{service.features.length - 3} more features
          </p>
        )}
      </div>
    </div>
  );
};

// About Section Component
const AboutSection: React.FC<{
  content: any;
  updateContent: (section: string, data: any) => void;
  isLoading: boolean;
}> = ({ content, updateContent, isLoading }) => {
  const [editData, setEditData] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    await updateContent('about', editData);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          About Us Section
        </h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn-outline">
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button onClick={handleSave} disabled={isLoading} className="btn-primary">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-outline">
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
              className="input w-full"
              placeholder="About Title"
            />
            <input
              type="text"
              value={editData.subtitle}
              onChange={(e) => setEditData(prev => ({ ...prev, subtitle: e.target.value }))}
              className="input w-full"
              placeholder="About Subtitle"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="input w-full"
              placeholder="About Description"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              {content.title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 mb-2">{content.subtitle}</p>
            <p className="text-neutral-600 dark:text-neutral-400">{content.description}</p>
          </div>

          <div>
            <h4 className="text-md font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              Company Statistics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Testimonials Section Component
const TestimonialsSection: React.FC<{
  content: any;
  updateContent: (section: string, data: any) => void;
  isLoading: boolean;
}> = ({ content, updateContent, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Customer Testimonials
        </h2>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {content.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {testimonial.name}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-neutral-400 hover:text-primary-600">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-400 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
        "{testimonial.content}"
      </p>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < testimonial.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-neutral-300 dark:text-neutral-600"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// Contact Section Component
const ContactSection: React.FC<{
  content: any;
  updateContent: (section: string, data: any) => void;
  isLoading: boolean;
}> = ({ content, updateContent, isLoading }) => {
  const [editData, setEditData] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    await updateContent('contact', editData);
    setIsEditing(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'address': return <MapPin className="w-5 h-5" />;
      case 'hours': return <Clock className="w-5 h-5" />;
      default: return <Phone className="w-5 h-5" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Contact Information
        </h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn-outline">
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button onClick={handleSave} disabled={isLoading} className="btn-primary">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-outline">
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
            className="input w-full"
            placeholder="Contact Title"
          />
          <input
            type="text"
            value={editData.subtitle}
            onChange={(e) => setEditData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="input w-full"
            placeholder="Contact Subtitle"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="input w-full"
            placeholder="Contact Description"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              {content.title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 mb-2">{content.subtitle}</p>
            <p className="text-neutral-600 dark:text-neutral-400">{content.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {content.info.map((info, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="text-primary-600 dark:text-primary-400">
                  {getIcon(info.type)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {info.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {info.content}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {info.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Site Settings Section Component
const SiteSettingsSection: React.FC<{
  content: any;
  updateContent: (section: string, data: any) => void;
  isLoading: boolean;
}> = ({ content, updateContent, isLoading }) => {
  const [editData, setEditData] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    await updateContent('siteSettings', editData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Company Information
          </h2>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-outline">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button onClick={handleSave} disabled={isLoading} className="btn-primary">
                <Save className="w-4 h-4" />
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="btn-outline">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={editData.companyName}
                onChange={(e) => setEditData(prev => ({ ...prev, companyName: e.target.value }))}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={editData.phone}
                onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Service Area
              </label>
              <input
                type="text"
                value={editData.serviceArea}
                onChange={(e) => setEditData(prev => ({ ...prev, serviceArea: e.target.value }))}
                className="input w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={editData.metaTitle}
                onChange={(e) => setEditData(prev => ({ ...prev, metaTitle: e.target.value }))}
                className="input w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Meta Description
              </label>
              <textarea
                value={editData.metaDescription}
                onChange={(e) => setEditData(prev => ({ ...prev, metaDescription: e.target.value }))}
                rows={3}
                className="input w-full"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Company Name
              </h3>
              <p className="text-neutral-900 dark:text-neutral-100">{content.companyName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Phone Number
              </h3>
              <p className="text-neutral-900 dark:text-neutral-100">{content.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </h3>
              <p className="text-neutral-900 dark:text-neutral-100">{content.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Service Area
              </h3>
              <p className="text-neutral-900 dark:text-neutral-100">{content.serviceArea}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                SEO Settings
              </h3>
              <p className="text-neutral-900 dark:text-neutral-100 mb-2">{content.metaTitle}</p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">{content.metaDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};