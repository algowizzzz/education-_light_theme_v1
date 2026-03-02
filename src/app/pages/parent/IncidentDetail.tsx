import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ParentIncidentDetail() {
  const { childId, incidentId } = useParams();
  const [acknowledged, setAcknowledged] = useState(false);
  const [feedback, setFeedback] = useState('');

  const incident = {
    id: incidentId,
    date: '2026-01-12',
    time: '11:00 AM',
    location: 'Classroom during Math',
    category: 'Disruptive Behavior',
    description: 'Marcus became frustrated during a timed math quiz and had difficulty staying focused. After several minutes of struggle, he pushed his materials off the desk.',
    strategiesTried: [
      { name: 'Verbal redirection', effectiveness: 'Not effective' },
      { name: 'Short break offered', effectiveness: 'Refused' },
      { name: 'One-on-one support', effectiveness: 'Partially effective' },
    ],
    outcome: 'The situation was de-escalated with one-on-one support. Marcus took a break and was able to calm down, but did not complete the quiz. This has been escalated to Dr. Williams for additional support.',
    loggedBy: 'Mrs. Maria Johnson, 4th Grade Teacher',
    hasExpertReview: true,
    expertName: 'Dr. Sarah Williams',
    expertNotes: 'This is the third math-related incident this week. I\'ve identified a pattern of increasing frustration with timed assessments. I\'m recommending accommodations including extended time and breaking assessments into smaller chunks. I\'ll be observing tomorrow and will follow up with you and Mrs. Johnson with updated strategies.',
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    toast.success('Incident marked as acknowledged');
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    toast.success('Feedback sent to Dr. Williams');
    setFeedback('');
  };

  return (
    <ParentLayout>
      <div className="p-8 max-w-4xl">
        <Link to={`/parent/children/${childId}`} className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">
            {new Date(incident.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </h1>
          <p className="text-text-label">Incident reported at {incident.time}</p>
        </div>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">What Happened</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border-light">
              <div>
                <div className="text-sm text-text-body mb-1">Date & Time</div>
                <div className="text-text-heading">{incident.date} at {incident.time}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Location</div>
                <div className="text-text-heading">{incident.location}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-text-body mb-1">Category</div>
              <Badge variant="outline" className="border-border-strong text-text-label">
                {incident.category}
              </Badge>
            </div>
            <div>
              <div className="text-sm text-text-body mb-2">Description</div>
              <p className="text-text-heading">{incident.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">What Was Tried</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incident.strategiesTried.map((strategy, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface-page rounded-lg">
                  <span className="text-text-heading">{strategy.name}</span>
                  <span className="text-sm text-text-body">{strategy.effectiveness}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Outcome</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-heading">{incident.outcome}</p>
          </CardContent>
        </Card>

        {incident.hasExpertReview && (
          <Card className="mb-6 border-brand bg-surface-hover">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-text-label" />
                <CardTitle className="text-lg text-text-heading">Expert Assessment</CardTitle>
              </div>
              <p className="text-sm text-text-body">From {incident.expertName}</p>
            </CardHeader>
            <CardContent>
              <p className="text-text-heading">{incident.expertNotes}</p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Logged By</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-heading">{incident.loggedBy}</p>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Your Acknowledgment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-sm text-text-body">Status:</div>
                {acknowledged ? (
                  <Badge className="bg-brand text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Acknowledged
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-border-strong text-text-label">
                    Not yet acknowledged
                  </Badge>
                )}
              </div>
              {!acknowledged && (
                <Button
                  onClick={handleAcknowledge}
                  className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Acknowledged
                </Button>
              )}
            </div>

            <div className="pt-4 border-t border-border-light">
              <div className="text-sm text-text-body mb-2">
                Optional: Share feedback or questions with {incident.expertName}
              </div>
              <Textarea
                placeholder="Any additional context from home, questions, or feedback you'd like to share..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="border-border-default text-text-heading placeholder:text-text-body mb-3"
              />
              <Button
                onClick={handleSendFeedback}
                disabled={!feedback.trim()}
                variant="outline"
                className="border-border-strong text-text-heading hover:bg-surface-page"
              >
                Send Feedback to Expert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}