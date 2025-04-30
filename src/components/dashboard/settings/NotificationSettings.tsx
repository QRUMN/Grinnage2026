import React from 'react';
import { Bell, Mail, Phone, Calendar } from 'lucide-react';

export const NotificationSettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Notification Settings</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-mint-500" />
              </div>
              <div>
                <p className="font-medium text-dark-900 dark:text-white">Appointment Reminders</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Get notified about upcoming service appointments
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                <Mail className="w-5 h-5 text-mint-500" />
              </div>
              <div>
                <p className="font-medium text-dark-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Receive service updates via email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                <Phone className="w-5 h-5 text-mint-500" />
              </div>
              <div>
                <p className="font-medium text-dark-900 dark:text-white">SMS Notifications</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Get text messages for important updates
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                <Bell className="w-5 h-5 text-mint-500" />
              </div>
              <div>
                <p className="font-medium text-dark-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Receive notifications in your browser
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
            </label>
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