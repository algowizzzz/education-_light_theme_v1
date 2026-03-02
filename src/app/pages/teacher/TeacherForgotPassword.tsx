import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function TeacherForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    toast.success('Password reset link sent to your email!');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="p-8 border border-border-default bg-surface-card text-center">
            <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-text-heading"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-heading mb-2">
              Reset Link Sent
            </h2>
            <p className="text-text-label mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-text-body mb-6">
              The link will expire in 30 minutes. Please check your inbox and spam folder.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full border-border-default text-text-heading hover:bg-surface-page rounded-full"
              >
                Resend Link
              </Button>
              <Link to="/teacher/login" className="block">
                <Button
                  className="w-full bg-brand hover:bg-brand-dark text-white rounded-full"
                >
                  Return to Login
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          to="/teacher/login"
          className="inline-flex items-center text-text-label hover:text-text-heading mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <Card className="p-8 border border-border-default bg-surface-card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-heading mb-1">
              Forgot Password
            </h1>
            <p className="text-text-label">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-text-heading">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@lincolnelementary.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-border-default focus:border-brand"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white rounded-full"
            >
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link
                to="/teacher/login"
                className="text-sm text-text-label hover:text-text-heading underline"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
