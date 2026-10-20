import React, { useState, useMemo } from 'react';
import { VOCABULARY_LIST, WordItem } from '../data/words.ts';
import { sound } from '../utils/sound.ts';
import { 
  Smile, 
  Volume2, 
  Search, 
  Star, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen,
  Headphones
} from 'lucide-react';

export const ComicMemoriesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'word' | 'fixed_phrase' | 'favorite'>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('waseem_vocab_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    sound.playKeyClick();
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('waseem_vocab_favs', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleCopy = (item: WordItem) => {
    sound.playKeyClick();
    const textToCopy = `${item.word} = ${item.meaningEn} (${item.meaningAr})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    sound.speak(text);
  };

  // Filtered vocabulary
  const filteredWords = useMemo(() => {
    return VOCABULARY_LIST.filter(item => {
      if (selectedFilter === 'word' && item.category !== 'word') return false;
      if (selectedFilter === 'fixed_phrase' && item.category !== 'fixed_phrase') return false;
      if (selectedFilter === 'favorite' && !favorites.includes(item.id)) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.word.toLowerCase().includes(q) ||
        item.meaningEn.toLowerCase().includes(q) ||
        item.meaningAr.includes(q) ||
        item.comicStory.includes(q) ||
        item.comicHook.includes(q)
      );
    });
  }, [searchQuery, selectedFilter, favorites]);

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6" dir="rtl">
      {/* Introduction banner */}
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-orange-50 border border-amber-300 rounded-3xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 text-right">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
            <Smile className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>الربط اللفظي الإنجليزي الذكي 🔤</span>
              <span className="text-amber-900 text-xs px-2.5 py-0.5 rounded-full bg-amber-200 border border-amber-300 font-bold">
                خاص بالطالب: وسيم قيمري
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-medium">
              الربط هنا يربط <strong className="text-amber-900">الكلمة بالإنجليزية مع مرادفها الإنجليزي مباشرة</strong> عن طريق تشابه اللفظ والنغمات والحروف بطريقة فكاهية مستحيل تنساها!
            </p>
          </div>
        </div>

        <div className="shrink-0 bg-white px-4 py-2.5 rounded-2xl border border-amber-200 text-center shadow-2xs">
          <span className="text-xs text-slate-500 block font-bold">إجمالي المفردات</span>
          <span className="text-xl font-black text-amber-700 font-mono">{VOCABULARY_LIST.length} كلمات وتعبيرات</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن كلمة، مرادف إنجليزي، أو معنى عربي..."
            className="w-full bg-white border border-slate-300 rounded-2xl py-3 pr-11 pl-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-colors shadow-2xs"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            الكل ({VOCABULARY_LIST.length})
          </button>

          <button
            onClick={() => setSelectedFilter('word')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedFilter === 'word'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            الكلمات الأساسية (13)
          </button>

          <button
            onClick={() => setSelectedFilter('fixed_phrase')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedFilter === 'fixed_phrase'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            التعبيرات الثابتة Fixed phrases (5)
          </button>

          <button
            onClick={() => setSelectedFilter('favorite')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedFilter === 'favorite'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${selectedFilter === 'favorite' ? 'fill-slate-950' : 'text-amber-500'}`} />
            <span>المفضلة للتركيز ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Words Cards Grid */}
      {filteredWords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWords.map((item, index) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-5 hover:border-amber-400 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-600">
                        {index + 1}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                        item.category === 'word'
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {item.category === 'word' ? 'مفردة أساسية' : 'تعبير ثابت Fixed Phrase'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Audio Button */}
                      <button
                        onClick={() => handleSpeak(`${item.word}, ${item.meaningEn}`)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95 border border-slate-200"
                        title="استمع لنطق الكلمة والمرادف بالإنجليزي"
                      >
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(item)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95 border border-slate-200"
                        title="نسخ الكلمة والمرادف"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1.5 rounded-xl transition-all active:scale-95 border border-slate-200 ${
                          isFav ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-amber-500'
                        }`}
                        title={isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Word & English Synonym */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-3 space-y-2">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-wide dir-ltr">
                        {item.fullWordDisplay}
                      </h3>
                      <span className="text-sm font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {item.meaningAr}
                      </span>
                    </div>

                    <div className="text-sm text-slate-800 dir-ltr font-mono flex items-center gap-2 bg-indigo-50/70 p-2 rounded-xl border border-indigo-100">
                      <span className="text-indigo-700 font-extrabold text-xs">EN Synonym:</span>
                      <span className="text-indigo-950 font-black">{item.meaningEn}</span>
                    </div>
                  </div>

                  {/* The Comic Relatable English Phonetic Story */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                      <Headphones className="w-4 h-4 text-amber-700" />
                      <span>طريقة الربط باللفظ والنغمة الإنجليزية:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {item.comicStory}
                    </p>
                  </div>
                </div>

                {/* Comic Hook + Spelling Trap Warning */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1 truncate text-amber-900 font-bold">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    <span className="truncate">{item.comicHook}</span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                    فخ: {item.scrambledTraps[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="p-8 text-center bg-white border border-slate-200 rounded-3xl">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">لا توجد كلمات مطابقة للبحث</h3>
          <p className="text-xs text-slate-500">جرب كتابة جزء آخر من الكلمة أو قم بإلغاء الفلاتر.</p>
        </div>
      )}
    </div>
  );
};
