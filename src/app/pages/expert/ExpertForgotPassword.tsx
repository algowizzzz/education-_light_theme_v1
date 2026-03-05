import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ExpertForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    toast.success('Password reset instructions sent');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-heading mb-2">BehaveBridge</h1>
          <p className="text-text-body">Behavioral Expert Portal</p>
        </div>

        <Card className="border-border-default">
          <CardHeader>
            <CardTitle className="text-xl text-text-heading">
              {emailSent ? 'Check Your Email' : 'Reset Password'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-text-label">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah.williams@behaviorexpert.com"
                    className="border-border-default text-text-heading"
                  />
                </div>

                <p className="text-sm text-text-body">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>

                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white shadow-sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reset Instructions
                </Button>

                <Link
                  to="/expert/login"
                  className="flex items-center justify-center gap-2 text-sm text-text-label hover:text-text-heading"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-status-success-soft rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-status-success" />
                </div>
                <p className="text-text-heading mb-2">
                  We've sent password reset instructions to:
                </p>
                <p className="font-medium text-text-heading mb-4">{email}</p>
                <p className="text-sm text-text-body mb-6">
                  Please check your email and follow the instructions to reset your password.
                </p>
                <Link to="/expert/login">
                  <Button
                    variant="outline"
                    className="border-border-strong text-text-heading hover:bg-surface-page"
                  >
                    Return to Login
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-text-body mt-6">
          Need help? Contact{' '}
          <a href="mailto:support@behavebridge.com" className="text-text-heading hover:underline">
            support@behavebridge.com
          </a>
        </p>
      </div>
    </div>
  );
}
