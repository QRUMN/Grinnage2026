import React from 'react';
import { Building2, Users, MapPin, Briefcase } from 'lucide-react';
import { StatCard } from '../../common/StatCard';

export const OrganizationStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Organizations"
        value="847"
        icon={<Building2 className="w-6 h-6" />}
        change={{ value: "+12 this month", type: "increase" }}
      />
      <StatCard
        title="Total Locations"
        value="1,234"
        icon={<MapPin className="w-6 h-6" />}
        change={{ value: "+45 this quarter", type: "increase" }}
      />
      <StatCard
        title="Active Contracts"
        value="789"
        icon={<Briefcase className="w-6 h-6" />}
        change={{ value: "93.2%", type: "neutral" }}
      />
      <StatCard
        title="Total Employees"
        value="15.4K"
        icon={<Users className="w-6 h-6" />}
        change={{ value: "+1.2K this year", type: "increase" }}
      />
    </div>
  );
};