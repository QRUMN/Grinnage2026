import React from 'react';
import { cn } from '../../lib/utils';
import { getInitials } from '../../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = 'md', status, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const statusClasses = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    };

    const fallbackColors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-purple-500',
      'bg-indigo-500',
    ];

    const getFallbackColor = (name?: string) => {
      if (!name) return fallbackColors[0];
      const charCode = name.charCodeAt(0);
      return fallbackColors[charCode % fallbackColors.length];
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex rounded-full overflow-hidden', sizeClasses[size], className)}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div
            className={cn(
              'flex items-center justify-center w-full h-full text-white font-medium',
              getFallbackColor(name)
            )}
          >
            {name ? getInitials(name) : '?'}
          </div>
        )}
        
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-dark-800',
              statusClasses[status],
              {
                'h-2 w-2': size === 'sm',
                'h-2.5 w-2.5': size === 'md',
                'h-3 w-3': size === 'lg',
                'h-3.5 w-3.5': size === 'xl',
              }
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
