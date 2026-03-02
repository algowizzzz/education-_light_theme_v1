import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Search, Check, Users } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

const EXPERTS = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    role: 'Lead Behavioral Specialist',
    assignedStudents: 45,
    specializations: ['ADHD', 'Anxiety', 'General Behavior']
  },
  {
    id: '2',
    name: 'Robert Chen',
    role: 'Behavioral Specialist - SpEd',
    assignedStudents: 28,
    specializations: ['Special Education', 'Autism Spectrum', 'Learning Disabilities']
  },
  {
    id: '3',
    name: 'Jennifer Adams',
    role: 'Behavioral Specialist',
    assignedStudents: 32,
    specializations: ['Social Skills', 'Emotional Regulation', 'Conflict Resolution']
  },
];

export default function AssignStudentToExpert() {
  const navigate = useNavigate();
  const { id: studentId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  // Find the student
  const student = STUDENTS.find(s => s.id === studentId);

  const filteredExperts = EXPERTS.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAssign = () => {
    if (selectedExpert) {
      const expert = EXPERTS.find(e => e.id === selectedExpert);
      toast.success(`${student?.name} has been assigned to ${expert?.name}`);
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
          <h1 className="text-2xl mb-2">Assign Student to Behavioral Expert</h1>
          <p className="text-text-body">Select a behavioral expert to support {student.name}</p>
        </div>

        {/* Student Info Card */}
        <Card className="border-border-default mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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

        {/* Expert Selection */}
        <Card className="border-border-default">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Behavioral Expert</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-body" />
              <Input
                type="text"
                placeholder="Search experts by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Expert List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  onClick={() => setSelectedExpert(expert.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedExpert === expert.id
                      ? 'border-brand-dark bg-surface-page'
                      : 'border-border-default hover:border-border-strong'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-text-heading">{expert.name}</p>
                        {selectedExpert === expert.id && (
                          <div className="w-5 h-5 rounded-full bg-brand-dark flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-text-body">{expert.role}</p>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {expert.specializations.map((spec, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-surface-page text-text-label">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Current Students Count */}
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-1 text-sm text-text-label">
                        <Users className="w-4 h-4 text-text-body" />
                        <span>{expert.assignedStudents} students</span>
                      </div>
                      <p className="text-xs text-text-body mt-1">currently assigned</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredExperts.length === 0 && (
              <p className="text-center text-text-body py-8">No experts found</p>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-4 border-border-default bg-surface-page">
          <CardContent className="py-4">
            <p className="text-sm text-text-label">
              <strong>Note:</strong> Assigning a behavioral expert will allow them to view
              the student's behavior profile, incident history, and provide specialized
              intervention support. The expert will be notified of this assignment.
            </p>
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
            disabled={!selectedExpert}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Assign Expert
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
