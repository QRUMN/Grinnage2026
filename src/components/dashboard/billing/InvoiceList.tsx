import React from 'react';
import { FileText, Download } from 'lucide-react';

const invoices = [
  {
    id: '1',
    date: '2024-03-01',
    amount: 199.99,
    status: 'paid',
    description: 'Monthly Service - March 2024'
  },
  {
    id: '2',
    date: '2024-02-01',
    amount: 199.99,
    status: 'paid',
    description: 'Monthly Service - February 2024'
  }
];

export const InvoiceList = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Recent Invoices</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-mint-500 mr-3" />
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">{invoice.description}</p>
                  <p className="text-sm text-dark-600 dark:text-dark-400">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-dark-900 dark:text-white">
                    ${invoice.amount.toFixed(2)}
                  </p>
                  <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {invoice.status}
                  </span>
                </div>
                <button className="p-2 text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};