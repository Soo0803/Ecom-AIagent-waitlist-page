"use client";
import { motion } from 'framer-motion';
import { 
  Search, 
  Mail, 
  MessageSquare, 
  MoreHorizontal,
  Plus,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/ScrollReveal';
import { cn } from '@/lib/utils';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  avatar?: string;
  department: string;
  projects: number;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Yuki Tanaka',
    email: 'yuki@waga.com',
    role: 'Product Manager',
    status: 'online',
    department: 'Product',
    projects: 5,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@waga.com',
    role: 'Design Director',
    status: 'online',
    department: 'Design',
    projects: 3,
  },
  {
    id: '3',
    name: 'Mike Roberts',
    email: 'mike@waga.com',
    role: 'Lead Developer',
    status: 'busy',
    department: 'Engineering',
    projects: 4,
  },
  {
    id: '4',
    name: 'Kenji Sato',
    email: 'kenji@waga.com',
    role: 'Frontend Developer',
    status: 'online',
    department: 'Engineering',
    projects: 2,
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@waga.com',
    role: 'UX Designer',
    status: 'away',
    department: 'Design',
    projects: 3,
  },
  {
    id: '6',
    name: 'Lisa Park',
    email: 'lisa@waga.com',
    role: 'Backend Developer',
    status: 'offline',
    department: 'Engineering',
    projects: 4,
  },
  {
    id: '7',
    name: 'Tom Anderson',
    email: 'tom@waga.com',
    role: 'DevOps Engineer',
    status: 'online',
    department: 'Operations',
    projects: 6,
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria@waga.com',
    role: 'Data Analyst',
    status: 'busy',
    department: 'Analytics',
    projects: 2,
  },
];

const statusConfig = {
  online: { color: 'bg-moss', label: 'Online' },
  away: { color: 'bg-terracotta', label: 'Away' },
  busy: { color: 'bg-red-500', label: 'Busy' },
  offline: { color: 'bg-stone', label: 'Offline' },
};

export function TeamPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-sumi">Team</h1>
            <p className="text-stone mt-1">Manage team members and permissions</p>
          </div>
          <Button className="bg-indigo hover:bg-indigo-dark text-white">
            <Plus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-2xl font-bold text-sumi">{teamMembers.length}</p>
            <p className="text-sm text-stone">Total Members</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-2xl font-bold text-moss">
              {teamMembers.filter(m => m.status === 'online').length}
            </p>
            <p className="text-sm text-stone">Online</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-2xl font-bold text-indigo">4</p>
            <p className="text-sm text-stone">Departments</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card">
            <p className="text-2xl font-bold text-terracotta">12</p>
            <p className="text-sm text-stone">Active Projects</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={0.15}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <Input
              placeholder="Search members..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select className="h-10 px-4 rounded-lg border border-stone/20 bg-white text-sm">
              <option>All Departments</option>
              <option>Product</option>
              <option>Design</option>
              <option>Engineering</option>
              <option>Operations</option>
            </select>
            <select className="h-10 px-4 rounded-lg border border-stone/20 bg-white text-sm">
              <option>All Status</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Team grid */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {teamMembers.map((member) => {
          const status = statusConfig[member.status];
          
          return (
            <StaggerItem key={member.id}>
              <motion.div
                className="bg-white rounded-xl p-6 shadow-card"
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Header with menu */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn('w-3 h-3 rounded-full', status.color)} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-washi rounded">
                        <MoreHorizontal className="w-5 h-5 text-stone" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Permissions</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Avatar and info */}
                <div className="text-center mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-indigo/10 text-indigo text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-sumi">{member.name}</h3>
                  <p className="text-sm text-stone">{member.role}</p>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone">Department</span>
                    <Badge variant="secondary" className="font-normal">
                      {member.department}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone">Projects</span>
                    <span className="font-medium">{member.projects}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone">Status</span>
                    <span className="text-xs">{status.label}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-stone/10">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
