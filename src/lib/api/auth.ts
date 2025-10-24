import { supabase } from '../supabase';
import type { User } from '../../types/auth';
import type { OnboardingFormData } from '../../types';

export const authApi = {
  register: async (formData: OnboardingFormData) => {
    try {
      // Prepare metadata for user registration
      const metadata = {
        full_name: formData.fullName,
        account_type: formData.clientType,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.propertySize, // Using propertySize temporarily as zip
        newsletter: true, // Default to true for new registrations
        how_heard: 'website',
        pest_type: formData.pestType,
        problem_area: formData.problemArea,
        pest_problem: formData.pestProblem,
        preferred_date: formData.preferredDate,
        additional_notes: formData.additionalNotes
      };

      // Create user account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Failed to create account');

      // The database trigger will automatically create profiles, addresses, and marketing_preferences records
      // But we also need to:
      
      // 1. Assign client role in user_roles table
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: authData.user.id,
          role: formData.clientType // 'residential' or 'commercial'
        }]);

      if (roleError) {
        console.error('Failed to assign user role:', roleError);
      }

      // 2. Create client record for linking to appointments
      const { error: clientError } = await supabase
        .from('clients')
        .insert([{
          user_id: authData.user.id,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.propertySize, // Temporary until we get actual zip
          property_type: formData.clientType,
          property_size: formData.propertySize,
          notes: `Pest Type: ${formData.pestType}\nProblem Area: ${formData.problemArea}\nDetails: ${formData.pestProblem}`
        }]);

      if (clientError) {
        console.error('Failed to create client record:', clientError);
      }

      return { user: authData.user, error: null };
    } catch (error: any) {
      console.error('Registration failed:', error);
      return { user: null, error };
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      // Fetch additional user data from profiles and roles
      const [profileResult, roleResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single(),
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single()
      ]);

      if (profileResult.error || roleResult.error) {
        console.error('Error fetching user data:', {
          profile: profileResult.error,
          role: roleResult.error
        });
        return null;
      }

      return {
        id: user.id,
        email: user.email!,
        fullName: profileResult.data.full_name,
        role: roleResult.data.role
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return !error && !!session;
  }
};