import React, { useState } from 'react';
import { I_LANGUAGE_PRACTICES } from '../../data/initialData';
import {
  MessageSquareHeart,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Copy,
  Check,
  Send,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const CommunicationTab: React.FC = () => {
  // Sentence Builder State
  const [behavior, setBehavior] = useState('');
  const [feeling, setFeeling] = useState('');
  const [request, setRequest] = useState('');
  const [generatedSentence, setGeneratedSentence] = useState('');
  const [copied, setCopied] = useState(false);

  // Practice Quiz / Scenario state
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);

  const FEELING_OPTIONS = [
    { label: 'Üzülüyorum', value: 'üzülüyorum' },
    { label: 'Kırılıyorum / İncinmiş hissediyorum', value: 'kırılıyorum' },
    { label: 'Kaygılanıyorum / Endişeleniyorum', value: 'kaygılanıyorum' },
    { label: 'Yalnız kalmış ve yorulmuş hissediyorum', value: 'yalnız kalmış hissediyorum' },
    { label: 'Duyulmadığımı / Önemsenmediğimi hissediyorum', value: 'önemsenmediğimi hissediyorum' },
    { label: 'Huzursuz hissediyorum', value: 'huzursuz hissediyorum' }
  ];

  const BEHAVIOR_PRESETS = [
    'Odaya kapıyı çalmadan girdiğinde',
    'Sofraya otururken telefonla ilgilendiğinde',
    'Sözümü kesip beni dinlemediğinde',
    'Akşam geç kalıp haber vermediğinde',
    'Verilen sözler unutulduğunda'
  ];

  const REQUEST_PRESETS = [
    'Lütfen bir dahaki sefere haber verir misin?',
    'Birbirimize birkaç dakika kesintisiz vakit ayırabilir miyiz?',
    'Bu konuda ortak bir kural belirlememizi ister misin?',
    'Eşyaları yerine koyarken bana yardım eder misin?',
    'Fikrimi sakince dinlemeni rica ediyorum.'
  ];

  const handleGenerate = () => {
    if (!behavior.trim() || !feeling.trim() || !request.trim()) {
      return;
    }
    const cleanBehavior = behavior.trim();
    const formattedSentence = `Sen ${cleanBehavior.toLowerCase()}, ben ${feeling}. ${request.trim()}`;
    setGeneratedSentence(formattedSentence);
  };

  const handleCopy = () => {
    if (!generatedSentence) return;
    navigator.clipboard.writeText(generatedSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentPractice = I_LANGUAGE_PRACTICES[activeScenarioIdx];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-1">
          <MessageSquareHeart className="w-4 h-4 text-sky-700" />
          <span>İletişim Köşesi & Ben Dili</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Kırmadan, İncinmeden Konuşabilmek
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-3xl">
          Aile içinde anlaşmazlıklar doğaldır. Asıl önemli olan, öfke ve suçlama dili yerine ("Sen Dili"),
          duygularımızı ve ihtiyaçlarımızı samimiyetle ifade edebilmektir ("Ben Dili").
        </p>
      </div>

      {/* Comparison Grid: Sen Dili vs Ben Dili */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Sen Dili */}
        <div className="bg-rose-50/60 border border-rose-200/80 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center gap-2 text-rose-800 font-semibold text-sm mb-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Sen Dili (Suçlayıcı & Yıkıcı)</span>
          </div>
          <p className="text-xs text-rose-900/70 mb-4 leading-relaxed">
            Davranış yerine doğrudan kişinin karakterini hedef alır. Karşı tarafta savunma, inatlaşma veya
            öfke patlaması doğurur.
          </p>

          <div className="bg-white/90 rounded-2xl p-4 border border-rose-200/60 space-y-2 shadow-2xs">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-semibold">Örnek İfade:</p>
            <p className="font-serif text-base text-stone-800 italic">
              "Beni hiç dinlemiyorsun! Sürekli kafana göre davranıyorsun, çok saygısızsın!"
            </p>
          </div>

          <div className="mt-4 text-xs text-rose-800 font-medium">
            ❌ Sonuç: İletişim kapıları kapanır, tartışma büyür.
          </div>
        </div>

        {/* Ben Dili */}
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Ben Dili (Empatik & Çözüm Odaklı)</span>
          </div>
          <p className="text-xs text-emerald-900/70 mb-4 leading-relaxed">
            Yaşanan durumu, bu durumun sizde yarattığı somut duyguyu ve net ihtiyacınızı söyler. Karşı
            tarafı düşmanlaştırmadan empatiye çağırır.
          </p>

          <div className="bg-white/90 rounded-2xl p-4 border border-emerald-200/60 space-y-2 shadow-2xs">
            <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">Örnek İfade:</p>
            <p className="font-serif text-base text-stone-800 italic">
              "Konuşurken yüzüme bakmadığında beni önemsemediğini hissedip inciniyorum. Göz teması kurarak konuşabilir miyiz?"
            </p>
          </div>

          <div className="mt-4 text-xs text-emerald-800 font-medium">
            ✅ Sonuç: Kalpler yumuşar, iş birliği ve anlayış başlar.
          </div>
        </div>
      </div>

      {/* Interactive Sentence Builder */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-6 sm:p-9 space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
          <Sparkles className="w-5 h-5 text-sky-600" />
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              "Ben Dili" Cümle Kurucu
            </h2>
            <p className="text-xs text-stone-500">
              Şu an bir aile ferdinize söylemek istediğiniz zor bir duyguyu 3 adımda dönüştürün.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Behavior */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs">
                1
              </span>
              <span>Gözlem / Davranış (Ne oldu?)</span>
            </div>

            <input
              type="text"
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              placeholder="örn: Odaya kapıyı çalmadan girdiğinde"
              className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 text-stone-800"
            />

            <div className="space-y-1">
              <span className="text-[11px] text-stone-400">Hızlı şablonlar:</span>
              <div className="flex flex-col gap-1">
                {BEHAVIOR_PRESETS.slice(0, 3).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBehavior(preset)}
                    className="text-left text-xs text-stone-600 hover:text-sky-800 p-1 rounded hover:bg-stone-50 truncate"
                  >
                    • {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Feeling */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs">
                2
              </span>
              <span>Duygunuz (Ne hissettin?)</span>
            </div>

            <select
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 text-stone-800"
            >
              <option value="">Bir duygu seçin...</option>
              {FEELING_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>

            <p className="text-[11px] text-stone-400 leading-relaxed">
              Öfke çoğu zaman ikincil bir duygudur; altında kırgınlık, korku veya yalnızlık yatar.
            </p>
          </div>

          {/* Step 3: Request */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs">
                3
              </span>
              <span>İstek / İhtiyaç (Ne istiyorsun?)</span>
            </div>

            <input
              type="text"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="örn: Lütfen bir dahaki sefere kapıyı tıklar mısın?"
              className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 text-stone-800"
            />

            <div className="space-y-1">
              <span className="text-[11px] text-stone-400">Hızlı şablonlar:</span>
              <div className="flex flex-col gap-1">
                {REQUEST_PRESETS.slice(0, 3).map((req) => (
                  <button
                    key={req}
                    onClick={() => setRequest(req)}
                    className="text-left text-xs text-stone-600 hover:text-sky-800 p-1 rounded hover:bg-stone-50 truncate"
                  >
                    • {req}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={!behavior.trim() || !feeling.trim() || !request.trim()}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2"
          >
            <span>Ben Dili Cümlesini Oluştur</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Output Presentation Box */}
        {generatedSentence && (
          <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-sky-50 border border-sky-200 p-6 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Önerilen "Ben Dili" İfadeniz:
              </span>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-sky-800 hover:text-sky-950 font-medium px-2.5 py-1 bg-white rounded-lg border border-sky-200 shadow-2xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            <p className="font-serif text-lg sm:text-xl text-stone-900 italic font-medium leading-relaxed">
              "{generatedSentence}"
            </p>

            <p className="text-xs text-stone-500">
              Bu ifadeyi sakin bir ses tonuyla, suçlayıcı beden dili kullanmadan ve göz teması kurarak
              söylediğinizde aradaki buzların eridiğini göreceksiniz.
            </p>
          </div>
        )}
      </div>

      {/* Real-Life Scenarios / Practice Quiz */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-6 sm:p-9 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-700" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Günlük Hayattan Dönüşüm Pratikleri
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            {I_LANGUAGE_PRACTICES.map((_, pIdx) => (
              <button
                key={pIdx}
                onClick={() => setActiveScenarioIdx(pIdx)}
                className={`w-7 h-7 rounded-lg font-semibold transition-colors ${
                  pIdx === activeScenarioIdx
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {pIdx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-5 sm:p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Durum {activeScenarioIdx + 1}:
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {currentPractice.situation}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1.5">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
                ❌ Klasik Tepki (Sen Dili):
              </span>
              <p className="text-sm text-stone-800 italic">
                "{currentPractice.youLanguage}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                ✅ İyileştirici İfade (Ben Dili):
              </span>
              <p className="text-sm text-stone-800 italic">
                "{currentPractice.iLanguage}"
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-stone-600 bg-white p-3.5 rounded-xl border border-stone-200">
            <strong className="text-stone-800">Psikolojik Analiz: </strong>
            {currentPractice.explanation}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() =>
              setActiveScenarioIdx((prev) => (prev + 1) % I_LANGUAGE_PRACTICES.length)
            }
            className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900"
          >
            <span>Sıradaki Örneği İncele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
