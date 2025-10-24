import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'soft' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    hover = false,
    interactive = false,
    ...props
  }, ref) => {
    const baseStyles = [
      'overflow-hidden transition-all duration-200',
      'bg-white dark:bg-gray-900'
    ];

    const variants = {
      default: [
        'shadow-sm border border-gray-200 dark:border-gray-800'
      ],
      bordered: [
        'border-2 border-gray-200 dark:border-gray-700'
      ],
      elevated: [
        'shadow-lg border border-gray-100 dark:border-gray-800'
      ],
      soft: [
        'shadow-soft bg-gray-50/50 dark:bg-gray-800/50',
        'backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50'
      ],
      glass: [
        'backdrop-blur-md bg-white/80 dark:bg-gray-900/80',
        'border border-gray-200/20 dark:border-gray-700/20',
        'shadow-lg'
      ]
    };

    const sizes = {
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl'
    };

    const hoverStyles = hover ? [
      'hover:shadow-md hover:-translate-y-1',
      'hover:border-gray-300 dark:hover:border-gray-600'
    ] : [];

    const interactiveStyles = interactive ? [
      'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      'active:scale-[0.98]'
    ] : [];

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          hoverStyles,
          interactiveStyles,
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-6 py-5 border-b border-gray-200 dark:border-gray-800',
      'bg-gray-50/50 dark:bg-gray-800/50',
      className
    )}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold text-gray-900 dark:text-gray-100',
      'leading-tight tracking-tight',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-gray-600 dark:text-gray-400',
      'leading-relaxed mt-1',
      className
    )}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-6 py-5', className)} {...props} />
));

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-6 py-4 border-t border-gray-200 dark:border-gray-800',
      'bg-gray-50/30 dark:bg-gray-800/30',
      className
    )}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';
