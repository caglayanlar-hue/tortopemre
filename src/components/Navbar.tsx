import React, { useState } from 'react';
import { TabType, FamilyMember } from '../types';
import { Users, Menu, X, Coffee } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  familyMembers: FamilyMember[];
  onOpenFamilyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  familyMembers,
  onOpenFamilyModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'daily', label: 'Oyun & Etkinlik' },
    { id: 'book', label: 'Sohbet Rehberi' },
    { id: 'chat', label: 'İletişim Köşesi' },
    { id: 'tasks', label: 'Görevler' },
    { id: 'meeting', label: 'Aile Toplantısı' }
  ];

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark in display font */}
          <button
            onClick={() => handleNavClick('home')}
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-amber-800 transition-colors whitespace-nowrap text-left"
          >
            Aile Bağları
          </button>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isMeeting = item.id === 'meeting';

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap text-xs lg:text-sm ${
                    isActive
                      ? isMeeting
                        ? 'text-amber-800 font-semibold'
                        : 'text-stone-900 font-semibold'
                      : 'hover:text-stone-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isMeeting && <Coffee className="w-3.5 h-3.5 text-amber-600" />}
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenFamilyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg shadow-2xs transition-colors whitespace-nowrap"
              title="Aile Üyelerini Görüntüle ve Düzenle"
            >
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Aile:</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {familyMembers.length}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (governed by 15% sticky cap discipline) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'meeting' && (
                  <Coffee className="w-4 h-4 text-amber-600" />
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
