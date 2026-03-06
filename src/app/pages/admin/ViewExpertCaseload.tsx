import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { User, BookOpen, ArrowLeft, X } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function ViewExpertCaseload() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Unlink Modal State
  const [unlinkOpen, setUnlinkOpen] = useState(false);
  const [studentToUnlink, setStudentToUnlink] = useState<{ id: string; name: string } | null>(null);

  // Mock data
  const expert = {
    id: id || 'BE-2024-001',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@lincolnelementary.edu',
    phone: '(555) 345-6789',
    expertId: 'BE-2024-001',
    status: 'Active',
    specialization: 'Behavioral Psychology',
    joinedDate: 'August 15, 2024',
  };

  // Get assigned students
  const assignedStudents = STUDENTS.slice(0, 8).map((student, index) => ({
    ...student,
    assignedDate: new Date(2024, 8 + index, 10).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    incidentCount: Math.floor(Math.random() * 10) + 3,
    lastIncident: `${Math.floor(Math.random() * 14) + 1} days ago`,
    priority: index < 2 ? 'High' : index < 5 ? 'Medium' : 'Low',
  }));

  const handleUnlink = (student: { id: string; name: string }) => {
    setStudentToUnlink(student);
    setUnlinkOpen(true);
  };

  const handleConfirmUnlink = () => {
    if (studentToUnlink) {
      toast.success(`${studentToUnlink.name} has been unlinked from ${expert.name}`);
      setUnlinkOpen(false);
      setStudentToUnlink(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin/experts" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Expert Management
          </Link>
          <div>
            <h1 className="text-2xl text-text-heading">{expert.name} - Caseload</h1>
            <p className="text-sm text-text-body mt-1">Managing assigned students and cases</p>
          </div>
        </div>

        {/* Expert Summary */}
        <Card className="border-border-default p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-text-heading" />
            <h2 className="text-sm font-medium text-text-body">Expert Information</h2>
          </div>
          <p className="text-2xl font-medium text-text-heading mb-1">{expert.name}</p>
          <p className="text-sm text-text-body">{expert.specialization}</p>
          <p className="text-sm text-text-body mt-2">{expert.expertId}</p>
        </Card>

        {/* Assigned Students */}
        <Card className="border-border-default p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-text-heading" />
            <h2 className="text-lg font-medium text-text-heading">Assigned Students</h2>
          </div>

          {assignedStudents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-body">No students currently assigned</p>
            </div>
          ) : (
            <div className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-surface-page border-b border-border-default">
                  <tr className="bg-table-header-bg">
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student Name</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Grade</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Incidents</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Last Incident</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Priority</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Assigned Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedStudents.map((student, index) => (
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
                      <td className="p-4 text-text-heading">{student.incidentCount}</td>
                      <td className="p-4 text-text-body">{student.lastIncident}</td>
                      <td className="p-4">
                        <Badge className={`${
                          student.priority === 'High' ? 'bg-brand' :
                          student.priority === 'Medium' ? 'bg-brand-dark' :
                          'bg-badge-medium'
                        } text-white`}>
                          {student.priority}
                        </Badge>
                      </td>
                      <td className="p-4 text-text-body">{student.assignedDate}</td>
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
          )}
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/experts')}
            className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
          >
            Back to Expert List
          </Button>
          <Button
            onClick={() => navigate(`/admin/experts/${id}/edit`)}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Edit Expert Profile
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
              Are you sure you want to unlink <span className="font-medium">{studentToUnlink?.name}</span> from <span className="font-medium">{expert.name}</span>?
            </p>
            <p className="text-sm text-text-body mt-2">
              This student will no longer be assigned to this behavioral expert.
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
