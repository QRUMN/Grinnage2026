import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            // Variant styles
            'bg-[#56e39f] hover:bg-[#48c98a] text-white focus:ring-[#56e39f]': variant === 'primary',
            'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-white focus:ring-gray-400': variant === 'secondary',
            'border border-gray-300 hover:bg-gray-100 dark:border-dark-600 dark:hover:bg-dark-700 dark:text-white focus:ring-gray-400': variant === 'outline',
            'bg-transparent hover:bg-gray-100 text-gray-700 dark:hover:bg-dark-700 dark:text-dark-300 focus:ring-gray-400': variant === 'ghost',
            'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600': variant === 'danger',
            
            // Size styles
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-5 py-2.5 text-lg': size === 'lg',
            
            // Width
            'w-full': fullWidth,
            
            // Disabled state
            'opacity-70 cursor-not-allowed': isDisabled,
          },
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        <span className={cn('flex items-center', { 'opacity-0': loading })}>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
