import { useNavigate } from 'react-router-dom';
import { Plus, Users, GraduationCap, Brain, UserCircle, AlertTriangle, Clock, UserPlus, FileText, CheckCircle } from 'lucide-react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const statistics = {
    students: 247,
    teachers: 18,
    experts: 3,
    parents: 412,
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const recentActivity = [
    { icon: UserPlus, text: 'New student Marcus Thompson enrolled', time: '2 hours ago', color: 'text-status-success', bg: 'bg-status-success-soft' },
    { icon: FileText, text: 'Teacher Maria Johnson updated class roster', time: '4 hours ago', color: 'text-brand', bg: 'bg-status-info-soft' },
    { icon: CheckCircle, text: 'Parent account activated for Chen family', time: '5 hours ago', color: 'text-status-success', bg: 'bg-status-success-soft' },
    { icon: AlertTriangle, text: '3 students need behavioral expert assignment', time: 'Yesterday', color: 'text-status-warning', bg: 'bg-status-warning-soft' },
    { icon: Clock, text: 'System backup completed successfully', time: 'Yesterday', color: 'text-text-label', bg: 'bg-status-info-soft' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading">Welcome back, Admin</h1>
          <p className="text-sm md:text-base text-text-body">Lincoln Elementary School &middot; {today}</p>
        </div>

        {/* Stat Cards with colored left stripe */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="bg-surface-card border border-surface-card-border overflow-hidden">
            <div className="flex">
              <div className="w-1.5 bg-brand shrink-0" />
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-text-label">Students</p>
                  <div className="w-10 h-10 rounded-full bg-status-info-soft flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-text-heading">{statistics.students}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-surface-card border border-surface-card-border overflow-hidden">
            <div className="flex">
              <div className="w-1.5 bg-status-success shrink-0" />
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-text-label">Teachers</p>
                  <div className="w-10 h-10 rounded-full bg-status-success-soft flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-status-success" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-text-heading">{statistics.teachers}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-surface-card border border-surface-card-border overflow-hidden">
            <div className="flex">
              <div className="w-1.5 bg-status-warning shrink-0" />
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-text-label">Experts</p>
                  <div className="w-10 h-10 rounded-full bg-status-warning-soft flex items-center justify-center">
                    <Brain className="w-5 h-5 text-status-warning" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-text-heading">{statistics.experts}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-surface-card border border-surface-card-border overflow-hidden">
            <div className="flex">
              <div className="w-1.5 bg-brand-light shrink-0" />
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-text-label">Parents</p>
                  <div className="w-10 h-10 rounded-full bg-status-info-soft flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-brand" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-text-heading">{statistics.parents}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-surface-card border border-surface-card-border p-5">
          <h2 className="text-lg font-semibold text-text-heading mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={() => navigate('/admin/students/new')}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
            <Button
              onClick={() => navigate('/admin/teachers/new')}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
            <Button
              onClick={() => navigate('/admin/experts/new')}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expert
            </Button>
            <Button
              onClick={() => navigate('/admin/parents/new')}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Parent
            </Button>
          </div>
        </Card>

        {/* Bottom Grid: Assignment Gaps + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Assignment Gaps Summary */}
          <Card className="bg-surface-card border border-surface-card-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-heading">Assignment Gaps</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/assignments')}
                className="text-brand hover:text-brand-dark text-sm"
              >
                View All
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-status-warning-soft flex items-center justify-center">
                    <Users className="w-4 h-4 text-status-warning" />
                  </div>
                  <span className="text-sm text-text-heading">No Teacher Assigned</span>
                </div>
                <span className="text-lg font-bold text-status-warning">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-status-info-soft flex items-center justify-center">
                    <Brain className="w-4 h-4 text-status-info" />
                  </div>
                  <span className="text-sm text-text-heading">No Expert Assigned</span>
                </div>
                <span className="text-lg font-bold text-status-info">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-status-error-soft flex items-center justify-center">
                    <UserCircle className="w-4 h-4 text-status-error" />
                  </div>
                  <span className="text-sm text-text-heading">No Parent Linked</span>
                </div>
                <span className="text-lg font-bold text-status-error">2</span>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-surface-card border border-surface-card-border p-5">
            <h2 className="text-lg font-semibold text-text-heading mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border-light">
                    <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-heading">{item.text}</p>
                      <p className="text-xs text-text-muted mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
