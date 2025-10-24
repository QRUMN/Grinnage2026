// Google Calendar API integration
export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
}

export interface AvailableSlot {
  start: Date;
  end: Date;
  available: boolean;
}

// Business hours configuration (admin-configurable)
export const businessHours = {
  monday: { start: '08:00', end: '17:00', enabled: true },
  tuesday: { start: '08:00', end: '17:00', enabled: true },
  wednesday: { start: '08:00', end: '17:00', enabled: true },
  thursday: { start: '08:00', end: '17:00', enabled: true },
  friday: { start: '08:00', end: '17:00', enabled: true },
  saturday: { start: '09:00', end: '15:00', enabled: true },
  sunday: { start: '10:00', end: '14:00', enabled: false },
};

// Service duration configuration
export const serviceDurations = {
  'pest-inspection': 60, // minutes
  'pest-treatment': 120,
  'consultation': 30,
  'emergency': 90,
};

// Get available time slots for a specific date
export const getAvailableSlots = async (
  date: Date,
  serviceType: keyof typeof serviceDurations = 'pest-inspection'
): Promise<AvailableSlot[]> => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'lowercase' }) as keyof typeof businessHours;
  const dayConfig = businessHours[dayName];

  if (!dayConfig.enabled) {
    return [];
  }

  const duration = serviceDurations[serviceType];
  const slots: AvailableSlot[] = [];

  // Generate 30-minute intervals during business hours
  const startTime = new Date(date);
  const [startHour, startMinute] = dayConfig.start.split(':').map(Number);
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date(date);
  const [endHour, endMinute] = dayConfig.end.split(':').map(Number);
  endTime.setHours(endHour, endMinute, 0, 0);

  let currentTime = new Date(startTime);

  while (currentTime < endTime) {
    const slotEnd = new Date(currentTime.getTime() + duration * 60000);

    if (slotEnd <= endTime) {
      slots.push({
        start: new Date(currentTime),
        end: slotEnd,
        available: true, // Would check against actual calendar events
      });
    }

    currentTime = new Date(currentTime.getTime() + 30 * 60000); // 30-minute intervals
  }

  return slots;
};

// Create calendar event
export const createCalendarEvent = async (
  event: Omit<CalendarEvent, 'id'>,
  accessToken: string
): Promise<CalendarEvent> => {
  // This would integrate with Google Calendar API
  // For now, return a mock response
  return {
    id: 'mock_event_' + Date.now(),
    ...event,
  };
};

// Get calendar events for a date range
export const getCalendarEvents = async (
  startDate: Date,
  endDate: Date,
  accessToken: string
): Promise<CalendarEvent[]> => {
  // This would fetch from Google Calendar API
  // For now, return mock data
  return [];
};

// Check if a time slot is available
export const isSlotAvailable = async (
  start: Date,
  end: Date,
  accessToken: string
): Promise<boolean> => {
  // This would check against Google Calendar
  // For now, return true
  return true;
};