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
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
            dataKey="year" 
            tick={{ fill: '#6b7280' }} 
            tickLine={{ stroke: '#6b7280' }}
        />
        <YAxis 
            tickFormatter={(value) => formatCurrency(value)} 
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#6b7280' }}
        />
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          cursor={{ fill: 'rgba(238, 242, 255, 0.5)' }}
          contentStyle={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        />
        <Legend wrapperStyle={{ color: '#4b5563' }} />
        <Bar dataKey="buyNetWealth" name="Buyer Net Wealth" fill="#10b981" />
        <Bar dataKey="rentNetWealth" name="Renter Net Wealth" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
} 