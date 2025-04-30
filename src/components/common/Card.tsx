import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
        'border border-gray-200 dark:border-gray-700',
        'p-6 transition-shadow duration-200 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
};