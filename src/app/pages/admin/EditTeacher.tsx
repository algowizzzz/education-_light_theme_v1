import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function EditTeacher() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    teacherId: 'TCH-001',
    firstName: 'Maria',
    lastName: 'Johnson',
    email: 'maria.johnson@lincolnelementary.edu',
    phone: '(555) 234-5678',
    grade: '4th Grade',
    subject: 'General Education',
    classroom: 'Room 204',
    yearsExperience: '12',
    certifications: 'Elementary Education, Special Education',
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Teacher updated successfully');
    navigate('/admin/teachers');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to deactivate this teacher? This action can be reversed later.')) {
      toast.success('Teacher deactivated');
      navigate('/admin/teachers');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/teachers" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Teachers
        </Link>

        <h1 className="text-2xl text-text-heading mb-6">Edit Teacher</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="teacherId" className="text-text-label">Teacher ID</Label>
                <Input
                  id="teacherId"
                  value={formData.teacherId}
                  disabled
                  className="border-border-default text-text-body bg-surface-page"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-text-label">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-text-label">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-text-label">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-text-label">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade" className="text-text-label">Grade Level *</Label>
                  <select
                    id="grade"
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                  >
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="1st Grade">1st Grade</option>
                    <option value="2nd Grade">2nd Grade</option>
                    <option value="3rd Grade">3rd Grade</option>
                    <option value="4th Grade">4th Grade</option>
                    <option value="5th Grade">5th Grade</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-text-label">Subject Area *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="classroom" className="text-text-label">Classroom *</Label>
                  <Input
                    id="classroom"
                    required
                    value={formData.classroom}
                    onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsExperience" className="text-text-label">Years of Experience</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="text-text-label">Status *</Label>
                  <select
                    id="status"
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="certifications" className="text-text-label">Certifications</Label>
                <Input
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  className="border-border-default text-text-heading"
                  placeholder="Comma-separated list of certifications"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/teachers')}
                className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
              >
                Cancel
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="border-border-strong text-text-body hover:bg-surface-page hover:text-text-heading"
            >
              Deactivate Teacher
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
