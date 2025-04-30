import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';

export const ServiceReminder = () => {
  const nextService = {
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'Regular Inspection',
    location: 'Main Property'
  };

  return (
    <div className="bg-mint-50 dark:bg-mint-900/20 border border-mint-200 dark:border-mint-800 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-mint-100 dark:bg-mint-800/50 rounded-lg">
          <AlertCircle className="w-6 h-6 text-mint-600 dark:text-mint-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
            Upcoming Service Reminder
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-dark-600 dark:text-dark-300">
              <Calendar className="w-4 h-4 mr-2 text-mint-500" />
              <span>{new Date(nextService.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-dark-600 dark:text-dark-300">
              <Clock className="w-4 h-4 mr-2 text-mint-500" />
              <span>{nextService.time}</span>
            </div>
            <div className="flex items-center text-dark-600 dark:text-dark-300">
              <MapPin className="w-4 h-4 mr-2 text-mint-500" />
              <span>{nextService.location}</span>
            </div>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};