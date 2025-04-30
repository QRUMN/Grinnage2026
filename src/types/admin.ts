export interface SystemMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  status: 'healthy' | 'normal' | 'warning' | 'critical';
  recorded_at: string;
}

export interface SecurityAlert {
  id: string;
  type: string;
  message: string;
  source_ip: string | null;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  resolved_at: string | null;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  details: Record<string, any>;
  ip_address: string | null;
  created_at: string;
}