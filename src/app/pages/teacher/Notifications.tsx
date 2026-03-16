import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Bell, CheckCircle2, AlertCircle, MessageSquare, User } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'escalation',
      title: 'Expert Response Received',
      message: 'Dr. Sarah Williams responded to your escalation for Marcus Thompson (ESC-2026-0045)',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'incident',
      title: 'Incident Logged Successfully',
      message: 'Incident ESC-2026-0234 for Marcus Thompson has been saved',
      timestamp: '3 hours ago',
      read: false,
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'escalation':
        return <AlertCircle className="w-5 h-5 text-text-label" />;
      case 'incident':
        return <CheckCircle2 className="w-5 h-5 text-text-label" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-text-label" />;
      case 'profile':
        return <User className="w-5 h-5 text-text-label" />;
      default:
        return <Bell className="w-5 h-5 text-text-label" />;
    }
  };

  return (
    <TeacherLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">Notifications</h1>
        </div>

        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer hover:bg-table-row-hover transition-colors ${
                !notification.read ? 'border-l-4 border-l-brand border-border-default' : 'border-border-default'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-text-heading font-medium">
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-text-body">
                          {notification.timestamp}
                        </span>
                        {!notification.read && (
                          <Badge className="bg-brand text-white h-2 w-2 p-0 rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-text-label">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <Bell className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-body">No notifications yet</p>
            </div>
          </Card>
        )}
      </div>
    </TeacherLayout>
  );
}