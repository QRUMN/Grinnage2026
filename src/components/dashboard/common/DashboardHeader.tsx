import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Bell, Search, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

export const DashboardHeader = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="max-w-xl w-full lg:max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-dark-700 rounded-lg bg-gray-50 dark:bg-dark-700 text-dark-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Bell className="h-6 w-6" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-mint-500 flex items-center justify-center text-white font-medium">
                {user?.fullName.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};