import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, STAFF } from '@/data/constants';

export default function CasesList() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const cases = [
    {
      id: 'ESC-2026-0045',
      student: STUDENTS[0],
      teacher: STAFF['T-2024-0847'],
      submittedDate: '2026-01-12',
      trigger: 'Academic frustration',
      severity: 'High',
      status: 'Under Review',
      notePreview: 'Marcus has had 3 incidents this week, all related to academic frustration during math...',
      priority: 'high',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0042',
      student: STUDENTS[4],
      teacher: STAFF['T-2024-0847'],
      submittedDate: '2026-01-11',
      trigger: 'Peer conflict',
      severity: 'Medium',
      status: 'Under Review',
      notePreview: 'Recurring issues with specific peer during unstructured time...',
      priority: 'medium',
      parentAcknowledged: false,
    },
    {
      id: 'ESC-2026-0038',
      student: STUDENTS[6],
      teacher: STAFF['T-2024-0847'],
      submittedDate: '2026-01-10',
      trigger: 'Transition difficulties',
      severity: 'Low',
      status: 'Under Review',
      notePreview: 'Need guidance on transition strategies for Tyler...',
      priority: 'low',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0032',
      student: STUDENTS[4],
      teacher: STAFF['T-2024-0847'],
      submittedDate: '2026-01-08',
      trigger: 'Testing anxiety',
      severity: 'Medium',
      status: 'Closed',
      notePreview: 'Follow-up on testing accommodations...',
      priority: 'medium',
      parentAcknowledged: false,
    },
  ];

  const filteredCases = cases.filter(c => {
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesSeverity = severityFilter === 'all' || c.severity.toLowerCase() === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const underReviewCases = filteredCases.filter(c => c.status === 'Under Review');
  const closedCases = filteredCases.filter(c => c.status === 'Closed');

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-brand text-white">High</Badge>;
      case 'medium':
        return <Badge className="bg-badge-medium text-white">Medium</Badge>;
      case 'low':
        return <Badge className="bg-surface-elevated text-text-label">Low</Badge>;
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge className="bg-brand-dark text-white">{severity}</Badge>;
      case 'Medium':
        return <Badge className="bg-badge-medium text-white">{severity}</Badge>;
      case 'Low':
        return <Badge className="bg-surface-elevated text-text-label">{severity}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const CaseCard = ({ case: caseItem }: { case: typeof cases[0] }) => (
    <Card className="border-border-default hover:bg-table-row-hover transition-colors">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {getSeverityBadge(caseItem.severity)}
              <Badge className={caseItem.status === 'Under Review' ? 'bg-badge-medium text-white' : 'bg-badge-medium text-white'}>
                {caseItem.status}
              </Badge>
            </div>
            <h3 className="text-base md:text-lg font-medium text-text-heading mb-1">
              {caseItem.student.name} <span className="text-text-body text-sm">• Grade {caseItem.student.grade}</span>
            </h3>
            <p className="text-xs md:text-sm text-text-body">
              Submitted by {caseItem.teacher.name} on {new Date(caseItem.submittedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="mb-3 md:mb-4">
          <div className="text-xs md:text-sm text-text-body mb-1">Trigger</div>
          <div className="text-sm md:text-base text-text-heading">{caseItem.trigger}</div>
        </div>

        <div className="mb-3 md:mb-4">
          <div className="text-xs md:text-sm text-text-body mb-1">Teacher's Note</div>
          <p className="text-text-label text-xs md:text-sm line-clamp-2">{caseItem.notePreview}</p>
        </div>

        <div className="mb-3 md:mb-4">
          <div className="text-xs md:text-sm text-text-body mb-1">Parent Status</div>
          {caseItem.parentAcknowledged ? (
            <Badge className="bg-brand-dark text-white">
              Acknowledged
            </Badge>
          ) : (
            <Badge className="bg-surface-elevated text-text-label">
              Not acknowledged
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border-light">
          <span className="text-xs text-text-body">Case ID: {caseItem.id}</span>
          <Link to={`/expert/cases/${caseItem.id}`} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white shadow-sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ExpertLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-2">Escalated Cases</h1>
          <p className="text-sm md:text-base text-text-label">Review and manage escalated behavioral cases</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 border-border-default text-text-heading">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full sm:w-40 border-border-default text-text-heading">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {underReviewCases.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-text-heading mb-4 flex items-center gap-2">
              Under Review
              <Badge className="bg-badge-medium text-white">{underReviewCases.length}</Badge>
            </h2>
            <div className="space-y-4">
              {underReviewCases.map((caseItem) => (
                <CaseCard key={caseItem.id} case={caseItem} />
              ))}
            </div>
          </div>
        )}

        {closedCases.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-text-heading mb-4 flex items-center gap-2">
              Recently Closed
              <Badge className="bg-brand-dark text-white">{closedCases.length}</Badge>
            </h2>
            <div className="space-y-4">
              {closedCases.map((caseItem) => (
                <CaseCard key={caseItem.id} case={caseItem} />
              ))}
            </div>
          </div>
        )}

        {filteredCases.length === 0 && (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <p className="text-text-body mb-4">No cases found matching your criteria</p>
              <Button
                onClick={() => {
                  setStatusFilter('all');
                  setSeverityFilter('all');
                }}
                variant="outline"
                className="border-border-strong text-text-heading hover:bg-surface-page"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ExpertLayout>
  );
}