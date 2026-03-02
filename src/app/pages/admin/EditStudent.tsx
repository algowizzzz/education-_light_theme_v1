import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    studentId: 'STU-123',
    firstName: 'Marcus',
    lastName: 'Williams',
    dateOfBirth: '2016-03-15',
    grade: '4',
    primaryTeacher: 'TCH-001',
    guardianName: 'Lisa Thompson',
    guardianEmail: 'lisa.thompson@email.com',
    guardianPhone: '(555) 234-5678',
    emergencyContact: 'Robert Thompson',
    emergencyPhone: '(555) 234-5679',
    medicalNotes: 'ADHD diagnosis - medication administered daily at 8:00 AM',
    iepStatus: 'Active',
    section504: false,
    status: 'Active'
  });

  const studentStats = {
    totalIncidents: 12,
    recentIncidents: 3,
    expertSupport: true,
    lastIncident: '2 days ago'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Student information updated successfully');
    navigate('/admin/students');
  };

  const handleArchive = () => {
    if (window.confirm('Are you sure you want to archive this student? This can be reversed later.')) {
      toast.success('Student archived');
      navigate('/admin/students');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/students" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-text-heading mb-2">Edit Student</h1>
            <p className="text-text-body">{formData.studentId}</p>
          </div>
          <Badge className="bg-brand text-white">
            {formData.status}
          </Badge>
        </div>

        {/* Quick Stats */}
        <Card className="mb-6 border-brand bg-surface-hover">
          <CardHeader>
            <CardTitle className="text-lg text-text-heading flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Student Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-text-body mb-1">Total Incidents</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {studentStats.totalIncidents}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Last 30 Days</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {studentStats.recentIncidents}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Expert Support</div>
                <div className="text-lg text-text-heading">
                  {studentStats.expertSupport ? 'Yes' : 'No'}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Last Incident</div>
                <div className="text-lg text-text-heading">
                  {studentStats.lastIncident}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="studentId" className="text-text-label">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  disabled
                  className="border-border-default text-text-body bg-surface-page"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth" className="text-text-label">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="grade" className="text-text-label">Grade *</Label>
                  <select
                    id="grade"
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                  >
                    <option value="K">Kindergarten</option>
                    <option value="1">1st Grade</option>
                    <option value="2">2nd Grade</option>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="primaryTeacher" className="text-text-label">Primary Teacher *</Label>
                <select
                  id="primaryTeacher"
                  required
                  value={formData.primaryTeacher}
                  onChange={(e) => setFormData({ ...formData, primaryTeacher: e.target.value })}
                  className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                >
                  <option value="TCH-001">Mrs. Maria Johnson</option>
                  <option value="TCH-002">Mr. David Chen</option>
                  <option value="TCH-003">Ms. Jennifer Martinez</option>
                </select>
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
                  <option value="Transferred">Transferred</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="guardianName" className="text-text-label">Primary Guardian Name *</Label>
                <Input
                  id="guardianName"
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className="border-border-default text-text-heading"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianEmail" className="text-text-label">Guardian Email *</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    required
                    value={formData.guardianEmail}
                    onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianPhone" className="text-text-label">Guardian Phone *</Label>
                  <Input
                    id="guardianPhone"
                    type="tel"
                    required
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact" className="text-text-label">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone" className="text-text-label">Emergency Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Special Education & Medical</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="iepStatus" className="text-text-label">IEP Status</Label>
                  <select
                    id="iepStatus"
                    value={formData.iepStatus}
                    onChange={(e) => setFormData({ ...formData, iepStatus: e.target.value })}
                    className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                  >
                    <option value="None">None</option>
                    <option value="Active">Active IEP</option>
                    <option value="Pending">Pending Evaluation</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="section504"
                    checked={formData.section504}
                    onChange={(e) => setFormData({ ...formData, section504: e.target.checked })}
                    className="w-4 h-4 text-text-heading border-border-default rounded"
                  />
                  <Label htmlFor="section504" className="text-text-label cursor-pointer">
                    Has 504 Plan
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="medicalNotes" className="text-text-label">Medical Notes / Accommodations</Label>
                <textarea
                  id="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                  rows={4}
                  className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
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
                onClick={() => navigate('/admin/students')}
                className="border-border-strong text-text-heading hover:bg-surface-page"
              >
                Cancel
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleArchive}
              className="border-border-strong text-text-body hover:bg-surface-page hover:text-text-heading"
            >
              Archive Student
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
