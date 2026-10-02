import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../types';
import { BookCoverVisual } from './BookCoverVisual';
import { Plus, X, ArrowRight, Clock, Heart, Sparkles } from 'lucide-react';

interface FamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  onAddMember: (name: string, role?: string) => void;
  onRemoveMember: (id: string) => void;
  isFirstTime?: boolean;
}

const COLOR_PALETTE = [
  'bg-amber-100 text-amber-800 border-amber-200',
  'bg-rose-100 text-rose-800 border-rose-200',
  'bg-emerald-100 text-emerald-800 border-emerald-200',
  'bg-sky-100 text-sky-800 border-sky-200',
  'bg-purple-100 text-purple-800 border-purple-200',
  'bg-indigo-100 text-indigo-800 border-indigo-200'
];

export const FamilyModal: React.FC<FamilyModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  onAddMember,
  onRemoveMember,
  isFirstTime = false
}) => {
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('tr-TR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) +
          ' · ' +
          now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    onAddMember(trimmed, roleInput.trim() || undefined);
    setNameInput('');
    setRoleInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row my-auto">
        {/* Left Side: Literary Atmosphere & Book Cover */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-[#FDF6F0] via-[#FAF0E6] to-[#F5E6D8] p-6 sm:p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-stone-200/80 relative">
          <div className="flex items-center gap-1.5 text-xs text-amber-800/80 font-medium mb-4">
            <Heart className="w-3.5 h-3.5 fill-amber-700/20 text-amber-700" />
            <span>Aile Bağları Platformu</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 leading-snug mb-5 px-2">
            "Aile, insanın ruhunu ısıtan en eski ocaktır."
          </h2>

          <div className="my-2 drop-shadow-xl">
            <BookCoverVisual size="md" />
          </div>

          <p className="text-xs text-stone-500 mt-4 max-w-xs font-serif italic">
            "Aile Dediğin" rehberi eşliğinde ekranlardan sıyrılıp muhabbetle buluşuyoruz.
          </p>
        </div>

        {/* Right Side: Family Roster Management */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Header and Close (if not strictly required first time) */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-amber-800 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentTime}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {isFirstTime ? 'Hoş Geldiniz' : 'Aile Üyelerimiz'}
                </h1>
              </div>

              {!isFirstTime && (
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              {isFirstTime
                ? 'Portala giriş yapmak, görevleri paylaştırmak ve haftalık toplantıları başlatmak için lütfen aile üyelerinizi ekleyin.'
                : 'Görev atamalarında ve toplantı tutanaklarında yer alacak aile üyelerini buradan yönetebilirsiniz.'}
            </p>

            {/* Member Input Form */}
            <div className="space-y-3 mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="İsim (Örn: Anne, Baba, Kerem...)"
                  className="flex-grow px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/15 transition-all text-stone-900"
                />
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Rol/Unvan (İsteğe bağlı)"
                  className="w-full sm:w-36 px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/15 transition-all text-stone-900"
                />
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!nameInput.trim()}
                  className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ekle</span>
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-stone-500 pt-1">
                <span className="text-stone-400">Hızlı ekle:</span>
                {['Anne', 'Baba', 'Kız Çocuk', 'Erkek Çocuk', 'Büyükanne', 'Dede'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => onAddMember(role)}
                    className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-amber-50 hover:text-amber-800 text-stone-600 transition-colors"
                  >
                    + {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Members List */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                <span>Kayıtlı Aile Üyeleri ({familyMembers.length})</span>
                {familyMembers.length === 0 && (
                  <span className="text-amber-700">En az 1 kişi ekleyin</span>
                )}
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {familyMembers.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-stone-200 rounded-xl bg-stone-50/50 text-stone-400 text-xs italic">
                    Henüz üye eklenmedi. Yukarıdaki alandan ekleyebilirsiniz.
                  </div>
                ) : (
                  familyMembers.map((member, idx) => {
                    const colorClass = COLOR_PALETTE[idx % COLOR_PALETTE.length];
                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200/80 text-sm hover:bg-white transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${colorClass}`}
                          >
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                          <span className="font-medium text-stone-800">{member.name}</span>
                          {member.role && (
                            <span className="text-xs text-stone-400 font-normal">
                              ({member.role})
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onRemoveMember(member.id)}
                          className="text-stone-300 hover:text-rose-600 p-1 rounded transition-colors"
                          title="Üyeyi Kaldır"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Veriler tarayıcınızda güvende kalır.</span>
            </div>

            <button
              onClick={onClose}
              disabled={familyMembers.length === 0}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <span>{isFirstTime ? 'Portala Giriş Yap' : 'Kaydet ve Kapat'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
