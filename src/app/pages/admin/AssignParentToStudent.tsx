import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Search, Check, Plus } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

const PARENTS = [
  {
    id: '1',
    name: 'Lisa & Robert Thompson',
    email: 'thompson.family@email.com',
    phone: '(555) 123-4567',
    linkedStudents: ['Marcus Thompson'],
    isActivated: true,
  },
  {
    id: '2',
    name: 'David & May Chen',
    email: 'chen.family@email.com',
    phone: '(555) 234-5678',
    linkedStudents: ['Emily Chen', 'Jason Chen'],
    isActivated: true,
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'mrodriguez@email.com',
    phone: '(555) 345-6789',
    linkedStudents: ['David Rodriguez'],
    isActivated: true,
  },
  {
    id: '4',
    name: 'Carlos & Ana Garcia',
    email: 'garcia.family@email.com',
    phone: '(555) 456-7890',
    linkedStudents: ['Sofia Garcia'],
    isActivated: false,
  },
  {
    id: '5',
    name: 'Elena Martinez',
    email: 'emartinez@email.com',
    phone: '(555) 567-8901',
    linkedStudents: ['Alex Martinez'],
    isActivated: true,
  },
  {
    id: '6',
    name: 'John & Susan Adams',
    email: 'adams.family@email.com',
    phone: '(555) 678-9012',
    linkedStudents: ['Tyler Adams'],
    isActivated: false,
  }
];

export default function AssignParentToStudent() {
  const navigate = useNavigate();
  const { id: studentId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParents, setSelectedParents] = useState<string[]>([]);

  // Find the student
  const student = STUDENTS.find(s => s.id === studentId);

  const filteredParents = PARENTS.filter(parent =>
    parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleParent = (parentId: string) => {
    setSelectedParents(prev =>
      prev.includes(parentId)
        ? prev.filter(id => id !== parentId)
        : [...prev, parentId]
    );
  };

  const handleAssign = () => {
    if (selectedParents.length > 0) {
      const parentNames = selectedParents
        .map(id => PARENTS.find(p => p.id === id)?.name)
        .filter(Boolean)
        .join(', ');
      toast.success(`${parentNames} linked to ${student?.name}`);
      navigate('/admin/students');
    }
  };

  if (!student) {
    return (
      <AdminLayout>
        <div className="p-6">
          <p>Student not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/students')}
            className="mb-4 text-text-label hover:text-text-heading"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Students
          </Button>
          <h1 className="text-2xl mb-2">Assign Parent to Student</h1>
          <p className="text-text-body">Link parent/guardian accounts to {student.name}</p>
        </div>

        {/* Student Info Card */}
        <Card className="border-border-default mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-text-body">Name</Label>
                <p className="text-text-heading">{student.name}</p>
              </div>
              <div>
                <Label className="text-sm text-text-body">Student ID</Label>
                <p className="text-text-heading">{student.id}</p>
              </div>
              <div>
                <Label className="text-sm text-text-body">Grade</Label>
                <p className="text-text-heading">Grade {student.grade}</p>
              </div>
              <div>
                <Label className="text-sm text-text-body">Primary Teacher</Label>
                <p className="text-text-heading">{student.primaryTeacher}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent Selection */}
        <Card className="border-border-default">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Select Parents/Guardians</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/parents/new')}
                className="border-border-default"
              >
                <Plus className="w-4 h-4 mr-1" />
                New Parent
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-body" />
              <Input
                type="text"
                placeholder="Search parents by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedParents.length > 0 && (
              <div className="mb-4 p-3 bg-surface-page rounded-lg">
                <p className="text-sm text-text-label">
                  <strong>{selectedParents.length}</strong> parent(s) selected
                </p>
              </div>
            )}

            {/* Parent List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredParents.map((parent) => {
                const isSelected = selectedParents.includes(parent.id);

                return (
                  <div
                    key={parent.id}
                    onClick={() => toggleParent(parent.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-brand-dark bg-surface-page'
                        : 'border-border-default hover:border-border-strong'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-text-heading">{parent.name}</p>
                          {!parent.isActivated && (
                            <Badge variant="secondary" className="text-xs bg-status-warning-soft text-status-warning">
                              Pending Activation
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-text-body">{parent.email}</p>
                        <p className="text-sm text-text-body">{parent.phone}</p>

                        {parent.linkedStudents.length > 0 && (
                          <p className="text-xs text-text-muted mt-1">
                            Currently linked to: {parent.linkedStudents.join(', ')}
                          </p>
                        )}
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-brand-dark flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredParents.length === 0 && (
              <p className="text-center text-text-body py-8">No parents found</p>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/students')}
            className="border-border-default"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={selectedParents.length === 0}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Link Parent{selectedParents.length > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
