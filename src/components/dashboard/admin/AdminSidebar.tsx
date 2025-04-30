import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { 
  LayoutDashboard, Users, Shield, Settings, Bell,
  Building2, LogOut, FileText, Calendar, UserPlus,
  FileSignature, Receipt
} from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard />, label: 'Overview', path: '/admin' },
  { icon: <Users />, label: 'Clients', path: '/admin/clients' },
  { icon: <Calendar />, label: 'Appointments', path: '/admin/appointments' },
  { icon: <FileSignature />, label: 'Contracts', path: '/admin/contracts' },
  { icon: <Receipt />, label: 'Invoices', path: '/admin/invoices' },
  { icon: <Bell />, label: 'Notifications', path: '/admin/notifications' },
  { icon: <Shield />, label: 'Security', path: '/admin/security' },
  { icon: <Settings />, label: 'Settings', path: '/admin/settings' }
];

export const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-64 bg-[#313131] border-r border-gray-700 min-h-[calc(100vh-4rem)]">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <img 
            src="https://github.com/QRUMN/imgaes/blob/main/ICON.png?raw=true" 
            alt="Grinnage Exterminating Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold text-white">
            Admin Portal
          </span>
        </div>
      </div>

      <nav className="p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-[#56e39f]/10 text-[#56e39f]' 
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }
              `}
              end={item.path === '/admin'}
            >
              <span className="w-5 h-5 mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};