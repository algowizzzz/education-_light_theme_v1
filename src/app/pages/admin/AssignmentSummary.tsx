import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { AlertTriangle, Users, UserCheck, Link2, ChevronRight } from 'lucide-react';

// Mock data for demonstration
const ASSIGNMENT_DATA = {
  unassignedToTeacher: [
    { id: 'STU-007', name: 'New Student A', grade: 3 },
    { id: 'STU-008', name: 'New Student B', grade: 4 },
  ],
  unassignedToExpert: [
    { id: 'STU-001', name: 'Marcus Thompson', grade: 4, teacher: 'Mrs. Maria Johnson' },
    { id: 'STU-003', name: 'Emily Chen', grade: 3, teacher: 'Mr. Michael Brown' },
    { id: 'STU-005', name: 'Sofia Garcia', grade: 5, teacher: 'Mrs. Sarah Wilson' },
  ],
  noParentLinked: [
    { id: 'STU-002', name: 'David Rodriguez', grade: 4, teacher: 'Mrs. Maria Johnson' },
    { id: 'STU-006', name: 'Alex Martinez', grade: 2, teacher: 'Mr. James Taylor' },
  ],
  orphanParents: [
    { id: 'P-001', name: 'John Smith', email: 'jsmith@email.com', status: 'Active' },
    { id: 'P-002', name: 'Jane Doe', email: 'jdoe@email.com', status: 'Pending' },
  ],
};

type CategoryType = 'all' | 'unassignedTeacher' | 'unassignedExpert' | 'noParent' | 'orphanParent';

export default function AssignmentSummary() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('all');

  const totalIssues =
    ASSIGNMENT_DATA.unassignedToTeacher.length +
    ASSIGNMENT_DATA.unassignedToExpert.length +
    ASSIGNMENT_DATA.noParentLinked.length +
    ASSIGNMENT_DATA.orphanParents.length;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-2">Assignment Summary</h1>
          <p className="text-sm md:text-base text-text-body">
            Overview of students and parents requiring attention
          </p>
        </div>

        {/* Warning Banner */}
        {totalIssues > 0 && (
          <div className="mb-6 p-4 bg-status-warning-soft border border-status-warning-border rounded-lg flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-status-warning flex-shrink-0" />
            <p className="text-sm text-text-heading">
              <span className="font-semibold">{totalIssues} items</span> require your attention
            </p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card
            className={`bg-surface-card border cursor-pointer transition-all ${
              category === 'unassignedTeacher'
                ? 'ring-2 ring-brand border-brand'
                : 'border-surface-card-border hover:border-border-strong'
            }`}
            onClick={() => setCategory(category === 'unassignedTeacher' ? 'all' : 'unassignedTeacher')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-body">No Teacher Assigned</p>
                  <p className="text-2xl font-semibold text-text-heading">
                    {ASSIGNMENT_DATA.unassignedToTeacher.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-status-warning-soft flex items-center justify-center">
                  <Users className="w-6 h-6 text-status-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-surface-card border cursor-pointer transition-all ${
              category === 'unassignedExpert'
                ? 'ring-2 ring-brand border-brand'
                : 'border-surface-card-border hover:border-border-strong'
            }`}
            onClick={() => setCategory(category === 'unassignedExpert' ? 'all' : 'unassignedExpert')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-body">No Expert Assigned</p>
                  <p className="text-2xl font-semibold text-text-heading">
                    {ASSIGNMENT_DATA.unassignedToExpert.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-status-info-soft flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-status-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-surface-card border cursor-pointer transition-all ${
              category === 'noParent'
                ? 'ring-2 ring-brand border-brand'
                : 'border-surface-card-border hover:border-border-strong'
            }`}
            onClick={() => setCategory(category === 'noParent' ? 'all' : 'noParent')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-body">No Parent Linked</p>
                  <p className="text-2xl font-semibold text-text-heading">
                    {ASSIGNMENT_DATA.noParentLinked.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-status-error-soft flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-status-error" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-surface-card border cursor-pointer transition-all ${
              category === 'orphanParent'
                ? 'ring-2 ring-brand border-brand'
                : 'border-surface-card-border hover:border-border-strong'
            }`}
            onClick={() => setCategory(category === 'orphanParent' ? 'all' : 'orphanParent')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-body">Unlinked Parents</p>
                  <p className="text-2xl font-semibold text-text-heading">
                    {ASSIGNMENT_DATA.orphanParents.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-status-warning-soft flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-status-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-text-body">
            {category === 'all'
              ? `Showing all ${totalIssues} items requiring attention`
              : `Filtered view`}
          </p>
          {category !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCategory('all')}
              className="text-text-body"
            >
              Show All
            </Button>
          )}
        </div>

        {/* Students Without Teacher */}
        {(category === 'all' || category === 'unassignedTeacher') &&
          ASSIGNMENT_DATA.unassignedToTeacher.length > 0 && (
            <Card className="bg-surface-card border border-surface-card-border mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-status-warning" />
                    Students Without Teacher
                  </CardTitle>
                  <Badge variant="secondary" className="bg-status-warning-soft text-status-warning border border-status-warning-border">
                    {ASSIGNMENT_DATA.unassignedToTeacher.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.unassignedToTeacher.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-card border border-border-light rounded-lg hover:bg-table-row-hover"
                    >
                      <div>
                        <p className="font-medium text-text-heading">{student.name}</p>
                        <p className="text-sm text-text-body">
                          {student.id} - Grade {student.grade}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/students/${student.id}/assign-teacher`)}
                        className="border-border-default"
                      >
                        Assign Teacher
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Students Without Expert */}
        {(category === 'all' || category === 'unassignedExpert') &&
          ASSIGNMENT_DATA.unassignedToExpert.length > 0 && (
            <Card className="bg-surface-card border border-surface-card-border mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-status-info" />
                    Students Without Behavioral Expert
                  </CardTitle>
                  <Badge variant="secondary" className="bg-status-info-soft text-status-info border border-status-info-border">
                    {ASSIGNMENT_DATA.unassignedToExpert.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.unassignedToExpert.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-card border border-border-light rounded-lg hover:bg-table-row-hover"
                    >
                      <div>
                        <p className="font-medium text-text-heading">{student.name}</p>
                        <p className="text-sm text-text-body">
                          {student.id} - Grade {student.grade} - Teacher: {student.teacher}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/students/${student.id}/assign-expert`)}
                        className="border-border-default"
                      >
                        Assign Expert
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Students Without Parent */}
        {(category === 'all' || category === 'noParent') &&
          ASSIGNMENT_DATA.noParentLinked.length > 0 && (
            <Card className="bg-surface-card border border-surface-card-border mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-status-error" />
                    Students Without Parent Linked
                  </CardTitle>
                  <Badge variant="secondary" className="bg-status-error-soft text-status-error border border-status-error-border">
                    {ASSIGNMENT_DATA.noParentLinked.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.noParentLinked.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-card border border-border-light rounded-lg hover:bg-table-row-hover"
                    >
                      <div>
                        <p className="font-medium text-text-heading">{student.name}</p>
                        <p className="text-sm text-text-body">
                          {student.id} - Grade {student.grade} - Teacher: {student.teacher}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/students/${student.id}/assign-parent`)}
                        className="border-border-default"
                      >
                        Link Parent
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Orphan Parents */}
        {(category === 'all' || category === 'orphanParent') &&
          ASSIGNMENT_DATA.orphanParents.length > 0 && (
            <Card className="bg-surface-card border border-surface-card-border mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-status-warning" />
                    Parents Without Students Linked
                  </CardTitle>
                  <Badge variant="secondary" className="bg-status-warning-soft text-status-warning border border-status-warning-border">
                    {ASSIGNMENT_DATA.orphanParents.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.orphanParents.map((parent) => (
                    <div
                      key={parent.id}
                      className="flex items-center justify-between p-3 bg-card border border-border-light rounded-lg hover:bg-table-row-hover"
                    >
                      <div>
                        <p className="font-medium text-text-heading">{parent.name}</p>
                        <p className="text-sm text-text-body">
                          {parent.email}
                          <Badge
                            variant="secondary"
                            className={`ml-2 text-xs ${
                              parent.status === 'Active'
                                ? 'bg-status-success-soft text-status-success border border-status-success-border'
                                : 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                            }`}
                          >
                            {parent.status}
                          </Badge>
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/parents/${parent.id}/link`)}
                        className="border-border-default"
                      >
                        Link to Student
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Empty State */}
        {totalIssues === 0 && (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-status-success-soft flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-status-success" />
              </div>
              <h3 className="text-lg font-medium text-text-heading mb-2">All Assignments Complete</h3>
              <p className="text-text-body">
                All students have teachers, experts, and parents assigned.
              </p>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
