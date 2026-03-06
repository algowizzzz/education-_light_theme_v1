import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, TrendingUp, TrendingDown, Lightbulb, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/app/components/ui/alert';

export default function AIAnalysis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const studentData = {
    id: 'STU-4298',
    name: 'Marcus Thompson',
    grade: '4th'
  };

  const triggerCorrelations = [
    {
      trigger: 'Academic Frustration',
      percentage: 45,
      incidents: 9,
      timePattern: 'Peaks between 10-11 AM (Math period)',
      trend: 'up'
    },
    {
      trigger: 'Peer Conflict',
      percentage: 30,
      incidents: 6,
      timePattern: 'Most common during group work',
      trend: 'stable'
    },
    {
      trigger: 'Loud Noises',
      percentage: 15,
      incidents: 3,
      timePattern: 'Assembly days and recess transitions',
      trend: 'down'
    },
    {
      trigger: 'Transitions',
      percentage: 10,
      incidents: 2,
      timePattern: 'Class changes, especially to/from specials',
      trend: 'down'
    }
  ];

  const strategyEffectiveness = [
    {
      strategy: 'Short Break (5 minutes)',
      successRate: 85,
      timesUsed: 13,
      avgDuration: '8 minutes',
      trend: 'up'
    },
    {
      strategy: 'Quiet Corner',
      successRate: 70,
      timesUsed: 10,
      avgDuration: '12 minutes',
      trend: 'stable'
    },
    {
      strategy: 'Verbal Redirection',
      successRate: 65,
      timesUsed: 15,
      avgDuration: '5 minutes',
      trend: 'stable'
    },
    {
      strategy: 'Buddy System',
      successRate: 40,
      timesUsed: 5,
      avgDuration: '15 minutes',
      trend: 'down'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Add "Academic Frustration - Math" as Primary Trigger',
      rationale: 'Analysis shows 45% of incidents occur during math activities. Adding this specific trigger will help teachers anticipate and prevent escalation.',
      priority: 'high',
      impact: 'High'
    },
    {
      id: 2,
      title: 'Prioritize "Short Break" as First-Line Strategy',
      rationale: 'With an 85% success rate and improving trend, short breaks are consistently most effective. Current placement as secondary strategy may delay intervention.',
      priority: 'high',
      impact: 'High'
    },
    {
      id: 3,
      title: 'Implement Pre-Math Brief Check-in',
      rationale: 'Incidents cluster at 10-11 AM during math. A brief 2-minute check-in before math class could significantly reduce incidents.',
      priority: 'medium',
      impact: 'Medium'
    },
    {
      id: 4,
      title: 'Remove "Buddy System" from Active Strategies',
      rationale: 'Low success rate (40%) and declining effectiveness suggest this strategy may not be suitable for Marcus at this time.',
      priority: 'low',
      impact: 'Low'
    }
  ];

  const handleApplyRecommendations = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
    }, 2000);
  };

  return (
    <ExpertLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/expert/students/${id}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Student Profile
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl mb-1">AI Pattern Analysis</h1>
              <p className="text-text-body">{studentData.name} - {studentData.grade} Grade</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page">
                <RefreshCw className="h-4 w-4 mr-2" />
                Request Deeper Analysis
              </Button>
              <Button variant="outline" className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {applied && (
          <Alert className="mb-6 bg-surface-page">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Recommendations have been applied to {studentData.name}'s profile. Teachers will be notified of the updates.
            </AlertDescription>
          </Alert>
        )}

        {/* Analysis Period */}
        <Card className="mb-6 border-border-default">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-body">
                Analysis Period: <span className="text-text-heading">Last 30 Days</span> | 
                Total Incidents: <span className="text-text-heading">20</span> | 
                Last Updated: <span className="text-text-heading">Today at 9:00 AM</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trigger Correlation Analysis */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-surface-page">
            <CardTitle>Trigger Correlation Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {triggerCorrelations.map((item, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm">{item.trigger}</p>
                        {item.trend === 'up' && (
                          <TrendingUp className="h-4 w-4 text-text-heading" />
                        )}
                        {item.trend === 'down' && (
                          <TrendingDown className="h-4 w-4 text-text-body" />
                        )}
                      </div>
                      <p className="text-xs text-text-body">{item.timePattern}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{item.percentage}%</p>
                      <p className="text-xs text-text-body">{item.incidents} incidents</p>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategy Effectiveness */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-surface-page">
            <CardTitle>Strategy Effectiveness</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {strategyEffectiveness.map((item, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm">{item.strategy}</p>
                        {item.trend === 'up' && (
                          <TrendingUp className="h-4 w-4 text-text-heading" />
                        )}
                        {item.trend === 'down' && (
                          <TrendingDown className="h-4 w-4 text-text-body" />
                        )}
                        {item.successRate >= 80 && (
                          <Badge variant="secondary" className="bg-status-success-soft text-status-success border border-status-success-border text-xs">
                            Highly Effective
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-text-body">
                        Used {item.timesUsed} times | Avg. Duration: {item.avgDuration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{item.successRate}%</p>
                      <p className="text-xs text-text-body">success rate</p>
                    </div>
                  </div>
                  <Progress value={item.successRate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-surface-page">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Generated Recommendations
              </CardTitle>
              <Button
                onClick={handleApplyRecommendations}
                disabled={isApplying || applied}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                {isApplying ? 'Applying...' : applied ? 'Applied' : 'Apply Recommendations to Profile'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 border border-border-default rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm">{rec.title}</h4>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          rec.priority === 'high'
                            ? 'bg-status-error-soft text-status-error border border-status-error-border'
                            : rec.priority === 'medium'
                            ? 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                            : 'bg-status-info-soft text-status-info border border-status-info-border'
                        }`}
                      >
                        {rec.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Impact: {rec.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-text-label leading-relaxed">
                    {rec.rationale}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Insights */}
        <Card className="border-border-default bg-surface-page">
          <CardContent className="py-4">
            <p className="text-sm text-text-label">
              <strong>About This Analysis:</strong> AI recommendations are generated using pattern
              recognition across incident data, strategy outcomes, and temporal correlations. Always
              use professional judgment when implementing suggested changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </ExpertLayout>
  );
}
