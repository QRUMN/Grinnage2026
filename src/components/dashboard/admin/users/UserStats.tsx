import React from 'react';
import { Users, Building2, UserCheck, UserX } from 'lucide-react';
import { StatCard } from '../../common/StatCard';

export const UserStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value="2,456"
        icon={<Users className="w-6 h-6" />}
        change={{ value: "+125 this month", type: "increase" }}
      />
      <StatCard
        title="Business Accounts"
        value="847"
        icon={<Building2 className="w-6 h-6" />}
        change={{ value: "+12 this week", type: "increase" }}
      />
      <StatCard
        title="Active Users"
        value="2,100"
        icon={<UserCheck className="w-6 h-6" />}
        change={{ value: "85.5%", type: "neutral" }}
      />
      <StatCard
        title="Suspended Users"
        value="23"
        icon={<UserX className="w-6 h-6" />}
        change={{ value: "-5 this week", type: "decrease" }}
      />
    </div>
  );
};