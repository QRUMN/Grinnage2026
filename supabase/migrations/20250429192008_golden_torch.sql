/*
  # Update admin audit logs policies

  1. Changes
    - Add RLS policy for admin audit logs table to allow admin creation
    - Allow public inserts during admin creation process
    - Ensure proper security checks for admin operations

  2. Security
    - Enable RLS on admin_audit_logs table (already enabled)
    - Add policy for admin creation audit logs
    - Add policy for admin operations
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Allow admin creation audit" ON admin_audit_logs;
DROP POLICY IF EXISTS "Allow admin manage admin_audit_logs" ON admin_audit_logs;

-- Policy for admin creation audit logs
CREATE POLICY "Allow admin creation audit"
ON admin_audit_logs
FOR INSERT
TO public
WITH CHECK (
  action = 'admin_creation' AND
  entity_type = 'user' AND
  NOT EXISTS (
    SELECT 1 FROM user_roles
    WHERE role = 'admin'
  )
);

-- Policy for admin operations
CREATE POLICY "Allow admin manage admin_audit_logs"
ON admin_audit_logs
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);