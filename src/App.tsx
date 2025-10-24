import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './lib/content-context';
import { NotificationProvider } from './lib/notification-context';
import { LandingPage } from './pages/LandingPage';
import { ContactPageSimple } from './pages/ContactPageSimple';
import { AboutPageSimple } from './pages/AboutPageSimple';
import { ServicesPageSimple } from './pages/ServicesPageSimple';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ContentManagement } from './pages/admin/ContentManagement';
import { ClientManagement } from './pages/admin/ClientManagement';
import { AdminLayout } from './components/admin/AdminLayout';

const App = () => {
  return (
    <ContentProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPageSimple />} />
            <Route path="/about" element={<AboutPageSimple />} />
            <Route path="/services" element={<ServicesPageSimple />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="content" element={<ContentManagement />} />
                  <Route path="clients" element={<ClientManagement />} />
                </Routes>
              </AdminLayout>
            } />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ContentProvider>
  );
};

export default App;