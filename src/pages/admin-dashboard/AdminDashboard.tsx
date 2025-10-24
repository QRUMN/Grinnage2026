import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, FileText, BarChart,
  Settings as SettingsIcon, UserCog, FileBarChart
} from 'lucide-react';

import { DashboardLayout, SidebarItem } from '../../components/dashboard/layouts/DashboardLayout';
import Overview from './Overview';
import ClientsManagement from './ClientsManagement';
import Technicians from './Technicians';
import AppointmentsManagement from './AppointmentsManagement';
import ServicesManagement from './ServicesManagement';
import Analytics from './Analytics';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define sidebar navigation items
  const getSidebarItems = (): SidebarItem[] => {
    const baseUrl = '/admin-dashboard';
    return [
      {
        name: 'Overview',
        icon: <LayoutDashboard className="h-5 w-5" />,
        path: `${baseUrl}`,
        active: currentPath === baseUrl || currentPath === `${baseUrl}/`
      },
      {
        name: 'Clients',
        icon: <Users className="h-5 w-5" />,
        path: `${baseUrl}/clients`,
        active: currentPath.includes(`${baseUrl}/clients`)
      },
      {
        name: 'Appointments',
        icon: <Calendar className="h-5 w-5" />,
        path: `${baseUrl}/appointments`,
        active: currentPath.includes(`${baseUrl}/appointments`)
      },
      {
        name: 'Technicians',
        icon: <UserCog className="h-5 w-5" />,
        path: `${baseUrl}/technicians`,
        active: currentPath.includes(`${baseUrl}/technicians`)
      },
      {
        name: 'Services',
        icon: <FileText className="h-5 w-5" />,
        path: `${baseUrl}/services`,
        active: currentPath.includes(`${baseUrl}/services`)
      },
      {
        name: 'Reports',
        icon: <FileBarChart className="h-5 w-5" />,
        path: `${baseUrl}/reports`,
        active: currentPath.includes(`${baseUrl}/reports`)
      },
      {
        name: 'Analytics',
        icon: <BarChart className="h-5 w-5" />,
        path: `${baseUrl}/analytics`,
        active: currentPath.includes(`${baseUrl}/analytics`)
      }
    ];
  };

  // Mock user data for admin
  const userInfo = {
    name: 'Keith Grinnage',
    email: 'keith@grinnage.com',
    avatar: '',
    role: 'Administrator'
  };

  // Get page title based on current path
  const getPageTitle = () => {
    const baseUrl = '/admin-dashboard';
    if (currentPath === baseUrl || currentPath === `${baseUrl}/`) return 'Admin Dashboard';
    if (currentPath.includes(`${baseUrl}/clients`)) return 'Client Management';
    if (currentPath.includes(`${baseUrl}/appointments`)) return 'Appointment Management';
    if (currentPath.includes(`${baseUrl}/technicians`)) return 'Technician Management';
    if (currentPath.includes(`${baseUrl}/services`)) return 'Service Management';
    if (currentPath.includes(`${baseUrl}/reports`)) return 'Reports';
    if (currentPath.includes(`${baseUrl}/analytics`)) return 'Analytics';
    if (currentPath.includes(`${baseUrl}/settings`)) return 'Settings';
    return 'Admin Dashboard';
  };

  return (
    <DashboardLayout 
      sidebarItems={getSidebarItems()}
      userInfo={userInfo}
      title={getPageTitle()}
      isAdmin={true}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/clients" element={<ClientsManagement />} />
        <Route path="/appointments" element={<AppointmentsManagement />} />
        <Route path="/technicians" element={<Technicians />} />
        <Route path="/services" element={<ServicesManagement />} />
        <Route path="/reports" element={<div className="py-10 text-center text-gray-400">Reports coming soon</div>} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<div className="py-10 text-center text-neutral-400">Settings coming soon</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
