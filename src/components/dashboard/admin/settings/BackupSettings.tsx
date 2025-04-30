import React from 'react';
import { Database, Download, Calendar, HardDrive } from 'lucide-react';

export const BackupSettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Backup & Recovery</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Backup Schedule */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Calendar className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Backup Schedule
            </label>
            <select className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
              Choose how often to create automatic backups
            </p>
          </div>
        </div>

        {/* Storage Settings */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <HardDrive className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Storage Location
            </label>
            <input
              type="text"
              className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500"
              placeholder="s3://your-bucket/backups"
            />
            <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
              Specify where to store backup files
            </p>
          </div>
        </div>

        {/* Retention Policy */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Database className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Retention Policy
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-dark-600 dark:text-dark-400 mb-1">
                  Keep Backups For
                </label>
                <input
                  type="number"
                  min="1"
                  className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500"
                  defaultValue="30"
                />
              </div>
              <div>
                <label className="block text-sm text-dark-600 dark:text-dark-400 mb-1">
                  Time Unit
                </label>
                <select className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500">
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Backup */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Download className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Manual Backup
            </label>
            <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
              Create Backup Now
            </button>
            <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
              Create an immediate backup of all system data
            </p>
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