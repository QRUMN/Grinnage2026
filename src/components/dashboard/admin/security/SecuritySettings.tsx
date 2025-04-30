import React from 'react';
import { Lock, Key, Shield, UserCheck } from 'lucide-react';

export const SecuritySettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Security Settings</h2>
      </div>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
              <Lock className="w-5 h-5 text-mint-500" />
            </div>
            <div>
              <p className="font-medium text-dark-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-sm text-dark-600 dark:text-dark-400">
                Require 2FA for all admin accounts
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
              <Key className="w-5 h-5 text-mint-500" />
            </div>
            <div>
              <p className="font-medium text-dark-900 dark:text-white">Password Policy</p>
              <p className="text-sm text-dark-600 dark:text-dark-400">
                Enforce strong password requirements
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
              <Shield className="w-5 h-5 text-mint-500" />
            </div>
            <div>
              <p className="font-medium text-dark-900 dark:text-white">Brute Force Protection</p>
              <p className="text-sm text-dark-600 dark:text-dark-400">
                Lock accounts after failed attempts
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
              <UserCheck className="w-5 h-5 text-mint-500" />
            </div>
            <div>
              <p className="font-medium text-dark-900 dark:text-white">Session Management</p>
              <p className="text-sm text-dark-600 dark:text-dark-400">
                Auto-logout after inactivity
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
};