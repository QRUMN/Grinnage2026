import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Simplified App with just the landing page for now
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <Routes>
          <Route path="*" element={
            <div className="container mx-auto px-4 py-16">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                  Grinnage Pest Control
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                  Professional pest control services with modern, client-managed platform.
                </p>
                <div className="space-y-4">
                  <div className="btn-primary inline-flex">
                    🚧 Under Reconstruction
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Building a streamlined platform for better client experience
                  </p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;