import React from 'react';
import {
  TrendingUp, DollarSign, Users, Calendar,
  ArrowUpRight, ArrowDownRight, BarChart3,
  PieChart, Activity, Clock, Star, MapPin
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ClientAnalyticsProps {
  clients: any[];
  timeframe: 'week' | 'month' | 'quarter' | 'year';
  onTimeframeChange: (timeframe: 'week' | 'month' | 'quarter' | 'year') => void;
}

export const ClientAnalytics: React.FC<ClientAnalyticsProps> = ({
  clients,
  timeframe,
  onTimeframeChange
}) => {
  // Calculate analytics data
  const analytics = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.businessInfo.status === 'active').length,
    pendingClients: clients.filter(c => c.businessInfo.status === 'pending').length,
    totalRevenue: clients
      .filter(c => c.subscription.isActive)
      .reduce((sum, c) => sum + c.subscription.monthlyValue, 0),
    avgLifetimeValue: clients.reduce((sum, c) => sum + c.businessInfo.lifetime_value, 0) / clients.length,
    retentionRate: 0.94, // Mock data
    churnRate: 0.06, // Mock data
    clientsByType: {
      residential: clients.filter(c => c.businessInfo.clientType === 'residential').length,
      commercial: clients.filter(c => c.businessInfo.clientType === 'commercial').length
    },
    clientsByRisk: {
      low: clients.filter(c => c.businessInfo.risk_level === 'low').length,
      medium: clients.filter(c => c.businessInfo.risk_level === 'medium').length,
      high: clients.filter(c => c.businessInfo.risk_level === 'high').length
    },
    recentGrowth: 0.15, // Mock 15% growth
    avgServiceFrequency: 3.2, // Mock data
    topPerformingRegions: [
      { name: 'San Francisco', clients: 45, revenue: 12500 },
      { name: 'Palo Alto', clients: 28, revenue: 8900 },
      { name: 'San Jose', clients: 33, revenue: 7800 }
    ]
  };

  const timeframes = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const kpiCards = [
    {
      title: 'Client Growth',
      value: `+${(analytics.recentGrowth * 100).toFixed(1)}%`,
      subtitle: `${analytics.totalClients} total clients`,
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      subtitle: 'From active subscriptions',
      icon: <DollarSign className="w-6 h-6" />,
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'Retention Rate',
      value: `${(analytics.retentionRate * 100).toFixed(1)}%`,
      subtitle: 'Client retention',
      icon: <Users className="w-6 h-6" />,
      trend: 'up',
      color: 'purple'
    },
    {
      title: 'Avg Service Frequency',
      value: `${analytics.avgServiceFrequency}x`,
      subtitle: 'Services per year',
      icon: <Calendar className="w-6 h-6" />,
      trend: 'stable',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
      case 'blue': return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400';
      case 'orange': return 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400';
      default: return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Client Analytics
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Track client metrics and business performance
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => onTimeframeChange(tf.value as any)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                timeframe === tf.value
                  ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("flex items-center justify-center w-12 h-12 rounded-xl", getColorClasses(kpi.color))}>
                {kpi.icon}
              </div>
              {getTrendIcon(kpi.trend)}
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {kpi.value}
              </p>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                {kpi.title}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {kpi.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Client Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Client Distribution
            </h3>
            <PieChart className="w-5 h-5 text-neutral-400" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Residential</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {analytics.clientsByType.residential} clients
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{
                    width: `${(analytics.clientsByType.residential / analytics.totalClients) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Commercial</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {analytics.clientsByType.commercial} clients
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div
                  className="bg-accent-500 h-2 rounded-full"
                  style={{
                    width: `${(analytics.clientsByType.commercial / analytics.totalClients) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              Risk Distribution
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {analytics.clientsByRisk.low}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Low Risk</p>
              </div>
              <div>
                <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                  {analytics.clientsByRisk.medium}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Medium Risk</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  {analytics.clientsByRisk.high}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">High Risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Top Performing Regions
            </h3>
            <MapPin className="w-5 h-5 text-neutral-400" />
          </div>

          <div className="space-y-4">
            {analytics.topPerformingRegions.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {region.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {region.clients} clients
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    ${region.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Revenue
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Insights */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Business Insights
          </h3>
          <BarChart3 className="w-5 h-5 text-neutral-400" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl mx-auto mb-3">
              <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              ${Math.round(analytics.avgLifetimeValue).toLocaleString()}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Avg Lifetime Value
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {((analytics.activeClients / analytics.totalClients) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Client Activation Rate
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl mx-auto mb-3">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {(analytics.churnRate * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Churn Rate
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              +{analytics.pendingClients}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Pending Approvals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};