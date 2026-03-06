import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Search, Plus, MoreVertical, UserCheck, UserX, Upload, Eye, EyeOff, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';

interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  grades: string;
}

export default function TeacherManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Reset Password Modal State
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Deactivate Modal State
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [teacherToDeactivate, setTeacherToDeactivate] = useState<Teacher | null>(null);

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Maria Johnson',
      email: 'maria.johnson@lincolnelementary.edu',
      role: '4th Grade Lead Teacher',
      status: 'Active',
      grades: '4th'
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael.brown@lincolnelementary.edu',
      role: '3rd Grade Teacher',
      status: 'Active',
      grades: '3rd'
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@lincolnelementary.edu',
      role: '5th Grade Teacher',
      status: 'Active',
      grades: '5th'
    },
    {
      id: '4',
      name: 'James Taylor',
      email: 'james.taylor@lincolnelementary.edu',
      role: '2nd Grade Teacher',
      status: 'Active',
      grades: '2nd'
    },
    {
      id: '5',
      name: 'Patricia Lopez',
      email: 'patricia.lopez@lincolnelementary.edu',
      role: 'PE Teacher K-5',
      status: 'Active',
      grades: 'K-5'
    },
    {
      id: '6',
      name: 'David Peters',
      email: 'david.peters@lincolnelementary.edu',
      role: 'Substitute Teacher',
      status: 'Inactive',
      grades: 'N/A'
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResetPassword = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setNewPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setResetPasswordOpen(true);
  };

  const handleSubmitResetPassword = () => {
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success(`Password has been reset for ${selectedTeacher?.name}`);
    setResetPasswordOpen(false);
    setSelectedTeacher(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeactivate = (teacher: Teacher) => {
    setTeacherToDeactivate(teacher);
    setDeactivateOpen(true);
  };

  const handleConfirmDeactivate = () => {
    if (teacherToDeactivate) {
      toast.success(`Teacher ${teacherToDeactivate.status === 'Active' ? 'deactivated' : 'reactivated'} successfully`);
      setDeactivateOpen(false);
      setTeacherToDeactivate(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-2">Teacher Management</h1>
          <p className="text-sm md:text-base text-text-body">Manage teacher accounts, assignments, and access permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Total Teachers</p>
                <p className="text-2xl font-bold text-text-heading">{teachers.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-icon-person-soft flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-icon-person" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Active</p>
                <p className="text-2xl font-bold text-text-heading">{teachers.filter(t => t.status === 'Active').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-success-soft flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-status-success" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Inactive</p>
                <p className="text-2xl font-bold text-text-heading">{teachers.filter(t => t.status === 'Inactive').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-error-soft flex items-center justify-center">
                <UserX className="h-5 w-5 text-status-error" />
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="bg-surface-card border border-surface-card-border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-body" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/teachers/bulk-import')}
                className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
              >
                <Upload className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Bulk Import</span>
              </Button>
              <Button
                onClick={() => navigate('/admin/teachers/new')}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Add Teacher</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-surface-card border border-border-default rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-icon-person-soft flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-icon-person" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-heading">{teacher.name}</h3>
                    <p className="text-sm text-text-body">{teacher.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/view`)}>
                      View Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/students`)}>
                      Assign Students
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleResetPassword(teacher)}>
                      Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeactivate(teacher)}>
                      {teacher.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 pt-3 border-t border-border-light flex items-center justify-between text-sm">
                <span className="text-text-body truncate max-w-[200px]">{teacher.email}</span>
                <Badge className={teacher.status === 'Active'
                  ? 'bg-status-success-soft text-status-success border border-status-success-border'
                  : 'bg-status-error-soft text-status-error border border-status-error-border'
                }>
                  {teacher.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-surface-card border border-surface-card-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-table-header-bg">
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Email</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Role</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Grades</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <tr
                  key={teacher.id}
                  className={`border-b border-border-light hover:bg-table-row-hover ${
                    index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                  }`}
                >
                  <td className="p-4 text-text-heading font-medium">{teacher.name}</td>
                  <td className="p-4 text-text-label text-sm">{teacher.email}</td>
                  <td className="p-4 text-text-label text-sm">{teacher.role}</td>
                  <td className="p-4 text-text-label text-sm">{teacher.grades}</td>
                  <td className="p-4">
                    <Badge className={teacher.status === 'Active'
                      ? 'bg-status-success-soft text-status-success border border-status-success-border'
                      : 'bg-status-error-soft text-status-error border border-status-error-border'
                    }>
                      {teacher.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/view`)}>
                          View Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/students`)}>
                          Assign Students
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(teacher)}>
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeactivate(teacher)}>
                          {teacher.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTeachers.length === 0 && (
          <Card className="border-border-default mt-4 p-12">
            <div className="text-center">
              <p className="text-text-body">No teachers found matching your criteria</p>
            </div>
          </Card>
        )}
      </div>

      {/* Reset Password Modal */}
      <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-text-heading">Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-card p-3 rounded-lg">
              <p className="text-sm text-text-body">Account</p>
              <p className="text-text-heading font-medium">{selectedTeacher?.name}</p>
              <p className="text-sm text-text-body">{selectedTeacher?.email}</p>
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-text-label">New Password</Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-border-default pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-body hover:text-text-heading"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-text-body mt-1">Minimum 8 characters</p>
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-text-label">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-border-default pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-body hover:text-text-heading"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setResetPasswordOpen(false)}
              className="border-border-strong text-text-heading"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitResetPassword}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate/Reactivate Modal */}
      <Dialog open={deactivateOpen} onOpenChange={setDeactivateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-text-heading">
              {teacherToDeactivate?.status === 'Active' ? 'Deactivate' : 'Reactivate'} Account
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-text-label">
              {teacherToDeactivate?.status === 'Active'
                ? `Are you sure you want to deactivate ${teacherToDeactivate?.name}'s account? They will no longer be able to access the teacher portal.`
                : `Are you sure you want to reactivate ${teacherToDeactivate?.name}'s account? They will regain access to the teacher portal.`}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeactivateOpen(false)}
              className="border-border-strong text-text-heading"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDeactivate}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              {teacherToDeactivate?.status === 'Active' ? 'Deactivate' : 'Reactivate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
