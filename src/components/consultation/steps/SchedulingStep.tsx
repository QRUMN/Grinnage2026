import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormInput } from '../../common/form/FormInput';
import { FormSelect } from '../../common/form/FormSelect';
import { FormTextarea } from '../../common/form/FormTextarea';
import { supabase } from '../../../lib/supabase';
import { Loader } from 'lucide-react';

interface SchedulingStepProps {
  form: UseFormReturn<any>;
}

export const SchedulingStep = ({ form }: SchedulingStepProps) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const selectedDate = watch('preferredDate');

  // Generate next 14 days as available dates
  useEffect(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    setAvailableDates(dates);
    setLoading(false);
  }, []);

  // Fetch available times when date is selected
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDate) return;
      
      setLoading(true);
      
      try {
        // Get booked times for the selected date
        const { data: bookedAppointments, error } = await supabase
          .from('appointments')
          .select('scheduled_time')
          .eq('scheduled_date', selectedDate)
          .neq('status', 'cancelled');
          
        if (error) throw error;
        
        // Generate time slots (9am to 5pm, every 30 minutes)
        const allTimeSlots = [];
        for (let hour = 9; hour < 17; hour++) {
          allTimeSlots.push(`${hour}:00`);
          allTimeSlots.push(`${hour}:30`);
        }
        
        // Filter out booked times
        const bookedTimes = bookedAppointments?.map(a => a.scheduled_time) || [];
        const availableTimes = allTimeSlots.filter(time => 
          !bookedTimes.includes(time)
        );
        
        setAvailableTimes(availableTimes);
      } catch (error) {
        console.error('Error fetching available times:', error);
        // Fallback to all time slots if there's an error
        const fallbackTimes = [];
        for (let hour = 9; hour < 17; hour++) {
          fallbackTimes.push(`${hour}:00`);
          fallbackTimes.push(`${hour}:30`);
        }
        setAvailableTimes(fallbackTimes);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailableTimes();
  }, [selectedDate]);

  // Format time for display
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="w-8 h-8 animate-spin text-primary-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading available slots...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Preferred Date
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {availableDates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => setValue('preferredDate', date)}
              className={`p-3 rounded-lg text-center transition-colors ${
                selectedDate === date
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </button>
          ))}
        </div>
        {errors.preferredDate && (
          <p className="mt-1 text-sm text-red-400">{errors.preferredDate.message}</p>
        )}
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Preferred Time
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setValue('preferredTime', time)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  watch('preferredTime') === time
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {formatTime(time)}
              </button>
            ))}
          </div>
          {availableTimes.length === 0 && (
            <p className="mt-2 text-yellow-400">
              No available times for this date. Please select another date.
            </p>
          )}
          {errors.preferredTime && (
            <p className="mt-1 text-sm text-red-400">{errors.preferredTime.message}</p>
          )}
        </div>
      )}

      <FormTextarea
        label="Additional Notes"
        {...register('notes')}
        error={errors.notes?.message}
        placeholder="Any additional information you'd like us to know..."
      />
    </div>
  );
};