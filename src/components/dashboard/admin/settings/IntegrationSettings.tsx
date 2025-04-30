import React from 'react';
import { Link2, RefreshCw, Key } from 'lucide-react';

export const IntegrationSettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Integrations</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* API Configuration */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Key className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              API Key
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value="••••••••••••••••"
                readOnly
                className="block flex-1 rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500"
              />
              <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
                Generate New
              </button>
            </div>
          </div>
        </div>

        {/* Webhook Settings */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Link2 className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500"
              placeholder="https://your-domain.com/webhook"
            />
            <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
              Receive real-time updates for system events
            </p>
          </div>
        </div>

        {/* Sync Settings */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <RefreshCw className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Data Sync
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-600 dark:text-dark-400">Auto-sync enabled</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-600 dark:text-dark-400">Sync frequency</span>
                <select className="rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500">
                  <option value="5">Every 5 minutes</option>
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};