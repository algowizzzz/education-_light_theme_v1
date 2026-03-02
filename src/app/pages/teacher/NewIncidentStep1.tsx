import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, User } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { STUDENTS } from '@/data/constants';

export default function NewIncidentStep1() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const recentStudents = STUDENTS.slice(0, 3);
  
  const filteredStudents = searchTerm
    ? STUDENTS.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : STUDENTS;

  const handleNext = () => {
    if (selectedStudent) {
      navigate(`/teacher/incidents/new/step2?student=${selectedStudent}`);
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/teacher/dashboard"
          className="inline-flex items-center text-text-label hover:text-text-heading"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancel
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-text-heading">Log New Incident</h1>
          <p className="text-text-body">Step 1 of 5: Select Student</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
        </div>

        {/* Search */}
        <Card className="p-6 border border-border-default bg-surface-card">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
            <Input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border-default focus:border-brand"
            />
          </div>

          {/* Recently Accessed */}
          {!searchTerm && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-text-heading mb-3">
                Recently Accessed Students
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {recentStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedStudent === student.id
                        ? 'border-brand bg-surface-page'
                        : 'border-border-default hover:bg-surface-page'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center">
                        <User className="w-5 h-5 text-text-body" />
                      </div>
                      <div>
                        <p className="font-medium text-text-heading">{student.name}</p>
                        <p className="text-sm text-text-body">Grade {student.grade}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Students */}
          <div>
            <h3 className="text-sm font-semibold text-text-heading mb-3">
              {searchTerm ? 'Search Results' : 'All Assigned Students'}
            </h3>
            <RadioGroup value={selectedStudent} onValueChange={setSelectedStudent}>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center space-x-3 p-3 border border-border-light rounded-lg hover:bg-surface-page"
                  >
                    <RadioGroupItem value={student.id} id={student.id} />
                    <Label
                      htmlFor={student.id}
                      className="flex-1 cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-medium text-text-heading">
                        {student.name}
                      </span>
                      <span className="text-sm text-text-body">
                        {student.id} • Grade {student.grade}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/teacher/dashboard')}
            className="border-border-default text-text-heading hover:bg-surface-page rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedStudent}
            className="bg-brand hover:bg-brand-dark text-white rounded-lg disabled:opacity-50"
          >
            Next →
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}