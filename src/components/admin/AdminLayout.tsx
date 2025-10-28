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
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 glass-dark border-r border-neon-green/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-neon-green/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neon-green/20 flex items-center justify-center shadow-glow">
              <Shield className="w-5 h-5 text-neon-green" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-hover text-gray-400 hover:text-neon-green transition-colors"
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
                "w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all duration-300",
                isActivePath(item.path)
                  ? "bg-neon-green/20 text-neon-green border border-neon-green/30 shadow-glow"
                  : "text-gray-300 hover:bg-dark-surface/40 hover:text-neon-green border border-transparent hover:border-neon-green/20"
              )}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-neon-green text-dark-bg text-xs font-bold px-2 py-1 rounded-full shadow-glow">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin Info */}
        <div className="p-4 border-t border-neon-green/20">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-surface/40 border border-dark-border">
            <div className="flex items-center justify-center w-10 h-10 bg-neon-green/20 rounded-lg shadow-glow">
              <Shield className="w-5 h-5 text-neon-green" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="glass-dark border-b border-neon-green/20 h-16">
          <div className="flex items-center justify-between h-full px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-hover text-gray-400 hover:text-neon-green transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search clients, leads, appointments..."
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-surface/60 backdrop-blur-sm border border-dark-border 
                           rounded-xl text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-neon-green/30 focus:border-neon-green/50
                           transition-all duration-300"
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
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-hover text-gray-300 hover:text-neon-green transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-neon-green/20 rounded-lg shadow-glow">
                    <Shield className="w-4 h-4 text-neon-green" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-dark border border-neon-green/20 rounded-xl shadow-glow py-2 z-50">
                    <div className="px-4 py-3 border-b border-neon-green/20">
                      <p className="text-sm font-semibold text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigation('/admin/settings')}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-gray-300 hover:text-neon-green hover:bg-dark-surface/40 transition-all"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-error-400 hover:bg-dark-surface/40 transition-all"
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
        <main className="flex-1 p-6 bg-dark-bg">
          {children}
        </main>
      </div>

      {/* Notification Toasts */}
      <NotificationToast />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-40 lg:hidden"
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