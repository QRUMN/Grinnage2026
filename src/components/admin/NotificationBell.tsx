import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Trash2, AlertCircle, MessageSquare, UserPlus, Calendar, DollarSign } from 'lucide-react';
import { useNotifications } from '../../lib/notification-context';
import { cn } from '../../lib/utils';

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  } = useNotifications();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const displayNotifications = showAll
    ? notifications
    : notifications.slice(0, 5);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <UserPlus className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'request':
        return <AlertCircle className="w-4 h-4" />;
      case 'appointment':
        return <Calendar className="w-4 h-4" />;
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'text-red-500 bg-red-50 dark:bg-red-900/20';
    }

    switch (type) {
      case 'lead':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'message':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'request':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'appointment':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'payment':
        return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      default:
        return 'text-neutral-500 bg-neutral-50 dark:bg-neutral-800';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full text-xs font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 rounded transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="p-1 text-neutral-500 hover:text-red-500 rounded transition-colors"
                  title="Clear all notifications"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mb-3" />
                <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-1">
                  No notifications yet
                </p>
                <p className="text-sm text-neutral-400 dark:text-neutral-500">
                  You'll see updates about leads, messages, and requests here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {displayNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                      !notification.read && "bg-primary-50/30 dark:bg-primary-900/10"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
                        getNotificationColor(notification.type, notification.priority)
                      )}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={cn(
                            "text-sm font-medium truncate",
                            notification.read
                              ? "text-neutral-700 dark:text-neutral-300"
                              : "text-neutral-900 dark:text-neutral-100"
                          )}>
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                          {notification.message}
                        </p>

                        {notification.metadata?.clientName && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            Client: {notification.metadata.clientName}
                          </p>
                        )}

                        {notification.priority === 'high' && (
                          <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                            High Priority
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-1 text-neutral-400 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 5 && (
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                {showAll ? 'Show Less' : `View All ${notifications.length} Notifications`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};