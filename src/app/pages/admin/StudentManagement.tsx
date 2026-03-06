import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { ConfirmationModal } from '@/app/components/ConfirmationModal';
import { Search, Plus, MoreVertical, CheckSquare, Upload, Users, Brain, User, UserX } from 'lucide-react';
import { Checkbox } from '@/app/components/ui/checkbox';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function StudentManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showBulkSuspendModal, setShowBulkSuspendModal] = useState(false);

  const studentsWithStatus = STUDENTS.map(student => ({
    ...student,
    status: 'Active' as const,
  }));

  const filteredStudents = studentsWithStatus.filter((student) => {
    const matchesSearch =
      searchTerm === '' ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = gradeFilter === 'all' || student.grade.toString() === gradeFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleSuspend = () => {
    if (selectedStudent) {
      const studentIndex = studentsWithStatus.findIndex(student => student.id === selectedStudent);
      if (studentIndex !== -1) {
        studentsWithStatus[studentIndex].status = 'Suspended';
        toast.success('Student suspended successfully');
      }
    }
    setShowSuspendModal(false);
  };

  const handleActivate = () => {
    if (selectedStudent) {
      const studentIndex = studentsWithStatus.findIndex(student => student.id === selectedStudent);
      if (studentIndex !== -1) {
        studentsWithStatus[studentIndex].status = 'Active';
        toast.success('Student activated successfully');
      }
    }
    setShowActivateModal(false);
  };

  // Bulk selection handlers
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleBulkSuspend = () => {
    toast.success(`${selectedStudents.length} students suspended successfully`);
    setSelectedStudents([]);
    setShowBulkSuspendModal(false);
  };

  const clearSelection = () => {
    setSelectedStudents([]);
  };

  const totalStudents = studentsWithStatus.length;
  const activeStudents = studentsWithStatus.filter(s => s.status === 'Active').length;
  const suspendedStudents = studentsWithStatus.filter(s => s.status === 'Suspended').length;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-2">Student Management</h1>
              <p className="text-sm md:text-base text-text-body">Manage student accounts, assignments, and status</p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page">
                    <Upload className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Bulk Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/admin/students/bulk-import')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Bulk Import Students
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin/students/bulk-assign-teacher')}>
                    <Users className="w-4 h-4 mr-2" />
                    Bulk Assign to Teacher
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin/students/bulk-assign-expert')}>
                    <Brain className="w-4 h-4 mr-2" />
                    Bulk Assign to Expert
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() => navigate('/admin/students/new')}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Add Student</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Total</p>
                <p className="text-2xl font-bold text-text-heading">{totalStudents}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-icon-person-soft flex items-center justify-center">
                <Users className="w-5 h-5 text-icon-person" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Active</p>
                <p className="text-2xl font-bold text-text-heading">{activeStudents}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-success-soft flex items-center justify-center">
                <User className="w-5 h-5 text-status-success" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Suspended</p>
                <p className="text-2xl font-bold text-text-heading">{suspendedStudents}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-error-soft flex items-center justify-center">
                <UserX className="w-5 h-5 text-status-error" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="bg-surface-card border border-surface-card-border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border-default text-text-heading"
              />
            </div>
            <div className="flex gap-2">
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-full md:w-36 border-border-default text-text-heading">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-36 border-border-default text-text-heading">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedStudents.length > 0 && (
          <div className="mb-4 p-3 bg-surface-card border border-border-default rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-text-heading" />
              <span className="text-sm font-medium text-text-heading">
                {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="text-text-body hover:text-text-heading text-xs"
              >
                Clear selection
              </Button>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page">
                    Bulk Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setShowBulkSuspendModal(true)}
                    className="text-text-body"
                  >
                    Suspend Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        <div className="mb-4 text-sm text-text-body">
          Showing {filteredStudents.length} of {studentsWithStatus.length} students
        </div>

        {filteredStudents.length === 0 ? (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <p className="text-text-body mb-4">No students found matching your criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setGradeFilter('all');
                  setStatusFilter('all');
                }}
                variant="outline"
                className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-surface-card border border-border-default rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => toggleStudentSelection(student.id)}
                      />
                      <div className="w-10 h-10 rounded-full bg-icon-person-soft flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-icon-person" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-heading">{student.name}</h3>
                        <p className="text-sm text-text-body">Grade {student.grade}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/admin/view-student/${student.id}`)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/students/edit/${student.id}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/students/${student.id}/assign-teacher`)}>
                          Assign to Teacher
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/students/${student.id}/assign-expert`)}>
                          Assign to Expert
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/students/${student.id}/assign-parent`)}>
                          Assign Parent
                        </DropdownMenuItem>
                        {student.status === 'Active' ? (
                          <DropdownMenuItem
                            className="text-text-body"
                            onClick={() => {
                              setSelectedStudent(student.id);
                              setShowSuspendModal(true);
                            }}
                          >
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-status-success"
                            onClick={() => {
                              setSelectedStudent(student.id);
                              setShowActivateModal(true);
                            }}
                          >
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between text-sm border-t border-border-light pt-3">
                    <div className="text-text-body">
                      <span>{student.id}</span>
                      <span className="mx-2">&middot;</span>
                      <span>{student.primaryTeacher}</span>
                    </div>
                    <Badge className="bg-status-success-soft text-status-success border border-status-success-border">{student.status}</Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-surface-card border border-surface-card-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-table-header-bg">
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text w-12">
                      <Checkbox
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onCheckedChange={toggleAllStudents}
                      />
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Name</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Grade</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Primary Teacher</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b border-border-light hover:bg-table-row-hover ${
                        index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                      }`}
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => toggleStudentSelection(student.id)}
                        />
                      </td>
                      <td className="p-4 text-text-heading font-medium">{student.name}</td>
                      <td className="p-4 text-text-label">{student.id}</td>
                      <td className="p-4 text-text-label">Grade {student.grade}</td>
                      <td className="p-4 text-text-label">{student.primaryTeacher}</td>
                      <td className="p-4">
                        <Badge className="bg-status-success-soft text-status-success border border-status-success-border">{student.status}</Badge>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/admin/view-student/${student.id}`)}>
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/admin/students/edit/${student.id}`)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/admin/students/${student.id}/assign-teacher`)}>
                              Assign to Teacher
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/admin/students/${student.id}/assign-expert`)}>
                              Assign to Expert
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/admin/students/${student.id}/assign-parent`)}>
                              Assign Parent
                            </DropdownMenuItem>
                            {student.status === 'Active' ? (
                              <DropdownMenuItem
                                className="text-text-body"
                                onClick={() => {
                                  setSelectedStudent(student.id);
                                  setShowSuspendModal(true);
                                }}
                              >
                                Suspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                className="text-status-success"
                                onClick={() => {
                                  setSelectedStudent(student.id);
                                  setShowActivateModal(true);
                                }}
                              >
                                Activate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <ConfirmationModal
        open={showSuspendModal}
        onOpenChange={setShowSuspendModal}
        onConfirm={handleSuspend}
        title="Suspend Student"
        description="Are you sure you want to suspend this student? They will no longer appear in active student lists."
        confirmText="Suspend"
        variant="destructive"
      />

      <ConfirmationModal
        open={showActivateModal}
        onOpenChange={setShowActivateModal}
        onConfirm={handleActivate}
        title="Activate Student"
        description="Are you sure you want to activate this student? They will be restored to active status."
        confirmText="Activate"
        variant="default"
      />

      <ConfirmationModal
        open={showBulkSuspendModal}
        onOpenChange={setShowBulkSuspendModal}
        onConfirm={handleBulkSuspend}
        title="Bulk Suspend Students"
        description={`Are you sure you want to suspend ${selectedStudents.length} selected student${selectedStudents.length > 1 ? 's' : ''}? They will no longer appear in active student lists.`}
        confirmText="Suspend All"
        variant="destructive"
      />
    </AdminLayout>
  );
}
