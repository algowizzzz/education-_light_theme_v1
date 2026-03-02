import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Link } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function LinkParentToStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const parentName = 'Jennifer Rodriguez'; // Mock data
  const currentlyLinkedStudents = ['S-2024-0123']; // Mock: already linked student IDs

  const filteredStudents = STUDENTS.filter((student) => {
    const matchesSearch =
      searchTerm === '' ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Don't show already linked students
    const notLinked = !currentlyLinkedStudents.includes(student.id);
    
    return matchesSearch && notLinked;
  });

  const handleLink = () => {
    if (!selectedStudent) {
      toast.error('Please select a student to link');
      return;
    }
    toast.success('Student linked successfully');
    navigate('/admin/parents');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-surface-card border-b border-border-default px-8 py-4 mb-8">
        <div>
          <Link to="/admin/parents" className="text-text-label hover:text-text-heading text-sm mb-2 block">
            ← Back to Parent Management
          </Link>
          <h1 className="text-2xl text-text-heading">Link Student to Parent Account</h1>
          <p className="text-sm text-text-body mt-1">Parent: {parentName} (ID: {id})</p>
        </div>
      </header>

      <div className="px-8 pb-8 max-w-4xl">
        <Card className="border-border-default p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-5 h-5 text-text-heading" />
            <div>
              <h2 className="text-lg font-medium text-text-heading">Link Additional Student</h2>
              <p className="text-sm text-text-body">
                Select a student to link to this parent's account
              </p>
            </div>
          </div>

          <div className="bg-surface-page p-4 rounded-lg mb-6">
            <p className="text-sm text-text-body mb-1">Currently Linked Students</p>
            <p className="text-text-heading font-medium">
              {currentlyLinkedStudents.length} student(s) already linked
            </p>
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

        {filteredStudents.length === 0 ? (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <p className="text-text-body mb-2">No available students found</p>
              <p className="text-sm text-text-body">All students may already be linked to this account</p>
            </div>
          </Card>
        ) : (
          <div className="bg-surface-card border border-border-default rounded-lg overflow-hidden mb-6">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-surface-page border-b border-border-default">
                  <tr className="bg-table-header-bg">
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student Name</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Grade</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Primary Teacher</th>
                    <th className="text-left p-4 text-sm font-semibold text-table-header-text">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => {
                    const isSelected = selectedStudent === student.id;
                    return (
                      <tr
                        key={student.id}
                        className={`border-b border-border-light hover:bg-table-row-hover ${
                          index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                        } ${isSelected ? 'bg-surface-elevated' : ''}`}
                      >
                        <td className="p-4 text-text-heading font-medium">{student.name}</td>
                        <td className="p-4 text-text-label">{student.id}</td>
                        <td className="p-4 text-text-label">Grade {student.grade}</td>
                        <td className="p-4 text-text-body">{student.primaryTeacher}</td>
                        <td className="p-4">
                          <Button
                            variant={isSelected ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedStudent(student.id)}
                            className={isSelected 
                              ? 'bg-brand hover:bg-brand-dark text-white'
                              : 'border-border-strong text-text-heading hover:bg-surface-page'
                            }
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/parents')}
            className="border-border-strong text-text-heading hover:bg-surface-page"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLink}
            disabled={!selectedStudent}
            className="bg-brand hover:bg-brand-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Link Selected Student
          </Button>
        </div>
      </div>
    </div>
  );
}
