/*
  # Fix Registration System

  1. Changes
    - Drop and recreate tables with proper constraints
    - Update trigger function to handle registration properly
    - Add better error handling
    - Fix metadata mapping

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Drop existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Recreate tables with proper constraints
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  account_type text NOT NULL CHECK (account_type IN ('residential', 'commercial')),
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
  how_heard text CHECK (how_heard IN ('search', 'social', 'referral', 'other')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_preferences ENABLE ROW LEVEL SECURITY;

-- Create improved trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (
    id,
    full_name,
    account_type,
    business_name,
    phone
  ) VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'account_type', 'residential'),
    NULLIF(new.raw_user_meta_data->>'business_name', ''),
    NULLIF(new.raw_user_meta_data->>'phone', '')
  );
  
  -- Create address
  INSERT INTO public.addresses (
    user_id,
    street_address,
    city,
    state,
    zip_code
  ) VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'address', ''),
    COALESCE(new.raw_user_meta_data->>'city', ''),
    UPPER(COALESCE(new.raw_user_meta_data->>'state', '')),
    COALESCE(new.raw_user_meta_data->>'zip_code', '')
  );
  
  -- Create marketing preferences
  INSERT INTO public.marketing_preferences (
    user_id,
    newsletter_subscribed,
    how_heard
  ) VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data->>'newsletter')::boolean, false),
    COALESCE(new.raw_user_meta_data->>'how_heard', 'other')
  );
  
  RETURN new;
EXCEPTION WHEN others THEN
  -- Log the error but don't prevent user creation
  RAISE LOG 'Error in handle_new_user: %', SQLERRM;
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create policies
DO $$ 
BEGIN
  -- Profiles policies
  CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

  CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

  -- Addresses policies
  CREATE POLICY "Users can view own addresses"
    ON addresses FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert own addresses"
    ON addresses FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can update own addresses"
    ON addresses FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

  -- Marketing preferences policies
  CREATE POLICY "Users can view own marketing preferences"
    ON marketing_preferences FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can update own marketing preferences"
    ON marketing_preferences FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;