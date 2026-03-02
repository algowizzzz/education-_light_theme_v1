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

interface TeacherEntry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  grade: string;
  errors?: string[];
}

const ROLES = [
  'Lead Teacher',
  'Teacher',
  'Assistant Teacher',
  'Substitute Teacher',
  'PE Teacher',
  'Art Teacher',
  'Music Teacher',
];

export default function BulkImportTeachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<TeacherEntry[]>([
    { id: '1', firstName: '', lastName: '', email: '', role: '', grade: '' },
  ]);
  const [importMode, setImportMode] = useState<'manual' | 'csv'>('manual');
  const [csvData, setCsvData] = useState<string>('');
  const [validationResults, setValidationResults] = useState<{ valid: number; invalid: number } | null>(null);

  const addTeacherRow = () => {
    setTeachers([
      ...teachers,
      { id: Date.now().toString(), firstName: '', lastName: '', email: '', role: '', grade: '' },
    ]);
  };

  const removeTeacherRow = (id: string) => {
    if (teachers.length > 1) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const updateTeacher = (id: string, field: keyof TeacherEntry, value: string) => {
    setTeachers(
      teachers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateTeachers = (): boolean => {
    let valid = 0;
    let invalid = 0;

    const validated = teachers.map((teacher) => {
      const errors: string[] = [];
      if (!teacher.firstName.trim()) errors.push('First name required');
      if (!teacher.lastName.trim()) errors.push('Last name required');
      if (!teacher.email.trim()) {
        errors.push('Email required');
      } else if (!validateEmail(teacher.email)) {
        errors.push('Invalid email format');
      }
      if (!teacher.role) errors.push('Role required');

      if (errors.length > 0) {
        invalid++;
      } else {
        valid++;
      }

      return { ...teacher, errors };
    });

    setTeachers(validated);
    setValidationResults({ valid, invalid });
    return invalid === 0;
  };

  const handleCSVParse = () => {
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) {
      toast.error('CSV must have a header row and at least one data row');
      return;
    }

    const parsedTeachers: TeacherEntry[] = [];
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      if (cols.length >= 4) {
        parsedTeachers.push({
          id: Date.now().toString() + i,
          firstName: cols[0] || '',
          lastName: cols[1] || '',
          email: cols[2] || '',
          role: cols[3] || '',
          grade: cols[4] || '',
        });
      }
    }

    if (parsedTeachers.length > 0) {
      setTeachers(parsedTeachers);
      setImportMode('manual');
      toast.success(`Parsed ${parsedTeachers.length} teachers from CSV`);
    } else {
      toast.error('No valid teacher data found in CSV');
    }
  };

  const handleSubmit = () => {
    if (validateTeachers()) {
      toast.success(`${teachers.length} teachers imported successfully`);
      navigate('/admin/teachers');
    } else {
      toast.error('Please fix validation errors before submitting');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/teachers')}
            className="mb-4 text-text-label hover:text-text-heading"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teachers
          </Button>
          <h1 className="text-2xl mb-2">Bulk Import Teachers</h1>
          <p className="text-text-body">Add multiple teachers at once manually or via CSV upload</p>
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
                    <strong>CSV Format:</strong> First Name, Last Name, Email, Role, Grade (optional)
                  </p>
                  <p className="text-xs text-text-body">
                    Example: Maria,Johnson,mjohnson@school.edu,Lead Teacher,4
                  </p>
                </div>
                <div>
                  <Label>Paste CSV Data</Label>
                  <textarea
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    placeholder="FirstName,LastName,Email,Role,Grade
Maria,Johnson,mjohnson@school.edu,Lead Teacher,4
Michael,Brown,mbrown@school.edu,Teacher,3"
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
                <CardTitle className="text-lg">Teacher Entries ({teachers.length})</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addTeacherRow}
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
                      <TableHead className="w-[150px]">First Name</TableHead>
                      <TableHead className="w-[150px]">Last Name</TableHead>
                      <TableHead className="w-[200px]">Email</TableHead>
                      <TableHead className="w-[180px]">Role</TableHead>
                      <TableHead className="w-[120px]">Grade</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id} className={teacher.errors?.length ? 'bg-status-error-soft' : ''}>
                        <TableCell>
                          <Input
                            value={teacher.firstName}
                            onChange={(e) => updateTeacher(teacher.id, 'firstName', e.target.value)}
                            placeholder="First name"
                            className={teacher.errors?.includes('First name required') ? 'border-red-500' : ''}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={teacher.lastName}
                            onChange={(e) => updateTeacher(teacher.id, 'lastName', e.target.value)}
                            placeholder="Last name"
                            className={teacher.errors?.includes('Last name required') ? 'border-red-500' : ''}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={teacher.email}
                            onChange={(e) => updateTeacher(teacher.id, 'email', e.target.value)}
                            placeholder="email@school.edu"
                            type="email"
                            className={
                              teacher.errors?.includes('Email required') ||
                              teacher.errors?.includes('Invalid email format')
                                ? 'border-red-500'
                                : ''
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={teacher.role}
                            onValueChange={(value) => updateTeacher(teacher.id, 'role', value)}
                          >
                            <SelectTrigger className={teacher.errors?.includes('Role required') ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={teacher.grade}
                            onValueChange={(value) => updateTeacher(teacher.id, 'grade', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="K">K</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="all">All</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTeacherRow(teacher.id)}
                            disabled={teachers.length === 1}
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
                  onClick={addTeacherRow}
                  className="border-dashed border-border-default"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Teacher
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="border-border-default bg-surface-page mb-6">
          <CardContent className="py-4">
            <p className="text-sm text-text-label">
              <strong>Note:</strong> Each teacher will receive an email invitation to set up their
              account. They will need to create a password and complete their profile before they
              can access the system.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/teachers')}
            className="border-border-default"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={teachers.length === 0}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Import {teachers.length} Teacher{teachers.length > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
