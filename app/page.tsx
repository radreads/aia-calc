"use client";

import { useState, useMemo } from 'react';
import InputField from './components/InputField';
import ResultsCard from './components/ResultsCard';
import CostChart from './components/CostChart';
import {
  DEFAULT_PURCHASE_PRICE,
  DEFAULT_DOWN_PAYMENT_PERCENT,
  DEFAULT_MORTGAGE_RATE_PERCENT,
  DEFAULT_MORTGAGE_TERM_YEARS,
  DEFAULT_MONTHLY_RENT,
  DEFAULT_INVESTMENT_RETURN_PERCENT,
  DEFAULT_HOME_APPRECIATION_PERCENT,
  DEFAULT_ANALYSIS_PERIOD_YEARS,
} from '../lib/constants';
import { calculateBuyVsRent, findBreakevenYear } from '../lib/calc';
import { BarChart, HandCoins } from 'lucide-react';

export default function Home() {
  const [purchasePrice, setPurchasePrice] = useState(DEFAULT_PURCHASE_PRICE);
  const [downPaymentPercent, setDownPaymentPercent] = useState(DEFAULT_DOWN_PAYMENT_PERCENT);
  const [mortgageRatePercent, setMortgageRatePercent] = useState(DEFAULT_MORTGAGE_RATE_PERCENT);
  const [mortgageTermYears, setMortgageTermYears] = useState(DEFAULT_MORTGAGE_TERM_YEARS);
  const [monthlyRent, setMonthlyRent] = useState(DEFAULT_MONTHLY_RENT);
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState(DEFAULT_INVESTMENT_RETURN_PERCENT);
  const [homeAppreciationPercent, setHomeAppreciationPercent] = useState(DEFAULT_HOME_APPRECIATION_PERCENT);
  const [analysisPeriodYears, setAnalysisPeriodYears] = useState(DEFAULT_ANALYSIS_PERIOD_YEARS);

  const results = useMemo(() => {
    return calculateBuyVsRent({
      purchasePrice,
      downPaymentPercent,
      mortgageRatePercent,
      mortgageTermYears,
      monthlyRent,
      investmentReturnPercent,
      homeAppreciationPercent,
      analysisPeriodYears,
    });
  }, [
    purchasePrice,
    downPaymentPercent,
    mortgageRatePercent,
    mortgageTermYears,
    monthlyRent,
    investmentReturnPercent,
    homeAppreciationPercent,
    analysisPeriodYears,
  ]);

  const breakevenYear = useMemo(() => findBreakevenYear(results), [results]);
  const finalWealthDifference = results[results.length - 1]?.wealthDifference ?? 0;
  const isBuyingBetter = finalWealthDifference > 0;

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Buy vs. Rent Calculator</h1>
        <p className="text-lg text-gray-600 mt-2">
          Model key variables to compare wealth outcomes.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <HandCoins className="w-6 h-6 mr-3 text-indigo-600" />
            Core Inputs
          </h2>
          <div className="space-y-4">
            <InputField
              label="Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              type="number"
              prefix="$"
            />
            <InputField
              label="Down Payment"
              value={downPaymentPercent}
              onChange={setDownPaymentPercent}
              type="number"
              suffix="%"
            />
            <InputField
              label="Mortgage Rate"
              value={mortgageRatePercent}
              onChange={setMortgageRatePercent}
              type="number"
              suffix="%"
              step={0.1}
            />
            <InputField
              label="Mortgage Term"
              value={mortgageTermYears}
              onChange={setMortgageTermYears}
              type="number"
              suffix="years"
            />
            <InputField
              label="Monthly Rent"
              value={monthlyRent}
              onChange={setMonthlyRent}
              type="number"
              prefix="$"
            />
            <InputField
              label="Investment Return"
              value={investmentReturnPercent}
              onChange={setInvestmentReturnPercent}
              type="number"
              suffix="%"
              step={0.1}
            />
            <InputField
              label="Home Appreciation"
              value={homeAppreciationPercent}
              onChange={setHomeAppreciationPercent}
              type="number"
              suffix="%"
              step={0.1}
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <ResultsCard 
            breakevenYear={breakevenYear} 
            finalWealthDifference={finalWealthDifference}
            isBuyingBetter={isBuyingBetter}
            analysisPeriod={analysisPeriodYears}
          />
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
              <BarChart className="w-6 h-6 mr-3 text-indigo-600" />
              Wealth Difference Over Time
            </h2>
            <p className="text-gray-600 mb-4">
              Analysis Period: {analysisPeriodYears} years
            </p>
            <input
                type="range"
                min="1"
                max="50"
                value={analysisPeriodYears}
                onChange={(e) => setAnalysisPeriodYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            <div className="h-80 mt-4">
              <CostChart data={results} />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-10 text-sm text-gray-500">
        <p>Fixed assumptions: 1.5% property tax/insurance/maintenance, 3% rent growth, 2% purchase closing costs, 6% selling costs.</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Minimalist Calculator. All rights reserved.</p>
      </footer>
    </main>
  );
} 