import * as React from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Clock, MapPin, User, 
  Phone, CheckCircle, XCircle, AlertTriangle, Plus, Calendar as CalendarIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

interface Appointment {
  id: number;
  title: string;
  date: Date;
  time: string;
  duration: string;
  technician: string;
  technicianAvatar?: string;
  location: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'canceled';
  notes?: string;
  serviceType: string;
}

const Appointments: React.FC = () => {
  const [view, setView] = React.useState<'calendar' | 'list'>('list');
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = React.useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear());
  const [filterStatus, setFilterStatus] = React.useState<string>('all');

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: 1,
      title: 'Monthly Pest Inspection',
      date: new Date(2025, 5, 30),
      time: '10:00 AM',
      duration: '1 hour',
      technician: 'Michael Brown',
      technicianAvatar: undefined,
      location: '123 Home Street, San Francisco, CA',
      status: 'scheduled',
      serviceType: 'Inspection'
    },
    {
      id: 2,
      title: 'Quarterly Treatment',
      date: new Date(2025, 6, 15),
      time: '1:30 PM',
      duration: '2 hours',
      technician: 'Sarah Johnson',
      technicianAvatar: undefined,
      location: '123 Home Street, San Francisco, CA',
      status: 'confirmed',
      serviceType: 'Treatment'
    },
    {
      id: 3,
      title: 'Follow-up Inspection',
      date: new Date(2025, 5, 10),
      time: '9:15 AM',
      duration: '45 minutes',
      technician: 'David Wilson',
      technicianAvatar: undefined,
      location: '123 Home Street, San Francisco, CA',
      status: 'completed',
      notes: 'Found and treated ant entry points in kitchen',
      serviceType: 'Follow-up'
    },
    {
      id: 4,
      title: 'Emergency Treatment',
      date: new Date(2025, 5, 5),
      time: '3:00 PM',
      duration: '2 hours',
      technician: 'Michael Brown',
      technicianAvatar: undefined,
      location: '123 Home Street, San Francisco, CA',
      status: 'completed',
      notes: 'Addressed pest issue in the attic',
      serviceType: 'Emergency'
    },
    {
      id: 5,
      title: 'Annual Home Assessment',
      date: new Date(2025, 7, 22),
      time: '11:30 AM',
      duration: '3 hours',
      technician: 'Keith Grinnage',
      technicianAvatar: undefined,
      location: '123 Home Street, San Francisco, CA',
      status: 'scheduled',
      serviceType: 'Assessment'
    }
  ];

  // Format functions
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const formatMonth = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Filter appointments based on selected filters
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by status
    if (filterStatus !== 'all' && appointment.status !== filterStatus) {
      return false;
    }
    return true;
  }).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get status colors for badges
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500/10 text-blue-500';
      case 'confirmed': return 'bg-[#56e39f]/10 text-[#56e39f]';
      case 'completed': return 'bg-purple-500/10 text-purple-500';
      case 'canceled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getServiceTypeColor = (type: string): string => {
    switch(type) {
      case 'Inspection': return 'bg-blue-500/10 text-blue-500';
      case 'Treatment': return 'bg-purple-500/10 text-purple-500';
      case 'Follow-up': return 'bg-orange-500/10 text-orange-500';
      case 'Emergency': return 'bg-red-500/10 text-red-500';
      case 'Assessment': return 'bg-indigo-500/10 text-indigo-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'scheduled': 
        return <Calendar className="w-4 h-4 mr-1" />;
      case 'confirmed': 
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'completed': 
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'canceled': 
        return <XCircle className="w-4 h-4 mr-1" />;
      default: 
        return <AlertTriangle className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Appointments</h2>
          <p className="text-gray-400 mt-1">Manage your pest control service appointments</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4 mr-2" />
          Request Appointment
        </Button>
      </div>
      
      {/* Filters and View Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <select
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#56e39f]/50"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all" className="bg-[#111827]">All Statuses</option>
            <option value="scheduled" className="bg-[#111827]">Scheduled</option>
            <option value="confirmed" className="bg-[#111827]">Confirmed</option>
            <option value="completed" className="bg-[#111827]">Completed</option>
            <option value="canceled" className="bg-[#111827]">Canceled</option>
          </select>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={view === 'list' ? "primary" : "outline"} 
            size="sm" 
            className={view !== 'list' ? "border-white/10" : ""}
            onClick={() => setView('list')}
          >
            List View
          </Button>
          <Button 
            variant={view === 'calendar' ? "primary" : "outline"} 
            size="sm" 
            className={view !== 'calendar' ? "border-white/10" : ""}
            onClick={() => setView('calendar')}
          >
            Calendar
          </Button>
        </div>
      </div>
      
      {view === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getServiceTypeColor(appointment.serviceType)}`}>
                        <CalendarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white text-lg">{appointment.title}</h4>
                          <Badge className={getStatusColor(appointment.status)}>
                            <div className="flex items-center">
                              {getStatusIcon(appointment.status)}
                              {appointment.status}
                            </div>
                          </Badge>
                          <Badge className={getServiceTypeColor(appointment.serviceType)}>
                            {appointment.serviceType}
                          </Badge>
                        </div>
                        <p className="text-gray-300">{formatDate(appointment.date)} at {appointment.time}</p>
                        <p className="text-gray-400 text-sm mt-1">Duration: {appointment.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {appointment.status === 'scheduled' || appointment.status === 'confirmed' ? (
                        <>
                          <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-400">Technician</p>
                          <div className="flex items-center">
                            <Avatar name={appointment.technician} size="sm" className="mr-2" />
                            <span className="text-gray-300">{appointment.technician}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-gray-300">{appointment.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">Notes</p>
                        <p className="text-gray-300">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
              <p className="text-gray-400">No appointments match your filter criteria</p>
            </div>
          )}
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          {/* Calendar Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h4 className="font-medium text-white">{formatMonth(new Date(selectedYear, selectedMonth))}</h4>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="p-1 h-8 w-8 border-white/10"
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedYear(selectedYear - 1);
                  } else {
                    setSelectedMonth(selectedMonth - 1);
                  }
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-1 h-8 w-8 border-white/10"
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedYear(selectedYear + 1);
                  } else {
                    setSelectedMonth(selectedMonth + 1);
                  }
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center p-2 text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* Calendar days would be generated here with appointment indicators */}
              <div className="text-center p-2 text-sm text-gray-500 bg-white/5 rounded-md">30</div>
              <div className="text-center p-2 text-sm text-gray-500 bg-white/5 rounded-md">31</div>
              
              {Array.from({ length: 30 }).map((_, index) => {
                const day = index + 1;
                const date = new Date(selectedYear, selectedMonth, day);
                const hasAppointment = appointments.some(apt => 
                  apt.date.getDate() === day && 
                  apt.date.getMonth() === selectedMonth && 
                  apt.date.getFullYear() === selectedYear
                );
                
                return (
                  <div 
                    key={day} 
                    className={`
                      relative text-center p-2 text-sm rounded-md
                      ${day === new Date().getDate() && 
                        selectedMonth === new Date().getMonth() && 
                        selectedYear === new Date().getFullYear() 
                          ? 'bg-[#56e39f]/20 text-white font-medium' 
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }
                    `}
                  >
                    {day}
                    {hasAppointment && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#56e39f] rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* This day's appointments */}
            <div className="mt-8">
              <h5 className="font-medium text-white mb-4">Today's Appointments</h5>
              <div className="space-y-3">
                {appointments.filter(apt => 
                  apt.date.getDate() === new Date().getDate() &&
                  apt.date.getMonth() === new Date().getMonth() &&
                  apt.date.getFullYear() === new Date().getFullYear()
                ).map(appointment => (
                  <div key={appointment.id} className="flex items-center p-3 bg-white/5 rounded-lg">
                    <div className="p-2 bg-[#56e39f]/10 rounded-lg text-[#56e39f] mr-3">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white">{appointment.title}</p>
                          <p className="text-sm text-gray-400">{appointment.time}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {appointments.filter(apt => 
                  apt.date.getDate() === new Date().getDate() &&
                  apt.date.getMonth() === new Date().getMonth() &&
                  apt.date.getFullYear() === new Date().getFullYear()
                ).length === 0 && (
                  <p className="text-gray-400 text-center p-4">No appointments scheduled for today</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
