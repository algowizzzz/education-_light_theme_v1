import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  ArrowLeft,
  Calendar,
  TrendingDown,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface Incident {
  id: string;
  date: string;
  time: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
  trigger: string;
  teacherNote: string;
  status: 'acknowledged' | 'new';
  hasExpertNotes: boolean;
}

export default function IncidentHistory() {
  const { id } = useParams();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const childName = 'Marcus Williams';

  const incidents: Incident[] = [
    {
      id: 'ESC-2026-042',
      date: 'Jan 14, 2026',
      time: '10:15 AM',
      type: 'Classroom Disruption',
      severity: 'Medium',
      location: 'Room 204',
      trigger: 'Peer conflict',
      teacherNote: 'Marcus had disagreement with peer during group work',
      status: 'acknowledged',
      hasExpertNotes: false,
    },
    {
      id: 'ESC-2026-038',
      date: 'Jan 12, 2026',
      time: '2:30 PM',
      type: 'Academic Avoidance',
      severity: 'Medium',
      location: 'Math Class',
      trigger: 'Frustration with assignment',
      teacherNote: 'Frustrated during math quiz, became disruptive',
      status: 'acknowledged',
      hasExpertNotes: true,
    },
    {
      id: 'ESC-2026-034',
      date: 'Jan 10, 2026',
      time: '11:00 AM',
      type: 'Verbal Outburst',
      severity: 'High',
      location: 'Classroom',
      trigger: 'Test anxiety',
      teacherNote: 'Raised voice during test, refused to continue',
      status: 'new',
      hasExpertNotes: true,
    },
    {
      id: 'ESC-2026-029',
      date: 'Jan 8, 2026',
      time: '9:45 AM',
      type: 'Physical Aggression',
      severity: 'High',
      location: 'Hallway',
      trigger: 'Peer interaction',
      teacherNote: 'Pushed another student during transition',
      status: 'new',
      hasExpertNotes: false,
    },
    {
      id: 'ESC-2026-021',
      date: 'Jan 5, 2026',
      time: '1:15 PM',
      type: 'Classroom Disruption',
      severity: 'Medium',
      location: 'Science Lab',
      trigger: 'Curiosity',
      teacherNote: 'Talking out of turn and distracting peers during science experiment',
      status: 'acknowledged',
      hasExpertNotes: false
    }
  ];

  const stats = {
    total: incidents.length,
    thisMonth: 5,
    escalated: incidents.filter(i => i.status === 'new').length,
    trend: -40
  };

  const getSeverityBadge = (severity: Incident['severity']) => {
    const styles = {
      low: 'bg-status-info-soft text-status-info border border-status-info-border',
      medium: 'bg-status-warning-soft text-status-warning border border-status-warning-border',
      high: 'bg-status-error-soft text-status-error border border-status-error-border'
    };
    return (
      <Badge className={styles[severity]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: Incident['status']) => {
    const labels = {
      acknowledged: 'Acknowledged',
      new: 'Expert Support'
    };
    const styles = {
      acknowledged: 'bg-status-success-soft text-status-success border border-status-success-border',
      new: 'bg-status-warning-soft text-status-warning border border-status-warning-border'
    };
    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <ParentLayout>
      <div className="max-w-4xl">
        <Link to={`/parent/children/${id}`} className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to {childName}'s Profile
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">Incident History</h1>
          <p className="text-text-body">{childName}</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          <Button
            onClick={() => setTimeRange('week')}
            variant={timeRange === 'week' ? 'default' : 'outline'}
            className={
              timeRange === 'week'
                ? 'bg-brand hover:bg-brand-dark text-white shadow-sm'
                : 'border-border-strong text-text-heading bg-surface-card hover:bg-surface-page'
            }
          >
            This Week
          </Button>
          <Button
            onClick={() => setTimeRange('month')}
            variant={timeRange === 'month' ? 'default' : 'outline'}
            className={
              timeRange === 'month'
                ? 'bg-brand hover:bg-brand-dark text-white shadow-sm'
                : 'border-border-strong text-text-heading bg-surface-card hover:bg-surface-page'
            }
          >
            This Month
          </Button>
          <Button
            onClick={() => setTimeRange('quarter')}
            variant={timeRange === 'quarter' ? 'default' : 'outline'}
            className={
              timeRange === 'quarter'
                ? 'bg-brand hover:bg-brand-dark text-white shadow-sm'
                : 'border-border-strong text-text-heading bg-surface-card hover:bg-surface-page'
            }
          >
            This Quarter
          </Button>
          <Button
            onClick={() => setTimeRange('year')}
            variant={timeRange === 'year' ? 'default' : 'outline'}
            className={
              timeRange === 'year'
                ? 'bg-brand hover:bg-brand-dark text-white shadow-sm'
                : 'border-border-strong text-text-heading bg-surface-card hover:bg-surface-page'
            }
          >
            This Year
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">Total Incidents</div>
              <div className="text-2xl font-semibold text-text-heading">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">This Month</div>
              <div className="text-2xl font-semibold text-text-heading">
                {stats.thisMonth}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">Expert Support</div>
              <div className="text-2xl font-semibold text-text-heading">
                {stats.escalated}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">Trend</div>
              <div className="flex items-center gap-1">
                <TrendingDown className="w-5 h-5 text-text-label" />
                <span className="text-2xl font-semibold text-text-heading">
                  {Math.abs(stats.trend)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="border-border-default">
          <CardHeader>
            <CardTitle className="text-lg text-text-heading flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Incident Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div key={incident.id} className="relative">
                  {/* Timeline Line */}
                  {index < incidents.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-px bg-border-default" />
                  )}

                  <div className="flex gap-4">
                    {/* Timeline Dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        incident.status === 'new'
                          ? 'bg-status-warning-soft'
                          : 'bg-icon-general-soft'
                      }`}>
                        <AlertCircle className={`w-6 h-6 ${
                          incident.status === 'new' ? 'text-status-warning' : 'text-icon-general'
                        }`} />
                      </div>
                    </div>

                    {/* Incident Content */}
                    <div className="flex-1 pb-8">
                      <div className="p-4 bg-surface-page rounded-lg border border-border-light">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-text-heading mb-1">
                              {incident.type}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-text-body mb-2">
                              <Clock className="w-4 h-4" />
                              <span>{incident.date} at {incident.time}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            {getSeverityBadge(incident.severity)}
                            {getStatusBadge(incident.status)}
                          </div>
                        </div>

                        <p className="text-sm text-text-label mb-3">
                          {incident.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-border-default">
                          <div className="text-sm text-text-body">
                            <span className="font-medium text-text-heading">{incident.teacher}</span>
                            <span className="mx-2">•</span>
                            <span>{incident.location}</span>
                          </div>
                          <Link
                            to={`/parent/children/${id}/incidents/${incident.id}`}
                            className="inline-flex items-center gap-1 text-sm text-brand-dark hover:text-brand-dark underline"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}