/*
  # Admin Security Schema Update

  1. New Tables
    - verification_codes: Store temporary verification codes
    - blocked_ips: Track blocked IP addresses
  
  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create verification codes table
CREATE TABLE IF NOT EXISTS verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz
);

-- Create blocked IPs table
CREATE TABLE IF NOT EXISTS blocked_ips (
  ip_address text PRIMARY KEY,
  reason text NOT NULL,
  blocked_at timestamptz DEFAULT now() NOT NULL,
  blocked_until timestamptz,
  blocked_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_ips ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  CREATE POLICY "Allow admin manage verification_codes"
    ON verification_codes
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  CREATE POLICY "Allow admin manage blocked_ips"
    ON blocked_ips
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add admin secret to settings
INSERT INTO admin_settings (id, settings)
VALUES (
  'security',
  jsonb_build_object(
    'admin_secret', gen_random_uuid(),
    'admin_creation_enabled', true
  )
)
ON CONFLICT (id) DO UPDATE
SET settings = admin_settings.settings || excluded.settings;

-- Create function to validate admin creation
CREATE OR REPLACE FUNCTION validate_admin_creation()
RETURNS trigger AS $$
BEGIN
  -- Check if admin creation is enabled
  IF NOT (
    SELECT (settings->>'admin_creation_enabled')::boolean
    FROM admin_settings
    WHERE id = 'security'
  ) THEN
    RAISE EXCEPTION 'Admin creation is currently disabled';
  END IF;

  -- Ensure user has admin role
  IF NEW.raw_user_meta_data->>'role' = 'admin' THEN
    INSERT INTO user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for admin creation validation
DROP TRIGGER IF EXISTS validate_admin_creation_trigger ON auth.users;
CREATE TRIGGER validate_admin_creation_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.raw_user_meta_data->>'role' = 'admin')
  EXECUTE FUNCTION validate_admin_creation();