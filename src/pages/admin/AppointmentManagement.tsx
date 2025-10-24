import React, { useState } from 'react';
import {
  Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle,
  XCircle, AlertCircle, Plus, ChevronLeft, ChevronRight,
  Filter, Search, MoreVertical, Eye, Edit, Trash2,
  CalendarCheck, CalendarX, CalendarClock, DollarSign
} from 'lucide-react';
import { useAppointments } from '../../lib/appointment-context';
import { cn } from '../../lib/utils';

type ViewMode = 'calendar' | 'list' | 'requests';
type FilterStatus = 'all' | 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

export const AppointmentManagement: React.FC = () => {
  const {
    appointments,
    appointmentRequests,
    calendar,
    currentWeek,
    updateAppointment,
    approveRequest,
    declineRequest,
    navigateWeek,
    getTodaysAppointments,
    getUpcomingAppointments
  } = useAppointments();

  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const todaysAppointments = getTodaysAppointments();
  const upcomingAppointments = getUpcomingAppointments();
  const pendingRequests = appointmentRequests.filter(req => req.status === 'pending');

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesSearch = apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in_progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'no_show': return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
      default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <CalendarClock className="w-4 h-4" />;
      case 'confirmed': return <CalendarCheck className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <CalendarX className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleStatusUpdate = (appointmentId: string, newStatus: string) => {
    updateAppointment(appointmentId, { status: newStatus as any });
  };

  const stats = [
    {
      label: "Today's Appointments",
      value: todaysAppointments.length,
      icon: <Calendar className="w-5 h-5" />,
      color: 'blue'
    },
    {
      label: 'Pending Requests',
      value: pendingRequests.length,
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'orange'
    },
    {
      label: 'This Week',
      value: appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        const weekEnd = new Date(currentWeek);
        weekEnd.setDate(currentWeek.getDate() + 6);
        return aptDate >= currentWeek && aptDate <= weekEnd;
      }).length,
      icon: <CalendarCheck className="w-5 h-5" />,
      color: 'green'
    },
    {
      label: 'Revenue (Week)',
      value: `$${appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        const weekEnd = new Date(currentWeek);
        weekEnd.setDate(currentWeek.getDate() + 6);
        return aptDate >= currentWeek && aptDate <= weekEnd && apt.status === 'completed';
      }).reduce((sum, apt) => sum + apt.estimatedCost, 0).toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Appointment Management
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage appointments, schedule services, and track requests
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
            {[
              { mode: 'calendar' as ViewMode, label: 'Calendar' },
              { mode: 'list' as ViewMode, label: 'List' },
              { mode: 'requests' as ViewMode, label: 'Requests' }
            ].map((view) => (
              <button
                key={view.mode}
                onClick={() => setViewMode(view.mode)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  viewMode === view.mode
                    ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                )}
              >
                {view.label}
              </button>
            ))}
          </div>

          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl",
                stat.color === 'blue' && "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                stat.color === 'orange' && "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
                stat.color === 'green' && "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                stat.color === 'purple' && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              )}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="space-y-6">
          {/* Calendar Header */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Weekly Calendar
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateWeek('prev')}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 px-3">
                  {currentWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} -
                  {new Date(currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </span>
                <button
                  onClick={() => navigateWeek('next')}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
              {calendar.map((day) => (
                <div key={day.date} className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-3 border-b border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {day.dayName}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {formatDate(day.date)}
                    </p>
                  </div>
                  <div className="p-2 space-y-1 min-h-[200px]">
                    {day.timeSlots.filter(slot => !slot.available).map((slot) => (
                      <div
                        key={slot.time}
                        className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded p-2 text-xs"
                      >
                        <p className="font-medium text-primary-900 dark:text-primary-100">
                          {formatTime(slot.time)}
                        </p>
                        <p className="text-primary-700 dark:text-primary-300 truncate">
                          {slot.clientName}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                  className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="card">
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-500 dark:text-neutral-400">No appointments found</p>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full">
                        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>

                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                          {appointment.clientName}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {appointment.serviceType}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(appointment.date)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(appointment.time)}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {appointment.address.split(',')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(appointment.status)
                      )}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">{appointment.status.replace('_', ' ')}</span>
                      </span>

                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        ${appointment.estimatedCost}
                      </span>

                      <div className="relative">
                        <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Requests View */}
      {viewMode === 'requests' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Pending Appointment Requests
            </h2>

            <div className="space-y-4">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-500 dark:text-neutral-400">No pending requests</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                          {request.clientName}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {request.serviceType}
                        </p>
                        {request.urgency === 'urgent' && (
                          <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          ${request.estimatedCost}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {request.submittedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-neutral-400" />
                          <span className="text-neutral-600 dark:text-neutral-400">Preferred:</span>
                          <span className="ml-1 text-neutral-900 dark:text-neutral-100">
                            {formatDate(request.preferredDate)} at {formatTime(request.preferredTime)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-neutral-400" />
                          <span className="text-neutral-600 dark:text-neutral-400">{request.address}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-neutral-400" />
                          <span className="text-neutral-600 dark:text-neutral-400">{request.clientPhone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Property Size:</span>
                          <span className="ml-1 text-neutral-900 dark:text-neutral-100">{request.propertySize}</span>
                        </div>
                        {request.additionalServices.length > 0 && (
                          <div className="text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">Additional Services:</span>
                            <div className="mt-1 space-x-1">
                              {request.additionalServices.map((service, index) => (
                                <span
                                  key={index}
                                  className="inline-block px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {request.specialInstructions && (
                      <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong>Special Instructions:</strong> {request.specialInstructions}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={() => declineRequest(request.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => approveRequest(request.id, {
                          date: request.preferredDate,
                          time: request.preferredTime
                        })}
                        className="px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                      >
                        Approve & Schedule
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};