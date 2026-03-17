import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Search, Check } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

const TEACHERS = [
  { id: '1', name: 'Mrs. Maria Johnson', role: '4th Grade Lead Teacher', grade: 4 },
  { id: '2', name: 'Mr. Michael Brown', role: '3rd Grade Teacher', grade: 3 },
  { id: '3', name: 'Mrs. Sarah Wilson', role: '5th Grade Teacher', grade: 5 },
  { id: '4', name: 'Mr. James Taylor', role: '2nd Grade Teacher', grade: 2 },
  { id: '5', name: 'Ms. Patricia Lopez', role: 'PE Teacher K-5', grade: null },
  { id: '6', name: 'Mr. David Peters', role: 'Substitute Teacher', grade: null },
];

export default function AssignStudentToTeacher() {
  const navigate = useNavigate();
  const { id: studentId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  // Find the student
  const student = STUDENTS.find(s => s.id === studentId);

  const filteredTeachers = TEACHERS.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedTeacher) {
      const teacher = TEACHERS.find(t => t.id === selectedTeacher);
      toast.success(`${student?.name} has been assigned to ${teacher?.name}`);
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
          <h1 className="text-2xl mb-2">Assign Student to Teacher</h1>
          <p className="text-text-body">Select a teacher to assign to {student.name}</p>
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
                <Label className="text-sm text-text-body">Current Teacher</Label>
                <p className="text-text-heading">{student.primaryTeacher}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Selection */}
        <Card className="border-border-default">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-body" />
              <Input
                type="text"
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Teacher List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTeacher === teacher.id
                      ? 'border-brand-dark bg-surface-page'
                      : 'border-border-default hover:border-border-strong'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-heading">{teacher.name}</p>
                      <p className="text-sm text-text-body">{teacher.role}</p>
                    </div>
                    {selectedTeacher === teacher.id && (
                      <div className="w-6 h-6 rounded-full bg-brand-dark flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <p className="text-center text-text-body py-8">No teachers found</p>
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
            disabled={!selectedTeacher}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Assign Teacher
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
