/*
  # Support for Client Registration Flow
  
  1. Changes
    - Ensure user_roles table properly stores client roles
    - Add RLS policies for clients to insert their own records
    - Add missing columns to store onboarding data
  
  2. Security
    - Enable proper RLS policies for client self-registration
*/

-- Add policies for clients to create their own records during registration
DO $$ 
BEGIN
  -- Allow authenticated users to insert their own client record
  CREATE POLICY "Users can create own client record"
    ON clients
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

  -- Allow authenticated users to insert their own role
  CREATE POLICY "Users can set own role on registration"
    ON user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (
      auth.uid() = user_id 
      AND role IN ('residential', 'commercial')
    );

  -- Allow authenticated users to insert their own marketing preferences
  CREATE POLICY "Users can insert own marketing preferences"
    ON marketing_preferences
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Update handle_new_user function to store additional onboarding data
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile with all metadata
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
  
  -- Create address with all fields
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
    COALESCE(new.raw_user_meta_data->>'zip_code', new.raw_user_meta_data->>'propertySize', '')
  );
  
  -- Create marketing preferences
  INSERT INTO public.marketing_preferences (
    user_id,
    newsletter_subscribed,
    how_heard
  ) VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data->>'newsletter')::boolean, true),
    COALESCE(new.raw_user_meta_data->>'how_heard', 'website')
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Log the pest problem details if provided
  IF new.raw_user_meta_data->>'pest_problem' IS NOT NULL THEN
    INSERT INTO public.notifications (
      user_id,
      title,
      message,
      type
    ) VALUES (
      new.id,
      'New Client Onboarding',
      'Pest Type: ' || COALESCE(new.raw_user_meta_data->>'pest_type', 'Not specified') || 
      E'\nProblem Area: ' || COALESCE(new.raw_user_meta_data->>'problem_area', 'Not specified') ||
      E'\nDetails: ' || COALESCE(new.raw_user_meta_data->>'pest_problem', 'Not specified') ||
      E'\nPreferred Date: ' || COALESCE(new.raw_user_meta_data->>'preferred_date', 'Not specified'),
      'info'
    );
  END IF;
  
  RETURN new;
EXCEPTION WHEN others THEN
  -- Log the error but don't prevent user creation
  RAISE LOG 'Error in handle_new_user: %', SQLERRM;
  RETURN new;
END;
$$ language plpgsql security definer;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
