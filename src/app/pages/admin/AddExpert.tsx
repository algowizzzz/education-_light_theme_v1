import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AddExpert() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    expertId: '',
    title: 'Dr.',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@behaviorexperts.com',
    phone: '(555) 987-6543',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate expert ID
    const expertId = `BE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const expertName = `${formData.firstName} ${formData.lastName}`;
    
    toast.success('Behavioral expert added successfully');
    navigate('/admin/experts/success', {
      state: { expertId, expertName, email: formData.email }
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/experts" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Behavioral Experts
        </Link>

        <h1 className="text-2xl text-text-heading mb-6">Add New Behavioral Expert</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="expertId" className="text-text-label">Expert ID *</Label>
                <Input
                  id="expertId"
                  required
                  value={formData.expertId}
                  onChange={(e) => setFormData({ ...formData, expertId: e.target.value })}
                  className="border-border-default text-text-heading"
                  placeholder="EXP-001"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title" className="text-text-label">Title</Label>
                  <select
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
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
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Add Expert
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/experts')}
              className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}