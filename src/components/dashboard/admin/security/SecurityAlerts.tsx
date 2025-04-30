import React from 'react';
import { AlertTriangle, Shield, Info, XCircle, Clock } from 'lucide-react';

const alerts = [
  {
    id: '1',
    type: 'warning',
    message: 'Multiple failed login attempts detected',
    source: '192.168.1.105',
    location: 'Authentication Service',
    severity: 'medium',
    timestamp: '2024-03-10T10:30:00Z'
  },
  {
    id: '2',
    type: 'info',
    message: 'Security policy updated',
    source: 'Admin Panel',
    location: 'System Settings',
    severity: 'low',
    timestamp: '2024-03-10T09:15:00Z'
  }
];

export const SecurityAlerts = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <Shield className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <XCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Security Alerts</h2>
        <button className="text-sm text-mint-500 hover:text-mint-600">View All</button>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-dark-900 dark:text-white">{alert.message}</h3>
                    <p className="text-sm text-dark-600 dark:text-dark-400">
                      {alert.source} • {alert.location}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-dark-500 dark:text-dark-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity} severity
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};