import React, { useState } from 'react';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Language } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import { translations } from '../../data/translations';

interface HealthQuizProps {
  language: Language;
}

export const HealthQuiz: React.FC<HealthQuizProps> = ({ language }) => {
  const t = translations[language];
  const isHindi = language === 'hi';

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = QUIZ_QUESTIONS[currentIdx];
  const questionText = isHindi ? q.questionHi : q.questionEn;
  const options = isHindi ? q.optionsHi : q.optionsEn;
  const explanation = isHindi ? q.explanationHi : q.explanationEn;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null) return;
    setIsSubmitted(true);
    if (selectedOpt === q.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-800 to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-300 text-sky-950 font-extrabold text-xs uppercase tracking-wide">
            <HelpCircle className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 10' : 'Module 10'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modQuizTitle}
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium">
            {t.modQuizDesc}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-xl font-extrabold text-[#02C39A]">
            {score} / {QUIZ_QUESTIONS.length} {isHindi ? 'अंक' : 'Points'}
          </div>
          <div className="text-[11px] font-bold text-sky-100">
            {isHindi ? 'स्वास्थ्य रक्षक क्विज' : 'Health Guard Badge'}
          </div>
        </div>
      </div>

      {/* QUIZ CARD */}
      {!quizFinished ? (
        <div className="bg-white rounded-2xl border border-sky-100 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              {isHindi ? `प्रश्न ${currentIdx + 1} का ${QUIZ_QUESTIONS.length}` : `Question ${currentIdx + 1} of ${QUIZ_QUESTIONS.length}`}
            </span>
            <span className="text-xs font-extrabold text-emerald-700">
              {isHindi ? `अंक: ${score}` : `Score: ${score}`}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
            {questionText}
          </h3>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = isSubmitted && idx === q.correctIndex;
              const isWrong = isSubmitted && isSelected && idx !== q.correctIndex;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${
                    isCorrect
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-extrabold'
                      : isWrong
                      ? 'bg-rose-100 border-rose-400 text-rose-950 font-extrabold'
                      : isSelected
                      ? 'bg-sky-100 border-sky-400 text-sky-950 font-bold ring-2 ring-sky-300'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-sky-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full bg-white text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
                  {isWrong && <XCircle className="h-5 w-5 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when Submitted */}
          {isSubmitted && (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-1.5 animate-in fade-in duration-200">
              <div className="font-bold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-[#02C39A]" />
                {isHindi ? 'डॉक्टरी व्याख्या:' : 'Doctor Explanation:'}
              </div>
              <p className="text-xs sm:text-sm text-sky-950 font-medium">
                {explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOpt === null}
                className="px-6 py-2.5 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-extrabold text-xs sm:text-sm disabled:opacity-50 transition-all shadow-xs"
              >
                {isHindi ? 'उत्तर जांचें' : 'Submit Answer'}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-[#0B3B3C] hover:bg-[#028090] text-white font-extrabold text-xs sm:text-sm transition-all shadow-xs"
              >
                {currentIdx + 1 < QUIZ_QUESTIONS.length
                  ? (isHindi ? 'अगला प्रश्न ➔' : 'Next Question ➔')
                  : (isHindi ? 'परिणाम देखें 🏆' : 'See Results 🏆')}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ SCORE RESULTS BADGE CARD */
        <div className="bg-white rounded-2xl border border-sky-200 p-8 shadow-md text-center space-y-5 max-w-lg mx-auto">
          <div className="h-20 w-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="h-10 w-10 animate-bounce" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {isHindi ? 'स्वास्थ्य रक्षक बैज प्राप्त हुआ!' : 'Health Shield Badge Earned!'}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 pt-2">
              {isHindi ? 'क्विज संपन्न हुई!' : 'Quiz Completed!'}
            </h3>
            <p className="text-sm font-bold text-[#028090]">
              {isHindi ? `आपका कुल स्कोर: ${score} / ${QUIZ_QUESTIONS.length}` : `Your Score: ${score} / ${QUIZ_QUESTIONS.length}`}
            </p>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            {isHindi
              ? 'बधाई हो! आपने ग्रामीण स्वास्थ्य, प्राथमिक प्राथमिक उपचार और जन औषधि के बारे में महत्वपूर्ण ज्ञान प्राप्त किया।'
              : 'Congratulations! You have demonstrated key health awareness for rural wellbeing.'}
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <RotateCcw className="h-4 w-4 text-[#02C39A]" />
            {isHindi ? 'पुनः क्विज खेलें' : 'Play Again'}
          </button>
        </div>
      )}
    </div>
  );
};
