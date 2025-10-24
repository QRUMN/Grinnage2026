import * as React from 'react';
import { 
  Users, Calendar, PieChart, DollarSign, ArrowUp, 
  ArrowDown, Clock, Filter, Search, ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const Overview: React.FC = () => {
  // Mock data for statistics
  const stats = [
    {
      id: 1,
      title: 'Total Clients',
      value: 147,
      change: 12,
      changeType: 'increase',
      icon: <Users className="h-6 w-6" />,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Appointments Today',
      value: 8,
      change: 3,
      changeType: 'increase',
      icon: <Calendar className="h-6 w-6" />,
      color: 'purple'
    },
    {
      id: 3,
      title: 'Completion Rate',
      value: '98%',
      change: 2,
      changeType: 'increase',
      icon: <PieChart className="h-6 w-6" />,
      color: 'green'
    },
    {
      id: 4,
      title: 'Revenue (MTD)',
      value: '$18,420',
      change: 8,
      changeType: 'increase',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'amber'
    }
  ];

  // Mock data for today's appointments
  const todaysAppointments = [
    {
      id: 1,
      clientName: 'John Doe',
      time: '9:00 AM',
      service: 'Monthly Inspection',
      location: '123 Home Street, San Francisco, CA',
      technician: 'Michael Brown',
      status: 'completed'
    },
    {
      id: 2,
      clientName: 'Sarah Smith',
      time: '10:30 AM',
      service: 'Termite Treatment',
      location: '456 Park Avenue, San Francisco, CA',
      technician: 'David Wilson',
      status: 'in-progress'
    },
    {
      id: 3,
      clientName: 'Emily Johnson',
      time: '1:00 PM',
      service: 'Rodent Control',
      location: '789 Lake View, San Francisco, CA',
      technician: 'Sarah Johnson',
      status: 'scheduled'
    },
    {
      id: 4,
      clientName: 'Michael Williams',
      time: '3:30 PM',
      service: 'Quarterly Treatment',
      location: '101 Ocean Drive, San Francisco, CA',
      technician: 'Keith Grinnage',
      status: 'scheduled'
    }
  ];

  // Mock data for recent clients
  const recentClients = [
    {
      id: 1,
      name: 'Robert Anderson',
      email: 'robert.anderson@example.com',
      plan: 'Quarterly',
      joinDate: new Date(2025, 5, 25),
      status: 'active'
    },
    {
      id: 2,
      name: 'Lisa Martinez',
      email: 'lisa.martinez@example.com',
      plan: 'Monthly',
      joinDate: new Date(2025, 5, 23),
      status: 'active'
    },
    {
      id: 3,
      name: 'James Taylor',
      email: 'james.taylor@example.com',
      plan: 'Annual',
      joinDate: new Date(2025, 5, 20),
      status: 'pending'
    },
    {
      id: 4,
      name: 'Patricia White',
      email: 'patricia.white@example.com',
      plan: 'Monthly',
      joinDate: new Date(2025, 5, 18),
      status: 'active'
    }
  ];

  // Format date
  const formatDate = (date: Date): string => {
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
      case 'completed': return 'bg-green-500/10 text-green-500';
      case 'in-progress': return 'bg-blue-500/10 text-blue-500';
      case 'scheduled': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Get color class for stats
  const getStatColor = (color: string): string => {
    switch(color) {
      case 'blue': return 'bg-blue-500/20 text-blue-500';
      case 'purple': return 'bg-purple-500/20 text-purple-500';
      case 'green': return 'bg-green-500/20 text-green-500';
      case 'amber': return 'bg-amber-500/20 text-amber-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-gray-400 mt-1">Welcome back, Keith. Here's what's happening today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 w-full sm:w-auto justify-center">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#56e39f] hover:bg-[#56e39f]/80 text-gray-900 w-full sm:w-auto justify-center">
            <Users className="w-4 h-4 mr-2" />
            Add New Client
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-full ${getStatColor(stat.color)}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className={`text-sm flex items-center ${
                stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}%
              </span>
              <span className="text-gray-500 text-xs ml-1.5">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-white">Today's Appointments</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 h-8 px-3 text-xs">
                  <Filter className="w-3 h-3 mr-1.5" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 h-8 px-3 text-xs">
                  <Search className="w-3 h-3 mr-1.5" />
                  Search
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {todaysAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-700 h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {appointment.clientName.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-medium text-sm md:text-base truncate">{appointment.clientName}</h4>
                      <div className="flex items-center text-gray-400 text-xs md:text-sm">
                        <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{appointment.time} - {appointment.service}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                    <Badge className={`${getStatusColor(appointment.status)} text-xs px-2 py-0.5`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/5 h-7 w-7 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 md:mt-6 flex justify-center">
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 w-full sm:w-auto text-xs h-8 px-3">
                View All Appointments
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Clients */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-white">Recent Clients</h3>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/5 h-7 w-7 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentClients.map((client) => (
                <div 
                  key={client.id} 
                  className="flex items-center justify-between p-3 md:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 md:h-10 md:w-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <div className="text-xs md:text-sm text-white font-medium">
                        {client.name.split(' ').map(name => name[0]).join('')}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-medium text-sm md:text-base truncate">{client.name}</h4>
                      <p className="text-gray-400 text-xs md:text-sm truncate">{client.plan} Plan</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <Badge className={`${getStatusColor(client.status)} text-xs px-2 py-0.5`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                    <p className="text-gray-400 text-xs mt-1 text-right">
                      {formatDate(client.joinDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 md:mt-6 flex justify-center">
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 w-full sm:w-auto text-xs h-8 px-3">
                View All Clients
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
