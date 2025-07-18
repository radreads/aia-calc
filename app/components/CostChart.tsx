'use client';

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from 'recharts';
import { YearlyData } from '@/lib/calc';

interface CostChartProps {
  data: YearlyData[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

export default function CostChart({ data }: CostChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 5,
          bottom: 5,
        }}
        barGap={8}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
            dataKey="year" 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            tickLine={{ stroke: '#cbd5e1' }}
            axisLine={{ stroke: '#cbd5e1' }}
        />
        <YAxis 
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={{ stroke: '#cbd5e1' }}
            axisLine={{ stroke: '#cbd5e1' }}
        />
        <Tooltip
          formatter={(value: number, name: string) => [formatCurrency(value), name]}
          cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
          contentStyle={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
        />
        <Legend 
            iconSize={10} 
            wrapperStyle={{ fontSize: 12, color: '#475569', paddingTop: '10px' }} 
        />
        <Bar dataKey="buyNetWealth" name="Buy Net Wealth" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="rentNetWealth" name="Rent Net Wealth" fill="#818cf8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
} 