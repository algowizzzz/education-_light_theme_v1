import { useNavigate } from 'react-router-dom';
import { AlertTriangle, User } from 'lucide-react';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export default function ExpertDashboard() {
  const navigate = useNavigate();
  const today = 'Thursday, January 15, 2026';

  const caseStats = {
    pendingReview: 5,
    activeCases: 3,
    closedThisWeek: 12,
  };

  const pendingCases = [
    {
      id: 'ESC-2026-0089',
      priority: 'High',
      student: 'Marcus Thompson',
      grade: 4,
      teacher: 'Mrs. Maria Johnson',
      date: 'Jan 15, 2026',
      time: '11:05 AM',
      trigger: 'Academic frustration - 3rd incident this week',
      note: 'Pattern identified - strategy effectiveness declining. Marcus refused...',
    },
    {
      id: 'ESC-2026-0087',
      priority: 'Medium',
      student: 'Sofia Garcia',
      grade: 4,
      teacher: 'Mrs. Maria Johnson',
      date: 'Jan 14, 2026',
      time: '2:30 PM',
      trigger: 'Peer conflict during group work',
      note: 'Sofia became upset after being excluded from a group activity...',
    },
  ];

  const recentlyClosed = [
    {
      student: 'Emily Chen',
      date: 'Jan 14, 2026',
      resolution: 'Profile updated, monitoring for 2 weeks',
    },
    {
      student: 'Jordan Davis',
      date: 'Jan 13, 2026',
      resolution: 'Resolved, new strategy added',
    },
  ];

  return (
    <ExpertLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading">
            Good morning, Dr. Williams
          </h1>
          <p className="text-sm md:text-base text-text-body">{today}</p>
        </div>

        {/* Case Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 border border-border-default bg-surface-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body mb-1">Active Cases</p>
                <p className="text-3xl font-bold text-text-heading">
                  {caseStats.activeCases}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-status-info-soft flex items-center justify-center">
                <User className="w-6 h-6 text-text-heading" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border-default bg-surface-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body mb-1">Closed This Week</p>
                <p className="text-3xl font-bold text-text-heading">
                  {caseStats.closedThisWeek}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-status-info-soft flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-text-heading"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Escalated Cases Awaiting Review */}
        <Card className="p-6 border border-border-default bg-surface-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-heading">
              Escalated Cases Awaiting Review
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/expert/cases')}
              className="text-text-label hover:text-text-heading"
            >
              View All →
            </Button>
          </div>

          <div className="space-y-3">
            {pendingCases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className="p-4 border border-border-light hover:bg-surface-page cursor-pointer"
                onClick={() => navigate(`/expert/cases/${caseItem.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 space-y-2 md:space-y-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Badge
                      variant={caseItem.priority === 'High' ? 'default' : 'outline'}
                      className={
                        caseItem.priority === 'High'
                          ? 'bg-status-error-soft text-status-error border border-status-error-border'
                          : 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                      }
                    >
                      {caseItem.priority} Priority
                    </Badge>
                    <span className="text-sm text-text-body">{caseItem.id}</span>
                  </div>
                  <span className="text-sm text-text-body">
                    {caseItem.date} • {caseItem.time}
                  </span>
                </div>

                <h3 className="font-semibold text-text-heading mb-1">
                  {caseItem.student} • Grade {caseItem.grade}
                </h3>

                <p className="text-sm text-text-label mb-2">
                  Escalated by: {caseItem.teacher}
                </p>

                <p className="text-sm text-text-label mb-3">
                  <strong>Trigger:</strong> {caseItem.trigger}
                </p>

                <p className="text-sm text-text-body mb-3 line-clamp-2">
                  <strong>Note:</strong> {caseItem.note}
                </p>

                <Button
                  className="w-full bg-brand hover:bg-brand-dark text-white shadow-sm rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/expert/cases/${caseItem.id}`);
                  }}
                >
                  Review Case
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </ExpertLayout>
  );
}