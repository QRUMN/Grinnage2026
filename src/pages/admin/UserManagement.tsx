import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, UserPlus, MoreHorizontal, Edit, Trash2, ArrowUpDown, Calendar, Download, Mail, Phone, Eye, Building, User, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'residential' | 'commercial';
  status: 'active' | 'inactive';
  lastService: string;
  location?: string;
  avatar?: string;
}

export const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Expanded client data with mock data
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(302) 562-5654',
      type: 'residential',
      status: 'active',
      lastService: '2025-05-15',
      location: 'San Francisco, CA',
      avatar: undefined
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      email: 'contact@techsolutions.com',
      phone: '(555) 987-6543',
      type: 'commercial',
      status: 'active',
      lastService: '2025-05-20',
      location: 'Seattle, WA',
      avatar: undefined
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah@gmail.com',
      phone: '(555) 234-5678',
      type: 'residential',
      status: 'inactive',
      lastService: '2025-04-03',
      location: 'Portland, OR',
      avatar: undefined
    },
    {
      id: '4',
      name: 'Global Industries',
      email: 'info@globalind.com',
      phone: '(555) 876-5432',
      type: 'commercial',
      status: 'active',
      lastService: '2025-05-25',
      location: 'Chicago, IL',
      avatar: undefined
    }
  ]);

  // Handle sort toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter and sort clients
  const filteredClients = clients
    .filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm);
      
      const matchesType = selectedType === '' || client.type === selectedType;
      const matchesStatus = selectedStatus === '' || client.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let valueA: any = a[sortField as keyof Client];
      let valueB: any = b[sortField as keyof Client];
      
      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();
      
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleAddClient = () => {
    navigate('/admin/create-client');
  };

  const handleViewClient = (id: string) => {
    // Navigate to client details page
    console.log(`View client ${id}`);
  };

  const handleEditClient = (id: string) => {
    // Navigate to edit client page
    console.log(`Edit client ${id}`);
  };

  const handleDeleteClient = (id: string) => {
    // Show confirmation dialog and delete client
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === 'active').length;
  const commercialClients = clients.filter(client => client.type === 'commercial').length;

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Client Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and monitor client accounts</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleAddClient}
          icon={<UserPlus className="w-4 h-4" />}
        >
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Clients</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalClients}</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Clients</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeClients}</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Commercial Clients</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{commercialClients}</h3>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card variant="default">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="w-full lg:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search clients..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <select 
                className="pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>

              <select 
                className="pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <Button variant="outline" size="sm" icon={<Filter className="w-4 h-4" />}>
                More Filters
              </Button>

              <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Clients</CardTitle>
              <CardDescription>
                {filteredClients.length} {filteredClients.length === 1 ? 'client' : 'clients'} found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-800/50 border-b border-gray-200 dark:border-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('name')}
                    >
                      <span>Client</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('type')}
                    >
                      <span>Type</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('status')}
                    >
                      <span>Status</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('lastService')}
                    >
                      <span>Last Service</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <Avatar name={client.name} size="sm" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {client.name}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 dark:text-gray-400 sm:space-x-2">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {client.email}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {client.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={client.type === 'commercial' ? 'info' : 'success'} 
                          size="sm"
                        >
                          {client.type === 'commercial' ? (
                            <Building className="inline-block w-3 h-3 mr-1" />
                          ) : (
                            <User className="inline-block w-3 h-3 mr-1" />
                          )}
                          {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={client.status === 'active' ? 'success' : 'danger'} 
                          size="sm"
                        >
                          {client.status === 'active' ? (
                            <CheckCircle className="inline-block w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="inline-block w-3 h-3 mr-1" />
                          )}
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3 mr-2" />
                          {new Date(client.lastService).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => handleViewClient(client.id)}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={<Edit className="w-4 h-4" />}
                            onClick={() => handleEditClient(client.id)}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={<Trash2 className="w-4 h-4 text-red-500" />}
                            onClick={() => handleDeleteClient(client.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                      No clients found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-gray-200 dark:border-dark-700 px-6 py-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{filteredClients.length}</span> of <span className="font-medium">{clients.length}</span> clients
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={filteredClients.length === clients.length}
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setSelectedStatus('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};