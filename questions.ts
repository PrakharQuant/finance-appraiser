export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  initialInvestment: number;
  cashFlows: number[];
  discountRate?: number;
  answer: number;
  unit: string;
  hints: string[];
  method: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'NPV',
    question: 'Calculate the NPV of a project with an initial investment of $100,000 and annual cash flows of $30,000 for 5 years at a discount rate of 10%.',
    initialInvestment: 100000,
    cashFlows: [30000, 30000, 30000, 30000, 30000],
    discountRate: 10,
    answer: 13723.60,
    unit: '$',
    method: 'NPV',
    hints: [
      'Use NPV = -I + Σ [CFt / (1+r)^t]',
      'Year 1: 30000 / 1.10^1 = $27,272.73',
      'Year 2: 30000 / 1.10^2 = $24,793.39',
      'Year 3: 30000 / 1.10^3 = $22,539.44',
      'Year 4: 30000 / 1.10^4 = $20,490.40',
      'Year 5: 30000 / 1.10^5 = $18,627.64',
      'NPV = -100000 + 27272.73 + 24793.39 + 22539.44 + 20490.40 + 18627.64 = $13,723.60',
    ],
  },
  {
    id: 2,
    category: 'Payback Period',
    question: 'A project costs $80,000 and generates cash flows of $25,000 per year. What is the payback period?',
    initialInvestment: 80000,
    cashFlows: [25000, 25000, 25000, 25000],
    answer: 3.2,
    unit: 'years',
    method: 'Payback',
    hints: [
      'Payback = Initial Investment / Annual Cash Flow',
      'Payback = $80,000 / $25,000',
      'Payback = 3.2 years',
    ],
  },
  {
    id: 3,
    category: 'BCR',
    question: 'Calculate the BCR for a project with initial investment of $50,000, cash flows of $20,000/year for 4 years, at 8% discount rate.',
    initialInvestment: 50000,
    cashFlows: [20000, 20000, 20000, 20000],
    discountRate: 8,
    answer: 1.325,
    unit: '',
    method: 'BCR',
    hints: [
      'BCR = PV of Inflows / Initial Investment',
      'PV = 20000/1.08 + 20000/1.08² + 20000/1.08³ + 20000/1.08⁴',
      'PV = 18518.52 + 17146.78 + 15876.65 + 14700.60 = $66,242.54',
      'BCR = 66242.54 / 50000 = 1.325',
    ],
  },
  {
    id: 4,
    category: 'Break-Even',
    question: 'Fixed costs are $120,000, variable cost per unit is $15, and selling price is $40. Calculate the break-even point in units.',
    initialInvestment: 120000,
    cashFlows: [],
    answer: 4800,
    unit: 'units',
    method: 'Break-Even',
    hints: [
      'Contribution Margin = Selling Price - Variable Cost',
      'CM = $40 - $15 = $25',
      'Break-Even = Fixed Costs / CM = $120,000 / $25',
      'Break-Even = 4,800 units',
    ],
  },
  {
    id: 5,
    category: 'ARR',
    question: 'A project costs $200,000 with zero residual value. Annual cash flows are $60,000 for 5 years. Calculate the ARR.',
    initialInvestment: 200000,
    cashFlows: [60000, 60000, 60000, 60000, 60000],
    answer: 20,
    unit: '%',
    method: 'ARR',
    hints: [
      'Total Cash Inflows = $60,000 × 5 = $300,000',
      'Depreciation = $200,000 - $0 = $200,000',
      'Average Annual Profit = ($300,000 - $200,000) / 5 = $20,000',
      'Average Investment = ($200,000 + $0) / 2 = $100,000',
      'ARR = ($20,000 / $100,000) × 100 = 20%',
    ],
  },
  {
    id: 6,
    category: 'NPV',
    question: 'Calculate the NPV: Initial investment $150,000, Year 1: $50,000, Year 2: $60,000, Year 3: $70,000, Year 4: $40,000 at 12% discount rate.',
    initialInvestment: 150000,
    cashFlows: [50000, 60000, 70000, 40000],
    discountRate: 12,
    answer: 12345.24,
    unit: '$',
    method: 'NPV',
    hints: [
      'Year 1: 50000 / 1.12 = $44,642.86',
      'Year 2: 60000 / 1.12² = $47,831.63',
      'Year 3: 70000 / 1.12³ = $49,824.62',
      'Year 4: 40000 / 1.12⁴ = $25,419.16',
      'NPV = -150000 + 44642.86 + 47831.63 + 49824.62 + 25419.16 = $17,718.27',
    ],
  },
  {
    id: 7,
    category: 'Payback Period',
    question: 'Project costs $60,000. Cash flows: Year 1: $15,000, Year 2: $20,000, Year 3: $25,000, Year 4: $30,000. Find the payback period.',
    initialInvestment: 60000,
    cashFlows: [15000, 20000, 25000, 30000],
    answer: 3.0,
    unit: 'years',
    method: 'Payback',
    hints: [
      'Year 1: Cumulative = -$60,000 + $15,000 = -$45,000',
      'Year 2: Cumulative = -$45,000 + $20,000 = -$25,000',
      'Year 3: Cumulative = -$25,000 + $25,000 = $0',
      'Payback = exactly 3 years',
    ],
  },
  {
    id: 8,
    category: 'NPV',
    question: 'An investment of $200,000 generates: Year 1: $80,000, Year 2: $90,000, Year 3: $70,000. Discount rate is 15%. Calculate NPV.',
    initialInvestment: 200000,
    cashFlows: [80000, 90000, 70000],
    discountRate: 15,
    answer: -12234.57,
    unit: '$',
    method: 'NPV',
    hints: [
      'Year 1: 80000 / 1.15 = $69,565.22',
      'Year 2: 90000 / 1.15² = $68,066.79',
      'Year 3: 70000 / 1.15³ = $46,029.42',
      'NPV = -200000 + 69565.22 + 68066.79 + 46029.42 = -$16,338.57',
      'Decision: REJECT (NPV < 0)',
    ],
  },
  {
    id: 9,
    category: 'BCR',
    question: 'Initial investment $75,000. Cash flows: $30,000/year for 3 years. Discount rate 10%. Calculate the Profitability Index.',
    initialInvestment: 75000,
    cashFlows: [30000, 30000, 30000],
    discountRate: 10,
    answer: 0.996,
    unit: '',
    method: 'BCR',
    hints: [
      'PV = 30000/1.10 + 30000/1.10² + 30000/1.10³',
      'PV = 27272.73 + 24793.39 + 22539.44 = $74,605.56',
      'PI = 74605.56 / 75000 = 0.995',
      'Decision: REJECT (PI < 1)',
    ],
  },
  {
    id: 10,
    category: 'Break-Even',
    question: 'Fixed costs = $90,000. Variable cost = $8/unit. Selling price = $20/unit. Find break-even revenue.',
    initialInvestment: 90000,
    cashFlows: [],
    answer: 150000,
    unit: '$',
    method: 'Break-Even',
    hints: [
      'Contribution Margin = $20 - $8 = $12',
      'Break-Even Units = $90,000 / $12 = 7,500 units',
      'Break-Even Revenue = 7,500 × $20 = $150,000',
    ],
  },
];

export function getRandomQuestions(count: number): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
