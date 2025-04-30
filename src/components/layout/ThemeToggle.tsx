import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-lg transition-colors duration-200",
        "hover:bg-surface-200 dark:hover:bg-content-800",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-content-900"
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className={cn(
        "w-5 h-5 text-accent-500 transition-all duration-300",
        theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
      )} />
      <Moon className={cn(
        "w-5 h-5 text-surface-50 absolute top-2 left-2 transition-all duration-300",
        theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      )} />
    </button>
  );
};