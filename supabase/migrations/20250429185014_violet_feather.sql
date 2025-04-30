/*
  # Fix Admin Creation Policies

  1. Changes
    - Add missing RLS policies for admin creation
    - Fix admin audit logs access
    - Update admin role check policy
*/

-- Add policy for checking existing admins
CREATE POLICY "Allow public check admin existence"
  ON user_roles
  FOR SELECT
  TO public
  USING (role = 'admin');

-- Update admin audit logs policy to allow creation
CREATE POLICY "Allow admin creation audit"
  ON admin_audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (entity_type = 'user' AND action = 'admin_creation')
    OR auth.jwt() ->> 'role' = 'admin'
  );

-- Add policy for first admin creation
CREATE POLICY "Allow first admin creation"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    role = 'admin' 
    AND NOT EXISTS (
      SELECT 1 FROM user_roles WHERE role = 'admin'
    )
  );

-- Function to check if user is first admin
CREATE OR REPLACE FUNCTION is_first_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM user_roles WHERE role = 'admin'
  );
$$;