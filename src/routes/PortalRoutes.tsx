import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard/common/DashboardLayout';
import { AdminRoutes } from './AdminRoutes';
import { ResidentialDashboard } from '../components/dashboard/residential/ResidentialDashboard';
import { CommercialDashboard } from '../components/dashboard/commercial/CommercialDashboard';
import { Appointments } from '../pages/dashboard/Appointments';
import { Billing } from '../pages/dashboard/Billing';
import { Documents } from '../pages/dashboard/Documents';
import { Settings } from '../pages/dashboard/Settings';
import { MediaUpload } from '../pages/dashboard/MediaUpload';
import { PrivateRoute } from './PrivateRoute';

export const PortalRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="admin/*" element={<AdminRoutes />} />

      {/* Commercial Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="commercial" element={
          <PrivateRoute allowedRoles={['commercial']}>
            <CommercialDashboard />
          </PrivateRoute>
        } />
        <Route path="commercial/appointments" element={
          <PrivateRoute allowedRoles={['commercial']}>
            <Appointments />
          </PrivateRoute>
        } />
        <Route path="commercial/billing" element={
          <PrivateRoute allowedRoles={['commercial']}>
            <Billing />
          </PrivateRoute>
        } />
        <Route path="commercial/documents" element={
          <PrivateRoute allowedRoles={['commercial']}>
            <Documents />
          </PrivateRoute>
        } />
        <Route path="commercial/settings" element={
          <PrivateRoute allowedRoles={['commercial']}>
            <Settings />
          </PrivateRoute>
        } />
      </Route>

      {/* Residential Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={
          <PrivateRoute allowedRoles={['residential']}>
            <ResidentialDashboard />
          </PrivateRoute>
        } />
        <Route path="dashboard/appointments" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Appointments />
          </PrivateRoute>
        } />
        <Route path="dashboard/billing" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Billing />
          </PrivateRoute>
        } />
        <Route path="dashboard/documents" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Documents />
          </PrivateRoute>
        } />
        <Route path="dashboard/settings" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Settings />
          </PrivateRoute>
        } />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};