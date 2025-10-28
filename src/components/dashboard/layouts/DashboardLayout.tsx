import * as React from 'react';
import { 
  ArrowLeft, Menu, X, Bell, Settings, LogOut 
} from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Avatar } from '../../ui/avatar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  sidebarItems: SidebarItem[];
  userInfo: UserInfo;
  title: string;
  isAdmin?: boolean;
}

export interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  active?: boolean;
}

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  sidebarItems, 
  userInfo, 
  title,
  isAdmin = false
}) => {
  const navigate = useNavigate();
  // Default sidebar closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth >= 1024);
  
  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#111827] text-white">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar */}
        <aside 
          className={`bg-white/5 backdrop-blur-sm border-r border-white/10 w-72 md:w-64 transition-all duration-300 fixed inset-y-0 z-50 lg:static lg:inset-auto ${sidebarOpen ? 'left-0' : '-left-80'}`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="font-bold text-xl">Grinnage Exterminating</div>
                {isAdmin && (
                  <div className="ml-2 px-2 py-0.5 text-xs font-medium bg-[#56e39f]/20 text-[#56e39f] rounded-full">Admin</div>
                )}
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-auto py-4 px-3">
              <nav className="space-y-1">
                {sidebarItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      // Close sidebar on navigation for mobile
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-[#56e39f]/10 text-[#56e39f]' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* User */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center">
                <Avatar
                  name={userInfo.name}
                  src={userInfo.avatar}
                  size="md"
                  status="online"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{userInfo.name}</p>
                  <p className="text-xs text-gray-400">{userInfo.role || userInfo.email}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => {
                    navigate('/settings');
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className="flex items-center text-xs text-gray-400 hover:text-white transition-colors py-2"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center text-xs text-gray-400 hover:text-white transition-colors py-2"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Log out
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto relative">
          {/* Header */}
          <header className="sticky top-0 z-10 h-16 bg-white/5 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-white mr-3 p-1"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">{title}</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button 
                  className="relative text-gray-400 hover:text-white transition-colors p-1"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#56e39f] rounded-full"></span>
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="hidden sm:flex items-center text-sm text-gray-300 hover:text-[#56e39f] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to site
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex sm:hidden items-center text-gray-300 hover:text-[#56e39f] transition-colors p-1"
                  aria-label="Back to site"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-3 sm:p-4 md:p-6">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};
