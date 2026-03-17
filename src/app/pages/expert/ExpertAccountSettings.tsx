import { useState } from 'react';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Separator } from '@/app/components/ui/separator';
import { toast } from 'sonner';
import { User, Mail, Phone, GraduationCap, Award, Lock } from 'lucide-react';

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
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <ExpertLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-1">Account Settings</h1>
          <p className="text-sm md:text-base text-text-body">Manage your profile and security settings</p>
        </div>

        {/* Profile Information */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-brand rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-text-muted uppercase tracking-wide">Title</Label>
                <p className="mt-1 text-text-heading font-medium">{profileData.title}</p>
              </div>
              <div>
                <Label className="text-xs text-text-muted uppercase tracking-wide">First Name</Label>
                <p className="mt-1 text-text-heading font-medium">{profileData.firstName}</p>
              </div>
              <div>
                <Label className="text-xs text-text-muted uppercase tracking-wide">Last Name</Label>
                <p className="mt-1 text-text-heading font-medium">{profileData.lastName}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-text-muted uppercase tracking-wide flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand" /> Email
                </Label>
                <p className="mt-1 text-text-heading font-medium">{profileData.email}</p>
              </div>
              <div>
                <Label className="text-xs text-text-muted uppercase tracking-wide flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand" /> Phone
                </Label>
                <p className="mt-1 text-text-heading font-medium">{profileData.phone}</p>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-xs text-text-muted uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand" /> Credentials & Certifications
              </Label>
              <p className="mt-1 text-text-heading font-medium">{profileData.credentials}</p>
            </div>

            <div>
              <Label className="text-xs text-text-muted uppercase tracking-wide flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-brand" /> Areas of Specialization
              </Label>
              <p className="mt-1 text-text-heading font-medium">{profileData.specializations}</p>
            </div>

            <Separator />

            <div>
              <Label className="text-xs text-text-muted uppercase tracking-wide">Professional Bio</Label>
              <p className="mt-1 text-text-heading leading-relaxed">{profileData.bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* Password & Security */}
        <Card className="border-border-default">
          <CardHeader className="bg-brand rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-white">
              <Lock className="w-5 h-5" />
              Password & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-text-label">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-text-label">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-text-label">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="mt-2"
              />
            </div>
            <Button onClick={handleChangePassword} className="bg-brand hover:bg-brand-dark text-white">
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </ExpertLayout>
  );
}
