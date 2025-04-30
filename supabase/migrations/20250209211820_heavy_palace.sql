/*
  # Fix User Registration Process

  1. Changes
    - Add INSERT policies for profiles and marketing_preferences tables
    - Improve error handling in handle_new_user function
    - Add default values for required fields
    - Add insert policy for marketing preferences
  
  2. Security
    - Maintain existing RLS policies
    - Add new INSERT policies for required tables
*/

-- Add missing INSERT policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
  CREATE POLICY "Users can insert own profile"
    ON profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can insert marketing preferences" ON marketing_preferences;
  CREATE POLICY "Users can insert marketing preferences"
    ON marketing_preferences
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

-- Improve handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  account_type_val account_type;
  referral_source_val referral_source;
BEGIN
  -- Map residential/commercial to personal/business with safe default
  account_type_val := CASE 
    WHEN NULLIF(new.raw_user_meta_data->>'account_type', '') = 'residential' THEN 'personal'::account_type
    WHEN NULLIF(new.raw_user_meta_data->>'account_type', '') = 'commercial' THEN 'business'::account_type
    ELSE 'personal'::account_type
  END;

  -- Safely convert referral source with default
  BEGIN
    referral_source_val := NULLIF(new.raw_user_meta_data->>'howHeard', '')::referral_source;
  EXCEPTION WHEN OTHERS THEN
    referral_source_val := 'other'::referral_source;
  END;

  -- Create profile with safe defaults
  INSERT INTO public.profiles (
    id,
    full_name,
    account_type,
    business_name,
    phone
  )
  VALUES (
    new.id,
    COALESCE(NULLIF(new.raw_user_meta_data->>'full_name', ''), 'User'),
    account_type_val,
    NULLIF(new.raw_user_meta_data->>'business_name', ''),
    NULLIF(new.raw_user_meta_data->>'phone', '')
  );
  
  -- Create marketing preferences with safe defaults
  INSERT INTO public.marketing_preferences (
    user_id,
    newsletter_subscribed,
    referral_source
  )
  VALUES (
    new.id,
    COALESCE(NULLIF((new.raw_user_meta_data->>'newsletter')::boolean, NULL), false),
    referral_source_val
  );
  
  -- Create address with safe defaults
  INSERT INTO public.addresses (
    user_id,
    street_address,
    city,
    state,
    zip_code
  )
  VALUES (
    new.id,
    COALESCE(NULLIF(new.raw_user_meta_data->>'address', ''), 'Not provided'),
    COALESCE(NULLIF(new.raw_user_meta_data->>'city', ''), 'Not provided'),
    UPPER(COALESCE(NULLIF(new.raw_user_meta_data->>'state', ''), 'NA')),
    COALESCE(NULLIF(new.raw_user_meta_data->>'zipCode', ''), '00000')
  );
  
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Log error details but don't fail the transaction
  RAISE LOG 'Error in handle_new_user for user %: %', new.id, SQLERRM;
  RETURN new;
END;
$$ language plpgsql security definer;