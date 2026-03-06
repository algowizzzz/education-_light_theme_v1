import { ParentLayout } from '@/app/components/ParentLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router-dom';
import { User, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface Child {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  recentIncidents: number;
  unreadNotifications: number;
  activeSupport: boolean;
}

export default function ChildrenList() {
  const children: Child[] = [
    {
      id: 'STU-4298',
      name: 'Marcus Thompson',
      grade: '4th Grade',
      teacher: 'Mrs. Maria Johnson',
      recentIncidents: 3,
      unreadNotifications: 2,
      activeSupport: true
    },
    {
      id: 'STU-3621',
      name: 'Emma Thompson',
      grade: '2nd Grade',
      teacher: 'Mr. James Taylor',
      recentIncidents: 1,
      unreadNotifications: 0,
      activeSupport: false
    }
  ];

  return (
    <ParentLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-text-heading mb-6">My Children</h1>

        <div className="space-y-4">
          {children.map((child) => (
            <Card key={child.id} className="border-border-default">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-3 md:gap-4 flex-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-icon-person-soft flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 md:w-8 md:h-8 text-icon-person" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl text-text-heading mb-1">{child.name}</h2>
                      <p className="text-sm md:text-base text-text-body">
                        {child.grade} • {child.teacher}
                      </p>
                    </div>
                  </div>

                  <Link to={`/parent/children/${child.id}`} className="w-full md:w-auto">
                    <Button className="w-full md:w-auto bg-brand hover:bg-brand-dark text-white shadow-sm">
                      View Profile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ParentLayout>
  );
}