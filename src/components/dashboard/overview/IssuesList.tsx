import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const issues = [
  {
    id: '1',
    title: 'Ant Activity in Kitchen',
    status: 'active',
    priority: 'high',
    reportedDate: '2024-03-01',
    location: 'Kitchen'
  },
  {
    id: '2',
    title: 'Routine Inspection Due',
    status: 'pending',
    priority: 'medium',
    reportedDate: '2024-03-05',
    location: 'Entire Property'
  }
];

export const IssuesList = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Active Issues</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {issues.map((issue) => (
          <div key={issue.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(issue.status)}
                <div>
                  <h3 className="font-medium text-dark-900 dark:text-white">{issue.title}</h3>
                  <p className="text-sm text-dark-600 dark:text-dark-400">
                    {issue.location} • Reported {new Date(issue.reportedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(issue.priority)}`}>
                {issue.priority} priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};