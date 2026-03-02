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
import { Search, Plus, MoreVertical, UserCheck, Users, Eye, EyeOff, User, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';

interface Expert {
  id: string;
  name: string;
  expertId: string;
  email: string;
  role: string;
  assignedStudents: number;
  activeCases: number;
  status: 'Active' | 'Inactive';
}

export default function ExpertManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Reset Password Modal State
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Deactivate Modal State
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [expertToDeactivate, setExpertToDeactivate] = useState<Expert | null>(null);

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Williams',
      expertId: 'BE-2024-0023',
      email: 'sarah.williams@lincolnelementary.edu',
      role: 'Lead Behavioral Specialist',
      assignedStudents: 45,
      activeCases: 3,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Robert Chen',
      expertId: 'BE-2024-0024',
      email: 'robert.chen@lincolnelementary.edu',
      role: 'Behavioral Specialist - SpEd',
      assignedStudents: 28,
      activeCases: 2,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Jennifer Adams',
      expertId: 'BE-2024-0025',
      email: 'jennifer.adams@lincolnelementary.edu',
      role: 'Behavioral Specialist',
      assignedStudents: 32,
      activeCases: 4,
      status: 'Active'
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.expertId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expert.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStudents = experts.reduce((sum, e) => sum + e.assignedStudents, 0);
  const totalActiveCases = experts.reduce((sum, e) => sum + e.activeCases, 0);

  const handleResetPassword = (expert: Expert) => {
    setSelectedExpert(expert);
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
    toast.success(`Password has been reset for ${selectedExpert?.name}`);
    setResetPasswordOpen(false);
    setSelectedExpert(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeactivate = (expert: Expert) => {
    setExpertToDeactivate(expert);
    setDeactivateOpen(true);
  };

  const handleConfirmDeactivate = () => {
    if (expertToDeactivate) {
      toast.success(`Expert ${expertToDeactivate.status === 'Active' ? 'deactivated' : 'reactivated'} successfully`);
      setDeactivateOpen(false);
      setExpertToDeactivate(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-2">Behavioral Expert Management</h1>
          <p className="text-sm md:text-base text-text-body">Manage behavioral expert accounts and student assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Total Experts</p>
                <p className="text-2xl font-bold text-text-heading">{experts.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-brand" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Active</p>
                <p className="text-2xl font-bold text-text-heading">{experts.filter(e => e.status === 'Active').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-status-success" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Assigned Students</p>
                <p className="text-2xl font-bold text-text-heading">{totalStudents}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center">
                <Users className="h-5 w-5 text-brand" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Active Cases</p>
                <p className="text-2xl font-bold text-text-heading">{totalActiveCases}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center">
                <FileText className="h-5 w-5 text-status-warning" />
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
                placeholder="Search by name, Expert ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => navigate('/admin/experts/new')}
                className="bg-brand hover:bg-brand-dark text-white"
              >
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Add Expert</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredExperts.map((expert) => (
            <div key={expert.id} className="bg-surface-card border border-border-default rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-text-body" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-heading">{expert.name}</h3>
                    <p className="text-sm text-text-body">{expert.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/edit`)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/caseload`)}>
                      View Caseload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/view`)}>
                      Account Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleResetPassword(expert)}>
                      Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeactivate(expert)}>
                      {expert.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 pt-3 border-t border-border-light">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-body">{expert.expertId}</span>
                  <Badge className={expert.status === 'Active'
                    ? 'bg-status-success-soft text-status-success border border-status-success-border'
                    : 'bg-status-error-soft text-status-error border border-status-error-border'
                  }>
                    {expert.status}
                  </Badge>
                </div>
                <div className="flex gap-4 mt-2 text-sm text-text-label">
                  <span>{expert.assignedStudents} students</span>
                  <span>{expert.activeCases} active cases</span>
                </div>
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
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Expert ID</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Role</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Assigned Students</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Active Cases</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExperts.map((expert, index) => (
                <tr
                  key={expert.id}
                  className={`border-b border-border-light hover:bg-table-row-hover ${
                    index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                  }`}
                >
                  <td className="p-4">
                    <div>
                      <p className="text-text-heading font-medium">{expert.name}</p>
                      <p className="text-xs text-text-body">{expert.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-text-label text-sm">{expert.expertId}</td>
                  <td className="p-4 text-text-label text-sm">{expert.role}</td>
                  <td className="p-4">
                    <Button
                      variant="link"
                      className="text-sm p-0 h-auto"
                      onClick={() => navigate(`/admin/experts/${expert.id}/caseload`)}
                    >
                      {expert.assignedStudents} students
                    </Button>
                  </td>
                  <td className="p-4 text-text-label text-sm">{expert.activeCases}</td>
                  <td className="p-4">
                    <Badge className={expert.status === 'Active'
                      ? 'bg-status-success-soft text-status-success border border-status-success-border'
                      : 'bg-status-error-soft text-status-error border border-status-error-border'
                    }>
                      {expert.status}
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
                        <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/edit`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/caseload`)}>
                          View Caseload
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/view`)}>
                          Account Status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(expert)}>
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeactivate(expert)}>
                          {expert.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExperts.length === 0 && (
          <Card className="border-border-default mt-4 p-12">
            <div className="text-center">
              <p className="text-text-body">No behavioral experts found matching your criteria</p>
            </div>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-6 bg-surface-card border border-surface-card-border p-4">
          <p className="text-sm text-text-label">
            <strong>Caseload Management:</strong> Behavioral experts can be assigned to
            specific students to provide specialized support and intervention strategies.
            View individual caseloads to manage student assignments and workload distribution.
          </p>
        </Card>
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
              <p className="text-text-heading font-medium">{selectedExpert?.name}</p>
              <p className="text-sm text-text-body">{selectedExpert?.email}</p>
              <p className="text-xs text-text-muted">{selectedExpert?.expertId}</p>
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
              {expertToDeactivate?.status === 'Active' ? 'Deactivate' : 'Reactivate'} Account
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-text-label">
              {expertToDeactivate?.status === 'Active'
                ? `Are you sure you want to deactivate ${expertToDeactivate?.name}'s account? They will no longer be able to access the expert portal.`
                : `Are you sure you want to reactivate ${expertToDeactivate?.name}'s account? They will regain access to the expert portal.`}
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
              {expertToDeactivate?.status === 'Active' ? 'Deactivate' : 'Reactivate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
