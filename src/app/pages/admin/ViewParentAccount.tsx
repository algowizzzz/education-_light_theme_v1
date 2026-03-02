import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { User, Mail, Calendar, FileText, CheckCircle2, XCircle, Users, ArrowLeft, X } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function ViewParentAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Unlink Modal State
  const [unlinkOpen, setUnlinkOpen] = useState(false);
  const [studentToUnlink, setStudentToUnlink] = useState<{ id: string; name: string } | null>(null);

  // Mock data
  const parent = {
    id: id || 'P-2024-0456',
    name: 'Jennifer Rodriguez',
    email: 'jennifer.rodriguez@email.com',
    phone: '(555) 987-6543',
    alternatePhone: '(555) 123-4567',
    parentId: 'P-2024-0456',
    status: 'Active',
    activationStatus: 'Activated',
    createdDate: 'September 5, 2024',
    activatedDate: 'September 6, 2024',
    lastLogin: 'January 13, 2026 at 4:45 PM',
    accountActivated: true,
    passwordLastChanged: 'January 2, 2026',
    linkedStudents: 2,
    incidentsViewed: 18,
    messagesReceived: 12,
    messagesRead: 11,
  };

  // Get linked students
  const linkedStudents = STUDENTS.slice(0, 2).map((student) => ({
    ...student,
    linkedDate: 'September 5, 2024',
    recentIncidents: Math.floor(Math.random() * 5) + 1,
  }));

  const handleUnlink = (student: { id: string; name: string }) => {
    setStudentToUnlink(student);
    setUnlinkOpen(true);
  };

  const handleConfirmUnlink = () => {
    if (studentToUnlink) {
      toast.success(`${studentToUnlink.name} has been unlinked from ${parent.name}`);
      setUnlinkOpen(false);
      setStudentToUnlink(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin/parents" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Parent Management
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl text-text-heading">{parent.name}</h1>
              <p className="text-sm text-text-body mt-1">Parent Account Details</p>
            </div>
            <div className="flex gap-2">
              <Badge className={`${
                parent.accountActivated ? 'bg-brand' : 'bg-brand-dark'
              } text-white`}>
                {parent.activationStatus}
              </Badge>
              <Badge className={`${
                parent.status === 'Active' ? 'bg-brand' : 'bg-brand-dark'
              } text-white`}>
                {parent.status}
              </Badge>
            </div>
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
                <p className="text-text-heading font-medium">{parent.name}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Parent ID</p>
                <p className="text-text-heading font-medium">{parent.parentId}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Linked Students</p>
                <p className="text-text-heading">{parent.linkedStudents} student(s)</p>
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
                <p className="text-text-heading break-all">{parent.email}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Primary Phone</p>
                <p className="text-text-heading">{parent.phone}</p>
              </div>
              <div>
                <p className="text-sm text-text-body">Alternate Phone</p>
                <p className="text-text-heading">{parent.alternatePhone}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Linked Students */}
        <Card className="border-border-default p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-text-heading" />
              <h2 className="text-lg font-medium text-text-heading">Linked Students</h2>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/parents/${id}/link`)}
              className="border-border-strong text-text-heading hover:bg-surface-page"
            >
              Link Additional Student
            </Button>
          </div>

          <div className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-page border-b border-border-default">
                <tr className="bg-table-header-bg">
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Grade</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Primary Teacher</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Recent Incidents</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Linked Date</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {linkedStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b border-border-light hover:bg-table-row-hover ${
                      index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                    }`}
                  >
                    <td
                      className="p-4 text-text-heading font-medium cursor-pointer hover:underline"
                      onClick={() => navigate(`/admin/students/${student.id}`)}
                    >
                      {student.name}
                    </td>
                    <td className="p-4 text-text-label">{student.id}</td>
                    <td className="p-4 text-text-label">Grade {student.grade}</td>
                    <td className="p-4 text-text-body">{student.primaryTeacher}</td>
                    <td className="p-4 text-text-heading">{student.recentIncidents}</td>
                    <td className="p-4 text-text-body">{student.linkedDate}</td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlink({ id: student.id, name: student.name });
                        }}
                        className="text-text-body hover:text-text-heading hover:bg-surface-page"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Unlink
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Account Status */}
        <Card className="border-border-default p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-text-heading" />
            <h2 className="text-lg font-medium text-text-heading">Account Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              {parent.accountActivated ? (
                <CheckCircle2 className="w-5 h-5 text-text-heading mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-text-body mt-0.5" />
              )}
              <div>
                <p className="text-sm text-text-body">Account Activation</p>
                <p className="text-text-heading font-medium">
                  {parent.accountActivated ? 'Activated' : 'Not Activated'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-text-heading mt-0.5" />
              <div>
                <p className="text-sm text-text-body">Account Created</p>
                <p className="text-text-heading">{parent.createdDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-body">Activation Date</p>
              <p className="text-text-heading">{parent.activatedDate}</p>
            </div>
            <div>
              <p className="text-sm text-text-body">Last Login</p>
              <p className="text-text-heading">{parent.lastLogin}</p>
            </div>
            <div>
              <p className="text-sm text-text-body">Password Last Changed</p>
              <p className="text-text-heading">{parent.passwordLastChanged}</p>
            </div>
          </div>
        </Card>

        {/* Activity Summary */}
        <Card className="border-border-default p-6 mb-6">
          <h2 className="text-lg font-medium text-text-heading mb-4">Activity Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-surface-page rounded-lg">
              <p className="text-3xl font-medium text-text-heading mb-1">{parent.incidentsViewed}</p>
              <p className="text-sm text-text-body">Incidents Viewed</p>
            </div>
            <div className="text-center p-4 bg-surface-page rounded-lg">
              <p className="text-3xl font-medium text-text-heading mb-1">{parent.messagesReceived}</p>
              <p className="text-sm text-text-body">Messages Received</p>
            </div>
            <div className="text-center p-4 bg-surface-page rounded-lg">
              <p className="text-3xl font-medium text-text-heading mb-1">{parent.messagesRead}</p>
              <p className="text-sm text-text-body">Messages Read</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/parents')}
            className="border-border-strong text-text-heading hover:bg-surface-page"
          >
            Back to List
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/parents/${id}/edit`)}
            className="border-border-strong text-text-heading hover:bg-surface-page"
          >
            Edit Parent
          </Button>
          <Button
            onClick={() => navigate(`/admin/parents/${id}/link`)}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Link Student
          </Button>
        </div>
      </div>

      {/* Unlink Confirmation Modal */}
      <Dialog open={unlinkOpen} onOpenChange={setUnlinkOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-text-heading">Unlink Student</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-text-label">
              Are you sure you want to unlink <span className="font-medium">{studentToUnlink?.name}</span> from <span className="font-medium">{parent.name}</span>?
            </p>
            <p className="text-sm text-text-body mt-2">
              This parent will no longer have access to this student's information.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUnlinkOpen(false)}
              className="border-border-strong text-text-heading"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUnlink}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Unlink Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
