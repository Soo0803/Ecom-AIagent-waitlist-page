"use client";
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  sparklineData?: number[];
}

export function KPICard({ label, value, change, changeType, sparklineData }: KPICardProps) {
  const isPositive = changeType === 'increase';
  const isNegative = changeType === 'decrease';
  const isNeutral = changeType === 'neutral';

  // Generate sparkline path
  const generateSparkline = (data: number[]) => {
    if (!data || data.length < 2) return '';
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 60;
    const height = 24;
    
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-card"
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Label */}
      <p className="text-sm text-stone mb-2">{label}</p>
      
      {/* Value and change row */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-stat text-sumi">{value}</p>
          
          {/* Change indicator */}
          <div className={cn(
            'flex items-center gap-1 mt-1 text-sm',
            isPositive && 'text-moss',
            isNegative && 'text-red-500',
            isNeutral && 'text-stone'
          )}>
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {isNegative && <TrendingDown className="w-4 h-4" />}
            {isNeutral && <Minus className="w-4 h-4" />}
            <span>{change > 0 ? '+' : ''}{change}%</span>
            <span className="text-stone ml-1">vs last month</span>
          </div>
        </div>
        
        {/* Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-[60px] h-[24px]">
            <svg width="60" height="24" viewBox="0 0 60 24">
              <path
                d={generateSparkline(sparklineData)}
                fill="none"
                stroke={isPositive ? '#4a7c59' : isNegative ? '#ef4444' : '#666666'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
