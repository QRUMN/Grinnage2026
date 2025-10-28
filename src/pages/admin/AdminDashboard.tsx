import React, { useState } from 'react';
import {
  Users, UserPlus, Calendar, TrendingUp, DollarSign,
  BarChart3, Clock, Star, Phone, Mail,
  CheckCircle, AlertCircle, ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted';
  serviceType: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  message: string;
  createdAt: string;
}

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  conversions: number;
  revenue: number;
  pendingAppointments: number;
  activeClients: number;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data
  const stats: DashboardStats = {
    totalLeads: 47,
    newLeads: 8,
    conversions: 12,
    revenue: 15420,
    pendingAppointments: 5,
    activeClients: 34
  };

  const recentLeads: Lead[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(302) 562-5654',
      status: 'new',
      serviceType: 'Residential Inspection',
      urgency: 'high',
      message: 'Found ants in kitchen, need urgent inspection.',
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mchen@techcorp.com',
      phone: '(555) 987-6543',
      status: 'contacted',
      serviceType: 'Commercial Treatment',
      urgency: 'medium',
      message: 'Office building needs quarterly pest control service.',
      createdAt: '2025-01-14T14:20:00Z'
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      email: 'lisa.r.home@gmail.com',
      status: 'quoted',
      serviceType: 'Termite Treatment',
      urgency: 'high',
      message: 'Termites found in basement, need immediate treatment.',
      createdAt: '2025-01-13T09:15:00Z'
    }
  ];

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      change: '+12%',
      icon: <UserPlus className="w-6 h-6" />,
      color: 'neon',
      trend: 'up'
    },
    {
      title: 'New Leads',
      value: stats.newLeads,
      change: 'today',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'cyan',
      trend: 'neutral'
    },
    {
      title: 'Conversions',
      value: stats.conversions,
      change: '+8%',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'neon',
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+23%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'cyan',
      trend: 'up'
    },
    {
      title: 'Pending Appointments',
      value: stats.pendingAppointments,
      change: 'this week',
      icon: <Calendar className="w-6 h-6" />,
      color: 'neon',
      trend: 'neutral'
    },
    {
      title: 'Active Clients',
      value: stats.activeClients,
      change: '+15%',
      icon: <Users className="w-6 h-6" />,
      color: 'cyan',
      trend: 'up'
    }
  ];

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-neon-green/20 text-neon-green border-neon-green/30';
      case 'contacted': return 'bg-accent-500/20 text-accent-400 border-accent-500/30';
      case 'quoted': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'converted': return 'bg-success-500/20 text-success-400 border-success-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getUrgencyColor = (urgency: Lead['urgency']) => {
    switch (urgency) {
      case 'emergency': return 'text-error-400';
      case 'high': return 'text-accent-400';
      case 'medium': return 'text-neon-cyan';
      case 'low': return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">
          Welcome back, Keith. Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="group relative backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                     border border-neon-green/20 rounded-2xl p-6 shadow-lg
                     hover:shadow-glow hover:-translate-y-1 hover:border-neon-green/40 hover:scale-105
                     transition-all duration-500 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                          bg-gradient-to-r from-transparent via-neon-green/5 to-transparent
                          transition-transform duration-1000 pointer-events-none rounded-2xl" />

            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shadow-glow",
                stat.color === 'neon' ? 'bg-neon-green/20 text-neon-green' : 'bg-accent-500/20 text-accent-400'
              )}>
                {stat.icon}
              </div>
              {stat.trend === 'up' && (
                <div className="flex items-center gap-1 px-2 py-1 bg-success-500/20 border border-success-500/30 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-success-400" />
                  <span className="text-xs font-semibold text-success-400">{stat.change}</span>
                </div>
              )}
            </div>

            <div className="mb-1">
              <div className="text-4xl font-bold text-white font-mono mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                        border border-neon-green/20 rounded-2xl p-6 shadow-glow">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Recent Leads</h2>
                <p className="text-sm text-gray-400">{recentLeads.length} new inquiries</p>
              </div>
              <button
                onClick={() => navigate('/admin/leads')}
                className="px-4 py-2 backdrop-blur-sm border border-neon-green/30 text-neon-green rounded-lg
                         hover:bg-neon-green/10 hover:shadow-glow transition-all duration-300
                         flex items-center gap-2"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div
                  key={lead.id}
                  className="p-4 bg-dark-surface/40 backdrop-blur-sm border border-dark-border rounded-xl
                           hover:border-neon-green/30 hover:bg-dark-surface/60 transition-all duration-300
                           cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate('/admin/leads')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white">{lead.name}</h3>
                        <span className={cn(
                          "px-2 py-0.5 text-xs font-semibold rounded-full border backdrop-blur-sm",
                          getStatusColor(lead.status)
                        )}>
                          {lead.status}
                        </span>
                        <span className={cn("text-xs font-medium", getUrgencyColor(lead.urgency))}>
                          {lead.urgency === 'emergency' && '🚨 '}
                          {lead.urgency.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mb-1">{lead.serviceType}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                    {lead.message}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                        border border-neon-green/20 rounded-2xl p-6 shadow-glow">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin/clients')}
                className="w-full p-4 bg-dark-surface/40 backdrop-blur-sm border border-dark-border rounded-xl
                         hover:border-neon-green/30 hover:bg-dark-surface/60 hover:shadow-glow
                         transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center text-neon-green shadow-glow">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-neon-green transition-colors">
                      Add New Client
                    </div>
                    <div className="text-xs text-gray-400">Create client profile</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-neon-green group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/appointments')}
                className="w-full p-4 bg-dark-surface/40 backdrop-blur-sm border border-dark-border rounded-xl
                         hover:border-neon-green/30 hover:bg-dark-surface/60 hover:shadow-glow
                         transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-400 shadow-glow-cyan">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-neon-green transition-colors">
                      Schedule Appointment
                    </div>
                    <div className="text-xs text-gray-400">Book new service</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-neon-green group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/content')}
                className="w-full p-4 bg-dark-surface/40 backdrop-blur-sm border border-dark-border rounded-xl
                         hover:border-neon-green/30 hover:bg-dark-surface/60 hover:shadow-glow
                         transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center text-neon-green shadow-glow">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-neon-green transition-colors">
                      Manage Content
                    </div>
                    <div className="text-xs text-gray-400">Edit website content</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-neon-green group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                        border border-neon-green/20 rounded-2xl p-6 shadow-glow">
            <h3 className="text-xl font-bold text-white mb-4">This Month</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Conversion Rate</span>
                <span className="text-lg font-bold text-neon-green font-mono">25.5%</span>
              </div>
              
              <div className="w-full bg-dark-surface/60 rounded-full h-2">
                <div className="bg-gradient-to-r from-neon-green to-accent-500 h-2 rounded-full shadow-glow" 
                     style={{ width: '25.5%' }} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-400">Avg Response Time</span>
                <span className="text-lg font-bold text-accent-400 font-mono">45min</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Customer Satisfaction</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-neon-green fill-neon-green" />
                  <span className="text-lg font-bold text-white font-mono">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-dark-surface/30 to-dark-bg/40
                    border border-neon-green/20 rounded-2xl p-6 shadow-glow">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-neon-green" />
          Recent Activity
        </h2>

        <div className="space-y-4">
          {[
            { action: 'New lead submitted', name: 'Sarah Johnson', time: '5 minutes ago', type: 'lead' },
            { action: 'Appointment scheduled', name: 'Mike Chen', time: '1 hour ago', type: 'appointment' },
            { action: 'Payment received', name: 'Lisa Rodriguez', time: '3 hours ago', type: 'payment' },
            { action: 'Service completed', name: 'John Smith', time: '5 hours ago', type: 'service' }
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-dark-surface/40 backdrop-blur-sm border border-dark-border 
                       rounded-xl hover:border-neon-green/30 hover:bg-dark-surface/60 transition-all duration-300"
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                activity.type === 'lead' ? 'bg-neon-green shadow-glow animate-neon-pulse' :
                activity.type === 'payment' ? 'bg-success-400 shadow-glow' :
                activity.type === 'appointment' ? 'bg-accent-400 shadow-glow-cyan' :
                'bg-gray-400'
              )} />
              <div className="flex-1">
                <div className="font-medium text-white">{activity.action}</div>
                <div className="text-sm text-gray-400">{activity.name}</div>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
