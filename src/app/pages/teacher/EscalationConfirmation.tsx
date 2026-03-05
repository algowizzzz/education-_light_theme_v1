import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { STAFF } from '@/data/constants';

export default function EscalationConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { incidentId, expertId, note } = location.state || {};

  const expert = expertId ? STAFF[expertId as keyof typeof STAFF] : null;

  return (
    <TeacherLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-status-success-soft flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-status-success" />
          </div>
          <h1 className="text-2xl text-text-heading mb-2">Escalation Submitted</h1>
          <p className="text-text-label">{expert?.name} has been notified and will review this case</p>
        </div>

        <Card className="mb-6 border-border-default">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border-light">
              <div>
                <div className="text-sm text-text-body mb-1">Escalation ID</div>
                <div className="text-text-heading font-medium">{id}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Status</div>
                <div className="text-text-heading font-medium">Pending Review</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-text-body mb-1">Linked Incident</div>
                <div className="text-text-heading">{incidentId}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Assigned Expert</div>
                <div className="text-text-heading">{expert?.name}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-text-body mb-1">Submitted</div>
              <div className="text-text-heading">{new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-border-default bg-surface-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-text-label">
              The behavioral expert will review this escalation and provide feedback typically within 24 hours. 
              You'll receive a notification when they respond. You can track the status in your Escalation Status list.
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate(`/teacher/escalations/${id}`)}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            View Escalation Status
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/teacher/dashboard')}
            className="border-border-strong text-text-heading hover:bg-surface-page"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}