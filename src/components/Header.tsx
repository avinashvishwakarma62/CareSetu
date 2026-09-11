import React from 'react';
import { HeartHandshake, Languages, PhoneCall, Home } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onGoHome: () => void;
  activeModule: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onGoHome,
  activeModule
}) => {
  const t = translations[language];

  return (
    <header className="bg-[#0B3B3C] text-white sticky top-0 z-30 shadow-md border-b border-[#00A896]/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden"
        >
          <div className="h-10 w-10 rounded-2xl bg-[#02C39A] text-[#0B3B3C] flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
            <HeartHandshake className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                {t.appTitle}
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#028090] text-emerald-100 border border-[#00A896]">
                {language === 'hi' ? 'ग्रामीण भारत' : 'Rural India'}
              </span>
            </div>
            <p className="text-xs text-teal-200 hidden sm:block font-medium">
              {t.appSubTitle}
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activeModule !== 'home' && (
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all"
              title={t.home}
            >
              <Home className="h-4 w-4 text-[#02C39A]" />
              <span className="hidden sm:inline">{t.home}</span>
            </button>
          )}

          {/* Language Switcher Button */}
          <button
            onClick={onToggleLanguage}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-bold text-xs sm:text-sm shadow-xs border border-teal-400/30 transition-all hover:scale-105"
            title="Toggle Language / भाषा बदलें"
          >
            <Languages className="h-4 w-4 text-[#02C39A]" />
            <span>{t.languageToggle}</span>
          </button>

          {/* Emergency SOS Call 108 Button */}
          <a
            href="tel:108"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-105"
          >
            <PhoneCall className="h-4 w-4" />
            <span className="hidden xs:inline">{t.call108}</span>
            <span className="xs:hidden">108</span>
          </a>
        </div>
      </div>
    </header>
  );
};
