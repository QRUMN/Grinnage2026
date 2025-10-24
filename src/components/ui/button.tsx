import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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

    const baseStyles = [
      'relative inline-flex items-center justify-center font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'overflow-hidden group'
    ];

    const variants = {
      primary: [
        'bg-primary-600 hover:bg-primary-700 active:bg-primary-800',
        'text-white shadow-sm hover:shadow-md',
        'focus:ring-primary-500',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'
      ],
      secondary: [
        'bg-gray-100 hover:bg-gray-200 active:bg-gray-300',
        'dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600',
        'text-gray-900 dark:text-gray-100',
        'shadow-sm hover:shadow-md',
        'focus:ring-gray-500'
      ],
      outline: [
        'border-2 border-primary-600 hover:border-primary-700',
        'text-primary-600 hover:text-primary-700 active:text-primary-800',
        'hover:bg-primary-50 active:bg-primary-100',
        'dark:border-primary-400 dark:text-primary-400 dark:hover:text-primary-300',
        'dark:hover:bg-primary-950 dark:active:bg-primary-900',
        'focus:ring-primary-500'
      ],
      ghost: [
        'text-gray-700 hover:text-gray-900 active:text-gray-900',
        'dark:text-gray-300 dark:hover:text-gray-100 dark:active:text-gray-100',
        'hover:bg-gray-100 active:bg-gray-200',
        'dark:hover:bg-gray-800 dark:active:bg-gray-700',
        'focus:ring-gray-500'
      ],
      danger: [
        'bg-error-600 hover:bg-error-700 active:bg-error-800',
        'text-white shadow-sm hover:shadow-md',
        'focus:ring-error-500'
      ],
      success: [
        'bg-success-600 hover:bg-success-700 active:bg-success-800',
        'text-white shadow-sm hover:shadow-md',
        'focus:ring-success-500'
      ]
    };

    const sizes = {
      xs: 'px-2 py-1 text-xs rounded-md',
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-6 py-2.5 text-base rounded-lg',
      xl: 'px-8 py-3 text-lg rounded-xl'
    };

    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6'
    };

    const iconSpacing = {
      xs: iconPosition === 'left' ? 'mr-1' : 'ml-1',
      sm: iconPosition === 'left' ? 'mr-1.5' : 'ml-1.5',
      md: iconPosition === 'left' ? 'mr-2' : 'ml-2',
      lg: iconPosition === 'left' ? 'mr-2.5' : 'ml-2.5',
      xl: iconPosition === 'left' ? 'mr-3' : 'ml-3'
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin',
            iconSizes[size]
          )} />
        )}

        <span className={cn('flex items-center relative z-10', { 'opacity-0': loading })}>
          {icon && iconPosition === 'left' && (
            <span className={cn(iconSizes[size], iconSpacing[size])}>
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className={cn(iconSizes[size], iconSpacing[size])}>
              {icon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
