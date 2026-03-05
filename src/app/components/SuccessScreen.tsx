import { CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Link } from 'react-router-dom';

interface SuccessScreenProps {
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    to: string;
  };
  secondaryAction?: {
    label: string;
    to: string;
  };
  details?: {
    label: string;
    value: string;
  }[];
}

export function SuccessScreen({
  title,
  message,
  primaryAction,
  secondaryAction,
  details,
}: SuccessScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 border-border-default bg-surface-card text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-status-success-soft p-4">
            <CheckCircle className="w-16 h-16 text-status-success" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-text-heading mb-4">{title}</h1>
        <p className="text-text-label mb-6">{message}</p>

        {details && details.length > 0 && (
          <div className="bg-surface-page rounded-lg p-4 mb-6 space-y-2">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-text-body">{detail.label}:</span>
                <span className="text-sm font-medium text-text-heading">{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {primaryAction && (
            <Button
              asChild
              className="bg-brand hover:bg-brand-dark text-white w-full"
            >
              <Link to={primaryAction.to}>{primaryAction.label}</Link>
            </Button>
          )}
          {secondaryAction && (
            <Button
              asChild
              variant="outline"
              className="border-border-default text-text-heading hover:bg-surface-page w-full"
            >
              <Link to={secondaryAction.to}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
