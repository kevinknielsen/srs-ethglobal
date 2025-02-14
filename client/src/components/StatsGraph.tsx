import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useState } from 'react';

// Dummy data for different time periods
const monthData = [
  { name: 'Oct 29', value: 200000 },
  { name: 'Oct 30', value: 350000 },
  { name: 'Oct 30', value: 600000 },
  { name: 'Nov 6', value: 870500 },
];

const yearData = [
  { name: 'Jan', value: 100000 },
  { name: 'Mar', value: 300000 },
  { name: 'Jun', value: 500000 },
  { name: 'Sep', value: 700000 },
  { name: 'Nov', value: 870500 },
];

const allTimeData = [
  { name: '2023', value: 200000 },
  { name: '2024', value: 500000 },
  { name: '2025', value: 870500 },
];

interface StatsGraphProps {
  title: string;
  value: string;
  timestamp: string;
}

export function StatsGraph({ title, value, timestamp }: StatsGraphProps) {
  const [timeFilter, setTimeFilter] = useState<'1m' | '1y' | 'All'>('1m');

  const getActiveData = () => {
    switch(timeFilter) {
      case '1m':
        return monthData;
      case '1y':
        return yearData;
      case 'All':
        return allTimeData;
    }
  };

  return (
    <div className="bg-[#0A0A0A] rounded-xl p-6 border border-white/10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm text-white/60 mb-1">{title}</h3>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-xs text-white/40 mt-1">{timestamp}</div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeFilter === '1m' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-7 text-xs text-white/60 hover:text-white"
            onClick={() => setTimeFilter('1m')}
          >
            1m
          </Button>
          <Button 
            variant={timeFilter === '1y' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-7 text-xs text-white/60 hover:text-white"
            onClick={() => setTimeFilter('1y')}
          >
            1y
          </Button>
          <Button 
            variant={timeFilter === 'All' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-7 text-xs text-white/60 hover:text-white"
            onClick={() => setTimeFilter('All')}
          >
            All
          </Button>
        </div>
      </div>

      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getActiveData()}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}