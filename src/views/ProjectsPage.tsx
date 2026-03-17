"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Circle,
  PauseCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/ScrollReveal';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  progress: number;
  deadline: string;
  team: { name: string; avatar?: string }[];
}

const projects: Project[] = [
  {
    id: '1',
    name: 'WaGa Dashboard',
    description: 'Japanese-inspired dashboard design and development',
    status: 'active',
    progress: 75,
    deadline: '2024-04-15',
    team: [
      { name: 'Yuki Tanaka', avatar: '' },
      { name: 'Sarah Chen', avatar: '' },
      { name: 'Mike Roberts', avatar: '' },
    ],
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    description: 'Modern shopping experience with AI recommendations',
    status: 'active',
    progress: 45,
    deadline: '2024-05-20',
    team: [
      { name: 'Kenji Sato', avatar: '' },
      { name: 'Emma Wilson', avatar: '' },
    ],
  },
  {
    id: '3',
    name: 'Mobile App Redesign',
    description: 'Complete UI/UX overhaul for iOS and Android',
    status: 'completed',
    progress: 100,
    deadline: '2024-03-01',
    team: [
      { name: 'Lisa Park', avatar: '' },
      { name: 'Tom Anderson', avatar: '' },
      { name: 'Yuna Kim', avatar: '' },
      { name: 'David Lee', avatar: '' },
    ],
  },
  {
    id: '4',
    name: 'API Integration',
    description: 'Third-party service integrations and webhooks',
    status: 'on_hold',
    progress: 30,
    deadline: '2024-06-10',
    team: [
      { name: 'Alex Johnson', avatar: '' },
    ],
  },
  {
    id: '5',
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization and reporting',
    status: 'active',
    progress: 60,
    deadline: '2024-04-30',
    team: [
      { name: 'Maria Garcia', avatar: '' },
      { name: 'James Brown', avatar: '' },
    ],
  },
];

const statusConfig = {
  active: { label: 'Active', color: 'bg-indigo/10 text-indigo border-indigo/20', icon: Circle },
  completed: { label: 'Completed', color: 'bg-moss/10 text-moss border-moss/20', icon: CheckCircle2 },
  on_hold: { label: 'On Hold', color: 'bg-stone/10 text-stone border-stone/20', icon: PauseCircle },
};

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-sumi">Projects</h1>
            <p className="text-stone mt-1">Manage your projects and track progress</p>
          </div>
          <Button className="bg-indigo hover:bg-indigo-dark text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-stone/20 bg-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Projects grid */}
      <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProjects.map((project) => {
          const status = statusConfig[project.status];
          const StatusIcon = status.icon;
          
          return (
            <StaggerItem key={project.id}>
              <motion.div
                className="bg-white rounded-xl p-6 shadow-card"
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className={cn('flex items-center gap-1', status.color)}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-washi rounded">
                        <MoreHorizontal className="w-5 h-5 text-stone" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-sumi mb-2">{project.name}</h3>
                <p className="text-sm text-stone mb-4 line-clamp-2">{project.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-stone">Progress</span>
                    <span className="font-medium text-sumi">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-stone/10">
                  <div className="flex items-center gap-2 text-sm text-stone">
                    <Calendar className="w-4 h-4" />
                    <span>{project.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="w-7 h-7 border-2 border-white">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-indigo/10 text-indigo text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-washi border-2 border-white flex items-center justify-center text-xs text-stone">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-washi rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-stone" />
          </div>
          <h3 className="text-lg font-medium text-sumi mb-2">No projects found</h3>
          <p className="text-stone">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
