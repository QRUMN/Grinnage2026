import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PortalRoutes } from './routes/PortalRoutes';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { CreateAdmin } from './pages/admin/CreateAdmin';
import { EmergencyAIAgent } from './components/EmergencyAIAgent';

const App = () => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout onChatOpen={() => setIsChatOpen(true)}><HomePage /></Layout>} />
        <Route path="/about" element={<Layout onChatOpen={() => setIsChatOpen(true)}><AboutPage /></Layout>} />
        <Route path="/services" element={<Layout onChatOpen={() => setIsChatOpen(true)}><ServicesPage /></Layout>} />
        <Route path="/contact" element={<Layout onChatOpen={() => setIsChatOpen(true)}><ContactPage /></Layout>} />
        <Route path="/consultation" element={<Layout onChatOpen={() => setIsChatOpen(true)}><ConsultationPage /></Layout>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/create-admin" element={<CreateAdmin />} />
        
        {/* Protected Routes */}
        <Route path="/*" element={<PortalRoutes />} />
      </Routes>
      {isChatOpen && <EmergencyAIAgent onClose={() => setIsChatOpen(false)} />}
    </BrowserRouter>
  );
};

export default App;