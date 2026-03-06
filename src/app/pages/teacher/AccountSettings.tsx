import { useState } from 'react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // Simulate password update
    toast.success('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogoutAll = () => {
    toast.success('Logged out from all devices');
    setTimeout(() => {
      navigate('/teacher/login');
    }, 1500);
  };

  const handleLogout = () => {
    navigate('/teacher/login');
  };

  return (
    <TeacherLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">Account Settings</h1>
          <p className="text-text-label">Manage your account information and security</p>
        </div>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Account Information</CardTitle>
            <p className="text-sm text-text-body">Your account details are managed by your school administrator</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-text-label text-sm mb-2 block">Full Name</Label>
                  <div className="p-3 bg-surface-page rounded-lg text-text-heading">
                    Maria Johnson
                  </div>
                </div>
                <div>
                  <Label className="text-text-label text-sm mb-2 block">Email</Label>
                  <div className="p-3 bg-surface-page rounded-lg text-text-heading">
                    maria.johnson@lincolnelementary.edu
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border-light">
                <p className="text-sm text-text-body">
                  To update your account information, please contact your school administrator.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Change Password</CardTitle>
            <p className="text-sm text-text-body">Update your password to keep your account secure</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-text-label mb-2 block">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="border-border-default text-text-heading"
                />
              </div>

              <div>
                <Label htmlFor="new-password" className="text-text-label mb-2 block">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="border-border-default text-text-heading"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-text-label mb-2 block">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="border-border-default text-text-heading"
                />
              </div>

              <div className="pt-2">
                <p className="text-sm text-text-body mb-4">
                  Password requirements: At least 8 characters, include uppercase, lowercase, number, and special character
                </p>
                <Button
                  onClick={handleUpdatePassword}
                  className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Session Management</CardTitle>
            <p className="text-sm text-text-body">Manage your active sessions across devices</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-heading mb-1">Active Sessions</p>
                <p className="text-sm text-text-body">You are currently logged in on 2 devices</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
                  >
                    Logout from All Devices
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-surface-card border-border-default">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-text-heading">
                      Logout from All Devices?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-text-label">
                      This will log you out from all devices including this one. You'll need to sign in again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogoutAll}
                      className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                    >
                      Logout All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 pt-8 border-t border-border-light">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
              >
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-surface-card border-border-default">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-text-heading">
                  Confirm Logout
                </AlertDialogTitle>
                <AlertDialogDescription className="text-text-label">
                  Are you sure you want to logout? Any unsaved changes will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </TeacherLayout>
  );
}