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
      'relative overflow-hidden transition-all duration-300',
      'bg-dark-surface/40'
    ];

    const variants = {
      default: [
        'backdrop-blur-md border border-dark-border shadow-sm'
      ],
      bordered: [
        'border-2 border-neon-green/30 shadow-glow'
      ],
      elevated: [
        'backdrop-blur-lg shadow-glow-lg border border-neon-green/20',
        'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-dark-surface/60 before:to-dark-bg/60'
      ],
      soft: [
        'backdrop-blur-sm bg-dark-surface/20 border border-dark-border/50'
      ],
      glass: [
        'backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40',
        'border border-neon-green/20 shadow-lg',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-neon-green/5 before:to-transparent',
        'hover:before:translate-x-full before:transition-transform before:duration-1000'
      ]
    };

    const sizes = {
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl'
    };

    const hoverStyles = hover ? [
      'hover:shadow-glow hover:-translate-y-1',
      'hover:border-neon-green/30 hover:bg-dark-surface/60',
      'hover:scale-[1.02]'
    ] : [];

    const interactiveStyles = interactive ? [
      'cursor-pointer focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:ring-offset-2 focus:ring-offset-dark-bg',
      'active:scale-[0.98]',
      'hover:animate-neon-pulse'
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
