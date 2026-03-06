import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { MARCUS_PROFILE, STUDENTS } from '@/data/constants';

export default function ChildProfileNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // For demo, we'll use Marcus's profile if the ID matches, otherwise use a generic student
  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];
  const profile = id === 'STU-4298' ? MARCUS_PROFILE : null;

  return (
    <ParentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          to="/parent/dashboard"
          className="inline-flex items-center text-text-label hover:text-text-heading"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Student Header */}
        <Card className="p-6 border border-border-default bg-surface-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-icon-person-soft flex items-center justify-center">
                <User className="w-8 h-8 text-icon-person" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-heading">
                  {student.name}
                </h1>
                <div className="flex items-center space-x-4 text-text-body">
                  <span>{student.id}</span>
                  <span>•</span>
                  <span>Grade {student.grade}</span>
                  <span>•</span>
                  <span>Teacher: {student.primaryTeacher}</span>
                </div>
                <div className="text-sm text-text-body mt-1">
                  Behavioral Expert: {student.behavioralExpert}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate(`/parent/children/${id}/cases`)}
                variant="outline"
                className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
              >
                View Cases
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-surface-card border border-border-default p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-brand data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="triggers"
              className="data-[state=active]:bg-brand data-[state=active]:text-white"
            >
              Triggers
            </TabsTrigger>
            <TabsTrigger
              value="strategies"
              className="data-[state=active]:bg-brand data-[state=active]:text-white"
            >
              Strategies
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Known Triggers */}
              <Card className="p-6 border border-border-default bg-surface-card">
                <h3 className="text-lg font-semibold text-text-heading mb-4">
                  Known Triggers
                </h3>
                {profile ? (
                  <ul className="space-y-2">
                    {profile.triggers.map((trigger, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-status-warning"></span>
                        <span className="text-text-label">{trigger.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-body">No triggers recorded yet.</p>
                )}
              </Card>

              {/* What Usually Works */}
              <Card className="p-6 border border-border-default bg-surface-card">
                <h3 className="text-lg font-semibold text-text-heading mb-4">
                  What Usually Works
                </h3>
                {profile ? (
                  <ol className="space-y-2">
                    {profile.strategies.map((strategy, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="font-medium text-text-heading min-w-[1.5rem]">
                          {strategy.priority}.
                        </span>
                        <p className="text-text-label">{strategy.name}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-text-body">No strategies recorded yet.</p>
                )}
              </Card>
            </div>

            {/* Recent Incident Timeline */}
            <Card className="p-6 border border-border-default bg-surface-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-heading">
                  Recent Incident Timeline
                </h3>
                <Link to={`/parent/children/${id}/incidents`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-brand-dark/40 text-brand-dark bg-surface-card hover:bg-surface-page"
                  >
                    View All
                  </Button>
                </Link>
              </div>
              {profile && profile.incidents.length > 0 ? (
                <div className="space-y-4">
                  {profile.incidents.slice(0, 5).map((incident) => (
                    <Link
                      key={incident.id}
                      to={`/parent/children/${id}/incidents/${incident.id}`}
                      className="block border-l-2 border-border-default pl-4 pb-4 hover:border-border-strong transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-text-body">
                          {incident.date} • {incident.time}
                        </p>
                        <Badge
                          className={
                            incident.status === 'Closed'
                              ? 'bg-status-success-soft text-status-success border border-status-success-border'
                              : 'bg-status-warning-soft text-status-warning border border-status-warning-border'
                          }
                        >
                          {incident.status}
                        </Badge>
                      </div>
                      <p className="text-text-heading font-medium mb-1">
                        {incident.trigger}
                      </p>
                      <p className="text-text-label text-sm mb-2">
                        {incident.notes}
                      </p>
                      <p className="text-xs text-text-body">
                        ID: {incident.id}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-text-body">No incidents recorded for this student yet.</p>
              )}
            </Card>
          </TabsContent>

          {/* Triggers Tab */}
          <TabsContent value="triggers">
            <Card className="p-6 border border-border-default bg-surface-card">
              <h3 className="text-lg font-semibold text-text-heading mb-4">
                All Triggers
              </h3>
              {profile ? (
                <div className="space-y-4">
                  {profile.triggers.map((trigger, index) => (
                    <div
                      key={index}
                      className="p-4 border border-border-light rounded-lg"
                    >
                      <p className="font-medium text-text-heading">{trigger.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-body">No triggers recorded yet.</p>
              )}
            </Card>
          </TabsContent>

          {/* Strategies Tab */}
          <TabsContent value="strategies">
            <Card className="p-6 border border-border-default bg-surface-card">
              <h3 className="text-lg font-semibold text-text-heading mb-4">
                Intervention Strategies
              </h3>
              {profile ? (
                <div className="space-y-4">
                  {profile.strategies.map((strategy, index) => (
                    <div
                      key={index}
                      className="p-4 border border-border-light rounded-lg"
                    >
                      <p className="font-medium text-text-heading">{strategy.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-body">No strategies recorded yet.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ParentLayout>
  );
}