import React from 'react';
import { SecurityOverview } from '../../components/dashboard/admin/security/SecurityOverview';
import { SecurityAlerts } from '../../components/dashboard/admin/security/SecurityAlerts';
import { SecuritySettings } from '../../components/dashboard/admin/security/SecuritySettings';
import { AuditLogViewer } from '../../components/dashboard/admin/security/AuditLogViewer';

export const Security = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Security</h1>
        <p className="text-dark-600 dark:text-dark-400">Monitor and manage system security</p>
      </div>

      <SecurityOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SecurityAlerts />
        <SecuritySettings />
      </div>

      <AuditLogViewer />
    </div>
  );
};