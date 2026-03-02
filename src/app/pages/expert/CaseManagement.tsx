import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { ConfirmationModal } from '@/app/components/ConfirmationModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Search, Flag, Archive } from 'lucide-react';
import { toast } from 'sonner';
import { STUDENTS } from '@/data/constants';

export default function CaseManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showMonitoringModal, setShowMonitoringModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [monitoringDuration, setMonitoringDuration] = useState('30');
  const [monitoringNotes, setMonitoringNotes] = useState('');
  const [closingNotes, setClosingNotes] = useState('');

  // Mock case data
  const cases = STUDENTS.slice(0, 4).map((student, idx) => ({
    ...student,
    caseStatus: idx === 0 ? 'Active' : idx === 1 ? 'Monitoring' : 'Pending Review',
    lastUpdate: idx === 0 ? '2 days ago' : idx === 1 ? '1 week ago' : '3 days ago',
    incidentCount: Math.floor(Math.random() * 10) + 5,
  }));

  const filteredCases = cases.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSetMonitoring = () => {
    toast.success('Monitoring flag set successfully');
    setShowMonitoringModal(false);
    setMonitoringNotes('');
  };

  const handleCloseCase = () => {
    toast.success('Case closed successfully');
    setShowCloseModal(false);
    setClosingNotes('');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-surface-card border-b border-border-default px-8 py-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/expert/dashboard"
              className="text-text-label hover:text-text-heading text-sm mb-2 block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl text-text-heading">Case Management</h1>
          </div>
        </div>
      </header>

      <div className="px-8 pb-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-body" />
            <Input
              placeholder="Search cases by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border-default text-text-heading"
            />
          </div>
        </div>

        {/* Cases List */}
        <div className="grid gap-4">
          {filteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="p-6 border-border-default bg-surface-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-heading mb-1">
                    {caseItem.name}
                  </h3>
                  <p className="text-sm text-text-body">
                    Grade {caseItem.grade} • {caseItem.incidentCount} incidents
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    caseItem.caseStatus === 'Active'
                      ? 'border-brand text-text-heading'
                      : caseItem.caseStatus === 'Monitoring'
                      ? 'border-border-strong text-text-body'
                      : 'border-border-strong text-text-muted'
                  }
                >
                  {caseItem.caseStatus}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-body">Last Updated:</span>
                  <span className="text-text-heading">{caseItem.lastUpdate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-body">Risk Level:</span>
                  <span className="text-text-heading">{caseItem.riskLevel}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  asChild
                  className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  <Link to={`/expert/cases/${caseItem.id}`}>Review Case</Link>
                </Button>
                {caseItem.caseStatus === 'Active' && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedStudent(caseItem.id);
                        setShowMonitoringModal(true);
                      }}
                      className="border-border-default text-text-heading hover:bg-surface-page"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Set Monitoring
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedStudent(caseItem.id);
                        setShowCloseModal(true);
                      }}
                      className="border-border-default text-text-heading hover:bg-surface-page"
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Close Case
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Set Monitoring Modal */}
      <Dialog open={showMonitoringModal} onOpenChange={setShowMonitoringModal}>
        <DialogContent className="sm:max-w-[500px] bg-surface-card border-border-default">
          <DialogHeader>
            <DialogTitle className="text-xl text-text-heading">
              Set Monitoring Flag
            </DialogTitle>
            <DialogDescription className="text-text-label text-base pt-2">
              Mark this case for continued monitoring. The student will remain in your
              caseload with reduced check-in frequency.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-text-heading mb-2 block">Monitoring Duration</Label>
              <Select value={monitoringDuration} onValueChange={setMonitoringDuration}>
                <SelectTrigger className="border-border-default text-text-heading">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-text-heading mb-2 block">Monitoring Notes</Label>
              <Textarea
                value={monitoringNotes}
                onChange={(e) => setMonitoringNotes(e.target.value)}
                placeholder="Document the reason for monitoring and any specific behaviors to watch for..."
                className="min-h-[120px] border-border-default text-text-heading"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowMonitoringModal(false)}
              className="border-border-default text-text-heading hover:bg-surface-page"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSetMonitoring}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Set Monitoring
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Case Modal */}
      <Dialog open={showCloseModal} onOpenChange={setShowCloseModal}>
        <DialogContent className="sm:max-w-[500px] bg-surface-card border-border-default">
          <DialogHeader>
            <DialogTitle className="text-xl text-text-heading">
              Close Case
            </DialogTitle>
            <DialogDescription className="text-text-label text-base pt-2">
              Closing this case will remove the student from your active caseload. You can
              add final notes to document the case resolution.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label className="text-text-heading mb-2 block">Final Case Notes</Label>
            <Textarea
              value={closingNotes}
              onChange={(e) => setClosingNotes(e.target.value)}
              placeholder="Document the case outcome, resolution strategies used, and recommendations for future..."
              className="min-h-[150px] border-border-default text-text-heading"
            />
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCloseModal(false)}
              className="border-border-default text-text-heading hover:bg-surface-page"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCloseCase}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm"
            >
              Confirm Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
