import React, { useState } from 'react';
import { BookStory } from '../../types';
import { BookCoverVisual } from '../BookCoverVisual';
import {
  BookOpen,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  PenLine,
  Save,
  Check,
  Feather
} from 'lucide-react';

interface BookTabProps {
  stories: BookStory[];
  storyNotes: Record<string, string>;
  onSaveStoryNote: (storyId: string, note: string) => void;
}

export const BookTab: React.FC<BookTabProps> = ({
  stories,
  storyNotes,
  onSaveStoryNote
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [currentNote, setCurrentNote] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const activeStory = stories[selectedStoryIndex] || stories[0];

  // Update current note when story changes
  React.useEffect(() => {
    setCurrentNote(storyNotes[activeStory.id] || '');
  }, [activeStory.id, storyNotes]);

  const handleSaveNote = () => {
    onSaveStoryNote(activeStory.id, currentNote);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const toggleQuestionAnswered = (qKey: string) => {
    setAnsweredQuestions((prev) => ({
      ...prev,
      [qKey]: !prev[qKey]
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-800 mb-1">
          <BookOpen className="w-4 h-4 text-purple-700" />
          <span>"Aile Dediğin" Sohbet Rehberi</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Hikâyelerle Kalpten Kalbe Muhabbet
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-3xl">
          Hikâyelerinizi basılı kitabınızdan hep birlikte sesli okuyun; ardından buradaki derinlemesine
          sorular ve sohbet gündemiyle aile bağlarınızı pekiştirin.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table of Contents Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden sticky top-24">
            <div className="bg-stone-50/80 px-5 py-4 border-b border-stone-200/80 flex items-center justify-between">
              <span className="font-serif text-base font-bold text-stone-900">
                İçindekiler
              </span>
              <span className="text-xs text-stone-500 tabular-nums">
                {stories.length} Bölüm
              </span>
            </div>

            <div className="p-2 space-y-1">
              {stories.map((story, idx) => {
                const isActive = idx === selectedStoryIndex;
                const hasNote = Boolean(storyNotes[story.id]);

                return (
                  <button
                    key={story.id}
                    onClick={() => setSelectedStoryIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-start justify-between gap-2 border ${
                      isActive
                        ? 'bg-purple-50/80 border-purple-200 text-purple-950 font-semibold shadow-2xs'
                        : 'border-transparent hover:bg-stone-50 text-stone-700 font-normal'
                    }`}
                  >
                    <div className="truncate">
                      <p className="text-xs font-medium uppercase tracking-wider text-purple-700/80 mb-0.5">
                        {idx === 0 ? 'Giriş' : `Öykü ${idx}`}
                      </p>
                      <p className="text-sm truncate">{story.title}</p>
                      <p className="text-xs text-stone-400 font-normal mt-0.5">
                        {story.author}
                      </p>
                    </div>

                    {hasNote && (
                      <span
                        title="Aile notu kaydedildi"
                        className="p-1 text-purple-600 bg-purple-100 rounded-full shrink-0 mt-1"
                      >
                        <PenLine className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Book Cover Micro Preview */}
            <div className="p-4 bg-stone-50/50 border-t border-stone-100 flex items-center gap-3">
              <div className="shrink-0 scale-75 -ml-2 -my-2">
                <BookCoverVisual size="sm" />
              </div>
              <div className="text-xs text-stone-600">
                <p className="font-serif font-bold text-stone-900">Aile Dediğin</p>
                <p className="text-stone-500 text-[11px]">Hümeyra Ekmen</p>
                <p className="text-stone-400 text-[10px] mt-0.5">Basılı Kitap Eşlikçisi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Reading & Discussion Area */}
        <div className="w-full lg:w-2/3 xl:w-3/4 space-y-6">
          <div className="bg-[#FFFEFB] rounded-3xl border border-stone-200/90 shadow-2xs p-6 sm:p-10 relative">
            {/* Story Header */}
            <div className="border-b border-stone-200/80 pb-6 mb-6">
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="font-medium text-purple-800">{activeStory.keyTheme}</span>
                <span aria-hidden="true">·</span>
                <span>Yazar: {activeStory.author}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {activeStory.title}
              </h2>
              <p className="text-sm text-stone-500 italic font-serif mt-1">
                {activeStory.intro}
              </p>
            </div>

            {/* Reading Guidance / Content */}
            {activeStory.fullText && (
              <div className="prose prose-stone max-w-none mb-8">
                {activeStory.id === 'story-0' ? (
                  <div className="text-stone-700 leading-relaxed font-serif text-base sm:text-lg whitespace-pre-line bg-purple-50/20 p-6 rounded-2xl border border-purple-100/60">
                    {activeStory.fullText}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-6 text-center space-y-2">
                    <Feather className="w-6 h-6 text-amber-800 mx-auto" />
                    <h3 className="font-serif text-lg font-bold text-amber-950">
                      Kitabınızdan Okuma Vakti
                    </h3>
                    <p className="text-sm text-amber-900/90 max-w-lg mx-auto leading-relaxed">
                      Lütfen <strong>"Aile Dediğin"</strong> kitabınızdan{' '}
                      <strong>"{activeStory.title}"</strong> öyküsünü aile fertlerinizle sırayla sesli
                      okuyunuz. Okuma tamamlandıktan sonra aşağıdaki sohbet sorularını cevaplayınız.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Chat Topic Callout */}
            {activeStory.chatTopic && (
              <div className="rounded-2xl bg-purple-50/70 border border-purple-200/80 p-5 sm:p-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-100 text-purple-800 shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-900">
                      Aile Sohbeti Gündemi
                    </h4>
                    <p className="text-sm sm:text-base font-medium text-stone-800 leading-relaxed">
                      "{activeStory.chatTopic}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reflection Questions Checklist */}
            {activeStory.questions.length > 0 && (
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
                  <HelpCircle className="w-4 h-4 text-purple-700" />
                  <span>Üzerine Birlikte Düşünelim (Soru Cevap)</span>
                </div>

                <div className="space-y-3">
                  {activeStory.questions.map((q, qIdx) => {
                    const qKey = `${activeStory.id}-q-${qIdx}`;
                    const isAnswered = Boolean(answeredQuestions[qKey]);

                    return (
                      <div
                        key={qIdx}
                        onClick={() => toggleQuestionAnswered(qKey)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isAnswered
                            ? 'bg-stone-50 border-stone-200/60 opacity-85'
                            : 'bg-white border-stone-200/90 hover:border-purple-300 shadow-2xs'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                            isAnswered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {isAnswered ? <Check className="w-3.5 h-3.5" /> : qIdx + 1}
                        </div>

                        <div className="flex-grow">
                          <p
                            className={`text-sm sm:text-base leading-relaxed ${
                              isAnswered ? 'line-through text-stone-400' : 'text-stone-800 font-medium'
                            }`}
                          >
                            {q}
                          </p>
                          <p className="text-[11px] text-stone-400 mt-1">
                            {isAnswered
                              ? 'Ailecek konuşuldu ve cevaplandı'
                              : 'Konuşulduğunda işaretlemek için tıklayın'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Family Reflection Notes Box */}
            <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                  <PenLine className="w-3.5 h-3.5 text-stone-600" />
                  <span>Ailemizin Bu Hikâyeden Çıkardığı Ortak Ders / Karar</span>
                </h4>
                {savedFeedback && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Kaydedildi!
                  </span>
                )}
              </div>

              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Örn: Bu hikâyeden sonra dedemizin eski eşyalarını sandıktan çıkarıp hatıralarını dinlemeye karar verdik..."
                rows={3}
                className="w-full p-3.5 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/15 focus:border-purple-600 text-stone-800 transition-all resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium transition-colors shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Notu Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
