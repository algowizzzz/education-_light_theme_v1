import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Sparkles, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface CaseReviewTabsProps {
  caseData: {
    id: string | undefined;
    linkedIncident: string;
    teacherNote: string;
  };
  recentPattern: Array<{
    date: string;
    trigger: string;
    severity: string;
    outcome: string;
  }>;
  onStartReview: () => void;
}

export function CaseReviewTabs({ caseData, recentPattern, onStartReview }: CaseReviewTabsProps) {
  const [parentMessages, setParentMessages] = useState<Array<{ sender: 'expert' | 'parent'; message: string; timestamp: string }>>([
    { sender: 'parent', message: 'Thank you for reviewing Marcus\'s case. We\'ve noticed he gets frustrated with math homework at home too. What strategies do you recommend we try?', timestamp: 'Jan 13, 10:30 AM' },
  ]);
  const [parentMessageInput, setParentMessageInput] = useState('');

  const handleSendParentMessage = () => {
    if (!parentMessageInput.trim()) return;

    const newMessage = {
      sender: 'expert' as const,
      message: parentMessageInput,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit' 
      })
    };

    setParentMessages([...parentMessages, newMessage]);
    setParentMessageInput('');
    toast.success('Message sent to parent');
  };

  return (
    <Card className="border-border-default mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-text-heading">
          <MessageSquare className="w-5 h-5 inline mr-2" />
          Parent Communication
        </CardTitle>
        <p className="text-sm text-text-body mt-2">
          Incident-specific messages with Lisa Thompson (Parent)
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
          {parentMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                msg.sender === 'expert'
                  ? 'bg-surface-elevated ml-12'
                  : 'bg-surface-page mr-12'
              }`}
            >
              <div className="text-xs text-text-body mb-1">
                {msg.sender === 'expert' ? 'You (Expert)' : 'Parent'} • {msg.timestamp}
              </div>
              <p className="text-sm text-text-heading">{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message to the parent..."
            value={parentMessageInput}
            onChange={(e) => setParentMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendParentMessage();
              }
            }}
            rows={3}
            className="border-border-default text-text-heading placeholder:text-text-body"
          />
          <Button
            onClick={handleSendParentMessage}
            className="bg-brand hover:bg-brand-dark text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}