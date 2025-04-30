/*
  # Admin Calendar and Appointments Schema

  1. New Tables
    - appointments: Store appointment information
    - services: Available service types
    - service_areas: Service coverage areas
    - technicians: Technician information
    - schedules: Technician availability

  2. Security
    - Enable RLS on all tables
    - Add policies for admin and client access
*/

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  scheduled_date date NOT NULL,
  scheduled_time time NOT NULL,
  status text NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes text,
  technician_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration interval NOT NULL,
  price decimal(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create service areas table
CREATE TABLE IF NOT EXISTS service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  zip_codes text[] NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create technicians table
CREATE TABLE IF NOT EXISTS technicians (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  service_area_id uuid REFERENCES service_areas(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id uuid REFERENCES technicians(id) ON DELETE CASCADE,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  -- Appointments policies
  CREATE POLICY "Allow admin manage appointments"
    ON appointments
    FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

  CREATE POLICY "Allow users view own appointments"
    ON appointments
    FOR SELECT
    TO authenticated
    USING (client_id = auth.uid());

  -- Services policies
  CREATE POLICY "Allow admin manage services"
    ON services
    FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

  CREATE POLICY "Allow users view services"
    ON services
    FOR SELECT
    TO authenticated
    USING (is_active = true);

  -- Service areas policies
  CREATE POLICY "Allow admin manage service_areas"
    ON service_areas
    FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

  CREATE POLICY "Allow users view service_areas"
    ON service_areas
    FOR SELECT
    TO authenticated
    USING (is_active = true);

  -- Technicians policies
  CREATE POLICY "Allow admin manage technicians"
    ON technicians
    FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

  -- Schedules policies
  CREATE POLICY "Allow admin manage schedules"
    ON schedules
    FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

  CREATE POLICY "Allow technicians view own schedules"
    ON schedules
    FOR SELECT
    TO authenticated
    USING (technician_id = auth.uid());
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_technician_id ON appointments(technician_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_date ON appointments(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_technicians_service_area_id ON technicians(service_area_id);
CREATE INDEX IF NOT EXISTS idx_schedules_technician_id ON schedules(technician_id);
CREATE INDEX IF NOT EXISTS idx_schedules_date ON schedules(date);

-- Insert initial service types
INSERT INTO services (name, description, duration, price) VALUES
  ('Initial Inspection', 'Comprehensive property inspection and assessment', '1 hour', 99.99),
  ('General Pest Control', 'Treatment for common household pests', '2 hours', 149.99),
  ('Termite Treatment', 'Specialized termite control service', '4 hours', 299.99),
  ('Rodent Control', 'Rodent removal and prevention', '2 hours', 199.99),
  ('Emergency Service', '24/7 emergency pest control', '2 hours', 249.99)
ON CONFLICT DO NOTHING;

-- Create function to check technician availability
CREATE OR REPLACE FUNCTION check_technician_availability(
  p_technician_id uuid,
  p_date date,
  p_start_time time,
  p_duration interval
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  p_end_time time := p_start_time + p_duration;
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM appointments a
    WHERE a.technician_id = p_technician_id
    AND a.scheduled_date = p_date
    AND a.status != 'cancelled'
    AND (
      (a.scheduled_time <= p_start_time AND a.scheduled_time + (
        SELECT duration FROM services WHERE name = a.service_type
      ) > p_start_time)
      OR
      (a.scheduled_time < p_end_time AND a.scheduled_time >= p_start_time)
    )
  );
END;
$$;