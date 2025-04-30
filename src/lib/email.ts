import { supabase } from './supabase';

export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    // Store verification code
    const { error: codeError } = await supabase
      .from('verification_codes')
      .insert([{
        email,
        code,
        type: 'email_verification',
        expires_at: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiry
      }]);

    if (codeError) throw codeError;

    // Log the verification attempt
    await supabase.from('audit_logs').insert([{
      action: 'verification_email_sent',
      details: { email }
    }]);

    // In a real application, you would integrate with an email service provider
    // For demo purposes, we'll log the code to the console
    console.log(`Verification code for ${email}: ${code}`);

    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return false;
  }
};

export const verifyEmailCode = async (email: string, code: string) => {
  try {
    const { data, error } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('type', 'email_verification')
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) return false;

    // Mark code as used
    await supabase
      .from('verification_codes')
      .update({ used_at: new Date().toISOString() })
      .eq('id', data.id);

    // Log successful verification
    await supabase.from('audit_logs').insert([{
      action: 'email_verified',
      details: { email }
    }]);

    return true;
  } catch (error) {
    console.error('Failed to verify code:', error);
    return false;
  }
};

export const generateVerificationCode = () => {
  return Math.random().toString().slice(2, 8);
};