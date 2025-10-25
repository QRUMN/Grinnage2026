import React from 'react';
import { Card } from '../../components/common/Card';
import { Container } from '../../components/common/Container';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateClient = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create New Client</h1>
          
          <Card>
            <form className="p-8 space-y-8">
              {/* Client Type */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-900 dark:text-white">
                  Client Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Residential', 'Commercial'].map((type) => (
                    <label
                      key={type}
                      className="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <input
                        type="radio"
                        name="clientType"
                        value={type.toLowerCase()}
                        className="sr-only"
                      />
                      <span className="text-lg font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                      placeholder="(302) 562-5654"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Service Address</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                      placeholder="Enter street address"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        maxLength={2}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                        placeholder="DE"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Additional Notes</h2>
                <div>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#56e39f] dark:bg-gray-700 dark:text-white"
                    placeholder="Enter any additional notes about the client..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-white bg-[#56e39f] rounded-lg hover:bg-[#48c98a] transition-colors"
                >
                  Create Client
                </button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
};