import { useState } from 'react';

type SheetTab = 'comparison' | 'decision-tree' | 'sensitivity-matrix' | 'risk-spectrum';

export default function CheatSheets() {
  const [activeTab, setActiveTab] = useState<SheetTab>('comparison');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'comparison' as SheetTab, label: '📊 NPV vs IRR vs BCR', icon: '' },
          { id: 'decision-tree' as SheetTab, label: '🌳 Decision Tree', icon: '' },
          { id: 'sensitivity-matrix' as SheetTab, label: '🎯 Sensitivity Matrix', icon: '' },
          { id: 'risk-spectrum' as SheetTab, label: '📈 Risk Spectrum', icon: '' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'comparison' && <ComparisonTable />}
        {activeTab === 'decision-tree' && <DecisionTreeDiagram />}
        {activeTab === 'sensitivity-matrix' && <SensitivityMatrix />}
        {activeTab === 'risk-spectrum' && <RiskSpectrum />}
      </div>
    </div>
  );
}

function ComparisonTable() {
  const methods = [
    {
      name: 'NPV',
      formula: 'NPV = -I + Σ[CFt/(1+r)^t]',
      acceptRule: 'NPV ≥ 0',
      timeValue: '✅ Yes',
      allCashFlows: '✅ Yes',
      scale: '✅ Absolute value',
      reinvestment: 'At cost of capital',
      capitalRationing: '❌ Not ideal',
      pros: 'Theoretically superior, additive, consistent with wealth max',
      cons: 'Requires discount rate estimation',
      color: 'green',
    },
    {
      name: 'IRR',
      formula: 'Rate where NPV = 0',
      acceptRule: 'IRR ≥ Cost of Capital',
      timeValue: '✅ Yes',
      allCashFlows: '✅ Yes',
      scale: '❌ Percentage only',
      reinvestment: 'At IRR (unrealistic)',
      capitalRationing: '❌ Not ideal',
      pros: 'Easy to communicate, no discount rate needed',
      cons: 'Multiple IRRs possible, conflicts with NPV',
      color: 'blue',
    },
    {
      name: 'BCR/PI',
      formula: 'PV(Benefits) / PV(Costs)',
      acceptRule: 'BCR ≥ 1',
      timeValue: '✅ Yes',
      allCashFlows: '✅ Yes',
      scale: '❌ Ratio only',
      reinvestment: 'At cost of capital',
      capitalRationing: '✅ Ideal',
      pros: 'Measures efficiency, good for rationing',
      cons: 'May conflict with NPV, ambiguous cost classification',
      color: 'purple',
    },
    {
      name: 'Payback',
      formula: 'I / CF (constant)',
      acceptRule: 'PP ≤ Target Period',
      timeValue: '❌ No',
      allCashFlows: '❌ No',
      scale: '✅ Time-based',
      reinvestment: 'N/A',
      capitalRationing: '✅ Simple',
      pros: 'Simple, measures liquidity/risk',
      cons: 'Ignores TVM, ignores post-payback CFs',
      color: 'amber',
    },
    {
      name: 'ARR',
      formula: 'Avg Profit / Avg Investment',
      acceptRule: 'ARR ≥ Target Rate',
      timeValue: '❌ No',
      allCashFlows: '✅ Yes',
      scale: '✅ Percentage',
      reinvestment: 'N/A',
      capitalRationing: '⚠️ Limited',
      pros: 'Uses all CFs, easy to understand',
      cons: 'Uses accounting profit, ignores TVM',
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        📊 Investment Appraisal Methods Comparison
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Method</th>
              <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Formula</th>
              <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Accept Rule</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">TVM</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">All CFs</th>
              <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Key Advantage</th>
              <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Key Limitation</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m, i) => (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-3 px-2">
                  <span className={`inline-block px-2 py-1 rounded font-bold text-xs text-white bg-${m.color}-500`}>
                    {m.name}
                  </span>
                </td>
                <td className="py-3 px-2 font-mono text-xs text-gray-700 dark:text-gray-300">{m.formula}</td>
                <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{m.acceptRule}</td>
                <td className="py-3 px-2 text-center">{m.timeValue}</td>
                <td className="py-3 px-2 text-center">{m.allCashFlows}</td>
                <td className="py-3 px-2 text-xs text-green-700 dark:text-green-400">{m.pros.split(',')[0]}</td>
                <td className="py-3 px-2 text-xs text-red-700 dark:text-red-400">{m.cons.split(',')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual Hierarchy */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">🏆 Method Preference Hierarchy</h4>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {[
            { rank: 1, name: 'NPV', desc: 'Gold Standard', color: 'from-green-400 to-emerald-500' },
            { rank: 2, name: 'IRR', desc: 'Good Communicator', color: 'from-blue-400 to-indigo-500' },
            { rank: 3, name: 'BCR/PI', desc: 'Capital Rationing', color: 'from-purple-400 to-violet-500' },
            { rank: 4, name: 'ARR', desc: 'Simple Return', color: 'from-orange-400 to-amber-500' },
            { rank: 5, name: 'Payback', desc: 'Quick Screening', color: 'from-red-400 to-rose-500' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {item.rank}
              </div>
              <div className="mt-2 text-center">
                <div className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
              </div>
              {i < 4 && <span className="hidden md:block text-gray-400 text-2xl mx-2">→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecisionTreeDiagram() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        🌳 Decision Tree Analysis
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        A decision tree maps out sequential decisions and uncertain outcomes. Work backwards from right to left, calculating expected values at each chance node.
      </p>

      {/* SVG Decision Tree */}
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 800 400" className="w-full min-w-[600px] h-80">
          {/* Decision Node */}
          <rect x="50" y="170" width="60" height="60" fill="#6366f1" rx="4" />
          <text x="80" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D1</text>
          <text x="80" y="250" textAnchor="middle" fill="#6b7280" fontSize="10">Invest?</text>

          {/* Branches from D1 */}
          <line x1="110" y1="185" x2="250" y2="80" stroke="#6366f1" strokeWidth="2" />
          <line x1="110" y1="215" x2="250" y2="320" stroke="#6366f1" strokeWidth="2" />

          {/* Labels on branches */}
          <text x="170" y="125" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">Invest ($100k)</text>
          <text x="170" y="280" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">Don't Invest</text>

          {/* Chance Node - High Demand */}
          <circle cx="280" cy="80" r="30" fill="#f59e0b" />
          <text x="280" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C1</text>

          {/* Branches from C1 */}
          <line x1="310" y1="65" x2="450" y2="30" stroke="#f59e0b" strokeWidth="2" />
          <line x1="310" y1="95" x2="450" y2="130" stroke="#f59e0b" strokeWidth="2" />

          {/* Success */}
          <rect x="450" y="10" width="100" height="40" fill="#10b981" rx="8" />
          <text x="500" y="35" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Success</text>
          <text x="580" y="35" fill="#059669" fontSize="12" fontWeight="bold">$200k (0.6)</text>

          {/* Failure */}
          <rect x="450" y="110" width="100" height="40" fill="#ef4444" rx="8" />
          <text x="500" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Failure</text>
          <text x="580" y="135" fill="#dc2626" fontSize="12" fontWeight="bold">-$50k (0.4)</text>

          {/* Don't invest outcome */}
          <rect x="280" y="300" width="120" height="40" fill="#9ca3af" rx="8" />
          <text x="340" y="325" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">$0 (certain)</text>

          {/* EV Calculations */}
          <rect x="620" y="55" width="160" height="50" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" rx="8" />
          <text x="700" y="75" textAnchor="middle" fill="#4338ca" fontSize="10">EV at C1:</text>
          <text x="700" y="92" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">(0.6×200) + (0.4×-50)</text>

          <rect x="620" y="170" width="160" height="50" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" rx="8" />
          <text x="700" y="190" textAnchor="middle" fill="#059669" fontSize="10">EV at D1 (Invest):</text>
          <text x="700" y="207" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">$100k - $100k = $0</text>

          {/* Decision Arrow */}
          <rect x="620" y="280" width="160" height="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
          <text x="700" y="300" textAnchor="middle" fill="#92400e" fontSize="10">Decision:</text>
          <text x="700" y="317" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Indifferent (EV = $0)</text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">□</span>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900 dark:text-white">Decision Node</div>
            <div className="text-xs text-gray-500">Square = Your choice</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">○</span>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900 dark:text-white">Chance Node</div>
            <div className="text-xs text-gray-500">Circle = Uncertain outcome</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">→</span>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900 dark:text-white">Rollback</div>
            <div className="text-xs text-gray-500">Work right to left</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SensitivityMatrix() {
  const variables = [
    { name: 'Initial Investment', sensitivity: 25, impact: 'high' },
    { name: 'Year 1 Cash Flow', sensitivity: 18, impact: 'high' },
    { name: 'Year 2 Cash Flow', sensitivity: 16, impact: 'medium' },
    { name: 'Year 3 Cash Flow', sensitivity: 14, impact: 'medium' },
    { name: 'Discount Rate', sensitivity: 12, impact: 'medium' },
    { name: 'Year 4 Cash Flow', sensitivity: 10, impact: 'low' },
    { name: 'Year 5 Cash Flow', sensitivity: 8, impact: 'low' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        🎯 Sensitivity Analysis Matrix
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Shows how much each variable can change (in %) before the project's NPV becomes negative. Higher sensitivity = more critical/risky variable.
      </p>

      {/* Spider/Radar-like visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {variables.map((v, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-32 text-sm text-gray-700 dark:text-gray-300 truncate">{v.name}</div>
              <div className="flex-1 relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                  <div
                    className={`h-6 rounded-full flex items-center justify-end pr-2 text-xs font-bold text-white transition-all ${
                      v.impact === 'high' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                      v.impact === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                      'bg-gradient-to-r from-green-400 to-emerald-500'
                    }`}
                    style={{ width: `${(v.sensitivity / 25) * 100}%` }}
                  >
                    ±{v.sensitivity}%
                  </div>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                v.impact === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                v.impact === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              }`}>
                {v.impact}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Key Insights</h4>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">●</span>
              <span><strong>Initial Investment</strong> is the most sensitive variable - a 25% increase would make NPV negative</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">●</span>
              <span><strong>Early cash flows</strong> matter more than later ones (higher present value)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">●</span>
              <span><strong>Discount rate</strong> changes have moderate impact - focus on getting accurate cost of capital</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">●</span>
              <span>Management should focus risk mitigation on <strong>high-sensitivity</strong> variables</span>
            </li>
          </ul>
        </div>
      </div>

      {/* NPV Sensitivity Curve */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">NPV Sensitivity Curves</h4>
        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
          <svg viewBox="0 0 500 200" className="w-full h-48">
            {/* Grid */}
            <line x1="50" y1="20" x2="50" y2="180" stroke="#d1d5db" strokeWidth="1" />
            <line x1="50" y1="100" x2="480" y2="100" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4" />
            <line x1="50" y1="180" x2="480" y2="180" stroke="#d1d5db" strokeWidth="1" />

            {/* Y-axis labels */}
            <text x="45" y="25" textAnchor="end" fill="#6b7280" fontSize="9">+NPV</text>
            <text x="45" y="105" textAnchor="end" fill="#6b7280" fontSize="9">0</text>
            <text x="45" y="185" textAnchor="end" fill="#6b7280" fontSize="9">-NPV</text>

            {/* X-axis labels */}
            <text x="50" y="195" textAnchor="middle" fill="#6b7280" fontSize="9">-30%</text>
            <text x="157" y="195" textAnchor="middle" fill="#6b7280" fontSize="9">-15%</text>
            <text x="265" y="195" textAnchor="middle" fill="#6b7280" fontSize="9">Base</text>
            <text x="372" y="195" textAnchor="middle" fill="#6b7280" fontSize="9">+15%</text>
            <text x="480" y="195" textAnchor="middle" fill="#6b7280" fontSize="9">+30%</text>

            {/* Investment line (steepest - red) */}
            <polyline points="50,40 157,65 265,90 372,115 480,140" fill="none" stroke="#ef4444" strokeWidth="2.5" />

            {/* Cash Flow line (medium - blue) */}
            <polyline points="50,140 157,120 265,90 372,65 480,45" fill="none" stroke="#3b82f6" strokeWidth="2.5" />

            {/* Discount Rate line (least steep - green) */}
            <polyline points="50,115 157,105 265,90 372,78 480,70" fill="none" stroke="#10b981" strokeWidth="2.5" />

            {/* Legend */}
            <line x1="300" y1="15" x2="320" y2="15" stroke="#ef4444" strokeWidth="2.5" />
            <text x="325" y="18" fill="#ef4444" fontSize="9">Investment</text>
            <line x1="380" y1="15" x2="400" y2="15" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="405" y="18" fill="#3b82f6" fontSize="9">Cash Flows</text>
            <line x1="300" y1="30" x2="320" y2="30" stroke="#10b981" strokeWidth="2.5" />
            <text x="325" y="33" fill="#10b981" fontSize="9">Discount Rate</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function RiskSpectrum() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        📈 Risk Spectrum & Decision Framework
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Understanding the relationship between risk and return in investment appraisal decisions.
      </p>

      {/* Risk Spectrum Visual */}
      <div className="relative">
        <svg viewBox="0 0 600 300" className="w-full h-64">
          {/* Axes */}
          <line x1="60" y1="250" x2="560" y2="250" stroke="#6b7280" strokeWidth="2" />
          <line x1="60" y1="250" x2="60" y2="30" stroke="#6b7280" strokeWidth="2" />

          {/* Axis labels */}
          <text x="310" y="280" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold">Risk (σ or CV) →</text>
          <text x="25" y="140" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold" transform="rotate(-90, 25, 140)">Expected Return →</text>

          {/* Efficient Frontier curve */}
          <path d="M 80 230 Q 200 180 300 120 Q 400 70 520 40" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="8,4" />
          <text x="400" y="55" fill="#6366f1" fontSize="10" fontStyle="italic">Efficient Frontier</text>

          {/* Project dots */}
          <circle cx="120" cy="210" r="12" fill="#10b981" opacity="0.8" />
          <text x="120" y="214" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">A</text>
          <text x="120" y="235" textAnchor="middle" fill="#374151" fontSize="9">Low Risk</text>

          <circle cx="250" cy="150" r="12" fill="#f59e0b" opacity="0.8" />
          <text x="250" y="154" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>
          <text x="250" y="175" textAnchor="middle" fill="#374151" fontSize="9">Medium</text>

          <circle cx="400" cy="80" r="12" fill="#ef4444" opacity="0.8" />
          <text x="400" y="84" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">C</text>
          <text x="400" y="105" textAnchor="middle" fill="#374151" fontSize="9">High Risk</text>

          {/* Below frontier - inefficient */}
          <circle cx="200" cy="220" r="10" fill="#9ca3af" opacity="0.6" />
          <text x="200" y="224" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">D</text>
          <text x="200" y="245" textAnchor="middle" fill="#9ca3af" fontSize="9">Inefficient</text>

          {/* Hurdle rate line */}
          <line x1="60" y1="180" x2="560" y2="180" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="6,3" />
          <text x="555" y="175" textAnchor="end" fill="#dc2626" fontSize="9">Minimum Acceptable Return</text>
        </svg>
      </div>

      {/* Risk Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
          <div className="text-2xl mb-2">🟢</div>
          <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">Low Risk</h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• CV &lt; 0.5</li>
            <li>• High probability of positive NPV</li>
            <li>• Stable, predictable cash flows</li>
            <li>• Government bonds, utilities</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800">
          <div className="text-2xl mb-2">🟡</div>
          <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Medium Risk</h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• CV between 0.5 - 1.0</li>
            <li>• Moderate uncertainty</li>
            <li>• Established markets</li>
            <li>• New product lines, expansion</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800">
          <div className="text-2xl mb-2">🔴</div>
          <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">High Risk</h4>
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            <li>• CV &gt; 1.0</li>
            <li>• High uncertainty in outcomes</li>
            <li>• New markets, R&D projects</li>
            <li>• Requires higher return premium</li>
          </ul>
        </div>
      </div>

      {/* Risk Mitigation Strategies */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3">🛡️ Risk Mitigation Strategies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">1.</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white text-sm">Sensitivity Analysis</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Identify critical variables to monitor</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">2.</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white text-sm">Scenario Analysis</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Model best/worst/base case outcomes</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">3.</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white text-sm">Decision Trees</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Map sequential decisions and outcomes</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">4.</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white text-sm">Simulation (Monte Carlo)</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Model probability distributions of outcomes</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">5.</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white text-sm">Risk-Adjusted Discount Rate</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Higher risk → Higher hurdle rate</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">6.</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white text-sm">Diversification</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Spread risk across multiple projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
