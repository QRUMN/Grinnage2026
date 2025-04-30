import React from 'react';
import { Upload, Image, Film, Mic } from 'lucide-react';

export const MediaUploader = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Upload Media</h2>
      </div>
      <div className="p-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-dark-700 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-mint-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-2">
            Drag and drop files here
          </h3>
          <p className="text-dark-600 dark:text-dark-400 mb-4">
            or click to browse from your computer
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <Image className="w-6 h-6 text-mint-500 mx-auto mb-2" />
              <span className="text-sm text-dark-600 dark:text-dark-400">Images</span>
            </div>
            <div className="text-center">
              <Film className="w-6 h-6 text-mint-500 mx-auto mb-2" />
              <span className="text-sm text-dark-600 dark:text-dark-400">Videos</span>
            </div>
            <div className="text-center">
              <Mic className="w-6 h-6 text-mint-500 mx-auto mb-2" />
              <span className="text-sm text-dark-600 dark:text-dark-400">Audio</span>
            </div>
          </div>
          <input type="file" className="hidden" multiple accept="image/*,video/*,audio/*" />
        </div>
      </div>
    </div>
  );
};