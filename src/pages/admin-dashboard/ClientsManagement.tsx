import * as React from 'react';
import { 
  Users, Plus, Search, Filter, Download, MoreHorizontal, 
  ChevronLeft, ChevronRight, Mail, Phone
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: Date;
  nextService?: Date;
  lastService?: Date;
  technician?: string;
}

const ClientsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [planFilter, setPlanFilter] = React.useState('all');
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  // Mock clients data
  const clients: Client[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(302) 562-5654',
      address: '123 Home Street, San Francisco, CA',
      plan: 'Quarterly',
      status: 'active',
      joinDate: new Date(2024, 6, 15),
      nextService: new Date(2025, 6, 15),
      lastService: new Date(2025, 3, 15),
      technician: 'Michael Brown'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      phone: '(555) 987-6543',
      address: '456 Park Avenue, San Francisco, CA',
      plan: 'Monthly',
      status: 'active',
      joinDate: new Date(2024, 9, 5),
      nextService: new Date(2025, 6, 5),
      lastService: new Date(2025, 5, 5),
      technician: 'David Wilson'
    },
    {
      id: 3,
      name: 'Robert Anderson',
      email: 'robert.anderson@example.com',
      phone: '(555) 234-5678',
      address: '789 Lake View, San Francisco, CA',
      plan: 'Annual',
      status: 'active',
      joinDate: new Date(2025, 1, 20),
      nextService: new Date(2026, 1, 20),
      lastService: new Date(2025, 1, 20),
      technician: 'Keith Grinnage'
    },
    {
      id: 4,
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phone: '(555) 345-6789',
      address: '101 Ocean Drive, San Francisco, CA',
      plan: 'Monthly',
      status: 'active',
      joinDate: new Date(2024, 5, 8),
      nextService: new Date(2025, 6, 8),
      lastService: new Date(2025, 5, 8),
      technician: 'Sarah Johnson'
    },
    {
      id: 5,
      name: 'Michael Williams',
      email: 'michael.williams@example.com',
      phone: '(555) 456-7890',
      address: '222 Mountain View, San Francisco, CA',
      plan: 'Quarterly',
      status: 'pending',
      joinDate: new Date(2025, 5, 30)
    },
    {
      id: 6,
      name: 'Lisa Martinez',
      email: 'lisa.martinez@example.com',
      phone: '(555) 567-8901',
      address: '333 River Road, San Francisco, CA',
      plan: 'Monthly',
      status: 'inactive',
      joinDate: new Date(2024, 2, 12),
      lastService: new Date(2025, 2, 12)
    },
    {
      id: 7,
      name: 'James Taylor',
      email: 'james.taylor@example.com',
      phone: '(555) 678-9012',
      address: '444 Forest Lane, San Francisco, CA',
      plan: 'Quarterly',
      status: 'active',
      joinDate: new Date(2024, 8, 25),
      nextService: new Date(2025, 6, 25),
      lastService: new Date(2025, 3, 25),
      technician: 'Michael Brown'
    },
    {
      id: 8,
      name: 'Patricia White',
      email: 'patricia.white@example.com',
      phone: '(302) 562-5654',
      address: '555 Sunset Boulevard, San Francisco, CA',
      plan: 'Annual',
      status: 'active',
      joinDate: new Date(2024, 11, 3),
      nextService: new Date(2025, 11, 3),
      lastService: new Date(2024, 11, 3),
      technician: 'Keith Grinnage'
    }
  ];

  // Filter clients based on search and filters
  const filteredClients = clients.filter(client => {
    // Filter by search query
    if (
      searchQuery && 
      !client.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !client.email.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !client.phone.includes(searchQuery)
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && client.status !== statusFilter) {
      return false;
    }
    
    // Filter by plan
    if (planFilter !== 'all' && client.plan !== planFilter) {
      return false;
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Format date
  const formatDate = (date?: Date): string => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-500';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500';
      case 'inactive': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Clients</h2>
          <p className="text-gray-400 mt-1">Manage client accounts and information</p>
        </div>
        <Button 
          className="bg-[#56e39f] hover:bg-[#56e39f]/80 text-gray-900 w-full sm:w-auto justify-center"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-white/10 bg-white/5 pl-10 p-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs md:text-sm focus:outline-none focus:border-[#56e39f]/50 flex-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all" className="bg-[#111827]">All Statuses</option>
              <option value="active" className="bg-[#111827]">Active</option>
              <option value="pending" className="bg-[#111827]">Pending</option>
              <option value="inactive" className="bg-[#111827]">Inactive</option>
            </select>
            
            <select
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs md:text-sm focus:outline-none focus:border-[#56e39f]/50 flex-1"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option value="all" className="bg-[#111827]">All Plans</option>
              <option value="Monthly" className="bg-[#111827]">Monthly</option>
              <option value="Quarterly" className="bg-[#111827]">Quarterly</option>
              <option value="Annual" className="bg-[#111827]">Annual</option>
            </select>
            
            <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 h-9 text-xs">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filters
            </Button>
            
            <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 h-9 text-xs">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      {/* Clients List - Desktop View (hidden on small screens) */}
      <div className="hidden md:block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Plan</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Joined</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Next Service</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((client) => (
                <tr 
                  key={client.id} 
                  className="border-b border-white/10 hover:bg-white/5 cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {client.name.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium">{client.name}</p>
                        <p className="text-xs text-gray-400">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{client.plan}</td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(client.status)}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{formatDate(client.joinDate)}</td>
                  <td className="py-3 px-4 text-gray-300">{formatDate(client.nextService)}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1 h-8">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clients List - Mobile View (visible only on small screens) */}
      <div className="md:hidden space-y-4">
        {paginatedClients.map((client) => (
          <div 
            key={client.id} 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => setSelectedClient(client)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                  {client.name.split(' ').map(name => name[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-medium">{client.name}</p>
                  <p className="text-xs text-gray-400">{client.plan} Plan</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(client.status)} ml-auto`}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div className="flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span>{client.phone}</span>
              </div>
              <div>
                <span className="text-gray-500 mr-1">Joined:</span>
                <span>{formatDate(client.joinDate)}</span>
              </div>
              <div>
                <span className="text-gray-500 mr-1">Next:</span>
                <span>{formatDate(client.nextService)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
        
      {/* Empty state */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-medium text-white mb-2">No clients found</h4>
          <p className="text-gray-400 mb-4">
            {searchQuery || statusFilter !== 'all' || planFilter !== 'all' 
              ? "Try adjusting your search or filters" 
              : "No clients have been added yet"}
          </p>
          <Button 
            className="bg-[#56e39f] hover:bg-[#56e39f]/80 text-gray-900"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Client
          </Button>
        </div>
      )}
        
      {/* Pagination */}
      {filteredClients.length > itemsPerPage && (
        <div className="py-4 px-4 md:px-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 text-white hover:bg-white/5 p-1 h-8 w-8"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const pageNumber = currentPage > 2 && totalPages > 3
                  ? currentPage - 1 + i
                  : i + 1;
                
                // Don't display page numbers beyond total pages
                if (pageNumber > totalPages) return null;
                
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      currentPage === pageNumber 
                        ? "bg-[#56e39f] hover:bg-[#56e39f]/80 text-gray-900" 
                        : "border-white/10 text-white hover:bg-white/5"
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 text-white hover:bg-white/5 p-1 h-8 w-8"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManagement;
