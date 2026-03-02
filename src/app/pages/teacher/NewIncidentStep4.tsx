import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, STAFF } from '@/data/constants';
import { toast } from 'sonner';

export default function NewIncidentStep4() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student');
  const student = STUDENTS.find((s) => s.id === studentId);

  const [notes, setNotes] = useState('Student became frustrated during group work transition. After verbal redirection, student was able to move to independent workspace and complete assignment successfully.');
  const [outcome, setOutcome] = useState('resolved');
  const [expertId, setExpertId] = useState('');
  const [escalationNote, setEscalationNote] = useState('');

  const experts = Object.values(STAFF).filter(s => s.id.startsWith('BE-'));

  const handleSubmit = () => {
    if (!outcome) {
      toast.error('Please select an outcome');
      return;
    }

    if (outcome === 'escalated' && !expertId) {
      toast.error('Please select a behavioral expert');
      return;
    }

    const incidentId = `ESC-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    
    navigate('/teacher/incidents/new/confirmation', {
      state: {
        incidentId,
        student,
        date: searchParams.get('date'),
        time: searchParams.get('time'),
        location: searchParams.get('location'),
        category: searchParams.get('category'),
        severity: searchParams.get('severity'),
        triggers: searchParams.get('triggers'),
        strategies: searchParams.get('strategies'),
        notes,
        outcome,
        expertId,
      },
    });

    toast.success('Incident submitted successfully!');
  };

  const handleBack = () => {
    navigate(`/teacher/incidents/new/triggers?${searchParams.toString()}`);
  };

  if (!student) {
    return null;
  }

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to={`/teacher/incidents/new/triggers?${searchParams.toString()}`}
          className="inline-flex items-center text-text-label hover:text-text-heading"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-text-heading">Log New Incident</h1>
          <p className="text-text-body">Step 4 of 4: Notes & Outcome</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
        </div>

        {/* Student Info */}
        <Card className="p-4 border border-border-default bg-surface-page">
          <p className="text-sm text-text-body">Student:</p>
          <p className="font-semibold text-text-heading">
            {student.name} • {student.id} • Grade {student.grade}
          </p>
        </Card>

        {/* AI Suggestions CTA */}
        <Card className="p-6 border border-brand bg-surface-page">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5 text-text-heading" />
                <h3 className="font-semibold text-text-heading">AI Decision Support</h3>
              </div>
              <p className="text-sm text-text-label mb-4">
                Get AI-powered recommendations for this situation based on {student.firstName}'s profile and similar incidents.
              </p>
              <Button
                onClick={() => navigate(`/teacher/students/${studentId}/ai-support`)}
                variant="outline"
                className="border-brand text-text-heading hover:bg-surface-elevated rounded-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Suggestions
              </Button>
            </div>
          </div>
        </Card>

        {/* Notes */}
        <Card className="p-6 border border-border-default bg-surface-card space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="notes" className="text-text-heading">
                Incident Notes
              </Label>
              <span className="text-sm text-text-body">
                {notes.length}/500
              </span>
            </div>
            <Textarea
              id="notes"
              placeholder="Describe what happened, context, and any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 500))}
              className="min-h-[120px] border-border-default focus:border-brand"
            />
          </div>

          {/* Outcome */}
          <div>
            <Label className="text-text-heading mb-3 block">
              Outcome <span className="text-red-500">*</span>
            </Label>
            <RadioGroup value={outcome} onValueChange={setOutcome}>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="resolved" id="resolved" />
                  <Label htmlFor="resolved" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">Resolved</div>
                    <div className="text-sm text-text-body">
                      Behavior stopped, student returned to normal activities
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="partially" id="partially" />
                  <Label htmlFor="partially" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">Partially Resolved</div>
                    <div className="text-sm text-text-body">
                      Behavior improved but may need follow-up
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="unresolved" id="unresolved" />
                  <Label htmlFor="unresolved" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">Unresolved</div>
                    <div className="text-sm text-text-body">
                      Strategies were not effective
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border-light rounded-lg">
                  <RadioGroupItem value="escalated" id="escalated" />
                  <Label htmlFor="escalated" className="flex-1 cursor-pointer">
                    <div className="font-medium text-text-heading">Escalated</div>
                    <div className="text-sm text-text-body">
                      Requires behavioral expert intervention
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Escalation Fields */}
          {outcome === 'escalated' && (
            <div className="space-y-4 p-4 bg-surface-page rounded-lg">
              <div>
                <Label htmlFor="expert" className="text-text-heading">
                  Select Behavioral Expert <span className="text-red-500">*</span>
                </Label>
                <Select value={expertId} onValueChange={setExpertId}>
                  <SelectTrigger className="mt-1 border-border-default">
                    <SelectValue placeholder="Select expert" />
                  </SelectTrigger>
                  <SelectContent>
                    {experts.map((expert) => (
                      <SelectItem key={expert.id} value={expert.id}>
                        {expert.name} - {expert.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="escalation-note" className="text-text-heading">
                  Escalation Note
                </Label>
                <Textarea
                  id="escalation-note"
                  placeholder="Why are you escalating this case? What patterns or concerns prompted escalation?"
                  value={escalationNote}
                  onChange={(e) => setEscalationNote(e.target.value)}
                  className="mt-1 min-h-[80px] border-border-default focus:border-brand"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-border-default text-text-heading hover:bg-surface-page rounded-lg"
          >
            ← Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success('Draft saved')}
              className="border-border-default text-text-heading hover:bg-surface-page rounded-lg"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-brand hover:bg-brand-dark text-white rounded-lg"
            >
              Submit Incident
            </Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}