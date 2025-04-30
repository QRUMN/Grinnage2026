import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const appointments = [
  {
    id: 1,
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'Regular Inspection',
    location: 'Main Property',
    status: 'upcoming'
  },
  {
    id: 2,
    date: '2024-03-20',
    time: '2:30 PM',
    type: 'Treatment',
    location: 'Backyard',
    status: 'scheduled'
  }
];

export const AppointmentList = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Upcoming Appointments</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-dark-700">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-mint-500" />
                  <span className="font-medium text-dark-900 dark:text-white">
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-mint-500" />
                  <span className="text-dark-600 dark:text-dark-400">{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-mint-500" />
                  <span className="text-dark-600 dark:text-dark-400">{appointment.location}</span>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-mint-100 text-mint-700 dark:bg-mint-900/30 dark:text-mint-400">
                {appointment.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};