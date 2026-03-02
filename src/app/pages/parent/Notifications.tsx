import { useState } from 'react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Bell, BellOff, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'incident' | 'update' | 'message' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  childName?: string;
}

export default function ParentNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'incident',
      title: 'New Incident Report',
      message: 'A new behavior incident has been logged for Marcus Thompson.',
      timestamp: '2 hours ago',
      isRead: false,
      childName: 'Marcus Thompson'
    },
    {
      id: '2',
      type: 'message',
      title: 'Message from Dr. Williams',
      message: 'Dr. Williams has sent you a message regarding Marcus\'s behavior support plan.',
      timestamp: '5 hours ago',
      isRead: false,
      childName: 'Marcus Thompson'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'incident':
        return <AlertCircle className="h-5 w-5 text-text-heading" />;
      case 'update':
        return <Info className="h-5 w-5 text-text-heading" />;
      case 'message':
        return <Bell className="h-5 w-5 text-text-heading" />;
      case 'reminder':
        return <CheckCircle className="h-5 w-5 text-text-body" />;
      default:
        return <Bell className="h-5 w-5 text-text-body" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <ParentLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Notifications</h1>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-border-default cursor-pointer transition-colors hover:bg-surface-page ${
                !notification.isRead ? 'bg-surface-hover' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm">{notification.title}</p>
                          {!notification.isRead && (
                            <Badge variant="secondary" className="bg-brand-dark text-white text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        {notification.childName && (
                          <p className="text-xs text-text-body mb-1">
                            {notification.childName}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-text-body whitespace-nowrap">
                        {notification.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-text-label">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="border-border-default">
            <CardContent className="py-12 text-center">
              <BellOff className="h-12 w-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-body">No notifications at this time</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ParentLayout>
  );
}