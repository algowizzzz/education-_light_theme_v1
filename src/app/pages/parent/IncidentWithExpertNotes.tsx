import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, CheckCircle, User, Clock, MapPin, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function IncidentWithExpertNotes() {
  const { childId, incidentId } = useParams();
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);
  const [feedback, setFeedback] = useState('');

  const incident = {
    id: incidentId || 'ESC-2026-0234',
    date: 'January 15, 2026',
    time: '09:45 AM',
    location: 'Classroom - Math Period',
    category: 'Peer Conflict',
    description:
      'Marcus had a disagreement with a classmate during group work. The situation escalated when materials were not being shared equally within the group.',
    strategiesTried: [
      { name: 'Verbal Redirection', effectiveness: 'Partially Effective' },
      { name: 'Short Break (5 min)', effectiveness: 'Effective' },
      { name: 'One-on-One Check-in', effectiveness: 'Effective' },
    ],
    outcome:
      'Marcus was able to return to class after a 5-minute break and one-on-one check-in. He completed the group activity with a different partner and remained focused for the rest of the period.',
    loggedBy: 'Mrs. Maria Johnson',
    loggedRole: '4th Grade Lead Teacher',
  };

  const expertAssessment = {
    expertName: 'Dr. Sarah Williams',
    expertRole: 'Lead Behavioral Specialist',
    assessmentDate: 'January 15, 2026, 2:30 PM',
    notes:
      'This incident is consistent with Marcus\'s known triggers around peer interactions during collaborative work. The teacher\'s intervention strategy was appropriate and effective. I recommend continuing with short breaks and one-on-one check-ins as primary strategies.',
    recommendations: [
      'Continue monitoring peer interactions during group activities',
      'Consider pre-teaching group work expectations before collaborative tasks',
      'Maintain consistent use of short breaks when early signs of frustration appear',
    ],
    followUp: 'Scheduled follow-up check-in for next week to review progress.',
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    toast.success('Incident acknowledged');
    if (feedback.trim()) {
      toast.success('Your feedback has been sent to the expert');
    }
    setTimeout(() => {
      navigate(`/parent/children/${childId}`);
    }, 1500);
  };

  return (
    <ParentLayout>
      <div className="p-4 md:p-8 max-w-4xl">
        <Link
          to={`/parent/children/${childId}`}
          className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-text-heading">{incident.date}</h1>
            <Badge className="bg-surface-page text-text-heading border border-border-default">
              {incident.category}
            </Badge>
          </div>
          <p className="text-sm text-text-body">Incident ID: {incident.id}</p>
        </div>

        <div className="space-y-6">
          {/* What Happened */}
          <Card className="border-border-default">
            <CardHeader>
              <CardTitle className="text-lg text-text-heading">What Happened</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-text-body" />
                  <div>
                    <span className="text-text-body">Time:</span>
                    <span className="ml-2 text-text-heading">{incident.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-text-body" />
                  <div>
                    <span className="text-text-body">Location:</span>
                    <span className="ml-2 text-text-heading">{incident.location}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-heading mb-2">Description</h4>
                <p className="text-sm text-text-label">{incident.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* What Was Tried */}
          <Card className="border-border-default">
            <CardHeader>
              <CardTitle className="text-lg text-text-heading">What Was Tried</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incident.strategiesTried.map((strategy, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-surface-page rounded"
                  >
                    <span className="text-sm text-text-heading">{strategy.name}</span>
                    <Badge
                      className={
                        strategy.effectiveness === 'Effective'
                          ? 'bg-status-success-soft text-status-success border border-status-success-border'
                          : 'bg-status-info-soft text-status-info border border-status-info-border'
                      }
                    >
                      {strategy.effectiveness}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Outcome */}
          <Card className="border-border-default">
            <CardHeader>
              <CardTitle className="text-lg text-text-heading">Outcome</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-label">{incident.outcome}</p>
            </CardContent>
          </Card>

          {/* Expert Assessment - NEW SECTION */}
          <Card className="border-brand-dark border-2">
            <CardHeader className="bg-surface-page">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-text-heading" />
                <CardTitle className="text-lg text-text-heading">
                  Expert Assessment
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-text-heading">
                      {expertAssessment.expertName}
                    </p>
                    <p className="text-sm text-text-body">
                      {expertAssessment.expertRole}
                    </p>
                  </div>
                  <p className="text-xs text-text-body">
                    {expertAssessment.assessmentDate}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-heading mb-2">
                  Expert Notes
                </h4>
                <p className="text-sm text-text-label">{expertAssessment.notes}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-heading mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {expertAssessment.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-text-label mt-0.5 flex-shrink-0" />
                      <span className="text-text-label">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-border-default">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-text-body mt-0.5" />
                  <p className="text-sm text-text-body">{expertAssessment.followUp}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logged By */}
          <Card className="border-border-default">
            <CardHeader>
              <CardTitle className="text-lg text-text-heading">Logged By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-icon-person-soft flex items-center justify-center">
                  <User className="w-5 h-5 text-icon-person" />
                </div>
                <div>
                  <p className="font-medium text-text-heading">{incident.loggedBy}</p>
                  <p className="text-sm text-text-body">{incident.loggedRole}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Acknowledgment */}
          <Card className="border-border-default">
            <CardHeader>
              <CardTitle className="text-lg text-text-heading">
                Your Acknowledgment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {acknowledged ? (
                <div className="flex items-center gap-2 text-sm text-text-label">
                  <CheckCircle className="w-5 h-5 text-text-heading" />
                  <span>Acknowledged on {new Date().toLocaleDateString()}</span>
                </div>
              ) : (
                <>
                  <p className="text-sm text-text-body">
                    Status: <span className="text-text-heading">Not yet acknowledged</span>
                  </p>
                  <div>
                    <Label htmlFor="feedback" className="text-sm text-text-heading">
                      Optional Feedback to Expert
                    </Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share any observations, questions, or concerns with the behavioral expert..."
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                  <Button
                    onClick={handleAcknowledge}
                    className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Acknowledged
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ParentLayout>
  );
}