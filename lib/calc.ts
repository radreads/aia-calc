import {
    PROPERTY_TAX_INSURANCE_MAINTENANCE_PERCENT,
    PURCHASE_CLOSING_COSTS_PERCENT,
    RENT_GROWTH_PERCENT,
    SELLING_CLOSING_COSTS_PERCENT,
  } from './constants';
  
  interface CalculationInputs {
    purchasePrice: number;
    downPaymentPercent: number;
    mortgageRatePercent: number;
    mortgageTermYears: number;
    monthlyRent: number;
    investmentReturnPercent: number;
    homeAppreciationPercent: number;
    analysisPeriodYears: number;
  }
  
  export interface YearlyData {
    year: number;
    buyNetWealth: number;
    rentNetWealth: number;
    wealthDifference: number;
  }
  
  function calculateMortgagePayment(principal: number, monthlyInterestRate: number, numberOfPayments: number): number {
    if (monthlyInterestRate === 0) return principal / numberOfPayments;
    return principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }
  
  export function calculateBuyVsRent(inputs: CalculationInputs): YearlyData[] {
    const {
      purchasePrice,
      downPaymentPercent,
      mortgageRatePercent,
      mortgageTermYears,
      monthlyRent,
      investmentReturnPercent,
      homeAppreciationPercent,
      analysisPeriodYears,
    } = inputs;
  
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const loanPrincipal = purchasePrice - downPaymentAmount;
    const monthlyMortgageRate = mortgageRatePercent / 100 / 12;
    const totalMortgagePayments = mortgageTermYears * 12;
    const monthlyInvestmentReturnRate = investmentReturnPercent / 100 / 12;
    const monthlyHomeAppreciationRate = homeAppreciationPercent / 100 / 12;
    const monthlyRentGrowthRate = RENT_GROWTH_PERCENT / 100 / 12;
  
    const monthlyMortgagePayment = calculateMortgagePayment(loanPrincipal, monthlyMortgageRate, totalMortgagePayments);
  
    const yearlyData: YearlyData[] = [];
  
    let remainingLoanBalance = loanPrincipal;
    let homeValue = purchasePrice;
    let cumulativeRenterSavings = downPaymentAmount + (purchasePrice * PURCHASE_CLOSING_COSTS_PERCENT / 100);
    let currentMonthlyRent = monthlyRent;
  
    for (let year = 1; year <= analysisPeriodYears; year++) {
      let annualMortgagePayments = 0;
      let annualInterestPaid = 0;
      let annualPrincipalPaid = 0;
      let annualTaxesAndMaintenance = 0;
      let annualRentPaid = 0;
  
      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingLoanBalance * monthlyMortgageRate;
        const principalPayment = monthlyMortgagePayment - interestPayment;
        
        remainingLoanBalance -= principalPayment;
        annualMortgagePayments += monthlyMortgagePayment;
        annualInterestPaid += interestPayment;
        annualPrincipalPaid += principalPayment;
  
        homeValue *= (1 + monthlyHomeAppreciationRate);
        
        annualTaxesAndMaintenance += (homeValue / 12) * (PROPERTY_TAX_INSURANCE_MAINTENANCE_PERCENT / 100);
  
        annualRentPaid += currentMonthlyRent;
        currentMonthlyRent *= (1 + monthlyRentGrowthRate);
  
        const ownerCashOut = monthlyMortgagePayment + (homeValue / 12) * (PROPERTY_TAX_INSURANCE_MAINTENANCE_PERCENT / 100);
        const renterCashOut = currentMonthlyRent;
        const cashFlowDifference = ownerCashOut - renterCashOut;
        cumulativeRenterSavings -= cashFlowDifference;
        cumulativeRenterSavings *= (1 + monthlyInvestmentReturnRate);
      }
      
      const homeEquity = homeValue - remainingLoanBalance;
      const sellingCosts = homeValue * (SELLING_CLOSING_COSTS_PERCENT / 100);
      const buyNetWealth = homeEquity - sellingCosts;
  
      const rentNetWealth = cumulativeRenterSavings;
  
      yearlyData.push({
        year,
        buyNetWealth,
        rentNetWealth,
        wealthDifference: buyNetWealth - rentNetWealth,
      });
    }
  
    return yearlyData;
  }
  
  export function findBreakevenYear(data: YearlyData[]): number | null {
      const breakeven = data.find(d => d.wealthDifference > 0);
      return breakeven ? breakeven.year : null;
  } 