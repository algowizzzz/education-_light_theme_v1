import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Users, GraduationCap, Brain, User, Clock } from 'lucide-react';

export function ActiveUsers() {
  const userStats = [
    { role: 'Students', total: 247, active: 247, inactive: 0, icon: Users },
    { role: 'Teachers', total: 18, active: 17, inactive: 1, icon: GraduationCap },
    { role: 'Behavioral Experts', total: 3, active: 3, inactive: 0, icon: Brain },
    { role: 'Parents', total: 412, active: 387, inactive: 25, icon: User },
  ];

  const recentlyLoggedIn = [
    {
      name: 'Maria Johnson',
      role: 'Teacher',
      email: 'maria.johnson@lincolnelementary.edu',
      lastLogin: '2 minutes ago',
      status: 'online',
    },
    {
      name: 'Dr. Sarah Williams',
      role: 'Behavioral Expert',
      email: 'sarah.williams@lincolnelementary.edu',
      lastLogin: '15 minutes ago',
      status: 'online',
    },
    {
      name: 'Lisa Thompson',
      role: 'Parent',
      email: 'lisa.thompson@gmail.com',
      lastLogin: '1 hour ago',
      status: 'offline',
    },
    {
      name: 'Michael Brown',
      role: 'Teacher',
      email: 'michael.brown@lincolnelementary.edu',
      lastLogin: '2 hours ago',
      status: 'offline',
    },
    {
      name: 'David Chen',
      role: 'Parent',
      email: 'david.chen@gmail.com',
      lastLogin: '3 hours ago',
      status: 'offline',
    },
    {
      name: 'Sarah Wilson',
      role: 'Teacher',
      email: 'sarah.wilson@lincolnelementary.edu',
      lastLogin: '4 hours ago',
      status: 'offline',
    },
    {
      name: 'Robert Chen',
      role: 'Behavioral Expert',
      email: 'robert.chen@lincolnelementary.edu',
      lastLogin: '5 hours ago',
      status: 'offline',
    },
    {
      name: 'Ana Garcia',
      role: 'Parent',
      email: 'ana.garcia@gmail.com',
      lastLogin: '6 hours ago',
      status: 'offline',
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-text-heading mb-2">Active Users</h1>
          <p className="text-text-label">
            Monitor user activity and login status across all portals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {userStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.role} className="border-border-default">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-text-body" />
                  </div>
                  <div className="text-2xl font-bold text-text-heading mb-1">
                    {stat.total}
                  </div>
                  <div className="text-sm text-text-body mb-3">{stat.role}</div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-brand-dark" />
                      <span className="text-text-label">{stat.active} Active</span>
                    </div>
                    {stat.inactive > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-border-default" />
                        <span className="text-text-body">{stat.inactive} Inactive</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-border-default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-text-heading">
                Recently Logged In
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-text-body">
                <Clock className="w-4 h-4" />
                Last 24 hours
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border-default">
                  <TableHead className="text-text-heading">Name</TableHead>
                  <TableHead className="text-text-heading">Role</TableHead>
                  <TableHead className="text-text-heading">Email</TableHead>
                  <TableHead className="text-text-heading">Last Login</TableHead>
                  <TableHead className="text-text-heading">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentlyLoggedIn.map((user, index) => (
                  <TableRow key={index} className="border-border-default">
                    <TableCell className="font-medium text-text-heading">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-text-label">{user.role}</TableCell>
                    <TableCell className="text-text-label">{user.email}</TableCell>
                    <TableCell className="text-text-label">{user.lastLogin}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === 'online'
                            ? 'bg-brand-dark text-white border-brand-dark'
                            : 'bg-surface-page text-text-body border-border-default'
                        }
                      >
                        {user.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-text-heading mb-1">2</div>
              <div className="text-sm text-text-body">Users Online Now</div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-text-heading mb-1">47</div>
              <div className="text-sm text-text-body">Logins Today</div>
            </CardContent>
          </Card>

          <Card className="border-border-default">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-text-heading mb-1">312</div>
              <div className="text-sm text-text-body">Logins This Week</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
