import React, { useState } from 'react';
import {
  Users, UserPlus, Calendar, TrendingUp, DollarSign,
  BarChart3, Clock, Star, Phone, Mail, MapPin,
  Filter, Search, MoreVertical, CheckCircle,
  AlertCircle, Timer, Archive
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'lost';
  serviceType: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  budget?: string;
  address?: string;
  message: string;
  source: string;
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
  const [selectedTab, setSelectedTab] = useState<'overview' | 'leads' | 'clients'>('overview');
  const [leadFilter, setLeadFilter] = useState<'all' | 'new' | 'contacted' | 'quoted'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demo
  const stats: DashboardStats = {
    totalLeads: 47,
    newLeads: 8,
    conversions: 12,
    revenue: 15420,
    pendingAppointments: 5,
    activeClients: 34
  };

  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      status: 'new',
      serviceType: 'Residential Inspection',
      urgency: 'high',
      budget: '$100-300',
      address: '123 Oak Street, San Francisco, CA',
      message: 'Found ants in kitchen, need urgent inspection.',
      source: 'contact_form',
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
      budget: '$500+',
      address: '456 Business Plaza, Palo Alto, CA',
      message: 'Office building needs quarterly pest control service.',
      source: 'referral',
      createdAt: '2025-01-14T14:20:00Z'
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      email: 'lisa.r.home@gmail.com',
      status: 'quoted',
      serviceType: 'Termite Treatment',
      urgency: 'high',
      budget: '$300-500',
      message: 'Termites found in basement, need immediate treatment.',
      source: 'google_ads',
      createdAt: '2025-01-13T09:15:00Z'
    }
  ];

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'quoted': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'converted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'lost': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getUrgencyIcon = (urgency: Lead['urgency']) => {
    switch (urgency) {
      case 'emergency': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'high': return <Timer className="w-4 h-4 text-orange-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Archive className="w-4 h-4 text-green-500" />;
    }
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesFilter = leadFilter === 'all' || lead.status === leadFilter;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'leads', label: 'Leads', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50">
            Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-outline">
            <Calendar className="w-4 h-4" />
            Schedule Appointment
          </button>
          <button className="btn-primary">
            <UserPlus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Leads</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {stats.totalLeads}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +8 this week
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">New Leads</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {stats.newLeads}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                Needs attention
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl">
              <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Monthly Revenue</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                ${stats.revenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +12% from last month
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Conversions</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {stats.conversions}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                25.5% conversion rate
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Pending Appointments</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {stats.pendingAppointments}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Next: Tomorrow 2PM
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Active Clients</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {stats.activeClients}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                98% satisfaction
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={cn(
                "flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                selectedTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
              {tab.id === 'leads' && stats.newLeads > 0 && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {stats.newLeads}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Lead Management */}
      {selectedTab === 'leads' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-64"
                />
              </div>
              <select
                value={leadFilter}
                onChange={(e) => setLeadFilter(e.target.value as any)}
                className="input"
              >
                <option value="all">All Leads</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
              </select>
            </div>
            <button className="btn-outline">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>

          {/* Leads Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Lead
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {lead.name}
                          </div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {lead.serviceType}
                        </div>
                        {lead.budget && (
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            {lead.budget}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex px-2 py-1 text-xs font-semibold rounded-full", getStatusColor(lead.status))}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getUrgencyIcon(lead.urgency)}
                          <span className="ml-2 text-sm text-neutral-900 dark:text-neutral-100 capitalize">
                            {lead.urgency}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400 capitalize">
                        {lead.source.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Overview Tab Content */}
      {selectedTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Recent Activity
              </h3>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">
                    Lead converted to client: <strong>Mike Chen</strong>
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <UserPlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">
                    New lead received: <strong>Sarah Johnson</strong>
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">
                    Appointment scheduled with <strong>Lisa Rodriguez</strong>
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Services */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Top Services
              </h3>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View Report
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Residential Inspection</span>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mr-3">
                    <div className="w-3/4 h-2 bg-primary-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Termite Treatment</span>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mr-3">
                    <div className="w-1/2 h-2 bg-primary-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">50%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Commercial Treatment</span>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mr-3">
                    <div className="w-1/3 h-2 bg-primary-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clients Tab Placeholder */}
      {selectedTab === 'clients' && (
        <div className="card text-center py-12">
          <Users className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Client Management
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Client management system coming soon. Track active clients, service history, and billing.
          </p>
          <button className="btn-primary">
            <Users className="w-4 h-4" />
            Add Client
          </button>
        </div>
      )}
    </div>
  );
};