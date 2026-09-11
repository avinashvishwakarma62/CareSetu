import React, { useState } from 'react';
import {
  HeartPulse,
  Eye,
  Activity,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Pill,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';

interface ElderlyCareProps {
  language: Language;
}

export const ElderlyCare: React.FC<ElderlyCareProps> = ({ language }) => {
  const t = translations[language];
  const isHindi = language === 'hi';

  // State for elderly user medication reminders
  const [reminders, setReminders] = useState<{ id: string; name: string; time: string; taken: boolean }[]>([
    { id: '1', name: isHindi ? 'बीपी की गोली (Amlodipine 5mg)' : 'BP Medicine (Amlodipine 5mg)', time: '08:00 AM', taken: true },
    { id: '2', name: isHindi ? 'शुगर की गोली (Metformin 500mg)' : 'Diabetes Medicine (Metformin 500mg)', time: '01:30 PM', taken: false },
    { id: '3', name: isHindi ? 'आंख का ड्रॉप (Eye Drop)' : 'Eye Drop', time: '08:00 PM', taken: false }
  ]);

  const [newMedName, setNewMedName] = useState('');
  const [newMedTime, setNewMedTime] = useState('08:00 AM');

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;
    setReminders([
      ...reminders,
      { id: Date.now().toString(), name: newMedName, time: newMedTime, taken: false }
    ]);
    setNewMedName('');
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, taken: !r.taken } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-300 text-indigo-950 font-extrabold text-xs uppercase tracking-wide">
            <HeartPulse className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 7' : 'Module 7'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modElderlyCareTitle}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 font-medium">
            {t.modElderlyCareDesc}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-xl font-extrabold text-[#02C39A]">
            {isHindi ? 'दवा रिमाइंडर' : 'Dawa Reminder'}
          </div>
          <div className="text-[11px] font-bold text-indigo-100">
            {isHindi ? 'समय पर दवा लें' : 'Track Daily Doses'}
          </div>
        </div>
      </div>

      {/* Interactive Daily Medication Reminder Tool */}
      <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-base sm:text-lg">
            <Clock className="h-5 w-5 text-indigo-600" />
            <h3>{isHindi ? 'बुजुर्गों का दैनिक दवा रिमाइंडर (Dawa Alert Tracker)' : 'Elderly Daily Medicine Reminder Tracker'}</h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-800 rounded-full border border-indigo-200">
            {reminders.filter(r => r.taken).length}/{reminders.length} {isHindi ? 'दवाएं ली गईं' : 'Taken'}
          </span>
        </div>

        {/* Add Reminder Form */}
        <form onSubmit={handleAddReminder} className="flex flex-col sm:flex-row gap-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
          <input
            type="text"
            value={newMedName}
            onChange={(e) => setNewMedName(e.target.value)}
            placeholder={isHindi ? 'दवा का नाम लिखें (उदा. बीपी की गोली)...' : 'Enter medicine name...'}
            className="flex-1 text-xs sm:text-sm font-medium bg-white p-2.5 rounded-xl border border-indigo-200 focus:outline-hidden"
          />
          <select
            value={newMedTime}
            onChange={(e) => setNewMedTime(e.target.value)}
            className="text-xs font-bold bg-white p-2.5 rounded-xl border border-indigo-200"
          >
            <option value="08:00 AM">08:00 AM (सुबह)</option>
            <option value="01:30 PM">01:30 PM (दोपहर)</option>
            <option value="08:00 PM">08:00 PM (रात)</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shrink-0"
          >
            <Plus className="h-4 w-4" />
            {isHindi ? 'जोड़ें' : 'Add'}
          </button>
        </form>

        {/* Reminders List */}
        <div className="space-y-2">
          {reminders.map(r => (
            <div
              key={r.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                r.taken
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950 opacity-80'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleReminder(r.id)}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold transition-all ${
                    r.taken ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 text-transparent hover:border-indigo-500'
                  }`}
                >
                  ✓
                </button>
                <div>
                  <div className={`font-bold text-sm ${r.taken ? 'line-through text-emerald-900' : 'text-slate-900'}`}>
                    {r.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3 text-indigo-500" /> {r.time}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteReminder(r.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Elderly Health Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Eye Care / Cataract */}
        <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold">
            <Eye className="h-5 w-5 text-indigo-600" />
            <h3>{isHindi ? 'मोतियाबिंद (Cataract) व मोतियाबिंद का मुफ्त ऑपरेशन' : 'Cataract Eye Care & Free Surgery'}</h3>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {isHindi
              ? 'उम्र बढ़ने पर आंखों से धुंधला दिखना या धूप में चकाचौंध होना मोतियाबिंद का लक्षण है। अंधत्व निवारण कार्यक्रम के तहत जिला अस्पताल में 100% मुफ्त लैंस प्रत्यारोपण होता है।'
              : 'Blurred vision in elderly is usually cataract. Free lens implant surgeries are performed at District Hospitals under National Blindness Control Program.'}
          </p>
        </div>

        {/* Arthritis / Joint Pain & Fall Prevention */}
        <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <h3>{isHindi ? 'जोड़ों का दर्द (गठिया) व फिसलकर गिरने से बचाव' : 'Joint Pain & Fall Prevention'}</h3>
          </div>
          <ul className="text-xs text-slate-700 font-medium space-y-1.5">
            <li className="flex items-start gap-1.5 bg-indigo-50/60 p-2 rounded-lg">
              <span className="text-indigo-600 font-bold">•</span>
              <span>{isHindi ? 'बाथरूम में फिसलन न होने दें और दीवार पर छड़ पकड़ने के लिए लगाएं।' : 'Keep bathroom floor dry and install support grab bars.'}</span>
            </li>
            <li className="flex items-start gap-1.5 bg-indigo-50/60 p-2 rounded-lg">
              <span className="text-indigo-600 font-bold">•</span>
              <span>{isHindi ? 'रात में उठने के लिए कमरे में धीमी रोशनी वाला जीरो-वाट बल्ब जलाकर रखें।' : 'Keep night bulb ON to prevent tripping in dark.'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
