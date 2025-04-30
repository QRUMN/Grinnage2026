import React from 'react';
import { User, Clock, Activity, Search, Filter } from 'lucide-react';

const auditLogs = [
  {
    id: '1',
    action: 'user_login',
    user: 'john@example.com',
    details: { ip: '192.168.1.100', browser: 'Chrome' },
    timestamp: '2024-03-10T10:00:00Z'
  },
  {
    id: '2',
    action: 'settings_update',
    user: 'admin@example.com',
    details: { component: 'security', changed_by: 'admin@example.com' },
    timestamp: '2024-03-10T09:45:00Z'
  }
];

export const AuditLogViewer = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Audit Log</h2>
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search audit logs..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent">
              <option value="">All Actions</option>
              <option value="user_login">User Login</option>
              <option value="settings_update">Settings Update</option>
              <option value="security_alert">Security Alert</option>
            </select>

            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {auditLogs.map((log) => (
          <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                  <Activity className="w-5 h-5 text-mint-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-dark-900 dark:text-white">
                      {log.action.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-dark-500 dark:text-dark-400">
                      by {log.user}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-dark-600 dark:text-dark-400">
                    {Object.entries(log.details).map(([key, value]) => (
                      <span key={key} className="mr-4">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-sm text-dark-500 dark:text-dark-400">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-dark-700 dark:text-dark-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">50</span> entries
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};