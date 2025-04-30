import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard/common/DashboardLayout';
import { Overview } from '../pages/dashboard/Overview';
import { Appointments } from '../pages/dashboard/Appointments';
import { Billing } from '../pages/dashboard/Billing';
import { Documents } from '../pages/dashboard/Documents';
import { Settings } from '../pages/dashboard/Settings';
import { PrivateRoute } from './PrivateRoute';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={
          <PrivateRoute allowedRoles={['residential']}>
            <Overview />
          </PrivateRoute>
        } />
        <Route path="appointments" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Appointments />
          </PrivateRoute>
        } />
        <Route path="billing" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Billing />
          </PrivateRoute>
        } />
        <Route path="documents" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Documents />
          </PrivateRoute>
        } />
        <Route path="settings" element={
          <PrivateRoute allowedRoles={['residential']}>
            <Settings />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};