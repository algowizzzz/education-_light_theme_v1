import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Lightbulb, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { STUDENTS } from '@/data/constants';

type Message = {
  id: string;
  sender: 'ai' | 'teacher';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  isQuestion?: boolean;
};

type ConversationStage = 'understanding' | 'suggesting' | 'checking' | 'resolved' | 'escalated';

export default function NewIncidentStep2AI() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student');
  const student = STUDENTS.find((s) => s.id === studentId);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hi! I'm here to help you work through this situation with ${student?.name}. Let's start by understanding what happened. Can you briefly describe what you observed?`,
      timestamp: new Date(),
      isQuestion: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [stage, setStage] = useState<ConversationStage>('understanding');
  const [isTyping, setIsTyping] = useState(false);
  const [triedStrategies, setTriedStrategies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!student) {
    return null;
  }

  // Simulate AI responses based on conversation stage
  const generateAIResponse = (userMessage: string, currentStage: ConversationStage): Message => {
    const timestamp = new Date();

    // Understanding stage - asking clarifying questions
    if (currentStage === 'understanding') {
      const questionsAsked = messages.filter(m => m.sender === 'ai' && m.isQuestion).length;
      
      if (questionsAsked === 1) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Thank you for sharing that. What was happening right before the behavior occurred? Was there a specific trigger or change in the environment?',
          timestamp,
          isQuestion: true,
        };
      } else if (questionsAsked === 2) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'I understand. And how did the student respond when you first addressed the behavior?',
          timestamp,
          isQuestion: true,
        };
      } else {
        // Move to suggesting stage
        setStage('suggesting');
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: `Based on what you've shared, here are some strategies that might help in this situation. Have you tried any of these yet?`,
          timestamp,
          suggestions: [
            'Provide a quiet break space for self-regulation',
            'Use visual cues or non-verbal signals',
            'Offer a choice between two acceptable options',
            'Redirect to a preferred activity or role',
          ],
        };
      }
    }

    // Suggesting stage - offering strategies
    if (currentStage === 'suggesting') {
      if (triedStrategies.length === 0) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Let me know which strategy you tried and how it went. Did it help resolve the situation?',
          timestamp,
          isQuestion: true,
        };
      } else if (userMessage.toLowerCase().includes('worked') || userMessage.toLowerCase().includes('helped') || userMessage.toLowerCase().includes('better')) {
        setStage('resolved');
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: '✓ Great! It sounds like the situation has been resolved. Would you like to document this incident with the strategies that worked?',
          timestamp,
          isQuestion: true,
        };
      } else {
        // Offer more strategies
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'I understand that didn\'t work as expected. Here are a few more strategies to consider:',
          timestamp,
          suggestions: [
            'Schedule a brief one-on-one check-in',
            'Implement a structured break schedule',
            'Use a behavior contract with clear expectations',
            'Provide sensory tools (stress ball, fidget)',
          ],
        };
      }
    }

    // Checking stage - following up on tried strategies
    if (currentStage === 'checking') {
      if (userMessage.toLowerCase().includes('worked') || userMessage.toLowerCase().includes('resolved')) {
        setStage('resolved');
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: '✓ Excellent! The situation has been successfully resolved. Let\'s document what happened and which strategies were effective.',
          timestamp,
        };
      } else {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Would you like more strategy suggestions, or do you think this situation needs to be escalated to a behavioral expert for additional support?',
          timestamp,
          isQuestion: true,
        };
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: 'Thank you for sharing that. Let me think about the best next steps...',
      timestamp,
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add teacher message
    const teacherMessage: Message = {
      id: Date.now().toString(),
      sender: 'teacher',
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, teacherMessage]);
    setInputValue('');

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, stage);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTriedStrategies([...triedStrategies, suggestion]);
    
    const teacherMessage: Message = {
      id: Date.now().toString(),
      sender: 'teacher',
      text: `I tried: "${suggestion}"`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, teacherMessage]);

    // AI follows up
    setIsTyping(true);
    setStage('checking');
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        sender: 'ai',
        text: 'How did that strategy work? Did it help improve the situation?',
        timestamp: new Date(),
        isQuestion: true,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleSkipAI = () => {
    const params = new URLSearchParams({ student: studentId || '' });
    navigate(`/teacher/incidents/new/step3?${params.toString()}`);
  };

  const handleEscalate = () => {
    setStage('escalated');
    const aiMessage: Message = {
      id: Date.now().toString(),
      sender: 'ai',
      text: 'Understood. This situation will be flagged for escalation to a behavioral expert. Let\'s continue documenting the incident details.',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);

    setTimeout(() => {
      const params = new URLSearchParams({ 
        student: studentId || '',
        escalated: 'true',
      });
      navigate(`/teacher/incidents/new/step3?${params.toString()}`);
    }, 2000);
  };

  const handleContinueToDetails = () => {
    const params = new URLSearchParams({ 
      student: studentId || '',
      resolved: stage === 'resolved' ? 'true' : 'false',
      conversation: JSON.stringify(messages),
    });
    navigate(`/teacher/incidents/new/step3?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-6">
        <Link
          to="/teacher/incidents/new/step1"
          className="inline-flex items-center text-text-label hover:text-text-heading"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-text-heading">Log New Incident</h1>
          <p className="text-text-body">Step 2 of 5: AI Real-Time Guidance</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-brand rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
          <div className="flex-1 h-2 bg-surface-elevated rounded-full"></div>
        </div>

        {/* Student Info */}
        <Card className="p-4 border border-border-default bg-surface-page">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-body">Student:</p>
              <p className="font-semibold text-text-heading">
                {student.name} • {student.id} • Grade {student.grade}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkipAI}
              className="border-border-default text-text-label hover:bg-surface-card text-xs"
            >
              Skip AI Assistant
            </Button>
          </div>
        </Card>

        {/* Chat Interface */}
        <Card className="border border-border-default bg-surface-card flex flex-col" style={{ height: 'calc(100vh - 500px)', minHeight: '400px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.sender === 'teacher' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'ai' ? 'bg-brand' : 'bg-status-info-soft'
                  }`}>
                    {message.sender === 'ai' ? (
                      <Lightbulb className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-text-body" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'ai'
                        ? 'bg-surface-page text-text-heading'
                        : 'bg-brand text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            disabled={triedStrategies.includes(suggestion)}
                            className={`block w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                              triedStrategies.includes(suggestion)
                                ? 'border-border-light bg-surface-page text-text-muted cursor-not-allowed'
                                : 'border-border-default bg-surface-card hover:bg-surface-page text-text-heading'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {triedStrategies.includes(suggestion) ? (
                                <CheckCircle className="w-4 h-4 mt-0.5 text-text-body" />
                              ) : (
                                <Lightbulb className="w-4 h-4 mt-0.5 text-text-label" />
                              )}
                              <span>{suggestion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-text-muted mt-1">
                      {message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-surface-page rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-badge-medium rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-badge-medium rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-badge-medium rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border-light p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your response..."
                className="flex-1 border-border-default focus:border-brand"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-brand hover:bg-brand-dark text-white shadow-sm rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          {stage !== 'escalated' && (
            <Button
              variant="outline"
              onClick={handleEscalate}
              className="border-brand-dark/40 text-brand-dark hover:bg-status-info-soft rounded-lg"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Escalate to Behavioral Expert
            </Button>
          )}
          
          {(stage === 'resolved' || messages.length > 5) && (
            <Button
              onClick={handleContinueToDetails}
              className="bg-brand hover:bg-brand-dark text-white shadow-sm rounded-lg"
            >
              Continue to Incident Details →
            </Button>
          )}
        </div>

        {/* Status Badge */}
        {stage === 'resolved' && (
          <Card className="p-4 border border-border-default bg-surface-page">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-text-label" />
              <div>
                <p className="font-semibold text-text-heading">Situation Resolved</p>
                <p className="text-sm text-text-body">Great work! You can now document the incident details.</p>
              </div>
            </div>
          </Card>
        )}

        {stage === 'escalated' && (
          <Card className="p-4 border border-border-default bg-surface-page">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-text-label" />
              <div>
                <p className="font-semibold text-text-heading">Flagged for Escalation</p>
                <p className="text-sm text-text-body">This incident will be reviewed by a behavioral expert.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </TeacherLayout>
  );
}
