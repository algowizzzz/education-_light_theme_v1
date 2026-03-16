import { useState } from 'react';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'case_escalated' | 'message_received' | 'assessment_due' | 'case_updated' | 'profile_updated';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export default function ExpertNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'case_escalated',
      title: 'New Case Assigned',
      message: 'You have been assigned a new case for Marcus Thompson (Grade 7). Review required within 24 hours.',
      time: '2 hours ago',
      read: false,
      link: '/expert/cases/CS-2026-003'
    }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ExpertLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">Notifications</h1>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <Card className="border-border-default">
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-body">No notifications</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className="border-l-4 border-l-brand border-border-default bg-surface-card"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-5 h-5 text-text-body" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-heading mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-text-label">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm text-text-body">
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-brand-dark" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ExpertLayout>
  );
}