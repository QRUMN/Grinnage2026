import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { 
  Home, Calendar, CreditCard, FileText, Settings, Building2, 
  Users, Activity, Shield, BarChart2, Wrench, LogOut, Bug,
  ChevronRight, LucideIcon, Bell, HelpCircle, Headphones,
  BarChart, Briefcase, User, Layers, Map, Box
} from 'lucide-react';
import { cn } from '../../../lib/utils';

type NavItemType = {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number | string;
  subItems?: {
    label: string;
    path: string;
  }[];
};

type NavGroupType = {
  title: string;
  items: NavItemType[];
};

const getNavGroups = (role: string): NavGroupType[] => {
  switch (role) {
    case 'admin':
      return [
        {
          title: 'Core',
          items: [
            { icon: <Activity />, label: 'Overview', path: '/admin' },
            { icon: <BarChart />, label: 'Analytics', path: '/admin/analytics', badge: 'New' },
          ]
        },
        {
          title: 'Management',
          items: [
            { 
              icon: <Users />, 
              label: 'Users', 
              path: '/admin/users',
              subItems: [
                { label: 'All Users', path: '/admin/users' },
                { label: 'Create User', path: '/admin/create-client' },
                { label: 'Roles', path: '/admin/roles' },
              ]
            },
            { icon: <Briefcase />, label: 'Organizations', path: '/admin/organizations' },
            { icon: <Calendar />, label: 'Appointments', path: '/admin/appointments', badge: 5 },
            { icon: <CreditCard />, label: 'Billing', path: '/admin/billing' },
          ]
        },
        {
          title: 'System',
          items: [
            { icon: <Shield />, label: 'Security', path: '/admin/security' },
            { icon: <FileText />, label: 'Audit Logs', path: '/admin/audit-logs' },
            { icon: <Bell />, label: 'Notifications', path: '/admin/notifications' },
            { icon: <Wrench />, label: 'Settings', path: '/admin/settings' }
          ]
        }
      ];
    case 'commercial':
      return [
        {
          title: 'Business',
          items: [
            { icon: <Home />, label: 'Overview', path: '/commercial' },
            { icon: <Map />, label: 'Locations', path: '/commercial/locations' },
            { icon: <Layers />, label: 'Services', path: '/commercial/services' },
          ]
        },
        {
          title: 'Account',
          items: [
            { icon: <Calendar />, label: 'Appointments', path: '/commercial/appointments' },
            { icon: <CreditCard />, label: 'Billing', path: '/commercial/billing' },
            { icon: <FileText />, label: 'Documents', path: '/commercial/documents' },
            { icon: <Settings />, label: 'Settings', path: '/commercial/settings' }
          ]
        }
      ];
    default: // residential
      return [
        {
          title: 'Account',
          items: [
            { icon: <Home />, label: 'Overview', path: '/dashboard' },
            { icon: <Calendar />, label: 'Appointments', path: '/dashboard/appointments', badge: 2 },
            { icon: <Box />, label: 'Services', path: '/dashboard/services' },
            { icon: <CreditCard />, label: 'Billing', path: '/dashboard/billing' },
            { icon: <FileText />, label: 'Documents', path: '/dashboard/documents' },
            { icon: <User />, label: 'Profile', path: '/dashboard/profile' },
            { icon: <Settings />, label: 'Settings', path: '/dashboard/settings' }
          ]
        }
      ];
  }
};

export const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navGroups = getNavGroups(user?.role || 'residential');
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  
  const isSubActive = (subItem: {path: string}) => {
    return location.pathname === subItem.path;
  };

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 min-h-[calc(100vh-4rem)] flex flex-col overflow-y-auto">
      <div className="p-5 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#56e39f] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {user?.role === 'admin' ? 'Admin Portal' : 
             user?.role === 'commercial' ? 'Business Portal' : 
             'Client Portal'}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.path}>
                  {item.subItems ? (
                    <button
                      onClick={() => toggleExpand(item.path)}
                      className={cn(
                        'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        location.pathname.startsWith(item.path)
                          ? 'bg-[#56e39f]/10 text-[#56e39f] dark:text-[#56e39f]'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700'
                      )}
                    >
                      <div className="flex items-center">
                        <span className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                        {item.label}
                        {item.badge && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-[#56e39f]/10 text-[#56e39f] dark:bg-[#56e39f]/20">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className={cn('w-4 h-4 transition-transform', {
                        'rotate-90': expandedItems[item.path]
                      })} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[#56e39f]/10 text-[#56e39f] dark:text-[#56e39f]'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700'
                      )}
                      end={item.path.split('/').length === 2}
                    >
                      <span className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                      {item.label}
                      {item.badge && (
                        <span className="ml-auto px-1.5 py-0.5 text-xs rounded-full bg-[#56e39f]/10 text-[#56e39f] dark:bg-[#56e39f]/20">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  )}
                  
                  {/* Sub-items */}
                  {item.subItems && expandedItems[item.path] && (
                    <div className="mt-1 ml-8 pl-2 border-l border-gray-200 dark:border-gray-700 space-y-1">
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) => cn(
                            'block px-3 py-1.5 text-sm transition-colors rounded-md',
                            isActive
                              ? 'text-[#56e39f] bg-[#56e39f]/5 dark:text-[#56e39f] dark:bg-[#56e39f]/10'
                              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-dark-700/50'
                          )}
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#56e39f]/20 rounded-lg">
              <HelpCircle className="w-5 h-5 text-[#56e39f]" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Need help?</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Contact support</p>
            </div>
          </div>
          <button className="mt-2 flex items-center justify-center w-full px-3 py-1.5 text-sm bg-[#56e39f] text-white rounded-lg hover:bg-[#48c98a] transition-colors">
            <Headphones className="w-4 h-4 mr-2" />
            Support
          </button>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Sign out</span>
        </button>
      </div>
    </aside>
  );
};