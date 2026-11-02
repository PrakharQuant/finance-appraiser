# FinanceAppraiser - Financial Appraisal & Numerical Techniques

A complete, production-ready interactive web application for learning financial appraisal methods including NPV, IRR, BCR/PI, Payback Period, ARR, Break-Even Analysis, Sensitivity Analysis, and Statistical Risk Measures.

![FinanceAppraiser](https://img.shields.io/badge/React-18-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple)

## 🎯 Features

### 1. Interactive Calculators & Simulators
- **NPV Calculator** - Net Present Value with step-by-step breakdown and chart
- **IRR Calculator** - Internal Rate of Return using linear interpolation with NPV profile chart
- **Payback Period** - With cumulative cash flow visualization
- **ARR Calculator** - Accounting Rate of Return
- **BCR/PI Calculator** - Benefit-Cost Ratio / Profitability Index
- **Break-Even Analysis** - CVP chart with revenue vs cost curves
- **Sensitivity Analysis** - Shows which variables most affect NPV
- **Statistical Risk Measures** - Expected value, standard deviation, coefficient of variation

### 2. Interactive Flashcard Module
- Flip-card UI for formulas, decision criteria, advantages & limitations
- Filter by topic (Non-Discounting, DCF, Risk & Uncertainty)
- Spaced Repetition mode with "Got it" / "Review again" tracking
- Progress bar showing mastery percentage

### 3. Practice Exam Simulator ("Tomorrow's Exam" Mode)
- Randomized cash flow problems
- Configurable number of questions (3, 5, 8, or 10)
- Step-by-step hints panel
- Score tracker with mastery percentage per category
- Detailed answer review after completion

### 4. Deep-Dive Cheat Sheets & Visual Infographics
- Comparison table: NPV vs IRR vs BCR vs Payback vs ARR
- Decision Tree diagram with SVG visualization
- Sensitivity Matrix with color-coded impact levels
- Risk Spectrum with efficient frontier diagram

### 5. UI/UX Features
- 🌓 Dark/Light mode with system preference detection
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Color-coded metrics (Green=Accept, Red=Reject, Blue=Intermediate)
- ⚡ Fast, smooth animations
- 📊 Interactive charts (Recharts)

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/your-username/finance-appraiser.git
cd finance-appraiser

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📂 Project Structure

```
finance-appraiser/
├── index.html                 # Entry HTML
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── tsconfig.json              # TypeScript config
├── render.yaml                # Render deployment config
├── public/                    # Static assets
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Main app with navigation & dark mode
│   ├── index.css             # Tailwind CSS & custom styles
│   ├── components/
│   │   ├── Calculators.tsx   # All 8 financial calculators
│   │   ├── Flashcards.tsx    # Flashcard module with spaced repetition
│   │   ├── ExamSimulator.tsx # Practice exam with scoring
│   │   └── CheatSheets.tsx   # Visual comparison tables & diagrams
│   ├── data/
│   │   ├── flashcards.ts     # Flashcard content data
│   │   └── questions.ts      # Quiz question bank
│   └── utils/
│       └── calculations.ts   # Financial calculation functions
└── README.md
```

## 🌐 Deploy to Render (1-Click)

### Option 1: Using render.yaml (Recommended)

1. Push this repo to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" → "Static Site"
4. Connect your GitHub repository
5. Render will auto-detect `render.yaml` and configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Click "Create Static Site"

### Option 2: Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Static Site"
3. Connect your GitHub repo
4. Configure:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click "Create Static Site"

### Option 3: Deploy as Web Service (Node.js)

If you want to serve with a Node.js server:

1. Create a `server.js` file:
```javascript
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(process.env.PORT || 3000);
```

2. Add to `package.json`:
```json
"scripts": {
  "start": "node server.js"
}
```

3. Deploy as "Web Service" on Render with:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite 6 | Build Tool |
| Tailwind CSS 4 | Styling |
| Recharts | Charts & Graphs |
| Framer Motion | Animations |
| Lucide React | Icons |

## 📊 Financial Methods Covered

| Method | Category | Key Formula |
|--------|----------|-------------|
| Payback Period | Non-Discounting | PP = I / CF |
| ARR | Non-Discounting | Avg Profit / Avg Investment |
| NPV | DCF | -I + Σ[CFt/(1+r)^t] |
| IRR | DCF | Rate where NPV = 0 |
| BCR/PI | DCF | PV(Benefits) / PV(Costs) |
| Break-Even | Risk Analysis | FC / (P - VC) |
| Sensitivity | Risk Analysis | % change before NPV = 0 |
| Statistical Risk | Risk Analysis | σ, CV, Expected Value |

## 🎓 Educational Design

- **Step-by-step breakdowns** for every calculation
- **Color-coded results** (Green = Accept, Red = Reject)
- **Interactive charts** to visualize relationships
- **Progressive learning** from basic to advanced
- **Self-assessment** with spaced repetition
- **Exam simulation** with randomized problems

## 📝 License

MIT License - Feel free to use for educational purposes.

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- More quiz questions
- Additional financial methods (MIRR, EAA)
- Monte Carlo simulation
- Export/import study progress
- Multi-language support
