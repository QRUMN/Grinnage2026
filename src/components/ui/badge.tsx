import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          {
            // Variant styles
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': variant === 'default',
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': variant === 'success',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': variant === 'warning',
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': variant === 'danger',
            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': variant === 'info',
            'bg-transparent border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300': variant === 'outline',
            
            // Size styles
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-0.5 text-sm': size === 'md',
            'px-3 py-1 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
