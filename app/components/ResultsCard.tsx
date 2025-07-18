import { TrendingUp, TrendingDown, Landmark, Goal, Wallet } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { YearlyData } from '@/lib/calc';

interface ResultsCardProps {
  results: YearlyData[];
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
  results,
  breakevenYear,
  finalWealthDifference,
  isBuyingBetter,
  analysisPeriod,
}: ResultsCardProps) {
  const title = isBuyingBetter ? 'Renting is Better' : 'Buying is Better';
  const Icon = isBuyingBetter ? TrendingDown : TrendingUp;
  const bgColor = isBuyingBetter ? 'bg-blue-50' : 'bg-green-50';
  const textColor = isBuyingBetter ? 'text-blue-800' : 'text-green-800';
  const iconColor = isBuyingBetter ? 'text-blue-600' : 'text-green-600';

  const finalBuyerWealth = results[results.length - 1]?.buyNetWealth ?? 0;
  const finalRenterWealth = results[results.length - 1]?.rentNetWealth ?? 0;
  const downPayment = results[0]?.downPayment ?? 0;
  const mortgagePayment = results[0]?.monthlyMortgagePayment ?? 0;

  return (
    <div className="p-6 rounded-2xl shadow-lg border border-slate-200 bg-white">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center">
            <Wallet className="w-6 h-6 mr-3 text-indigo-500" />
            Financial Analysis
        </h2>

        <div className={twMerge("p-4 rounded-lg mb-6", bgColor, textColor)}>
            <div className="flex items-center font-bold text-lg">
                <Icon className={twMerge("w-6 h-6 mr-2", iconColor)} />
                {title}
            </div>
            <p className="mt-1 text-sm">
                Renting provides {formatCurrency(Math.abs(finalWealthDifference))} more wealth after {analysisPeriod} years
            </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center mb-6">
            <div>
                <p className="text-sm text-slate-600">Buy Net Wealth</p>
                <p className="text-xl font-bold text-slate-800">{formatCurrency(finalBuyerWealth)}</p>
            </div>
            <div>
                <p className="text-sm text-slate-600">Rent Net Wealth</p>
                <p className="text-xl font-bold text-slate-800">{formatCurrency(finalRenterWealth)}</p>
            </div>
        </div>
      
        <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between">
                <span>Monthly Mortgage Payment:</span>
                <span className="font-semibold">{formatCurrency(mortgagePayment)}</span>
            </div>
            <div className="flex justify-between">
                <span>Total Down Payment:</span>
                <span className="font-semibold">{formatCurrency(downPayment)}</span>
            </div>
            <div className="flex justify-between">
                <span>Break-Even Year:</span>
                <span className="font-semibold">{breakevenYear ? `Year ${breakevenYear}` : 'Never (within analysis period)'}</span>
            </div>
        </div>
    </div>
  );
} 