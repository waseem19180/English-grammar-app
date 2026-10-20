import React from 'react';
import { Volume2, VolumeX, BookOpen, GraduationCap, Sparkles, CheckCircle2, Keyboard, Smile } from 'lucide-react';

export type ActiveTab = 'multiple-choice' | 'typing' | 'comic';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  onToggleMute,
  onOpenGuide,
}) => {
  return (
    <header className="w-full bg-white/95 border-b border-slate-200/90 sticky top-0 z-40 backdrop-blur-md shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4">
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3.5">
          {/* Student & Subject Branding */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-md shadow-amber-500/15">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-amber-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  معاني كلمات الوحدة الأولى <span className="text-amber-700 text-sm font-bold font-mono bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">(A new start)</span>
                </h1>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 mt-0.5">
                <span>تطبيق مخصص للطالب:</span>
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-md font-extrabold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  وسيم قيمري
                </span>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold transition-all hover:border-amber-400 active:scale-95 shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>دليل الاستخدام</span>
            </button>

            <button
              onClick={onToggleMute}
              className={`p-2 rounded-xl border transition-all active:scale-95 shadow-2xs ${
                isMuted
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
              aria-label="تبديل الصوت"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>

        {/* 3 Main Tabs: Exactly 3 Tabs as strictly required */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
          {/* Tab 1: ضع دائرة */}
          <button
            onClick={() => setActiveTab('multiple-choice')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'multiple-choice'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${activeTab === 'multiple-choice' ? 'text-indigo-200' : 'text-slate-500'}`} />
            <span className="truncate">١. ضع دائرة (الخربشة)</span>
          </button>

          {/* Tab 2: الكتابة */}
          <button
            onClick={() => setActiveTab('typing')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'typing'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Keyboard className={`w-4 h-4 shrink-0 ${activeTab === 'typing' ? 'text-emerald-200' : 'text-slate-500'}`} />
            <span className="truncate">٢. الكتابة (الكيبورد)</span>
          </button>

          {/* Tab 3: الحفظ الكوميدي */}
          <button
            onClick={() => setActiveTab('comic')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'comic'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Smile className={`w-4 h-4 shrink-0 ${activeTab === 'comic' ? 'text-amber-950' : 'text-slate-500'}`} />
            <span className="truncate">٣. الربط اللفظي</span>
          </button>
        </div>
      </div>
    </header>
  );
};
