import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, FileText, Calendar } from 'lucide-react';
import { DashboardCard } from '../../components/dashboard/common/DashboardCard';

interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  createdAt: string;
  description: string;
}

export const Billing = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      clientName: 'John Smith',
      amount: 299.99,
      status: 'pending',
      dueDate: '2024-04-15',
      createdAt: '2024-03-15',
      description: 'Monthly Pest Control Service - March 2024'
    },
    {
      id: '2',
      clientName: 'Tech Solutions Inc',
      amount: 599.99,
      status: 'paid',
      dueDate: '2024-03-30',
      createdAt: '2024-03-01',
      description: 'Quarterly Commercial Service'
    }
  ]);

  const [showCreateInvoice, setShowCreateInvoice] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoice Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage client invoices</p>
        </div>
        <button
          onClick={() => setShowCreateInvoice(true)}
          className="flex items-center px-4 py-2 bg-[#56e39f] text-white rounded-lg hover:bg-[#48c98a] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Invoice
        </button>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,289.00</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Invoices</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-sm text-yellow-600">$3,240.00 pending</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overdue Invoices</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              <p className="text-sm text-red-600">$890.00 overdue</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Invoice List */}
      <DashboardCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search invoices..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent">
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>

            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      #{invoice.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{invoice.clientName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{invoice.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ${invoice.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#56e39f] hover:text-[#48c98a] mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};