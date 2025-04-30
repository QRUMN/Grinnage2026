import React from 'react';
import { cn } from '../../../utils/cn';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "block w-full px-4 py-3 rounded-lg",
            "border border-gray-300 dark:border-gray-600",
            "bg-white dark:bg-gray-700",
            "text-gray-900 dark:text-white",
            "focus:ring-2 focus:ring-[#56e39f] focus:border-[#56e39f]",
            "shadow-sm transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';