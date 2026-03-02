import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowLeft, Send, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'parent' | 'expert' | 'teacher';
  content: string;
  timestamp: string;
}

export default function ParentMessageConversation() {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');

  const conversation = {
    id: id,
    participantName: 'Dr. Sarah Williams',
    participantRole: 'Behavioral Expert',
    childName: 'Marcus Williams'
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'expert-001',
      senderName: 'Dr. Sarah Williams',
      senderRole: 'expert',
      content: "Hi Lisa, I wanted to reach out after reviewing Marcus's recent incidents. I've noticed a pattern of increasing frustration with timed assessments, particularly in math. Have you noticed similar challenges with homework or other timed activities at home?",
      timestamp: 'Jan 14, 2026 at 2:30 PM'
    },
    {
      id: '2',
      senderId: 'parent-001',
      senderName: 'Lisa Thompson',
      senderRole: 'parent',
      content: "Hi Dr. Williams, thank you for reaching out. Yes, we've definitely seen this at home. Marcus gets very anxious when he knows there's a time limit. He'll sometimes shut down completely or get very frustrated with himself. We've been trying to be patient but I'm not sure what else we can do to help.",
      timestamp: 'Jan 14, 2026 at 4:15 PM'
    },
    {
      id: '3',
      senderId: 'expert-001',
      senderName: 'Dr. Sarah Williams',
      senderRole: 'expert',
      content: "That's really helpful context, thank you. I'm going to recommend some accommodations including extended time and breaking assessments into smaller chunks. I'd also like to suggest some strategies you can use at home to help build his confidence with timed activities. Would you be available for a brief phone call this week to discuss the home strategies?",
      timestamp: 'Jan 14, 2026 at 5:00 PM'
    },
    {
      id: '4',
      senderId: 'parent-001',
      senderName: 'Lisa Thompson',
      senderRole: 'parent',
      content: "Yes, I'd really appreciate that. I'm available Thursday afternoon or Friday morning. What time works best for you?",
      timestamp: 'Jan 14, 2026 at 5:30 PM'
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'parent-001',
      senderName: 'Lisa Thompson',
      senderRole: 'parent',
      content: newMessage,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Message sent');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ParentLayout>
      <div className="max-w-4xl">
        <Link to="/parent/messages" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Messages
        </Link>

        {/* Conversation Header */}
        <Card className="mb-6 border-border-default">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center">
                <User className="w-6 h-6 text-text-body" />
              </div>
              <div>
                <h2 className="font-medium text-text-heading">{conversation.participantName}</h2>
                <p className="text-sm text-text-body">
                  {conversation.participantRole} • Re: {conversation.childName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderRole === 'parent' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.senderRole === 'parent' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {message.senderRole !== 'parent' && (
                    <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center">
                      <User className="w-4 h-4 text-text-body" />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-text-heading">
                      {message.senderRole === 'parent' ? 'You' : message.senderName}
                    </div>
                    <div className="text-xs text-text-body">{message.timestamp}</div>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    message.senderRole === 'parent'
                      ? 'bg-badge-high text-white'
                      : 'bg-surface-page text-text-heading'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <Card className="border-border-default">
          <CardContent className="p-4">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={4}
              className="border-border-default text-text-heading placeholder:text-text-body mb-3"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-text-body">
                Press Enter to send, Shift+Enter for new line
              </p>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
