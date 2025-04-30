import React from 'react';
import { Globe, Clock, Mail } from 'lucide-react';

export const GeneralSettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">General Settings</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Language Settings */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
              <Globe className="w-5 h-5 text-mint-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                System Language
              </label>
              <select className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>

          {/* Timezone Settings */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-mint-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                Default Timezone
              </label>
              <select className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500">
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (ET)</option>
                <option value="PST">Pacific Time (PT)</option>
              </select>
            </div>
          </div>

          {/* Email Settings */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
              <Mail className="w-5 h-5 text-mint-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                System Email
              </label>
              <input
                type="email"
                className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500"
                placeholder="system@example.com"
              />
              <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
                Used for system notifications and alerts
              </p>
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