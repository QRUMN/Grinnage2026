import React from 'react';
import { File, Download, Eye } from 'lucide-react';

const documents = [
  {
    id: '1',
    name: 'Service Agreement.pdf',
    type: 'PDF',
    size: '2.4 MB',
    date: '2024-03-01'
  },
  {
    id: '2',
    name: 'Treatment Report - Feb 2024.pdf',
    type: 'PDF',
    size: '1.8 MB',
    date: '2024-02-15'
  }
];

export const DocumentList = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Documents</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <File className="w-6 h-6 text-mint-500 mr-3" />
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">{doc.name}</p>
                  <p className="text-sm text-dark-600 dark:text-dark-400">
                    {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-dark-600 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};