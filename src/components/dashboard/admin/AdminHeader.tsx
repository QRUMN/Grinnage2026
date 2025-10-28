import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { ThemeToggle } from '../../common/ThemeToggle';

export const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#313131] border-b border-gray-700">
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white">
              <Bell className="h-6 w-6" />
            </button>
            <ThemeToggle />
            <button className="p-2 text-gray-400 hover:text-white">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-[#56e39f] flex items-center justify-center text-[#313131] font-medium">
                {user?.fullName.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};