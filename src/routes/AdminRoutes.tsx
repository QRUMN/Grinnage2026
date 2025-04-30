import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/dashboard/admin/AdminLayout';
import { AdminDashboard } from '../components/dashboard/admin/AdminDashboard';
import { Notifications } from '../pages/admin/Notifications';
import { UserManagement } from '../pages/admin/UserManagement';
import { Organizations } from '../pages/admin/Organizations';
import { Security } from '../pages/admin/Security';
import { Settings } from '../pages/admin/Settings';
import { CreateClient } from '../pages/admin/CreateClient';
import { CreateContract } from '../pages/admin/CreateContract';
import { Appointments } from '../pages/admin/Appointments';
import { Invoices } from '../pages/admin/Invoices';
import { PrivateRoute } from './PrivateRoute';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={
        <PrivateRoute allowedRoles={['admin']}>
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="clients" element={<UserManagement />} />
        <Route path="create-client" element={<CreateClient />} />
        <Route path="create-contract" element={<CreateContract />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="contracts" element={<Organizations />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="security" element={<Security />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};