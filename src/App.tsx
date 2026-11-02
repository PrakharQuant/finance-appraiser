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

  const socialLinks = (size: number = 16) => (
    <span className="inline-flex items-center gap-2">
      <a
        href="https://www.linkedin.com/in/prakhar-gupta-5b7250372/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="Prakhar Gupta on LinkedIn"
        className="text-gray-500 dark:text-gray-400 hover:text-[#0A66C2] transition-colors inline-flex items-center"
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 9H17.738v3.114h.044c.528-.944 1.824-2.063 3.758-2.063 4.032 0 4.781 2.527 4.781 5.812v6.589h-3.554v-5.845c0-1.39-.029-3.177-1.95-3.177-1.953 0-2.252 1.51-2.252 3.072v6.05H12.25V9z"/>
        </svg>
      </a>
      <a
        href="https://x.com/PrakharQuant"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        title="Prakhar Gupta on X"
        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center"
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
    </span>
  );

  const sections = [
    { id: 'calculators' as Section, label: 'Calculators', icon: '🧮', description: 'Interactive NPV, IRR, BCR & more' },
    { id: 'flashcards' as Section, label: 'Flashcards', icon: '🃏', description: 'Formulas, rules & key concepts' },
    { id: 'exam' as Section, label: 'Exam Mode', icon: '📝', description: 'Practice with randomized problems' },
    { id: 'cheatsheets' as Section, label: 'Cheat Sheets', icon: '📋', description: 'Visual comparisons & diagrams' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Created-by credit banner — visible at the very top of the home page */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
          <span className="font-medium">Created by Prakhar Gupta</span>
          <span aria-hidden="true">·</span>
          <a href="mailto:bestofprakhar@gmail.com" className="underline-offset-2 hover:underline opacity-95">
            bestofprakhar@gmail.com
          </a>
          {socialLinks(15)}
        </div>
      </div>

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
              <span>Created by <a href="mailto:bestofprakhar@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-2 hover:underline">Prakhar Gupta</a> · bestofprakhar@gmail.com</span>
              {socialLinks(16)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
