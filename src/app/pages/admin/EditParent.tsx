import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function EditParent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    parentId: 'PAR-001',
    firstName: 'Lisa',
    lastName: 'Thompson',
    email: 'lisa.thompson@email.com',
    phone: '(555) 234-5678',
    relationship: 'Mother',
    address: '456 Oak Street',
    city: 'Springfield',
    state: 'CA',
    zipCode: '12345',
    linkedStudents: ['STU-123'],
    emergencyContact: true,
    portalAccess: true,
    status: 'Active'
  });

  const [availableStudents] = useState([
    { id: 'STU-123', name: 'Marcus Williams', currentlyLinked: true },
    { id: 'STU-124', name: 'Emma Rodriguez', currentlyLinked: false },
    { id: 'STU-125', name: 'Jayden Smith', currentlyLinked: false }
  ]);

  const parentStats = {
    totalIncidents: 12,
    unacknowledged: 2,
    lastLogin: '2 days ago',
    messagesSent: 8
  };

  const handleStudentToggle = (studentId: string) => {
    setFormData(prev => ({
      ...prev,
      linkedStudents: prev.linkedStudents.includes(studentId)
        ? prev.linkedStudents.filter(id => id !== studentId)
        : [...prev.linkedStudents, studentId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.linkedStudents.length === 0) {
      toast.error('Please link at least one student');
      return;
    }
    toast.success('Parent information updated successfully');
    navigate('/admin/parents');
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate this parent account?')) {
      toast.success('Parent account deactivated');
      navigate('/admin/parents');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/parents" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Parents/Guardians
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-text-heading mb-2">Edit Parent/Guardian</h1>
            <p className="text-text-body">{formData.parentId}</p>
          </div>
          <Badge className="bg-brand text-white">
            {formData.status}
          </Badge>
        </div>

        {/* Parent Activity Overview */}
        <Card className="mb-6 border-brand bg-surface-hover">
          <CardHeader>
            <CardTitle className="text-lg text-text-heading flex items-center gap-2">
              <Users className="w-5 h-5" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-text-body mb-1">Total Incidents</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {parentStats.totalIncidents}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Unacknowledged</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {parentStats.unacknowledged}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Last Login</div>
                <div className="text-lg text-text-heading">
                  {parentStats.lastLogin}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Messages Sent</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {parentStats.messagesSent}
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
                <Label htmlFor="parentId" className="text-text-label">Parent ID</Label>
                <Input
                  id="parentId"
                  value={formData.parentId}
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
                  <Label htmlFor="relationship" className="text-text-label">Relationship to Student *</Label>
                  <select
                    id="relationship"
                    required
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Other">Other</option>
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
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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

              <div>
                <Label htmlFor="address" className="text-text-label">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="border-border-default text-text-heading"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-text-label">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-text-label">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-text-label">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="border-border-default text-text-heading"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Linked Students *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-text-body mb-3">
                Select all students this parent/guardian is responsible for
              </p>
              {availableStudents.map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-surface-page rounded-lg">
                  <input
                    type="checkbox"
                    id={`student-${student.id}`}
                    checked={formData.linkedStudents.includes(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                    className="w-4 h-4 text-text-heading border-border-default rounded"
                  />
                  <Label htmlFor={`student-${student.id}`} className="text-text-heading cursor-pointer flex-1">
                    {student.name} ({student.id})
                  </Label>
                  {student.currentlyLinked && (
                    <Badge variant="outline" className="border-border-strong text-text-label">
                      Currently Linked
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Permissions & Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-page rounded-lg">
                <input
                  type="checkbox"
                  id="emergencyContact"
                  checked={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.checked })}
                  className="w-4 h-4 text-text-heading border-border-default rounded"
                />
                <div>
                  <Label htmlFor="emergencyContact" className="text-text-heading cursor-pointer">
                    Emergency Contact
                  </Label>
                  <p className="text-sm text-text-body">Authorized to be contacted in emergencies</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-surface-page rounded-lg">
                <input
                  type="checkbox"
                  id="portalAccess"
                  checked={formData.portalAccess}
                  onChange={(e) => setFormData({ ...formData, portalAccess: e.target.checked })}
                  className="w-4 h-4 text-text-heading border-border-default rounded"
                />
                <div>
                  <Label htmlFor="portalAccess" className="text-text-heading cursor-pointer">
                    Parent Portal Access
                  </Label>
                  <p className="text-sm text-text-body">Grant access to the parent portal</p>
                </div>
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
                onClick={() => navigate('/admin/parents')}
                className="border-border-strong text-text-heading hover:bg-surface-page"
              >
                Cancel
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleDeactivate}
              className="border-border-strong text-text-body hover:bg-surface-page hover:text-text-heading"
            >
              Deactivate Account
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
