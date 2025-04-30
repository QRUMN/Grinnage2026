import React from 'react';
import { OrganizationList } from '../../components/dashboard/admin/organizations/OrganizationList';
import { OrganizationFilters } from '../../components/dashboard/admin/organizations/OrganizationFilters';
import { OrganizationStats } from '../../components/dashboard/admin/organizations/OrganizationStats';

export const Organizations = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Organizations</h1>
        <p className="text-dark-600 dark:text-dark-400">Manage business accounts and organizations</p>
      </div>

      <OrganizationStats />
      <OrganizationFilters />
      <OrganizationList />
    </div>
  );
};