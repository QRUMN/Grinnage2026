import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserPlus, Calendar, Settings,
  FileText, BarChart3, LogOut, Menu, X,
  Search, Shield, ChevronDown
} from 'lucide-react';
import { useAdminAuth } from '../../lib/auth';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { NotificationBell } from './NotificationBell';
import { NotificationToast } from './NotificationToast';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  permission?: string;
  badge?: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ProtectedRoute>
  );
};

const AdminLayoutContent: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasPermission } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin',
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: <UserPlus className="w-5 h-5" />,
      path: '/admin/leads',
      permission: 'leads',
      badge: 3 // Mock number of new leads
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/clients',
      permission: 'clients'
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: <Calendar className="w-5 h-5" />,
      path: '/admin/appointments',
      permission: 'appointments',
      badge: 2 // Mock number of pending appointments
    },
    {
      id: 'content',
      label: 'Website Content',
      icon: <FileText className="w-5 h-5" />,
      path: '/admin/content',
      permission: 'content'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/admin/analytics',
      permission: 'analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
      permission: 'settings'
    }
  ];

  const filteredNavItems = navItems.filter(item =>
    !item.permission || hasPermission(item.permission)
  );

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="font-display font-bold text-xl text-primary-600 dark:text-primary-400">
            Grinnage Exterminating
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {filteredNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors",
                isActivePath(item.path)
                  ? "bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
              )}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin Info */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full">
              <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {user?.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 h-16">
          <div className="flex items-center justify-between h-full px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search clients, leads, appointments..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <NotificationBell />

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full">
                    <Shield className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {user?.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigation('/admin/settings')}
                      className="w-full flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Notification Toasts */}
      <NotificationToast />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Click Outside Handler for User Menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  );
};