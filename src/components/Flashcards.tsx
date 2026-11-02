import { useState, useMemo } from 'react';
import { quizQuestions, getRandomQuestions, type QuizQuestion } from '../data/questions';

interface AnswerRecord {
  questionId: number;
  userAnswer: number;
  correct: boolean;
  category: string;
}

export default function Flashcards() {
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [hintStep, setHintStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [examComplete, setExamComplete] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);

  const startExam = () => {
    const qs = getRandomQuestions(questionCount);
    setQuestions(qs);
    setCurrentQ(0);
    setUserAnswers([]);
    setShowHint(false);
    setHintStep(0);
    setUserInput('');
    setSubmitted(false);
    setExamStarted(true);
    setExamComplete(false);
  };

  const currentQuestion = questions[currentQ];

  const handleSubmit = () => {
    if (!currentQuestion) return;
    const answer = parseFloat(userInput);
    const tolerance = Math.abs(currentQuestion.answer) * 0.1; // 10% tolerance
    const isCorrect = Math.abs(answer - currentQuestion.answer) <= Math.max(tolerance, 1);

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      userAnswer: answer,
      correct: isCorrect,
      category: currentQuestion.category,
    };

    setUserAnswers([...userAnswers, record]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setExamComplete(true);
    } else {
      setCurrentQ(currentQ + 1);
      setShowHint(false);
      setHintStep(0);
      setUserInput('');
      setSubmitted(false);
    }
  };

  const score = useMemo(() => {
    const correct = userAnswers.filter(a => a.correct).length;
    return { correct, total: userAnswers.length, percentage: userAnswers.length > 0 ? Math.round((correct / userAnswers.length) * 100) : 0 };
  }, [userAnswers]);

  const categoryScores = useMemo(() => {
    const cats: Record<string, { correct: number; total: number }> = {};
    userAnswers.forEach(a => {
      if (!cats[a.category]) cats[a.category] = { correct: 0, total: 0 };
      cats[a.category].total++;
      if (a.correct) cats[a.category].correct++;
    });
    return cats;
  }, [userAnswers]);

  if (!examStarted) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="text-6xl">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tomorrow's Exam Mode
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Test your knowledge with randomized financial appraisal problems. Get instant feedback with step-by-step hints.
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Questions
            </label>
            <div className="flex gap-2">
              {[3, 5, 8, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`flex-1 py-2 rounded-lg font-medium text-sm transition ${
                    questionCount === n
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Topics Covered:</h3>
            <div className="grid grid-cols-2 gap-2">
              {['NPV', 'IRR', 'Payback Period', 'ARR', 'BCR/PI', 'Break-Even'].map(topic => (
                <div key={topic} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
          >
            🚀 Start Exam
          </button>
        </div>
      </div>
    );
  }

  if (examComplete) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="text-6xl">{score.percentage >= 80 ? '🏆' : score.percentage >= 60 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exam Complete!</h2>
          <div className={`text-4xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {score.percentage}%
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {score.correct} out of {score.total} correct
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Mastery by Category</h3>
          <div className="space-y-3">
            {Object.entries(categoryScores).map(([cat, data]) => (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                  <span className="font-medium">{data.correct}/{data.total} ({Math.round((data.correct / data.total) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      (data.correct / data.total) >= 0.8 ? 'bg-green-500' :
                      (data.correct / data.total) >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(data.correct / data.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Answer Review</h3>
          <div className="space-y-3">
            {userAnswers.map((a, i) => {
              const q = quizQuestions.find(q => q.id === a.questionId);
              return (
                <div key={i} className={`p-3 rounded-lg border ${a.correct ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'}`}>
                  <div className="flex items-start gap-2">
                    <span>{a.correct ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{q?.question?.substring(0, 80)}...</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Your answer: {a.userAnswer.toFixed(2)} | Correct: {q?.answer} {q?.unit}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={startExam}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            🔄 Try Again
          </button>
          <button
            onClick={() => setExamStarted(false)}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            ← Back to Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Score: {userAnswers.filter(a => a.correct).length}/{userAnswers.length}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium">
              {currentQuestion.method}
            </span>
            <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Input */}
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <input
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={submitted}
                placeholder="Enter your answer..."
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none disabled:opacity-50"
                step="any"
              />
              {currentQuestion.unit && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  {currentQuestion.unit}
                </span>
              )}
            </div>
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!userInput}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                {currentQ + 1 >= questions.length ? 'Finish' : 'Next →'}
              </button>
            )}
          </div>

          {/* Feedback */}
          {submitted && (
            <div className={`p-4 rounded-lg border-2 ${
              userAnswers[userAnswers.length - 1]?.correct
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-red-500 bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className={`font-bold ${userAnswers[userAnswers.length - 1]?.correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {userAnswers[userAnswers.length - 1]?.correct ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Correct answer: <strong>{currentQuestion.answer} {currentQuestion.unit}</strong>
                {userInput && (
                  <span> | Your answer: {parseFloat(userInput).toFixed(2)} {currentQuestion.unit}</span>
                )}
              </div>
            </div>
          )}

          {/* Hints Panel */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              {showHint ? '▼ Hide Hints' : '▶ Show Step-by-Step Hints'}
            </button>

            {showHint && (
              <div className="mt-3 space-y-2">
                {currentQuestion.hints.slice(0, hintStep + 1).map((hint, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <span className="text-blue-500 font-bold">Step {i + 1}:</span>
                    <span className="font-mono">{hint}</span>
                  </div>
                ))}
                {hintStep < currentQuestion.hints.length - 1 && (
                  <button
                    onClick={() => setHintStep(hintStep + 1)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Show next hint →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
