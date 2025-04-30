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

-- Create metrics functions for admin dashboard
CREATE OR REPLACE FUNCTION get_account_metrics()
RETURNS TABLE (
  account_type text,
  count bigint,
  latest_signup timestamptz
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.account_type::text,
    COUNT(*)::bigint,
    MAX(p.created_at)
  FROM profiles p
  GROUP BY p.account_type;
END;
$$;

-- Create RLS policy for the function
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow admin execute metrics" ON admin_settings;
  CREATE POLICY "Allow admin execute metrics"
    ON admin_settings
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

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