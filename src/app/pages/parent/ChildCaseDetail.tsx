import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { STUDENTS, STAFF, MARCUS_PROFILE } from '@/data/constants';
import { toast } from 'sonner';

export default function ChildCaseDetail() {
  const { id, caseId } = useParams();
  const [messageInput, setMessageInput] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [messages, setMessages] = useState<Array<{ 
    sender: 'parent' | 'teacher' | 'expert'; 
    senderName: string;
    message: string; 
    timestamp: string 
  }>>([
    { 
      sender: 'teacher', 
      senderName: 'Sarah Johnson',
      message: 'I escalated this case because Marcus has had multiple incidents this week related to math frustration. The current strategies aren\'t working as well as they used to.', 
      timestamp: '2026-01-12 2:30 PM' 
    },
    { 
      sender: 'expert', 
      senderName: 'Dr. Patricia Martinez',
      message: 'I\'ve reviewed the case and behavioral history. I recommend implementing a more structured intervention plan with smaller task chunks and extended time. I\'ll share the full plan shortly.', 
      timestamp: '2026-01-13 10:15 AM' 
    },
  ]);

  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];
  
  const caseData = {
    id: caseId,
    status: 'Under Review',
    student: student,
    teacher: STAFF['T-2024-0847'],
    expert: STAFF['BE-2024-0023'],
    submittedDate: '2026-01-12',
    linkedIncident: 'ESC-2026-0198',
    teacherNote: 'Marcus has had 3 incidents this week, all related to academic frustration during math. Tried short breaks and verbal redirection, but effectiveness declining. Pattern shows increasing severity. Need guidance on alternative strategies.',
  };

  const incidentSummary = MARCUS_PROFILE.incidents[1];

  const incidentDetails = {
    date: '2026-01-12',
    time: '11:00 AM',
    location: 'Math Class, Room 204',
    category: 'Disruptive Behavior',
    severity: 'High',
    triggers: ['Academic frustration', 'Timed assessment', 'Peer pressure'],
    strategies: ['Verbal redirection', 'Short break (offered)', 'Calm verbal reminder', 'Proximity control'],
    notes: 'Marcus became visibly frustrated during a timed math assessment. He crumpled his paper, threw his pencil, and raised his voice saying "This is too hard! I can\'t do this!" After verbal redirection, Marcus pushed his desk and left the room without permission.',
    outcome: 'Escalated',
  };

  const expertRecommendations = `Based on the behavioral history and PBIS framework, here are the recommended interventions:

1. Proactive Strategies:
   - Break math tasks into smaller, manageable chunks (5-10 minute segments)
   - Provide visual timers for transitions
   - Offer choice in assignment order to increase autonomy

2. Teaching Replacement Behaviors:
   - Teach self-advocacy script: "I need help with..." or "Can I take a break?"
   - Practice deep breathing techniques before challenging tasks
   - Model and reinforce asking for clarification

3. Environmental Modifications:
   - Seat near positive peer models
   - Minimize visual distractions during independent work
   - Provide access to fidget tools or movement breaks

4. Reinforcement System:
   - Implement behavior-specific praise every 10-15 minutes
   - Use token economy for completing math tasks without incident
   - Provide preferred activity after difficult tasks`;

  const handleAcknowledge = () => {
    setAcknowledged(true);
    toast.success('Case acknowledged successfully');
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      sender: 'parent' as const,
      senderName: 'Parent',
      message: messageInput,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric', 
        minute: '2-digit' 
      })
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    toast.success('Message sent to teacher and expert');
  };

  return (
    <ParentLayout>
      <div className="p-8 max-w-5xl">
        <Link 
          to={`/parent/children/${id}/cases`}
          className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cases
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-text-heading mb-2">Case Review</h1>
            <p className="text-text-label">{caseData.id}</p>
          </div>
          {!acknowledged && (
            <Button
              onClick={handleAcknowledge}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Acknowledge Case
            </Button>
          )}
        </div>

        {acknowledged && (
          <Card className="mb-6 border-border-default bg-surface-page">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-text-heading">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">You acknowledged this case</span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-text-heading font-medium mb-1">{caseData.student.name}</div>
            <div className="text-sm text-text-body">
              {caseData.student.id} • Grade {caseData.student.grade} • {caseData.student.primaryTeacher}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-sm text-text-body mb-1">Teacher</div>
              <div className="text-text-heading font-medium">{caseData.teacher.name}</div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-sm text-text-body mb-1">Behavioral Expert</div>
              <div className="text-text-heading font-medium">{caseData.expert.name}</div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-sm text-text-body mb-1">Submitted Date</div>
              <div className="text-text-heading font-medium">
                {new Date(caseData.submittedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-sm text-text-body mb-1">Status</div>
              <Badge className="bg-status-warning-soft text-status-warning border border-status-warning-border">
                {caseData.status}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Linked Incident</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              to={`/parent/children/${id}/incidents/${caseData.linkedIncident}`}
              className="text-text-heading hover:underline font-medium"
            >
              {caseData.linkedIncident}
            </Link>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Incident Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-text-body mb-1">Date & Time</div>
                <div className="text-text-heading font-medium">{incidentDetails.date} at {incidentDetails.time}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Location</div>
                <div className="text-text-heading font-medium">{incidentDetails.location}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Category</div>
                <div className="text-text-heading font-medium">{incidentDetails.category}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Severity</div>
                <Badge className={
                  incidentDetails.severity === 'High' ? 'bg-status-error-soft text-status-error border border-status-error-border' :
                  incidentDetails.severity === 'Medium' ? 'bg-status-warning-soft text-status-warning border border-status-warning-border' :
                  'bg-status-info-soft text-status-info border border-status-info-border'
                }>
                  {incidentDetails.severity}
                </Badge>
              </div>
            </div>
            {incidentDetails.notes && (
              <div className="mt-4 pt-4 border-t border-border-light">
                <div className="text-sm text-text-body mb-2">What Happened</div>
                <p className="text-text-heading text-sm">{incidentDetails.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-border-default">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-text-heading">Triggers Identified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {incidentDetails.triggers.map((trigger, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-surface-page rounded-lg">
                    <div className="text-text-heading">{trigger}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-text-heading">Strategies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {incidentDetails.strategies.map((strategy, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-surface-page rounded-lg">
                    <div className="text-text-heading">{strategy}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Teacher's Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-heading">{caseData.teacherNote}</p>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Expert Recommendations</CardTitle>
            <p className="text-sm text-text-body">PBIS-aligned intervention strategies</p>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-surface-page rounded-lg border border-border-light">
              <pre className="text-sm text-text-heading whitespace-pre-wrap font-sans leading-relaxed">
                {expertRecommendations}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Conversation About This Case</CardTitle>
            <p className="text-sm text-text-body">Discuss this case with the teacher and expert</p>
          </CardHeader>
          <CardContent>
            {messages.length > 0 && (
              <div className="mb-4 space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      msg.sender === 'parent' ? 'bg-brand text-white' :
                      msg.sender === 'teacher' ? 'bg-surface-page' :
                      'bg-status-info-soft'
                    }`}
                  >
                    <p className={`mb-2 ${msg.sender === 'parent' ? 'text-white' : 'text-text-heading'}`}>{msg.message}</p>
                    <div className={`flex items-center gap-2 text-xs ${msg.sender === 'parent' ? 'text-white/70' : 'text-text-body'}`}>
                      <span className="font-medium">{msg.senderName}</span>
                      <span>•</span>
                      <span className="capitalize">{msg.sender}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-3">
              <Textarea
                placeholder="Type your message to the teacher and expert..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                rows={4}
                className="border-border-default text-text-heading placeholder:text-text-body"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
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