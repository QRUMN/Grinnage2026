import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNotifications } from './notification-context';

export interface TimeSlot {
  time: string;
  available: boolean;
  clientId?: string;
  clientName?: string;
}

export interface AppointmentDay {
  date: string;
  dayName: string;
  timeSlots: TimeSlot[];
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  address: string;
  notes?: string;
  estimatedCost: number;
  createdAt: Date;
  updatedAt: Date;
  reminderSent?: boolean;
}

export interface AppointmentRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  alternateDate?: string;
  alternateTime?: string;
  address: string;
  propertySize: string;
  additionalServices: string[];
  specialInstructions?: string;
  urgency: 'standard' | 'urgent' | 'flexible';
  status: 'pending' | 'approved' | 'declined' | 'converted';
  submittedAt: Date;
  estimatedCost?: number;
}

interface AppointmentContextType {
  appointments: Appointment[];
  appointmentRequests: AppointmentRequest[];
  calendar: AppointmentDay[];
  currentWeek: Date;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  addAppointmentRequest: (request: Omit<AppointmentRequest, 'id' | 'submittedAt'>) => void;
  approveRequest: (requestId: string, appointmentData: Partial<Appointment>) => void;
  declineRequest: (requestId: string, reason?: string) => void;
  getAvailableSlots: (date: string) => TimeSlot[];
  navigateWeek: (direction: 'prev' | 'next') => void;
  getAppointmentsByDate: (date: string) => Appointment[];
  getTodaysAppointments: () => Appointment[];
  getUpcomingAppointments: () => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const { addNotification } = useNotifications();

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved).map((apt: any) => ({
      ...apt,
      createdAt: new Date(apt.createdAt),
      updatedAt: new Date(apt.updatedAt)
    })) : [];
  });

  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>(() => {
    const saved = localStorage.getItem('appointment-requests');
    return saved ? JSON.parse(saved).map((req: any) => ({
      ...req,
      submittedAt: new Date(req.submittedAt)
    })) : [];
  });

  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return startOfWeek;
  });

  // Generate calendar for current week
  const calendar: AppointmentDay[] = React.useMemo(() => {
    const days: AppointmentDay[] = [];
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeek);
      date.setDate(currentWeek.getDate() + i);

      const dateString = date.toISOString().split('T')[0];
      const dayAppointments = appointments.filter(apt => apt.date === dateString);

      // Generate time slots (8 AM to 6 PM, 1-hour intervals)
      const timeSlots: TimeSlot[] = [];
      for (let hour = 8; hour <= 18; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const bookedAppointment = dayAppointments.find(apt => apt.time === time);

        timeSlots.push({
          time,
          available: !bookedAppointment,
          clientId: bookedAppointment?.clientId,
          clientName: bookedAppointment?.clientName
        });
      }

      days.push({
        date: dateString,
        dayName: weekDays[i],
        timeSlots
      });
    }

    return days;
  }, [currentWeek, appointments]);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('appointment-requests', JSON.stringify(appointmentRequests));
  }, [appointmentRequests]);

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAppointments(prev => [...prev, newAppointment]);

    // Send notification
    addNotification({
      type: 'appointment',
      title: 'New Appointment Scheduled',
      message: `Appointment scheduled with ${appointmentData.clientName} for ${appointmentData.date} at ${appointmentData.time}`,
      priority: 'medium',
      metadata: {
        clientName: appointmentData.clientName,
        clientId: appointmentData.clientId
      }
    });
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id
          ? { ...appointment, ...updates, updatedAt: new Date() }
          : appointment
      )
    );

    if (updates.status) {
      const appointment = appointments.find(apt => apt.id === id);
      if (appointment) {
        addNotification({
          type: 'appointment',
          title: 'Appointment Updated',
          message: `Appointment with ${appointment.clientName} status changed to ${updates.status}`,
          priority: updates.status === 'cancelled' ? 'high' : 'medium',
          metadata: {
            clientName: appointment.clientName,
            clientId: appointment.clientId
          }
        });
      }
    }
  };

  const cancelAppointment = (id: string, reason?: string) => {
    updateAppointment(id, { status: 'cancelled' });
  };

  const addAppointmentRequest = (requestData: Omit<AppointmentRequest, 'id' | 'submittedAt'>) => {
    const newRequest: AppointmentRequest = {
      ...requestData,
      id: Date.now().toString(),
      submittedAt: new Date()
    };

    setAppointmentRequests(prev => [...prev, newRequest]);

    // Send high-priority notification for new requests
    addNotification({
      type: 'request',
      title: 'New Appointment Request',
      message: `${requestData.clientName} requested ${requestData.serviceType} service for ${requestData.preferredDate}`,
      priority: requestData.urgency === 'urgent' ? 'high' : 'medium',
      metadata: {
        clientName: requestData.clientName
      }
    });
  };

  const approveRequest = (requestId: string, appointmentData: Partial<Appointment>) => {
    const request = appointmentRequests.find(req => req.id === requestId);
    if (!request) return;

    // Create appointment from request
    const newAppointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'> = {
      clientId: `client_${Date.now()}`,
      clientName: request.clientName,
      clientEmail: request.clientEmail,
      clientPhone: request.clientPhone,
      serviceType: request.serviceType,
      date: request.preferredDate,
      time: request.preferredTime,
      duration: 120, // Default 2 hours
      status: 'scheduled',
      address: request.address,
      notes: request.specialInstructions,
      estimatedCost: request.estimatedCost || 150,
      ...appointmentData
    };

    addAppointment(newAppointment);

    // Update request status
    setAppointmentRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'converted' as const }
          : req
      )
    );

    addNotification({
      type: 'appointment',
      title: 'Request Approved',
      message: `Appointment request from ${request.clientName} has been approved and scheduled`,
      priority: 'medium',
      metadata: {
        clientName: request.clientName
      }
    });
  };

  const declineRequest = (requestId: string, reason?: string) => {
    setAppointmentRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'declined' as const }
          : req
      )
    );

    const request = appointmentRequests.find(req => req.id === requestId);
    if (request) {
      addNotification({
        type: 'request',
        title: 'Request Declined',
        message: `Appointment request from ${request.clientName} has been declined`,
        priority: 'low',
        metadata: {
          clientName: request.clientName
        }
      });
    }
  };

  const getAvailableSlots = (date: string): TimeSlot[] => {
    const dayData = calendar.find(day => day.date === date);
    return dayData ? dayData.timeSlots.filter(slot => slot.available) : [];
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => {
      const newWeek = new Date(prev);
      newWeek.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
      return newWeek;
    });
  };

  const getAppointmentsByDate = (date: string): Appointment[] => {
    return appointments.filter(apt => apt.date === date);
  };

  const getTodaysAppointments = (): Appointment[] => {
    const today = new Date().toISOString().split('T')[0];
    return getAppointmentsByDate(today).sort((a, b) => a.time.localeCompare(b.time));
  };

  const getUpcomingAppointments = (): Appointment[] => {
    const today = new Date().toISOString().split('T')[0];
    return appointments
      .filter(apt => apt.date >= today && apt.status !== 'cancelled' && apt.status !== 'completed')
      .sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
      })
      .slice(0, 10);
  };

  // Initialize with some sample data
  useEffect(() => {
    if (appointments.length === 0) {
      const sampleAppointments: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>[] = [
        {
          clientId: 'client_1',
          clientName: 'Sarah Johnson',
          clientEmail: 'sarah@example.com',
          clientPhone: '(555) 123-4567',
          serviceType: 'Residential Cleaning',
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          duration: 120,
          status: 'confirmed',
          address: '123 Oak Street, San Francisco, CA',
          estimatedCost: 150,
          notes: 'Focus on kitchen and bathrooms'
        },
        {
          clientId: 'client_2',
          clientName: 'Mike Davis',
          clientEmail: 'mike@example.com',
          clientPhone: '(555) 987-6543',
          serviceType: 'Commercial Cleaning',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
          time: '14:00',
          duration: 180,
          status: 'scheduled',
          address: '456 Business Blvd, Palo Alto, CA',
          estimatedCost: 300
        }
      ];

      sampleAppointments.forEach(apt => addAppointment(apt));
    }

    if (appointmentRequests.length === 0) {
      const sampleRequests: Omit<AppointmentRequest, 'id' | 'submittedAt'>[] = [
        {
          clientName: 'Lisa Brown',
          clientEmail: 'lisa@example.com',
          clientPhone: '(555) 456-7890',
          serviceType: 'Deep Cleaning',
          preferredDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], // Day after tomorrow
          preferredTime: '09:00',
          address: '789 Pine Street, San Jose, CA',
          propertySize: '1500 sq ft',
          additionalServices: ['Window Cleaning', 'Carpet Cleaning'],
          urgency: 'standard',
          status: 'pending',
          estimatedCost: 200
        }
      ];

      sampleRequests.forEach(req => addAppointmentRequest(req));
    }
  }, []);

  const value: AppointmentContextType = {
    appointments,
    appointmentRequests,
    calendar,
    currentWeek,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    addAppointmentRequest,
    approveRequest,
    declineRequest,
    getAvailableSlots,
    navigateWeek,
    getAppointmentsByDate,
    getTodaysAppointments,
    getUpcomingAppointments
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};