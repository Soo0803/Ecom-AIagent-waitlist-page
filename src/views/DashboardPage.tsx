import { KPICard } from '@/components/dashboard/KPICard';
import { ChartWidget } from '@/components/dashboard/ChartWidget';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/ScrollReveal';

// Sample data
const kpiData = [
  { 
    label: 'Total Users', 
    value: '12,543', 
    change: 12.5, 
    changeType: 'increase' as const,
    sparklineData: [30, 45, 35, 50, 48, 60, 55, 70, 65, 80, 75, 90]
  },
  { 
    label: 'Active Projects', 
    value: '48', 
    change: 8.2, 
    changeType: 'increase' as const,
    sparklineData: [20, 25, 22, 30, 28, 35, 32, 40, 38, 45, 42, 48]
  },
  { 
    label: 'Completion Rate', 
    value: '87.3%', 
    change: -2.1, 
    changeType: 'decrease' as const,
    sparklineData: [85, 88, 86, 89, 87, 90, 88, 91, 89, 87, 88, 87]
  },
  { 
    label: 'Monthly Revenue', 
    value: '$24K', 
    change: 15.8, 
    changeType: 'increase' as const,
    sparklineData: [15, 18, 16, 20, 19, 22, 21, 24, 23, 26, 25, 28]
  },
];

const chartData = [
  { name: 'Jan', value: 4000, value2: 2400 },
  { name: 'Feb', value: 3000, value2: 1398 },
  { name: 'Mar', value: 2000, value2: 9800 },
  { name: 'Apr', value: 2780, value2: 3908 },
  { name: 'May', value: 1890, value2: 4800 },
  { name: 'Jun', value: 2390, value2: 3800 },
  { name: 'Jul', value: 3490, value2: 4300 },
  { name: 'Aug', value: 4200, value2: 5100 },
  { name: 'Sep', value: 3800, value2: 4700 },
  { name: 'Oct', value: 4500, value2: 5200 },
  { name: 'Nov', value: 5100, value2: 5800 },
  { name: 'Dec', value: 5600, value2: 6200 },
];

const activities = [
  {
    id: '1',
    type: 'user' as const,
    message: 'Yuki Tanaka joined the team',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    user: { name: 'Yuki Tanaka' },
  },
  {
    id: '2',
    type: 'project' as const,
    message: 'New project "WaGa Dashboard" was created',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '3',
    type: 'task' as const,
    message: 'Task "Design Review" was completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    user: { name: 'Sarah Chen' },
  },
  {
    id: '4',
    type: 'comment' as const,
    message: 'Mike Roberts commented on "API Design"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    user: { name: 'Mike Roberts' },
  },
  {
    id: '5',
    type: 'system' as const,
    message: 'System maintenance completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: '6',
    type: 'user' as const,
    message: 'Emma Wilson joined the team',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    user: { name: 'Emma Wilson' },
  },
  {
    id: '7',
    type: 'task' as const,
    message: 'Task "Documentation" is overdue',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <ScrollReveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-sumi">Dashboard</h1>
            <p className="text-stone mt-1">Overview of your workspace</p>
          </div>
          <div className="flex gap-2">
            <select className="h-10 px-4 rounded-lg border border-stone/20 bg-white text-sm">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Cards */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <StaggerItem key={index}>
            <KPICard {...kpi} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Charts and Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main chart */}
        <div className="lg:col-span-2">
          <ScrollReveal delay={0.2}>
            <ChartWidget
              title="Revenue Trend"
              subtitle="Revenue over time"
              data={chartData}
              type="area"
            />
          </ScrollReveal>
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-1">
          <ActivityFeed activities={activities} />
        </div>
      </div>

      {/* Secondary chart */}
      <ScrollReveal delay={0.3}>
        <ChartWidget
          title="Tasks by Project"
          subtitle="Completed tasks breakdown"
          data={[
            { name: 'Project A', value: 45 },
            { name: 'Project B', value: 32 },
            { name: 'Project C', value: 28 },
            { name: 'Project D', value: 21 },
            { name: 'Project E', value: 18 },
            { name: 'Project F', value: 15 },
          ]}
          type="bar"
        />
      </ScrollReveal>

      {/* Quick stats row */}
      <ScrollReveal delay={0.4}>
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-sumi mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo">156</p>
              <p className="text-sm text-stone mt-1">Tasks Done</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-moss">23</p>
              <p className="text-sm text-stone mt-1">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-terracotta">8</p>
              <p className="text-sm text-stone mt-1">Overdue</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-sky">94%</p>
              <p className="text-sm text-stone mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
