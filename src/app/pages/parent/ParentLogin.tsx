import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function ParentLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('lisa.thompson@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'lisa.thompson@gmail.com') {
      toast.success('Login successful!');
      navigate('/parent/dashboard');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 3) {
        toast.error('Account locked. Too many failed attempts. Please try again in 15 minutes.');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-light/6 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-text-label hover:text-brand mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </Link>

        <Card className="p-8 glass-card rounded-xl border-t-2 border-t-brand">
          <div className="text-center mb-8">
            <img src="/logos/png-transparent/1.png" alt="BehaveBridge" className="w-48 h-auto mx-auto mb-4" />
            <span className="inline-block px-4 py-1.5 bg-brand/10 border border-brand/20 rounded-full text-sm text-brand-dark font-medium">
              Parent Portal
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-text-heading">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-border-default focus:border-brand"
                required
                disabled={failedAttempts >= 3}
              />
              <p className="text-xs text-text-body mt-1">
                Use: lisa.thompson@gmail.com
              </p>
            </div>

            <div>
              <Label htmlFor="password" className="text-text-heading">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border-default focus:border-brand pr-10"
                  required
                  disabled={failedAttempts >= 3}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-body hover:text-text-heading"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberDevice}
                onCheckedChange={(checked) => setRememberDevice(checked as boolean)}
                disabled={failedAttempts >= 3}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-text-label cursor-pointer"
              >
                Remember this device
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white rounded-full"
              disabled={failedAttempts >= 3}
            >
              Sign In
            </Button>

            <div className="text-center space-y-2">
              <Link
                to="/parent/forgot-password"
                className="block text-sm text-text-body hover:text-text-heading underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center text-xs text-text-body pt-4 border-t border-border-light">
              Session timeout: 30 minutes of inactivity
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
