import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
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
import { ArrowLeft, Plus, Trash2, Search, Link2, AlertCircle, CheckCircle, FileSpreadsheet, Upload } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

interface LinkEntry {
  id: string;
  parentId: string;
  studentId: string;
  errors?: string[];
}

const PARENTS = [
  { id: 'P-001', name: 'Lisa & Robert Thompson', email: 'thompson.family@email.com' },
  { id: 'P-002', name: 'David & May Chen', email: 'chen.family@email.com' },
  { id: 'P-003', name: 'Maria Rodriguez', email: 'mrodriguez@email.com' },
  { id: 'P-004', name: 'Carlos & Ana Garcia', email: 'garcia.family@email.com' },
  { id: 'P-005', name: 'Elena Martinez', email: 'emartinez@email.com' },
  { id: 'P-006', name: 'John & Susan Adams', email: 'adams.family@email.com' },
];

export default function BulkLinkParentsToStudents() {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkEntry[]>([
    { id: '1', parentId: '', studentId: '' },
  ]);
  const [importMode, setImportMode] = useState<'manual' | 'csv'>('manual');
  const [csvData, setCsvData] = useState<string>('');
  const [validationResults, setValidationResults] = useState<{ valid: number; invalid: number } | null>(null);

  const addLinkRow = () => {
    setLinks([
      ...links,
      { id: Date.now().toString(), parentId: '', studentId: '' },
    ]);
  };

  const removeLinkRow = (id: string) => {
    if (links.length > 1) {
      setLinks(links.filter((l) => l.id !== id));
    }
  };

  const updateLink = (id: string, field: 'parentId' | 'studentId', value: string) => {
    setLinks(
      links.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const validateLinks = (): boolean => {
    let valid = 0;
    let invalid = 0;

    const validated = links.map((link) => {
      const errors: string[] = [];
      if (!link.parentId) errors.push('Parent required');
      if (!link.studentId) errors.push('Student required');

      // Check for duplicate links
      const duplicates = links.filter(
        (l) => l.id !== link.id && l.parentId === link.parentId && l.studentId === link.studentId
      );
      if (duplicates.length > 0 && link.parentId && link.studentId) {
        errors.push('Duplicate link');
      }

      if (errors.length > 0) {
        invalid++;
      } else {
        valid++;
      }

      return { ...link, errors };
    });

    setLinks(validated);
    setValidationResults({ valid, invalid });
    return invalid === 0;
  };

  const handleCSVParse = () => {
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) {
      toast.error('CSV must have a header row and at least one data row');
      return;
    }

    const parsedLinks: LinkEntry[] = [];
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      if (cols.length >= 2) {
        parsedLinks.push({
          id: Date.now().toString() + i,
          parentId: cols[0] || '',
          studentId: cols[1] || '',
        });
      }
    }

    if (parsedLinks.length > 0) {
      setLinks(parsedLinks);
      setImportMode('manual');
      toast.success(`Parsed ${parsedLinks.length} parent-student links from CSV`);
    } else {
      toast.error('No valid link data found in CSV');
    }
  };

  const handleSubmit = () => {
    if (validateLinks()) {
      toast.success(`${links.length} parent-student link${links.length > 1 ? 's' : ''} created successfully`);
      navigate('/admin/parents');
    } else {
      toast.error('Please fix validation errors before submitting');
    }
  };

  const getParentName = (parentId: string) => {
    return PARENTS.find((p) => p.id === parentId)?.name || '';
  };

  const getStudentName = (studentId: string) => {
    return STUDENTS.find((s) => s.id === studentId)?.name || '';
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/parents')}
            className="mb-4 text-text-label hover:text-text-heading"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Parents
          </Button>
          <h1 className="text-2xl mb-2">Bulk Link Parents to Students</h1>
          <p className="text-text-body">Create multiple parent-student links at once</p>
        </div>

        {/* Import Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={importMode === 'manual' ? 'default' : 'outline'}
            onClick={() => setImportMode('manual')}
            className={importMode === 'manual' ? 'bg-brand text-white' : 'border-border-default'}
          >
            <Link2 className="w-4 h-4 mr-2" />
            Manual Linking
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
              <CardTitle className="text-lg">Import Links from CSV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-surface-page rounded-lg">
                  <p className="text-sm text-text-label mb-2">
                    <strong>CSV Format:</strong> Parent ID, Student ID
                  </p>
                  <p className="text-xs text-text-body">
                    Example: P-001,STU-001
                  </p>
                </div>
                <div>
                  <Label>Paste CSV Data</Label>
                  <textarea
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    placeholder="ParentID,StudentID
P-001,STU-001
P-002,STU-002"
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

        {/* Manual Linking Mode */}
        {importMode === 'manual' && (
          <Card className="border-border-default mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Parent-Student Links ({links.length})</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addLinkRow}
                  className="border-border-default"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
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
                      <TableHead className="w-[300px]">Parent</TableHead>
                      <TableHead className="w-[300px]">Student</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {links.map((link) => (
                      <TableRow key={link.id} className={link.errors?.length ? 'bg-status-error-soft' : ''}>
                        <TableCell>
                          <Select
                            value={link.parentId}
                            onValueChange={(value) => updateLink(link.id, 'parentId', value)}
                          >
                            <SelectTrigger
                              className={
                                link.errors?.includes('Parent required') ? 'border-red-500' : ''
                              }
                            >
                              <SelectValue placeholder="Select parent" />
                            </SelectTrigger>
                            <SelectContent>
                              {PARENTS.map((parent) => (
                                <SelectItem key={parent.id} value={parent.id}>
                                  <div>
                                    <span>{parent.name}</span>
                                    <span className="text-xs text-text-body ml-2">
                                      ({parent.email})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={link.studentId}
                            onValueChange={(value) => updateLink(link.id, 'studentId', value)}
                          >
                            <SelectTrigger
                              className={
                                link.errors?.includes('Student required') ? 'border-red-500' : ''
                              }
                            >
                              <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                            <SelectContent>
                              {STUDENTS.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                  <div>
                                    <span>{student.name}</span>
                                    <span className="text-xs text-text-body ml-2">
                                      (Grade {student.grade})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLinkRow(link.id)}
                            disabled={links.length === 1}
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
                  onClick={addLinkRow}
                  className="border-dashed border-border-default"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Link
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Card */}
        {links.some((l) => l.parentId && l.studentId) && (
          <Card className="border-border-default mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Link Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {links
                  .filter((l) => l.parentId && l.studentId)
                  .map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-3 p-3 bg-surface-page rounded-lg"
                    >
                      <Badge variant="secondary" className="bg-surface-card">
                        {getParentName(link.parentId)}
                      </Badge>
                      <Link2 className="w-4 h-4 text-text-body" />
                      <Badge variant="secondary" className="bg-surface-card">
                        {getStudentName(link.studentId)}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="border-border-default bg-surface-page mb-6">
          <CardContent className="py-4">
            <p className="text-sm text-text-label">
              <strong>Note:</strong> Linking a parent to a student will give the parent access to
              view their child's behavior profile, incidents, and communication from teachers and
              behavioral experts. Parents will be notified of new links via email.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/parents')}
            className="border-border-default"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={links.length === 0}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Create {links.length} Link{links.length > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
