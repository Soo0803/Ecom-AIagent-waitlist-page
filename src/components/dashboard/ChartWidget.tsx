"use client";
import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { cn } from '@/lib/utils';

type ChartType = 'line' | 'area' | 'bar';

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  data: Array<{ name: string; value: number; value2?: number }>;
  type?: ChartType;
  showGrid?: boolean;
  colors?: string[];
}

const chartTypes: { id: ChartType; label: string }[] = [
  { id: 'line', label: 'Line' },
  { id: 'area', label: 'Area' },
  { id: 'bar', label: 'Bar' },
];

export function ChartWidget({ 
  title, 
  subtitle, 
  data, 
  type = 'line',
  showGrid = true,
  colors = ['#5c7cfa', '#4a7c59']
}: ChartWidgetProps) {
  const [activeType, setActiveType] = useState<ChartType>(type);

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 10, left: 0, bottom: 0 },
    };

    switch (activeType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666666', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666666', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colors[0]} 
              fill={colors[0]}
              fillOpacity={0.1}
              strokeWidth={2}
            />
            {data[0]?.value2 !== undefined && (
              <Area 
                type="monotone" 
                dataKey="value2" 
                stroke={colors[1]} 
                fill={colors[1]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            )}
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666666', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666666', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
            {data[0]?.value2 !== undefined && (
              <Bar dataKey="value2" fill={colors[1]} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666666', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666666', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors[0]} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: colors[0] }}
            />
            {data[0]?.value2 !== undefined && (
              <Line 
                type="monotone" 
                dataKey="value2" 
                stroke={colors[1]} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: colors[1] }}
              />
            )}
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-sumi">{title}</h3>
          {subtitle && <p className="text-sm text-stone mt-1">{subtitle}</p>}
        </div>
        
        {/* Chart type toggle */}
        <div className="flex gap-1 p-1 bg-washi rounded-lg">
          {chartTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-all duration-200',
                activeType === t.id
                  ? 'bg-white text-sumi shadow-sm'
                  : 'text-stone hover:text-charcoal'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
