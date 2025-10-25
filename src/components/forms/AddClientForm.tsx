import React, { useState } from 'react';
import { X, Save, User, Mail, Phone, MapPin, Building, DollarSign } from 'lucide-react';

interface AddClientFormProps {
  onClose: () => void;
  onSubmit: (clientData: any) => void;
}

export const AddClientForm: React.FC<AddClientFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    preferredContact: 'email' as 'email' | 'phone' | 'text',

    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'residential' as 'residential' | 'commercial',
    propertySize: '',
    accessInstructions: '',

    // Business Information
    clientType: 'residential' as 'residential' | 'commercial',
    source: 'website' as 'referral' | 'website' | 'advertising' | 'repeat' | 'other',

    // Subscription Information
    plan: '',
    frequency: 'quarterly' as 'monthly' | 'quarterly' | 'annual' | 'one-time',
    autoRenewal: true,

    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',

    // Initial Notes
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter phone in format (302) 562-5654';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create client object
      const clientData = {
        id: `client_${Date.now()}`,
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          alternatePhone: formData.alternatePhone || undefined,
          preferredContact: formData.preferredContact
        },
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          propertyType: formData.propertyType,
          propertySize: formData.propertySize,
          accessInstructions: formData.accessInstructions || undefined
        },
        businessInfo: {
          status: 'pending' as const,
          clientType: formData.clientType,
          joinDate: new Date().toISOString().split('T')[0],
          source: formData.source,
          lifetime_value: 0,
          risk_level: 'low' as const
        },
        subscription: {
          isActive: false,
          plan: formData.plan || 'To be determined',
          frequency: formData.frequency,
          nextService: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          autoRenewal: formData.autoRenewal,
          monthlyValue: 0
        },
        serviceHistory: [],
        notes: formData.notes ? [{
          id: `note_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          author: 'Admin',
          type: 'general' as const,
          content: formData.notes,
          isPrivate: false
        }] : [],
        documents: [],
        emergencyContact: (formData.emergencyName && formData.emergencyPhone) ? {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relationship: formData.emergencyRelationship
        } : undefined
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSubmit(clientData);
      onClose();
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (field: 'phone' | 'alternatePhone' | 'emergencyPhone') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, [field]: formatted }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-neutral-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-neutral-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-neutral-900 px-4 pt-5 pb-4 sm:p-6">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-6">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  Add New Client
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-6">
                {/* Personal Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <User className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    <h4 className="text-md font-medium text-neutral-900 dark:text-neutral-100">
                      Personal Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className={`input w-full ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className={`input w-full ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className={`input w-full ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="john.doe@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange('phone')}
                        className={`input w-full ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="(302) 562-5654"
                        maxLength={14}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Alternate Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.alternatePhone}
                        onChange={handlePhoneChange('alternatePhone')}
                        className="input w-full"
                        placeholder="(302) 562-5654"
                        maxLength={14}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Preferred Contact
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredContact: e.target.value as any }))}
                        className="input w-full"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="text">Text Message</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    <h4 className="text-md font-medium text-neutral-900 dark:text-neutral-100">
                      Property Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                        className={`input w-full ${errors.street ? 'border-red-500' : ''}`}
                        placeholder="123 Main Street"
                      />
                      {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className={`input w-full ${errors.city ? 'border-red-500' : ''}`}
                        placeholder="San Francisco"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        className={`input w-full ${errors.state ? 'border-red-500' : ''}`}
                        placeholder="CA"
                        maxLength={2}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                        className={`input w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                        placeholder="94102"
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value as any, clientType: e.target.value as any }))}
                        className="input w-full"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Property Size
                      </label>
                      <input
                        type="text"
                        value={formData.propertySize}
                        onChange={(e) => setFormData(prev => ({ ...prev, propertySize: e.target.value }))}
                        className="input w-full"
                        placeholder="2,400 sq ft"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Access Instructions
                      </label>
                      <textarea
                        value={formData.accessInstructions}
                        onChange={(e) => setFormData(prev => ({ ...prev, accessInstructions: e.target.value }))}
                        rows={2}
                        className="input w-full"
                        placeholder="Gate code, parking instructions, pet information, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Service Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <Building className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    <h4 className="text-md font-medium text-neutral-900 dark:text-neutral-100">
                      Service Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Lead Source
                      </label>
                      <select
                        value={formData.source}
                        onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value as any }))}
                        className="input w-full"
                      >
                        <option value="website">Website</option>
                        <option value="referral">Referral</option>
                        <option value="advertising">Advertising</option>
                        <option value="repeat">Repeat Customer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Service Frequency
                      </label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                        className="input w-full"
                      >
                        <option value="one-time">One-time Service</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annual">Annual</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Service Plan
                      </label>
                      <input
                        type="text"
                        value={formData.plan}
                        onChange={(e) => setFormData(prev => ({ ...prev, plan: e.target.value }))}
                        className="input w-full"
                        placeholder="e.g., Quarterly Residential, Monthly Commercial"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <div className="flex items-center mb-4">
                    <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    <h4 className="text-md font-medium text-neutral-900 dark:text-neutral-100">
                      Emergency Contact (Optional)
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyName: e.target.value }))}
                        className="input w-full"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={handlePhoneChange('emergencyPhone')}
                        className="input w-full"
                        placeholder="(302) 562-5654"
                        maxLength={14}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyRelationship}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyRelationship: e.target.value }))}
                        className="input w-full"
                        placeholder="Spouse, Manager, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Initial Notes */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Initial Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="input w-full"
                    placeholder="Any special requirements, concerns, or information about this client..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Client
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};