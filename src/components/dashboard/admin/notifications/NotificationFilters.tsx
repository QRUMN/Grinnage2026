import React from 'react';
import { Search, Filter, Trash2 } from 'lucide-react';

export const NotificationFilters = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex-1 w-full sm:w-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search notifications..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent">
            <option value="">All Types</option>
            <option value="alert">Alerts</option>
            <option value="info">Information</option>
            <option value="success">Success</option>
          </select>
        </div>

        <div className="relative flex-1 sm:flex-none">
          <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent">
            <option value="">All Severity</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>

        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </button>
      </div>
    </div>
  );
};