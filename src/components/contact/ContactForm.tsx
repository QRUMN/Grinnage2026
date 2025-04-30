import React from 'react';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-200 mb-2">Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-surface-50/10 border border-surface-50/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-surface-50 placeholder-surface-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-200 mb-2">Email</label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-surface-50/10 border border-surface-50/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-surface-50 placeholder-surface-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-200 mb-2">Message</label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-surface-50/10 border border-surface-50/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-surface-50 placeholder-surface-400"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center px-6 py-3 bg-primary-500 text-surface-50 rounded-lg hover:bg-primary-600 transition-colors"
      >
        <Send className="w-5 h-5 mr-2" />
        Send Message
      </button>
    </form>
  );
};