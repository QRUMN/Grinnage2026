/*
  # User Management Schema Update

  1. New Tables
    - user_roles: Store user role assignments
    - user_status: Track user account status
  
  2. Functions
    - manage_user_role: Handle role assignments
    - update_user_status: Update account status
*/

-- Create user roles table
CREATE TABLE IF NOT EXISTS user_roles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'commercial', 'residential')),
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz DEFAULT now() NOT NULL
);

-- Create user status table
CREATE TABLE IF NOT EXISTS user_status (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('active', 'suspended', 'pending')),
  last_login timestamptz,
  updated_at timestamptz DEFAULT now() NOT NULL,
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_status ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  CREATE POLICY "Allow admin manage user_roles"
    ON user_roles
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

  CREATE POLICY "Allow admin manage user_status"
    ON user_status
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create function to manage user roles
CREATE OR REPLACE FUNCTION manage_user_role(
  target_user_id uuid,
  new_role text,
  admin_user_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO user_roles (user_id, role, assigned_by)
  VALUES (target_user_id, new_role, admin_user_id)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    role = EXCLUDED.role,
    assigned_by = EXCLUDED.assigned_by,
    assigned_at = now();

  -- Log the action
  PERFORM log_admin_action(
    'user_role_update',
    jsonb_build_object(
      'user_id', target_user_id,
      'new_role', new_role,
      'admin_id', admin_user_id
    )
  );
END;
$$;