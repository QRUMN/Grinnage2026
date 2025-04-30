import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { sendVerificationEmail, verifyEmailCode } from '../lib/email';
import { useNavigate } from 'react-router-dom';

export const useAdminCreation = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const generateVerificationCode = () => {
    return Math.random().toString().slice(2, 8);
  };

  const initiateVerification = async (email: string) => {
    try {
      setIsVerifying(true);
      setError(null);

      // Check if email already exists
      const { data: existingUsers, error: queryError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin')
        .limit(1);

      if (queryError) throw queryError;

      if (existingUsers && existingUsers.length > 0) {
        throw new Error('An admin account already exists');
      }

      // Generate and send verification code
      const code = generateVerificationCode();
      
      // Store verification code
      const { error: codeError } = await supabase
        .from('verification_codes')
        .insert([{
          email,
          code,
          type: 'admin_creation',
          expires_at: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
        }]);

      if (codeError) throw codeError;

      // Send verification email
      const emailSent = await sendVerificationEmail(email, code);
      if (!emailSent) {
        throw new Error('Failed to send verification email');
      }

      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyAndCreateAdmin = async (
    email: string,
    code: string,
    userData: any
  ) => {
    try {
      setIsVerifying(true);
      setError(null);

      // Verify the code
      const { data: verificationData, error: verificationError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code)
        .eq('type', 'admin_creation')
        .is('used_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (verificationError || !verificationData) {
        throw new Error('Invalid or expired verification code');
      }

      // Mark code as used
      await supabase
        .from('verification_codes')
        .update({ used_at: new Date().toISOString() })
        .eq('id', verificationData.id);

      // Create admin user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            role: 'admin',
            full_name: `${userData.firstName} ${userData.lastName}`,
            phone: userData.phone
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!user) throw new Error('Failed to create admin account');

      // Create admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: user.id,
          role: 'admin'
        }]);

      if (roleError) throw roleError;

      // Log successful creation in admin_audit_logs
      // Note: We don't need to specify performed_by as it will be handled by RLS
      const { error: logError } = await supabase
        .from('admin_audit_logs')
        .insert([{
          action: 'admin_creation',
          entity_type: 'user',
          entity_id: user.id,
          changes: { email: userData.email, success: true },
          performed_by: user.id,
          ip_address: window.location.hostname,
          user_agent: navigator.userAgent
        }]);

      if (logError) {
        console.error('Failed to log admin creation:', logError);
        // Don't throw error here as the admin was successfully created
      }

      // Sign in the newly created admin
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      });

      if (signInError) throw signInError;

      navigate('/admin');
      return user;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    initiateVerification,
    verifyAndCreateAdmin,
    isVerifying,
    error
  };
};