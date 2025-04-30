/*
  # Add Admin Dashboard Tables

  1. New Tables
    - `system_metrics`
      - Real-time system performance metrics
      - Stores server uptime, CPU usage, memory usage, etc.
    
    - `security_alerts`
      - Security-related events and alerts
      - Stores alert type, message, timestamp, source IP
    
    - `audit_logs`
      - System activity audit trail
      - Tracks user actions, system changes, login attempts

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
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

-- Create policies for admin access
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_system_metrics_recorded_at ON system_metrics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_security_alerts_created_at ON security_alerts(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);

-- Insert some initial data for testing
INSERT INTO system_metrics (metric_name, metric_value, status) VALUES
  ('server_uptime', 99.9, 'healthy'),
  ('database_load', 45.0, 'normal'),
  ('network_latency', 24.0, 'normal'),
  ('cpu_usage', 62.0, 'normal');

INSERT INTO security_alerts (type, message, source_ip, location, severity) VALUES
  ('warning', 'Multiple failed login attempts detected', '192.168.1.105', 'Authentication Service', 'medium'),
  ('info', 'System backup completed successfully', NULL, 'Backup Server', 'low');

INSERT INTO audit_logs (action, details) VALUES
  ('user_registration', '{"email": "john@example.com"}'),
  ('settings_update', '{"component": "system", "changed_by": "admin@example.com"}'),
  ('security_alert', '{"type": "login_attempt", "status": "failed"}');