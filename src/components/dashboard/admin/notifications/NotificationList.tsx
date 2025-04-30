import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock, MoreVertical, Trash2, Eye } from 'lucide-react';

const notifications = [
  {
    id: '1',
    type: 'alert',
    title: 'System Alert',
    message: 'High CPU usage detected on main server',
    severity: 'high',
    timestamp: '2024-03-10T10:30:00Z',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'Maintenance Update',
    message: 'Scheduled maintenance completed successfully',
    severity: 'low',
    timestamp: '2024-03-10T09:15:00Z',
    read: true
  },
  {
    id: '3',
    type: 'success',
    title: 'Backup Complete',
    message: 'System backup completed successfully',
    severity: 'low',
    timestamp: '2024-03-10T08:45:00Z',
    read: true
  }
];

export const NotificationList = () => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-mint-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm mt-6">
      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 hover:bg-gray-50 dark:hover:bg-dark-700 ${
              !notification.read ? 'bg-mint-50 dark:bg-mint-900/10' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white dark:bg-dark-900 rounded-lg">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-dark-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-dark-600 dark:text-dark-400">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-sm text-dark-500 dark:text-dark-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-dark-400 hover:text-dark-900 dark:hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-dark-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-dark-400 hover:text-dark-900 dark:hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-dark-700 dark:text-dark-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">50</span> notifications
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};