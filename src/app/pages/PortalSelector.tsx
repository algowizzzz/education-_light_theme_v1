import { useNavigate } from 'react-router-dom';
import { GraduationCap, Brain, Users, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

export default function PortalSelector() {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'Teacher',
      subtitle: 'Portal',
      icon: GraduationCap,
      path: '/teacher/login',
      description: 'Manage classroom incidents and student behavior tracking',
    },
    {
      title: 'Behavioral',
      subtitle: 'Expert Portal',
      icon: Brain,
      path: '/expert/login',
      description: 'Review escalated cases and provide expert recommendations',
    },
    {
      title: 'Parent',
      subtitle: 'Portal',
      icon: Users,
      path: '/parent/login',
      description: 'View your children\'s progress and incident reports',
    },
    {
      title: 'School',
      subtitle: 'Admin Panel',
      icon: Settings,
      path: '/admin/login',
      description: 'Full system administration and user management',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <img
            src="/logos/png-transparent/2.png"
            alt="BehaveBridge"
            className="w-28 h-28 mx-auto mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-text-heading mb-2">
            BehaveBridge
          </h1>
          <p className="text-text-body text-lg">
            Igniting Learning, Building Futures
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card
                key={portal.path}
                className="group p-5 md:p-8 glass-card hover:shadow-xl hover:shadow-brand/10 hover:border-brand/20 transition-all duration-300 cursor-pointer rounded-xl"
                onClick={() => navigate(portal.path)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-softer flex items-center justify-center group-hover:bg-brand group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-8 h-8 text-brand group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-heading">
                      {portal.title}
                    </h2>
                    <p className="text-brand font-medium text-sm">{portal.subtitle}</p>
                    <p className="text-text-body text-sm mt-1">{portal.description}</p>
                  </div>
                  <Button
                    variant="default"
                    className="w-full bg-brand hover:bg-brand-dark text-white rounded-full font-medium shadow-sm"
                  >
                    Enter Portal
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-sm mt-10">
          School Behavior Documentation & Support System
        </p>
      </div>
    </div>
  );
}
