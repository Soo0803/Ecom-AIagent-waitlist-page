"use client";
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  FolderPlus, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from '@/lib/utils';

type ActivityType = 'user' | 'project' | 'task' | 'comment' | 'system';

interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons: Record<ActivityType, typeof UserPlus> = {
  user: UserPlus,
  project: FolderPlus,
  task: CheckCircle2,
  comment: MessageSquare,
  system: AlertCircle,
};

const activityColors: Record<ActivityType, string> = {
  user: 'bg-indigo/10 text-indigo',
  project: 'bg-moss/10 text-moss',
  task: 'bg-sky/10 text-sky',
  comment: 'bg-terracotta/10 text-terracotta',
  system: 'bg-stone/10 text-stone',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-card h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-sumi">Activity</h3>
          <p className="text-sm text-stone">Recent updates</p>
        </div>
        <button className="p-2 hover:bg-washi rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-stone" />
        </button>
      </div>

      {/* Activity list */}
      <ScrollArea className="h-[300px] -mx-2 px-2">
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, items]) => (
            <div key={date}>
              {/* Date header */}
              <p className="text-xs font-medium text-stone uppercase tracking-wider mb-3 sticky top-0 bg-white py-1">
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </p>
              
              {/* Activities */}
              <div className="space-y-4">
                {items.map((activity, index) => {
                  const Icon = activityIcons[activity.type];
                  return (
                    <motion.div
                      key={activity.id}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {/* Icon or avatar */}
                      {activity.user ? (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback className="bg-indigo/10 text-indigo text-xs">
                            {activity.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activityColors[activity.type]}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-charcoal leading-relaxed">
                          {activity.message}
                        </p>
                        <p className="text-xs text-stone mt-1">
                          {formatDistanceToNow(activity.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
