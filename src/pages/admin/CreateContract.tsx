import React from 'react';
import { Card } from '../../components/common/Card';
import { Container } from '../../components/common/Container';

export const CreateContract = () => {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Contract</h1>
        <Card>
          <div className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                    Client
                  </label>
                  <select
                    id="client"
                    name="client"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option>Select a client...</option>
                    <option>John Smith</option>
                    <option>Tech Solutions Inc</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option>Select service type...</option>
                    <option>Monthly Service</option>
                    <option>Quarterly Service</option>
                    <option>Annual Service</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contractValue" className="block text-sm font-medium text-gray-700">
                    Contract Value
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="contractValue"
                      id="contractValue"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
                    Contract Terms
                  </label>
                  <textarea
                    id="terms"
                    name="terms"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Enter contract terms and conditions..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Create Contract
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </Container>
  );
};