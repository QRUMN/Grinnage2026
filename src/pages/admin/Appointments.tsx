import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AppointmentList } from '../../components/dashboard/appointments/AppointmentList';
import { AppointmentCalendar } from '../../components/dashboard/appointments/AppointmentCalendar';
import { AppointmentForm } from '../../components/dashboard/admin/appointments/AppointmentForm';

export const Appointments = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSchedule = (data: any) => {
    console.log('New appointment:', data);
    // Here you would typically save the appointment to your database
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Appointments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-[#56e39f] text-white rounded-lg hover:bg-[#48c98a] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule Appointment
        </button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="col-span-1">
          <AppointmentCalendar />
        </div>
        <div className="col-span-1">
          <AppointmentList />
        </div>
      </div>

      {showForm && (
        <AppointmentForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSchedule}
        />
      )}
    </div>
  );
};