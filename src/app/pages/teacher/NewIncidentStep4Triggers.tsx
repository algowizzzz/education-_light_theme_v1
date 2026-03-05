import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, ChevronUp, ChevronDown } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { STUDENTS, STANDARD_TRIGGERS, STANDARD_STRATEGIES } from '@/data/constants';
import { toast } from 'sonner';

export default function NewIncidentStep4Triggers() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student');
  const student = STUDENTS.find((s) => s.id === studentId);

  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [customTrigger, setCustomTrigger] = useState('');
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [customStrategy, setCustomStrategy] = useState('');
  const [showAllTriggers, setShowAllTriggers] = useState(false);
  const [showAllStrategies, setShowAllStrategies] = useState(false);

  const handleNext = () => {
    if (selectedTriggers.length === 0) {
      toast.error('Please select at least one trigger');
      return;
    }
    if (selectedStrategies.length === 0) {
      toast.error('Please select at least one strategy');
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('triggers', selectedTriggers.join(','));
    params.set('strategies', selectedStrategies.join(','));
    navigate(`/teacher/incidents/new/step5?${params.toString()}`);
  };

  const handleBack = () => {
    navigate(`/teacher/incidents/new/step3?${searchParams.toString()}`);
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const toggleStrategy = (strategy: string) => {
    setSelectedStrategies(prev =>
      prev.includes(strategy)
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    );
  };

  const addCustomTrigger = () => {
    if (customTrigger.trim()) {
      setSelectedTriggers(prev => [...prev, customTrigger.trim()]);
      setCustomTrigger('');
    }
  };

  const addCustomStrategy = () => {
    if (customStrategy.trim()) {
      setSelectedStrategies(prev => [...prev, customStrategy.trim()]);
      setCustomStrategy('');
    }
  };

  const removeTrigger = (trigger: string) => {
    setSelectedTriggers(prev => prev.filter(t => t !== trigger));
  };

  const removeStrategy = (strategy: string) => {
    setSelectedStrategies(prev => prev.filter(s => s !== strategy));
  };

  if (!student) {
    return null;
  }

  const displayedTriggers = showAllTriggers ? STANDARD_TRIGGERS : STANDARD_TRIGGERS.slice(0, 5);
  const displayedStrategies = showAllStrategies ? STANDARD_STRATEGIES : STANDARD_STRATEGIES.slice(0, 5);

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to={`/teacher/incidents/new/step3?${searchParams.toString()}`}
          className="inline-flex items-center text-text-label hover:text-text-heading"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-text-heading">Log New Incident</h1>
          <p className="text-text-body">Step 4 of 5: Triggers & Strategies</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
        </div>

        {/* Student Info */}
        <Card className="p-4 border border-border-default bg-surface-page">
          <p className="text-sm text-text-body">Student:</p>
          <p className="font-semibold text-text-heading">
            {student.name} • {student.id} • Grade {student.grade}
          </p>
        </Card>

        {/* Triggers Section */}
        <Card className="p-6 border border-border-default bg-surface-card space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-text-heading mb-1">
              Antecedent Triggers <span className="text-status-error">*</span>
            </h2>
            <p className="text-sm text-text-body">
              What was happening before the behavior occurred?
            </p>
          </div>

          {/* Common Triggers */}
          <div>
            <Label className="text-sm font-medium text-text-heading">
              Common Triggers
            </Label>
            <div className="mt-2 space-y-2">
              {displayedTriggers.map((trigger) => (
                <div key={trigger} className="flex items-center space-x-2">
                  <Checkbox
                    id={`trigger-${trigger}`}
                    checked={selectedTriggers.includes(trigger)}
                    onCheckedChange={() => toggleTrigger(trigger)}
                  />
                  <Label
                    htmlFor={`trigger-${trigger}`}
                    className="text-text-heading cursor-pointer"
                  >
                    {trigger}
                  </Label>
                </div>
              ))}
            </div>
            {STANDARD_TRIGGERS.length > 5 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllTriggers(!showAllTriggers)}
                className="mt-2 text-text-label hover:text-text-heading"
              >
                {showAllTriggers ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" /> Show all triggers
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Custom Trigger */}
          <div>
            <Label className="text-sm font-medium text-text-heading">
              Add Custom Trigger
            </Label>
            <div className="mt-2 flex gap-2">
              <Input
                value={customTrigger}
                onChange={(e) => setCustomTrigger(e.target.value)}
                placeholder="Enter a custom trigger..."
                className="border-border-default focus:border-brand"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomTrigger();
                  }
                }}
              />
              <Button
                onClick={addCustomTrigger}
                variant="outline"
                className="border-border-default text-text-heading hover:bg-surface-page"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Selected Triggers */}
          {selectedTriggers.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-text-heading">
                Selected Triggers ({selectedTriggers.length})
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTriggers.map((trigger) => (
                  <div
                    key={trigger}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-surface-page border border-border-default rounded-full text-sm"
                  >
                    <span className="text-text-heading">{trigger}</span>
                    <button
                      onClick={() => removeTrigger(trigger)}
                      className="text-text-body hover:text-text-heading"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Strategies Section */}
        <Card className="p-6 border border-border-default bg-surface-card space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-text-heading mb-1">
              Intervention Strategies Used <span className="text-status-error">*</span>
            </h2>
            <p className="text-sm text-text-body">
              What strategies did you try to address the behavior?
            </p>
          </div>

          {/* Common Strategies */}
          <div>
            <Label className="text-sm font-medium text-text-heading">
              Common Strategies
            </Label>
            <div className="mt-2 space-y-2">
              {displayedStrategies.map((strategy) => (
                <div key={strategy} className="flex items-center space-x-2">
                  <Checkbox
                    id={`strategy-${strategy}`}
                    checked={selectedStrategies.includes(strategy)}
                    onCheckedChange={() => toggleStrategy(strategy)}
                  />
                  <Label
                    htmlFor={`strategy-${strategy}`}
                    className="text-text-heading cursor-pointer"
                  >
                    {strategy}
                  </Label>
                </div>
              ))}
            </div>
            {STANDARD_STRATEGIES.length > 5 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllStrategies(!showAllStrategies)}
                className="mt-2 text-text-label hover:text-text-heading"
              >
                {showAllStrategies ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" /> Show all strategies
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Custom Strategy */}
          <div>
            <Label className="text-sm font-medium text-text-heading">
              Add Custom Strategy
            </Label>
            <div className="mt-2 flex gap-2">
              <Input
                value={customStrategy}
                onChange={(e) => setCustomStrategy(e.target.value)}
                placeholder="Enter a custom strategy..."
                className="border-border-default focus:border-brand"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomStrategy();
                  }
                }}
              />
              <Button
                onClick={addCustomStrategy}
                variant="outline"
                className="border-border-default text-text-heading hover:bg-surface-page"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Selected Strategies */}
          {selectedStrategies.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-text-heading">
                Selected Strategies ({selectedStrategies.length})
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedStrategies.map((strategy) => (
                  <div
                    key={strategy}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-surface-page border border-border-default rounded-full text-sm"
                  >
                    <span className="text-text-heading">{strategy}</span>
                    <button
                      onClick={() => removeStrategy(strategy)}
                      className="text-text-body hover:text-text-heading"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
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
          <Button
            onClick={handleNext}
            className="bg-brand hover:bg-brand-dark text-white shadow-sm rounded-lg"
          >
            Next →
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}