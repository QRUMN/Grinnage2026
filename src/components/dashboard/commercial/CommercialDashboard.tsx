import React from 'react';
import { Building2, Users, FileText, Settings } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { LocationList } from './LocationList';
import { ServiceSchedule } from './ServiceSchedule';

export const CommercialDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Commercial Dashboard</h1>
        <p className="text-dark-600 dark:text-dark-400">Manage your business pest control services</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Locations"
          value="12"
          icon={<Building2 className="w-6 h-6" />}
          change={{ value: "+2 this month", type: "increase" }}
        />
        <StatCard
          title="Service Requests"
          value="28"
          icon={<Users className="w-6 h-6" />}
          change={{ value: "5 pending", type: "neutral" }}
        />
        <StatCard
          title="Completed Services"
          value="156"
          icon={<FileText className="w-6 h-6" />}
          change={{ value: "+12% this month", type: "increase" }}
        />
        <StatCard
          title="Active Contracts"
          value="8"
          icon={<Settings className="w-6 h-6" />}
          change={{ value: "All current", type: "neutral" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LocationList />
        <ServiceSchedule />
      </div>
    </div>
  );
};