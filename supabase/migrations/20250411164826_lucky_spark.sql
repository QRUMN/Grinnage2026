/*
  # Add Verification System Tables

  1. New Tables
    - verification_codes: Store email verification codes
    - verification_attempts: Track verification attempts for rate limiting
  
  2. Security
    - Enable RLS
    - Add policies for verification
    - Add rate limiting functions
*/

-- Create verification codes table
CREATE TABLE IF NOT EXISTS verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  attempts int DEFAULT 0
);

-- Create verification attempts table
CREATE TABLE IF NOT EXISTS verification_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address text NOT NULL,
  attempt_count int DEFAULT 1,
  last_attempt timestamptz DEFAULT now(),
  blocked_until timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_attempts ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON verification_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_verification_attempts_email ON verification_attempts(email);
CREATE INDEX IF NOT EXISTS idx_verification_attempts_ip ON verification_attempts(ip_address);

-- Create policies
DO $$ 
BEGIN
  -- Verification codes policies
  CREATE POLICY "Allow insert verification codes"
    ON verification_codes
    FOR INSERT
    WITH CHECK (true);

  CREATE POLICY "Allow update own verification codes"
    ON verification_codes
    FOR UPDATE
    USING (email = auth.email());

  -- Verification attempts policies
  CREATE POLICY "Allow insert verification attempts"
    ON verification_attempts
    FOR INSERT
    WITH CHECK (true);

  CREATE POLICY "Allow update own verification attempts"
    ON verification_attempts
    FOR UPDATE
    USING (email = auth.email());
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create function to check verification rate limit
CREATE OR REPLACE FUNCTION check_verification_rate_limit(
  p_email text,
  p_ip_address text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_attempts int;
  v_blocked_until timestamptz;
BEGIN
  -- Check if IP is blocked
  SELECT blocked_until INTO v_blocked_until
  FROM verification_attempts
  WHERE ip_address = p_ip_address
  ORDER BY last_attempt DESC
  LIMIT 1;

  IF v_blocked_until IS NOT NULL AND v_blocked_until > now() THEN
    RETURN false;
  END IF;

  -- Count attempts in the last hour
  SELECT count(*) INTO v_attempts
  FROM verification_attempts
  WHERE email = p_email
    AND ip_address = p_ip_address
    AND last_attempt > now() - interval '1 hour';

  -- Block if too many attempts
  IF v_attempts >= 5 THEN
    INSERT INTO verification_attempts (
      email,
      ip_address,
      blocked_until
    ) VALUES (
      p_email,
      p_ip_address,
      now() + interval '1 hour'
    );
    RETURN false;
  END IF;

  -- Record attempt
  INSERT INTO verification_attempts (
    email,
    ip_address
  ) VALUES (
    p_email,
    p_ip_address
  );

  RETURN true;
END;
$$;