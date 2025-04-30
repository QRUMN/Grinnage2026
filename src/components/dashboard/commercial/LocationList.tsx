import React from 'react';
import { Building2, MapPin, Phone, Plus } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

const locations = [
  {
    id: '1',
    name: 'Main Office',
    address: '123 Business Ave, Suite 100',
    phone: '(555) 123-4567',
    lastService: '2024-03-01'
  },
  {
    id: '2',
    name: 'Warehouse',
    address: '456 Industrial Pkwy',
    phone: '(555) 987-6543',
    lastService: '2024-02-28'
  }
];

export const LocationList = () => {
  return (
    <DashboardCard 
      title="Locations" 
      action={
        <button className="flex items-center text-mint-500 hover:text-mint-600">
          <Plus className="w-4 h-4 mr-1" />
          Add Location
        </button>
      }
    >
      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.id} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-mint-100 dark:bg-mint-900/30 rounded-lg">
                <Building2 className="w-5 h-5 text-mint-500" />
              </div>
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white">{location.name}</h3>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center text-sm text-dark-600 dark:text-dark-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {location.address}
                  </div>
                  <div className="flex items-center text-sm text-dark-600 dark:text-dark-400">
                    <Phone className="w-4 h-4 mr-1" />
                    {location.phone}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-dark-600 dark:text-dark-400">
                Last Service: {new Date(location.lastService).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};