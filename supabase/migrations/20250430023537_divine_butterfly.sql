/*
  # Sample Data for Appointments System

  1. Changes
    - Add sample service areas
    - Create test users for technicians
    - Add technician records
    - Create sample schedules
    - Add test appointments
  
  2. Security
    - Maintain referential integrity
    - Handle foreign key constraints properly
*/

-- Insert sample service areas if they don't exist
INSERT INTO service_areas (name, zip_codes, is_active)
VALUES 
  ('Delaware North', ARRAY['19701', '19702', '19703', '19707', '19709', '19711'], true),
  ('Delaware South', ARRAY['19901', '19902', '19904', '19934', '19936', '19938'], true),
  ('Pennsylvania Border', ARRAY['19348', '19350', '19352', '19362', '19363', '19365'], true)
ON CONFLICT DO NOTHING;

-- Create technician users and profiles
DO $$
DECLARE
  north_area_id uuid;
  south_area_id uuid;
  pa_area_id uuid;
  tech1_id uuid := gen_random_uuid();
  tech2_id uuid := gen_random_uuid();
  tech3_id uuid := gen_random_uuid();
BEGIN
  -- Get service area IDs
  SELECT id INTO north_area_id FROM service_areas WHERE name = 'Delaware North' LIMIT 1;
  SELECT id INTO south_area_id FROM service_areas WHERE name = 'Delaware South' LIMIT 1;
  SELECT id INTO pa_area_id FROM service_areas WHERE name = 'Pennsylvania Border' LIMIT 1;

  -- Only proceed if we have service areas and no existing technicians
  IF north_area_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM technicians LIMIT 1) THEN
    -- Create user profiles for technicians
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
    VALUES 
      (tech1_id, 'tech1@example.com', crypt('techpass123', gen_salt('bf')), now()),
      (tech2_id, 'tech2@example.com', crypt('techpass123', gen_salt('bf')), now()),
      (tech3_id, 'tech3@example.com', crypt('techpass123', gen_salt('bf')), now())
    ON CONFLICT DO NOTHING;

    -- Create profiles
    INSERT INTO profiles (id, full_name, account_type)
    VALUES 
      (tech1_id, 'John Tech', 'personal'),
      (tech2_id, 'Sarah Tech', 'personal'),
      (tech3_id, 'Mike Tech', 'personal')
    ON CONFLICT DO NOTHING;

    -- Create technician records
    INSERT INTO technicians (id, service_area_id, is_active)
    VALUES 
      (tech1_id, north_area_id, true),
      (tech2_id, south_area_id, true),
      (tech3_id, pa_area_id, true)
    ON CONFLICT DO NOTHING;

    -- Create schedules for the next 7 days
    FOR i IN 0..6 LOOP
      INSERT INTO schedules (technician_id, date, start_time, end_time, is_available)
      VALUES 
        (tech1_id, CURRENT_DATE + i, '08:00:00', '12:00:00', true),
        (tech1_id, CURRENT_DATE + i, '13:00:00', '17:00:00', true),
        (tech2_id, CURRENT_DATE + i, '08:00:00', '12:00:00', true),
        (tech2_id, CURRENT_DATE + i, '13:00:00', '17:00:00', true),
        (tech3_id, CURRENT_DATE + i, '08:00:00', '12:00:00', true),
        (tech3_id, CURRENT_DATE + i, '13:00:00', '17:00:00', true)
      ON CONFLICT DO NOTHING;
    END LOOP;

    -- Create a test client user for sample appointments
    WITH new_client AS (
      INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
      VALUES (
        gen_random_uuid(),
        'testclient@example.com',
        crypt('clientpass123', gen_salt('bf')),
        now()
      )
      RETURNING id
    )
    INSERT INTO profiles (id, full_name, account_type)
    SELECT id, 'Test Client', 'personal'
    FROM new_client;

    -- Create sample appointments
    INSERT INTO appointments (
      client_id,
      service_type,
      scheduled_date,
      scheduled_time,
      status,
      notes,
      technician_id
    )
    SELECT 
      p.id as client_id,
      'General Pest Control',
      CURRENT_DATE + 1,
      '10:00:00',
      'scheduled',
      'Sample appointment for testing',
      tech1_id
    FROM profiles p
    WHERE p.full_name = 'Test Client'
    LIMIT 1;
  END IF;
END $$;