import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, User } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { STUDENTS } from '@/data/constants';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const today = 'Thursday, January 15, 2026';

  const recentStudents = STUDENTS.slice(0, 3);

  const todaysIncidents = [
    {
      time: '9:45 AM',
      student: 'Marcus Thompson',
      trigger: 'Peer conflict',
      status: 'Resolved',
    },
    {
      time: '11:20 AM',
      student: 'Sofia Garcia',
      trigger: 'Task avoidance',
      status: 'Partial',
    },
  ];

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading">
            Good morning, Maria
          </h1>
          <p className="text-sm md:text-base text-text-body">{today}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/teacher/incidents/new')}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm h-12 rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" />Log New Incident
          </Button>
          <Button
            onClick={() => navigate('/teacher/students')}
            variant="outline"
            className="border-border-default text-text-heading hover:bg-surface-page h-12 rounded-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Find Student
          </Button>
          <Button
            onClick={() => navigate('/teacher/incidents')}
            variant="outline"
            className="border-border-default text-text-heading hover:bg-surface-page h-12 rounded-lg"
          >
            <FileText className="w-5 h-5 mr-2" />
            View My Incidents
          </Button>
        </div>

        {/* Recently Accessed Students */}
        <Card className="p-6 border border-border-default bg-surface-card">
          <h2 className="text-lg font-semibold text-text-heading mb-4">
            Recently Accessed Students
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentStudents.map((student) => (
              <Card
                key={student.id}
                className="p-4 border border-border-light hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/teacher/students/${student.id}`)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-status-info-soft flex items-center justify-center">
                    <User className="w-5 h-5 text-text-body" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-heading">
                      {student.name}
                    </h3>
                    <p className="text-sm text-text-body">Grade {student.grade}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-border-default text-text-heading hover:bg-surface-page rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/teacher/students/${student.id}`);
                  }}
                >
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* Today's Incident Shortcuts */}
        <Card className="p-6 border border-border-default bg-surface-card">
          <h2 className="text-lg font-semibold text-text-heading mb-4">
            Recent Incident
          </h2>
          <div className="space-y-3">
            {todaysIncidents.map((incident, index) => (
              <div
                key={index}
                className="p-4 border border-border-light rounded-lg hover:bg-surface-page cursor-pointer"
              >
                {/* Mobile: stacked layout */}
                <div className="flex flex-col space-y-2 md:hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-text-heading font-medium">
                      {incident.student}
                    </span>
                    <Badge
                      className={
                        incident.status === 'Resolved'
                          ? 'bg-status-success-soft text-status-success border border-status-success-border'
                          : 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-body">
                    <span>{incident.time}</span>
                    <span>•</span>
                    <span>{incident.trigger}</span>
                  </div>
                </div>
                {/* Desktop: horizontal layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-text-body">
                        {incident.time}
                      </span>
                      <span className="text-text-heading font-medium">
                        {incident.student}
                      </span>
                      <span className="text-text-label">{incident.trigger}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      incident.status === 'Resolved'
                        ? 'bg-status-success-soft text-status-success border border-status-success-border'
                        : 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                    }
                  >
                    {incident.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}