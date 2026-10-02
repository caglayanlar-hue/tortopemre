import React from 'react';
import { BookMarked, Sparkles } from 'lucide-react';

interface BookCoverProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BookCoverVisual: React.FC<BookCoverProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-40 h-56 text-xs',
    md: 'w-56 h-80 text-sm',
    lg: 'w-64 h-92 text-base'
  }[size];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-[1.02] select-none ${sizeClasses} ${className}`}
      style={{
        background: 'linear-gradient(145deg, #2D2426 0%, #443236 40%, #1F191B 100%)',
        boxShadow: '0 20px 35px -10px rgba(45, 36, 38, 0.4), 0 8px 16px -6px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Book Spine Shadow Overlay */}
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/10 pointer-events-none z-20" />

      {/* Decorative Golden Embossed Border */}
      <div className="absolute inset-3 rounded-xl border border-amber-300/30 pointer-events-none z-10 flex flex-col justify-between p-4">
        {/* Top Header Badge */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-200/80 tracking-[0.2em] uppercase text-[10px] font-medium">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Aile Okuma Rehberi</span>
            <Sparkles className="w-3 h-3 text-amber-300" />
          </div>
          <div className="w-12 h-px bg-amber-300/30 mx-auto mt-2" />
        </div>

        {/* Center Title & Graphic */}
        <div className="text-center my-auto py-2">
          {/* Subtle Warm House & Heart Emblem */}
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-amber-200/20 to-rose-200/10 border border-amber-200/30 flex items-center justify-center mb-3 text-amber-200 shadow-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
              <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-9z" />
              <path d="M9 21v-6a3 3 0 016 0v6" />
              <path d="M12 9.5a1.5 1.5 0 011.5 1.5c0 1.2-1.5 2-1.5 2s-1.5-.8-1.5-2a1.5 1.5 0 011.5-1.5z" fill="currentColor" opacity="0.8" />
            </svg>
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-normal text-amber-100 drop-shadow-sm leading-tight">
            AİLE DEDİĞİN
          </h3>
          <p className="text-[11px] text-amber-200/70 italic mt-1 font-serif">
            "İnsanın ruhunu ısıtan en eski ocak"
          </p>
        </div>

        {/* Bottom Editorial Credits */}
        <div className="text-center pt-2 border-t border-amber-300/20">
          <p className="text-[9px] uppercase tracking-wider text-amber-200/60 font-medium">
            Derleyen & Editör
          </p>
          <p className="text-xs font-semibold text-amber-100 font-serif tracking-wide mt-0.5">
            Hümeyra EKMEN
          </p>
          <div className="flex items-center justify-center gap-1 text-[9px] text-amber-300/60 mt-1">
            <BookMarked className="w-2.5 h-2.5" />
            <span>Öğrenci Kaleminden Öyküler</span>
          </div>
        </div>
      </div>

      {/* Textured Lighting Flare */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-rose-400/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};
