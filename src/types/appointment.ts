export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  is_active: boolean;
}

export interface Appointment {
  id: string;
  client_id: string;
  service_type: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  technician_id?: string;
  created_at: string;
  updated_at: string;
}