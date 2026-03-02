import { useState } from 'react';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from 'sonner';
import { User, Mail, Phone, GraduationCap, Award } from 'lucide-react';

export default function ExpertAccountSettings() {
  const [profileData] = useState({
    firstName: 'Sarah',
    lastName: 'Williams',
    title: 'Dr.',
    email: 'sarah.williams@behaviorexpert.com',
    phone: '(555) 234-5678',
    credentials: 'Ph.D. in School Psychology, BCBA',
    specializations: 'Behavioral Interventions, Autism Spectrum, ADHD',
    bio: 'Board Certified Behavior Analyst with 15 years of experience supporting students with behavioral challenges in educational settings. Specializing in positive behavior intervention strategies and collaborative consultation with families and educators.',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <ExpertLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl text-text-heading mb-6">Account Settings</h1>

        {/* Profile Information */}
        <Card className="mb-6 border-border-default">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-text-heading">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-text-label">Title</Label>
                <p className="mt-2 text-text-heading">{profileData.title}</p>
              </div>
              <div>
                <Label className="text-text-label">First Name</Label>
                <p className="mt-2 text-text-heading">{profileData.firstName}</p>
              </div>
              <div>
                <Label className="text-text-label">Last Name</Label>
                <p className="mt-2 text-text-heading">{profileData.lastName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-text-label flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <p className="mt-2 text-text-heading">{profileData.email}</p>
              </div>
              <div>
                <Label className="text-text-label flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </Label>
                <p className="mt-2 text-text-heading">{profileData.phone}</p>
              </div>
            </div>

            <div>
              <Label className="text-text-label flex items-center gap-2">
                <Award className="w-4 h-4" />
                Credentials & Certifications
              </Label>
              <p className="mt-2 text-text-heading">{profileData.credentials}</p>
            </div>

            <div>
              <Label className="text-text-label flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Areas of Specialization
              </Label>
              <p className="mt-2 text-text-heading">{profileData.specializations}</p>
            </div>

            <div>
              <Label className="text-text-label">Professional Bio</Label>
              <p className="mt-2 text-text-heading leading-relaxed">{profileData.bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* Password & Security */}
        <Card className="border-border-default">
          <CardHeader>
            <CardTitle className="text-text-heading">Password & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-text-label">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="border-border-default text-text-heading"
              />
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-text-label">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="border-border-default text-text-heading"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-text-label">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="border-border-default text-text-heading"
              />
            </div>

            <Button
              onClick={handleChangePassword}
              variant="outline"
              className="border-border-strong text-text-heading hover:bg-surface-page"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </ExpertLayout>
  );
}