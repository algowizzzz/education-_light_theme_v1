import { useState } from 'react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Shield, LogOut, Key, User, Mail, IdCard, Clock, CalendarDays, Monitor } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function AdminAccountSettings() {
  const navigate = useNavigate();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLogoutAllDialog, setShowLogoutAllDialog] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const adminInfo = {
    name: 'Admin User',
    email: 'admin@lincolnelementary.edu',
    adminId: 'ADM-2024-0001',
    role: 'School Administrator',
    lastLogin: 'Today at 9:32 AM',
    accountCreated: 'August 15, 2024',
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password changed successfully');
    setShowPasswordDialog(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleLogoutAll = () => {
    toast.success('Logged out from all devices');
    navigate('/admin/login');
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-1">
            Account Settings
          </h1>
          <p className="text-sm md:text-base text-text-body">Manage your administrator account and security</p>
        </div>

        {/* Profile Hero Card */}
        <Card className="bg-surface-card border border-surface-card-border overflow-hidden mb-6">
          <div className="relative">
            {/* Accent stripe */}
            <div className="h-24 bg-gradient-to-r from-brand-dark via-brand to-brand-light" />
            <CardContent className="relative -mt-10 px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-surface-elevated border-4 border-surface-card flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-10 h-10 text-brand" />
                </div>
                <div className="flex-1 pt-2 md:pt-0">
                  <h2 className="text-xl font-bold text-text-heading">{adminInfo.name}</h2>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="inline-flex items-center text-sm text-text-label">
                      <IdCard className="w-3.5 h-3.5 mr-1.5 text-brand" />
                      {adminInfo.adminId}
                    </span>
                    <span className="inline-flex items-center text-sm text-text-label">
                      <Mail className="w-3.5 h-3.5 mr-1.5 text-brand" />
                      {adminInfo.email}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center self-start md:self-end px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-xs font-medium text-brand-dark">
                  {adminInfo.role}
                </span>
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left Column: Account Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Account Information */}
            <Card className="bg-surface-card border border-surface-card-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-text-heading flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-surface-elevated flex items-center justify-center">
                    <User className="w-4 h-4 text-brand" />
                  </div>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-card rounded-lg p-4 border border-border-light flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-surface-elevated flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-text-label" />
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted uppercase tracking-wide">Name</Label>
                      <p className="text-text-heading font-medium">{adminInfo.name}</p>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border-light flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-surface-elevated flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IdCard className="w-4 h-4 text-text-label" />
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted uppercase tracking-wide">Admin ID</Label>
                      <p className="text-text-heading font-medium">{adminInfo.adminId}</p>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border-light flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-surface-elevated flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-text-label" />
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted uppercase tracking-wide">Email</Label>
                      <p className="text-text-heading font-medium">{adminInfo.email}</p>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border-light flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-surface-elevated flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-text-label" />
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted uppercase tracking-wide">Role</Label>
                      <p className="text-text-heading font-medium">{adminInfo.role}</p>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border-light flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-surface-elevated flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-text-label" />
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted uppercase tracking-wide">Last Login</Label>
                      <p className="text-text-heading font-medium">{adminInfo.lastLogin}</p>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border-light flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-surface-elevated flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CalendarDays className="w-4 h-4 text-text-label" />
                    </div>
                    <div>
                      <Label className="text-xs text-text-muted uppercase tracking-wide">Account Created</Label>
                      <p className="text-text-heading font-medium">{adminInfo.accountCreated}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-text-muted mt-4">
                  To update your name or email, contact your system administrator.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Security & Session */}
          <div className="space-y-5">
            {/* Security */}
            <Card className="bg-surface-card border border-surface-card-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-text-heading flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-surface-elevated flex items-center justify-center">
                    <Shield className="w-4 h-4 text-status-success" />
                  </div>
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-card rounded-lg p-4 border border-border-light">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-surface-elevated flex items-center justify-center">
                      <Key className="w-4 h-4 text-status-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-heading">Password</p>
                      <p className="text-xs text-text-muted">Changed 30 days ago</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowPasswordDialog(true)}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Key className="w-3.5 h-3.5" />
                    Change Password
                  </Button>
                </div>

                <div className="bg-card rounded-lg p-4 border border-border-light">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-surface-elevated flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-heading">Sessions</p>
                      <p className="text-xs text-text-muted">1 active device</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowLogoutAllDialog(true)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Logout All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Session / Logout */}
            <Card className="bg-surface-card border border-surface-card-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-status-error-soft flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-status-error" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-heading">End Session</p>
                    <p className="text-xs text-text-muted">Logout from this device</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowLogoutDialog(true)}
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-status-error/30 text-status-error hover:bg-status-error-soft"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, current: e.target.value })
                  }
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
                  required
                  className="mt-2"
                />
                <p className="text-xs text-text-body mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirm: e.target.value })
                  }
                  required
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                Change Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from this session?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout All Devices Dialog */}
      <Dialog open={showLogoutAllDialog} onOpenChange={setShowLogoutAllDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logout from All Devices</DialogTitle>
            <DialogDescription>
              This will end all active sessions on all devices. You'll need to login
              again on each device.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutAllDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogoutAll}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Logout from All Devices
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
