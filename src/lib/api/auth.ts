import { supabase } from '../supabase';
import type { User } from '../../types/auth';

export const authApi = {
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