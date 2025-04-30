import React from 'react';
import { Image, Palette, Type } from 'lucide-react';

export const BrandingSettings = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Branding Settings</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Logo Upload */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Image className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Company Logo
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
              <button className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
                Upload New Logo
              </button>
            </div>
          </div>
        </div>

        {/* Color Scheme */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Palette className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Brand Colors
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-dark-600 dark:text-dark-400 mb-1">
                  Primary Color
                </label>
                <input
                  type="text"
                  className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500"
                  placeholder="#56E39F"
                />
              </div>
              <div>
                <label className="block text-sm text-dark-600 dark:text-dark-400 mb-1">
                  Secondary Color
                </label>
                <input
                  type="text"
                  className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500"
                  placeholder="#131112"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
            <Type className="w-5 h-5 text-mint-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Typography
            </label>
            <select className="block w-full rounded-lg border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-dark-900 dark:text-white focus:ring-mint-500 focus:border-mint-500">
              <option value="noto">Noto Sans JP</option>
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
            </select>
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