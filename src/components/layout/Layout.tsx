import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { EmergencyCallout } from '../sections/EmergencyCallout';

interface LayoutProps {
  children: React.ReactNode;
  onChatOpen: () => void;
}

export const Layout = ({ children, onChatOpen }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-100 dark:bg-content-900">
      <EmergencyCallout onChatOpen={onChatOpen} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};