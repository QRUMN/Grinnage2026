import React from 'react';
import { AlertCircle, MessageSquare } from 'lucide-react';

interface EmergencyCalloutProps {
  onChatOpen: () => void;
}

export const EmergencyCallout = ({ onChatOpen }: EmergencyCalloutProps) => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-red-700/30 p-1.5 rounded-lg">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="font-medium ml-3">Emergency Pest Control - Available 24/7</span>
          </div>
          <button 
            onClick={onChatOpen}
            className="group relative flex items-center bg-white text-red-600 px-6 py-2 rounded-full hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageSquare className="w-5 h-5 mr-2 relative z-10" />
            <span className="font-medium relative z-10">Chat Now</span>
            <div className="absolute right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <div className="absolute right-0 w-2 h-2 bg-green-500 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
};