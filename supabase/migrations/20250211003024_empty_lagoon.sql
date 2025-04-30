/*
  # Admin System Schema Update

  1. New Tables
    - `admin_notifications`: System-wide notifications and alerts
    - `admin_settings`: System configuration and settings
    - `admin_audit_logs`: Detailed audit trail of admin actions
    - `admin_maintenance_logs`: System maintenance records

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
    - Add functions for admin operations

  3. Changes
    - Add admin-specific functions and triggers
    - Add indexes for performance
*/

-- Create admin notifications table
CREATE TABLE IF NOT EXISTS admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('alert', 'info', 'success', 'warning')),
  title text NOT NULL,
  message text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  read_at timestamptz,
  read_by uuid REFERENCES auth.users(id)
);

-- Create admin settings table with settings as JSONB
CREATE TABLE IF NOT EXISTS admin_settings (
  id text PRIMARY KEY,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now() NOT NULL,
  updated_by uuid REFERENCES auth.users(id)
);

-- Create admin audit logs table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  changes jsonb,
  performed_by uuid REFERENCES auth.users(id) NOT NULL,
  performed_at timestamptz DEFAULT now() NOT NULL,
  ip_address text,
  user_agent text
);

-- Create admin maintenance logs table
CREATE TABLE IF NOT EXISTS admin_maintenance_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('backup', 'optimization', 'maintenance', 'cache_clear')),
  status text NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed', 'failed')),
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  started_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz,
  performed_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_maintenance_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  -- Admin notifications policies
  CREATE POLICY "Allow admin read notifications"
    ON admin_notifications
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  CREATE POLICY "Allow admin manage notifications"
    ON admin_notifications
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  -- Admin settings policies
  CREATE POLICY "Allow admin read settings"
    ON admin_settings
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  CREATE POLICY "Allow admin manage settings"
    ON admin_settings
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  -- Admin audit logs policies
  CREATE POLICY "Allow admin read audit logs"
    ON admin_audit_logs
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  -- Admin maintenance logs policies
  CREATE POLICY "Allow admin read maintenance logs"
    ON admin_maintenance_logs
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  CREATE POLICY "Allow admin manage maintenance logs"
    ON admin_maintenance_logs
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create admin functions
CREATE OR REPLACE FUNCTION log_admin_action(
  action_type text,
  entity_type text,
  entity_id text,
  changes jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Get current user ID
  _user_id := auth.uid();
  
  -- Insert audit log
  INSERT INTO admin_audit_logs (
    action,
    entity_type,
    entity_id,
    changes,
    performed_by
  ) VALUES (
    action_type,
    entity_type,
    entity_id,
    changes,
    _user_id
  );
END;
$$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_admin_notifications_created_at ON admin_notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_type ON admin_notifications(type);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_severity ON admin_notifications(severity);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_performed_at ON admin_audit_logs(performed_at);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_action ON admin_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_maintenance_logs_started_at ON admin_maintenance_logs(started_at);
CREATE INDEX IF NOT EXISTS idx_admin_maintenance_logs_type ON admin_maintenance_logs(type);

-- Insert default admin settings
INSERT INTO admin_settings (id, settings) VALUES
  ('general', '{"language": "en", "timezone": "UTC"}'::jsonb),
  ('security', '{"two_factor_required": true, "password_policy": "strong"}'::jsonb),
  ('branding', '{"primary_color": "#56e39f", "secondary_color": "#131112"}'::jsonb),
  ('notifications', '{"email_notifications": true, "browser_notifications": true}'::jsonb)
ON CONFLICT (id) DO NOTHING;