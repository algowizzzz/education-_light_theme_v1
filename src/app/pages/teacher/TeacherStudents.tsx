import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, ChevronRight } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
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
import { STUDENTS } from '@/data/constants';

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  let filteredStudents = [...STUDENTS];

  // Filter by search term
  if (searchTerm) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by grade
  if (gradeFilter !== 'all') {
    filteredStudents = filteredStudents.filter(
      (student) => student.grade === parseInt(gradeFilter)
    );
  }

  // Sort
  if (sortBy === 'name-asc') {
    filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    filteredStudents.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-heading">Students</h1>
          <p className="text-sm md:text-base text-text-body">Search and view your assigned students</p>
        </div>

        <Card className="p-6 border border-border-default bg-surface-card">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
              <Input
                type="text"
                placeholder="Search by name or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border-default focus:border-brand"
              />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-full md:w-[180px] border-border-default">
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] border-border-default">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="recent">Recently Accessed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student Count */}
          <p className="text-sm text-text-body mb-4">
            Showing {filteredStudents.length} of {STUDENTS.length} students
          </p>

          {/* Students - Mobile Card View */}
          {filteredStudents.length > 0 ? (
            <>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 border border-border-light rounded-lg hover:bg-surface-page cursor-pointer active:bg-surface-elevated transition-colors"
                    onClick={() => navigate(`/teacher/students/${student.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-text-body" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-heading">{student.name}</h3>
                          <p className="text-sm text-text-body">Grade {student.grade}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-muted" />
                    </div>
                    <div className="mt-3 pt-3 border-t border-border-light flex items-center justify-between text-sm">
                      <span className="text-text-body">{student.id}</span>
                      <span className="text-text-label">{student.primaryTeacher}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block border border-border-light rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-surface-page">
                      <TableHead className="text-text-heading font-semibold">Name</TableHead>
                      <TableHead className="text-text-heading font-semibold">Student ID</TableHead>
                      <TableHead className="text-text-heading font-semibold">Grade</TableHead>
                      <TableHead className="text-text-heading font-semibold">Class</TableHead>
                      <TableHead className="text-text-heading font-semibold text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        className="hover:bg-surface-page cursor-pointer"
                        onClick={() => navigate(`/teacher/students/${student.id}`)}
                      >
                        <TableCell className="font-medium text-text-heading">
                          {student.name}
                        </TableCell>
                        <TableCell className="text-text-label">{student.id}</TableCell>
                        <TableCell className="text-text-label">Grade {student.grade}</TableCell>
                        <TableCell className="text-text-label">
                          {student.primaryTeacher}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border-default text-text-heading hover:bg-surface-page rounded-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/teacher/students/${student.id}`);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-body">No students found matching your search.</p>
            </div>
          )}
        </Card>
      </div>
    </TeacherLayout>
  );
}