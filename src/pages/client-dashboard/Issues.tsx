import * as React from 'react';
import { 
  AlertTriangle, Plus, Search, Filter, Calendar, Clock, 
  ChevronRight, MessageSquare, Camera, Paperclip
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'investigating' | 'scheduled' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  scheduledDate?: Date;
  images?: string[];
  location: string;
  assignedTo?: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  authorRole: string;
  content: string;
  timestamp: Date;
  isStaff: boolean;
}

const Issues: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [priorityFilter, setPriorityFilter] = React.useState('all');
  const [selectedIssue, setSelectedIssue] = React.useState<Issue | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);

  // Mock issues data
  const issues: Issue[] = [
    {
      id: 1,
      title: 'Ants in kitchen',
      description: 'Small black ants around sink area and near the dishwasher. They appear mostly in the morning.',
      status: 'active',
      priority: 'medium',
      createdAt: new Date(2025, 5, 20),
      updatedAt: new Date(2025, 5, 20),
      location: 'Kitchen',
      comments: [
        {
          id: 1,
          author: 'You',
          authorRole: 'Client',
          content: "I've tried cleaning the area thoroughly but they keep coming back.",
          timestamp: new Date(2025, 5, 20, 10, 15),
          isStaff: false
        }
      ]
    },
    {
      id: 2,
      title: 'Possible termite damage',
      description: 'Noticed wood damage on back deck posts. Some of the wood seems hollow when tapped.',
      status: 'investigating',
      priority: 'high',
      createdAt: new Date(2025, 5, 25),
      updatedAt: new Date(2025, 5, 26),
      location: 'Back deck',
      assignedTo: 'Keith Grinnage',
      comments: [
        {
          id: 1,
          author: 'You',
          authorRole: 'Client',
          content: 'Found what looks like termite damage on the deck support posts.',
          timestamp: new Date(2025, 5, 25, 14, 30),
          isStaff: false
        },
        {
          id: 2,
          author: 'Keith Grinnage',
          authorRole: 'Senior Technician',
          content: "Thank you for reporting this. I've scheduled an inspection for tomorrow to assess the situation. Please avoid disturbing the area until then.",
          timestamp: new Date(2025, 5, 26, 9, 45),
          isStaff: true
        }
      ]
    },
    {
      id: 3,
      title: 'Mice droppings in garage',
      description: 'Found what appear to be mouse droppings in the corner of the garage near stored boxes.',
      status: 'scheduled',
      priority: 'medium',
      createdAt: new Date(2025, 5, 15),
      updatedAt: new Date(2025, 5, 22),
      scheduledDate: new Date(2025, 6, 2),
      location: 'Garage',
      assignedTo: 'Sarah Johnson',
      comments: [
        {
          id: 1,
          author: 'You',
          authorRole: 'Client',
          content: 'Found droppings in the garage while cleaning.',
          timestamp: new Date(2025, 5, 15, 16, 0),
          isStaff: false
        },
        {
          id: 2,
          author: 'Michael Brown',
          authorRole: 'Technician',
          content: "I'll examine the area during my next visit. In the meantime, please keep food items sealed and check for any openings where mice might enter.",
          timestamp: new Date(2025, 5, 16, 11, 20),
          isStaff: true
        },
        {
          id: 3,
          author: 'Sarah Johnson',
          authorRole: 'Technician',
          content: "I've scheduled a targeted treatment for June 2nd. We'll set up traps and seal entry points.",
          timestamp: new Date(2025, 5, 22, 14, 15),
          isStaff: true
        }
      ]
    },
    {
      id: 4,
      title: 'Wasp nest under eaves',
      description: 'Small wasp nest forming under the eaves on the north side of the house.',
      status: 'resolved',
      priority: 'high',
      createdAt: new Date(2025, 4, 10),
      updatedAt: new Date(2025, 4, 12),
      location: 'Exterior - North side',
      assignedTo: 'Michael Brown',
      comments: [
        {
          id: 1,
          author: 'You',
          authorRole: 'Client',
          content: "Noticed wasps building a nest under the eaves. It's small now but growing.",
          timestamp: new Date(2025, 4, 10, 17, 30),
          isStaff: false
        },
        {
          id: 2,
          author: 'Michael Brown',
          authorRole: 'Technician',
          content: "I'll come by tomorrow for an emergency treatment. Please avoid the area in the meantime.",
          timestamp: new Date(2025, 4, 10, 18, 45),
          isStaff: true
        },
        {
          id: 3,
          author: 'Michael Brown',
          authorRole: 'Technician',
          content: "Successfully removed the nest and treated the area to prevent returns. I'll check during our next regular visit to ensure they haven't started rebuilding.",
          timestamp: new Date(2025, 4, 12, 14, 0),
          isStaff: true
        }
      ]
    }
  ];

  // Filter issues based on search and filters
  const filteredIssues = issues.filter(issue => {
    // Filter by search query
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !issue.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && issue.status !== statusFilter) {
      return false;
    }
    
    // Filter by priority
    if (priorityFilter !== 'all' && issue.priority !== priorityFilter) {
      return false;
    }
    
    return true;
  });

  // Format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    });
  };

  // Get status colors for badges
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'active': return 'bg-red-500/10 text-red-500';
      case 'investigating': return 'bg-yellow-500/10 text-yellow-500';
      case 'scheduled': return 'bg-blue-500/10 text-blue-500';
      case 'resolved': return 'bg-green-500/10 text-green-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case 'low': return 'bg-blue-500/10 text-blue-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'high': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Issues</h2>
          <p className="text-gray-400 mt-1">Report and track pest problems</p>
        </div>
        <Button 
          variant="primary" 
          size="md"
          onClick={() => setIsReportModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Report New Issue
        </Button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-white/10 bg-white/5 pl-10 p-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#56e39f]/50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all" className="bg-[#111827]">All Statuses</option>
              <option value="active" className="bg-[#111827]">Active</option>
              <option value="investigating" className="bg-[#111827]">Investigating</option>
              <option value="scheduled" className="bg-[#111827]">Scheduled</option>
              <option value="resolved" className="bg-[#111827]">Resolved</option>
            </select>
            
            <select
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#56e39f]/50"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all" className="bg-[#111827]">All Priorities</option>
              <option value="low" className="bg-[#111827]">Low</option>
              <option value="medium" className="bg-[#111827]">Medium</option>
              <option value="high" className="bg-[#111827]">High</option>
            </select>
            
            <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
              <Filter className="h-4 w-4 mr-1" />
              More Filters
            </Button>
          </div>
        </div>
      </div>
      
      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <div 
              key={issue.id} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setSelectedIssue(issue)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${getStatusColor(issue.status)}`}>
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white text-lg">{issue.title}</h4>
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status}
                      </Badge>
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-300 line-clamp-2">{issue.description}</p>
                    <div className="flex flex-wrap items-center gap-x-4 mt-2 text-sm">
                      <span className="text-gray-400">
                        Reported on {formatDate(issue.createdAt)}
                      </span>
                      <span className="text-gray-400">
                        Location: {issue.location}
                      </span>
                      {issue.scheduledDate && (
                        <span className="text-blue-400 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Service scheduled for {formatDate(issue.scheduledDate)}
                        </span>
                      )}
                      {issue.comments.length > 0 && (
                        <span className="text-[#56e39f] flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {issue.comments.length} comment{issue.comments.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#56e39f] hover:bg-[#56e39f]/10 p-1 h-auto">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-medium text-white mb-2">No issues found</h4>
            <p className="text-gray-400 mb-4">
              {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' 
                ? "No issues match your current filters." 
                : "You don't have any reported issues."}
            </p>
            <Button 
              variant="primary" 
              size="md"
              onClick={() => setIsReportModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Report New Issue
            </Button>
          </div>
        )}
      </div>
      
      {/* Issue Detail Modal - Would be implemented as a modal component */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a2234] border border-white/10 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-[#1a2234] z-10 p-5 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{selectedIssue.title}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white p-1 h-auto"
                onClick={() => setSelectedIssue(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={getStatusColor(selectedIssue.status)}>
                  {selectedIssue.status}
                </Badge>
                <Badge className={getPriorityColor(selectedIssue.priority)}>
                  {selectedIssue.priority} priority
                </Badge>
                <span className="text-sm text-gray-400">
                  Reported on {formatDate(selectedIssue.createdAt)}
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-medium mb-2">Description</h4>
                <p className="text-gray-300">{selectedIssue.description}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-medium mb-2">Location</h4>
                <p className="text-gray-300">{selectedIssue.location}</p>
              </div>
              
              {selectedIssue.scheduledDate && (
                <div className="mb-6 p-4 bg-blue-500/10 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                    <div>
                      <h4 className="text-white font-medium">Service Scheduled</h4>
                      <p className="text-gray-300">
                        {formatDate(selectedIssue.scheduledDate)} with {selectedIssue.assignedTo}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Comments section */}
              <div className="mt-8">
                <h4 className="text-white font-medium mb-4">Comments ({selectedIssue.comments.length})</h4>
                <div className="space-y-4">
                  {selectedIssue.comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className={`p-4 rounded-lg ${comment.isStaff ? 'bg-[#56e39f]/10 border border-[#56e39f]/30' : 'bg-white/5 border border-white/10'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className={`font-medium ${comment.isStaff ? 'text-[#56e39f]' : 'text-white'}`}>
                            {comment.author}
                          </span>
                          <span className="text-gray-400 text-sm ml-2">
                            {comment.authorRole}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDate(comment.timestamp)} at {formatTime(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  ))}
                </div>
                
                {/* Add comment form */}
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-2">Add a Comment</h4>
                  <textarea 
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50 min-h-[100px]"
                    placeholder="Type your comment here..."
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                        <Camera className="h-4 w-4 mr-1" />
                        Add Photo
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                        <Paperclip className="h-4 w-4 mr-1" />
                        Attach
                      </Button>
                    </div>
                    <Button variant="primary" size="md">
                      Send Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Report Issue Modal - Would be implemented as a modal component */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a2234] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-[#1a2234] z-10 p-5 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Report New Issue</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white p-1 h-auto"
                onClick={() => setIsReportModalOpen(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Issue Title</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                    placeholder="Brief description of the issue"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Detailed Description</label>
                  <textarea 
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50 min-h-[100px]"
                    placeholder="Please provide as much detail as possible about the issue..."
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Location</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                    placeholder="Where in your home or property is the issue?"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Priority</label>
                  <select
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#56e39f]/50"
                  >
                    <option value="" disabled selected className="bg-[#111827]">Select priority level</option>
                    <option value="low" className="bg-[#111827]">Low - Not urgent, can wait</option>
                    <option value="medium" className="bg-[#111827]">Medium - Needs attention soon</option>
                    <option value="high" className="bg-[#111827]">High - Urgent problem</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Add Photos</label>
                  <div className="border-dashed border-2 border-white/10 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 mb-2">Drag and drop photos here or click to upload</p>
                    <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                      Upload Photos
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  size="md" 
                  className="border-white/10 text-white hover:bg-white/5 mr-3"
                  onClick={() => setIsReportModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="md">
                  Submit Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;
