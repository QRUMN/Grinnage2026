/*
  # Fix User Status RLS Policies

  1. Changes
    - Enable RLS on user_status table
    - Add admin management policy
    - Add user self-management policy
  
  2. Security
    - Safe policy creation with existence checks
*/

-- Enable RLS
ALTER TABLE user_status ENABLE ROW LEVEL SECURITY;

-- Safely create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow admin manage user_status" ON user_status;
  DROP POLICY IF EXISTS "Allow users manage own status" ON user_status;
  
  -- Create new policies
  CREATE POLICY "Allow admin manage user_status"
    ON user_status
    FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

  CREATE POLICY "Allow users manage own status"
    ON user_status
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION
  WHEN undefined_object THEN null;
END $$;