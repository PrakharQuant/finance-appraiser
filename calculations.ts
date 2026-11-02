// Financial Appraisal Calculation Utilities

export interface CashFlowInput {
  initialInvestment: number;
  cashFlows: number[];
  discountRate: number;
}

export interface BreakEvenInput {
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPricePerUnit: number;
}

export interface NPVResult {
  npv: number;
  discountedCashFlows: number[];
  accept: boolean;
  steps: string[];
}

export interface IRRResult {
  irr: number;
  npvAtLower: number;
  npvAtHigher: number;
  lowerRate: number;
  higherRate: number;
  steps: string[];
}

export interface PaybackResult {
  paybackPeriod: number;
  cumulativeCashFlows: number[];
  steps: string[];
}

export interface ARRResult {
  arr: number;
  averageAnnualProfit: number;
  averageInvestment: number;
  steps: string[];
}

export interface BCRResult {
  bcr: number;
  pvOfInflows: number;
  pvOfOutflows: number;
  accept: boolean;
  steps: string[];
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  steps: string[];
}

// NPV Calculation
export function calculateNPV(input: CashFlowInput): NPVResult {
  const { initialInvestment, cashFlows, discountRate } = input;
  const rate = discountRate / 100;
  const steps: string[] = [];
  const discountedCashFlows: number[] = [];

  steps.push(`Step 1: Identify cash flows and discount rate (${discountRate}%)`);
  steps.push(`Step 2: Initial Investment = $${initialInvestment.toLocaleString()}`);

  let totalPV = -initialInvestment;

  cashFlows.forEach((cf, i) => {
    const year = i + 1;
    const discountFactor = Math.pow(1 + rate, year);
    const pv = cf / discountFactor;
    discountedCashFlows.push(pv);
    totalPV += pv;
    steps.push(`Year ${year}: $${cf.toLocaleString()} / (1 + ${rate})^${year} = $${pv.toFixed(2)}`);
  });

  steps.push(`Step 3: NPV = -$${initialInvestment.toLocaleString()} + Σ PV of cash flows = $${totalPV.toFixed(2)}`);
  steps.push(totalPV >= 0 ? '✅ Decision: ACCEPT (NPV ≥ 0)' : '❌ Decision: REJECT (NPV < 0)');

  return {
    npv: totalPV,
    discountedCashFlows,
    accept: totalPV >= 0,
    steps,
  };
}

// IRR Calculation using Linear Interpolation
export function calculateIRR(initialInvestment: number, cashFlows: number[]): IRRResult {
  const steps: string[] = [];

  function npvAtRate(rate: number): number {
    let npv = -initialInvestment;
    cashFlows.forEach((cf, i) => {
      npv += cf / Math.pow(1 + rate / 100, i + 1);
    });
    return npv;
  }

  // Find two rates where NPV changes sign
  let lowerRate = 1;
  let higherRate = 50;
  let npvLower = npvAtRate(lowerRate);
  let npvHigher = npvAtRate(higherRate);

  // Adjust rates if needed
  while (npvLower < 0 && lowerRate > 0) {
    lowerRate -= 1;
    npvLower = npvAtRate(lowerRate);
  }
  while (npvHigher > 0 && higherRate < 200) {
    higherRate += 10;
    npvHigher = npvAtRate(higherRate);
  }

  // Linear interpolation
  const irr = lowerRate + (npvLower / (npvLower - npvHigher)) * (higherRate - lowerRate);

  steps.push(`Step 1: Calculate NPV at lower rate (${lowerRate}%): NPV = $${npvLower.toFixed(2)}`);
  steps.push(`Step 2: Calculate NPV at higher rate (${higherRate}%): NPV = $${npvHigher.toFixed(2)}`);
  steps.push(`Step 3: Linear Interpolation Formula:`);
  steps.push(`   IRR = L + [NPV_L / (NPV_L - NPV_H)] × (H - L)`);
  steps.push(`   IRR = ${lowerRate}% + [${npvLower.toFixed(2)} / (${npvLower.toFixed(2)} - ${npvHigher.toFixed(2)})] × (${higherRate}% - ${lowerRate}%)`);
  steps.push(`   IRR = ${irr.toFixed(2)}%`);

  return {
    irr,
    npvAtLower: npvLower,
    npvAtHigher: npvHigher,
    lowerRate,
    higherRate,
    steps,
  };
}

// Payback Period Calculation
export function calculatePaybackPeriod(initialInvestment: number, cashFlows: number[]): PaybackResult {
  const steps: string[] = [];
  const cumulativeCashFlows: number[] = [];
  let cumulative = -initialInvestment;

  steps.push(`Step 1: Initial Investment = $${initialInvestment.toLocaleString()}`);

  let paybackYear = cashFlows.length;
  let paybackPeriod = cashFlows.length;

  for (let i = 0; i < cashFlows.length; i++) {
    const prevCumulative = cumulative;
    cumulative += cashFlows[i];
    cumulativeCashFlows.push(cumulative);
    steps.push(`Year ${i + 1}: Cumulative = $${prevCumulative.toLocaleString()} + $${cashFlows[i].toLocaleString()} = $${cumulative.toLocaleString()}`);

    if (cumulative >= 0 && paybackPeriod === cashFlows.length) {
      const fraction = Math.abs(prevCumulative) / cashFlows[i];
      paybackPeriod = i + fraction;
      paybackYear = i + 1;
      steps.push(`   Payback occurs in Year ${i + 1}: ${i} + ($${Math.abs(prevCumulative).toLocaleString()} / $${cashFlows[i].toLocaleString()}) = ${paybackPeriod.toFixed(2)} years`);
      break;
    }
  }

  steps.push(`Payback Period = ${paybackPeriod.toFixed(2)} years`);

  return {
    paybackPeriod,
    cumulativeCashFlows,
    steps,
  };
}

// ARR (Accounting Rate of Return) Calculation
export function calculateARR(initialInvestment: number, cashFlows: number[], residualValue: number = 0): ARRResult {
  const steps: string[] = [];
  const totalCashInflows = cashFlows.reduce((sum, cf) => sum + cf, 0);
  const totalDepreciation = initialInvestment - residualValue;
  const averageAnnualProfit = (totalCashInflows - totalDepreciation) / cashFlows.length;
  const averageInvestment = (initialInvestment + residualValue) / 2;
  const arr = (averageAnnualProfit / averageInvestment) * 100;

  steps.push(`Step 1: Total Cash Inflows = $${totalCashInflows.toLocaleString()}`);
  steps.push(`Step 2: Total Depreciation = $${initialInvestment.toLocaleString()} - $${residualValue.toLocaleString()} = $${totalDepreciation.toLocaleString()}`);
  steps.push(`Step 3: Average Annual Profit = ($${totalCashInflows.toLocaleString()} - $${totalDepreciation.toLocaleString()}) / ${cashFlows.length} = $${averageAnnualProfit.toFixed(2)}`);
  steps.push(`Step 4: Average Investment = ($${initialInvestment.toLocaleString()} + $${residualValue.toLocaleString()}) / 2 = $${averageInvestment.toFixed(2)}`);
  steps.push(`Step 5: ARR = ($${averageAnnualProfit.toFixed(2)} / $${averageInvestment.toFixed(2)}) × 100 = ${arr.toFixed(2)}%`);

  return {
    arr,
    averageAnnualProfit,
    averageInvestment,
    steps,
  };
}

// BCR (Benefit-Cost Ratio) / PI (Profitability Index)
export function calculateBCR(initialInvestment: number, cashFlows: number[], discountRate: number): BCRResult {
  const steps: string[] = [];
  const rate = discountRate / 100;

  let pvOfInflows = 0;
  cashFlows.forEach((cf, i) => {
    const pv = cf / Math.pow(1 + rate, i + 1);
    pvOfInflows += pv;
    steps.push(`Year ${i + 1}: $${cf.toLocaleString()} / (1.0${discountRate})^${i + 1} = $${pv.toFixed(2)}`);
  });

  const pvOfOutflows = initialInvestment;
  const bcr = pvOfInflows / pvOfOutflows;

  steps.push(`Step 1: PV of Inflows = $${pvOfInflows.toFixed(2)}`);
  steps.push(`Step 2: PV of Outflows = $${pvOfOutflows.toLocaleString()}`);
  steps.push(`Step 3: BCR = $${pvOfInflows.toFixed(2)} / $${pvOfOutflows.toLocaleString()} = ${bcr.toFixed(4)}`);
  steps.push(bcr >= 1 ? '✅ Decision: ACCEPT (BCR ≥ 1)' : '❌ Decision: REJECT (BCR < 1)');

  return {
    bcr,
    pvOfInflows,
    pvOfOutflows,
    accept: bcr >= 1,
    steps,
  };
}

// Break-Even Analysis
export function calculateBreakEven(input: BreakEvenInput): BreakEvenResult {
  const { fixedCosts, variableCostPerUnit, sellingPricePerUnit } = input;
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;

  const steps: string[] = [
    `Step 1: Contribution Margin = Selling Price - Variable Cost = $${sellingPricePerUnit} - $${variableCostPerUnit} = $${contributionMargin.toFixed(2)}`,
    `Step 2: Break-Even Units = Fixed Costs / Contribution Margin = $${fixedCosts.toLocaleString()} / $${contributionMargin.toFixed(2)} = ${breakEvenUnits.toFixed(0)} units`,
    `Step 3: Break-Even Revenue = ${breakEvenUnits.toFixed(0)} × $${sellingPricePerUnit} = $${breakEvenRevenue.toFixed(2)}`,
  ];

  return {
    breakEvenUnits,
    breakEvenRevenue,
    contributionMargin,
    steps,
  };
}

// Sensitivity Analysis
export function calculateSensitivity(
  initialInvestment: number,
  cashFlows: number[],
  discountRate: number
): { variable: string; maxChange: number; direction: string }[] {
  const baseNPV = calculateNPV({ initialInvestment, cashFlows, discountRate }).npv;
  const results: { variable: string; maxChange: number; direction: string }[] = [];

  // Sensitivity to Initial Investment
  const maxInvestmentChange = (baseNPV / initialInvestment) * 100;
  results.push({ variable: 'Initial Investment', maxChange: Math.abs(maxInvestmentChange), direction: maxInvestmentChange > 0 ? 'increase' : 'decrease' });

  // Sensitivity to each year's cash flow
  cashFlows.forEach((cf, i) => {
    const npvWithout = calculateNPV({
      initialInvestment,
      cashFlows: cashFlows.map((c, j) => j === i ? 0 : c),
      discountRate,
    }).npv;
    const change = ((baseNPV - npvWithout) / Math.abs(baseNPV || 1)) * 100;
    results.push({ variable: `Year ${i + 1} Cash Flow`, maxChange: Math.abs(change), direction: 'decrease' });
  });

  // Sensitivity to Discount Rate
  const npvAtHigher = calculateNPV({ initialInvestment, cashFlows, discountRate: discountRate + 1 }).npv;
  const rateChange = Math.abs((baseNPV / (npvAtHigher - baseNPV || 1)) * 100);
  results.push({ variable: 'Discount Rate', maxChange: rateChange, direction: 'increase' });

  return results.sort((a, b) => b.maxChange - a.maxChange);
}

// Statistical Risk Measures
export function calculateRiskMeasures(scenarios: { probability: number; npv: number }[]) {
  const expectedNPV = scenarios.reduce((sum, s) => sum + s.probability * s.npv, 0);
  const variance = scenarios.reduce((sum, s) => sum + s.probability * Math.pow(s.npv - expectedNPV, 2), 0);
  const stdDev = Math.sqrt(variance);
  const cv = expectedNPV !== 0 ? stdDev / Math.abs(expectedNPV) : 0;

  return {
    expectedNPV,
    variance,
    stdDev,
    coefficientOfVariation: cv,
  };
}
