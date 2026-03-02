import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AddParent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentId: '',
    firstName: 'Angela',
    lastName: 'Martinez',
    email: 'angela.martinez@email.com',
    phone: '(555) 456-7890',
    relationship: 'Mother',
    address: '456 Oak Street',
    city: 'Springfield',
    state: 'CA',
    zipCode: '94105',
    linkedStudents: ['STU-124'] as string[],
    emergencyContact: true,
    portalAccess: true
  });

  const [availableStudents] = useState([
    { id: 'STU-123', name: 'Marcus Williams' },
    { id: 'STU-124', name: 'Emma Rodriguez' },
    { id: 'STU-125', name: 'Jayden Smith' }
  ]);

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
    
    // Generate parent ID and activation code
    const parentId = `P-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const activationCode = `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const parentName = `${formData.firstName} ${formData.lastName}`;
    
    toast.success('Parent/guardian added successfully');
    navigate('/admin/parents/success', {
      state: {
        parentId,
        parentName,
        email: formData.email,
        activationCode
      }
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/parents" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Parents/Guardians
        </Link>

        <h1 className="text-2xl text-text-heading mb-6">Add New Parent/Guardian</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="parentId" className="text-text-label">Parent ID *</Label>
                <Input
                  id="parentId"
                  required
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="border-border-default text-text-heading"
                  placeholder="PAR-001"
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
                    placeholder="(555) 123-4567"
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
                    placeholder="CA"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-text-label">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="border-border-default text-text-heading"
                    placeholder="12345"
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

          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Add Parent/Guardian
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
        </form>
      </div>
    </AdminLayout>
  );
}