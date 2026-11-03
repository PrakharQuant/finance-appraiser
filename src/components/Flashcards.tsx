import React, { useState } from 'react';

const flashcardsData = [
  {
    category: "Non-Discounting",
    question: "Payback Period (PBP) Formula & Rule",
    answer: "Formula: Initial Outlay ÷ Annual Cash Inflow (for even cash flows).\n\nRule: Lower payback period is preferred. Ignores Time Value of Money and cash flows post-payback."
  },
  {
    category: "Non-Discounting",
    question: "Accounting Rate of Return (ARR) Formula",
    answer: "Formula: Average Net Revenue / Initial (or Average) Investment\n\nRule: Accept if ARR > Cut-off rate set by management."
  },
  {
    category: "Discounted Cash Flow",
    question: "Net Present Value (NPV) Decision Rule",
    answer: "Formula: NPV = PV of Cash Inflows - Initial Investment\n\nRule: Accept if NPV > 0. Choose project with highest positive NPV among mutually exclusive projects."
  },
  {
    category: "Discounted Cash Flow",
    question: "Benefit-Cost Ratio (BCR / PI) Formula",
    answer: "Formula: Present Value of Cash Inflows ÷ Present Value of Cash Outflows\n\nRule: Accept if BCR > 1."
  },
  {
    category: "Discounted Cash Flow",
    question: "Internal Rate of Return (IRR) Interpolation",
    answer: "Formula: IRR = LDR + (HDR - LDR) * [NPV@LDR / (NPV@LDR - NPV@HDR)]\n\nRule: Discount rate where NPV = 0 (or BCR = 1). Accept if IRR > Cost of Capital."
  },
  {
    category: "Risk & Uncertainty",
    question: "Break-Even Quantity (Q_BE)",
    answer: "Formula: Q_BE = Fixed Cost / (Price - Variable Cost per unit)\n\nNote: Represents zero-profit, zero-loss volume."
  },
  {
    category: "Risk & Uncertainty",
    question: "Standard Deviation (σ) in Risk Analysis",
    answer: "Formula: σ = √( Σ [ (F_t - Expected_F)^2 * P_t ] )\n\nRule: Lower standard deviation indicates lower risk for projects with equal expected returns."
  },
  {
    category: "Risk & Uncertainty",
    question: "Coefficient of Variation (CV)",
    answer: "Formula: CV = Standard Deviation / Expected Value\n\nRule: Standardized measure of risk per unit of return. Lower CV is preferred."
  }
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCards = selectedCategory === "All"
    ? flashcardsData
    : flashcardsData.filter(c => c.category === selectedCategory);

  const card = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Study Flashcards</h2>
      
      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-6">
        {["All", "Non-Discounting", "Discounted Cash Flow", "Risk & Uncertainty"].map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1 rounded text-sm ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card UI */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[220px] p-8 border-2 border-blue-500 rounded-xl shadow-lg bg-white dark:bg-gray-800 flex flex-col justify-center items-center transition-all transform hover:scale-105"
      >
        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-2">
          {card?.category} • {isFlipped ? "Answer / Solution" : "Tap to Flip"}
        </span>
        <p className="text-lg font-medium whitespace-pre-line">
          {isFlipped ? card?.answer : card?.question}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Previous
        </button>
        <span className="text-sm font-semibold">
          Card {currentIndex + 1} of {filteredCards.length}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
