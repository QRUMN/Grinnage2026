import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'feature' | 'hero' | 'testimonial' | 'cta';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'gray' | 'primary' | 'gradient' | 'mesh';
  contained?: boolean;
  fullHeight?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({
    className,
    variant = 'default',
    spacing = 'lg',
    background = 'transparent',
    contained = true,
    fullHeight = false,
    children,
    ...props
  }, ref) => {
    const baseStyles = [
      'relative w-full',
      fullHeight && 'min-h-screen flex items-center'
    ];

    const spacingStyles = {
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-20 lg:py-24',
      xl: 'py-20 md:py-24 lg:py-32'
    };

    const backgroundStyles = {
      transparent: '',
      gray: 'bg-gray-50 dark:bg-gray-900',
      primary: 'bg-primary-50 dark:bg-primary-950',
      gradient: [
        'bg-gradient-to-br from-primary-50 via-white to-accent-50',
        'dark:from-primary-950 dark:via-gray-900 dark:to-accent-950'
      ],
      mesh: [
        'bg-gray-50 dark:bg-gray-900',
        'bg-gradient-mesh bg-mesh',
        'relative overflow-hidden'
      ]
    };

    const variantStyles = {
      default: '',
      feature: 'relative overflow-hidden',
      hero: [
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-white/10',
        'dark:before:to-gray-900/10'
      ],
      testimonial: [
        'relative',
        'before:absolute before:inset-0 before:bg-gradient-to-r',
        'before:from-primary-500/5 before:via-transparent before:to-accent-500/5'
      ],
      cta: [
        'relative overflow-hidden',
        'bg-gradient-to-r from-primary-600 to-primary-700',
        'dark:from-primary-700 dark:to-primary-800'
      ]
    };

    return (
      <section
        ref={ref}
        className={cn(
          baseStyles,
          spacingStyles[spacing],
          backgroundStyles[background],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Decorative elements for specific variants */}
        {variant === 'hero' && (
          <>
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply filter blur-xl animate-float" />
              <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-200 dark:bg-accent-800 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary-300 dark:bg-primary-700 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
            </div>
          </>
        )}

        {contained ? (
          <Container>
            {children}
          </Container>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({
    className,
    size = 'lg',
    ...props
  }, ref) => {
    const sizeStyles = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[90rem]',
      full: 'max-w-none'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({
    className,
    title,
    subtitle,
    description,
    centered = true,
    badge,
    size = 'md',
    ...props
  }, ref) => {
    const titleSizes = {
      sm: 'text-2xl md:text-3xl',
      md: 'text-3xl md:text-4xl lg:text-5xl',
      lg: 'text-4xl md:text-5xl lg:text-6xl'
    };

    const subtitleSizes = {
      sm: 'text-sm md:text-base',
      md: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'space-y-4',
          centered && 'text-center',
          className
        )}
        {...props}
      >
        {badge && (
          <div className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
            'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
            !centered && 'mb-2'
          )}>
            {badge}
          </div>
        )}

        {subtitle && (
          <p className={cn(
            'font-medium text-primary-600 dark:text-primary-400 tracking-wide uppercase',
            subtitleSizes[size]
          )}>
            {subtitle}
          </p>
        )}

        <h2 className={cn(
          'font-display font-bold text-gray-900 dark:text-gray-100 tracking-tight',
          titleSizes[size]
        )}>
          {title}
        </h2>

        {description && (
          <p className={cn(
            'text-gray-600 dark:text-gray-400 leading-relaxed',
            size === 'sm' ? 'text-base md:text-lg' :
            size === 'md' ? 'text-lg md:text-xl' :
            'text-xl md:text-2xl',
            centered ? 'mx-auto max-w-3xl' : 'max-w-2xl'
          )}>
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';