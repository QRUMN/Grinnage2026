import * as React from 'react';
import { 
  PieChart, ArrowUp, ArrowDown, Calendar, 
  Download, Users, DollarSign, TrendingUp, Map,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';

const Analytics = () => {
  // State for date filters
  const [dateRange, setDateRange] = React.useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
  // Mock data for metrics
  const metrics = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$84,254',
      change: 12.5,
      changeType: 'increase',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'green'
    },
    {
      id: 2,
      title: 'New Customers',
      value: '385',
      change: 8.2,
      changeType: 'increase',
      icon: <Users className="h-6 w-6" />,
      color: 'blue'
    },
    {
      id: 3,
      title: 'Completed Jobs',
      value: '1,248',
      change: 5.3,
      changeType: 'increase',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Conversion Rate',
      value: '68%',
      change: 1.2,
      changeType: 'decrease',
      icon: <PieChart className="h-6 w-6" />,
      color: 'amber'
    }
  ];

  // Mock data for revenue chart
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2025',
        data: [6500, 5900, 8000, 8100, 9600, 8800, 9000, 9800, 10000, 11000, 12500, 14000],
        color: '#56e39f'
      },
      {
        label: '2024',
        data: [5000, 4800, 6000, 6800, 7400, 6900, 7200, 7800, 8500, 9200, 10500, 11200],
        color: '#9e9e9e'
      }
    ]
  };

  // Mock data for service breakdown
  const serviceBreakdown = [
    { name: 'General Pest Control', value: 45, color: '#56e39f' },
    { name: 'Termite Treatment', value: 25, color: '#f59e0b' },
    { name: 'Mosquito Control', value: 15, color: '#8b5cf6' },
    { name: 'Rodent Control', value: 10, color: '#ef4444' },
    { name: 'Other Services', value: 5, color: '#6b7280' }
  ];

  // Mock data for customer acquisition
  const acquisitionData = [
    { name: 'Referrals', value: 38, color: '#56e39f' },
    { name: 'Website', value: 32, color: '#3b82f6' },
    { name: 'Google Ads', value: 18, color: '#f59e0b' },
    { name: 'Social Media', value: 8, color: '#8b5cf6' },
    { name: 'Other', value: 4, color: '#6b7280' }
  ];

  // Mock data for service areas
  const serviceAreas = [
    { name: 'San Francisco', count: 324, growth: 12 },
    { name: 'Oakland', count: 215, growth: 8 },
    { name: 'Berkeley', count: 189, growth: 15 },
    { name: 'San Jose', count: 156, growth: 6 },
    { name: 'Sunnyvale', count: 104, growth: 10 }
  ];

  // Mock data for top technicians
  const topTechnicians = [
    { name: 'Keith Grinnage', completedJobs: 112, rating: 4.9, revenue: 35400 },
    { name: 'Michael Brown', completedJobs: 98, rating: 4.8, revenue: 28700 },
    { name: 'Sarah Johnson', completedJobs: 87, rating: 4.7, revenue: 24500 },
    { name: 'David Wilson', completedJobs: 76, rating: 4.9, revenue: 21300 }
  ];

  // Get metric color
  const getMetricColor = (color: string): string => {
    switch(color) {
      case 'green': return 'bg-green-500/20 text-green-500';
      case 'blue': return 'bg-blue-500/20 text-blue-500';
      case 'purple': return 'bg-purple-500/20 text-purple-500';
      case 'amber': return 'bg-amber-500/20 text-amber-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  // Function to generate SVG path for revenue chart
  const generateChartPath = (data: number[], _index: number): string => {
    const max = Math.max(...data);
    const min = Math.min(...data) * 0.7; // Add some padding at the bottom
    
    const height = 200;
    const width = 800;
    const xStep = width / (data.length - 1);
    
    return data.map((value, i) => {
      const x = i * xStep;
      const y = height - ((value - min) / (max - min) * height);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Analytics</h2>
          <p className="text-gray-400 mt-1">Track business performance and customer insights</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Date Range Tabs - Full width on mobile, normal on desktop */}
          <div className="border border-gray-700 rounded-lg overflow-hidden flex w-full sm:w-auto">
            <button 
              className={`px-3 py-1.5 text-sm flex-1 sm:flex-initial ${dateRange === 'week' ? 'bg-[#56e39f]/20 text-[#56e39f]' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setDateRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1.5 text-sm flex-1 sm:flex-initial ${dateRange === 'month' ? 'bg-[#56e39f]/20 text-[#56e39f]' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setDateRange('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1.5 text-sm flex-1 sm:flex-initial ${dateRange === 'quarter' ? 'bg-[#56e39f]/20 text-[#56e39f]' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setDateRange('quarter')}
            >
              Quarter
            </button>
            <button 
              className={`px-3 py-1.5 text-sm flex-1 sm:flex-initial ${dateRange === 'year' ? 'bg-[#56e39f]/20 text-[#56e39f]' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setDateRange('year')}
            >
              Year
            </button>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/10 text-white hover:bg-white/5 flex-1 sm:flex-initial"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/10 text-white hover:bg-white/5 flex-1 sm:flex-initial"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-400">{metric.title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{metric.value}</h3>
              </div>
              <div className={`p-2 rounded-full ${getMetricColor(metric.color)}`}>
                {metric.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className={`text-xs md:text-sm flex items-center ${
                metric.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.changeType === 'increase' ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {metric.change}%
              </span>
              <span className="text-gray-500 text-xs md:text-sm ml-1">vs previous {dateRange}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-white">Revenue Over Time</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-[#56e39f] mr-2"></div>
              <span className="text-xs md:text-sm text-gray-400">2025</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-gray-500 mr-2"></div>
              <span className="text-xs md:text-sm text-gray-400">2024</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden">
          {/* Chart SVG - Adjust viewBox for mobile responsiveness */}
          <svg className="w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="800" y2="0" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="75" x2="800" y2="75" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="225" x2="800" y2="225" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="300" x2="800" y2="300" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* 2025 Line */}
            <path 
              d={generateChartPath(revenueData.datasets[0].data, 0)}
              stroke="#56e39f" 
              strokeWidth="3"
              fill="none"
            />
            
            {/* 2024 Line */}
            <path 
              d={generateChartPath(revenueData.datasets[1].data, 1)}
              stroke="#9e9e9e" 
              strokeWidth="2"
              strokeDasharray="5 5"
              fill="none"
            />
            
            {/* X-Axis Labels - Show only every other month on small screens */}
            {revenueData.labels.map((label, i) => (
              <text 
                key={i}
                x={i * (800 / (revenueData.labels.length - 1))}
                y="320"
                textAnchor="middle"
                className={`text-xs fill-gray-400 ${i % 2 !== 0 ? 'sm:block hidden' : ''}`}
              >
                {label}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Service and Acquisition Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Service Breakdown */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Service Breakdown</h3>
          
          <div className="space-y-4 md:space-y-5">
            {serviceBreakdown.map((service, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm text-gray-300">{service.name}</span>
                  <span className="text-xs md:text-sm font-medium text-white">{service.value}%</span>
                </div>
                <div className="w-full h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${service.value}%`, backgroundColor: service.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer Acquisition */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Customer Acquisition</h3>
          
          <div className="space-y-4 md:space-y-5">
            {acquisitionData.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-xs md:text-sm text-gray-300">{source.name}</span>
                  <span className="text-xs md:text-sm font-medium text-white">{source.value}%</span>
                </div>
                <div className="w-full h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${source.value}%`, backgroundColor: source.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Service Areas */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-white">Top Service Areas</h3>
            <div className="flex items-center justify-center p-1.5 rounded-lg bg-gray-800">
              <Map className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="flex justify-between items-center p-2 md:p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                <div>
                  <div className="text-xs md:text-sm font-medium text-white">{area.name}</div>
                  <div className="text-xs text-gray-400">{area.count} customers</div>
                </div>
                <div className="flex items-center text-green-400 text-xs md:text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {area.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Technicians */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-white">Top Performing Technicians</h3>
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/10 text-white hover:bg-white/5 text-xs h-8 px-2 md:text-sm md:h-9 md:px-3"
            >
              View All
            </Button>
          </div>
          
          {/* Desktop table (hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-400">Technician</th>
                  <th className="text-center py-3 px-2 text-xs font-medium text-gray-400">Completed Jobs</th>
                  <th className="text-center py-3 px-2 text-xs font-medium text-gray-400">Rating</th>
                  <th className="text-right py-3 px-2 text-xs font-medium text-gray-400">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {topTechnicians.map((tech, index) => (
                  <tr key={index} className="hover:bg-gray-800/30">
                    <td className="py-3 px-2 whitespace-nowrap">
                      <div className="font-medium text-white">{tech.name}</div>
                    </td>
                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      <div className="text-gray-300">{tech.completedJobs}</div>
                    </td>
                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      <div className="text-amber-400 flex items-center justify-center">
                        {tech.rating}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right whitespace-nowrap">
                      <div className="font-medium text-[#56e39f]">${tech.revenue.toLocaleString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile card view (visible only on mobile) */}
          <div className="md:hidden space-y-3">
            {topTechnicians.map((tech, index) => (
              <div key={index} className="p-3 border border-gray-700/50 rounded-lg hover:bg-gray-800/30">
                <div className="font-medium text-white text-sm mb-2">{tech.name}</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="space-y-1">
                    <div className="text-gray-400">Jobs</div>
                    <div className="text-gray-300">{tech.completedJobs}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-400">Rating</div>
                    <div className="text-amber-400">{tech.rating}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-400">Revenue</div>
                    <div className="font-medium text-[#56e39f]">${tech.revenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
