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
      gray: 'bg-dark-surface/20',
      primary: 'bg-dark-surface/40 backdrop-blur-sm',
      gradient: [
        'bg-gradient-to-br from-dark-bg via-dark-surface to-dark-card',
        'relative overflow-hidden'
      ],
      mesh: [
        'bg-gradient-to-br from-dark-bg to-dark-surface',
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.05),transparent_50%)]'
      ]
    };

    const variantStyles = {
      default: '',
      feature: 'relative overflow-hidden',
      hero: [
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-dark-bg/50'
      ],
      testimonial: [
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-r',
        'before:from-neon-green/5 before:via-transparent before:to-accent-500/5'
      ],
      cta: [
        'relative overflow-hidden',
        'bg-gradient-to-r from-neon-green/90 to-neon-green-dark',
        'shadow-glow-xl'
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
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-20 left-1/4 w-72 h-72 bg-neon-green rounded-full mix-blend-screen filter blur-3xl animate-float-slow" />
              <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-neon-cyan rounded-full mix-blend-screen filter blur-3xl animate-float-fast" style={{ animationDelay: '4s' }} />
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
            'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold',
            'bg-neon-green/20 text-neon-green border border-neon-green/30',
            'backdrop-blur-sm shadow-glow',
            !centered && 'mb-2'
          )}>
            {badge}
          </div>
        )}

        {subtitle && (
          <p className={cn(
            'font-medium text-neon-green tracking-wide uppercase',
            subtitleSizes[size]
          )}>
            {subtitle}
          </p>
        )}

        <h2 className={cn(
          'font-display font-bold text-white tracking-tight',
          titleSizes[size]
        )}>
          {title}
        </h2>

        {description && (
          <p className={cn(
            'text-gray-300 leading-relaxed',
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