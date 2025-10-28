import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './lib/content-context';
import { NotificationProvider } from './lib/notification-context';
import { AppointmentProvider } from './lib/appointment-context';
import { LandingPage } from './pages/LandingPage';
import { ContactPageSimple } from './pages/ContactPageSimple';
import { AboutPageSimple } from './pages/AboutPageSimple';
import { ServicesPageSimple } from './pages/ServicesPageSimple';
import { OnboardingPage } from './pages/OnboardingPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ContentManagement } from './pages/admin/ContentManagement';
import { ClientManagement } from './pages/admin/ClientManagement';
import { AppointmentManagement } from './pages/admin/AppointmentManagement';
import { AdminLayout } from './components/admin/AdminLayout';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <ContentProvider>
      <NotificationProvider>
        <AppointmentProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact" element={<ContactPageSimple />} />
              <Route path="/about" element={<AboutPageSimple />} />
              <Route path="/services" element={<ServicesPageSimple />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin/*" element={
                <AdminLayout>
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="content" element={<ContentManagement />} />
                    <Route path="clients" element={<ClientManagement />} />
                    <Route path="appointments" element={<AppointmentManagement />} />
                  </Routes>
                </AdminLayout>
              } />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </BrowserRouter>
        </AppointmentProvider>
      </NotificationProvider>
    </ContentProvider>
  );
};

export default App;