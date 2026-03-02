import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Award } from 'lucide-react';
import { toast } from 'sonner';

export default function EditExpert() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    expertId: 'EXP-001',
    title: 'Dr.',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@behaviorexpert.com',
    phone: '(555) 234-5678',
    availability: 'Full-time',
    status: 'Active'
  });

  const expertStats = {
    activeCases: 12,
    totalCases: 47,
    avgResponseTime: '18 min',
    successRate: 84
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Expert information updated successfully');
    navigate('/admin/experts');
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate this expert? Active cases will need to be reassigned.')) {
      toast.success('Expert deactivated');
      navigate('/admin/experts');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/experts" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Behavioral Experts
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-text-heading mb-2">Edit Behavioral Expert</h1>
            <p className="text-text-body">{formData.expertId}</p>
          </div>
          <Badge className="bg-brand text-white">
            {formData.status}
          </Badge>
        </div>

        {/* Expert Performance Overview */}
        <Card className="mb-6 border-brand bg-surface-hover">
          <CardHeader>
            <CardTitle className="text-lg text-text-heading flex items-center gap-2">
              <Award className="w-5 h-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-text-body mb-1">Active Cases</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {expertStats.activeCases}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Total Cases</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {expertStats.totalCases}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Avg Response</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {expertStats.avgResponseTime}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Success Rate</div>
                <div className="text-2xl font-semibold text-text-heading">
                  {expertStats.successRate}%
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
                <Label htmlFor="expertId" className="text-text-label">Expert ID</Label>
                <Input
                  id="expertId"
                  value={formData.expertId}
                  disabled
                  className="border-border-default text-text-body bg-surface-page"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
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
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader>
              <CardTitle className="text-text-heading">Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="availability" className="text-text-label">Availability *</Label>
                <select
                  id="availability"
                  required
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="On-call">On-call</option>
                </select>
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
                onClick={() => navigate('/admin/experts')}
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
              Deactivate Expert
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
