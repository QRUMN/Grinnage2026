import * as React from 'react';
import { 
  Calendar, Clock, Filter, Search, Plus, Users, Download,
  MapPin, CheckCircle, MoreHorizontal, ChevronLeft, ChevronRight,
  Edit, Trash2, FileText, ArrowUpDown
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

interface Appointment {
  id: number;
  clientName: string;
  clientId: number;
  dateTime: Date;
  service: string;
  location: string;
  technician: string;
  technicianId: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  duration: number; // in minutes
}

const AppointmentsManagement: React.FC = () => {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [dateFilter, setDateFilter] = React.useState<'today' | 'week' | 'month' | 'all'>('all');
  const [technicianFilter, setTechnicianFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null);
  const itemsPerPage = 10;

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: 1,
      clientName: 'John Doe',
      clientId: 1,
      dateTime: new Date(2025, 5, 28, 9, 0), // Today 9:00 AM
      service: 'Monthly Pest Control',
      location: '123 Home Street, San Francisco, CA',
      technician: 'Michael Brown',
      technicianId: 2,
      status: 'completed',
      notes: 'Found evidence of rodents in the basement, additional treatment recommended.',
      duration: 60
    },
    {
      id: 2,
      clientName: 'Sarah Smith',
      clientId: 2,
      dateTime: new Date(2025, 5, 28, 11, 30), // Today 11:30 AM
      service: 'Termite Inspection',
      location: '456 Park Avenue, San Francisco, CA',
      technician: 'David Wilson',
      technicianId: 3,
      status: 'in-progress',
      duration: 90
    },
    {
      id: 3,
      clientName: 'Emily Johnson',
      clientId: 4,
      dateTime: new Date(2025, 5, 28, 14, 0), // Today 2:00 PM
      service: 'Rodent Control',
      location: '789 Lake View, San Francisco, CA',
      technician: 'Sarah Johnson',
      technicianId: 4,
      status: 'scheduled',
      duration: 75
    },
    {
      id: 4,
      clientName: 'Michael Williams',
      clientId: 5,
      dateTime: new Date(2025, 5, 28, 16, 30), // Today 4:30 PM
      service: 'Quarterly Treatment',
      location: '101 Ocean Drive, San Francisco, CA',
      technician: 'Keith Grinnage',
      technicianId: 1,
      status: 'scheduled',
      duration: 120
    },
    {
      id: 5,
      clientName: 'Robert Anderson',
      clientId: 3,
      dateTime: new Date(2025, 5, 29, 10, 0), // Tomorrow 10:00 AM
      service: 'Annual Inspection',
      location: '222 Mountain View, San Francisco, CA',
      technician: 'Keith Grinnage',
      technicianId: 1,
      status: 'scheduled',
      duration: 180
    },
    {
      id: 6,
      clientName: 'Lisa Martinez',
      clientId: 6,
      dateTime: new Date(2025, 5, 29, 13, 0), // Tomorrow 1:00 PM
      service: 'Mosquito Treatment',
      location: '333 River Road, San Francisco, CA',
      technician: 'Michael Brown',
      technicianId: 2,
      status: 'scheduled',
      duration: 60
    },
    {
      id: 7,
      clientName: 'James Taylor',
      clientId: 7,
      dateTime: new Date(2025, 5, 27, 15, 0), // Yesterday 3:00 PM
      service: 'Bed Bug Treatment',
      location: '444 Forest Lane, San Francisco, CA',
      technician: 'Sarah Johnson',
      technicianId: 4,
      status: 'completed',
      notes: 'Follow-up treatment scheduled for next week.',
      duration: 120
    },
    {
      id: 8,
      clientName: 'Patricia White',
      clientId: 8,
      dateTime: new Date(2025, 5, 27, 9, 30), // Yesterday 9:30 AM
      service: 'Termite Treatment',
      location: '555 Sunset Boulevard, San Francisco, CA',
      technician: 'David Wilson',
      technicianId: 3,
      status: 'completed',
      duration: 180
    },
    {
      id: 9,
      clientName: 'John Doe',
      clientId: 1,
      dateTime: new Date(2025, 5, 30, 11, 0), // In 2 days, 11:00 AM
      service: 'Follow-up Inspection',
      location: '123 Home Street, San Francisco, CA',
      technician: 'Keith Grinnage',
      technicianId: 1,
      status: 'scheduled',
      duration: 45
    },
    {
      id: 10,
      clientName: 'Emily Johnson',
      clientId: 4,
      dateTime: new Date(2025, 5, 26, 14, 0), // 2 days ago, 2:00 PM
      service: 'Initial Assessment',
      location: '789 Lake View, San Francisco, CA',
      technician: 'Michael Brown',
      technicianId: 2,
      status: 'completed',
      notes: 'Customer requested monthly service plan.',
      duration: 90
    }
  ];

  // Get technicians list from appointments data
  const technicians = Array.from(new Set(appointments.map(a => a.technician)));

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by search query
    if (
      searchQuery && 
      !appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && appointment.status !== statusFilter) {
      return false;
    }
    
    // Filter by technician
    if (technicianFilter !== 'all' && appointment.technician !== technicianFilter) {
      return false;
    }
    
    // Filter by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const appointmentDate = new Date(appointment.dateTime);
    appointmentDate.setHours(0, 0, 0, 0);
    
    if (dateFilter === 'today') {
      return appointmentDate.getTime() === today.getTime();
    } else if (dateFilter === 'week') {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return appointmentDate >= weekStart && appointmentDate <= weekEnd;
    } else if (dateFilter === 'month') {
      return appointmentDate.getMonth() === today.getMonth() && 
             appointmentDate.getFullYear() === today.getFullYear();
    }
    
    return true;
  });

  // Sort appointments by date (most recent first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    a.dateTime.getTime() - b.dateTime.getTime()
  );

  // Pagination
  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);
  const paginatedAppointments = sortedAppointments.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Format date and time
  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format time only
  const formatTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500/10 text-blue-500';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-500';
      case 'completed': return 'bg-green-500/10 text-green-500';
      case 'cancelled': return 'bg-red-500/10 text-red-500';
      case 'rescheduled': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Appointments</h2>
          <p className="text-gray-400 mt-1">Manage all scheduled appointments</p>
        </div>
        <Button 
          variant="primary" 
          size="md"
          onClick={() => setIsAddAppointmentModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Filters */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 md:py-2 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Date Filter */}
        <div>
          <select
            className="block w-full px-3 py-3 md:py-2 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            className="block w-full px-3 py-3 md:py-2 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>

        {/* Technician Filter */}
        <div>
          <select
            className="block w-full px-3 py-3 md:py-2 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
            value={technicianFilter}
            onChange={(e) => setTechnicianFilter(e.target.value)}
          >
            <option value="all">All Technicians</option>
            {technicians.map((tech, index) => (
              <option key={index} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Appointments Table/Cards */}
      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800/70">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center">
                    Date & Time
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center">
                    Client
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center">
                    Technician
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800/20">
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-[#56e39f] mr-2 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {appointment.dateTime.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-sm text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(appointment.dateTime)} ({appointment.duration} min)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar name={appointment.clientName} className="h-8 w-8 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-white">{appointment.clientName}</div>
                          <div className="text-sm text-gray-400">ID: #{appointment.clientId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{appointment.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1 flex-shrink-0" />
                        <div className="text-sm text-gray-300 truncate max-w-[200px]" title={appointment.location}>
                          {appointment.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{appointment.technician}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="Edit"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <Edit className="h-4 w-4 text-gray-300" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="View Details"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <FileText className="h-4 w-4 text-gray-300" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-gray-300" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                    No appointments found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards (visible only on mobile) */}
        <div className="md:hidden">
          {paginatedAppointments.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {paginatedAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-gray-700/30 transition-colors">
                  {/* Status and Time */}
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={`${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                    <div className="text-sm text-right">
                      <div className="font-medium text-white flex items-center justify-end">
                        <Calendar className="h-4 w-4 text-[#56e39f] mr-1" />
                        {appointment.dateTime.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-gray-400 flex items-center justify-end">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(appointment.dateTime)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Client Info */}
                  <div className="flex items-center mb-3">
                    <Avatar name={appointment.clientName} className="h-10 w-10 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-white">{appointment.clientName}</div>
                      <div className="text-xs text-gray-400">ID: #{appointment.clientId}</div>
                    </div>
                  </div>
                  
                  {/* Service & Location */}
                  <div className="space-y-2 mb-3">
                    <div className="text-sm text-white font-medium">{appointment.service}</div>
                    <div className="flex items-center text-xs text-gray-300">
                      <MapPin className="h-3 w-3 text-gray-400 mr-1 flex-shrink-0" />
                      <div className="truncate">{appointment.location}</div>
                    </div>
                  </div>
                  
                  {/* Technician & Duration */}
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                    <div>
                      <span className="text-gray-500">Technician:</span> {appointment.technician}
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span> {appointment.duration} min
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-2 border-t border-gray-700/50">
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <Edit className="h-5 w-5 text-gray-300" />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <FileText className="h-5 w-5 text-gray-300" />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5 text-gray-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-10 text-center text-gray-400">
              No appointments found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredAppointments.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-gray-400 text-center sm:text-left">
            Showing <span className="font-medium text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium text-white">
              {Math.min(currentPage * itemsPerPage, filteredAppointments.length)}
            </span>{' '}
            of <span className="font-medium text-white">{filteredAppointments.length}</span> appointments
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-white/10 text-white hover:bg-white/5 disabled:opacity-50 h-9 w-9 p-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-white/10 text-white hover:bg-white/5 disabled:opacity-50 h-9 w-9 p-0"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Calendar View Button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          size="lg"
          className="border-white/10 text-white hover:bg-white/5 w-full sm:w-auto"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Switch to Calendar View
        </Button>
      </div>

      {/* Note: The modal components for adding/editing appointments would be implemented here */}
    </div>
  );
};

export default AppointmentsManagement;
