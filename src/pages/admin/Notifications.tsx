import React from 'react';
import { NotificationList } from '../../components/dashboard/admin/notifications/NotificationList';
import { NotificationFilters } from '../../components/dashboard/admin/notifications/NotificationFilters';
import { NotificationStats } from '../../components/dashboard/admin/notifications/NotificationStats';
import { NotificationSettings } from '../../components/dashboard/admin/notifications/NotificationSettings';

export const Notifications = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Notifications</h1>
        <p className="text-dark-600 dark:text-dark-400">Manage system notifications and alerts</p>
      </div>

      <NotificationStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NotificationFilters />
          <NotificationList />
        </div>
        <div>
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
};