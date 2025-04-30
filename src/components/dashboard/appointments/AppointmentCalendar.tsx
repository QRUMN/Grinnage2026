import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AppointmentCalendar = () => {
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const appointments = [
    { date: 15, type: 'Regular Inspection' },
    { date: 20, type: 'Treatment' }
  ];

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth + firstDayOfMonth;
    const weeks = Math.ceil(totalDays / 7);

    for (let i = 0; i < weeks * 7; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const appointment = appointments.find(a => a.date === dayNumber);
      const isToday = dayNumber === currentDate.getDate();

      days.push(
        <div
          key={i}
          className={`h-24 border border-gray-200 dark:border-dark-700 p-2 ${
            isCurrentMonth ? 'bg-white dark:bg-dark-800' : 'bg-gray-50 dark:bg-dark-900'
          }`}
        >
          {isCurrentMonth && (
            <>
              <span className={`inline-block w-6 h-6 text-center ${
                isToday ? 'bg-mint-500 text-white rounded-full' : 'text-dark-900 dark:text-white'
              }`}>
                {dayNumber}
              </span>
              {appointment && (
                <div className="mt-1">
                  <span className="text-xs px-2 py-1 rounded-full bg-mint-100 dark:bg-mint-900/30 text-mint-700 dark:text-mint-300">
                    {appointment.type}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-dark-600 dark:text-dark-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg">
            <ChevronRight className="w-5 h-5 text-dark-600 dark:text-dark-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-dark-600 dark:text-dark-400 p-2">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};