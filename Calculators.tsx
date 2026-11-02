import { useState } from 'react';
import {
  calculateNPV,
  calculateIRR,
  calculatePaybackPeriod,
  calculateARR,
  calculateBCR,
  calculateBreakEven,
  calculateSensitivity,
  calculateRiskMeasures,
} from '../utils/calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

type CalculatorTab = 'npv' | 'irr' | 'payback' | 'arr' | 'bcr' | 'breakeven' | 'sensitivity' | 'risk';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('npv');

  const tabs: { id: CalculatorTab; label: string; icon: string }[] = [
    { id: 'npv', label: 'NPV', icon: '💰' },
    { id: 'irr', label: 'IRR', icon: '📈' },
    { id: 'payback', label: 'Payback', icon: '⏱️' },
    { id: 'arr', label: 'ARR', icon: '📊' },
    { id: 'bcr', label: 'BCR/PI', icon: '⚖️' },
    { id: 'breakeven', label: 'Break-Even', icon: '📉' },
    { id: 'sensitivity', label: 'Sensitivity', icon: '🎯' },
    { id: 'risk', label: 'Risk', icon: '🎲' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <span className="mr-1">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'npv' && <NPVCalculator />}
        {activeTab === 'irr' && <IRRCalculator />}
        {activeTab === 'payback' && <PaybackCalculator />}
        {activeTab === 'arr' && <ARRCalculator />}
        {activeTab === 'bcr' && <BCRCalculator />}
        {activeTab === 'breakeven' && <BreakEvenCalculator />}
        {activeTab === 'sensitivity' && <SensitivityCalculator />}
        {activeTab === 'risk' && <RiskCalculator />}
      </div>
    </div>
  );
}

function NPVCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [cashFlows, setCashFlows] = useState([30000, 30000, 30000, 30000, 30000]);
  const [rate, setRate] = useState(10);
  const [showSteps, setShowSteps] = useState(false);

  const result = calculateNPV({ initialInvestment: investment, cashFlows, discountRate: rate });

  const chartData = cashFlows.map((cf, i) => ({
    year: `Year ${i + 1}`,
    'Cash Flow': cf,
    'Discounted CF': Math.round(result.discountedCashFlows[i]),
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        💰 Net Present Value (NPV) Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Initial Investment ($)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Discount Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cash Flows (comma-separated)
            </label>
            <input
              type="text"
              value={cashFlows.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
                if (values.length > 0) setCashFlows(values);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="30000, 30000, 30000"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCashFlows([...cashFlows, 0])}
              className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800"
            >
              + Add Year
            </button>
            <button
              onClick={() => setCashFlows(cashFlows.slice(0, -1))}
              className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-800"
            >
              - Remove Year
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-lg border-2 ${result.accept ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
            <div className="text-sm text-gray-600 dark:text-gray-400">NPV Result</div>
            <div className={`text-3xl font-bold ${result.accept ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${result.npv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm font-medium mt-1 ${result.accept ? 'text-green-600' : 'text-red-600'}`}>
              {result.accept ? '✅ ACCEPT - Project adds value' : '❌ REJECT - Project destroys value'}
            </div>
          </div>

          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50"
          >
            {showSteps ? 'Hide' : 'Show'} Step-by-Step Breakdown
          </button>

          {showSteps && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
              {result.steps.map((step, i) => (
                <div key={i} className="text-sm text-blue-800 dark:text-blue-200 font-mono">
                  {step}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Cash Flow" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            <Area type="monotone" dataKey="Discounted CF" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function IRRCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [cashFlows, setCashFlows] = useState([35000, 35000, 35000, 35000, 35000]);
  const [showSteps, setShowSteps] = useState(false);

  const result = calculateIRR(investment, cashFlows);

  // NPV profile chart data
  const npvProfileData = Array.from({ length: 20 }, (_, i) => {
    const r = i * 3 + 1;
    let npv = -investment;
    cashFlows.forEach((cf, j) => { npv += cf / Math.pow(1 + r / 100, j + 1); });
    return { rate: `${r}%`, NPV: Math.round(npv) };
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        📈 Internal Rate of Return (IRR) Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Investment ($)</label>
            <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cash Flows (comma-separated)</label>
            <input type="text" value={cashFlows.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
                if (values.length > 0) setCashFlows(values);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">IRR Result</div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.irr.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Accept if IRR ≥ Cost of Capital
            </div>
          </div>

          <button onClick={() => setShowSteps(!showSteps)}
            className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200">
            {showSteps ? 'Hide' : 'Show'} Linear Interpolation Steps
          </button>

          {showSteps && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
              {result.steps.map((step, i) => (
                <div key={i} className="text-sm text-blue-800 dark:text-blue-200 font-mono">{step}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NPV Profile (NPV vs Discount Rate)</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={npvProfileData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rate" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="NPV" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function PaybackCalculator() {
  const [investment, setInvestment] = useState(80000);
  const [cashFlows, setCashFlows] = useState([20000, 25000, 30000, 35000, 20000]);
  const [showSteps, setShowSteps] = useState(false);

  const result = calculatePaybackPeriod(investment, cashFlows);

  const chartData = result.cumulativeCashFlows.map((cum, i) => ({
    year: `Year ${i + 1}`,
    'Cumulative CF': cum,
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        ⏱️ Payback Period Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Investment ($)</label>
            <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cash Flows (comma-separated)</label>
            <input type="text" value={cashFlows.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
                if (values.length > 0) setCashFlows(values);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {result.paybackPeriod.toFixed(2)} years
            </div>
          </div>

          <button onClick={() => setShowSteps(!showSteps)}
            className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200">
            {showSteps ? 'Hide' : 'Show'} Step-by-Step
          </button>

          {showSteps && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
              {result.steps.map((step, i) => (
                <div key={i} className="text-sm text-blue-800 dark:text-blue-200 font-mono">{step}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Cumulative CF" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ARRCalculator() {
  const [investment, setInvestment] = useState(200000);
  const [cashFlows, setCashFlows] = useState([60000, 60000, 60000, 60000, 60000]);
  const [residual, setResidual] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  const result = calculateARR(investment, cashFlows, residual);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        📊 Accounting Rate of Return (ARR) Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Investment ($)</label>
            <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Residual/Scrap Value ($)</label>
            <input type="number" value={residual} onChange={(e) => setResidual(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Cash Flows (comma-separated)</label>
            <input type="text" value={cashFlows.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
                if (values.length > 0) setCashFlows(values);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">ARR Result</div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {result.arr.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Avg Annual Profit: ${result.averageAnnualProfit.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg Investment: ${result.averageInvestment.toFixed(2)}
            </div>
          </div>

          <button onClick={() => setShowSteps(!showSteps)}
            className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200">
            {showSteps ? 'Hide' : 'Show'} Step-by-Step
          </button>

          {showSteps && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
              {result.steps.map((step, i) => (
                <div key={i} className="text-sm text-blue-800 dark:text-blue-200 font-mono">{step}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BCRCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [cashFlows, setCashFlows] = useState([20000, 20000, 20000, 20000]);
  const [rate, setRate] = useState(8);
  const [showSteps, setShowSteps] = useState(false);

  const result = calculateBCR(investment, cashFlows, rate);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        ⚖️ Benefit-Cost Ratio / Profitability Index Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Investment ($)</label>
            <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cash Flows (comma-separated)</label>
            <input type="text" value={cashFlows.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
                if (values.length > 0) setCashFlows(values);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-lg border-2 ${result.accept ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
            <div className="text-sm text-gray-600 dark:text-gray-400">BCR / PI Result</div>
            <div className={`text-3xl font-bold ${result.accept ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {result.bcr.toFixed(4)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              PV of Inflows: ${result.pvOfInflows.toFixed(2)}
            </div>
            <div className={`text-sm font-medium mt-1 ${result.accept ? 'text-green-600' : 'text-red-600'}`}>
              {result.accept ? '✅ ACCEPT (BCR ≥ 1)' : '❌ REJECT (BCR < 1)'}
            </div>
          </div>

          <button onClick={() => setShowSteps(!showSteps)}
            className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200">
            {showSteps ? 'Hide' : 'Show'} Step-by-Step
          </button>

          {showSteps && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
              {result.steps.map((step, i) => (
                <div key={i} className="text-sm text-blue-800 dark:text-blue-200 font-mono">{step}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(120000);
  const [variableCost, setVariableCost] = useState(15);
  const [sellingPrice, setSellingPrice] = useState(40);

  const result = calculateBreakEven({ fixedCosts, variableCostPerUnit: variableCost, sellingPricePerUnit: sellingPrice });

  const chartData = Array.from({ length: 12000 }, (_, i) => {
    const units = (i + 1) * 1000;
    return {
      units: `${(units / 1000).toFixed(0)}k`,
      Revenue: units * sellingPrice,
      'Total Cost': fixedCosts + units * variableCost,
      'Break-Even': units === Math.round(result.breakEvenUnits / 1000) * 1000 ? fixedCosts + units * variableCost : null,
    };
  }).filter((_, i) => i % 2 === 0);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        📉 Break-Even Analysis (CVP) Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fixed Costs ($)</label>
            <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Variable Cost per Unit ($)</label>
            <input type="number" value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selling Price per Unit ($)</label>
            <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Break-Even Point</div>
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              {result.breakEvenUnits.toFixed(0)} units
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Break-Even Revenue: ${result.breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Contribution Margin: ${result.contributionMargin.toFixed(2)}/unit
            </div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 space-y-2">
            {result.steps.map((step, i) => (
              <div key={i} className="text-sm text-teal-800 dark:text-teal-200 font-mono">{step}</div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVP Chart (Cost-Volume-Profit)</h4>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="units" label={{ value: 'Units', position: 'bottom' }} />
              <YAxis label={{ value: '$', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Total Cost" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SensitivityCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [cashFlows, setCashFlows] = useState([30000, 30000, 30000, 30000, 30000]);
  const [rate, setRate] = useState(10);

  const results = calculateSensitivity(investment, cashFlows, rate);

  const chartData = results.map(r => ({
    variable: r.variable,
    sensitivity: r.maxChange,
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        🎯 Sensitivity Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Investment ($)</label>
            <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cash Flows (comma-separated)</label>
            <input type="text" value={cashFlows.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
                if (values.length > 0) setCashFlows(values);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Sensitivity Ranking (Most to Least Critical)</div>
            <div className="mt-3 space-y-2">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{r.variable}</span>
                  <span className={`text-sm font-bold ${i === 0 ? 'text-red-600' : i === 1 ? 'text-orange-600' : 'text-yellow-600'}`}>
                    ±{r.maxChange.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sensitivity Matrix (% change before NPV = 0)</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" unit="%" />
              <YAxis type="category" dataKey="variable" width={120} />
              <Tooltip />
              <Line type="monotone" dataKey="sensitivity" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function RiskCalculator() {
  const [scenarios, setScenarios] = useState([
    { probability: 0.2, npv: -20000 },
    { probability: 0.3, npv: 15000 },
    { probability: 0.3, npv: 40000 },
    { probability: 0.2, npv: 70000 },
  ]);

  const result = calculateRiskMeasures(scenarios);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        🎲 Statistical Risk Measures
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Scenario Input</h4>
          {scenarios.map((s, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="number"
                value={s.probability}
                onChange={(e) => {
                  const newScenarios = [...scenarios];
                  newScenarios[i] = { ...newScenarios[i], probability: Number(e.target.value) };
                  setScenarios(newScenarios);
                }}
                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                step="0.1"
                min="0"
                max="1"
              />
              <span className="text-sm text-gray-500">×</span>
              <input
                type="number"
                value={s.npv}
                onChange={(e) => {
                  const newScenarios = [...scenarios];
                  newScenarios[i] = { ...newScenarios[i], npv: Number(e.target.value) };
                  setScenarios(newScenarios);
                }}
                className="w-28 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={() => setScenarios(scenarios.filter((_, j) => j !== i))}
                className="text-red-500 hover:text-red-700 text-sm"
              >✕</button>
            </div>
          ))}
          <button
            onClick={() => setScenarios([...scenarios, { probability: 0.25, npv: 0 }])}
            className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200"
          >
            + Add Scenario
          </button>
          <div className="text-xs text-gray-500">
            Total Probability: {scenarios.reduce((s, sc) => s + sc.probability, 0).toFixed(2)}
            {Math.abs(scenarios.reduce((s, sc) => s + sc.probability, 0) - 1) > 0.01 && ' ⚠️ Should equal 1.0'}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="text-xs text-gray-600 dark:text-gray-400">Expected NPV</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${result.expectedNPV.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="text-xs text-gray-600 dark:text-gray-400">Std Deviation (σ)</div>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                ${result.stdDev.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <div className="text-xs text-gray-600 dark:text-gray-400">Variance (σ²)</div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {result.variance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="text-xs text-gray-600 dark:text-gray-400">Coeff. of Variation</div>
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {result.coefficientOfVariation.toFixed(4)}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium mb-2">Interpretation:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Higher σ = More absolute risk</li>
              <li>Higher CV = More risk per unit of return</li>
              <li>CV &lt; 1 = Lower relative risk</li>
              <li>CV &gt; 1 = Higher relative risk</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
