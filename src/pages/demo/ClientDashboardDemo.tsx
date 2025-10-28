import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUp, ArrowLeft, Calendar, CreditCard, Clock, 
  AlertTriangle, Check, Activity, BarChart, 
  MapPin, Settings, LogOut, Menu, X, ChevronRight, Bell
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

export const ClientDashboardDemo: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const currentYear = new Date().getFullYear();

  // Mock data for the dashboard
  const upcomingAppointments = [
    {
      id: 1,
      title: 'Monthly Pest Inspection',
      date: new Date(2025, 5, 30),
      time: '10:00 AM',
      technician: 'Michael Brown',
      location: '123 Home Street',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Quarterly Treatment',
      date: new Date(2025, 6, 15),
      time: '1:30 PM',
      technician: 'Sarah Johnson',
      location: '123 Home Street',
      status: 'scheduled'
    }
  ];

  const issuesData = [
    {
      id: 1,
      title: 'Ants in kitchen',
      description: 'Small black ants around sink area',
      status: 'active',
      reportedDate: new Date(2025, 5, 20),
      severity: 'medium'
    },
    {
      id: 2,
      title: 'Possible termite damage',
      description: 'Noticed wood damage on back deck',
      status: 'investigating',
      reportedDate: new Date(2025, 5, 25),
      severity: 'high'
    }
  ];

  const activityData = [
    {
      id: 1,
      action: 'Service completed',
      description: 'Monthly pest inspection completed',
      date: new Date(2025, 5, 15),
      icon: <Check className="w-5 h-5" />
    },
    {
      id: 2,
      action: 'Issue reported',
      description: 'Reported ants in kitchen',
      date: new Date(2025, 5, 20),
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: 3,
      action: 'Payment processed',
      description: 'Quarterly service payment - $120.00',
      date: new Date(2025, 5, 1),
      icon: <CreditCard className="w-5 h-5" />
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'bg-blue-500/10 text-blue-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'high': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-red-500/10 text-red-500';
      case 'investigating': return 'bg-yellow-500/10 text-yellow-500';
      case 'resolved': return 'bg-green-500/10 text-green-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500/10 text-green-500';
      case 'scheduled': return 'bg-blue-500/10 text-blue-500';
      case 'canceled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

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
                  { name: 'Dashboard', icon: <BarChart className="h-5 w-5" />, active: true },
                  { name: 'Appointments', icon: <Calendar className="h-5 w-5" /> },
                  { name: 'Issues', icon: <AlertTriangle className="h-5 w-5" /> },
                  { name: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
                  { name: 'Documents', icon: <Activity className="h-5 w-5" /> }
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
                  name="John Smith"
                  size="md"
                  status="online"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Smith</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
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
                <h1 className="text-xl font-bold text-white">Dashboard</h1>
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
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back, John</h2>
                <p className="text-gray-400 mt-1">Here's what's happening with your pest control services.</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="md" className="border-white/10 text-white hover:bg-white/5">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Service
                </Button>
                <Button variant="primary" size="md">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </div>

            {/* Service Alert */}
            <div className="bg-gradient-to-r from-[#56e39f]/10 to-blue-500/10 backdrop-blur-sm border border-[#56e39f]/30 rounded-xl p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#56e39f]/20 rounded-full">
                    <Clock className="h-6 w-6 text-[#56e39f]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Upcoming Service: Monthly Pest Inspection</h3>
                    <p className="text-gray-300">Scheduled for Tuesday, June 30 at 10:00 AM</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                  View Details
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Service Health</p>
                    <h3 className="text-2xl font-bold text-white mt-1">Excellent</h3>
                  </div>
                  <div className="p-2 bg-[#56e39f]/20 rounded-full">
                    <Check className="h-5 w-5 text-[#56e39f]" />
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <Badge variant="success" className="bg-[#56e39f]/10 text-[#56e39f] border-none text-xs">Active</Badge>
                  <span className="text-xs text-gray-400 ml-2">Since March {currentYear}</span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Open Issues</p>
                    <h3 className="text-2xl font-bold text-white mt-1">2</h3>
                  </div>
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <span className="text-sm text-red-400 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    1 new since last week
                  </span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Next Payment</p>
                    <h3 className="text-2xl font-bold text-white mt-1">$120.00</h3>
                  </div>
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <span className="text-xs text-gray-400">Due on July 1, {currentYear}</span>
                </div>
              </div>
            </div>

            {/* Appointments Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Upcoming Appointments</h3>
                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                    <div className="flex items-start">
                      <div className="p-3 bg-blue-500/10 rounded-lg mr-4">
                        <Calendar className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-white">{appointment.title}</h4>
                          <Badge className={`${getAppointmentStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">
                          {formatDate(appointment.date)} at {appointment.time}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center">
                            <div className="text-xs text-gray-400 mr-4">
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {appointment.location}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              <div className="flex items-center">
                                <Avatar name={appointment.technician} size="sm" />
                                <span className="ml-1">{appointment.technician}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-[#56e39f] hover:bg-[#56e39f]/10 p-1 h-auto">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues and Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Issues */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Active Issues</h3>
                  <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {issuesData.map((issue) => (
                    <div key={issue.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-semibold text-white">{issue.title}</h4>
                            <Badge className={`ml-2 ${getStatusColor(issue.status)}`}>
                              {issue.status}
                            </Badge>
                            <Badge className={`ml-2 ${getSeverityColor(issue.severity)}`}>
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">{issue.description}</p>
                          <p className="text-xs text-gray-400 mt-2">Reported on {formatDate(issue.reportedDate)}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[#56e39f] hover:bg-[#56e39f]/10 p-1 h-auto">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                  <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                    View All
                  </Button>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                  <div className="space-y-6">
                    {activityData.map((activity, index) => (
                      <div key={activity.id} className="flex">
                        <div className="relative">
                          <div className="p-2 bg-[#56e39f]/10 rounded-full text-[#56e39f]">
                            {activity.icon}
                          </div>
                          {index !== activityData.length - 1 && (
                            <div className="absolute top-10 bottom-0 left-1/2 w-px -ml-px bg-white/10"></div>
                          )}
                        </div>
                        <div className="ml-4 pb-6">
                          <div className="flex items-center">
                            <h4 className="text-white font-medium">{activity.action}</h4>
                            <span className="text-xs text-gray-400 ml-2">{formatDate(activity.date)}</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
