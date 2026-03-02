import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { AlertCircle, ArrowLeft, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';

export default function CaseAssessment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [assessmentNotes, setAssessmentNotes] = useState('');
  const [resolution, setResolution] = useState('resolved');
  const [monitoringPeriod, setMonitoringPeriod] = useState('1-week');
  const [notifyParents, setNotifyParents] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [requestMeeting, setRequestMeeting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [profileUpdates, setProfileUpdates] = useState({
    addTrigger: false,
    updateStrategy: false,
    removeAvoid: false
  });

  const caseData = {
    id: 'ESC-2024-0298',
    student: 'Marcus Thompson',
    studentId: 'STU-4298',
    grade: '4th',
    teacher: 'Mrs. Maria Johnson',
    date: 'January 12, 2026',
    status: 'Under Review',
    priority: 'High'
  };

  const handleSubmit = () => {
    navigate('/expert/cases/confirmation');
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully');
  };

  return (
    <ExpertLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/expert/cases/${id}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case Details
          </Button>
          <h1 className="text-2xl mb-2">Case Assessment</h1>
          <p className="text-text-body">Complete review and submit assessment for Case {caseData.id}</p>
        </div>

        {/* Case Summary */}
        <Card className="mb-6 border-border-default">
          <CardHeader className="bg-surface-page">
            <CardTitle className="text-base">Case Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-body">Student</p>
                <p className="text-text-heading">{caseData.student} (ID: {caseData.studentId})</p>
              </div>
              <div>
                <p className="text-text-body">Teacher</p>
                <p className="text-text-heading">{caseData.teacher}</p>
              </div>
              <div>
                <p className="text-text-body">Escalation Date</p>
                <p className="text-text-heading">{caseData.date}</p>
              </div>
              <div>
                <p className="text-text-body">Priority</p>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-brand-dark text-white">
                  {caseData.priority}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Form */}
        <Card className="mb-6 border-border-default">
          <CardHeader>
            <CardTitle>Expert Assessment Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={assessmentNotes}
              onChange={(e) => setAssessmentNotes(e.target.value)}
              placeholder="Provide your professional assessment of this case, including observations, analysis, and recommendations..."
              className="min-h-[200px] mb-2"
              maxLength={1000}
            />
            <p className="text-sm text-text-body text-right">{assessmentNotes.length}/1000 characters</p>
          </CardContent>
        </Card>

        {/* Recommended Profile Updates */}
        <Card className="mb-6 border-border-default">
          <CardHeader>
            <CardTitle>Recommended Profile Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="addTrigger"
                checked={profileUpdates.addTrigger}
                onCheckedChange={(checked) =>
                  setProfileUpdates({ ...profileUpdates, addTrigger: checked as boolean })
                }
              />
              <div>
                <Label htmlFor="addTrigger" className="cursor-pointer">
                  Add "Academic Frustration - Math" as new trigger
                </Label>
                <p className="text-sm text-text-body">Based on incident pattern analysis</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="updateStrategy"
                checked={profileUpdates.updateStrategy}
                onCheckedChange={(checked) =>
                  setProfileUpdates({ ...profileUpdates, updateStrategy: checked as boolean })
                }
              />
              <div>
                <Label htmlFor="updateStrategy" className="cursor-pointer">
                  Update strategy priority: Move "Short Break" to #1 position
                </Label>
                <p className="text-sm text-text-body">85% success rate in recent incidents</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="removeAvoid"
                checked={profileUpdates.removeAvoid}
                onCheckedChange={(checked) =>
                  setProfileUpdates({ ...profileUpdates, removeAvoid: checked as boolean })
                }
              />
              <div>
                <Label htmlFor="removeAvoid" className="cursor-pointer">
                  Remove "Peer Buddy System" from strategies to avoid
                </Label>
                <p className="text-sm text-text-body">Recent success suggests reconsideration</p>
              </div>
            </div>

            {Object.values(profileUpdates).some(v => v) && (
              <Button
                variant="outline"
                onClick={() => setShowPreviewModal(true)}
                className="w-full mt-4"
              >
                <FileText className="h-4 w-4 mr-2" />
                Preview Profile Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Case Resolution */}
        <Card className="mb-6 border-border-default">
          <CardHeader>
            <CardTitle>Case Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={resolution} onValueChange={setResolution}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="resolved" id="resolved" />
                <Label htmlFor="resolved" className="cursor-pointer">
                  Resolved - Close this case
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="monitoring" id="monitoring" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="monitoring" className="cursor-pointer block mb-2">
                    Requires Continued Monitoring
                  </Label>
                  {resolution === 'monitoring' && (
                    <Select value={monitoringPeriod} onValueChange={setMonitoringPeriod}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select monitoring period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-days">3 Days</SelectItem>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Parent Notification */}
        <Card className="mb-6 border-border-default">
          <CardHeader>
            <CardTitle>Parent Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifyParents"
                checked={notifyParents}
                onCheckedChange={(checked) => setNotifyParents(checked as boolean)}
              />
              <Label htmlFor="notifyParents" className="cursor-pointer">
                Notify parents about this assessment
              </Label>
            </div>
            {notifyParents && (
              <>
                <div className="flex items-center space-x-2 ml-6">
                  <Checkbox
                    id="includeSummary"
                    checked={includeSummary}
                    onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
                  />
                  <Label htmlFor="includeSummary" className="cursor-pointer">
                    Include incident summary in notification
                  </Label>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <Checkbox
                    id="requestMeeting"
                    checked={requestMeeting}
                    onCheckedChange={(checked) => setRequestMeeting(checked as boolean)}
                  />
                  <Label htmlFor="requestMeeting" className="cursor-pointer">
                    Request parent meeting
                  </Label>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Validation Alert */}
        {assessmentNotes.length < 50 && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please provide detailed assessment notes (minimum 50 characters) before submitting.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex-1"
          >
            Save Draft
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={assessmentNotes.length < 50}
            className="flex-1 bg-brand hover:bg-brand-dark"
          >
            Submit Assessment
          </Button>
        </div>

        {/* Preview Profile Changes Modal */}
        <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Preview Profile Changes</DialogTitle>
              <DialogDescription>
                Review the proposed changes to {caseData.student}'s behavioral profile
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {profileUpdates.addTrigger && (
                <div>
                  <h4 className="text-sm mb-2">Triggers</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-text-body mb-2">Current</p>
                      <div className="space-y-1">
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">Peer Conflict</div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">Loud Noises</div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">Transitions</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-text-body mb-2">After Changes</p>
                      <div className="space-y-1">
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">Peer Conflict</div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">Loud Noises</div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">Transitions</div>
                        <div className="text-sm bg-surface-elevated px-3 py-2 rounded border-2 border-brand-dark">
                          Academic Frustration - Math (New)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {profileUpdates.updateStrategy && (
                <div>
                  <h4 className="text-sm mb-2">Strategy Priority</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-text-body mb-2">Current</p>
                      <div className="space-y-1">
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">1. Verbal Redirection</div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">2. Short Break</div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">3. Quiet Corner</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-text-body mb-2">After Changes</p>
                      <div className="space-y-1">
                        <div className="text-sm bg-surface-elevated px-3 py-2 rounded border-2 border-brand-dark">
                          1. Short Break (Updated)
                        </div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">2. Verbal Redirection</div>
                        <div className="text-sm bg-surface-page px-3 py-2 rounded">3. Quiet Corner</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setShowPreviewModal(false)} variant="outline">
                  Close Preview
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ExpertLayout>
  );
}
