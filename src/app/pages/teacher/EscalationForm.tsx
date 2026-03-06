import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { STUDENTS, STAFF } from '@/data/constants';

export default function EscalationForm() {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const [selectedExpert, setSelectedExpert] = useState('');
  const [escalationNote, setEscalationNote] = useState('');

  const behavioralExperts = [
    {
      id: 'BE-2024-0023',
      name: 'Dr. Sarah Williams',
      role: 'Lead Behavioral Specialist',
      specialization: 'General behavioral support, peer conflict, academic frustration',
    },
    {
      id: 'BE-2024-0024',
      name: 'Robert Chen',
      role: 'Behavioral Specialist - SpEd',
      specialization: 'Special education, sensory needs, IEP support',
    },
    {
      id: 'BE-2024-0025',
      name: 'Jennifer Adams',
      role: 'Behavioral Specialist',
      specialization: 'Early childhood, anxiety, social-emotional learning',
    },
  ];

  const handleSubmit = () => {
    if (!selectedExpert || !escalationNote.trim()) return;
    
    // Generate escalation ID and navigate to confirmation
    const escalationId = `ESC-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    navigate(`/teacher/escalations/${escalationId}/confirmation`, {
      state: { incidentId, expertId: selectedExpert, note: escalationNote }
    });
  };

  return (
    <TeacherLayout>
      <div className="p-8 max-w-4xl">
        <Link to={`/teacher/incidents/${incidentId}`} className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Incident
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2">Escalate to Behavioral Expert</h1>
          <p className="text-text-label">Request expert review and support for Incident {incidentId}</p>
        </div>

        <Card className="mb-6 border-border-default bg-surface-hover">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-text-label shrink-0 mt-0.5" />
              <div className="text-sm text-text-label">
                <p className="font-medium mb-1">When to escalate:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Behavior persists despite multiple interventions</li>
                  <li>Safety concerns for student or others</li>
                  <li>Pattern of increasing severity or frequency</li>
                  <li>You need additional strategies or support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Select Behavioral Expert</CardTitle>
            <p className="text-sm text-text-body">Choose the expert best suited for this situation</p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedExpert} onValueChange={setSelectedExpert}>
              <div className="space-y-4">
                {behavioralExperts.map((expert) => (
                  <div key={expert.id} className="flex items-start gap-3">
                    <RadioGroupItem value={expert.id} id={expert.id} className="mt-1" />
                    <Label htmlFor={expert.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-text-heading">{expert.name}</div>
                      <div className="text-sm text-text-body mb-1">{expert.role}</div>
                      <div className="text-sm text-text-label">
                        <span className="font-medium">Specialization:</span> {expert.specialization}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Escalation Note</CardTitle>
            <p className="text-sm text-text-body">Describe why you're requesting expert support</p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Include details about what you've tried, patterns you've noticed, specific concerns, or questions for the expert..."
              value={escalationNote}
              onChange={(e) => setEscalationNote(e.target.value)}
              rows={6}
              maxLength={500}
              className="border-border-default text-text-heading placeholder:text-text-body mb-2"
            />
            <div className="text-sm text-text-body text-right">
              {escalationNote.length}/500 characters
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={!selectedExpert || !escalationNote.trim()}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Submit Escalation
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/teacher/incidents/${incidentId}`)}
            className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
          >
            Cancel
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}