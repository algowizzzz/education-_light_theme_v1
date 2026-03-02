import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { User, Mail, ArrowLeft } from 'lucide-react';

export default function ViewExpertAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const expert = {
    id: id || 'BE-2024-001',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@lincolnelementary.edu',
    phone: '(555) 345-6789',
    expertId: 'BE-2024-001',
    status: 'Active',
    specialization: 'Behavioral Psychology',
    credentials: 'Ph.D. in Clinical Psychology, BCBA Certified',
    yearsExperience: 12,
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin/experts" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Expert Management
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl text-text-heading">{expert.name}</h1>
              <p className="text-sm text-text-body mt-1">Behavioral Expert Account Details</p>
            </div>
            <Badge className={`${
              expert.status === 'Active' ? 'bg-brand' : 'bg-brand-dark'
            } text-white`}>
              {expert.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Account Information */}
          <Card className="border-border-default p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-text-heading" />
              <h2 className="text-lg font-medium text-text-heading">Account Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-body">Full Name</p>
                <p className="text-text-heading font-medium">{expert.name}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Expert ID</p>
                <p className="text-text-heading font-medium">{expert.expertId}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Specialization</p>
                <p className="text-text-heading">{expert.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Credentials</p>
                <p className="text-text-heading">{expert.credentials}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Years of Experience</p>
                <p className="text-text-heading">{expert.yearsExperience} years</p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="border-border-default p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-text-heading" />
              <h2 className="text-lg font-medium text-text-heading">Contact Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-body">Email Address</p>
                <p className="text-text-heading break-all">{expert.email}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Phone Number</p>
                <p className="text-text-heading">{expert.phone}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/experts')}
            className="border-border-strong text-text-heading hover:bg-surface-page"
          >
            Back to List
          </Button>
          <Button
            onClick={() => navigate(`/admin/experts/${id}/edit`)}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Edit Expert
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
