import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Save, X, Plus, GripVertical, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';

const STANDARD_TRIGGERS = [
  'Peer Conflict',
  'Academic Frustration',
  'Testing Pressure',
  'Transitions',
  'Sensory Overload',
  'Task Avoidance',
  'Attention Seeking',
  'Fatigue',
  'Hunger',
  'Schedule Changes',
];

const STANDARD_STRATEGIES = [
  'Short Break (5 min)',
  'Verbal Redirection',
  'Deep Breathing Exercise',
  'Change of Activity',
  'One-on-One Check-in',
  'Visual Schedule Review',
  'Positive Reinforcement',
  'Fidget Tool Access',
  'Quiet Space Option',
  'Movement Break',
  'Peer Support',
  'Extended Time',
];

export function EditStudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [showAddTriggerModal, setShowAddTriggerModal] = useState(false);
  const [showAddStrategyModal, setShowAddStrategyModal] = useState(false);
  const [customTrigger, setCustomTrigger] = useState('');
  const [customStrategy, setCustomStrategy] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');
  const [searchStrategy, setSearchStrategy] = useState('');

  // Mock student data
  const student = {
    id: id || 'STU-4298',
    name: 'Marcus Thompson',
    studentId: 'STU-4298',
    grade: '4',
    teacher: 'Mrs. Maria Johnson',
    behavioralNotes: 'Marcus demonstrates strong academic abilities but occasionally struggles with peer interactions during group work. Responds well to short breaks and one-on-one check-ins.',
  };

  const [behavioralNotes, setBehavioralNotes] = useState(student.behavioralNotes);

  const [triggers, setTriggers] = useState([
    'Peer Conflict',
    'Academic Frustration',
    'Transitions',
  ]);

  const [strategies, setStrategies] = useState([
    { name: 'Short Break (5 min)', active: true },
    { name: 'Verbal Redirection', active: true },
    { name: 'One-on-One Check-in', active: true },
    { name: 'Deep Breathing Exercise', active: false },
  ]);

  const [strategiesToAvoid, setStrategiesToAvoid] = useState([
    'Public Correction',
    'Group Timeout',
  ]);

  const handleSave = () => {
    toast.success('Student profile updated successfully');
    navigate(`/expert/students/${id}`);
  };

  const handleAddTrigger = (trigger: string) => {
    if (trigger && !triggers.includes(trigger)) {
      setTriggers([...triggers, trigger]);
      setShowAddTriggerModal(false);
      setCustomTrigger('');
      setSearchTrigger('');
    }
  };

  const handleAddStrategy = (strategy: string, isAvoid: boolean = false) => {
    if (isAvoid) {
      if (strategy && !strategiesToAvoid.includes(strategy)) {
        setStrategiesToAvoid([...strategiesToAvoid, strategy]);
      }
    } else {
      if (strategy && !strategies.find(s => s.name === strategy)) {
        setStrategies([...strategies, { name: strategy, active: true }]);
      }
    }
    setShowAddStrategyModal(false);
    setCustomStrategy('');
    setSearchStrategy('');
  };

  const removeTrigger = (trigger: string) => {
    setTriggers(triggers.filter(t => t !== trigger));
  };

  const removeStrategy = (strategyName: string) => {
    setStrategies(strategies.filter(s => s.name !== strategyName));
  };

  const removeAvoidStrategy = (strategy: string) => {
    setStrategiesToAvoid(strategiesToAvoid.filter(s => s !== strategy));
  };

  const toggleStrategyActive = (strategyName: string) => {
    setStrategies(
      strategies.map(s =>
        s.name === strategyName ? { ...s, active: !s.active } : s
      )
    );
  };

  const filteredTriggers = STANDARD_TRIGGERS.filter(
    t => t.toLowerCase().includes(searchTrigger.toLowerCase()) && !triggers.includes(t)
  );

  const filteredStrategies = STANDARD_STRATEGIES.filter(
    s => s.toLowerCase().includes(searchStrategy.toLowerCase()) && !strategies.find(st => st.name === s)
  );

  return (
    <ExpertLayout>
      <div className="max-w-5xl">
        <Link
          to={`/expert/students/${id}`}
          className="inline-flex items-center gap-2 text-text-label hover:text-text-heading mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Student Profile
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-text-heading mb-2">
              Edit Student Profile
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-label">
              <span>{student.name}</span>
              <span>•</span>
              <span>{student.studentId}</span>
              <span>•</span>
              <span>Grade {student.grade}</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-surface-page">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-text-heading mb-4">
                    Student Information (Read-only)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-body">Name:</span>
                      <span className="ml-2 text-text-heading">{student.name}</span>
                    </div>
                    <div>
                      <span className="text-text-body">Student ID:</span>
                      <span className="ml-2 text-text-heading">{student.studentId}</span>
                    </div>
                    <div>
                      <span className="text-text-body">Grade:</span>
                      <span className="ml-2 text-text-heading">{student.grade}</span>
                    </div>
                    <div>
                      <span className="text-text-body">Primary Teacher:</span>
                      <span className="ml-2 text-text-heading">{student.teacher}</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-body mt-3">
                    Contact admin to update student information
                  </p>
                </div>

                <div className="border-t border-border-default pt-4">
                  <Label htmlFor="behavioral-notes" className="text-sm font-medium text-text-heading mb-2">
                    Behavioral Notes
                  </Label>
                  <Textarea
                    id="behavioral-notes"
                    value={behavioralNotes}
                    onChange={(e) => setBehavioralNotes(e.target.value)}
                    placeholder="Add behavioral observations, patterns, and expert notes..."
                    className="min-h-[150px] mt-2"
                  />
                  <p className="text-xs text-text-body mt-2">
                    These notes are visible to all teachers and experts
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="triggers" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-text-heading">Identified Triggers</h3>
                  <p className="text-xs text-text-body mt-1">
                    Drag to reorder by frequency/importance
                  </p>
                </div>
                <Button
                  onClick={() => setShowAddTriggerModal(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Trigger
                </Button>
              </div>

              <div className="space-y-2">
                {triggers.map((trigger, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-surface-page rounded border border-border-light"
                  >
                    <GripVertical className="w-4 h-4 text-text-body cursor-move" />
                    <span className="flex-1 text-sm text-text-heading">{trigger}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTrigger(trigger)}
                      className="text-text-body hover:text-text-heading"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {triggers.length === 0 && (
                  <p className="text-sm text-text-body text-center py-8">
                    No triggers identified yet. Add triggers to help track behavioral patterns.
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-text-heading">Recommended Strategies</h3>
                  <p className="text-xs text-text-body mt-1">
                    Drag to reorder by priority. Toggle active/inactive status.
                  </p>
                </div>
                <Button
                  onClick={() => setShowAddStrategyModal(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Strategy
                </Button>
              </div>

              <div className="space-y-2 mb-6">
                {strategies.map((strategy, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-surface-page rounded border border-border-light"
                  >
                    <GripVertical className="w-4 h-4 text-text-body cursor-move" />
                    <span className="flex-1 text-sm text-text-heading">{strategy.name}</span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={strategy.active}
                        onCheckedChange={() => toggleStrategyActive(strategy.name)}
                      />
                      <span className="text-xs text-text-body w-16">
                        {strategy.active ? 'Active' : 'Inactive'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStrategy(strategy.name)}
                        className="text-text-body hover:text-text-heading"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border-default pt-4">
                <h3 className="text-sm font-medium text-text-heading mb-3">Strategies to Avoid</h3>
                <div className="space-y-2">
                  {strategiesToAvoid.map((strategy, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-surface-card rounded border border-border-light"
                    >
                      <Badge variant="outline" className="bg-surface-page text-text-body">
                        Avoid
                      </Badge>
                      <span className="flex-1 text-sm text-text-heading">{strategy}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAvoidStrategy(strategy)}
                        className="text-text-body hover:text-text-heading"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {strategiesToAvoid.length === 0 && (
                    <p className="text-sm text-text-body text-center py-4">
                      No avoided strategies listed
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/expert/students/${id}`)}
            className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Add Trigger Modal */}
      <Dialog open={showAddTriggerModal} onOpenChange={setShowAddTriggerModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Trigger</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="search-trigger">Search Standard Triggers</Label>
              <Input
                id="search-trigger"
                placeholder="Search triggers..."
                value={searchTrigger}
                onChange={(e) => setSearchTrigger(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 border border-border-default rounded p-2">
              {filteredTriggers.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => handleAddTrigger(trigger)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-surface-page rounded"
                >
                  {trigger}
                </button>
              ))}
              {filteredTriggers.length === 0 && (
                <p className="text-sm text-text-body text-center py-4">No triggers found</p>
              )}
            </div>
            <div className="border-t border-border-default pt-4">
              <Label htmlFor="custom-trigger">Or Add Custom Trigger</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="custom-trigger"
                  placeholder="Enter custom trigger..."
                  value={customTrigger}
                  onChange={(e) => setCustomTrigger(e.target.value)}
                />
                <Button
                  onClick={() => handleAddTrigger(customTrigger)}
                  disabled={!customTrigger.trim()}
                  className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddTriggerModal(false)}
              className="border-border-strong text-text-heading"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Strategy Modal */}
      <Dialog open={showAddStrategyModal} onOpenChange={setShowAddStrategyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Strategy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="search-strategy">Search Standard Strategies</Label>
              <Input
                id="search-strategy"
                placeholder="Search strategies..."
                value={searchStrategy}
                onChange={(e) => setSearchStrategy(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 border border-border-default rounded p-2">
              {filteredStrategies.map((strategy) => (
                <button
                  key={strategy}
                  onClick={() => handleAddStrategy(strategy, false)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-surface-page rounded"
                >
                  {strategy}
                </button>
              ))}
              {filteredStrategies.length === 0 && (
                <p className="text-sm text-text-body text-center py-4">No strategies found</p>
              )}
            </div>
            <div className="border-t border-border-default pt-4">
              <Label htmlFor="custom-strategy">Or Add Custom Strategy</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="custom-strategy"
                  placeholder="Enter custom strategy..."
                  value={customStrategy}
                  onChange={(e) => setCustomStrategy(e.target.value)}
                />
                <Button
                  onClick={() => handleAddStrategy(customStrategy, false)}
                  disabled={!customStrategy.trim()}
                  className="bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="border-t border-border-default pt-4">
              <Button
                onClick={() => {
                  if (customStrategy.trim()) {
                    handleAddStrategy(customStrategy, true);
                  }
                }}
                variant="outline"
                className="w-full border-border-strong text-text-heading"
              >
                Add to "Strategies to Avoid" List
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddStrategyModal(false)}
              className="border-border-strong text-text-heading"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ExpertLayout>
  );
}
