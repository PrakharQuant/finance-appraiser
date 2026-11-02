import { useState, useEffect } from 'react';
import Calculators from './components/Calculators';
import Flashcards from './components/Flashcards';
import ExamSimulator from './components/ExamSimulator';
import CheatSheets from './components/CheatSheets';

type Section = 'calculators' | 'flashcards' | 'exam' | 'cheatsheets';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('calculators');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const sections = [
    { id: 'calculators' as Section, label: 'Calculators', icon: '🧮', description: 'Interactive NPV, IRR, BCR & more' },
    { id: 'flashcards' as Section, label: 'Flashcards', icon: '🃏', description: 'Formulas, rules & key concepts' },
    { id: 'exam' as Section, label: 'Exam Mode', icon: '📝', description: 'Practice with randomized problems' },
    { id: 'cheatsheets' as Section, label: 'Cheat Sheets', icon: '📋', description: 'Visual comparisons & diagrams' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">💹</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">FinanceAppraiser</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Financial Appraisal & Numerical Techniques</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-1.5">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>

            {/* Dark mode toggle + mobile menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? (
                  <span className="text-xl">☀️</span>
                ) : (
                  <span className="text-xl">🌙</span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-4 py-3 space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => { setActiveSection(section.id); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                    activeSection === section.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <div>
                    <div>{section.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{section.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{sections.find(s => s.id === activeSection)?.icon}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {sections.find(s => s.id === activeSection)?.label}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-12">
            {sections.find(s => s.id === activeSection)?.description}
          </p>
        </div>

        {/* Content */}
        <div className="animate-fadeIn">
          {activeSection === 'calculators' && <Calculators />}
          {activeSection === 'flashcards' && <Flashcards />}
          {activeSection === 'exam' && <ExamSimulator />}
          {activeSection === 'cheatsheets' && <CheatSheets />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">FinanceAppraiser</span> — Interactive learning for financial appraisal & numerical techniques
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>NPV • IRR • BCR • Payback • ARR • Break-Even • Sensitivity • Risk</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
