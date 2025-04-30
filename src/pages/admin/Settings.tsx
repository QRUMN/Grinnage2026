import React from 'react';
import { GeneralSettings } from '../../components/dashboard/admin/settings/GeneralSettings';
import { BrandingSettings } from '../../components/dashboard/admin/settings/BrandingSettings';
import { IntegrationSettings } from '../../components/dashboard/admin/settings/IntegrationSettings';
import { BackupSettings } from '../../components/dashboard/admin/settings/BackupSettings';
import { MaintenanceSettings } from '../../components/dashboard/admin/settings/MaintenanceSettings';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Settings</h1>
        <p className="text-dark-600 dark:text-dark-400">Manage system-wide settings and configurations</p>
      </div>

      <div className="space-y-6">
        <GeneralSettings />
        <BrandingSettings />
        <IntegrationSettings />
        <BackupSettings />
        <MaintenanceSettings />
      </div>
    </div>
  );
};