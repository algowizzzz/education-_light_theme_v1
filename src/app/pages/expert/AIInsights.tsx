import { useState } from 'react';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  Calendar,
  Target,
  ArrowRight
} from 'lucide-react';

export default function AIInsights() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  const patterns = [
    {
      id: '1',
      type: 'High Priority',
      title: 'Increasing Math-Related Incidents',
      description: 'Three students showing escalating frustration during timed assessments',
      students: ['Marcus Williams', 'Emma Rodriguez', 'Jayden Smith'],
      confidence: 92,
      recommendation: 'Consider implementing extended time accommodations and breaking assessments into smaller chunks',
      link: '/expert/students'
    },
    {
      id: '2',
      type: 'Emerging Pattern',
      title: 'Morning Transition Challenges',
      description: '5 incidents occurring between 8:30-9:00 AM across multiple classrooms',
      students: ['Various students'],
      confidence: 85,
      recommendation: 'Recommend school-wide morning arrival protocol review',
      link: '/expert/cases'
    },
    {
      id: '3',
      type: 'Positive Trend',
      title: 'Improved Response to Visual Schedules',
      description: '40% reduction in incidents for students using visual supports',
      students: ['Emma Rodriguez', '3 others'],
      confidence: 88,
      recommendation: 'Expand visual schedule implementation to additional students',
      link: '/expert/students'
    }
  ];

  const predictiveAlerts = [
    {
      id: '1',
      student: 'Marcus Williams',
      risk: 'High',
      prediction: 'Likely to experience behavioral incident in next 48 hours',
      factors: [
        'Recent pattern of 3 incidents in 5 days',
        'Upcoming standardized testing week',
        'Historical correlation with timed assessments'
      ],
      suggestedActions: [
        'Proactive check-in with teacher',
        'Implement pre-arranged break options',
        'Consider alternative testing format'
      ]
    },
    {
      id: '2',
      student: 'Emma Rodriguez',
      risk: 'Moderate',
      prediction: 'May require additional support during group activities',
      factors: [
        'Difficulty with peer interactions noted',
        'Upcoming collaborative project week',
        'Previous incidents during group work'
      ],
      suggestedActions: [
        'Provide structured role assignment',
        'Monitor initial group formation',
        'Offer quiet workspace option'
      ]
    }
  ];

  const schoolwideMetrics = {
    totalIncidents: 47,
    change: -12,
    avgResponseTime: '18 min',
    responseChange: -3,
    interventionSuccess: 78,
    successChange: 5,
    expertCases: 12,
    casesChange: 2
  };

  return (
    <ExpertLayout>
      <div className="max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            AI-Powered Insights
          </h1>
          <p className="text-text-body">
            Pattern detection, predictive analytics, and data-driven recommendations
          </p>
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
        </div>

        {/* School-wide Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">Total Incidents</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold text-text-heading">
                  {schoolwideMetrics.totalIncidents}
                </div>
                <div className={`text-sm ${schoolwideMetrics.change < 0 ? 'text-text-label' : 'text-text-body'}`}>
                  {schoolwideMetrics.change > 0 ? '+' : ''}{schoolwideMetrics.change}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">Avg Response Time</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold text-text-heading">
                  {schoolwideMetrics.avgResponseTime}
                </div>
                <div className={`text-sm ${schoolwideMetrics.responseChange < 0 ? 'text-text-label' : 'text-text-body'}`}>
                  {schoolwideMetrics.responseChange > 0 ? '+' : ''}{schoolwideMetrics.responseChange} min
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">Success Rate</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold text-text-heading">
                  {schoolwideMetrics.interventionSuccess}%
                </div>
                <div className={`text-sm ${schoolwideMetrics.successChange > 0 ? 'text-text-label' : 'text-text-body'}`}>
                  {schoolwideMetrics.successChange > 0 ? '+' : ''}{schoolwideMetrics.successChange}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="p-4">
              <div className="text-sm text-text-body mb-1">Active Cases</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold text-text-heading">
                  {schoolwideMetrics.expertCases}
                </div>
                <div className={`text-sm ${schoolwideMetrics.casesChange > 0 ? 'text-text-body' : 'text-text-label'}`}>
                  {schoolwideMetrics.casesChange > 0 ? '+' : ''}{schoolwideMetrics.casesChange}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictive Alerts */}
        <Card className="mb-6 border-brand bg-surface-hover">
          <CardHeader>
            <CardTitle className="text-lg text-text-heading flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Predictive Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictiveAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-surface-card rounded-lg border border-border-default">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-text-heading mb-1">{alert.student}</h3>
                    <p className="text-sm text-text-label">{alert.prediction}</p>
                  </div>
                  <Badge
                    className={
                      alert.risk === 'High'
                        ? 'bg-status-error-soft text-status-error border border-status-error-border'
                        : 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                    }
                  >
                    {alert.risk} Risk
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium text-text-label mb-2">Contributing Factors:</div>
                  <ul className="space-y-1">
                    {alert.factors.map((factor, idx) => (
                      <li key={idx} className="text-sm text-text-body flex items-start gap-2">
                        <span className="text-text-muted mt-1">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-medium text-text-label mb-2">Suggested Actions:</div>
                  <ul className="space-y-1">
                    {alert.suggestedActions.map((action, idx) => (
                      <li key={idx} className="text-sm text-text-body flex items-start gap-2">
                        <Target className="w-4 h-4 text-text-label mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pattern Detection */}
        <Card className="border-border-default">
          <CardHeader>
            <CardTitle className="text-lg text-text-heading flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Detected Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patterns.map((pattern) => (
              <div key={pattern.id} className="p-4 bg-surface-page rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge
                      className={
                        pattern.type === 'High Priority'
                          ? 'bg-status-error-soft text-status-error border border-status-error-border mb-2'
                          : pattern.type === 'Positive Trend'
                          ? 'bg-status-success-soft text-status-success border border-status-success-border mb-2'
                          : 'bg-status-warning-soft text-status-warning border border-status-warning-border mb-2'
                      }
                    >
                      {pattern.type}
                    </Badge>
                    <h3 className="font-medium text-text-heading mb-1">{pattern.title}</h3>
                    <p className="text-sm text-text-label">{pattern.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-text-body">Confidence</div>
                    <div className="text-lg font-semibold text-text-heading">{pattern.confidence}%</div>
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-text-body" />
                  <span className="text-text-body">
                    Affects: {pattern.students.join(', ')}
                  </span>
                </div>

                <div className="p-3 bg-surface-card rounded border border-border-default mb-3">
                  <div className="text-sm font-medium text-text-label mb-1">AI Recommendation:</div>
                  <p className="text-sm text-text-heading">{pattern.recommendation}</p>
                </div>

                <Link 
                  to={pattern.link}
                  className="inline-flex items-center gap-1 text-sm text-text-heading hover:text-text-heading underline"
                >
                  View Related Data
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ExpertLayout>
  );
}
