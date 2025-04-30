import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const paymentMethods = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiry: '12/25',
    isDefault: true
  }
];

export const PaymentMethods = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Payment Methods</h2>
        <button className="text-mint-500 hover:text-mint-600 flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </button>
      </div>
      <div className="p-4 space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg border-gray-200 dark:border-dark-700">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 text-mint-500 mr-3" />
              <div>
                <p className="font-medium text-dark-900 dark:text-white">
                  {method.brand} •••• {method.last4}
                </p>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Expires {method.expiry}
                </p>
              </div>
            </div>
            {method.isDefault && (
              <span className="text-sm text-mint-500 font-medium">Default</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};