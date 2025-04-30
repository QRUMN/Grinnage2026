import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

const schedules = [
  {
    id: '1',
    location: 'Main Office',
    service: 'Monthly Inspection',
    date: '2024-03-15',
    time: '10:00 AM'
  },
  {
    id: '2',
    location: 'Warehouse',
    service: 'Pest Treatment',
    date: '2024-03-20',
    time: '2:30 PM'
  }
];

export const ServiceSchedule = () => {
  return (
    <DashboardCard title="Upcoming Services">
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-mint-500" />
              </div>
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white">{schedule.service}</h3>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center text-sm text-dark-600 dark:text-dark-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {schedule.location}
                  </div>
                  <div className="flex items-center text-sm text-dark-600 dark:text-dark-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(schedule.date).toLocaleDateString()} at {schedule.time}
                  </div>
                </div>
              </div>
            </div>
            <button className="px-3 py-1 text-sm text-mint-500 hover:text-mint-600 border border-mint-500 hover:border-mint-600 rounded-lg">
              Reschedule
            </button>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};