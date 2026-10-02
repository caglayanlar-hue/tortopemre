import React, { useState } from 'react';
import { TabType, FamilyMember, Activity, TaskItem, MeetingRecord } from '../../types';
import { LOVE_WORDS } from '../../data/initialData';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Gamepad2,
  Coffee,
  BookOpen,
  MessageSquareHeart,
  ClipboardList,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  familyMembers: FamilyMember[];
  activities: Activity[];
  tasks: TaskItem[];
  meetings: MeetingRecord[];
  completedActivityIds: string[];
}

export const HomeTab: React.FC<HomeTabProps> = ({
  setActiveTab,
  familyMembers,
  activities,
  tasks,
  meetings,
  completedActivityIds
}) => {
  const [loveWordIndex, setLoveWordIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Today's suggested activity based on day of week
  const dayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayActivity = activities[dayIndex] || activities[0];

  const handleNextLoveWord = () => {
    setLoveWordIndex((prev) => (prev + 1) % LOVE_WORDS.length);
  };

  const handleCopyLoveWord = () => {
    navigator.clipboard.writeText(LOVE_WORDS[loveWordIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedTasksCount = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/90 p-8 sm:p-12 shadow-xs">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-3">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            <span>Sevgiyle Dokunan Bir Yuva</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.18] tracking-tight">
            Ailemiz,{' '}
            <span className="text-amber-800 italic font-serif">En Büyük Hazinemiz</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
            Modern zamanın telaşına inat; birbirimize daha sıkı sarılmak, kalpten iletişim kurmak
            ve dijital kopukluktan uzaklaşarak "biz olma" duygusunu tazelemek için buradayız.
          </p>

          {/* Daily Quote / Love Word Box */}
          <div className="mt-8 rounded-2xl bg-stone-50 border border-stone-200/90 p-5 sm:p-6 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  Günün Sevgi & Takdir Sözcüğü
                </span>
                <p className="font-serif text-lg sm:text-xl text-stone-800 italic leading-snug">
                  "{LOVE_WORDS[loveWordIndex]}"
                </p>
                <p className="text-xs text-stone-500 font-normal">
                  Bugün bu cümleyi bir aile ferdinize gözlerinin içine bakıp sevgiyle fısıldayın.
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleCopyLoveWord}
                  className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
                  title="Cümleyi Kopyala"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleNextLoveWord}
                  className="p-2 rounded-lg text-stone-500 hover:text-amber-800 hover:bg-stone-200/60 transition-colors"
                  title="Farklı Bir Sözcük"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Metrics Bar (Unboxed clean metadata & counts) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <p className="text-xs text-stone-500 font-medium">Aile Fertleri</p>
          <p className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
            {familyMembers.length}
          </p>
          <p className="text-xs text-stone-400 mt-1">Sofradaki canlar</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <p className="text-xs text-stone-500 font-medium">Tamamlanan Oyunlar</p>
          <p className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
            {completedActivityIds.length} <span className="text-xs text-stone-400 font-sans">/ 7</span>
          </p>
          <p className="text-xs text-stone-400 mt-1">Haftalık paylaşım</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <p className="text-xs text-stone-500 font-medium">Görev İlerlemesi</p>
          <p className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
            {completedTasksCount} <span className="text-xs text-stone-400 font-sans">/ {tasks.length}</span>
          </p>
          <p className="text-xs text-stone-400 mt-1">Adil ev iş birliği</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <p className="text-xs text-stone-500 font-medium">Kayıtlı Toplantılar</p>
          <p className="text-2xl font-serif font-bold text-amber-800 mt-1 tabular-nums">
            {meetings.length}
          </p>
          <p className="text-xs text-stone-400 mt-1">Çay eşliğinde meclis</p>
        </div>
      </section>

      {/* Main Exploration Grid (5 Key Areas) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Ailemizin Yaşam Alanları
          </h2>
          <span className="text-xs text-stone-500">
            Bugün birlikte ne yapalım?
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Oyun & Etkinlik */}
          <div
            onClick={() => setActiveTab('daily')}
            className="group cursor-pointer rounded-2xl bg-white border border-stone-200/80 p-6 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                Oyun & Etkinlik Takvimi
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Haftanın her gününe özel; gülmeyi, empatiyi ve takım ruhunu pekiştiren 7 pratik
                etkinlik.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-amber-800 font-medium">
              <span>Etkinliklere Git</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Aile Toplantısı */}
          <div
            onClick={() => setActiveTab('meeting')}
            className="group cursor-pointer rounded-2xl bg-white border border-amber-200/80 p-6 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                Haftalık Aile Toplantısı
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Çay ve kurabiye eşliğinde haftalık değerlendirme yapın, sorunları konuşun ve
                tutanak tutun.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-amber-800 font-medium">
              <span>Toplantı Başlat</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Sohbet Rehberi */}
          <div
            onClick={() => setActiveTab('book')}
            className="group cursor-pointer rounded-2xl bg-white border border-stone-200/80 p-6 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-purple-800 transition-colors">
                "Aile Dediğin" Sohbet Rehberi
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Öyküleri kitabınızdan okuyup üzerine hazırlanmış derinleştirici sorularla muhabbet
                başlatın.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-purple-800 font-medium">
              <span>Öykülere Göz At</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: İletişim Köşesi */}
          <div
            onClick={() => setActiveTab('chat')}
            className="group cursor-pointer rounded-2xl bg-white border border-stone-200/80 p-6 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-sky-800 transition-colors">
                İletişim Köşesi & "Ben Dili"
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Suçlayıcı ifadeleri dönüştürün; duyguları kırıp dökmeden yapıcı bir şekilde dile
                getirin.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-sky-800 font-medium">
              <span>Cümle Kurucuya Git</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 5: Görev Paylaşımı */}
          <div
            onClick={() => setActiveTab('tasks')}
            className="group cursor-pointer rounded-2xl bg-white border border-stone-200/80 p-6 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                Adil Görev & Sorumluluk Paylaşımı
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed max-w-xl">
                Ev işlerini tek bir kişinin omzuna yüklemeden, ailedeki herkesin el birliğiyle
                katıldığı şeffaf ve eğlenceli görev panosu.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
              <span>Görev Panosunu İncele</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Today's Spotlight Callout */}
      <section className="rounded-3xl bg-gradient-to-r from-[#F7EFE5] via-[#FAF3EC] to-[#F5ECE0] border border-amber-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Bugünün Önerisi · {todayActivity.day}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            {todayActivity.title}
          </h3>
          <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
            {todayActivity.desc}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('daily')}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-all shadow-xs shrink-0 flex items-center gap-2"
        >
          <span>Etkinliği İncele & Başlat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
