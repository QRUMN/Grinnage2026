import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Bell, Search, Settings, Sun, Moon, ChevronDown, Menu, X } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import { Avatar } from '../../ui/avatar';

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [unreadNotifications] = useState(3); // Example state for notification badge

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-800/95 backdrop-blur-xl border-b border-gray-200 dark:border-dark-700 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-none"
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo for desktop */}
          <div className="hidden lg:flex lg:items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#56e39f] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">GRINNAGE</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-dark-700 rounded-lg bg-gray-50 dark:bg-dark-700 text-dark-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right section with user menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* Notifications */}
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-none relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {/* Settings - visible on larger screens */}
            <button className="hidden sm:block p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-none">
              <Settings className="h-5 w-5" />
            </button>
            
            {/* User menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <Avatar 
                  size="sm"
                  name={user?.fullName || 'User'} 
                  src={user?.profileImage}
                  status="online" 
                />
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700">Your Profile</a>
                  <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700">Settings</a>
                  <button 
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="p-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-dark-700 rounded-lg bg-gray-50 dark:bg-dark-700 text-dark-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent text-sm"
                />
              </div>
            </div>
            <a href="/dashboard/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700">
              Settings
            </a>
          </div>
        </div>
      )}
    </header>
  );
};