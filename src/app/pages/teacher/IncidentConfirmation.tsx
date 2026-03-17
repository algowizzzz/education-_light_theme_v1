import { useLocation, useNavigate } from 'react-router-dom';
import { Check, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export default function IncidentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-5 md:p-8 border border-border-default bg-surface-card text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-status-success-soft flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-status-success" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-text-heading mb-2">
              Incident Submitted Successfully
            </h1>
            <p className="text-text-body">
              Your incident report has been recorded and saved.
            </p>
          </div>

          <Card className="p-6 border border-border-light bg-surface-page text-left space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-heading">Incident Summary</h3>
              <Badge variant="outline" className="border-border-strong text-text-label">
                {data.incidentId}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-body">Student:</span>
                <span className="text-text-heading font-medium">
                  {data.student?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-body">Date/Time:</span>
                <span className="text-text-heading">
                  {data.date} at {data.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-body">Location:</span>
                <span className="text-text-heading capitalize">{data.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-body">Category:</span>
                <span className="text-text-heading capitalize">{data.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-body">Severity:</span>
                <span className="text-text-heading capitalize">{data.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-body">Outcome:</span>
                <span className="text-text-heading capitalize">{data.outcome}</span>
              </div>
            </div>
          </Card>

          {data.outcome === 'escalated' && (
            <Card className="p-4 border border-brand bg-surface-page text-left">
              <p className="text-sm text-text-label">
                <strong className="text-text-heading">Escalation submitted:</strong> This incident has been escalated to a behavioral expert for review. You will receive a notification when the expert provides feedback.
              </p>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              onClick={() => navigate(`/teacher/incidents/${data.incidentId}`)}
              variant="outline"
              className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page rounded-lg"
            >
              View Incident Details
            </Button>
            <Button
              onClick={() => navigate('/teacher/incidents/new')}
              variant="outline"
              className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page rounded-lg"
            >
              Log Another Incident
            </Button>
            <Button
              onClick={() => navigate('/teacher/dashboard')}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm rounded-lg"
            >
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}