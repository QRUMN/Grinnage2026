import React from 'react';
import { ServiceReminder } from '../overview/ServiceReminder';
import { DashboardStats } from '../overview/DashboardStats';
import { IssuesList } from '../overview/IssuesList';
import { RecentActivity } from '../overview/RecentActivity';

export const ResidentialDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Residential Dashboard</h1>
        <p className="text-dark-600 dark:text-dark-400">Welcome to your pest control portal</p>
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