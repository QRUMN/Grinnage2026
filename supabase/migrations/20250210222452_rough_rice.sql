/*
  # Admin Dashboard Tables and Policies

  1. New Tables
    - system_metrics: Store system performance metrics
    - security_alerts: Track security-related events
    - audit_logs: Record system activity
  
  2. Security
    - Enable RLS on all tables
    - Add admin-only access policies
    - Create indexes for performance
  
  3. Initial Data
    - Sample metrics data
    - Example security alerts
    - Test audit logs
*/

-- System Metrics Table
CREATE TABLE IF NOT EXISTS system_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  status text NOT NULL,
  recorded_at timestamptz DEFAULT now() NOT NULL
);

-- Security Alerts Table
CREATE TABLE IF NOT EXISTS security_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  message text NOT NULL,
  source_ip text,
  location text,
  severity text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  resolved_at timestamptz
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  details jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Safely create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow admin read system_metrics" ON system_metrics;
  DROP POLICY IF EXISTS "Allow admin read security_alerts" ON security_alerts;
  DROP POLICY IF EXISTS "Allow admin read audit_logs" ON audit_logs;
  
  -- Create new policies
  CREATE POLICY "Allow admin read system_metrics"
    ON system_metrics
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  CREATE POLICY "Allow admin read security_alerts"
    ON security_alerts
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  CREATE POLICY "Allow admin read audit_logs"
    ON audit_logs
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_system_metrics_recorded_at ON system_metrics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_security_alerts_created_at ON security_alerts(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);

-- Insert initial data if tables are empty
INSERT INTO system_metrics (metric_name, metric_value, status)
SELECT m.metric_name, m.metric_value, m.status
FROM (VALUES
  ('server_uptime', 99.9, 'healthy'),
  ('database_load', 45.0, 'normal'),
  ('network_latency', 24.0, 'normal'),
  ('cpu_usage', 62.0, 'normal')
) AS m(metric_name, metric_value, status)
WHERE NOT EXISTS (SELECT 1 FROM system_metrics LIMIT 1);

INSERT INTO security_alerts (type, message, source_ip, location, severity)
SELECT a.type, a.message, a.source_ip, a.location, a.severity
FROM (VALUES
  ('warning', 'Multiple failed login attempts detected', '192.168.1.105', 'Authentication Service', 'medium'),
  ('info', 'System backup completed successfully', NULL, 'Backup Server', 'low')
) AS a(type, message, source_ip, location, severity)
WHERE NOT EXISTS (SELECT 1 FROM security_alerts LIMIT 1);

INSERT INTO audit_logs (action, details)
SELECT l.action, l.details::jsonb
FROM (VALUES
  ('user_registration', '{"email": "john@example.com"}'::text),
  ('settings_update', '{"component": "system", "changed_by": "admin@example.com"}'::text),
  ('security_alert', '{"type": "login_attempt", "status": "failed"}'::text)
) AS l(action, details)
WHERE NOT EXISTS (SELECT 1 FROM audit_logs LIMIT 1);