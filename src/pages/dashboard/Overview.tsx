import React from 'react';
import { DashboardStats } from '../../components/dashboard/overview/DashboardStats';
import { ServiceReminder } from '../../components/dashboard/overview/ServiceReminder';
import { IssuesList } from '../../components/dashboard/overview/IssuesList';
import { RecentActivity } from '../../components/dashboard/overview/RecentActivity';

export const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Dashboard</h1>
        <p className="text-dark-600 dark:text-dark-400">Welcome back to your pest control portal</p>
      </div>

      <ServiceReminder />
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IssuesList />
        <RecentActivity />
      </div>
    </div>
  );
};