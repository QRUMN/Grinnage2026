import React from 'react';
import { cn } from '../../../utils/cn';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const DashboardCard = ({ children, className, title, action }: DashboardCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700",
      className
    )}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-700 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-dark-900 dark:text-white">
              {title}
            </h2>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};