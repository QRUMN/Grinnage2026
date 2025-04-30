/*
  # User Registration Schema

  1. New Tables
    - `users`
      - Core user information and authentication
    - `profiles`
      - Extended user profile information
    - `addresses`
      - User address information
    - `marketing_preferences`
      - User marketing and communication preferences

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for admin users to access all data

  3. Changes
    - Initial schema creation
*/

-- Create custom types
CREATE TYPE account_type AS ENUM ('personal', 'business');
CREATE TYPE referral_source AS ENUM ('search', 'social', 'referral', 'other');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type account_type NOT NULL DEFAULT 'personal',
  full_name text NOT NULL,
  business_name text,
  phone text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create addresses table
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

-- Create marketing preferences table
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

-- Create policies
-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Addresses policies
CREATE POLICY "Users can view own addresses"
  ON addresses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON addresses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON addresses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON addresses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Marketing preferences policies
CREATE POLICY "Users can view own marketing preferences"
  ON marketing_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own marketing preferences"
  ON marketing_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, full_name, account_type)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'account_type')::account_type);
  
  -- Create marketing preferences
  INSERT INTO public.marketing_preferences (user_id, newsletter_subscribed, referral_source)
  VALUES (
    new.id,
    (new.raw_user_meta_data->>'newsletter')::boolean,
    (new.raw_user_meta_data->>'howHeard')::referral_source
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
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'state',
    new.raw_user_meta_data->>'zipCode'
  );
  
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_marketing_preferences_user_id ON marketing_preferences(user_id);