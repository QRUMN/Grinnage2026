import React from 'react';
import { MoreVertical, Mail, Phone, Shield, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { formatDate } from '../../../../utils/date';

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(302) 562-5654',
    role: 'residential',
    status: 'active',
    lastLogin: '2024-03-01T10:00:00Z',
    createdAt: '2024-01-15T08:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@company.com',
    phone: '(555) 987-6543',
    role: 'commercial',
    status: 'active',
    lastLogin: '2024-03-05T14:20:00Z',
    createdAt: '2024-02-01T09:15:00Z'
  }
];

export const UserList = () => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'commercial':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'suspended':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
          <thead className="bg-gray-50 dark:bg-dark-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-mint-100 dark:bg-mint-900/30 flex items-center justify-center text-mint-600 dark:text-mint-400 font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-dark-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-dark-500 dark:text-dark-400">
                        Created {formatDate(user.createdAt)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-dark-900 dark:text-white">
                      <Mail className="w-4 h-4 mr-2 text-dark-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm text-dark-500 dark:text-dark-400">
                      <Phone className="w-4 h-4 mr-2 text-dark-400" />
                      {user.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status === 'active' ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500 dark:text-dark-400">
                  {formatDate(user.lastLogin)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1 text-dark-400 hover:text-dark-900 dark:hover:text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-dark-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-dark-400 hover:text-dark-900 dark:hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white dark:bg-dark-800 px-4 py-3 border-t border-gray-200 dark:border-dark-700 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-dark-700 dark:text-dark-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">20</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded-md text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};