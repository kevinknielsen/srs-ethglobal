import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

const data = [
  { name: 'Oct 29', value: 100000 },
  { name: 'Oct 30', value: 400000 },
  { name: 'Oct 31', value: 700000 },
  { name: 'Nov 6', value: 1060000 },
];

interface StatsGraphProps {
  title: string;
  value: string;
  timestamp: string;
}

export function StatsGraph({ title, value, timestamp }: StatsGraphProps) {
  return (
    <div className="bg-[#0A0A0A] rounded-xl p-6 border border-white/10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm text-white/60 mb-1">{title}</h3>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-xs text-white/40 mt-1">{timestamp}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs text-white/60 hover:text-white">1m</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-white/60 hover:text-white">1y</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-white/60 hover:text-white">All</Button>
        </div>
      </div>
      
      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
