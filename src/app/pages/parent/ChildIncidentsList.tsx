import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, MARCUS_PROFILE } from '@/data/constants';

export default function ChildIncidentsList() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];
  const profile = id === 'STU-4298' ? MARCUS_PROFILE : null;

  // Mock incident data
  const incidents = profile?.incidents || [
    {
      id: 'ESC-2026-0156',
      date: '2026-01-15',
      time: '09:45 AM',
      trigger: 'Peer conflict during group work',
      status: 'Resolved',
      severity: 'Medium',
      category: 'Social Interaction',
      parentAcknowledged: true,
    },
  ];

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      searchTerm === '' ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.trigger.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || 
      incident.status?.toLowerCase() === statusFilter ||
      (statusFilter === 'acknowledged' && incident.parentAcknowledged) ||
      (statusFilter === 'pending' && !incident.parentAcknowledged);

    const incidentDate = new Date(incident.date);
    const today = new Date('2026-01-20');
    const matchesDate =
      dateFilter === 'all' ||
      (dateFilter === 'week' &&
        incidentDate >= new Date('2026-01-14') &&
        incidentDate <= today) ||
      (dateFilter === 'month' &&
        incidentDate >= new Date('2026-01-01') &&
        incidentDate <= today);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-status-success-soft text-status-success border border-status-success-border';
      case 'Escalated':
        return 'bg-status-error-soft text-status-error border border-status-error-border';
      case 'Under Review':
        return 'bg-status-warning-soft text-status-warning border border-status-warning-border';
      default:
        return 'bg-status-warning-soft text-status-warning border border-status-warning-border';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-status-error-soft text-status-error border border-status-error-border';
      case 'Medium':
        return 'bg-status-warning-soft text-status-warning border border-status-warning-border';
      case 'Low':
        return 'bg-status-info-soft text-status-info border border-status-info-border';
      default:
        return 'bg-status-info-soft text-status-info border border-status-info-border';
    }
  };

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
          <h1 className="text-2xl text-text-heading mb-2">Incidents for {student.firstName}</h1>
          <p className="text-text-label">
            View all behavioral incidents for your child
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
            <Input
              placeholder="Search by incident ID or trigger..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border-default"
            />
          </div>

          <div className="w-full md:w-48">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="border-border-default text-text-heading">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-border-default text-text-heading">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="pending">Pending Acknowledgment</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Incident Count */}
        <div className="mb-4">
          <p className="text-sm text-text-label">
            Showing {filteredIncidents.length} of {incidents.length} incidents
          </p>
        </div>

        {/* Incidents Table */}
        {filteredIncidents.length === 0 ? (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <p className="text-text-body mb-4">
                No incidents found with the selected filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                variant="outline"
                className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <div className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-table-header-bg">
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                    Date/Time
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                    Trigger
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                    Severity
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                    Acknowledgment
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident, index) => (
                  <tr
                    key={incident.id}
                    className={`border-b border-border-light hover:bg-table-row-hover ${
                      index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                    }`}
                  >
                    <td className="p-4">
                      <div className="text-text-heading font-medium">
                        {new Date(incident.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-sm text-text-body">
                        {incident.time}
                      </div>
                    </td>
                    <td className="p-4 text-text-label">{incident.trigger}</td>
                    <td className="p-4">
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {incident.parentAcknowledged ? (
                        <Badge className="bg-status-success-soft text-status-success border border-status-success-border">
                          Acknowledged
                        </Badge>
                      ) : (
                        <Badge className="bg-status-warning-soft text-status-warning border border-status-warning-border">
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <Link to={`/parent/children/${id}/incidents/${incident.id}`}>
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
    </ParentLayout>
  );
}