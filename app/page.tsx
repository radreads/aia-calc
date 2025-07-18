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
  PROPERTY_TAX_INSURANCE_MAINTENANCE_PERCENT,
  RENT_GROWTH_PERCENT,
  PURCHASE_CLOSING_COSTS_PERCENT,
  SELLING_CLOSING_COSTS_PERCENT,
} from '../lib/constants';
import { calculateBuyVsRent, findBreakevenYear } from '../lib/calc';
import { BarChart, HandCoins, Landmark } from 'lucide-react';

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
    <main className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">
      <header className="text-center mb-12">
        <div className="inline-block bg-white p-3 rounded-2xl shadow-md mb-4">
            <Landmark className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800">Buy vs. Rent Calculator</h1>
        <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">
          Compare the financial impact of buying versus renting over time. Model key variables to make an informed housing decision.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800 flex items-center">
            <HandCoins className="w-6 h-6 mr-3 text-indigo-500" />
            Core Inputs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <InputField
              label="Analysis Period"
              value={analysisPeriodYears}
              onChange={setAnalysisPeriodYears}
              type="number"
              suffix="years"
            />
          </div>
          <div className="bg-slate-100 p-4 rounded-lg text-slate-600 text-sm">
              <h3 className="font-semibold text-slate-700 mb-2">Fixed Assumptions</h3>
              <ul className="list-disc list-inside space-y-1">
                  <li>Property tax + insurance + maintenance: {PROPERTY_TAX_INSURANCE_MAINTENANCE_PERCENT}% annually</li>
                  <li>Rent growth: {RENT_GROWTH_PERCENT}% per year</li>
                  <li>Purchase closing costs: {PURCHASE_CLOSING_COSTS_PERCENT}%</li>
                  <li>Sale closing costs: {SELLING_CLOSING_COSTS_PERCENT}%</li>
              </ul>
          </div>
        </div>

        <div className="space-y-8">
          <ResultsCard 
            results={results}
            breakevenYear={breakevenYear} 
            finalWealthDifference={finalWealthDifference}
            isBuyingBetter={isBuyingBetter}
            analysisPeriod={analysisPeriodYears}
          />
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center">
              <BarChart className="w-6 h-6 mr-3 text-indigo-500" />
              Wealth Comparison Over Time
            </h2>
            <div className="h-80 mt-4">
              <CostChart data={results} />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-12 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Buy vs. Rent Calculator. All rights reserved.</p>
      </footer>
    </main>
  );
} 