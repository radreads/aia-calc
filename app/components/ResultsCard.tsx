import { TrendingUp, TrendingDown, Landmark, Goal } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ResultsCardProps {
  breakevenYear: number | null;
  finalWealthDifference: number;
  isBuyingBetter: boolean;
  analysisPeriod: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function ResultsCard({
  breakevenYear,
  finalWealthDifference,
  isBuyingBetter,
  analysisPeriod,
}: ResultsCardProps) {
  const title = isBuyingBetter ? 'Buying is Better' : 'Renting is Better';
  const Icon = isBuyingBetter ? TrendingUp : TrendingDown;
  const bgColor = isBuyingBetter ? 'bg-green-50' : 'bg-blue-50';
  const textColor = isBuyingBetter ? 'text-green-800' : 'text-blue-800';
  const iconColor = isBuyingBetter ? 'text-green-600' : 'text-blue-600';

  return (
    <div className={twMerge("p-6 rounded-2xl shadow-lg border", bgColor)}>
      <h2 className={twMerge("text-2xl font-bold mb-4 flex items-center", textColor)}>
        <Icon className={twMerge("w-8 h-8 mr-3", iconColor)} />
        {title}
      </h2>
      <div className="space-y-3 text-lg">
        <div className="flex justify-between items-center">
          <p className="font-semibold flex items-center"><Landmark className="w-5 h-5 mr-2" /> Advantage After {analysisPeriod} Years</p>
          <p className="font-bold">{formatCurrency(Math.abs(finalWealthDifference))}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold flex items-center"><Goal className="w-5 h-5 mr-2" /> Break-Even Point</p>
          <p className="font-bold">{breakevenYear ? `Year ${breakevenYear}` : 'Never'}</p>
        </div>
      </div>
    </div>
  );
} 