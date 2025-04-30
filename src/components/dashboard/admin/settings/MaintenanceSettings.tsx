import React from 'react';
import { PenTool as Tool, Trash2, Archive, Power } from 'lucide-react';

export const MaintenanceSettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">System Maintenance</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Cache Management */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Trash2 className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Cache Management
            </label>
            <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
              Clear System Cache
            </button>
            <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
              Clear temporary files and cached data
            </p>
          </div>
        </div>

        {/* Database Optimization */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Tool className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Database Optimization
            </label>
            <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500">
              Optimize Database
            </button>
            <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
              Run database optimization and cleanup tasks
            </p>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Power className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Maintenance Mode
            </label>
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-600 dark:text-dark-400">
                Enable maintenance mode during system updates
              </p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Archive className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              System Logs
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-600 dark:text-dark-400">Log retention period</span>
                <select className="rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500">
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
              <button className="px-4 py-2 text-mint-500 hover:text-mint-600 border border-mint-500 hover:border-mint-600 rounded-lg transition-colors">
                Download System Logs
              </button>
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