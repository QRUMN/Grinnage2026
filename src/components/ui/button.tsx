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
        'bg-neon-green hover:bg-neon-green-dark active:bg-neon-green-dark',
        'text-dark-bg font-semibold shadow-glow hover:shadow-glow-lg',
        'focus:ring-2 focus:ring-neon-green/50',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
        'hover:scale-105 active:scale-95'
      ],
      secondary: [
        'bg-dark-surface/80 hover:bg-dark-hover active:bg-dark-hover',
        'backdrop-blur-sm border border-dark-border',
        'hover:border-neon-green/30 hover:shadow-glow',
        'text-gray-100 shadow-sm',
        'focus:ring-2 focus:ring-neon-green/30'
      ],
      outline: [
        'border-2 border-neon-green/50 hover:border-neon-green',
        'text-neon-green hover:text-neon-green-dark',
        'hover:bg-neon-green/10 active:bg-neon-green/20',
        'backdrop-blur-sm hover:shadow-glow',
        'focus:ring-2 focus:ring-neon-green/50'
      ],
      ghost: [
        'text-gray-300 hover:text-neon-green',
        'hover:bg-dark-surface/40 active:bg-dark-surface/60',
        'backdrop-blur-sm',
        'focus:ring-2 focus:ring-neon-green/30'
      ],
      danger: [
        'bg-error-600 hover:bg-error-700 active:bg-error-800',
        'text-white shadow-glow-cyan hover:shadow-glow-cyan-lg',
        'focus:ring-2 focus:ring-error-500/50'
      ],
      success: [
        'bg-success-600 hover:bg-success-700 active:bg-success-800',
        'text-white shadow-glow hover:shadow-glow-lg',
        'focus:ring-2 focus:ring-success-500/50'
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
