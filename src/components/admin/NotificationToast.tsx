import React, { useEffect, useState } from 'react';
import { X, Bell, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotifications, Notification } from '../../lib/notification-context';
import { cn } from '../../lib/utils';

interface Toast extends Notification {
  visible: boolean;
}

export const NotificationToast: React.FC = () => {
  const { notifications } = useNotifications();
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Monitor for new notifications and create toasts
  useEffect(() => {
    const latestNotification = notifications[0];

    if (latestNotification && !toasts.find(t => t.id === latestNotification.id)) {
      const newToast: Toast = {
        ...latestNotification,
        visible: true
      };

      setToasts(prev => [newToast, ...prev]);

      // Auto-remove toast after 5 seconds
      setTimeout(() => {
        setToasts(prev =>
          prev.map(toast =>
            toast.id === latestNotification.id
              ? { ...toast, visible: false }
              : toast
          )
        );

        // Remove from array after animation
        setTimeout(() => {
          setToasts(prev => prev.filter(toast => toast.id !== latestNotification.id));
        }, 300);
      }, 5000);
    }
  }, [notifications]);

  const removeToast = (id: string) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id
          ? { ...toast, visible: false }
          : toast
      )
    );

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };

  const getToastIcon = (type: string, priority: string) => {
    if (priority === 'high') {
      return <AlertTriangle className="w-5 h-5" />;
    }

    switch (type) {
      case 'lead':
        return <CheckCircle className="w-5 h-5" />;
      case 'message':
        return <Info className="w-5 h-5" />;
      case 'request':
        return <AlertCircle className="w-5 h-5" />;
      case 'appointment':
        return <Bell className="w-5 h-5" />;
      case 'payment':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getToastStyles = (type: string, priority: string) => {
    if (priority === 'high') {
      return {
        container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        icon: 'text-red-500',
        title: 'text-red-900 dark:text-red-100',
        message: 'text-red-700 dark:text-red-300'
      };
    }

    switch (type) {
      case 'lead':
        return {
          container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          icon: 'text-green-500',
          title: 'text-green-900 dark:text-green-100',
          message: 'text-green-700 dark:text-green-300'
        };
      case 'message':
        return {
          container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          icon: 'text-blue-500',
          title: 'text-blue-900 dark:text-blue-100',
          message: 'text-blue-700 dark:text-blue-300'
        };
      case 'request':
        return {
          container: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
          icon: 'text-orange-500',
          title: 'text-orange-900 dark:text-orange-100',
          message: 'text-orange-700 dark:text-orange-300'
        };
      case 'appointment':
        return {
          container: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
          icon: 'text-purple-500',
          title: 'text-purple-900 dark:text-purple-100',
          message: 'text-purple-700 dark:text-purple-300'
        };
      case 'payment':
        return {
          container: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
          icon: 'text-emerald-500',
          title: 'text-emerald-900 dark:text-emerald-100',
          message: 'text-emerald-700 dark:text-emerald-300'
        };
      default:
        return {
          container: 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700',
          icon: 'text-neutral-500',
          title: 'text-neutral-900 dark:text-neutral-100',
          message: 'text-neutral-700 dark:text-neutral-300'
        };
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type, toast.priority);

        return (
          <div
            key={toast.id}
            className={cn(
              "max-w-sm w-full shadow-lg rounded-lg border pointer-events-auto transform transition-all duration-300 ease-in-out",
              styles.container,
              toast.visible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            )}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className={cn("flex-shrink-0", styles.icon)}>
                  {getToastIcon(toast.type, toast.priority)}
                </div>

                <div className="ml-3 w-0 flex-1">
                  <p className={cn("text-sm font-medium", styles.title)}>
                    {toast.title}
                  </p>
                  <p className={cn("mt-1 text-sm", styles.message)}>
                    {toast.message}
                  </p>
                  {toast.metadata?.clientName && (
                    <p className={cn("mt-1 text-xs", styles.message)}>
                      Client: {toast.metadata.clientName}
                    </p>
                  )}
                </div>

                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => removeToast(toast.id)}
                    className={cn(
                      "rounded-md inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2",
                      styles.icon,
                      "hover:opacity-75"
                    )}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};