import React from 'react';
import { Lock, Key, Shield, Smartphone } from 'lucide-react';

export const SecuritySettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Security Settings</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Password Change Section */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Lock className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white">Change Password</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Update your password regularly to keep your account secure
                </p>
              </div>
              <button className="px-4 py-2 text-mint-500 hover:text-mint-600 border border-mint-500 hover:border-mint-600 rounded-lg transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Smartphone className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white">Two-Factor Authentication</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 dark:peer-focus:ring-mint-800 rounded-full peer dark:bg-dark-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-600 peer-checked:bg-mint-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Key className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white">API Keys</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Manage API keys for third-party integrations
                </p>
              </div>
              <button className="px-4 py-2 text-mint-500 hover:text-mint-600 border border-mint-500 hover:border-mint-600 rounded-lg transition-colors">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Security Log */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Shield className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white">Security Log</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  View recent security events and login activity
                </p>
              </div>
              <button className="px-4 py-2 text-mint-500 hover:text-mint-600 border border-mint-500 hover:border-mint-600 rounded-lg transition-colors">
                View Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};