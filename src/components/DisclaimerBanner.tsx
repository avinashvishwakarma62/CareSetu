import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface DisclaimerBannerProps {
  language: Language;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="bg-amber-500/10 border-y border-amber-500/30 text-amber-950 px-4 py-2.5 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xs">
      <div className="flex items-start gap-2.5 max-w-5xl">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-snug font-medium text-amber-900">
          {t.disclaimerText}
        </p>
      </div>

      <a
        href="tel:108"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all shrink-0 shadow-xs animate-pulse"
      >
        <PhoneCall className="h-3.5 w-3.5" />
        {t.call108}
      </a>
    </div>
  );
};
