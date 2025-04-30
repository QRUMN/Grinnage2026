import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'consultation';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
        variant === 'primary' && 'bg-[#56e39f] text-white hover:bg-[#48c98a]',
        variant === 'secondary' && 'bg-gray-800 text-white hover:bg-gray-700',
        variant === 'consultation' && 'bg-[#56e39f] text-white hover:bg-[#48c98a] px-6 py-3',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56e39f]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};