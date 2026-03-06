import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ArrowLeft, Sparkles, Eye, MessageSquare, Send, Copy, Check } from 'lucide-react';
import { STUDENTS, STAFF, MARCUS_PROFILE } from '@/data/constants';
import { toast } from 'sonner';
import { CaseReviewTabs } from '@/app/components/CaseReviewTabs';

export default function CaseReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assessmentNotes, setAssessmentNotes] = useState('');
  const [interventionPlan, setInterventionPlan] = useState('');
  const [resolution, setResolution] = useState('');
  const [monitoringPeriod, setMonitoringPeriod] = useState('');
  const [notifyParents, setNotifyParents] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [aiSummary, setAiSummary] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [parentMessages, setParentMessages] = useState<Array<{ sender: 'expert' | 'parent'; message: string; timestamp: string }>>([
    { sender: 'parent', message: 'Thank you for reviewing Marcus\'s case. We\'ve noticed he gets frustrated with math homework at home too. What strategies do you recommend we try?', timestamp: '2026-01-13 10:30 AM' },
  ]);
  const [parentMessageInput, setParentMessageInput] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiConversation, setAiConversation] = useState<Array<{ role: 'user' | 'ai'; message: string }>>([]);

  const [followUpNote, setFollowUpNote] = useState('');
  const [notes, setNotes] = useState<Array<{ text: string; author: string; date: string; role: 'teacher' | 'expert' }>>([
    { text: 'I\'ve tried the visual timer strategy you recommended. Marcus responds well to it during independent work, but still struggles with timed assessments.', author: 'Sarah Johnson', date: 'Jan 15, 2026 at 2:30 PM', role: 'teacher' },
    { text: 'That\'s good progress! For timed assessments, let\'s try providing a check-in at the halfway point. Also consider giving him a choice between two assessment formats.', author: 'Dr. Patricia Martinez', date: 'Jan 16, 2026 at 9:15 AM', role: 'expert' },
  ]);

  const caseData = {
    id: id,
    status: 'Pending Review',
    student: STUDENTS[0],
    teacher: STAFF['T-2024-0847'],
    submittedDate: '2026-01-12',
    linkedIncident: 'ESC-2026-0198',
    teacherNote: 'Marcus has had 3 incidents this week, all related to academic frustration during math. Tried short breaks and verbal redirection, but effectiveness declining. Pattern shows increasing severity. Need guidance on alternative strategies.',
  };

  const incidentSummary = MARCUS_PROFILE.incidents[1];

  // Incident-specific data from the logging flow
  const incidentDetails = {
    date: '2026-01-12',
    time: '11:00 AM',
    location: 'Math Class, Room 204',
    category: 'Disruptive Behavior',
    severity: 'High',
    triggers: ['Academic frustration', 'Timed assessment', 'Peer pressure'],
    strategies: ['Verbal redirection', 'Short break (offered)', 'Calm verbal reminder', 'Proximity control'],
    notes: 'Marcus became visibly frustrated during a timed math assessment. He crumpled his paper, threw his pencil, and raised his voice saying "This is too hard! I can\'t do this!" After verbal redirection, Marcus pushed his desk and left the room without permission.',
    outcome: 'Escalated',
  };

  const recentPattern = [
    { date: '2026-01-15', trigger: 'Peer conflict', severity: 'Medium', outcome: 'Resolved' },
    { date: '2026-01-12', trigger: 'Academic frustration', severity: 'High', outcome: 'Escalated' },
    { date: '2026-01-10', trigger: 'Transition', severity: 'Medium', outcome: 'Resolved' },
  ];

  const recommendedUpdates = [
    { id: 'trigger-math', label: 'Add "Timed math assessments" as specific trigger', checked: true },
    { id: 'strategy-chunk', label: 'Add "Break tasks into smaller chunks" strategy', checked: true },
    { id: 'strategy-extended', label: 'Add "Extended time on assessments" accommodation', checked: true },
    { id: 'avoid-timed', label: 'Mark "Timed activities during stress" as strategy to avoid', checked: false },
  ];

  const handleStartReview = () => {
    setShowAssessmentForm(true);
  };

  const handleGenerateAI = () => {
    const summary = `**AI-Generated Incident Summary**

**Incident Overview:**
- Date: January 12, 2026 at 10:45 AM
- Location: Math Class, Room 204
- Duration: Approximately 15 minutes
- Severity Level: High

**What Happened:**
Marcus became visibly frustrated during a timed math assessment. He crumpled his paper, threw his pencil, and raised his voice saying "This is too hard! I can't do this!" The teacher attempted verbal redirection, but Marcus pushed his desk and left the room without permission.

**Behavioral Analysis:**
This incident represents the third math-related escalation this week, showing a clear pattern of academic frustration as the primary trigger. The behavior intensity has increased from previous incidents.

**Context Factors:**
1. Timed assessment created pressure
2. Recent pattern of similar incidents (3 in 5 days)
3. Morning incident - energy levels typically higher
4. Peer witnesses present

**PBIS Framework Analysis:**
- **Antecedent:** Timed math assessment, perceived difficulty
- **Behavior:** Property destruction, verbal outburst, elopement
- **Consequence:** Removal from classroom, teacher intervention required

**Pattern Indicators:**
- Consistent trigger: Academic tasks with time pressure
- Escalation pathway: Frustration → Physical action → Verbal outburst → Elopement
- Previous effective strategies losing effectiveness

**Recommended Immediate Actions:**
1. Reduce time pressure on math tasks
2. Implement check-in system during math
3. Teach self-advocacy skills
4. Consider assessment accommodations`;

    setAiSummary(summary);
    toast.success('AI incident summary generated');
  };

  const handleGenerateRecommendations = () => {
    const recommendations = `PBIS-ALIGNED INTERVENTION RECOMMENDATIONS

1. PROACTIVE STRATEGIES
   - Break math tasks into smaller, manageable chunks (5-10 minute segments)
   - Provide visual timer to reduce time pressure anxiety
   - Offer choice in assignment order to increase autonomy
   - Pre-teach challenging concepts before whole-class instruction

2. TEACHING REPLACEMENT BEHAVIORS
   - Teach self-advocacy script: "I need help with..." or "Can I take a break?"
   - Practice deep breathing techniques before challenging tasks
   - Model and reinforce asking for clarification
   - Role-play coping strategies for frustration

3. ENVIRONMENTAL MODIFICATIONS
   - Seat near positive peer models
   - Minimize visual distractions during independent work
   - Provide access to fidget tools or movement breaks
   - Create quiet corner for self-regulation

4. REINFORCEMENT SYSTEM
   - Implement behavior-specific praise every 10-15 minutes
   - Use token economy for completing math tasks without incident
   - Provide preferred activity after difficult tasks
   - Celebrate small wins and effort, not just completion

5. DATA COLLECTION & MONITORING
   - Track frequency of math-related incidents (target: reduce by 50% in 2 weeks)
   - Monitor effectiveness of break requests
   - Review progress weekly with teacher
   - Document antecedent patterns for future planning

6. PARENT PARTNERSHIP
   - Share strategies for home math support
   - Establish consistent communication protocol
   - Align reinforcement across school and home
   - Provide resources for math anxiety`;

    setAiRecommendations(recommendations);
    toast.success('PBIS recommendations generated successfully');
  };

  const handleCopyRecommendations = async () => {
    try {
      await navigator.clipboard.writeText(aiRecommendations);
      setIsCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Fallback method for browsers that don't support clipboard API
      try {
        const textArea = document.createElement('textarea');
        textArea.value = aiRecommendations;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setIsCopied(true);
          toast.success('Copied to clipboard');
          setTimeout(() => setIsCopied(false), 2000);
        } else {
          toast.error('Failed to copy to clipboard');
        }
      } catch (fallbackErr) {
        toast.error('Failed to copy to clipboard');
      }
    }
  };

  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;

    const userMessage = aiInput;
    setAiConversation([...aiConversation, { role: 'user', message: userMessage }]);
    setAiInput('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      
      if (userMessage.toLowerCase().includes('strategy') || userMessage.toLowerCase().includes('what should')) {
        aiResponse = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\\n\\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat:\\n\\n• Duis aute irure dolor in reprehenderit\\n• Voluptate velit esse cillum dolore\\n• Eu fugiat nulla pariatur excepteur\\n\\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`;
      } else if (userMessage.toLowerCase().includes('parent')) {
        aiResponse = `Lorem ipsum dolor sit amet, consectetur adipiscing elit:\\n\\n**Pellentesque habitant:**\\n1. Morbi tristique senectus et netus\\n2. Malesuada fames ac turpis egestas\\n3. Vestibulum tortor quam feugiat\\n4. Viverra accumsan in nisl nisi\\n\\n**Facilisis gravida neque:**\\n• Convallis a cras semper auctor\\n• Neque volutpat ac tincidunt vitae\\n• Semper quis lectus nulla at\\n• Volutpat maecenas volutpat blandit\\n• Aliquam sem fringilla ut morbi\\n\\n**Elementum tempus:**\\n• Egestas maecenas pharetra convallis\\n• Posuere ac ut consequat semper\\n• Viverra aliquet eget sit amet\\n\\nNisi quis eleifend quam adipiscing vitae proin sagittis?`;
      } else if (userMessage.toLowerCase().includes('escalation') || userMessage.toLowerCase().includes('behavior')) {
        aiResponse = `Consequat mauris nunc congue nisi vitae:\\n\\n**Tempus iaculis urna:**\\n• Facilisis mauris sit amet massa\\n• Vitae ultricies leo integer\\n• Malesuada pellentesque elit eget\\n\\n**Gravida dictum fusce:**\\n• Ut venenatis tellus in metus\\n• Vulputate dignissim suspendisse in\\n• Est ultricies integer quis auctor\\n\\n**Lacinia quis vel eros:**\\n• Donec massa sapien faucibus\\n• Praesent elementum facilisis leo\\n• Vel pretium lectus quam id\\n\\n**Sed vulputate:**\\n• Mi sit amet mauris commodo\\n• Quis commodo odio aenean sed\\n\\n**Adipiscing tristique:**\\n1. Risus feugiat in ante metus\\n2. Dictum fusce ut placerat orci\\n3. Nulla facilisi morbi tempus\\n\\nAmet nisl purus in mollis nunc sed id semper?`;
      } else {
        aiResponse = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore:\\n\\n• **Magna aliqua:** Ut enim ad minim veniam quis nostrud\\n• **Exercitation:** Ullamco laboris nisi ut aliquip ex ea\\n• **Commodo consequat:** Duis aute irure dolor in reprehenderit\\n• **Voluptate velit:** Esse cillum dolore eu fugiat nulla\\n• **Pariatur excepteur:** Sint occaecat cupidatat non proident\\n\\nQuis autem vel eum iure reprehenderit qui in ea voluptate?`;
      }

      setAiConversation(prev => [...prev, { role: 'ai', message: aiResponse }]);
    }, 1000);
  };

  const handleSendParentMessage = () => {
    if (!parentMessageInput.trim()) return;

    const newMessage = {
      sender: 'expert' as const,
      message: parentMessageInput,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit' 
      })
    };

    setParentMessages([...parentMessages, newMessage]);
    setParentMessageInput('');
    toast.success('Message sent to parent');
  };

  const handleGenerateInterventionPlan = () => {
    const aiGeneratedPlan = `Based on the student's behavioral history and PBIS framework, here is a recommended intervention plan:

1. **Proactive Strategies:**
   - Break math tasks into smaller, manageable chunks (5-10 minute segments)
   - Provide visual timers for transitions
   - Offer choice in assignment order to increase autonomy

2. **Teaching Replacement Behaviors:**
   - Teach self-advocacy script: "I need help with..." or "Can I take a break?"
   - Practice deep breathing techniques before challenging tasks
   - Model and reinforce asking for clarification

3. **Environmental Modifications:**
   - Seat near positive peer models
   - Minimize visual distractions during independent work
   - Provide access to fidget tools or movement breaks

4. **Reinforcement System:**
   - Implement behavior-specific praise every 10-15 minutes
   - Use token economy for completing math tasks without incident
   - Provide preferred activity after difficult tasks

5. **Data Collection:**
   - Track frequency of math-related incidents (target: reduce by 50% in 2 weeks)
   - Monitor effectiveness of break requests
   - Review progress weekly with team`;

    setInterventionPlan(aiGeneratedPlan);
    toast.success('AI intervention plan generated successfully');
  };

  const handleSubmitAssessment = () => {
    if (!assessmentNotes.trim()) {
      toast.error('Please complete all required fields');
      return;
    }

    toast.success('Case assessment submitted successfully');
    setTimeout(() => {
      navigate('/expert/cases');
    }, 1500);
  };

  const handleAddNote = () => {
    if (!followUpNote.trim()) return;

    const newNote = {
      text: followUpNote,
      author: 'Dr. Patricia Martinez',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      role: 'expert' as const
    };

    setNotes([...notes, newNote]);
    setFollowUpNote('');
    toast.success('Follow-up note added successfully');
  };

  if (showAssessmentForm) {
    return (
      <ExpertLayout>
        <div className="p-8 max-w-5xl">
          <Link to={`/expert/cases/${id}`} className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Case Details
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl text-text-heading mb-2">Case Assessment</h1>
            <p className="text-text-label">Complete assessment for {caseData.student.name} - {caseData.id}</p>
          </div>

          <Card className="mb-6 border-border-default">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-text-heading">AI-Generated Intervention Plan</CardTitle>
                  <p className="text-sm text-text-body mt-1">PBIS-aligned recommendations based on behavioral data</p>
                </div>
                <Button
                  onClick={handleGenerateInterventionPlan}
                  variant="outline"
                  className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {interventionPlan ? (
                <Textarea
                  value={interventionPlan}
                  onChange={(e) => setInterventionPlan(e.target.value)}
                  rows={16}
                  className="border-border-default text-text-heading font-mono text-sm"
                />
              ) : (
                <p className="text-sm text-text-body">
                  Click "Generate Plan" to create an AI-powered intervention plan based on PBIS best practices and this student's behavioral patterns.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6 border-border-default">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-text-heading">Expert Feedback for Teacher</CardTitle>
              <p className="text-sm text-text-body">Provide your analysis and recommendations</p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Document your assessment, pattern analysis, and specific recommendations for the teacher..."
                value={assessmentNotes}
                onChange={(e) => setAssessmentNotes(e.target.value)}
                rows={8}
                maxLength={1000}
                className="border-border-default text-text-heading placeholder:text-text-body mb-2"
              />
              <div className="text-sm text-text-body text-right mb-4">
                {assessmentNotes.length}/1000 characters
              </div>
              <Button
                onClick={handleSubmitAssessment}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm"
              >
                Submit Feedback
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmitAssessment}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Submit Assessment
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAssessmentForm(false)}
              className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
            >
              Save Draft
            </Button>
          </div>
        </div>
      </ExpertLayout>
    );
  }

  return (
    <ExpertLayout>
      <div className="p-8 max-w-5xl">
        <Link to="/expert/cases" className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Cases
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-text-heading mb-2">Case Review</h1>
            <p className="text-text-label">{caseData.id}</p>
          </div>
        </div>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text-heading font-medium mb-1">{caseData.student.name}</div>
                <div className="text-sm text-text-body">
                  {caseData.student.id} • Grade {caseData.student.grade} • {caseData.student.primaryTeacher}
                </div>
              </div>
              <Link to={`/expert/students/${caseData.student.id}`}>
                <Button variant="outline" className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page">
                  View Full Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-sm text-text-body mb-1">Submitted By</div>
              <div className="text-text-heading font-medium">{caseData.teacher.name}</div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-sm text-text-body mb-1">Submitted Date</div>
              <div className="text-text-heading font-medium">
                {new Date(caseData.submittedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Parent Acknowledgment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-status-success-soft text-status-success border border-status-success-border">
              Acknowledged
            </Badge>
            <p className="text-sm text-text-body mt-2">
              Parent acknowledged this case on Jan 13, 2026 at 9:20 AM
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Incident Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-text-body mb-1">Date & Time</div>
                <div className="text-text-heading font-medium">{incidentDetails.date} at {incidentDetails.time}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Location</div>
                <div className="text-text-heading font-medium">{incidentDetails.location}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Category</div>
                <div className="text-text-heading font-medium">{incidentDetails.category}</div>
              </div>
              <div>
                <div className="text-sm text-text-body mb-1">Severity</div>
                <Badge className={
                  incidentDetails.severity === 'High' ? 'bg-status-error-soft text-status-error border border-status-error-border' :
                  incidentDetails.severity === 'Medium' ? 'bg-status-warning-soft text-status-warning border border-status-warning-border' :
                  'bg-status-info-soft text-status-info border border-status-info-border'
                }>
                  {incidentDetails.severity}
                </Badge>
              </div>
            </div>
            {incidentDetails.notes && (
              <div className="mt-4 pt-4 border-t border-border-light">
                <div className="text-sm text-text-body mb-2">Incident Notes</div>
                <p className="text-text-heading text-sm">{incidentDetails.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-border-default">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-text-heading">Antecedent Triggers</CardTitle>
              <p className="text-sm text-text-body">Triggers identified by teacher for this incident</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {incidentDetails.triggers.map((trigger, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-surface-page rounded-lg">
                    <div className="text-text-heading">{trigger}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-text-heading">Intervention Strategies Used</CardTitle>
              <p className="text-sm text-text-body">Strategies attempted by teacher during this incident</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {incidentDetails.strategies.map((strategy, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-surface-page rounded-lg">
                    <div className="text-text-heading">{strategy}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Escalation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm text-text-body mb-1">Linked Incident</div>
              <Link to={`/teacher/incidents/${caseData.linkedIncident}`} className="text-text-heading hover:underline font-medium">
                {caseData.linkedIncident}
              </Link>
            </div>
            <div className="mb-4">
              <div className="text-sm text-text-body mb-2">AI-Generated Summary</div>
              <div className="p-4 bg-surface-page rounded-lg border border-border-light">
                <p className="text-text-heading text-sm leading-relaxed">
                  Student exhibited escalating frustration during timed math assessment, resulting in property destruction (crumpled paper, thrown pencil) and elopement from classroom. This represents the third similar incident within 5 days, indicating a clear pattern of academic task avoidance with increasing severity. Antecedent: time pressure on math tasks. Behavior: verbal outburst followed by physical actions. Current interventions (verbal redirection, short breaks) showing declining effectiveness.
                </p>
              </div>
            </div>
            <div>
              <div className="text-sm text-text-body mb-2">Teacher's Note</div>
              <p className="text-text-heading">{caseData.teacherNote}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-text-label" />
                <div>
                  <CardTitle className="text-lg text-text-heading">AI Intervention Assistant</CardTitle>
                  <p className="text-sm text-text-body mt-1">PBIS-aligned recommendations and guidance</p>
                </div>
              </div>
              <Button
                onClick={handleGenerateRecommendations}
                variant="outline"
                className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Recommendations
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {aiRecommendations ? (
              <div className="relative">
                <Button
                  onClick={handleCopyRecommendations}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-text-body hover:text-text-heading hover:bg-status-info-soft"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <div className="p-4 bg-surface-page rounded-lg border border-border-light">
                  <pre className="text-sm text-text-heading whitespace-pre-wrap font-sans leading-relaxed pr-20">
                    {aiRecommendations}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-surface-page rounded-lg border border-border-light">
                <p className="text-sm text-text-body">
                  Click "Generate Recommendations" to create PBIS-aligned intervention strategies based on this case's behavioral data, student history, and evidence-based practices.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Expert Feedback for Teacher</CardTitle>
            <p className="text-sm text-text-body">Provide your analysis and recommendations</p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Document your assessment, pattern analysis, and specific recommendations for the teacher..."
              value={assessmentNotes}
              onChange={(e) => setAssessmentNotes(e.target.value)}
              rows={8}
              maxLength={1000}
              className="border-border-default text-text-heading placeholder:text-text-body mb-2"
            />
            <div className="text-sm text-text-body text-right mb-4">
              {assessmentNotes.length}/1000 characters
            </div>
            <Button
              onClick={handleSubmitAssessment}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6 border-border-default">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-text-heading">Follow-up Notes</CardTitle>
            <p className="text-sm text-text-body">Add updates or observations related to this case</p>
          </CardHeader>
          <CardContent>
            {notes.length > 0 && (
              <div className="mb-4 space-y-3">
                {notes.map((note, index) => (
                  <div key={index} className={`p-4 rounded-lg ${note.role === 'teacher' ? 'bg-surface-page' : 'bg-status-info-soft'}`}>
                    <p className="text-text-heading mb-2">{note.text}</p>
                    <div className="flex items-center gap-2 text-xs text-text-body">
                      <span className="font-medium">{note.author}</span>
                      <span>•</span>
                      <span>{note.date}</span>
                      <span>•</span>
                      <span className="capitalize">{note.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Textarea
              placeholder="Add a follow-up note..."
              value={followUpNote}
              onChange={(e) => setFollowUpNote(e.target.value)}
              rows={3}
              className="border-border-default text-text-heading placeholder:text-text-body mb-3"
            />
            <Button
              onClick={handleAddNote}
              disabled={!followUpNote.trim()}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Add Follow-up Note
            </Button>
          </CardContent>
        </Card>

        <CaseReviewTabs
          caseData={{ id: caseData.id, linkedIncident: caseData.linkedIncident, teacherNote: caseData.teacherNote }}
          recentPattern={recentPattern}
          onStartReview={handleStartReview}
        />

        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => {
              toast.success('Case marked as complete');
              setTimeout(() => {
                navigate('/expert/cases');
              }, 1500);
            }}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            Mark as Complete
          </Button>
        </div>
      </div>
    </ExpertLayout>
  );
}