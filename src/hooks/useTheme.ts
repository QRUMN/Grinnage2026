import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { themeAtom } from '../store/theme';

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    // Check system preference on mount
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    } else if (isDark) {
      setTheme('dark');
    }
  }, [setTheme]);

  useEffect(() => {
    // Update document class and store preference
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};