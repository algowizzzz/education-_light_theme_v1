import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { ArrowLeft, Search, Users, Check, ChevronRight, Brain } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

const EXPERTS = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    role: 'Lead Behavioral Specialist',
    assignedStudents: 45,
    specializations: ['ADHD', 'Anxiety', 'General Behavior'],
  },
  {
    id: '2',
    name: 'Robert Chen',
    role: 'Behavioral Specialist - SpEd',
    assignedStudents: 28,
    specializations: ['Special Education', 'Autism Spectrum', 'Learning Disabilities'],
  },
  {
    id: '3',
    name: 'Jennifer Adams',
    role: 'Behavioral Specialist',
    assignedStudents: 32,
    specializations: ['Social Skills', 'Emotional Regulation', 'Conflict Resolution'],
  },
  {
    id: '4',
    name: 'Dr. Michael Torres',
    role: 'Senior Behavioral Specialist',
    assignedStudents: 38,
    specializations: ['Trauma-Informed Care', 'Crisis Intervention', 'Family Counseling'],
  },
];

export default function BulkAssignStudentsToExpert() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  const expert = EXPERTS.find((e) => e.id === selectedExpert);

  const filteredStudents = STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.grade.toString() === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleAllFiltered = () => {
    const filteredIds = filteredStudents.map((s) => s.id);
    const allSelected = filteredIds.every((id) => selectedStudents.includes(id));

    if (allSelected) {
      setSelectedStudents((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      setSelectedStudents((prev) => [...new Set([...prev, ...filteredIds])]);
    }
  };

  const handleAssign = () => {
    if (selectedExpert && selectedStudents.length > 0) {
      toast.success(
        `${selectedStudents.length} student${selectedStudents.length > 1 ? 's' : ''} assigned to ${expert?.name}`
      );
      navigate('/admin/students');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => (step === 2 ? setStep(1) : navigate('/admin/students'))}
            className="mb-4 text-text-label hover:text-text-heading"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 2 ? 'Back to Expert Selection' : 'Back to Students'}
          </Button>
          <h1 className="text-2xl mb-2">Bulk Assign Students to Behavioral Expert</h1>
          <p className="text-text-body">
            {step === 1
              ? 'Step 1: Select a behavioral expert to assign students to'
              : `Step 2: Select students to assign to ${expert?.name}`}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-brand text-white' : 'bg-surface-elevated text-text-body'
            }`}
          >
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <div className={`flex-1 h-1 ${step > 1 ? 'bg-brand' : 'bg-surface-elevated'}`} />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-brand text-white' : 'bg-surface-elevated text-text-body'
            }`}
          >
            2
          </div>
        </div>

        {/* Step 1: Select Expert */}
        {step === 1 && (
          <Card className="border-border-default">
            <CardHeader>
              <CardTitle className="text-lg">Select Behavioral Expert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {EXPERTS.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => setSelectedExpert(e.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedExpert === e.id
                        ? 'border-brand bg-surface-page'
                        : 'border-border-default hover:border-border-strong'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-text-heading">{e.name}</p>
                          {selectedExpert === e.id && (
                            <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-text-body">{e.role}</p>

                        {/* Specializations */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {e.specializations.map((spec, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-surface-page text-text-label"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Current Students Count */}
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-1 text-sm text-text-label">
                          <Users className="w-4 h-4 text-text-body" />
                          <span>{e.assignedStudents} students</span>
                        </div>
                        <p className="text-xs text-text-body mt-1">currently assigned</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedExpert}
                  className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  Continue to Select Students
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Students */}
        {step === 2 && (
          <>
            {/* Selected Expert Info */}
            <Card className="border-border-default mb-4">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-status-info-soft flex items-center justify-center">
                      <Brain className="w-5 h-5 text-status-info" />
                    </div>
                    <div>
                      <p className="text-sm text-text-body">Assigning to:</p>
                      <p className="font-medium text-text-heading">{expert?.name}</p>
                      <p className="text-sm text-text-body">{expert?.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-text-label">
                      <Users className="w-4 h-4 text-text-body" />
                      <span>{expert?.assignedStudents} students currently assigned</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-body" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-border-default"
                />
              </div>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-40 border-border-default">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selection Summary */}
            {selectedStudents.length > 0 && (
              <div className="mb-4 p-3 bg-surface-page border border-border-default rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium text-text-heading">
                  {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStudents([])}
                  className="text-text-body"
                >
                  Clear selection
                </Button>
              </div>
            )}

            {/* Student List */}
            <Card className="border-border-default">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Select Students</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAllFiltered}
                    className="border-border-default"
                  >
                    {filteredStudents.every((s) => selectedStudents.includes(s.id))
                      ? 'Deselect All'
                      : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudents.includes(student.id);
                    return (
                      <div
                        key={student.id}
                        onClick={() => toggleStudent(student.id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors flex items-center gap-3 ${
                          isSelected
                            ? 'border-brand bg-surface-page'
                            : 'border-border-default hover:border-border-strong'
                        }`}
                      >
                        <Checkbox checked={isSelected} />
                        <div className="flex-1">
                          <p className="font-medium text-text-heading">{student.name}</p>
                          <p className="text-sm text-text-body">
                            {student.id} - Grade {student.grade} - Teacher: {student.primaryTeacher}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredStudents.length === 0 && (
                  <p className="text-center text-text-body py-8">No students found</p>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mt-4 border-border-default bg-surface-page">
              <CardContent className="py-4">
                <p className="text-sm text-text-label">
                  <strong>Note:</strong> Assigning students to a behavioral expert will allow them
                  to view the students' behavior profiles, incident history, and provide
                  specialized intervention support. The expert will be notified of these
                  assignments.
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
                disabled={selectedStudents.length === 0}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                Assign {selectedStudents.length} Student{selectedStudents.length > 1 ? 's' : ''}
              </Button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
