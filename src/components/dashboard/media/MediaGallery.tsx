import React from 'react';
import { Image, Film, Mic, Trash2 } from 'lucide-react';

const mediaItems = [
  {
    id: '1',
    type: 'image',
    name: 'Inspection Photo 1',
    date: '2024-03-01',
    thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '2',
    type: 'video',
    name: 'Treatment Video',
    date: '2024-03-01'
  }
];

export const MediaGallery = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'video':
        return <Film className="w-6 h-6" />;
      case 'audio':
        return <Mic className="w-6 h-6" />;
      default:
        return <Image className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm mt-6">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white">Media Gallery</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-700">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getIcon(item.type)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-2 text-white hover:text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-dark-900 dark:text-white truncate">
                {item.name}
              </p>
              <p className="text-xs text-dark-600 dark:text-dark-400">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};