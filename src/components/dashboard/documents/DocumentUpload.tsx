import React from 'react';
import { Upload, Plus } from 'lucide-react';

export const DocumentUpload = () => {
  return (
    <div className="space-y-4">
      <button className="flex items-center px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors">
        <Plus className="w-5 h-5 mr-2" />
        Upload Document
      </button>

      <div className="hidden">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm p-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-dark-700 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-mint-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-2">
              Drop files here
            </h3>
            <p className="text-dark-600 dark:text-dark-400 mb-4">
              or click to browse from your computer
            </p>
            <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx" />
            <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors">
              Select Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};