import React, { useState, useEffect } from 'react';
import {
  Users, Plus, Search, Filter, Download, MoreVertical,
  Phone, Mail, MapPin, Calendar, DollarSign, Clock,
  Edit3, Trash2, Eye, FileText, Star, Shield,
  TrendingUp, AlertCircle, CheckCircle, User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AddClientForm } from '../../components/forms/AddClientForm';
import { ClientAnalytics } from '../../components/client/ClientAnalytics';
import { clientManagementApi, type ClientData } from '../../lib/api/clientManagement';

// Use ClientData from the API
type Client = ClientData;

interface ServiceRecord {
  id: string;
  date: string;
  serviceType: string;
  technician: string;
  duration: number;
  status: 'completed' | 'scheduled' | 'cancelled' | 'no-show';
  treatmentArea: string[];
  findings: string;
  recommendations: string;
  nextRecommendedService?: string;
  cost: number;
  rating?: number;
  customerFeedback?: string;
}

interface ClientNote {
  id: string;
  date: string;
  author: string;
  type: 'general' | 'service' | 'billing' | 'complaint' | 'compliment';
  content: string;
  isPrivate: boolean;
}

interface ClientDocument {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'photo' | 'report' | 'other';
  uploadDate: string;
  size: string;
  url: string;
}

export const ClientManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'analytics'>('clients');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending' | 'suspended'>('all');
  const [clientTypeFilter, setClientTypeFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // Real client data from Supabase
  const [clients, setClients] = useState<Client[]>([]);

  // Fetch clients from Supabase on component mount
  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const fetchedClients = await clientManagementApi.getAllClients();
        setClients(fetchedClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Calculate analytics
  const analytics = {
    total: clients.length,
    active: clients.filter(c => c.businessInfo.status === 'active').length,
    pending: clients.filter(c => c.businessInfo.status === 'pending').length,
    monthlyRevenue: clients
      .filter(c => c.subscription.isActive)
      .reduce((sum, c) => sum + c.subscription.monthlyValue, 0),
    avgLifetimeValue: clients.reduce((sum, c) => sum + c.businessInfo.lifetime_value, 0) / clients.length,
    residential: clients.filter(c => c.businessInfo.clientType === 'residential').length,
    commercial: clients.filter(c => c.businessInfo.clientType === 'commercial').length
  };

  // Filter clients
  const filteredClients = clients.filter(client => {
    const fullName = `${client.personalInfo.firstName} ${client.personalInfo.lastName}`.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      fullName.includes(searchTerm.toLowerCase()) ||
      client.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.personalInfo.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || client.businessInfo.status === statusFilter;
    const matchesType = clientTypeFilter === 'all' || client.businessInfo.clientType === clientTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'suspended': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'high': return 'text-red-600 dark:text-red-400';
      default: return 'text-neutral-600 dark:text-neutral-400';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50">
            Client Management
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage client relationships and service history
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-outline">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setIsAddingClient(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Clients</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {analytics.total}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                {analytics.residential} residential, {analytics.commercial} commercial
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Active Clients</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                {analytics.active}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                {analytics.pending} pending approval
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Monthly Revenue</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                ${analytics.monthlyRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                From active subscriptions
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
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Avg Lifetime Value</p>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                ${Math.round(analytics.avgLifetimeValue).toLocaleString()}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                Per client
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="input"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={clientTypeFilter}
                onChange={(e) => setClientTypeFilter(e.target.value as any)}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <button className="btn-outline">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>

          {/* Clients Table */}
          <div className="card overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-neutral-600 dark:text-neutral-400">Loading clients...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      LTV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Next Service
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {paginatedClients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                      onClick={() => setSelectedClient(client)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full">
                            <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {client.personalInfo.firstName} {client.personalInfo.lastName}
                            </div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              {client.businessInfo.clientType} • {client.address.city}, {client.address.state}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {client.personalInfo.email}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {client.personalInfo.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {client.subscription.plan}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          ${client.subscription.monthlyValue}/mo
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex px-2 py-1 text-xs font-semibold rounded-full", getStatusColor(client.businessInfo.status))}>
                          {client.businessInfo.status.charAt(0).toUpperCase() + client.businessInfo.status.slice(1)}
                        </span>
                        <div className={cn("text-xs mt-1", getRiskColor(client.businessInfo.risk_level))}>
                          {client.businessInfo.risk_level} risk
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          ${client.businessInfo.lifetime_value.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {client.subscription.nextService ? new Date(client.subscription.nextService).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                            <Edit3 className="w-4 h-4" />
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
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="btn-outline"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="btn-outline"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Recent Client Activity
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
                    Service completed for <strong>Sarah Johnson</strong>
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">
                    New client registered: <strong>Lisa Rodriguez</strong>
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Calendar className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">
                    Service scheduled for <strong>David Martinez</strong>
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Clients */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Top Clients by Value
              </h3>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View Report
              </button>
            </div>
            <div className="space-y-4">
              {clients
                .sort((a, b) => b.businessInfo.lifetime_value - a.businessInfo.lifetime_value)
                .slice(0, 5)
                .map((client, index) => (
                  <div key={client.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 w-4">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {client.personalInfo.firstName} {client.personalInfo.lastName}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {client.subscription.plan}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        ${client.businessInfo.lifetime_value.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        LTV
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <ClientAnalytics
          clients={clients}
          timeframe={analyticsTimeframe}
          onTimeframeChange={setAnalyticsTimeframe}
        />
      )}

      {/* Client Detail Modal/Sidebar would go here */}
      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onUpdate={(updatedClient) => {
            setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
            setSelectedClient(updatedClient);
          }}
        />
      )}

      {/* Add Client Form Modal */}
      {isAddingClient && (
        <AddClientForm
          onClose={() => setIsAddingClient(false)}
          onSubmit={(newClient) => {
            setClients(prev => [...prev, newClient]);
          }}
        />
      )}
    </div>
  );
};

// Client Detail Modal Component
const ClientDetailModal: React.FC<{
  client: Client;
  onClose: () => void;
  onUpdate: (client: Client) => void;
}> = ({ client, onClose, onUpdate }) => {
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'services' | 'billing' | 'notes'>('overview');

  const detailTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Service History' },
    { id: 'billing', label: 'Billing' },
    { id: 'notes', label: 'Notes' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-neutral-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-neutral-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white dark:bg-neutral-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  {client.personalInfo.firstName} {client.personalInfo.lastName}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {client.businessInfo.clientType} • Client since {new Date(client.businessInfo.joinDate).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                <span className="sr-only">Close</span>
                ✕
              </button>
            </div>

            {/* Detail Tabs */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6">
              <nav className="flex space-x-8">
                {detailTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDetailTab(tab.id as any)}
                    className={cn(
                      "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                      activeDetailTab === tab.id
                        ? "border-primary-500 text-primary-600 dark:text-primary-400"
                        : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="max-h-96 overflow-y-auto">
              {activeDetailTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-neutral-400 mr-2" />
                        {client.personalInfo.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-neutral-400 mr-2" />
                        {client.personalInfo.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-neutral-400 mr-2" />
                        {client.address.street}, {client.address.city}, {client.address.state} {client.address.zipCode}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                      Account Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>Status: <span className={cn("font-medium", getStatusColor(client.businessInfo.status))}>{client.businessInfo.status}</span></div>
                      <div>LTV: <span className="font-medium">${client.businessInfo.lifetime_value.toLocaleString()}</span></div>
                      <div>Risk Level: <span className={cn("font-medium", getRiskColor(client.businessInfo.risk_level))}>{client.businessInfo.risk_level}</span></div>
                      <div>Source: <span className="font-medium">{client.businessInfo.source}</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailTab === 'services' && (
                <div className="space-y-4">
                  {client.serviceHistory.length > 0 ? (
                    client.serviceHistory.map((service) => (
                      <div key={service.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                            {service.serviceType}
                          </h5>
                          <span className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(service.status))}>
                            {service.status}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                          <p>Date: {new Date(service.date).toLocaleDateString()}</p>
                          <p>Technician: {service.technician}</p>
                          <p>Areas: {service.treatmentArea.join(', ')}</p>
                          <p>Findings: {service.findings}</p>
                          {service.rating && (
                            <div className="flex items-center">
                              <span className="mr-2">Rating:</span>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-4 h-4",
                                    i < service.rating!
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-neutral-300 dark:text-neutral-600"
                                  )}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-500 dark:text-neutral-400 text-center py-8">
                      No service history available
                    </p>
                  )}
                </div>
              )}

              {activeDetailTab === 'notes' && (
                <div className="space-y-4">
                  {client.notes.length > 0 ? (
                    client.notes.map((note) => (
                      <div key={note.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {note.author}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
                              {new Date(note.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                            {note.type}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {note.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-500 dark:text-neutral-400 text-center py-8">
                      No notes available
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="btn-primary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};