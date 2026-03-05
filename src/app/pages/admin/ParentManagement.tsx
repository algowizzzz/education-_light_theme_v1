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
import { Search, Plus, MoreVertical, UserCheck, Users, MailCheck, Link2, Eye, EyeOff, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedStudents: string[];
  isActivated: boolean;
  status: 'Active' | 'Inactive';
}

export default function ParentManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activationFilter, setActivationFilter] = useState<string>('all');

  // Reset Password Modal State
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Deactivate Modal State
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [parentToDeactivate, setParentToDeactivate] = useState<Parent | null>(null);

  const parents: Parent[] = [
    {
      id: '1',
      name: 'Lisa & Robert Thompson',
      email: 'thompson.family@email.com',
      phone: '(555) 123-4567',
      linkedStudents: ['Marcus Thompson'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '2',
      name: 'David & May Chen',
      email: 'chen.family@email.com',
      phone: '(555) 234-5678',
      linkedStudents: ['Emily Chen', 'Jason Chen'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'mrodriguez@email.com',
      phone: '(555) 345-6789',
      linkedStudents: ['David Rodriguez'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '4',
      name: 'Carlos & Ana Garcia',
      email: 'garcia.family@email.com',
      phone: '(555) 456-7890',
      linkedStudents: ['Sofia Garcia'],
      isActivated: false,
      status: 'Active'
    },
    {
      id: '5',
      name: 'Elena Martinez',
      email: 'emartinez@email.com',
      phone: '(555) 567-8901',
      linkedStudents: ['Alex Martinez'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '6',
      name: 'John & Susan Adams',
      email: 'adams.family@email.com',
      phone: '(555) 678-9012',
      linkedStudents: ['Tyler Adams'],
      isActivated: false,
      status: 'Active'
    }
  ];

  const filteredParents = parents.filter(parent => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.linkedStudents.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || parent.status.toLowerCase() === statusFilter;
    const matchesActivation =
      activationFilter === 'all' ||
      (activationFilter === 'activated' && parent.isActivated) ||
      (activationFilter === 'pending' && !parent.isActivated);
    return matchesSearch && matchesStatus && matchesActivation;
  });

  const activatedCount = parents.filter(p => p.isActivated).length;
  const pendingCount = parents.filter(p => !p.isActivated).length;

  const handleResetPassword = (parent: Parent) => {
    setSelectedParent(parent);
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
    toast.success(`Password has been reset for ${selectedParent?.name}`);
    setResetPasswordOpen(false);
    setSelectedParent(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeactivate = (parent: Parent) => {
    setParentToDeactivate(parent);
    setDeactivateOpen(true);
  };

  const handleConfirmDeactivate = () => {
    if (parentToDeactivate) {
      toast.success(`Parent account ${parentToDeactivate.status === 'Active' ? 'deactivated' : 'reactivated'} successfully`);
      setDeactivateOpen(false);
      setParentToDeactivate(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-2">Parent Account Management</h1>
          <p className="text-sm md:text-base text-text-body">Manage parent accounts, activations, and student linkages</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Total Parents</p>
                <p className="text-2xl font-bold text-text-heading">{parents.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-info-soft flex items-center justify-center">
                <Users className="h-5 w-5 text-brand" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Activated</p>
                <p className="text-2xl font-bold text-text-heading">{activatedCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-success-soft flex items-center justify-center">
                <MailCheck className="h-5 w-5 text-status-success" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Pending</p>
                <p className="text-2xl font-bold text-text-heading">{pendingCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-warning-soft flex items-center justify-center">
                <MailCheck className="h-5 w-5 text-status-warning" />
              </div>
            </div>
          </Card>
          <Card className="bg-surface-card border border-surface-card-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-body">Active</p>
                <p className="text-2xl font-bold text-text-heading">{parents.filter(p => p.status === 'Active').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-status-info-soft flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-brand" />
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
                placeholder="Search by name, email, or linked student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={activationFilter} onValueChange={setActivationFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Activation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="activated">Activated</SelectItem>
                  <SelectItem value="pending">Pending Activation</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/parents/bulk-link')}
                className="border-brand-dark/40 text-brand-dark hover:bg-status-info-soft"
              >
                <Link2 className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Bulk Link</span>
              </Button>
              <Button
                onClick={() => navigate('/admin/parents/new')}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Add Parent</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredParents.map((parent) => (
            <div key={parent.id} className="bg-surface-card border border-border-default rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-status-info-soft flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-heading">{parent.name}</h3>
                    <p className="text-sm text-text-body">{parent.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/edit`)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/view`)}>
                      View Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/link`)}>
                      Link to Student
                    </DropdownMenuItem>
                    {!parent.isActivated && (
                      <DropdownMenuItem onClick={() => toast.success('Activation email resent successfully')}>
                        Resend Activation
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => handleResetPassword(parent)}>
                      Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeactivate(parent)}>
                      {parent.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 pt-3 border-t border-border-light">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-body">{parent.phone}</span>
                  <Badge className={parent.status === 'Active'
                    ? 'bg-status-success-soft text-status-success border border-status-success-border'
                    : 'bg-status-error-soft text-status-error border border-status-error-border'
                  }>
                    {parent.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-text-label">Students:</span>
                  <span className="text-text-heading">{parent.linkedStudents.join(', ')}</span>
                </div>
                <div className="mt-1">
                  <Badge className={parent.isActivated
                    ? 'bg-status-success-soft text-status-success border border-status-success-border text-xs'
                    : 'bg-status-warning-soft text-status-warning border border-status-warning-border text-xs'
                  }>
                    {parent.isActivated ? 'Activated' : 'Pending'}
                  </Badge>
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
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Contact</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Linked Students</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Activated</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-table-header-text w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.map((parent, index) => (
                <tr
                  key={parent.id}
                  className={`border-b border-border-light hover:bg-table-row-hover ${
                    index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                  }`}
                >
                  <td className="p-4 text-text-heading font-medium">{parent.name}</td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="text-text-label">{parent.email}</p>
                      <p className="text-text-body text-xs">{parent.phone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {parent.linkedStudents.map((student, idx) => (
                        <p key={idx} className="text-text-label">
                          {student}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={parent.isActivated
                      ? 'bg-status-success-soft text-status-success border border-status-success-border'
                      : 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                    }>
                      {parent.isActivated ? 'Yes' : 'Pending'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={parent.status === 'Active'
                      ? 'bg-status-success-soft text-status-success border border-status-success-border'
                      : 'bg-status-error-soft text-status-error border border-status-error-border'
                    }>
                      {parent.status}
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
                        <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/edit`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/view`)}>
                          View Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/link`)}>
                          Link to Student
                        </DropdownMenuItem>
                        {!parent.isActivated && (
                          <DropdownMenuItem onClick={() => toast.success('Activation email resent successfully')}>
                            Resend Activation
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleResetPassword(parent)}>
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeactivate(parent)}>
                          {parent.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredParents.length === 0 && (
          <Card className="border-border-default mt-4 p-12">
            <div className="text-center">
              <p className="text-text-body">No parent accounts found matching your criteria</p>
            </div>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-6 bg-surface-card border border-surface-card-border p-4">
          <p className="text-sm text-text-label">
            <strong>Parent Activation:</strong> New parent accounts require activation via email.
            Parents must set their password and complete activation before accessing the portal.
            You can resend activation emails for accounts that haven't been activated yet.
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
              <p className="text-text-heading font-medium">{selectedParent?.name}</p>
              <p className="text-sm text-text-body">{selectedParent?.email}</p>
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
              {parentToDeactivate?.status === 'Active' ? 'Deactivate' : 'Reactivate'} Account
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-text-label">
              {parentToDeactivate?.status === 'Active'
                ? `Are you sure you want to deactivate ${parentToDeactivate?.name}'s account? They will no longer be able to access the parent portal.`
                : `Are you sure you want to reactivate ${parentToDeactivate?.name}'s account? They will regain access to the parent portal.`}
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
              {parentToDeactivate?.status === 'Active' ? 'Deactivate' : 'Reactivate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
