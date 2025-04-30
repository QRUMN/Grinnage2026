import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { 
  Home, Calendar, CreditCard, FileText, Settings, Building2, 
  Users, Activity, Shield, BarChart2, Wrench, LogOut, Bug
} from 'lucide-react';

const getNavItems = (role: string) => {
  switch (role) {
    case 'admin':
      return [
        { icon: <Activity />, label: 'Overview', path: '/admin' },
        { icon: <Users />, label: 'Users', path: '/admin/users' },
        { icon: <BarChart2 />, label: 'Analytics', path: '/admin/analytics' },
        { icon: <Shield />, label: 'Security', path: '/admin/security' },
        { icon: <FileText />, label: 'Audit Logs', path: '/admin/audit-logs' },
        { icon: <Wrench />, label: 'Settings', path: '/admin/settings' }
      ];
    case 'commercial':
      return [
        { icon: <Home />, label: 'Overview', path: '/commercial' },
        { icon: <Building2 />, label: 'Locations', path: '/commercial/locations' },
        { icon: <Calendar />, label: 'Services', path: '/commercial/services' },
        { icon: <CreditCard />, label: 'Billing', path: '/commercial/billing' },
        { icon: <FileText />, label: 'Documents', path: '/commercial/documents' },
        { icon: <Settings />, label: 'Settings', path: '/commercial/settings' }
      ];
    default: // residential
      return [
        { icon: <Home />, label: 'Overview', path: '/dashboard' },
        { icon: <Calendar />, label: 'Appointments', path: '/dashboard/appointments' },
        { icon: <CreditCard />, label: 'Billing', path: '/dashboard/billing' },
        { icon: <FileText />, label: 'Documents', path: '/dashboard/documents' },
        { icon: <Settings />, label: 'Settings', path: '/dashboard/settings' }
      ];
  }
};

export const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = getNavItems(user?.role || 'residential');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-2">
          <Bug className="w-8 h-8 text-mint-500" />
          <span className="text-xl font-bold text-dark-900 dark:text-white">
            {user?.role === 'admin' ? 'Admin Portal' : 
             user?.role === 'commercial' ? 'Business Portal' : 
             'Client Portal'}
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-mint-50 text-mint-500 dark:bg-mint-900/20 dark:text-mint-400' 
                  : 'text-dark-600 hover:bg-gray-50 dark:text-dark-400 dark:hover:bg-dark-700'
                }
              `}
              end={item.path.split('/').length === 2}
            >
              <span className="w-5 h-5 mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};