/*
  # User Profile and Preferences Schema Update

  1. Types
    - Safe creation of account_type and referral_source enums
  2. Tables
    - Profiles: User profile information
    - Addresses: User address information
    - Marketing Preferences: User marketing settings
  3. Security
    - RLS policies with existence checks
  4. Functions
    - Improved handle_new_user trigger function
*/

-- Safely create custom types
DO $$ BEGIN
  CREATE TYPE account_type AS ENUM ('personal', 'business');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE referral_source AS ENUM ('search', 'social', 'referral', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type account_type NOT NULL DEFAULT 'personal',
  full_name text NOT NULL,
  business_name text,
  phone text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  street_address text NOT NULL,
  city text NOT NULL,
  state char(2) NOT NULL,
  zip_code text NOT NULL,
  is_primary boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS marketing_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  newsletter_subscribed boolean DEFAULT false,
  referral_source referral_source,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_preferences ENABLE ROW LEVEL SECURITY;

-- Safely create policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
  CREATE POLICY "Users can view own profile"
    ON profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  CREATE POLICY "Users can update own profile"
    ON profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
  CREATE POLICY "Users can view own addresses"
    ON addresses
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can insert own addresses" ON addresses;
  CREATE POLICY "Users can insert own addresses"
    ON addresses
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update own addresses" ON addresses;
  CREATE POLICY "Users can update own addresses"
    ON addresses
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete own addresses" ON addresses;
  CREATE POLICY "Users can delete own addresses"
    ON addresses
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own marketing preferences" ON marketing_preferences;
  CREATE POLICY "Users can view own marketing preferences"
    ON marketing_preferences
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update own marketing preferences" ON marketing_preferences;
  CREATE POLICY "Users can update own marketing preferences"
    ON marketing_preferences
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN undefined_object THEN
  NULL;
END $$;

-- Create functions and triggers
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  account_type_val account_type;
  referral_source_val referral_source;
BEGIN
  -- Map residential/commercial to personal/business
  account_type_val := CASE 
    WHEN new.raw_user_meta_data->>'account_type' = 'residential' THEN 'personal'::account_type
    WHEN new.raw_user_meta_data->>'account_type' = 'commercial' THEN 'business'::account_type
    ELSE 'personal'::account_type
  END;

  -- Safely convert referral source
  BEGIN
    referral_source_val := (new.raw_user_meta_data->>'howHeard')::referral_source;
  EXCEPTION WHEN OTHERS THEN
    referral_source_val := 'other'::referral_source;
  END;

  -- Create profile
  INSERT INTO public.profiles (
    id,
    full_name,
    account_type,
    business_name,
    phone
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    account_type_val,
    NULLIF(new.raw_user_meta_data->>'business_name', ''),
    NULLIF(new.raw_user_meta_data->>'phone', '')
  );
  
  -- Create marketing preferences
  INSERT INTO public.marketing_preferences (
    user_id,
    newsletter_subscribed,
    referral_source
  )
  VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data->>'newsletter')::boolean, false),
    referral_source_val
  );
  
  -- Create address
  INSERT INTO public.addresses (
    user_id,
    street_address,
    city,
    state,
    zip_code
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'address', ''),
    COALESCE(new.raw_user_meta_data->>'city', ''),
    UPPER(COALESCE(new.raw_user_meta_data->>'state', '')),
    COALESCE(new.raw_user_meta_data->>'zipCode', '')
  );
  
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'Error in handle_new_user: %', SQLERRM;
  RETURN new;
END;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_marketing_preferences_user_id ON marketing_preferences(user_id);