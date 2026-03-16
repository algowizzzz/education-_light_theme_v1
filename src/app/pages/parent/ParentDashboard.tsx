import { useNavigate } from 'react-router-dom';
import { User, AlertCircle } from 'lucide-react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { MARCUS_PROFILE } from '@/data/constants';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const today = 'Thursday, January 15, 2026';

  const marcusChild = MARCUS_PROFILE.student;
  const emmaChild = {
    id: 'emma-thompson',
    name: 'Emma Thompson',
    grade: '5th Grade',
    teacher: 'Mr. David Chen'
  };
  const expert = 'Dr. Sarah Williams';

  const marcusCases = [
    {
      id: 'ESC-2026-0045',
      submittedDate: '2026-01-12',
      trigger: 'Academic frustration',
      severity: 'High',
      status: 'Under Review',
      notePreview: 'Marcus has had 3 incidents this week, all related to academic frustration during math...',
      linkedIncident: 'ESC-2026-0198',
      parentAcknowledged: false,
    },
  ];

  const emmaCases = [
    {
      id: 'ESC-2026-0089',
      submittedDate: '2026-01-14',
      trigger: 'Peer conflict',
      severity: 'Medium',
      status: 'Under Review',
      notePreview: 'Emma had a disagreement with classmates during group work. She became upset and refused to participate...',
      linkedIncident: 'ESC-2026-0201',
      parentAcknowledged: false,
    },
    {
      id: 'ESC-2026-0067',
      submittedDate: '2026-01-10',
      trigger: 'Transition difficulties',
      severity: 'Low',
      status: 'Completed',
      notePreview: 'Emma showed resistance when transitioning from recess to classroom. Intervention was successful...',
      linkedIncident: 'ESC-2026-0189',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0052',
      submittedDate: '2026-01-08',
      trigger: 'Social anxiety',
      severity: 'Medium',
      status: 'Completed',
      notePreview: 'Emma expressed discomfort during lunch period. She preferred to stay near the teacher instead of joining peers...',
      linkedIncident: 'ESC-2026-0175',
      parentAcknowledged: true,
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge className="bg-status-error-soft text-status-error border border-status-error-border">{severity}</Badge>;
      case 'Medium':
        return <Badge className="bg-status-warning-soft text-status-warning border border-status-warning-border">{severity}</Badge>;
      case 'Low':
        return <Badge className="bg-status-info-soft text-status-info border border-status-info-border">{severity}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <ParentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading">
            Welcome, Lisa
          </h1>
          <p className="text-sm md:text-base text-text-body">{today}</p>
        </div>

        {/* Child Card */}
        <Card className="p-6 border border-border-default bg-surface-card">
          {/* Recent Cases */}
          <div>
            <h3 className="font-semibold text-text-heading mb-3">Recent Cases</h3>
            <div className="space-y-3">
              {marcusCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-4 border rounded-lg hover:bg-surface-page cursor-pointer transition-colors ${
                    !caseItem.parentAcknowledged ? 'border-brand-dark' : 'border-border-light'
                  }`}
                  onClick={() => navigate(`/parent/children/${marcusChild.id}/cases/${caseItem.id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 space-y-2 md:space-y-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getSeverityBadge(caseItem.severity)}
                      <Badge className={caseItem.status === 'Under Review' ? 'bg-status-warning-soft text-status-warning border border-status-warning-border' : 'bg-status-warning-soft text-status-warning border border-status-warning-border'}>
                        {caseItem.status}
                      </Badge>
                      {!caseItem.parentAcknowledged && (
                        <div className="flex items-center gap-1 text-sm text-text-heading font-medium">
                          <AlertCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Needs Acknowledgment</span>
                          <span className="sm:hidden">Action Required</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-text-body whitespace-nowrap">
                      {new Date(caseItem.submittedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="mb-2">
                    <h4 className="font-semibold text-text-heading mb-2">{marcusChild.name}</h4>
                    <div className="text-sm text-text-body mb-1">Trigger</div>
                    <div className="font-medium text-text-heading">{caseItem.trigger}</div>
                  </div>

                  <p className="text-sm text-text-label line-clamp-2 mb-3">
                    {caseItem.notePreview}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-border-light space-y-2 sm:space-y-0">
                    <span className="text-xs text-text-body">Case ID: {caseItem.id}</span>
                    <Badge className={caseItem.parentAcknowledged ? 'bg-status-success-soft text-status-success border border-status-success-border' : 'bg-status-warning-soft text-status-warning border border-status-warning-border'}>
                      {caseItem.parentAcknowledged ? 'Acknowledged' : 'Not yet acknowledged'}
                    </Badge>
                  </div>
                </div>
              ))}
              {emmaCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-4 border rounded-lg hover:bg-surface-page cursor-pointer transition-colors ${
                    !caseItem.parentAcknowledged ? 'border-brand-dark' : 'border-border-light'
                  }`}
                  onClick={() => navigate(`/parent/children/${emmaChild.id}/cases/${caseItem.id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 space-y-2 md:space-y-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getSeverityBadge(caseItem.severity)}
                      <Badge className={caseItem.status === 'Under Review' ? 'bg-status-warning-soft text-status-warning border border-status-warning-border' : 'bg-status-success-soft text-status-success border border-status-success-border'}>
                        {caseItem.status}
                      </Badge>
                      {!caseItem.parentAcknowledged && (
                        <div className="flex items-center gap-1 text-sm text-text-heading font-medium">
                          <AlertCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Needs Acknowledgment</span>
                          <span className="sm:hidden">Action Required</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-text-body whitespace-nowrap">
                      {new Date(caseItem.submittedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="mb-2">
                    <h4 className="font-semibold text-text-heading mb-2">{emmaChild.name}</h4>
                    <div className="text-sm text-text-body mb-1">Trigger</div>
                    <div className="font-medium text-text-heading">{caseItem.trigger}</div>
                  </div>
                  
                  <p className="text-sm text-text-label line-clamp-2 mb-3">
                    {caseItem.notePreview}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-border-light space-y-2 sm:space-y-0">
                    <span className="text-xs text-text-body">Case ID: {caseItem.id}</span>
                    <Badge className={caseItem.parentAcknowledged ? 'bg-status-success-soft text-status-success border border-status-success-border' : 'bg-status-warning-soft text-status-warning border border-status-warning-border'}>
                      {caseItem.parentAcknowledged ? 'Acknowledged' : 'Not yet acknowledged'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-3 border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page rounded-lg"
              onClick={() => navigate(`/parent/children/${marcusChild.id}/cases`)}
            >
              View All Cases
            </Button>
          </div>
        </Card>
      </div>
    </ParentLayout>
  );
}