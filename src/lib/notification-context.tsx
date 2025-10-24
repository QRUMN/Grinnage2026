import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'lead' | 'message' | 'request' | 'appointment' | 'payment' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  metadata?: {
    clientId?: string;
    clientName?: string;
    amount?: number;
    source?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('admin-notifications');
    return saved ? JSON.parse(saved).map((n: any) => ({
      ...n,
      timestamp: new Date(n.timestamp)
    })) : [];
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    localStorage.setItem('admin-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: newNotification.id
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Simulate real-time notifications for demo
  useEffect(() => {
    const simulateNotifications = () => {
      const types: Array<{
        type: Notification['type'];
        titles: string[];
        messages: string[];
        priority: Notification['priority'];
      }> = [
        {
          type: 'lead',
          titles: ['New Lead Generated', 'Website Inquiry', 'Service Request'],
          messages: [
            'A new potential client has submitted a contact form',
            'Someone requested a quote for residential cleaning',
            'New inquiry from your website contact page'
          ],
          priority: 'high'
        },
        {
          type: 'message',
          titles: ['Client Message', 'Service Feedback', 'Question Received'],
          messages: [
            'Sarah Johnson sent you a message about her upcoming service',
            'Client feedback received for last service visit',
            'A client has a question about billing'
          ],
          priority: 'medium'
        },
        {
          type: 'request',
          titles: ['Service Change Request', 'Scheduling Request', 'Special Request'],
          messages: [
            'Client requested to reschedule next appointment',
            'Additional service requested for existing client',
            'Special cleaning instructions received'
          ],
          priority: 'medium'
        },
        {
          type: 'appointment',
          titles: ['Appointment Reminder', 'Schedule Update', 'Booking Confirmed'],
          messages: [
            'Upcoming appointment in 2 hours',
            'New appointment booked for tomorrow',
            'Client confirmed appointment for Friday'
          ],
          priority: 'low'
        },
        {
          type: 'payment',
          titles: ['Payment Received', 'Invoice Overdue', 'Payment Failed'],
          messages: [
            'Payment of $150 received from John Smith',
            'Invoice #1234 is now 7 days overdue',
            'Payment failed for client subscription'
          ],
          priority: 'high'
        }
      ];

      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomTitle = randomType.titles[Math.floor(Math.random() * randomType.titles.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];

      addNotification({
        type: randomType.type,
        title: randomTitle,
        message: randomMessage,
        priority: randomType.priority,
        metadata: {
          clientName: ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Brown'][Math.floor(Math.random() * 4)],
          source: 'website'
        }
      });
    };

    // Create initial notifications
    const initialTimer = setTimeout(() => {
      simulateNotifications();
    }, 3000);

    // Set up periodic notifications (every 30-60 seconds for demo)
    const interval = setInterval(simulateNotifications, Math.random() * 30000 + 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};