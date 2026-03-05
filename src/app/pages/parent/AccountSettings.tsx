import { useState } from 'react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { User, Mail, Phone, Lock } from 'lucide-react';

export default function ParentAccountSettings() {
  const [contactInfo, setContactInfo] = useState({
    email: 'thompson.family@email.com',
    phone: '(555) 123-4567'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const accountInfo = {
    name: 'Lisa & Robert Thompson',
    linkedChildren: ['Marcus Thompson (Grade 4)'],
    accountCreated: 'September 2025',
    lastLogin: 'Today at 9:15 AM'
  };

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Contact information updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <ParentLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Account Settings</h1>
          <p className="text-text-body">Manage your account information and preferences</p>
        </div>

        {/* Account Information (Read-Only) */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-surface-page">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-text-body">Account Name</Label>
                <p className="text-sm text-text-heading mt-1">{accountInfo.name}</p>
              </div>
              <Separator />
              <div>
                <Label className="text-sm text-text-body">Linked Children</Label>
                <div className="mt-1">
                  {accountInfo.linkedChildren.map((child, idx) => (
                    <p key={idx} className="text-sm text-text-heading">{child}</p>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-text-body">Account Created</Label>
                  <p className="text-sm text-text-heading mt-1">{accountInfo.accountCreated}</p>
                </div>
                <div>
                  <Label className="text-sm text-text-body">Last Login</Label>
                  <p className="text-sm text-text-heading mt-1">{accountInfo.lastLogin}</p>
                </div>
              </div>
            </div>
            <Card className="mt-6 border-border-default bg-surface-page">
              <CardContent className="py-3">
                <p className="text-xs text-text-label">
                  To update your name or add/remove linked children, please contact the school office.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Update Contact Information */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-surface-page">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSaveContactInfo}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6 bg-brand hover:bg-brand-dark text-white shadow-sm">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-surface-page">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="mt-1"
                  />
                  <p className="text-xs text-text-body mt-1">
                    Minimum 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="mt-6 bg-brand hover:bg-brand-dark text-white shadow-sm"
                disabled={
                  !passwordData.currentPassword ||
                  !passwordData.newPassword ||
                  !passwordData.confirmPassword
                }
              >
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border-default bg-surface-page">
          <CardContent className="py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm mb-1">Security & Privacy</p>
                <p className="text-xs text-text-body">
                  Your data is protected and only accessible to authorized school staff
                </p>
              </div>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
