import React from 'react';
import { X, HelpCircle, CheckCircle2, Keyboard, Sparkles, BookOpen } from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-right"
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">دليل استخدام التطبيق</h2>
            <p className="text-sm text-amber-800 font-bold">مخصص للطالب البطل: وسيم قيمري</p>
          </div>
        </div>

        <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-indigo-700 font-extrabold">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-lg text-slate-900 font-black">1. قائمة ضع دائرة (مع خربشة الأحرف)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              هنا بتختبر حفظك للأحرف والسبيلنج الصحيح! السؤال رح يعطيك المعنى، ويعطيك 4 خيارات مخربشة ومشقلبة بحروف بديلة (زي تبديل <span className="font-mono text-amber-700 bg-amber-100 px-1 py-0.5 rounded font-bold">e</span> بـ <span className="font-mono text-amber-700 bg-amber-100 px-1 py-0.5 rounded font-bold">i</span>، أو حروف ناقصة). هدفك تكتشف الكلمة الأصلية الصح من غير ما تقع بالفخ!
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-emerald-700 font-extrabold">
              <Keyboard className="w-5 h-5" />
              <h3 className="text-lg text-slate-900 font-black">2. قائمة الكتابة (بالكيبورد الإنجليزي)</h3>
            </div>
            <p className="text-slate-600 text-sm">
              التطبيق بيعطيك الكلمة بالعربي والإنجليزي، والمطلوب منك تكتب المرادف الإنجليزي (<span className="text-emerald-700 font-bold">English Meaning</span>). وفرنالك كيبورد إنجليزي تفاعلي كامل على الشاشة تقدر تضغط عليه مباشرة، أو تستخدم كيبورد اللابتوب/الجوال الحقيقي، مع زر تلميح 💡 إذا نسيت حرف!
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-amber-700 font-extrabold">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg text-slate-900 font-black">3. قائمة الحفظ والربط اللفظي الإنجليزي</h3>
            </div>
            <p className="text-slate-600 text-sm">
              قبل ما تبدأ الاختبارات، افتح هاي القائمة! كل كلمة مربوطة <span className="font-bold text-amber-900">بمرادفها الإنجليزي بطريقة صوتية ونغمات متشابهة ومضحكة</span>، مع إمكانية سماع النطق الإنجليزي الصحيح للكلمة بالضغط على أيقونة الصوت 🔊.
            </p>
          </div>

          {/* Tip */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-amber-950 font-medium">
              <strong className="text-amber-800">نصيحة ذهبية لوسيم:</strong> ابدأ أولاً بقائمة <span className="underline decoration-amber-500 underline-offset-4 font-bold">الربط اللفظي</span> لسماع ونطق الكلمات، ثم ادخل على <span className="underline decoration-amber-500 underline-offset-4 font-bold">ضع دائرة</span> لاصطياد الفخاخ، ثم اختم بـ <span className="underline decoration-amber-500 underline-offset-4 font-bold">الكتابة</span> عشان تضمن العلامة الكاملة 100%!
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-transform active:scale-95 shadow-md shadow-amber-500/20"
          >
            جاهز يا وسيم، يلا نبدأ! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
