import { supabase } from '../lib/supabase';

// Simple in-memory rate limiting implementation
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private windowMs: number;
  private maxAttempts: number;

  constructor(windowMs: number, maxAttempts: number) {
    this.windowMs = windowMs;
    this.maxAttempts = maxAttempts;
  }

  async checkRateLimit(ip: string): Promise<boolean> {
    const now = Date.now();
    const record = this.attempts.get(ip);

    if (!record || now > record.resetTime) {
      this.attempts.set(ip, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count += 1;
    return true;
  }
}

// Create rate limiter instance
const adminRateLimiter = new RateLimiter(15 * 60 * 1000, 5); // 15 minutes window, 5 attempts

// IP blocking middleware
export const blockSuspiciousIPs = async (req: Request) => {
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
  
  if (!clientIP) return false;

  const { data: blockedIP } = await supabase
    .from('security_alerts')
    .select('source_ip')
    .eq('source_ip', clientIP)
    .eq('type', 'blocked')
    .single();

  return !!blockedIP;
};

// Verify admin secret token
export const verifyAdminSecret = async (token: string) => {
  const { data: setting } = await supabase
    .from('admin_settings')
    .select('settings')
    .eq('id', 'security')
    .single();

  return setting?.settings?.admin_secret === token;
};

// Log admin creation attempt
export const logAdminCreationAttempt = async (
  email: string,
  success: boolean,
  ip: string
) => {
  try {
    await supabase.from('admin_audit_logs').insert([{
      action: 'admin_creation_attempt',
      entity_type: 'user',
      entity_id: email,
      changes: { email, success },
      ip_address: ip,
      // Don't set performed_by for initial admin creation
      performed_by: success ? (await supabase.auth.getUser()).data.user?.id : null
    }]);
  } catch (error) {
    console.error('Failed to log admin creation attempt:', error);
    // Don't throw the error as this is a non-critical operation
  }
};

export { adminRateLimiter };