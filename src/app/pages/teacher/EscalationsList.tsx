import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, STAFF } from '@/data/constants';

export default function EscalationsList() {
  const [statusFilter, setStatusFilter] = useState('all');

  const escalations = [
    {
      id: 'ESC-2026-0045',
      student: STUDENTS[0],
      submittedDate: '2026-01-12',
      expert: STAFF['BE-2024-0023'],
      status: 'Under Review',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0032',
      student: STUDENTS[4],
      submittedDate: '2026-01-10',
      expert: STAFF['BE-2024-0023'],
      status: 'Resolved',
      parentAcknowledged: false,
    },
    {
      id: 'ESC-2026-0021',
      student: STUDENTS[6],
      submittedDate: '2026-01-08',
      expert: STAFF['BE-2024-0023'],
      status: 'Resolved',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0015',
      student: STUDENTS[0],
      submittedDate: '2026-01-05',
      expert: STAFF['BE-2024-0023'],
      status: 'Resolved',
      parentAcknowledged: true,
    },
  ];

  const filteredEscalations = escalations.filter(esc => 
    statusFilter === 'all' || esc.status.toLowerCase().replace(' ', '-') === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'bg-status-warning-soft text-status-warning border border-status-warning-border';
      case 'Under Review': return 'bg-status-warning-soft text-status-warning border border-status-warning-border';
      case 'Resolved': return 'bg-status-success-soft text-status-success border border-status-success-border';
      default: return 'bg-status-info-soft text-status-info border border-status-info-border';
    }
  };

  return (
    <TeacherLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">Escalation Status</h1>
          <p className="text-text-label">Track your escalations to behavioral experts</p>
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
                <SelectItem value="resolved">Resolved</SelectItem>
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
                <span className="text-text-label">Resolved</span>
              </div>
            </div>
          </Card>
        </div>

        {filteredEscalations.length === 0 ? (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <p className="text-text-body mb-4">No escalations found with the selected filter</p>
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
          <div className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-table-header-bg">
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Submitted Date</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Expert</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Parent Ack.</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEscalations.map((escalation, index) => (
                  <tr
                    key={escalation.id}
                    className={`border-b border-border-light hover:bg-table-row-hover ${
                      index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                    }`}
                  >
                    <td className="p-4 text-text-heading font-medium">{escalation.id}</td>
                    <td className="p-4">
                      <div className="text-text-heading">{escalation.student.name}</div>
                      <div className="text-sm text-text-body">Grade {escalation.student.grade}</div>
                    </td>
                    <td className="p-4 text-text-label">
                      {new Date(escalation.submittedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="text-text-heading">{escalation.expert.name}</div>
                      <div className="text-sm text-text-body">{escalation.expert.role}</div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(escalation.status)}>
                        {escalation.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {escalation.parentAcknowledged ? (
                        <Badge className="bg-status-success-soft text-status-success border border-status-success-border">
                          Acknowledged
                        </Badge>
                      ) : (
                        <Badge className="bg-status-warning-soft text-status-warning border border-status-warning-border">
                          Not yet acknowledged
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <Link to={`/teacher/escalations/${escalation.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
                        >
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}