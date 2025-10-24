import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ContactPageSimple } from './pages/ContactPageSimple';
import { AboutPageSimple } from './pages/AboutPageSimple';
import { ServicesPageSimple } from './pages/ServicesPageSimple';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLayout } from './components/admin/AdminLayout';

const App = () => {
  return (
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
            </Routes>
          </AdminLayout>
        } />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;