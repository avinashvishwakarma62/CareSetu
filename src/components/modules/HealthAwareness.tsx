import React, { useState } from 'react';
import {
  Heart,
  Thermometer,
  Activity,
  Droplets,
  HeartPulse,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Stethoscope
} from 'lucide-react';
import { Language, Illness } from '../../types';
import { ILLNESSES } from '../../data/mockData';
import { translations } from '../../data/translations';
import { AudioPlayerButton } from '../AudioPlayerButton';

interface HealthAwarenessProps {
  language: Language;
}

export const HealthAwareness: React.FC<HealthAwarenessProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIllness, setSelectedIllness] = useState<Illness | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Thermometer': return Thermometer;
      case 'Activity': return Activity;
      case 'Droplets': return Droplets;
      case 'HeartPulse': return HeartPulse;
      case 'Lungs': return HeartPulse;
      default: return Heart;
    }
  };

  const filtered = ILLNESSES.filter(item => {
    const isHindi = language === 'hi';
    const name = isHindi ? item.nameHi : item.nameEn;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchTerm.trim() || name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B3B3C] to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02C39A] text-[#0B3B3C] font-extrabold text-xs uppercase tracking-wide">
            <Heart className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 1' : 'Module 1'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modHealthAwarenessTitle}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 font-medium">
            {t.modHealthAwarenessDesc}
          </p>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20 text-xs font-semibold overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === 'all' ? 'bg-[#02C39A] text-[#0B3B3C] font-bold shadow-2xs' : 'text-white hover:bg-white/10'
            }`}
          >
            {t.allCategories}
          </button>
          <button
            onClick={() => setSelectedCategory('infectious')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === 'infectious' ? 'bg-[#02C39A] text-[#0B3B3C] font-bold shadow-2xs' : 'text-white hover:bg-white/10'
            }`}
          >
            {language === 'hi' ? 'संक्रामक रोग' : 'Infectious'}
          </button>
          <button
            onClick={() => setSelectedCategory('chronic')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === 'chronic' ? 'bg-[#02C39A] text-[#0B3B3C] font-bold shadow-2xs' : 'text-white hover:bg-white/10'
            }`}
          >
            {language === 'hi' ? 'क्रॉनिक (शुगर/बीपी)' : 'Chronic'}
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center bg-white rounded-xl border border-teal-200 p-2 shadow-2xs">
        <Search className="h-5 w-5 text-teal-600 ml-2 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={language === 'hi' ? 'बीमारी खोजें (उदा. बुखार, टीबी, शुगर, डेंगू)...' : 'Search illness (e.g. Fever, Dengue, TB, Diabetes)...'}
          className="w-full text-xs sm:text-sm font-medium focus:outline-hidden px-2 text-slate-800"
        />
      </div>

      {/* Illness Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(illness => {
          const IconComponent = getIcon(illness.iconName);
          const isHindi = language === 'hi';
          const name = isHindi ? illness.nameHi : illness.nameEn;
          const symptoms = isHindi ? illness.symptomsHi : illness.symptomsEn;
          const warningSigns = isHindi ? illness.warningSignsHi : illness.warningSignsEn;
          const whenDoctor = isHindi ? illness.whenToSeekDoctorHi : illness.whenToSeekDoctorEn;
          const dos = isHindi ? illness.dosHi : illness.dosEn;
          const donts = isHindi ? illness.dontsHi : illness.dontsEn;

          return (
            <div
              key={illness.id}
              className="bg-white rounded-2xl border border-teal-100 p-5 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              {/* Card Title Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-teal-50 text-[#028090] flex items-center justify-center border border-teal-200 shrink-0">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                      {isHindi ? illness.categoryLabelHi : illness.categoryLabelEn}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {name}
                      </h3>
                      <AudioPlayerButton
                        text={`${name}. ${isHindi ? 'लक्षण:' : 'Symptoms:'} ${symptoms.join(', ')}.`}
                        language={language}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-teal-600" />
                  {language === 'hi' ? 'मुख्य लक्षण (Symptoms)' : 'Key Symptoms'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-medium text-slate-700">
                  {symptoms.map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warning Signs (Red Highlight) */}
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-1.5">
                <h4 className="text-xs font-extrabold text-rose-800 flex items-center gap-1.5">
                  <AlertOctagon className="h-4 w-4 text-rose-600" />
                  {t.warningSigns}
                </h4>
                <ul className="text-xs text-rose-950 space-y-1 font-medium">
                  {warningSigns.map((ws, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{ws}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seek Doctor Note */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-start gap-2 text-xs font-semibold text-teal-900">
                <Stethoscope className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
                <p>
                  <span className="font-bold text-[#0B3B3C]">{t.seekHelpWhen}: </span>
                  {whenDoctor}
                </p>
              </div>

              {/* DOs and DON'Ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* DOs */}
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 space-y-1.5">
                  <h5 className="text-xs font-extrabold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {t.dos}
                  </h5>
                  <ul className="text-[11px] text-emerald-950 space-y-1 font-medium">
                    {dos.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DON'Ts */}
                <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3 space-y-1.5">
                  <h5 className="text-xs font-extrabold text-rose-800 flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-rose-600" />
                    {t.donts}
                  </h5>
                  <ul className="text-[11px] text-rose-950 space-y-1 font-medium">
                    {donts.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
