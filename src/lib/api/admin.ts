import { supabase } from '../supabase';
import type { SystemMetric, SecurityAlert, AuditLog } from '../../types/admin';

export const adminApi = {
  getSystemMetrics: async () => {
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .order('recorded_at', { ascending: false })
      .limit(4);

    if (error) throw error;
    return data as SystemMetric[];
  },

  getSecurityAlerts: async () => {
    const { data, error } = await supabase
      .from('security_alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data as SecurityAlert[];
  },

  getAuditLogs: async () => {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data as AuditLog[];
  }
};