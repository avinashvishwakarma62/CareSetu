import React, { useState } from 'react';
import {
  Sparkles,
  XCircle,
  CheckCircle2,
  HelpCircle,
  Stethoscope,
  Search
} from 'lucide-react';
import { Language, MythFact } from '../../types';
import { MYTH_FACTS } from '../../data/mockData';
import { translations } from '../../data/translations';

interface MythBusterProps {
  language: Language;
}

export const MythBuster: React.FC<MythBusterProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');

  const isHindi = language === 'hi';

  const filteredMyths = MYTH_FACTS.filter(m => {
    const text = (isHindi ? m.mythHi + ' ' + m.factHi : m.mythEn + ' ' + m.factEn).toLowerCase();
    return !searchTerm.trim() || text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-300 text-amber-950 font-extrabold text-xs uppercase tracking-wide">
            <Sparkles className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 8' : 'Module 8'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modMythBusterTitle}
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium">
            {t.modMythBusterDesc}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-xl font-extrabold text-[#02C39A]">Doctor Verified</div>
          <div className="text-[11px] font-bold text-amber-100">
            {isHindi ? 'वैज्ञानिक डॉक्टरी तथ्य' : '100% Medical Science Facts'}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-xl border border-amber-200 p-2 shadow-2xs">
        <Search className="h-5 w-5 text-amber-600 ml-2 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isHindi ? 'अंधविश्वास या अंधश्रद्धा खोजें (उदा. सांप, कुत्ता, दूध, एंटीबायोटिक)...' : 'Search health myth or belief (e.g., Snake, Rabies, Antibiotic)...'}
          className="w-full text-xs sm:text-sm font-medium focus:outline-hidden px-2 text-slate-800"
        />
      </div>

      {/* Myth vs Fact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMyths.map(item => {
          const myth = isHindi ? item.mythHi : item.mythEn;
          const fact = isHindi ? item.factHi : item.factEn;
          const explanation = isHindi ? item.explanationHi : item.explanationEn;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* MYTH BOX (Red) */}
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
                    <XCircle className="h-4 w-4 text-rose-600" />
                    <span>{t.myth}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-rose-950 leading-snug">
                    "{myth}"
                  </p>
                </div>

                {/* FACT BOX (Green) */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{t.fact}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-emerald-950 leading-snug">
                    {fact}
                  </p>
                </div>

                {/* Doctor Explanation */}
                <div className="bg-teal-50/60 border border-teal-200/80 rounded-xl p-3 flex items-start gap-2 text-xs font-medium text-slate-700">
                  <Stethoscope className="h-4 w-4 text-[#028090] shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-[#0B3B3C]">{isHindi ? 'डॉक्टरी व्याख्या: ' : 'Doctor Explanation: '}</span>
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
