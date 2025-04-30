import React from 'react';
import { Plus } from 'lucide-react';

export const ScheduleButton = () => {
  return (
    <button className="flex items-center px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors">
      <Plus className="w-5 h-5 mr-2" />
      Schedule Service
    </button>
  );
};