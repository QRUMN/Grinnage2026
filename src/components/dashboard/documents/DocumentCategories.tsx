import React from 'react';
import { FileText, FileCheck, FileWarning, FileClock } from 'lucide-react';

const categories = [
  {
    id: 'contracts',
    name: 'Contracts & Agreements',
    icon: <FileCheck className="w-5 h-5" />,
    count: 3
  },
  {
    id: 'reports',
    name: 'Treatment Reports',
    icon: <FileText className="w-5 h-5" />,
    count: 8
  },
  {
    id: 'inspections',
    name: 'Inspection Records',
    icon: <FileWarning className="w-5 h-5" />,
    count: 5
  },
  {
    id: 'schedules',
    name: 'Service Schedules',
    icon: <FileClock className="w-5 h-5" />,
    count: 2
  }
];

export const DocumentCategories = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Categories</h2>
      </div>
      <div className="p-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            selectedCategory === 'all'
              ? 'bg-mint-50 dark:bg-mint-900/20 text-mint-700 dark:text-mint-300'
              : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-dark-900 dark:text-white'
          }`}
        >
          All Documents
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-mint-50 dark:bg-mint-900/20 text-mint-700 dark:text-mint-300'
                : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-dark-900 dark:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`${
                  selectedCategory === category.id
                    ? 'text-mint-500'
                    : 'text-dark-400 dark:text-dark-500'
                }`}>
                  {category.icon}
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-dark-500 dark:text-dark-400">
                {category.count}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};