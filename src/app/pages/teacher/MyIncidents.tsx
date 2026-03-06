import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
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
import { STUDENTS } from '@/data/constants';

export default function MyIncidents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock incident data
  const incidents = [
    {
      id: 'ESC-2026-0156',
      date: '2026-01-15',
      time: '09:45 AM',
      student: 'Marcus Thompson',
      category: 'Disruptive Behavior',
      severity: 'Medium',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0155',
      date: '2026-01-14',
      time: '11:20 AM',
      student: 'Emily Chen',
      category: 'Academic Avoidance',
      severity: 'Low',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0154',
      date: '2026-01-14',
      time: '02:15 PM',
      student: 'Marcus Thompson',
      category: 'Peer Conflict',
      severity: 'Medium',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0153',
      date: '2026-01-13',
      time: '10:30 AM',
      student: 'David Rodriguez',
      category: 'Verbal Outburst',
      severity: 'High',
      outcome: 'Escalated',
    },
    {
      id: 'ESC-2026-0152',
      date: '2026-01-11',
      time: '01:45 PM',
      student: 'Sofia Garcia',
      category: 'Physical Aggression',
      severity: 'High',
      outcome: 'Escalated',
    },
    {
      id: 'ESC-2026-0151',
      date: '2026-01-12',
      time: '09:15 AM',
      student: 'Marcus Thompson',
      category: 'Disruptive Behavior',
      severity: 'High',
      outcome: 'Escalated',
    },
    {
      id: 'ESC-2026-0150',
      date: '2026-01-10',
      time: '11:00 AM',
      student: 'Emily Chen',
      category: 'Academic Avoidance',
      severity: 'Low',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0149',
      date: '2026-01-08',
      time: '02:30 PM',
      student: 'David Rodriguez',
      category: 'Academic Frustration',
      severity: 'Medium',
      outcome: 'Escalated',
    },
  ];

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      searchTerm === '' ||
      incident.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || incident.outcome.toLowerCase() === statusFilter;

    const incidentDate = new Date(incident.date);
    const today = new Date('2026-01-15');
    const matchesDate =
      dateFilter === 'all' ||
      (dateFilter === 'today' && incident.date === '2026-01-15') ||
      (dateFilter === 'week' &&
        incidentDate >= new Date('2026-01-09') &&
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
      case 'Partial':
        return 'bg-status-warning-soft text-status-warning border border-status-warning-border';
      case 'Escalated':
        return 'bg-status-warning-soft text-status-warning border border-status-warning-border';
      case 'Follow-up':
        return 'bg-status-info-soft text-status-info border border-status-info-border';
      default:
        return 'bg-status-info-soft text-status-info border border-status-info-border';
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-2">My Incidents</h1>
          <p className="text-sm md:text-base text-text-label">
            View and manage your incident reports
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
            <Input
              placeholder="Search by student name or incident ID..."
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
                <SelectItem value="today">Today</SelectItem>
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
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => navigate('/teacher/incidents/new')}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log New Incident
          </Button>
        </div>

        {/* Incident Count */}
        <div className="mb-4">
          <p className="text-sm text-text-label">
            Showing {filteredIncidents.length} of {incidents.length} incidents
          </p>
        </div>

        {/* Incidents List */}
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
                className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredIncidents.map((incident) => (
                <Link key={incident.id} to={`/teacher/incidents/${incident.id}`}>
                  <div className="bg-surface-card border border-border-default rounded-lg p-4 hover:bg-surface-page active:bg-status-info-soft transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-text-heading">{incident.student}</h3>
                        <p className="text-sm text-text-body">{incident.category}</p>
                      </div>
                      <Badge className={getStatusColor(incident.outcome)}>
                        {incident.outcome}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-text-body">
                        {new Date(incident.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })} • {incident.time}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-text-label">{incident.severity}</span>
                        <ChevronRight className="w-4 h-4 text-text-muted" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-surface-card border border-border-default rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-table-header-bg">
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                      Date/Time
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                      Student
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                      Category
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                      Severity
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">
                      Status
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
                      <td className="p-4">
                        <div className="text-text-heading">
                          {incident.student}
                        </div>
                      </td>
                      <td className="p-4 text-text-label">{incident.category}</td>
                      <td className="p-4 text-text-label">{incident.severity}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(incident.outcome)}>
                          {incident.outcome}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Link to={`/teacher/incidents/${incident.id}`}>
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
          </>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-text-label">
            Page 1 of 1
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}