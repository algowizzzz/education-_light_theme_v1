import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft } from 'lucide-react';

export default function AddTeacher() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@lincolnelementary.edu',
    role: '',
    grades: ['2'] as string[],
    subjects: '',
    phone: '(555) 789-4561',
    sendWelcomeEmail: true,
    teacherType: 'classroom',
    periods: ['Morning', 'Afternoon'] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const teacherName = `${formData.firstName} ${formData.lastName}`;
    
    // Navigate to success screen with teacher data
    navigate('/admin/teachers/success', {
      state: {
        teacherName,
        email: formData.email
      }
    });
  };

  const gradeOptions = ['K', '1', '2', '3', '4', '5'];
  const periodOptions = ['Morning', 'Afternoon', 'Full Day', 'Specials', 'Support'];

  const toggleGrade = (grade: string) => {
    setFormData(prev => ({
      ...prev,
      grades: prev.grades.includes(grade)
        ? prev.grades.filter(g => g !== grade)
        : [...prev.grades, grade]
    }));
  };

  const togglePeriod = (period: string) => {
    setFormData(prev => ({
      ...prev,
      periods: prev.periods.includes(period)
        ? prev.periods.filter(p => p !== period)
        : [...prev.periods, period]
    }));
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/teachers')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teachers
          </Button>
          <h1 className="text-2xl mb-2">Add New Teacher</h1>
          <p className="text-text-body">Create a new teacher account and configure access permissions</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Account Information */}
          <Card className="mb-6 border-border-default">
            <CardHeader className="bg-surface-page">
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="teacher@lincolnelementary.edu"
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(123) 456-7890"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendWelcomeEmail"
                  checked={formData.sendWelcomeEmail}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, sendWelcomeEmail: checked as boolean })
                  }
                />
                <Label htmlFor="sendWelcomeEmail" className="cursor-pointer">
                  Send welcome email with login instructions
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Role & Assignment */}
          <Card className="mb-6 border-border-default">
            <CardHeader className="bg-surface-page">
              <CardTitle>Role & Assignment</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Label htmlFor="teacherType">Teacher Type *</Label>
                <Select
                  value={formData.teacherType}
                  onValueChange={(value) => setFormData({ ...formData, teacherType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select teacher type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classroom">Classroom Teacher</SelectItem>
                    <SelectItem value="substitute">Substitute Teacher</SelectItem>
                    <SelectItem value="specialist">Specialist (PE, Art, Music)</SelectItem>
                    <SelectItem value="support">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Label>Grade Levels *</Label>
                <p className="text-xs text-text-body mb-2">Select all grades this teacher will work with</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {gradeOptions.map((grade) => (
                    <div key={grade} className="flex items-center space-x-2">
                      <Checkbox
                        id={`grade-${grade}`}
                        checked={formData.grades?.includes(grade) || false}
                        onCheckedChange={() => toggleGrade(grade)}
                      />
                      <Label htmlFor={`grade-${grade}`} className="cursor-pointer">
                        {grade === 'K' ? 'Kindergarten' : `Grade ${grade}`}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Class Periods</Label>
                <p className="text-xs text-text-body mb-2">Select teaching schedule</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {periodOptions.map((period) => (
                    <div key={period} className="flex items-center space-x-2">
                      <Checkbox
                        id={`period-${period}`}
                        checked={formData.periods?.includes(period) || false}
                        onCheckedChange={() => togglePeriod(period)}
                      />
                      <Label htmlFor={`period-${period}`} className="cursor-pointer">
                        {period}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="mb-6 border-border-default bg-surface-page">
            <CardContent className="py-4">
              <p className="text-sm text-text-label">
                <strong>Note:</strong> After creating the account, you can assign specific students
                to this teacher from the teacher management page. The teacher will receive login
                credentials via email if the welcome email option is enabled.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/teachers')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.teacherType || formData.grades.length === 0}
              className="flex-1 bg-brand hover:bg-brand-dark"
            >
              Create Teacher Account
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}