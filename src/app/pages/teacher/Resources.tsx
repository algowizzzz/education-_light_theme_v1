import { useState } from 'react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { 
  BookOpen, 
  Search,
  Download,
  ExternalLink,
  FileText,
  Video
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'guide' | 'video' | 'template' | 'checklist';
  category: string;
  description: string;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Classroom Management Quick Reference',
      type: 'guide',
      category: 'Classroom Management',
      description: 'Quick-reference guide for effective classroom management strategies and de-escalation techniques.',
      tags: ['Management', 'Strategies', 'Quick Reference'],
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Incident Documentation Best Practices',
      type: 'guide',
      category: 'Documentation',
      description: 'Step-by-step guide for thorough and objective incident documentation.',
      tags: ['Documentation', 'Incidents', 'Best Practices'],
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'De-escalation Techniques Video',
      type: 'video',
      category: 'Training',
      description: '15-minute training video on effective de-escalation strategies for elementary students.',
      tags: ['De-escalation', 'Training', 'Video'],
      externalUrl: '#'
    },
    {
      id: '4',
      title: 'Behavior Tracking Sheet Template',
      type: 'template',
      category: 'Templates',
      description: 'Printable behavior tracking sheet for monitoring student patterns throughout the day.',
      tags: ['Tracking', 'Template', 'Monitoring'],
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'Parent Communication Templates',
      type: 'template',
      category: 'Communication',
      description: 'Email and phone call templates for communicating behavioral concerns with parents.',
      tags: ['Parent Communication', 'Templates'],
      downloadUrl: '#'
    },
    {
      id: '6',
      title: 'When to Escalate Checklist',
      type: 'checklist',
      category: 'Escalation',
      description: 'Decision-making checklist to help determine when to escalate behavioral concerns to experts.',
      tags: ['Escalation', 'Decision Support'],
      downloadUrl: '#'
    },
    {
      id: '7',
      title: 'Understanding ADHD in Elementary Students',
      type: 'guide',
      category: 'Special Needs',
      description: 'Overview of ADHD characteristics and classroom accommodation strategies.',
      tags: ['ADHD', 'Accommodations', 'Special Needs'],
      downloadUrl: '#'
    },
    {
      id: '8',
      title: 'Positive Reinforcement Strategies',
      type: 'guide',
      category: 'Intervention Strategies',
      description: 'Evidence-based positive reinforcement techniques for elementary classrooms.',
      tags: ['Positive Reinforcement', 'Strategies'],
      downloadUrl: '#'
    }
  ];

  const categories = ['all', 'Classroom Management', 'Documentation', 'Training', 'Templates', 'Communication', 'Escalation', 'Special Needs', 'Intervention Strategies'];

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="w-4 h-4 text-icon-general" />;
      case 'video':
        return <Video className="w-4 h-4 text-icon-general" />;
      case 'template':
      case 'checklist':
        return <FileText className="w-4 h-4 text-icon-general" />;
      default:
        return <FileText className="w-4 h-4 text-icon-general" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <TeacherLayout>
      <div className="max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Teacher Resources
          </h1>
          <p className="text-text-body">
            Helpful guides, templates, and tools for classroom behavior management
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 border-border-default">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-body" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-border-default text-text-heading"
                />
              </div>

              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.length === 0 ? (
            <div className="col-span-2">
              <Card className="border-border-default">
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-body">No resources match your search</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <Card key={resource.id} className="border-border-default hover:border-border-strong transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-icon-general-soft rounded border border-border-light">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base text-text-heading mb-1">
                        {resource.title}
                      </CardTitle>
                      <Badge variant="outline" className="border-border-strong text-text-body text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-label mb-3">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="border-border-default text-text-body text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-end pt-3 border-t border-border-light">
                    {resource.downloadUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    )}
                    {resource.externalUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border-strong text-text-heading bg-surface-card hover:bg-surface-page"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Watch
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </TeacherLayout>
  );
}
