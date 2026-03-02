import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { ArrowLeft, Upload, Plus, Trash2, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface StudentEntry {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  teacherId: string;
  errors?: string[];
}

const TEACHERS = [
  { id: '1', name: 'Mrs. Maria Johnson', grade: 4 },
  { id: '2', name: 'Mr. Michael Brown', grade: 3 },
  { id: '3', name: 'Mrs. Sarah Wilson', grade: 5 },
  { id: '4', name: 'Mr. James Taylor', grade: 2 },
];

export default function BulkImportStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentEntry[]>([
    { id: '1', firstName: '', lastName: '', grade: '', teacherId: '' },
  ]);
  const [importMode, setImportMode] = useState<'manual' | 'csv'>('manual');
  const [csvData, setCsvData] = useState<string>('');
  const [validationResults, setValidationResults] = useState<{ valid: number; invalid: number } | null>(null);

  const addStudentRow = () => {
    setStudents([
      ...students,
      { id: Date.now().toString(), firstName: '', lastName: '', grade: '', teacherId: '' },
    ]);
  };

  const removeStudentRow = (id: string) => {
    if (students.length > 1) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const updateStudent = (id: string, field: keyof StudentEntry, value: string) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const validateStudents = (): boolean => {
    let valid = 0;
    let invalid = 0;

    const validated = students.map((student) => {
      const errors: string[] = [];
      if (!student.firstName.trim()) errors.push('First name required');
      if (!student.lastName.trim()) errors.push('Last name required');
      if (!student.grade) errors.push('Grade required');
      if (!student.teacherId) errors.push('Teacher required');

      if (errors.length > 0) {
        invalid++;
      } else {
        valid++;
      }

      return { ...student, errors };
    });

    setStudents(validated);
    setValidationResults({ valid, invalid });
    return invalid === 0;
  };

  const handleCSVParse = () => {
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) {
      toast.error('CSV must have a header row and at least one data row');
      return;
    }

    const parsedStudents: StudentEntry[] = [];
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      if (cols.length >= 4) {
        parsedStudents.push({
          id: Date.now().toString() + i,
          firstName: cols[0] || '',
          lastName: cols[1] || '',
          grade: cols[2] || '',
          teacherId: cols[3] || '',
        });
      }
    }

    if (parsedStudents.length > 0) {
      setStudents(parsedStudents);
      setImportMode('manual');
      toast.success(`Parsed ${parsedStudents.length} students from CSV`);
    } else {
      toast.error('No valid student data found in CSV');
    }
  };

  const handleSubmit = () => {
    if (validateStudents()) {
      toast.success(`${students.length} students imported successfully`);
      navigate('/admin/students');
    } else {
      toast.error('Please fix validation errors before submitting');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
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
          <h1 className="text-2xl mb-2">Bulk Import Students</h1>
          <p className="text-text-body">Add multiple students at once manually or via CSV upload</p>
        </div>

        {/* Import Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={importMode === 'manual' ? 'default' : 'outline'}
            onClick={() => setImportMode('manual')}
            className={importMode === 'manual' ? 'bg-brand text-white' : 'border-border-default'}
          >
            <Plus className="w-4 h-4 mr-2" />
            Manual Entry
          </Button>
          <Button
            variant={importMode === 'csv' ? 'default' : 'outline'}
            onClick={() => setImportMode('csv')}
            className={importMode === 'csv' ? 'bg-brand text-white' : 'border-border-default'}
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            CSV Import
          </Button>
        </div>

        {/* CSV Import Mode */}
        {importMode === 'csv' && (
          <Card className="border-border-default mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Import from CSV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-surface-page rounded-lg">
                  <p className="text-sm text-text-label mb-2">
                    <strong>CSV Format:</strong> First Name, Last Name, Grade, Teacher ID
                  </p>
                  <p className="text-xs text-text-body">
                    Example: John,Smith,4,1
                  </p>
                </div>
                <div>
                  <Label>Paste CSV Data</Label>
                  <textarea
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    placeholder="FirstName,LastName,Grade,TeacherID
John,Smith,4,1
Jane,Doe,3,2"
                    className="w-full h-40 mt-2 p-3 border border-border-default rounded-lg text-sm font-mono"
                  />
                </div>
                <Button onClick={handleCSVParse} className="bg-brand text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Parse CSV Data
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Manual Entry Mode */}
        {importMode === 'manual' && (
          <Card className="border-border-default mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Student Entries ({students.length})</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addStudentRow}
                  className="border-border-default"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Row
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {validationResults && (
                <div className="mb-4 p-3 rounded-lg flex items-center gap-4 bg-surface-page">
                  <div className="flex items-center gap-2 text-status-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">{validationResults.valid} valid</span>
                  </div>
                  {validationResults.invalid > 0 && (
                    <div className="flex items-center gap-2 text-status-error">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{validationResults.invalid} with errors</span>
                    </div>
                  )}
                </div>
              )}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">First Name</TableHead>
                      <TableHead className="w-[180px]">Last Name</TableHead>
                      <TableHead className="w-[120px]">Grade</TableHead>
                      <TableHead className="w-[200px]">Assign Teacher</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} className={student.errors?.length ? 'bg-status-error-soft' : ''}>
                        <TableCell>
                          <Input
                            value={student.firstName}
                            onChange={(e) => updateStudent(student.id, 'firstName', e.target.value)}
                            placeholder="First name"
                            className={student.errors?.includes('First name required') ? 'border-red-500' : ''}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={student.lastName}
                            onChange={(e) => updateStudent(student.id, 'lastName', e.target.value)}
                            placeholder="Last name"
                            className={student.errors?.includes('Last name required') ? 'border-red-500' : ''}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={student.grade}
                            onValueChange={(value) => updateStudent(student.id, 'grade', value)}
                          >
                            <SelectTrigger className={student.errors?.includes('Grade required') ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="K">Kindergarten</SelectItem>
                              <SelectItem value="1">Grade 1</SelectItem>
                              <SelectItem value="2">Grade 2</SelectItem>
                              <SelectItem value="3">Grade 3</SelectItem>
                              <SelectItem value="4">Grade 4</SelectItem>
                              <SelectItem value="5">Grade 5</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={student.teacherId}
                            onValueChange={(value) => updateStudent(student.id, 'teacherId', value)}
                          >
                            <SelectTrigger className={student.errors?.includes('Teacher required') ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {TEACHERS.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStudentRow(student.id)}
                            disabled={students.length === 1}
                            className="text-text-body hover:text-status-error"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={addStudentRow}
                  className="border-dashed border-border-default"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Student
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/students')}
            className="border-border-default"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={students.length === 0}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Import {students.length} Student{students.length > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
