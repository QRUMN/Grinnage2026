import React from 'react';
import { Calendar, CreditCard, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Next Service"
        value="Mar 15"
        icon={<Calendar className="w-6 h-6" />}
        change={{ value: "In 5 days", type: "neutral" }}
      />
      <StatCard
        title="Active Plan"
        value="Premium"
        icon={<CreditCard className="w-6 h-6" />}
        change={{ value: "Monthly", type: "neutral" }}
      />
      <StatCard
        title="Completed Services"
        value="12"
        icon={<CheckCircle className="w-6 h-6" />}
        change={{ value: "+2 this month", type: "increase" }}
      />
      <StatCard
        title="Service History"
        value="1 Year"
        icon={<Clock className="w-6 h-6" />}
        change={{ value: "Since 2023", type: "neutral" }}
      />
    </div>
  );
};