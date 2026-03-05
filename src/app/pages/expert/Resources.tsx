import { useState } from 'react';
import { ExpertLayout } from '@/app/components/ExpertLayout';
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
  Video,
  Link as LinkIcon
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'guide' | 'video' | 'template' | 'link';
  category: string;
  description: string;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
  lastUpdated: string;
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Functional Behavior Assessment (FBA) Template',
      type: 'template',
      category: 'Assessment Tools',
      description: 'Comprehensive template for conducting functional behavior assessments with detailed observation forms and data collection sheets.',
      tags: ['FBA', 'Assessment', 'Data Collection'],
      downloadUrl: '#',
      lastUpdated: 'Dec 2025'
    },
    {
      id: '2',
      title: 'De-escalation Strategies for Elementary Students',
      type: 'guide',
      category: 'Intervention Strategies',
      description: 'Evidence-based techniques for preventing and managing behavioral escalation in elementary school settings.',
      tags: ['De-escalation', 'Crisis Management', 'Elementary'],
      downloadUrl: '#',
      lastUpdated: 'Nov 2025'
    },
    {
      id: '3',
      title: 'Understanding ADHD in the Classroom',
      type: 'video',
      category: 'Training Videos',
      description: '45-minute professional development video covering ADHD diagnosis, classroom accommodations, and support strategies.',
      tags: ['ADHD', 'Training', 'Accommodations'],
      externalUrl: '#',
      lastUpdated: 'Oct 2025'
    },
    {
      id: '4',
      title: 'Positive Behavior Support Plan Template',
      type: 'template',
      category: 'Support Plans',
      description: 'Structured template for creating individualized positive behavior support plans with measurable goals and intervention strategies.',
      tags: ['PBS', 'Behavior Plan', 'Interventions'],
      downloadUrl: '#',
      lastUpdated: 'Dec 2025'
    },
    {
      id: '5',
      title: 'Research: Trauma-Informed Practices',
      type: 'article',
      category: 'Research & Evidence',
      description: 'Recent peer-reviewed research on implementing trauma-informed approaches in school settings.',
      tags: ['Trauma-Informed', 'Research', 'Best Practices'],
      externalUrl: '#',
      lastUpdated: 'Jan 2026'
    },
    {
      id: '6',
      title: 'Parent Communication Guidelines',
      type: 'guide',
      category: 'Communication',
      description: 'Best practices for effective and empathetic communication with parents about behavioral concerns.',
      tags: ['Parent Communication', 'Family Engagement'],
      downloadUrl: '#',
      lastUpdated: 'Nov 2025'
    },
    {
      id: '7',
      title: 'Autism Spectrum Support Strategies',
      type: 'guide',
      category: 'Intervention Strategies',
      description: 'Comprehensive guide to evidence-based interventions for students on the autism spectrum.',
      tags: ['Autism', 'ASD', 'Interventions', 'Special Education'],
      downloadUrl: '#',
      lastUpdated: 'Dec 2025'
    },
    {
      id: '8',
      title: 'CASEL Framework Resources',
      type: 'link',
      category: 'External Resources',
      description: 'Direct link to CASEL (Collaborative for Academic, Social, and Emotional Learning) resource library.',
      tags: ['SEL', 'Social-Emotional Learning', 'Framework'],
      externalUrl: 'https://casel.org',
      lastUpdated: 'Jan 2026'
    },
    {
      id: '9',
      title: 'Data-Driven Decision Making in Behavior Support',
      type: 'video',
      category: 'Training Videos',
      description: 'Workshop recording on using behavioral data to inform intervention decisions and measure progress.',
      tags: ['Data Analysis', 'Progress Monitoring', 'Training'],
      externalUrl: '#',
      lastUpdated: 'Sep 2025'
    },
    {
      id: '10',
      title: 'Crisis Response Protocol',
      type: 'guide',
      category: 'Safety & Crisis',
      description: 'Step-by-step protocol for responding to behavioral crises including documentation requirements.',
      tags: ['Crisis', 'Safety', 'Protocol', 'Emergency'],
      downloadUrl: '#',
      lastUpdated: 'Nov 2025'
    }
  ];

  const categories = ['all', 'Assessment Tools', 'Intervention Strategies', 'Training Videos', 'Support Plans', 'Research & Evidence', 'Communication', 'External Resources', 'Safety & Crisis'];
  const types = ['all', 'article', 'guide', 'video', 'template', 'link'];

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'guide':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'template':
        return <FileText className="w-4 h-4" />;
      case 'link':
        return <LinkIcon className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
    const matchesType = filterType === 'all' || resource.type === filterType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <ExpertLayout>
      <div className="max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl text-text-heading mb-2 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Resource Library
          </h1>
          <p className="text-text-body">
            Evidence-based tools, guides, and resources for behavioral support
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 border-border-default">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
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

              <div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full border border-border-default rounded-md px-3 py-2 text-text-heading"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Count */}
        <div className="mb-4">
          <p className="text-sm text-text-body">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 gap-4">
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
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-status-info-soft rounded border border-border-light">
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

                  <div className="flex items-center justify-between pt-3 border-t border-border-light">
                    <span className="text-xs text-text-body">
                      Updated {resource.lastUpdated}
                    </span>
                    {resource.downloadUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border-strong text-text-heading hover:bg-surface-page"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    )}
                    {resource.externalUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border-strong text-text-heading hover:bg-surface-page"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ExpertLayout>
  );
}
