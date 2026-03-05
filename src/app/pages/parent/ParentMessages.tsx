import { useState } from 'react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Link } from 'react-router-dom';
import { MessageSquare, Search, User } from 'lucide-react';

interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'expert' | 'teacher';
  lastMessage: string;
  timestamp: string;
  unread: number;
  childName: string;
}

export default function ParentMessages() {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: 'conv-001',
      participantName: 'Dr. Sarah Williams',
      participantRole: 'expert',
      lastMessage: "I've reviewed Marcus's recent incidents and have some recommendations for you and Mrs. Johnson...",
      timestamp: '2 hours ago',
      unread: 2,
      childName: 'Marcus Williams'
    },
    {
      id: 'conv-002',
      participantName: 'Mrs. Maria Johnson',
      participantRole: 'teacher',
      lastMessage: 'Thank you for sharing that context about home. It helps me understand...',
      timestamp: '1 day ago',
      unread: 0,
      childName: 'Marcus Williams'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.childName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ParentLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl text-text-heading mb-6">Messages</h1>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-body" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-border-default text-text-heading"
          />
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {filteredConversations.length === 0 ? (
            <Card className="border-border-default">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-body">No conversations found</p>
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((conversation) => (
              <Link key={conversation.id} to={`/parent/messages/${conversation.id}`}>
                <Card className={`border-border-default hover:border-border-strong transition-colors ${
                  conversation.unread > 0 ? 'bg-surface-hover' : 'bg-surface-card'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-status-info-soft flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-text-body" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <h3 className="font-medium text-text-heading">
                              {conversation.participantName}
                            </h3>
                            <p className="text-sm text-text-body">
                              {conversation.participantRole === 'expert' ? 'Behavioral Expert' : 'Teacher'} • Re: {conversation.childName}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm text-text-body whitespace-nowrap">
                              {conversation.timestamp}
                            </span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-brand text-white">
                                {conversation.unread} new
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-text-label line-clamp-2">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </ParentLayout>
  );
}
