import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Users } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function NewIncidentStep2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student');
  const student = STUDENTS.find((s) => s.id === studentId);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
  );
  const [classPeriod, setClassPeriod] = useState('Period 2');
  const [location, setLocation] = useState('Classroom');
  const [category, setCategory] = useState('Disruption');
  const [severity, setSeverity] = useState('Minor');

  const handleNext = () => {
    if (!classPeriod || !location || !category || !severity) {
      toast.error('Please fill in all required fields');
      return;
    }
    const params = new URLSearchParams({
      student: studentId || '',
      date,
      time,
      classPeriod,
      location,
      category,
      severity,
    });
    navigate(`/teacher/incidents/new/step3?${params.toString()}`);
  };

  const handleBack = () => {
    navigate('/teacher/incidents/new');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
  };

  if (!student) {
    return null;
  }

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/teacher/incidents/new"
          className="inline-flex items-center text-text-label hover:text-text-heading"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-text-heading">Log New Incident</h1>
          <p className="text-text-body">Step 2 of 4: Incident Details</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
        </div>

        {/* Student Info */}
        <Card className="p-4 border border-border-default bg-surface-page">
          <p className="text-sm text-text-body">Student:</p>
          <p className="font-semibold text-text-heading">
            {student.name} • {student.id} • Grade {student.grade}
          </p>
        </Card>

        {/* Form */}
        <Card className="p-6 border border-border-default bg-surface-card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <Label htmlFor="date" className="text-text-heading">
                Date <span className="text-status-error">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 border-border-default focus:border-brand"
              />
            </div>

            {/* Time */}
            <div>
              <Label htmlFor="time" className="text-text-heading">
                Time <span className="text-status-error">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 border-border-default focus:border-brand"
              />
            </div>
          </div>

          {/* Class/Period */}
          <div>
            <Label htmlFor="class" className="text-text-heading">
              Class/Period <span className="text-status-error">*</span>
            </Label>
            <Select value={classPeriod} onValueChange={setClassPeriod}>
              <SelectTrigger className="mt-1 border-border-default">
                <SelectValue placeholder="Select class or period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="social-studies">Social Studies</SelectItem>
                <SelectItem value="pe">PE</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="recess">Recess</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-text-heading">
              Location <span className="text-status-error">*</span>
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="mt-1 border-border-default">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classroom">Classroom</SelectItem>
                <SelectItem value="hallway">Hallway</SelectItem>
                <SelectItem value="cafeteria">Cafeteria</SelectItem>
                <SelectItem value="playground">Playground</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="library">Library</SelectItem>
                <SelectItem value="restroom">Restroom</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Behavior Category */}
          <div>
            <Label htmlFor="category" className="text-text-heading">
              Behavior Category <span className="text-status-error">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1 border-border-default">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disruptive">Disruptive</SelectItem>
                <SelectItem value="defiant">Defiant</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="verbal">Verbal</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="property-damage">Property Damage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Severity */}
          <div>
            <Label className="text-text-heading mb-3 block">
              Severity Level <span className="text-status-error">*</span>
            </Label>
            <RadioGroup value={severity} onValueChange={setSeverity}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">Low</div>
                    <div className="text-sm text-text-body">Minor disruption, easily redirected</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">Medium</div>
                    <div className="text-sm text-text-body">Moderate disruption, requires intervention</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">High</div>
                    <div className="text-sm text-text-body">Significant disruption, multiple strategies needed</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="critical" id="critical" />
                  <Label htmlFor="critical" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">Critical</div>
                    <div className="text-sm text-text-body">Safety concern, immediate intervention required</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-brand-dark/40 text-brand-dark hover:bg-status-info-soft rounded-lg"
          >
            ← Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="border-brand-dark/40 text-brand-dark hover:bg-status-info-soft rounded-lg"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleNext}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm rounded-lg"
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}