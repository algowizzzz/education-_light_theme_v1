import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Search } from 'lucide-react';
import { STUDENTS } from '@/data/constants';

export default function ExpertStudentsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [caseFilter, setCaseFilter] = useState('all');

  const studentsWithData = STUDENTS.map((student, index) => ({
    ...student,
    incidentCount: [24, 12, 8, 15, 10, 18, 14, 9, 6][index] || 0,
    hasActiveCase: [true, false, false, false, false, false, false, false, false][index] || false,
  }));

  const filteredStudents = studentsWithData.filter((student) => {
    const matchesSearch =
      searchTerm === '' ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = gradeFilter === 'all' || student.grade.toString() === gradeFilter;
    
    const matchesCase = 
      caseFilter === 'all' ||
      (caseFilter === 'active' && student.hasActiveCase) ||
      (caseFilter === 'none' && !student.hasActiveCase);

    return matchesSearch && matchesGrade && matchesCase;
  });

  return (
    <ExpertLayout>
      <div className="p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">All Students</h1>
          <p className="text-text-label">View and manage behavioral profiles for all assigned students</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
            <Input
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border-default text-text-heading"
            />
          </div>
          <div className="flex gap-2">
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-full md:w-48 border-border-default text-text-heading">
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
            <Select value={caseFilter} onValueChange={setCaseFilter}>
              <SelectTrigger className="w-full md:w-48 border-border-default text-text-heading">
                <SelectValue placeholder="All Cases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="active">Has Active Case</SelectItem>
                <SelectItem value="none">No Active Case</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4 text-sm text-text-body">
          Showing {filteredStudents.length} of {studentsWithData.length} students
        </div>

        {filteredStudents.length === 0 ? (
          <Card className="border-border-default p-12">
            <div className="text-center">
              <p className="text-text-body mb-4">No students found matching your criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setGradeFilter('all');
                  setCaseFilter('all');
                }}
                variant="outline"
                className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <>
          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-surface-card border border-border-default rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-text-heading">{student.name}</h3>
                    <p className="text-sm text-text-body">{student.id} &middot; Grade {student.grade}</p>
                  </div>
                  {student.hasActiveCase && (
                    <Badge className="bg-status-warning-soft text-status-warning border border-status-warning-border text-xs">Active Case</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm border-t border-border-light pt-3 mt-3">
                  <div className="text-text-label">
                    <span>{student.primaryTeacher}</span>
                    <span className="mx-2">&middot;</span>
                    <Badge variant="outline" className="border-border-strong text-text-label text-xs">
                      {student.incidentCount} incidents
                    </Badge>
                  </div>
                  <Link to={`/expert/students/${student.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-surface-card border border-border-default rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-table-header-bg">
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Student ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Grade</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Primary Teacher</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Incidents</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-table-header-text">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b border-border-light hover:bg-table-row-hover ${
                      index % 2 === 0 ? 'bg-surface-card' : 'bg-table-stripe'
                    }`}
                  >
                    <td className="p-4 text-text-heading font-medium">{student.name}</td>
                    <td className="p-4 text-text-label">{student.id}</td>
                    <td className="p-4 text-text-label">Grade {student.grade}</td>
                    <td className="p-4 text-text-label">{student.primaryTeacher}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-border-strong text-text-label">
                        {student.incidentCount}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {student.hasActiveCase ? (
                        <Badge className="bg-status-warning-soft text-status-warning border border-status-warning-border">Active Case</Badge>
                      ) : (
                        <span className="text-sm text-text-body">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Link to={`/expert/students/${student.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        )}
      </div>
    </ExpertLayout>
  );
}