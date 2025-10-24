import * as React from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, AlertTriangle, CreditCard, Settings as SettingsIcon, 
  FileText, MessageCircle, HelpCircle
} from 'lucide-react';

import { DashboardLayout, SidebarItem } from '../../components/dashboard/layouts/DashboardLayout';
import Overview from './Overview';
import Appointments from './Appointments';
import Issues from './Issues';
import Payments from './Payments';
import Settings from './Settings';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Define sidebar navigation items
  const getSidebarItems = (): SidebarItem[] => {
    const baseUrl = '/client-dashboard';
    return [
      {
        name: 'Overview',
        icon: <LayoutDashboard className="h-5 w-5" />,
        path: `${baseUrl}`,
        active: currentPath === baseUrl || currentPath === `${baseUrl}/`
      },
      {
        name: 'Appointments',
        icon: <Calendar className="h-5 w-5" />,
        path: `${baseUrl}/appointments`,
        active: currentPath.includes(`${baseUrl}/appointments`)
      },
      {
        name: 'Issues',
        icon: <AlertTriangle className="h-5 w-5" />,
        path: `${baseUrl}/issues`,
        active: currentPath.includes(`${baseUrl}/issues`)
      },
      {
        name: 'Payments',
        icon: <CreditCard className="h-5 w-5" />,
        path: `${baseUrl}/payments`,
        active: currentPath.includes(`${baseUrl}/payments`)
      },
      {
        name: 'Documents',
        icon: <FileText className="h-5 w-5" />,
        path: `${baseUrl}/documents`,
        active: currentPath.includes(`${baseUrl}/documents`)
      },
      {
        name: 'Messages',
        icon: <MessageCircle className="h-5 w-5" />,
        path: `${baseUrl}/messages`,
        active: currentPath.includes(`${baseUrl}/messages`)
      },
      {
        name: 'Settings',
        icon: <SettingsIcon className="h-5 w-5" />,
        path: `${baseUrl}/settings`,
        active: currentPath.includes(`${baseUrl}/settings`)
      },
      {
        name: 'Help & Support',
        icon: <HelpCircle className="h-5 w-5" />,
        path: `${baseUrl}/support`,
        active: currentPath.includes(`${baseUrl}/support`)
      }
    ];
  };

  // Mock user data
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    role: 'Client'
  };

  // Get page title based on current path
  const getPageTitle = () => {
    const baseUrl = '/client-dashboard';
    if (currentPath === baseUrl || currentPath === `${baseUrl}/`) return 'Dashboard';
    if (currentPath.includes(`${baseUrl}/appointments`)) return 'Appointments';
    if (currentPath.includes(`${baseUrl}/issues`)) return 'Issues';
    if (currentPath.includes(`${baseUrl}/payments`)) return 'Payments';
    if (currentPath.includes(`${baseUrl}/documents`)) return 'Documents';
    if (currentPath.includes(`${baseUrl}/messages`)) return 'Messages';
    if (currentPath.includes(`${baseUrl}/settings`)) return 'Settings';
    if (currentPath.includes(`${baseUrl}/support`)) return 'Help & Support';
    return 'Dashboard';
  };

  return (
    <DashboardLayout 
      sidebarItems={getSidebarItems()}
      userInfo={userInfo}
      title={getPageTitle()}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/documents" element={<div className="py-10 text-center text-gray-400">Documents section coming soon</div>} />
        <Route path="/messages" element={<div className="py-10 text-center text-gray-400">Messages section coming soon</div>} />
        <Route path="/support" element={<div className="py-10 text-center text-gray-400">Help & Support section coming soon</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default ClientDashboard;
