import React from 'react';
import { Shield, AlertTriangle, UserCheck, FileCheck } from 'lucide-react';
import { StatCard } from '../../common/StatCard';

export const SecurityOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Security Score"
        value="98/100"
        icon={<Shield className="w-6 h-6" />}
        change={{ value: "+3 points", type: "increase" }}
      />
      <StatCard
        title="Active Alerts"
        value="2"
        icon={<AlertTriangle className="w-6 h-6" />}
        change={{ value: "-5 this week", type: "decrease" }}
      />
      <StatCard
        title="Auth Success Rate"
        value="99.8%"
        icon={<UserCheck className="w-6 h-6" />}
        change={{ value: "Last 24h", type: "neutral" }}
      />
      <StatCard
        title="Policy Compliance"
        value="100%"
        icon={<FileCheck className="w-6 h-6" />}
        change={{ value: "All checks passed", type: "neutral" }}
      />
    </div>
  );
};