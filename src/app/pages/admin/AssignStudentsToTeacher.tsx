import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Search, CheckCircle2 } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function AssignStudentsToTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([
    'S-2024-0123', // Pre-selected students
    'S-2024-0124',
  ]);

  const teacherName = 'Maria Johnson'; // Mock data

  const filteredStudents = STUDENTS.filter((student) =>
    searchTerm === '' ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSave = () => {
    toast.success('Student assignments updated successfully');
    navigate('/admin/teachers');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-surface-card border-b border-border-default px-8 py-4 mb-8">
        <div>
          <Link to="/admin/teachers" className="text-text-label hover:text-text-heading text-sm mb-2 block">
            ← Back to Teacher Management
          </Link>
          <h1 className="text-2xl text-text-heading">Assign Students to {teacherName}</h1>
          <p className="text-sm text-text-body mt-1">Teacher ID: {id}</p>
        </div>
      </header>

      <div className="px-8 pb-8 max-w-4xl">
        <Card className="border-border-default p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-text-heading" />
            <div>
              <h2 className="text-lg font-medium text-text-heading">Currently Assigned</h2>
              <p className="text-sm text-text-body">{selectedStudents.length} students selected</p>
            </div>
          </div>
        </Card>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
          <Input
            placeholder="Search students by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-border-default text-text-heading"
          />
        </div>

        <div className="bg-surface-card border border-border-default rounded-lg overflow-hidden mb-6">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-surface-page border-b border-border-default">
                <tr className="bg-table-header-bg">
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text w-12"></th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Grade</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Current Teacher</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <tr
                      key={student.id}
                      className={`border-b border-border-light hover:bg-table-row-hover cursor-pointer ${
                        index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                      } ${isSelected ? 'bg-surface-elevated' : ''}`}
                      onClick={() => toggleStudent(student.id)}
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleStudent(student.id)}
                        />
                      </td>
                      <td className="p-4 text-text-heading font-medium">{student.name}</td>
                      <td className="p-4 text-text-label">{student.id}</td>
                      <td className="p-4 text-text-label">Grade {student.grade}</td>
                      <td className="p-4 text-text-body">{student.primaryTeacher}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/teachers')}
            className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Save Student Assignments
          </Button>
        </div>
      </div>
    </div>
  );
}
