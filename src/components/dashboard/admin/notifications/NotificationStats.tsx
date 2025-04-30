import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '../../common/StatCard';

export const NotificationStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Notifications"
        value="156"
        icon={<Bell className="w-6 h-6" />}
        change={{ value: "+23 today", type: "increase" }}
      />
      <StatCard
        title="Unread Alerts"
        value="8"
        icon={<AlertTriangle className="w-6 h-6" />}
        change={{ value: "Requires attention", type: "neutral" }}
      />
      <StatCard
        title="Resolved"
        value="142"
        icon={<CheckCircle className="w-6 h-6" />}
        change={{ value: "91% resolution rate", type: "increase" }}
      />
      <StatCard
        title="Average Response"
        value="2.5h"
        icon={<Clock className="w-6 h-6" />}
        change={{ value: "-30min this week", type: "decrease" }}
      />
    </div>
  );
};