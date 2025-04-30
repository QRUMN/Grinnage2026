import React from 'react';
import { Activity, Calendar, Wrench, FileText } from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'service',
    title: 'Pest Inspection Completed',
    date: '2024-03-01',
    description: 'Regular monthly inspection'
  },
  {
    id: '2',
    type: 'document',
    title: 'Treatment Report Added',
    date: '2024-02-28',
    description: 'February treatment documentation'
  },
  {
    id: '3',
    type: 'appointment',
    title: 'Next Service Scheduled',
    date: '2024-02-27',
    description: 'Scheduled for March 15'
  }
];

export const RecentActivity = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Wrench className="w-5 h-5 text-mint-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-mint-500" />;
      case 'appointment':
        return <Calendar className="w-5 h-5 text-mint-500" />;
      default:
        return <Activity className="w-5 h-5 text-mint-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white">{activity.title}</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400">{activity.description}</p>
                <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};