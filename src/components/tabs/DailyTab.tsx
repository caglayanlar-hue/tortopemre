import React, { useState, useEffect } from 'react';
import { Activity } from '../../types';
import {
  Gamepad2,
  Clock,
  Sparkles,
  Dices,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Heart,
  Calendar,
  Smile,
  Utensils,
  Compass,
  Image as ImageIcon,
  Film,
  BookOpen
} from 'lucide-react';

interface DailyTabProps {
  activities: Activity[];
  completedActivityIds: string[];
  onToggleComplete: (id: string) => void;
}

export const DailyTab: React.FC<DailyTabProps> = ({
  activities,
  completedActivityIds,
  onToggleComplete
}) => {
  // Default to today's day of week
  const initialIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [showCelebration, setShowCelebration] = useState(false);

  // Activity Timer feature
  const [timerSeconds, setTimerSeconds] = useState<number>(15 * 60);
  const [initialTimerSeconds, setInitialTimerSeconds] = useState<number>(15 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  const currentActivity = activities[selectedIndex] || activities[0];
  const isCompleted = completedActivityIds.includes(currentActivity.id);

  // Set default timer duration based on activity duration
  useEffect(() => {
    const minutesMatch = currentActivity.duration.match(/\d+/);
    const mins = minutesMatch ? parseInt(minutesMatch[0], 10) : 15;
    const secs = mins * 60;
    setTimerSeconds(secs);
    setInitialTimerSeconds(secs);
    setTimerRunning(false);
    setTimerFinished(false);
  }, [selectedIndex, currentActivity]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      setTimerFinished(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const handleRandomActivity = () => {
    let nextIdx: number;
    do {
      nextIdx = Math.floor(Math.random() * activities.length);
    } while (nextIdx === selectedIndex && activities.length > 1);
    setSelectedIndex(nextIdx);
  };

  const handleComplete = () => {
    onToggleComplete(currentActivity.id);
    if (!isCompleted) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4500);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getActivityIcon = (name: string) => {
    switch (name) {
      case 'Smile':
        return <Smile className="w-8 h-8 text-amber-700" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-amber-700" />;
      case 'Utensils':
        return <Utensils className="w-8 h-8 text-amber-700" />;
      case 'Compass':
        return <Compass className="w-8 h-8 text-amber-700" />;
      case 'Image':
        return <ImageIcon className="w-8 h-8 text-amber-700" />;
      case 'Film':
        return <Film className="w-8 h-8 text-amber-700" />;
      case 'BookOpen':
        return <BookOpen className="w-8 h-8 text-amber-700" />;
      default:
        return <Gamepad2 className="w-8 h-8 text-amber-700" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
          <Gamepad2 className="w-4 h-4 text-amber-700" />
          <span>Haftalık Oyun & Etkinlik Takvimi</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Gülümseten Aile Etkinlikleri
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
          Ekransız, sıcak ve eğlenceli anlar... Her güne özel oyunlarla ailecek bağ kuruyoruz.
        </p>
      </div>

      {/* Week Day Pill Selector (Single row clean tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {activities.map((act, idx) => {
          const isSelected = idx === selectedIndex;
          const done = completedActivityIds.includes(act.id);

          return (
            <button
              key={act.id}
              onClick={() => setSelectedIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap border shrink-0 ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200/90 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 opacity-70" />
              <span>{act.day}</span>
              {done && (
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-amber-400' : 'text-emerald-600'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity Showcase */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
            {/* Top Bar with unboxed metadata */}
            <div className="px-6 py-4 bg-stone-50/80 border-b border-stone-200/80 flex items-center justify-between flex-wrap gap-2 text-xs text-stone-600">
              <span className="font-semibold text-stone-800 font-serif text-sm">
                {currentActivity.day} Etkinliği
              </span>

              <div className="flex items-center gap-2">
                <span className="font-medium text-amber-800">{currentActivity.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-stone-500">
                  <Clock className="w-3 h-3" />
                  {currentActivity.duration}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isCompleted ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tamamlandı
                    </span>
                  ) : (
                    <span className="text-stone-400">Beklemede</span>
                  )}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center shrink-0">
                  {getActivityIcon(currentActivity.iconName)}
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                    {currentActivity.title}
                  </h2>
                  <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                    {currentActivity.desc}
                  </p>
                </div>
              </div>

              {/* Rules & How to play */}
              <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-5 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Nasıl Oynanır & Oyun Kuralları</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-stone-600 pl-1">
                  {currentActivity.rules.map((rule, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs flex items-center justify-center shrink-0 font-medium mt-0.5">
                        {rIdx + 1}
                      </span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Psychological / Bonding Benefit */}
              <div className="rounded-2xl bg-[#F7F4EE] border border-amber-200/60 p-4 sm:p-5 flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-stone-800 font-semibold mb-0.5">
                    Neden Ailemize İyi Gelir?
                  </strong>
                  <span className="text-stone-600 leading-relaxed">
                    {currentActivity.benefit}
                  </span>
                </div>
              </div>

              {/* Interactive Game Timer Box */}
              <div className="rounded-2xl bg-white border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-100 text-stone-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      Etkinlik Sayacı
                    </p>
                    <p className="text-xs text-stone-500">
                      Oyun süresini takip etmek için sayacı başlatın.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold tracking-wider text-stone-800 tabular-nums">
                    {formatTimer(timerSeconds)}
                  </span>

                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white transition-colors"
                    title={timerRunning ? 'Durdur' : 'Başlat'}
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSeconds(initialTimerSeconds);
                      setTimerFinished(false);
                    }}
                    className="p-2.5 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                    title="Sıfırla"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {timerFinished && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium text-center animate-bounce">
                  🔔 Süre doldu! Etkinliği keyifle tamamladınız mı?
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-200/80 flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={handleRandomActivity}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors"
              >
                <Dices className="w-4 h-4" />
                <span>Rastgele Farklı Oyun Seç</span>
              </button>

              <button
                onClick={handleComplete}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all shadow-xs ${
                  isCompleted
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Tamamlandı (Geri Al)' : 'Tamamladık!'}</span>
              </button>
            </div>
          </div>

          {/* Celebration Box */}
          {showCelebration && (
            <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 p-6 text-center animate-in zoom-in-95 duration-300">
              <div className="text-3xl mb-2">🎉 👨‍👩‍👧‍👦 🌟</div>
              <h3 className="font-serif text-xl font-bold text-emerald-950">
                Tebrikler, Harika Bir An Paylaştınız!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-md mx-auto">
                Birlikte geçirdiğiniz bu değerli dakikalar, ailenizin sevgi ve güven hafızasına altın
                harflerle yazıldı.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar: All Activities Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-5">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
              Haftalık Plan
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Her güne bir tebessüm ve kaliteli zaman
            </p>

            <div className="space-y-2">
              {activities.map((act, idx) => {
                const isSelected = idx === selectedIndex;
                const isDone = completedActivityIds.includes(act.id);

                return (
                  <div
                    key={act.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-stone-50 border-stone-400/80 shadow-2xs'
                        : 'bg-white border-stone-100 hover:border-stone-200 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-stone-800">{act.day}</span>
                      <span className="text-[11px] text-stone-400">{act.duration}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-stone-600 truncate font-medium">
                        {act.title}
                      </p>
                      {isDone && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick advice box */}
          <div className="bg-[#FAF3EC] border border-amber-200/70 rounded-3xl p-5 text-xs text-stone-600 space-y-2">
            <p className="font-serif font-bold text-sm text-stone-800">
              💡 Küçük Bir İpucu
            </p>
            <p className="leading-relaxed">
              Oyun oynarken kazanmak veya kaybetmekten ziyade, birbirinizin gözlerine bakarak
              kahkaha atabilmeyi ödül sayın. Telefonları başka bir odada bırakmak oyunu 3 kat daha
              eğlenceli kılar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
