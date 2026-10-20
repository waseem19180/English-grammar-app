import React, { useState, useMemo } from 'react';
import { VOCABULARY_LIST, WordItem } from '../data/words.ts';
import { sound } from '../utils/sound.ts';
import { Check, X, RotateCcw, Award, Sparkles, Volume2, ArrowLeft, Zap, AlertTriangle } from 'lucide-react';

interface Question {
  id: string;
  wordItem: WordItem;
  type: 'spelling_trap' | 'meaning_trap';
  questionTitle: string;
  subPrompt: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export const MultipleChoiceView: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'spelling' | 'meanings' | 'all'>('spelling');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [, setUserAnswersHistory] = useState<{
    question: Question;
    selected: string;
    isCorrect: boolean;
  }[]>([]);

  // Generate questions pool based on current filterMode
  const questions: Question[] = useMemo(() => {
    const list: Question[] = [];

    VOCABULARY_LIST.forEach((item) => {
      // 1. Spelling Trap Question (As explicitly requested: مشقلب احرفها حاطت بدل e حاطت i وخربشة)
      const spellingOptions = [item.wordClean, ...item.scrambledTraps.slice(0, 3)].sort(() => Math.random() - 0.5);
      const spellingQ: Question = {
        id: `spell-${item.id}`,
        wordItem: item,
        type: 'spelling_trap',
        questionTitle: `ما هي الكلمة الإنجليزية بالسبيلنج الصحيح الدقيق لـ:`,
        subPrompt: `"${item.meaningEn}" (${item.meaningAr})`,
        correctAnswer: item.wordClean,
        options: spellingOptions,
        explanation: `السبيلنج الصحيح هو "${item.wordClean}". انتبه للفخاخ التي تبدّل حروف مثل (e / i / a) أو تشقلب الترتيب!`
      };

      // 2. Meaning Trap Question (English-English definition)
      const otherMeanings = VOCABULARY_LIST.filter(w => w.id !== item.id)
        .map(w => w.meaningEn)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const meaningOptions = [item.meaningEn, ...otherMeanings].sort(() => Math.random() - 0.5);
      const meaningQ: Question = {
        id: `mean-${item.id}`,
        wordItem: item,
        type: 'meaning_trap',
        questionTitle: `ما هو المرادف الإنجليزي الصحيح لكلمة:`,
        subPrompt: `"${item.fullWordDisplay}" (${item.meaningAr})`,
        correctAnswer: item.meaningEn,
        options: meaningOptions,
        explanation: `مرادف كلمة "${item.word}" بالإنجليزي هو "${item.meaningEn}" (بالعربي: ${item.meaningAr}).`
      };

      if (filterMode === 'spelling') {
        list.push(spellingQ);
      } else if (filterMode === 'meanings') {
        list.push(meaningQ);
      } else {
        list.push(spellingQ);
        list.push(meaningQ);
      }
    });

    // Shuffle final list
    return list.sort(() => Math.random() - 0.5);
  }, [filterMode]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      sound.playCorrect();
      setScore(prev => prev + 1);
    } else {
      sound.playWrong();
    }

    setUserAnswersHistory(prev => [
      ...prev,
      { question: currentQ, selected: option, isCorrect }
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      sound.playVictory();
    }
  };

  const handleRestart = (newMode?: 'spelling' | 'meanings' | 'all') => {
    if (newMode) setFilterMode(newMode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setUserAnswersHistory([]);
  };

  const speakText = (text: string) => {
    sound.speak(text);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6" dir="rtl">
      {/* Submode Selection Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>اختر نوع الأسئلة:</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => handleRestart('spelling')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'spelling'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔤 فخاخ تشقلب الأحرف (السبيلنج)
          </button>
          <button
            onClick={() => handleRestart('meanings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'meanings'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎯 المرادفات الإنجليزية
          </button>
          <button
            onClick={() => handleRestart('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔥 ميكس شامل
          </button>
        </div>
      </div>

      {!showResult && currentQ ? (
        <div className="space-y-4">
          {/* Progress & Live Score Bar */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <span>السؤال:</span>
              <span className="font-mono text-indigo-600 text-base font-black">{currentIndex + 1}</span>
              <span>/</span>
              <span className="font-mono text-slate-500">{questions.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>النقاط:</span>
              <span className="font-mono text-emerald-600 text-base font-black">{score}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Main Question Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
            {/* Visual Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                {currentQ.type === 'spelling_trap' ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    انتبه لفخاخ الحروف المشقلبة!
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    اختبار المرادف الإنجليزي
                  </>
                )}
              </span>

              <button
                onClick={() => speakText(currentQ.wordItem.word)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-bold border border-slate-200"
                title="استمع للنطق"
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>نطق</span>
              </button>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg font-bold text-slate-700 mb-2">
              {currentQ.questionTitle}
            </h2>
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 mb-6 text-center">
              <p className="text-xl sm:text-2xl font-black text-indigo-950 tracking-wide dir-ltr font-mono">
                {currentQ.subPrompt}
              </p>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrect = option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

                let buttonStyle = 'bg-slate-50 hover:bg-indigo-50/70 text-slate-800 border-slate-200/90 hover:border-indigo-400 shadow-2xs';

                if (isAnswered) {
                  if (isCorrect) {
                    buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-black shadow-xs';
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = 'bg-red-50 border-red-500 text-red-900 line-through font-bold';
                  } else {
                    buttonStyle = 'bg-slate-100/50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option)}
                    className={`p-4 rounded-2xl border text-center transition-all duration-200 flex items-center justify-between px-4 group active:scale-[0.98] ${buttonStyle}`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-500">
                      {String.fromCharCode(65 + idx)}
                    </span>

                    <span className="text-base sm:text-lg font-bold font-mono tracking-wide dir-ltr text-center flex-1 px-2">
                      {option}
                    </span>

                    <span className="w-6 h-6 flex items-center justify-center">
                      {isAnswered && isCorrect && <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />}
                      {isAnswered && isSelected && !isCorrect && <X className="w-5 h-5 text-red-600 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  {selectedOption?.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase() ? (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-black text-sm sm:text-base">
                      <Check className="w-5 h-5" />
                      <span>إجابة عبقرية يا وسيم! كشفت الفخ بنجاح 🔥</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-600 font-black text-sm sm:text-base">
                      <X className="w-5 h-5" />
                      <span>وقعت بالفخ! ركز في الحروف المشقلبة يا وسيم 👀</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {currentQ.explanation}
                </p>

                {/* English-to-English Sound Mnemonic reminder */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mt-2">
                  <span className="font-extrabold text-amber-800">تذكير الربط اللفظي الإنجليزي: </span>
                  {currentQ.wordItem.comicHook}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition-all shadow-md shadow-indigo-600/20 active:scale-95"
                  >
                    <span>السؤال التالي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Final Score & Celebration View */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 text-center shadow-lg relative overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center text-slate-950 shadow-md shadow-amber-400/30">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
            أحسنت يا بطلنا وسيم قيمري! 🎉
          </h2>
          <p className="text-slate-600 text-sm mb-6 font-medium">
            أنهيت اختبار ضع دائرة والتمويه الإملائي للوحدة الأولى
          </p>

          <div className="max-w-xs mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6 shadow-2xs">
            <div className="text-xs text-slate-500 font-bold mb-1">النتيجة النهائية</div>
            <div className="text-4xl sm:text-5xl font-black text-indigo-600 font-mono">
              {score} <span className="text-xl text-slate-400">/ {questions.length}</span>
            </div>
            <div className="text-xs text-slate-600 mt-2 font-medium">
              النسبة المئوية: <span className="text-emerald-600 font-extrabold">{Math.round((score / questions.length) * 100)}%</span>
            </div>
          </div>

          <p className="text-sm text-slate-700 max-w-md mx-auto mb-8 leading-relaxed font-medium">
            {score === questions.length ? (
              <span className="text-emerald-700 font-bold">ما شاء الله تبارك الله! كشفت كل فخاخ الأحرف المشقلبة وحصلت على العلامة الكاملة 100%! 🌟</span>
            ) : score >= questions.length * 0.7 ? (
              <span>مستوى رائع جداً يا وسيم! أعد المحاولة لتتجاوز الفخاخ الإملائية القليلة التي فاتت عليك! 💪</span>
            ) : (
              <span>لا بأس يا وسيم، راجع قائمة <span className="text-amber-700 font-bold">الربط اللفظي</span> وأعد الاختبار وستحفظها بكل سهولة! 🚀</span>
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleRestart()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition-all shadow-md shadow-indigo-600/20 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار بالترتيب العشوائي</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
