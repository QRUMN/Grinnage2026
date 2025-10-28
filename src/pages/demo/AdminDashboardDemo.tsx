import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUp, ArrowDown, ArrowLeft, Calendar, CreditCard,
  AlertTriangle, Check, Users, Activity, BarChart, Search,
  Filter, UserPlus, Edit, Trash2, MapPin, Settings, LogOut, Menu, X, Bell,
  Building, User, CheckCircle, XCircle, MoreHorizontal, Download, Mail, Phone, Eye
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

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

export const AdminDashboardDemo: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  


  // Expanded client data with mock data
  const [clients] = React.useState<Client[]>([
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

  // Filter clients
  const filteredClients = clients
    .filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm);
      
      const matchesType = selectedType === '' || client.type === selectedType;
      const matchesStatus = selectedStatus === '' || client.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });

  // Stats data
  const statsData = [
    {
      label: 'Total Clients',
      value: 216,
      change: +12,
      icon: <Users className="h-5 w-5" />,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-500'
    },
    {
      label: 'Active Services',
      value: 183,
      change: +8,
      icon: <Check className="h-5 w-5" />,
      iconBg: 'bg-[#56e39f]/20',
      iconColor: 'text-[#56e39f]'
    },
    {
      label: 'Pending Issues',
      value: 24,
      change: -5,
      icon: <AlertTriangle className="h-5 w-5" />,
      iconBg: 'bg-yellow-500/20',
      iconColor: 'text-yellow-500'
    },
    {
      label: 'Monthly Revenue',
      value: '$41,240',
      change: +18,
      icon: <CreditCard className="h-5 w-5" />,
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-500'
    }
  ];

  // Today's appointments
  const todayAppointments = [
    {
      id: 1,
      clientName: 'John Smith',
      clientAvatar: undefined,
      service: 'Monthly Inspection',
      time: '10:00 AM',
      technician: 'Michael Brown',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      clientName: 'Tech Solutions Inc',
      clientAvatar: undefined,
      service: 'Quarterly Treatment',
      time: '2:30 PM',
      technician: 'Sarah Johnson',
      location: 'Seattle, WA'
    },
    {
      id: 3,
      clientName: 'Amanda Wilson',
      clientAvatar: undefined,
      service: 'Initial Consultation',
      time: '4:15 PM',
      technician: 'Keith Grinnage',
      location: 'Los Angeles, CA'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#111827] text-white">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`bg-white/5 backdrop-blur-sm border-r border-white/10 w-64 transition-all duration-300 fixed inset-y-0 z-50 lg:static lg:inset-auto ${sidebarOpen ? 'left-0' : '-left-64'}`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="font-bold text-xl">Grinnage Exterminating</div>
                <Badge className="ml-2 bg-[#56e39f]/20 text-[#56e39f] border-none">Admin</Badge>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-auto py-4 px-3">
              <nav className="space-y-1">
                {[
                  { name: 'Dashboard', icon: <BarChart className="h-5 w-5" /> },
                  { name: 'Clients', icon: <Users className="h-5 w-5" />, active: true },
                  { name: 'Technicians', icon: <User className="h-5 w-5" /> },
                  { name: 'Schedule', icon: <Calendar className="h-5 w-5" /> },
                  { name: 'Issues', icon: <AlertTriangle className="h-5 w-5" /> },
                  { name: 'Finances', icon: <CreditCard className="h-5 w-5" /> },
                  { name: 'Reports', icon: <Activity className="h-5 w-5" /> }
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-[#56e39f]/10 text-[#56e39f]' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* User */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center">
                <Avatar
                  name="Keith Grinnage"
                  size="md"
                  status="online"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Keith Grinnage</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex items-center text-xs text-gray-400 hover:text-white transition-colors">
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </button>
                <button className="flex items-center text-xs text-gray-400 hover:text-white transition-colors">
                  <LogOut className="h-4 w-4 mr-1" />
                  Log out
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto relative">
          {/* Header */}
          <header className="sticky top-0 z-10 h-16 bg-white/5 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-white mr-3"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-white">Client Management</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative text-gray-400 hover:text-white transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#56e39f] rounded-full"></span>
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center text-sm text-gray-300 hover:text-[#56e39f] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to site
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                    </div>
                    <div className={`p-2 ${stat.iconBg} rounded-full ${stat.iconColor}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <span className={`text-sm flex items-center ${stat.change > 0 ? 'text-[#56e39f]' : 'text-red-400'}`}>
                      {stat.change > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(stat.change)}% since last month
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Clients Section */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">Client Management</h2>
                <div className="flex space-x-3">
                  <Button variant="outline" size="md" className="border-white/10 text-white hover:bg-white/5">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="primary" size="md">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search clients..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <select
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#56e39f]/50"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="" className="bg-[#111827]">All Types</option>
                    <option value="residential" className="bg-[#111827]">Residential</option>
                    <option value="commercial" className="bg-[#111827]">Commercial</option>
                  </select>
                  <select
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#56e39f]/50"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="" className="bg-[#111827]">All Statuses</option>
                    <option value="active" className="bg-[#111827]">Active</option>
                    <option value="inactive" className="bg-[#111827]">Inactive</option>
                  </select>
                  <Button variant="outline" size="md" className="border-white/10 text-white hover:bg-white/5">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Clients Table */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Service</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar name={client.name} size="sm" />
                              <div className="ml-3">
                                <p className="font-medium text-white">{client.name}</p>
                                <p className="text-xs text-gray-400">{client.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="flex items-center text-gray-300 text-sm">
                                <Mail className="w-4 h-4 mr-1 text-gray-400" />
                                {client.email}
                              </div>
                              <div className="flex items-center text-gray-300 text-sm mt-1">
                                <Phone className="w-4 h-4 mr-1 text-gray-400" />
                                {client.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={client.type === 'residential' 
                              ? 'bg-blue-500/10 text-blue-500 border-none' 
                              : 'bg-purple-500/10 text-purple-500 border-none'
                            }>
                              <div className="flex items-center">
                                {client.type === 'residential' ? (
                                  <User className="w-3 h-3 mr-1" />
                                ) : (
                                  <Building className="w-3 h-3 mr-1" />
                                )}
                                {client.type === 'residential' ? 'Residential' : 'Commercial'}
                              </div>
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={client.status === 'active' 
                              ? 'bg-[#56e39f]/10 text-[#56e39f] border-none' 
                              : 'bg-red-500/10 text-red-500 border-none'
                            }>
                              <div className="flex items-center">
                                {client.status === 'active' ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <XCircle className="w-3 h-3 mr-1" />
                                )}
                                {client.status === 'active' ? 'Active' : 'Inactive'}
                              </div>
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {client.lastService}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-2">
                              <button className="p-1 text-gray-400 hover:text-white rounded-md transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-white rounded-md transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-400 rounded-md transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredClients.length === 0 && (
                  <div className="py-8 text-center text-gray-400">
                    No clients match your filters
                  </div>
                )}
              </div>
            </div>

            {/* Today's Appointments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Today's Appointments</h3>
                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                  View All
                </Button>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar name={appointment.clientName} size="md" />
                        <div>
                          <h4 className="font-medium text-white">{appointment.clientName}</h4>
                          <div className="flex items-center text-gray-400 text-sm">
                            <span className="mr-2">{appointment.service}</span>
                            <span>•</span>
                            <span className="mx-2">{appointment.time}</span>
                            <span>•</span>
                            <span className="ml-2">{appointment.technician}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-white rounded-md transition-colors">
                          <MapPin className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white rounded-md transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
