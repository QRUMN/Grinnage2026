import React from 'react';
import { cn } from '../../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  className?: string;
}

export const StatCard = ({ title, value, icon, change, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700 p-6",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-mint-50 dark:bg-mint-900/20 rounded-lg text-mint-500">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-dark-900 dark:text-white mt-1">{value}</p>
          </div>
        </div>
        {change && (
          <div className={cn(
            "text-sm font-medium",
            change.type === 'increase' && "text-green-500",
            change.type === 'decrease' && "text-red-500",
            change.type === 'neutral' && "text-gray-500"
          )}>
            {change.value}
          </div>
        )}
      </div>
    </div>
  );
};