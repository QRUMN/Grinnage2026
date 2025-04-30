import React from 'react';
import { Users, Calendar, FileText, DollarSign, UserPlus, FileSignature } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';
import { StatCard } from '../common/StatCard';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCreateClient = () => {
    navigate('/admin/create-client');
  };

  const handleCreateContract = () => {
    navigate('/admin/create-contract');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage clients, contracts, and services</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleCreateClient}
            className="flex items-center px-4 py-2 bg-[#56e39f] text-white rounded-lg hover:bg-[#48c98a] transition-colors"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Client
          </button>
          <button
            onClick={handleCreateContract}
            className="flex items-center px-4 py-2 bg-[#56e39f] text-white rounded-lg hover:bg-[#48c98a] transition-colors"
          >
            <FileSignature className="w-5 h-5 mr-2" />
            Create Contract
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="New Clients"
          value="24"
          icon={<Users className="w-6 h-6" />}
          change={{ value: "+8 this month", type: "increase" }}
        />
        <StatCard
          title="Upcoming Jobs"
          value="12"
          icon={<Calendar className="w-6 h-6" />}
          change={{ value: "Next 7 days", type: "neutral" }}
        />
        <StatCard
          title="Active Contracts"
          value="156"
          icon={<FileText className="w-6 h-6" />}
          change={{ value: "+15 this month", type: "increase" }}
        />
        <StatCard
          title="Revenue"
          value="$45,289"
          icon={<DollarSign className="w-6 h-6" />}
          change={{ value: "+12% vs last month", type: "increase" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <DashboardCard title="Recent Clients">
          <div className="space-y-4">
            {[
              { name: 'John Smith', type: 'Residential', date: '2024-03-10', status: 'active' },
              { name: 'Tech Solutions Inc', type: 'Commercial', date: '2024-03-09', status: 'pending' },
              { name: 'Sarah Johnson', type: 'Residential', date: '2024-03-08', status: 'active' }
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {client.type} • Added {client.date}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Upcoming Jobs */}
        <DashboardCard title="Upcoming Jobs">
          <div className="space-y-4">
            {[
              { client: 'Tech Solutions Inc', service: 'Monthly Inspection', date: '2024-03-15', time: '10:00 AM' },
              { client: 'John Smith', service: 'Pest Treatment', date: '2024-03-16', time: '2:30 PM' },
              { client: 'Sarah Johnson', service: 'Follow-up Visit', date: '2024-03-17', time: '11:15 AM' }
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{job.client}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{job.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{job.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{job.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Recent Contracts */}
      <DashboardCard title="Recent Contracts">
        <div className="space-y-4">
          {[
            { client: 'Tech Solutions Inc', type: 'Annual Service', value: '$2,400', status: 'active' },
            { client: 'John Smith', type: 'Quarterly Service', value: '$600', status: 'pending' },
            { client: 'Sarah Johnson', type: 'Monthly Service', value: '$1,200', status: 'active' }
          ].map((contract, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{contract.client}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{contract.type}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-medium text-gray-900 dark:text-white">{contract.value}</p>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  contract.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {contract.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};