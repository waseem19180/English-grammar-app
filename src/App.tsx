/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header.tsx';
import { MultipleChoiceView } from './components/MultipleChoiceView.tsx';
import { TypingPracticeView } from './components/TypingPracticeView.tsx';
import { ComicMemoriesView } from './components/ComicMemoriesView.tsx';
import { UserGuideModal } from './components/UserGuideModal.tsx';
import { sound } from './utils/sound.ts';
import { GraduationCap, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('multiple-choice');
  const [isMuted, setIsMuted] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-950">
      {/* Main Header with student name and 3 strict tabs */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area: Strictly the 3 tabs requested */}
      <main className="flex-1 pb-12">
        {activeTab === 'multiple-choice' && <MultipleChoiceView />}
        {activeTab === 'typing' && <TypingPracticeView />}
        {activeTab === 'comic' && <ComicMemoriesView />}
      </main>

      {/* Clean Footer with Student Attribution */}
      <footer className="w-full py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2" dir="rtl">
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span>تطبيق دراسة مخصص للطالب:</span>
            <strong className="text-amber-700 font-extrabold">وسيم قيمري</strong>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">الوحدة الأولى (A new start)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <span>ثلاث قوائم مخصصة للحفظ والتمكين بنجاح</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
      </footer>

      {/* User Guide Modal */}
      <UserGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
