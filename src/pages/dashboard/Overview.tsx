import React from 'react';
import { ArrowUp, Calendar, CreditCard, Clock, AlertTriangle, Check, TrendingUp, Activity, BarChart, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';

// Mock data for the dashboard
const upcomingAppointments = [
  {
    id: 1,
    title: 'Monthly Pest Inspection',
    date: new Date(2025, 5, 30),
    time: '10:00 AM',
    technician: 'Michael Brown',
    technicianAvatar: null,
    location: '123 Home Street',
    status: 'confirmed'
  },
  {
    id: 2,
    title: 'Quarterly Treatment',
    date: new Date(2025, 6, 15),
    time: '1:30 PM',
    technician: 'Sarah Johnson',
    technicianAvatar: null,
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
    type: 'appointment',
    title: 'Technician visit completed',
    description: 'Monthly service performed',
    date: new Date(2025, 5, 15),
    action: null
  },
  {
    id: 2,
    type: 'issue',
    title: 'Issue reported',
    description: 'Ants in kitchen',
    date: new Date(2025, 5, 20),
    action: 'View details'
  },
  {
    id: 3,
    type: 'billing',
    title: 'Invoice paid',
    description: 'Monthly service subscription',
    date: new Date(2025, 5, 12),
    action: 'View receipt'
  }
];

export const Overview = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your pest control services.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="md">
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
      <Card variant="bordered" className="bg-gradient-to-r from-[#ebfcf3] to-white dark:from-[#132e23] dark:to-dark-800 border-l-4 border-l-[#56e39f]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-[#56e39f]/20 rounded-full">
                <Clock className="h-6 w-6 text-[#56e39f]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Service: Monthly Pest Inspection</h3>
                <p className="text-gray-600 dark:text-gray-400">Scheduled for Tuesday, June 30 at 10:00 AM</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Health</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">Excellent</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <Badge variant="success" size="sm">Active</Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Since March 2025</span>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Issues</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2</h3>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" /> 1 new this week
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Service</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">June 30</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <Badge variant="info" size="sm">Confirmed</Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Monthly Inspection</span>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Status</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">Current</h3>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Next payment: July 5, 2025</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-column layout for Issues and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Issues */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Issues</CardTitle>
                <CardDescription>Issues requiring attention</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {issuesData.map(issue => (
                <div key={issue.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        issue.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30' : 
                        issue.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
                        'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          issue.severity === 'high' ? 'text-red-600 dark:text-red-400' : 
                          issue.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : 
                          'text-blue-600 dark:text-blue-400'
                        }`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{issue.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{issue.description}</p>
                        <div className="mt-2 flex items-center space-x-3">
                          <Badge 
                            variant={issue.status === 'active' ? 'warning' : issue.status === 'investigating' ? 'info' : 'default'} 
                            size="sm"
                          >
                            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Reported: {issue.reportedDate.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-200 dark:border-dark-700 px-4 py-3">
            <Button variant="ghost" size="sm" className="w-full">
              Report New Issue
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates on your account</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {activityData.map(activity => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'appointment' ? 'bg-green-100 dark:bg-green-900/30' : 
                      activity.type === 'issue' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
                      'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      {activity.type === 'appointment' && <Check className="h-5 w-5 text-green-600 dark:text-green-400" />}
                      {activity.type === 'issue' && <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                      {activity.type === 'billing' && <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.description}</p>
                      {activity.action && (
                        <button className="mt-2 text-xs font-medium text-[#56e39f] hover:text-[#48c98a] transition-colors">
                          {activity.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled service visits</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-center hidden sm:block">
                      <span className="block text-sm font-bold text-blue-600 dark:text-blue-400">
                        {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-xl font-bold text-blue-800 dark:text-blue-300">
                        {new Date(appointment.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{appointment.title}</h4>
                      <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {appointment.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {appointment.location}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <Avatar size="sm" name={appointment.technician} />
                        <span className="ml-2 text-xs">{appointment.technician}</span>
                        <Badge 
                          variant={appointment.status === 'confirmed' ? 'success' : 'default'}
                          size="sm"
                          className="ml-2"
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="primary" size="sm">Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};