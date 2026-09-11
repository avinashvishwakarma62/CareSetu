import React, { useState } from 'react';
import {
  Pill,
  Search,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Clock,
  Sparkles,
  TrendingDown,
  Building
} from 'lucide-react';
import { Language, Medicine, Pharmacy } from '../../types';
import { MEDICINES, PHARMACIES } from '../../data/mockData';
import { translations } from '../../data/translations';

interface AffordableMedicineProps {
  language: Language;
}

export const AffordableMedicine: React.FC<AffordableMedicineProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isHindi = language === 'hi';

  const filteredMedicines = MEDICINES.filter(m => {
    const name = (m.brandName + ' ' + m.genericName + ' ' + (isHindi ? m.purposeHi : m.purposeEn)).toLowerCase();
    const matchesSearch = !searchTerm.trim() || name.includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#00A896] to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02C39A] text-[#0B3B3C] font-extrabold text-xs uppercase tracking-wide">
            <Pill className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 3' : 'Module 3'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modMedicineTitle}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 font-medium">
            {t.modMedicineDesc}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-2xl font-extrabold text-[#02C39A]">80% - 90%</div>
          <div className="text-[11px] font-bold text-teal-100">
            {isHindi ? 'जेनेरिक दवाइयों पर नकद बचत' : 'Savings on Generic Medicines'}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center bg-white rounded-xl border border-teal-200 p-2 shadow-2xs">
        <Search className="h-5 w-5 text-teal-600 ml-2 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isHindi ? 'दवा का नाम या बीमारी लिखें (उदा. Paracetamol, Sugar, Acidity)...' : 'Search medicine name or usage (e.g., Paracetamol, Diabetes, Acidity)...'}
          className="w-full text-xs sm:text-sm font-medium focus:outline-hidden px-2 text-slate-800"
        />
      </div>

      {/* Price Comparison Table Section */}
      <div className="bg-white rounded-2xl border border-teal-100 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-[#028090]" />
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {isHindi ? 'महंगी ब्रांडेड बनाम जन औषधि (जेनेरिक) दवा मूल्य तुलना' : 'Branded vs Generic (Jan Aushadhi) Price Comparison'}
            </h3>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
            {isHindi ? 'पीएम जन औषधि केंद्र' : 'PM Jan Aushadhi Approved'}
          </span>
        </div>

        {/* Comparison Cards / Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-teal-50/80 text-[#0B3B3C] border-b border-teal-200/80 font-bold">
                <th className="p-3">{isHindi ? 'बीमारी / उपयोग' : 'Usage / Purpose'}</th>
                <th className="p-3">{isHindi ? 'महंगी ब्रांडेड दवा' : 'Branded Market Medicine'}</th>
                <th className="p-3 text-rose-700">{t.brandedPrice}</th>
                <th className="p-3 text-[#028090]">{isHindi ? 'जन औषधि जेनेरिक विकल्प' : 'Jan Aushadhi Generic Alternative'}</th>
                <th className="p-3 text-emerald-700">{t.genericPrice}</th>
                <th className="p-3 text-right text-emerald-700">{t.savings}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredMedicines.map(med => (
                <tr key={med.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">
                    <span className="text-teal-700 font-bold block text-[11px] uppercase">
                      {isHindi ? med.categoryHi : med.categoryEn}
                    </span>
                    {isHindi ? med.purposeHi : med.purposeEn}
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{med.brandName}</td>
                  <td className="p-3 font-bold text-rose-600 line-through">₹{med.brandPriceInr.toFixed(2)}</td>
                  <td className="p-3 font-extrabold text-[#028090]">
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-[#02C39A]" />
                      {med.genericName}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-emerald-700 bg-emerald-50/60 rounded-lg">₹{med.genericPriceInr.toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <span className="inline-block px-2 py-1 rounded-md bg-emerald-600 text-white font-extrabold text-xs shadow-2xs">
                      {med.savingsPercentage}% {isHindi ? 'बचत' : 'OFF'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jan Aushadhi Pharmacies List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <Building className="h-5 w-5 text-[#028090]" />
          {isHindi ? 'निकटतम जन औषधि केंद्र व सरकारी दवाखाने' : 'Nearby PM Jan Aushadhi Pharmacies'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PHARMACIES.map(pharmacy => (
            <div
              key={pharmacy.id}
              className="bg-white rounded-2xl border border-teal-100 p-5 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {pharmacy.type === 'janAushadhi' ? (isHindi ? 'जन औषधि केंद्र' : 'Jan Aushadhi Store') : (isHindi ? 'सरकारी अस्पताल दवाखाना' : 'Govt Hospital Pharmacy')}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-teal-600" />
                    {pharmacy.distanceKm} km
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-base leading-snug">
                  {isHindi ? pharmacy.nameHi : pharmacy.nameEn}
                </h4>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {isHindi ? pharmacy.addressHi : pharmacy.addressEn}
                </p>

                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                  <Clock className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                  <span>{isHindi ? pharmacy.timingsHi : pharmacy.timingsEn}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${pharmacy.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#028090] font-bold text-xs border border-teal-200 transition-all"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  {t.callNow}
                </a>
                <a
                  href={`https://maps.google.com/?q=${pharmacy.lat},${pharmacy.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-bold text-xs transition-all shadow-xs"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#02C39A]" />
                  {t.getDirections}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
