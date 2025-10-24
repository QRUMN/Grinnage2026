import React from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Star,
  Users, 
  Package,
  MapPin,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  priceType: 'fixed' | 'starting-at' | 'hourly';
  duration: number;
  isPopular: boolean;
  isRecurring: boolean;
  frequencyOptions?: string[]; // For recurring services
  createdAt: Date;
  updatedAt?: Date;
  image: string;
  rating: number;
  technicians: number;
  featured: boolean;
}

const ServicesManagement: React.FC = () => {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = React.useState<'name' | 'price' | 'category'>('name');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const itemsPerPage = 10;

  // Define service categories
  const categories = ['pest-control', 'termite', 'mosquito', 'rodent', 'other'];

  // Enhanced sample data for mobile-friendly design
  const services: Service[] = [
    {
      id: 1,
      name: 'General Pest Control',
      description: 'Comprehensive pest management service for residential properties, protecting against common pests like ants, roaches, and spiders.',
      price: 149.99,
      priceType: 'fixed',
      category: 'pest-control',
      duration: 90,
      isRecurring: true,
      isPopular: true,
      frequencyOptions: ['Monthly', 'Quarterly', 'Bi-annually'],
      createdAt: new Date('2023-01-15'),
      image: 'https://images.unsplash.com/photo-1635048424329-5238b1b47248?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      technicians: 12,
      featured: true
    },
    {
      id: 2,
      name: 'Termite Inspection',
      description: 'Thorough inspection of property for termite activity and damage with detailed report and treatment recommendations.',
      price: 99.99,
      priceType: 'fixed',
      category: 'termite',
      duration: 60,
      isRecurring: false,
      isPopular: false,
      createdAt: new Date('2023-02-20'),
      image: 'https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.5,
      technicians: 8,
      featured: false
    },
    {
      id: 3,
      name: 'Mosquito Treatment',
      description: 'Specialized outdoor treatment targeting mosquito breeding grounds and resting areas to reduce mosquito populations.',
      price: 89.99,
      priceType: 'fixed',
      category: 'mosquito',
      duration: 45,
      isRecurring: true,
      isPopular: true,
      frequencyOptions: ['Monthly', 'Bi-monthly'],
      createdAt: new Date('2023-03-10'),
      image: 'https://images.unsplash.com/photo-1632935190508-c614557eac5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      technicians: 6,
      featured: true
    },
    {
      id: 4,
      name: 'Rodent Control',
      description: 'Complete rodent control solution including inspection, exclusion work, trapping, and preventative measures.',
      price: 199.99,
      priceType: 'fixed',
      category: 'rodent',
      duration: 120,
      isRecurring: false,
      isPopular: false,
      createdAt: new Date('2023-04-05'),
      image: 'https://images.unsplash.com/photo-1602408593247-dedde9d0fd3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
      technicians: 5,
      featured: false
    },
    {
      id: 5,
      name: 'Commercial Pest Management',
      description: 'Customized pest control solutions for businesses, restaurants, warehouses, and other commercial properties.',
      price: 299.99,
      priceType: 'starting-at',
      category: 'pest-control',
      duration: 180,
      isRecurring: true,
      isPopular: false,
      frequencyOptions: ['Weekly', 'Bi-weekly', 'Monthly'],
      createdAt: new Date('2023-05-12'),
      image: 'https://images.unsplash.com/photo-1604328727766-a151d1045ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      technicians: 15,
      featured: true
    },
    {
      id: 6,
      name: 'Bed Bug Treatment',
      description: 'Specialized heat and chemical treatment protocol to eliminate bed bug infestations completely.',
      price: 499.99,
      priceType: 'fixed',
      category: 'other',
      duration: 240,
      isRecurring: false,
      isPopular: true,
      createdAt: new Date('2023-06-18'),
      image: 'https://images.unsplash.com/photo-1625511316651-7c49e1249c3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      technicians: 10,
      featured: false
    }
  ];

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    // Filter by search query
    if (
      searchQuery && 
      !service.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== 'all' && service.category !== categoryFilter) {
      return false;
    }
    
    return true;
  });

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'category') {
      comparison = a.category.localeCompare(b.category);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
  const paginatedServices = sortedServices.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format price
  const formatPrice = (price: number, priceType: string): string => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
    
    if (priceType === 'starting-at') {
      return `From ${formattedPrice}`;
    } else if (priceType === 'hourly') {
      return `${formattedPrice}/hr`;
    } else {
      return formattedPrice;
    }
  };

  // Format duration
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return hours === 1 ? `${hours} hour` : `${hours} hours`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'pest-control': return 'bg-blue-500/10 text-blue-500';
      case 'termite': return 'bg-amber-500/10 text-amber-500';
      case 'mosquito': return 'bg-purple-500/10 text-purple-500';
      case 'rodent': return 'bg-red-500/10 text-red-500';
      case 'other': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Format category name
  const formatCategory = (category: string): string => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Handle sort
  const handleSort = (field: 'name' | 'price' | 'category') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Services</h2>
          <p className="text-gray-400 mt-1">Manage all available services and pricing</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-auto items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 md:py-2 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="block w-full sm:w-40 px-3 py-3 md:py-2 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{formatCategory(category)}</option>
            ))}
          </select>
          <Button className="bg-[#56e39f] hover:bg-[#56e39f]/80 text-gray-900 w-full sm:w-auto py-3 md:py-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Categories Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        <Button
          variant={categoryFilter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setCategoryFilter('all')}
          className={`${categoryFilter === 'all' ? 'bg-[#56e39f] hover:bg-[#56e39f]/80 text-gray-900' : 'border-white/10 text-white hover:bg-white/5'} text-xs md:text-sm h-8 md:h-9 whitespace-nowrap flex-shrink-0`}
        >
          All
        </Button>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={categoryFilter === category ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter(category)}
            className={`${categoryFilter === category ? 'bg-[#56e39f] hover:bg-[#56e39f]/80 text-gray-900' : 'border-white/10 text-white hover:bg-white/5'} text-xs md:text-sm h-8 md:h-9 whitespace-nowrap flex-shrink-0`}
          >
            {formatCategory(category)}
          </Button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {paginatedServices.map((service) => (
          <div
            key={service.id}
            className="group rounded-xl overflow-hidden border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-[#56e39f]/50 transition-all"
          >
            {/* Service Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <Badge className={getCategoryColor(service.category)}>
                  {service.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-medium">{service.rating}</span>
                </div>
              </div>
            </div>
            
            {/* Service Content */}
            <div className="p-4 md:p-5 space-y-3">
              <div className="flex justify-between">
                <h3 className="text-base md:text-lg font-bold text-white">{service.name}</h3>
                <div className="text-base md:text-lg font-bold text-[#56e39f]">${service.price}</div>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm line-clamp-2">{service.description}</p>
              
              <div className="flex items-center text-gray-400 text-xs md:text-sm space-x-4">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {service.duration} min
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {service.technicians} technicians
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 border-t border-gray-700/50 space-y-3 sm:space-y-0">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 text-xs h-8 px-2 md:text-sm md:h-9 md:px-3">
                    <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 text-red-400 hover:bg-red-900/20 hover:border-red-400/30 text-xs h-8 px-2 md:text-sm md:h-9 md:px-3">
                    <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Delete
                  </Button>
                </div>
                <Badge
                  className={`${service.featured ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'} text-xs md:text-sm`}
                >
                  {service.featured ? 'Featured' : 'Standard'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredServices.length > itemsPerPage && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium text-white">
              {Math.min(currentPage * itemsPerPage, filteredServices.length)}
            </span>{' '}
            of <span className="font-medium text-white">{filteredServices.length}</span> services
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-white/10 text-white hover:bg-white/5 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-white/10 text-white hover:bg-white/5 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          size="lg"
          className="border-white/10 text-white hover:bg-white/5"
        >
          <FileText className="w-5 h-5 mr-2" />
          Export Services List
        </Button>
      </div>

      {/* Note: The modal components for adding/editing services would be implemented here */}
    </div>
  );
};

export default ServicesManagement;
