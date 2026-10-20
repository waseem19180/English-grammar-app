import React, { useState, useEffect } from 'react';
import { VOCABULARY_LIST, WordItem } from '../data/words.ts';
import { sound } from '../utils/sound.ts';
import { 
  Check, 
  X, 
  RotateCcw, 
  Lightbulb, 
  Volume2, 
  Delete, 
  CornerDownLeft, 
  ArrowLeft, 
  Trophy,
  ArrowLeftRight
} from 'lucide-react';

export const TypingPracticeView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [, setHintsUsed] = useState(0);
  const [practiceMode, setPracticeMode] = useState<'word-to-meaning' | 'meaning-to-word'>('word-to-meaning');
  const [completedCount, setCompletedCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Shuffle items once per round
  const [items, setItems] = useState<WordItem[]>(() => [...VOCABULARY_LIST].sort(() => Math.random() - 0.5));

  const currentItem = items[currentIndex];

  // Target answer depends on mode
  const targetAnswer = practiceMode === 'word-to-meaning' 
    ? currentItem.meaningEn 
    : currentItem.wordClean;

  const acceptedAnswers = practiceMode === 'word-to-meaning' 
    ? currentItem.meaningEnAccepted 
    : [currentItem.wordClean, currentItem.word];

  // Helper to normalize strings for comparison
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[().]/g, '')
      .replace(/\s+/g, ' ');
  };

  // Keyboard handler for on-screen keyboard
  const handleKeyClick = (char: string) => {
    sound.playKeyClick();
    if (isSubmitted && isCorrect) return;
    setTypedInput(prev => prev + char.toLowerCase());
  };

  const handleBackspace = () => {
    sound.playKeyClick();
    if (isSubmitted && isCorrect) return;
    setTypedInput(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    sound.playKeyClick();
    setTypedInput('');
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    if (!typedInput.trim()) return;

    const normalizedTyped = normalize(typedInput);
    const matched = acceptedAnswers.some(ans => normalize(ans) === normalizedTyped);

    setIsSubmitted(true);
    setIsCorrect(matched);

    if (matched) {
      sound.playCorrect();
      setCompletedCount(prev => prev + 1);
      if (currentIndex + 1 === items.length) {
        setShowCelebration(true);
        sound.playVictory();
      }
    } else {
      sound.playWrong();
    }
  };

  // Hint function: fills the next correct character
  const handleHint = () => {
    sound.playKeyClick();
    const cleanTarget = targetAnswer.toLowerCase();
    const currentLength = typedInput.length;

    if (currentLength < cleanTarget.length) {
      const nextChar = cleanTarget[currentLength];
      setTypedInput(prev => prev + nextChar);
      setHintsUsed(prev => prev + 1);
    }
  };

  const handleNextWord = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
      setTypedInput('');
      setIsSubmitted(false);
      setIsCorrect(null);
      setHintsUsed(0);
    } else {
      setShowCelebration(true);
      sound.playVictory();
    }
  };

  const handleRestart = () => {
    setItems([...VOCABULARY_LIST].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setTypedInput('');
    setIsSubmitted(false);
    setIsCorrect(null);
    setHintsUsed(0);
    setCompletedCount(0);
    setShowCelebration(false);
  };

  // Physical Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (isSubmitted && isCorrect) {
          handleNextWord();
        } else {
          handleCheck();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        handleKeyClick(' ');
      } else if (e.key.length === 1 && /[a-zA-Z0-9\-/]/.test(e.key)) {
        e.preventDefault();
        handleKeyClick(e.key.toLowerCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedInput, isSubmitted, isCorrect, currentIndex, items]);

  // QWERTY keyboard rows
  const keyboardRow1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const keyboardRow2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const keyboardRow3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', '-'];

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6" dir="rtl">
      {/* Practice Direction Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
          <ArrowLeftRight className="w-4 h-4 text-emerald-600" />
          <span>اتجاه التدريب:</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => {
              setPracticeMode('word-to-meaning');
              setTypedInput('');
              setIsSubmitted(false);
              setIsCorrect(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              practiceMode === 'word-to-meaning'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الكلمة ➔ اكتب المرادف الإنجليزي (المطلوب) ✍️
          </button>
          <button
            onClick={() => {
              setPracticeMode('meaning-to-word');
              setTypedInput('');
              setIsSubmitted(false);
              setIsCorrect(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              practiceMode === 'meaning-to-word'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المعنى ➔ اكتب الكلمة الإنجليزية
          </button>
        </div>
      </div>

      {!showCelebration ? (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <span>المفردة:</span>
              <span className="font-mono text-emerald-600 text-base font-black">{currentIndex + 1}</span>
              <span>/</span>
              <span className="font-mono text-slate-500">{items.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>الكلمات المتقنة:</span>
              <span className="font-mono text-emerald-600 text-base font-black">{completedCount}</span>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            />
          </div>

          {/* Prompt Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm relative text-center">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                {practiceMode === 'word-to-meaning' ? 'اكتب المرادف الإنجليزي (Synonym)' : 'اكتب الكلمة الإنجليزية'}
              </span>

              <button
                onClick={() => sound.speak(practiceMode === 'word-to-meaning' ? currentItem.word : currentItem.meaningEn)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-bold border border-slate-200"
                title="استمع للنطق"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>استماع</span>
              </button>
            </div>

            {/* Target Display */}
            <div className="space-y-1 my-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-wide dir-ltr">
                {practiceMode === 'word-to-meaning' ? currentItem.fullWordDisplay : currentItem.meaningEn}
              </div>
              <div className="text-slate-600 text-base font-bold">
                المعنى بالعربي: <span className="text-slate-900 font-black">{currentItem.meaningAr}</span>
              </div>
            </div>

            {/* Expected target character count info */}
            <div className="text-xs text-slate-500 mb-4 font-mono">
              المطلوب كتابته: <span className="text-emerald-600 font-black">{targetAnswer.length}</span> حرفاً (يمكن استخدام مسافات)
            </div>

            {/* Input Display Field */}
            <div 
              dir="ltr"
              style={{ direction: 'ltr' }}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 bg-slate-50 flex items-center justify-between gap-2 font-mono text-xl sm:text-2xl tracking-wider min-h-[64px] ${
              isSubmitted && isCorrect
                ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900'
                : isSubmitted && !isCorrect
                ? 'border-red-500 bg-red-50/70 text-red-900'
                : 'border-slate-300 focus-within:border-emerald-500 text-slate-900'
            }`}>
              <div className="flex-1 text-center font-bold break-all">
                {typedInput ? (
                  typedInput
                ) : (
                  <span className="text-slate-400 text-base font-normal tracking-normal font-sans" dir="rtl">
                    اضغط على الكيبورد بالأسفل أو اكتب مباشرة...
                  </span>
                )}
                <span className="inline-block w-2.5 h-6 bg-emerald-500 ml-1 animate-pulse align-middle" />
              </div>

              {typedInput && (
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                  title="مسح"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Instant Validation Feedback */}
            {isSubmitted && (
              <div className={`mt-4 p-3.5 rounded-2xl border text-sm leading-relaxed animate-in fade-in duration-200 ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                {isCorrect ? (
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 font-black text-emerald-800">
                      <Check className="w-5 h-5" />
                      <span>إجابة صحيحة ومتقنة 100% يا وسيم! 🎯</span>
                    </div>
                    <button
                      onClick={handleNextWord}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all active:scale-95 shadow-md shadow-emerald-600/20"
                    >
                      <span>الكلمة التالية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-right">
                    <div className="flex items-center gap-2 font-bold text-red-700">
                      <X className="w-5 h-5" />
                      <span>إجابة غير دقيقة! حاول مرة أخرى أو استخدم التلميح 💡</span>
                    </div>
                    <div className="text-xs text-slate-700 font-medium">
                      الإجابة الصحيحة هي: <span dir="ltr" className="font-mono text-indigo-700 font-black inline-block px-2 py-0.5 bg-white border border-slate-300 rounded">{targetAnswer}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive On-Screen English QWERTY Keyboard */}
          <div 
            dir="ltr" 
            style={{ direction: 'ltr' }}
            className="bg-white border border-slate-200/90 rounded-3xl p-3 sm:p-5 shadow-sm select-none"
          >
            <div className="space-y-2" dir="ltr" style={{ direction: 'ltr' }}>
              {/* Row 1: Q W E R T Y U I O P */}
              <div className="flex flex-row justify-center gap-1 sm:gap-1.5" dir="ltr">
                {keyboardRow1.map(char => (
                  <button
                    key={char}
                    onClick={() => handleKeyClick(char)}
                    className="flex-1 max-w-[48px] h-11 sm:h-12 bg-slate-100 hover:bg-slate-200 active:bg-emerald-600 active:text-white text-slate-800 font-mono font-black text-base sm:text-lg rounded-xl border border-slate-300/80 shadow-2xs transition-all active:scale-90"
                  >
                    {char.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Row 2: A S D F G H J K L (A on the LEFT, L on the RIGHT) */}
              <div className="flex flex-row justify-center gap-1 sm:gap-1.5 px-2" dir="ltr">
                {keyboardRow2.map(char => (
                  <button
                    key={char}
                    onClick={() => handleKeyClick(char)}
                    className="flex-1 max-w-[48px] h-11 sm:h-12 bg-slate-100 hover:bg-slate-200 active:bg-emerald-600 active:text-white text-slate-800 font-mono font-black text-base sm:text-lg rounded-xl border border-slate-300/80 shadow-2xs transition-all active:scale-90"
                  >
                    {char.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Row 3: Z X C V B N M Backspace (Z on the LEFT, M and Backspace on the RIGHT) */}
              <div className="flex flex-row justify-center gap-1 sm:gap-1.5" dir="ltr">
                {keyboardRow3.map(char => (
                  <button
                    key={char}
                    onClick={() => handleKeyClick(char)}
                    className="flex-1 max-w-[48px] h-11 sm:h-12 bg-slate-100 hover:bg-slate-200 active:bg-emerald-600 active:text-white text-slate-800 font-mono font-black text-base sm:text-lg rounded-xl border border-slate-300/80 shadow-2xs transition-all active:scale-90"
                  >
                    {char.toUpperCase()}
                  </button>
                ))}

                {/* Backspace Key on the right */}
                <button
                  onClick={handleBackspace}
                  className="flex-1 max-w-[64px] h-11 sm:h-12 bg-red-100 hover:bg-red-200 active:bg-red-600 text-red-700 active:text-white font-bold rounded-xl border border-red-300 shadow-2xs flex items-center justify-center transition-all active:scale-90"
                  title="حذف حرف (Backspace)"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>

              {/* Row 4: Action Keys + Space */}
              <div className="flex flex-row justify-center gap-1.5 sm:gap-2 pt-1" dir="ltr">
                {/* Hint Button */}
                <button
                  onClick={handleHint}
                  className="px-3 sm:px-4 h-11 sm:h-12 bg-amber-100 hover:bg-amber-200 active:bg-amber-400 text-amber-900 font-black rounded-xl border border-amber-300 shadow-2xs flex items-center gap-1.5 text-xs transition-all active:scale-95"
                  title="تلميح حرف إضافي"
                >
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">تلميح</span>
                </button>

                {/* Spacebar in Center */}
                <button
                  onClick={() => handleKeyClick(' ')}
                  className="flex-1 max-w-[260px] h-11 sm:h-12 bg-slate-100 hover:bg-slate-200 active:bg-emerald-600 active:text-white text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-2xs transition-all active:scale-95"
                >
                  Space
                </button>

                {/* Submit / Check Button */}
                {isSubmitted && isCorrect ? (
                  <button
                    onClick={handleNextWord}
                    className="px-4 sm:px-6 h-11 sm:h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md shadow-emerald-600/30 flex items-center gap-1.5 text-xs sm:text-sm transition-all active:scale-95 animate-pulse"
                  >
                    <span>التالي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCheck}
                    disabled={!typedInput.trim()}
                    className={`px-4 sm:px-6 h-11 sm:h-12 font-black rounded-xl shadow-2xs flex items-center gap-1.5 text-xs sm:text-sm transition-all active:scale-95 ${
                      typedInput.trim()
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span>تحقق</span>
                    <CornerDownLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-500 mt-3 dir-rtl font-sans font-medium">
              💡 يمكنك الكتابة بالضغط على أزرار الكيبورد الظاهرة أو استخدام لوحة مفاتيح جهازك مباشرة!
            </p>
          </div>
        </div>
      ) : (
        /* Completed typing practice view */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 text-center shadow-lg relative overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-400/30">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            بطل الكتابة يا وسيم قيمري! ⌨️🔥
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed font-medium">
            أكملت كتابة جميع مرادفات معاني كلمات الوحدة الأولى بدقة عالية! الآن أصبح السبيلنج والمعنى راسخين تماماً في ذاكرتك.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black transition-all shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>جولة كتابة جديدة بترتيب مختلف</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
