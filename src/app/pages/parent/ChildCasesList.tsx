import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ParentLayout } from '@/app/components/ParentLayout';
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

export default function ChildCasesList() {
  const { id } = useParams();
  const [statusFilter, setStatusFilter] = useState('all');

  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];

  const cases = [
    {
      id: 'ESC-2026-0045',
      submittedDate: '2026-01-12',
      trigger: 'Academic frustration',
      severity: 'High',
      status: 'Under Review',
      notePreview: 'Marcus has had 3 incidents this week, all related to academic frustration during math...',
      linkedIncident: 'ESC-2026-0198',
      parentAcknowledged: true,
      teacher: STAFF['T-2024-0847'],
      expert: STAFF['BE-2024-0023'],
    },
    {
      id: 'ESC-2026-0198',
      student: student,
      submittedDate: '2026-01-08',
      status: 'Closed',
      notePreview: 'Follow-up on testing accommodations...',
      linkedIncident: 'ESC-2026-0176',
    },
  ];

  const filteredCases = cases.filter(c => 
    statusFilter === 'all' || c.status.toLowerCase().replace(' ', '-') === statusFilter
  );

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

  const CaseCard = ({ case: caseItem }: { case: typeof cases[0] }) => (
    <Card className="border-border-default hover:bg-table-row-hover transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getSeverityBadge(caseItem.severity)}
              <Badge className={caseItem.status === 'Under Review' ? 'bg-status-warning-soft text-status-warning border border-status-warning-border' : 'bg-status-success-soft text-status-success border border-status-success-border'}>
                {caseItem.status}
              </Badge>
            </div>
            <h3 className="text-lg font-medium text-text-heading mb-1">
              Case for {student.firstName}
            </h3>
            <p className="text-sm text-text-body">
              Submitted on {new Date(caseItem.submittedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-text-body mb-1">Trigger</div>
          <div className="text-text-heading">{caseItem.trigger}</div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-text-body mb-1">Teacher's Note</div>
          <p className="text-text-label text-sm line-clamp-2">{caseItem.notePreview}</p>
        </div>

        <div className="mb-4">
          <div className="text-sm text-text-body mb-1">Linked Incident</div>
          <Link 
            to={`/parent/children/${id}/incidents/${caseItem.linkedIncident}`}
            className="text-text-heading hover:underline text-sm font-medium"
          >
            {caseItem.linkedIncident}
          </Link>
        </div>

        <div className="mb-4">
          <div className="text-sm text-text-body mb-1">Acknowledgment Status</div>
          {caseItem.parentAcknowledged ? (
            <Badge className="bg-status-success-soft text-status-success border border-status-success-border">
              Acknowledged
            </Badge>
          ) : (
            <Badge className="bg-status-warning-soft text-status-warning border border-status-warning-border">
              Not yet acknowledged
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-text-body">Case ID: {caseItem.id}</span>
          <Link to={`/parent/children/${id}/cases/${caseItem.id}`}>
            <Button className="bg-brand hover:bg-brand-dark text-white shadow-sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ParentLayout>
      <div className="p-4 md:p-8">
        <Link 
          to={`/parent/children/${id}`}
          className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {student.firstName}'s Profile
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">Cases for {student.firstName}</h1>
          <p className="text-text-label">Expert reviews and intervention plans</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-64">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-border-default text-text-heading">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="flex-1 border-border-default p-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-warning"></div>
                <span className="text-text-label">Under Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-success"></div>
                <span className="text-text-label">Closed</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-4">
          <p className="text-sm text-text-label">
            Showing {filteredCases.length} of {cases.length} cases
          </p>
        </div>

        {filteredCases.length === 0 ? (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <p className="text-text-body mb-4">No cases found with the selected filter</p>
              <Button
                onClick={() => setStatusFilter('all')}
                variant="outline"
                className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
              >
                Clear Filter
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} case={caseItem} />
            ))}
          </div>
        )}
      </div>
    </ParentLayout>
  );
}