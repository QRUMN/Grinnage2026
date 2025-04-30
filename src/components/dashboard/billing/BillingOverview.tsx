import React from 'react';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';

export const BillingOverview = () => {
  const currentPlan = {
    name: 'Premium Plan',
    price: 199.99,
    billingCycle: 'monthly',
    nextBilling: '2024-04-01'
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Billing Overview</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-dark-900 dark:text-white">
              {currentPlan.name}
            </h3>
            <p className="text-dark-600 dark:text-dark-400">
              ${currentPlan.price}/month
            </p>
          </div>
          <button className="px-4 py-2 text-mint-500 hover:text-mint-600 border border-mint-500 hover:border-mint-600 rounded-lg transition-colors">
            Change Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-mint-500" />
            </div>
            <div>
              <p className="font-medium text-dark-900 dark:text-white">Next Billing Date</p>
              <p className="text-dark-600 dark:text-dark-400">
                {new Date(currentPlan.nextBilling).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
              <CreditCard className="w-5 h-5 text-mint-500" />
            </div>
            <div>
              <p className="font-medium text-dark-900 dark:text-white">Payment Method</p>
              <p className="text-dark-600 dark:text-dark-400">Visa ending in 4242</p>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Your subscription will automatically renew on {new Date(currentPlan.nextBilling).toLocaleDateString()}. 
            Cancel anytime before the renewal date to avoid charges.
          </p>
        </div>
      </div>
    </div>
  );
};