import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Service } from '../../types/appointment';

interface AppointmentSchedulerProps {
  onSchedule: (date: string, time: string) => void;
  onBack: () => void;
}

export const AppointmentScheduler = ({ onSchedule, onBack }: AppointmentSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true);

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Get next 7 days for available dates
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Fetch available time slots when date is selected
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate || !selectedService) return;

      try {
        const { data: appointments, error } = await supabase
          .from('appointments')
          .select('scheduled_time')
          .eq('scheduled_date', selectedDate)
          .neq('status', 'cancelled');

        if (error) throw error;

        // Generate time slots between 8 AM and 6 PM
        const slots = [];
        const startHour = 8;
        const endHour = 18;
        
        for (let hour = startHour; hour < endHour; hour++) {
          const existingAppointments = appointments?.filter(a => {
            const apptHour = new Date(`2000-01-01T${a.scheduled_time}`).getHours();
            return apptHour === hour;
          });

          if (!existingAppointments?.length) {
            slots.push(`${hour}:00`);
            if (hour < endHour - 1) {
              slots.push(`${hour}:30`);
            }
          }
        }

        setAvailableTimes(slots);
      } catch (err) {
        console.error('Error fetching available slots:', err);
        setError('Failed to load available time slots');
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, selectedService]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !selectedService) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('appointments')
        .insert({
          client_id: user.id,
          service_type: selectedService,
          scheduled_date: selectedDate,
          scheduled_time: selectedTime,
          status: 'scheduled'
        });

      if (error) throw error;
      onSchedule(selectedDate, selectedTime);
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setError('Failed to schedule appointment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-500">{error}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 text-red-500 hover:text-red-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Schedule Service
        </h3>
      </div>

      {/* Service Selection */}
      <div className="space-y-4">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>Select Service</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.name)}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedService === service.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="font-medium">{service.name}</div>
              <div className="text-sm opacity-80">${service.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      {selectedService && (
        <div className="space-y-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>Select Date</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {getAvailableDates().map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedDate === date.toISOString().split('T')[0]
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-sm font-medium">{formatDate(date)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Clock className="w-5 h-5 mr-2" />
            <span>Select Time</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedTime === time
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-sm font-medium">{formatTime(time)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <button
        onClick={handleSchedule}
        disabled={!selectedDate || !selectedTime || !selectedService}
        className="w-full mt-6 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Appointment
      </button>
    </div>
  );
};