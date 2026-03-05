import { useNavigate } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { CheckCircle2, FileText, Bell, UserCheck, Flag } from 'lucide-react';

export default function AssessmentConfirmation() {
  const navigate = useNavigate();

  return (
    <ExpertLayout>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-status-success-soft rounded-full mb-4">
            <CheckCircle2 className="h-8 w-8 text-status-success" />
          </div>
          <h1 className="text-2xl mb-2">Assessment Submitted Successfully</h1>
          <p className="text-text-body">
            Your assessment for Case ESC-2024-0298 has been processed and all parties have been notified.
          </p>
        </div>

        {/* Status Updates */}
        <Card className="mb-6 border-border-default">
          <CardContent className="pt-6">
            <h3 className="text-base mb-4">Status Updates</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-status-info-soft flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-text-heading">Profile Updated</span>
                  </p>
                  <p className="text-sm text-text-body">
                    Marcus Thompson's behavioral profile has been updated with new triggers and strategy priorities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-status-info-soft flex items-center justify-center flex-shrink-0">
                  <UserCheck className="h-4 w-4 text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-text-heading">Teacher Notified</span>
                  </p>
                  <p className="text-sm text-text-body">
                    Mrs. Maria Johnson has been notified of the assessment and updated strategies
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-status-info-soft flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4 w-4 text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-text-heading">Parent Message Sent</span>
                  </p>
                  <p className="text-sm text-text-body">
                    Lisa & Robert Thompson have received a notification with incident summary and meeting request
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-status-info-soft flex items-center justify-center flex-shrink-0">
                  <Flag className="h-4 w-4 text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-text-heading">Monitoring Flag Set</span>
                  </p>
                  <p className="text-sm text-text-body">
                    Case will be monitored for 1 week with automatic follow-up reminder
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6 border-border-default">
          <CardContent className="pt-6">
            <h3 className="text-base mb-4">Next Steps</h3>
            <ul className="space-y-2 text-sm text-text-label">
              <li className="flex items-start gap-2">
                <span className="text-text-heading mt-0.5">•</span>
                <span>Review parent responses to meeting request in Messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-text-heading mt-0.5">•</span>
                <span>Monitor new incidents to verify strategy effectiveness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-text-heading mt-0.5">•</span>
                <span>You will receive a follow-up reminder on January 19, 2026</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => navigate('/expert/students/STU-4298')}
            variant="outline"
            className="flex-1 border-brand-dark/40 text-brand-dark hover:bg-status-info-soft"
          >
            View Student Profile
          </Button>
          <Button
            onClick={() => navigate('/expert/messages')}
            variant="outline"
            className="flex-1 border-brand-dark/40 text-brand-dark hover:bg-status-info-soft"
          >
            Go to Messages
          </Button>
          <Button
            onClick={() => navigate('/expert/cases')}
            className="flex-1 bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Back to Cases
          </Button>
          <Button
            variant="outline"
            className="border-border-strong text-text-heading hover:bg-surface-page"
          >
            Save Draft
          </Button>
        </div>
      </div>
    </ExpertLayout>
  );
}