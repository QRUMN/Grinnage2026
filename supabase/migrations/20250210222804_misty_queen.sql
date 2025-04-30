/*
  # Admin Settings and Metrics Schema

  1. New Tables
    - admin_settings: Store system configuration
  
  2. Functions
    - log_admin_action: Record admin activities
  
  3. Initial Data
    - Default admin settings
*/

-- Create admin settings table for storing configurations
CREATE TABLE IF NOT EXISTS admin_settings (
  id text PRIMARY KEY,
  settings jsonb NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on admin settings
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create admin settings policy
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow admin manage settings" ON admin_settings;
  CREATE POLICY "Allow admin manage settings"
    ON admin_settings
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Insert default admin settings
INSERT INTO admin_settings (id, settings)
VALUES 
  ('general', '{"language": "en", "timezone": "UTC"}'::jsonb),
  ('security', '{"twoFactorRequired": true, "passwordPolicy": "high"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  action_type text,
  action_details jsonb
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO audit_logs (
    action,
    details,
    user_id
  ) VALUES (
    action_type,
    action_details,
    auth.uid()
  );
END;
$$;