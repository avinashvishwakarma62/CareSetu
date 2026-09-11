import React, { useState } from 'react';
import {
  Baby,
  Calendar,
  Heart,
  CheckCircle2,
  Syringe,
  Apple,
  Users,
  PhoneCall,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../../types';
import { VACCINATION_SCHEDULE } from '../../data/mockData';
import { translations } from '../../data/translations';

interface WomenChildHealthProps {
  language: Language;
}

export const WomenChildHealth: React.FC<WomenChildHealthProps> = ({ language }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'pregnancy' | 'vaccination' | 'nutrition' | 'asha'>('pregnancy');

  const isHindi = language === 'hi';

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-300 text-purple-950 font-extrabold text-xs uppercase tracking-wide">
            <Baby className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 6' : 'Module 6'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modWomenChildTitle}
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 font-medium">
            {t.modWomenChildDesc}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-xl font-extrabold text-[#02C39A]">JSY ₹1,400 Cash</div>
          <div className="text-[11px] font-bold text-purple-100">
            {isHindi ? 'सरकारी अस्पताल प्रसव प्रोत्साहन' : 'Govt Hospital Delivery Bonus'}
          </div>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold scrollbar-none">
        <button
          onClick={() => setActiveTab('pregnancy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'pregnancy'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
          }`}
        >
          <Heart className="h-4 w-4 text-rose-400" />
          <span>{isHindi ? 'गर्भावस्था एवं प्रसव देखभाल' : 'Pregnancy & Maternal Care'}</span>
        </button>

        <button
          onClick={() => setActiveTab('vaccination')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'vaccination'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
          }`}
        >
          <Syringe className="h-4 w-4 text-purple-300" />
          <span>{t.vaccinationChart}</span>
        </button>

        <button
          onClick={() => setActiveTab('nutrition')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'nutrition'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
          }`}
        >
          <Apple className="h-4 w-4 text-emerald-400" />
          <span>{isHindi ? 'शिशु व मां का पोषण (एनेमिया मुक्त)' : 'Infant & Mother Nutrition'}</span>
        </button>

        <button
          onClick={() => setActiveTab('asha')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'asha'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200'
          }`}
        >
          <Users className="h-4 w-4 text-amber-400" />
          <span>{isHindi ? 'ग्राम एएनएम / आशा बहू गाइड' : 'ANM / ASHA Worker Helper'}</span>
        </button>
      </div>

      {/* TAB 1: PREGNANCY CARE */}
      {activeTab === 'pregnancy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-purple-800 font-extrabold">
              <ShieldCheck className="h-5 w-5" />
              <h3>{isHindi ? 'गर्भावस्था के 4 आवश्यक एएनसी (ANC) चेकअप' : '4 Mandatory Antenatal Care (ANC) Visits'}</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-700">
              <li className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900 block">1st Visit (पहला चेकअप):</span>
                {isHindi ? 'गर्भावस्था के पहले 3 महीने के भीतर एएनसी पंजीकरण, हीमोग्लोबिन जांच और टिटनेस टीका।' : 'Within first 12 weeks: Registration, Hb blood test, Blood pressure & Tetanus dose 1.'}
              </li>
              <li className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900 block">2nd Visit (दूसरा चेकअप):</span>
                {isHindi ? '14 से 26वें सप्ताह के बीच - वजन, शिशु की धड़कन और आयरन-फॉलिक एसिड (IFA) गोलियां।' : '14th to 26th week: Abdominal examination, Fetal heart rate check & IFA iron tablets.'}
              </li>
              <li className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900 block">3rd Visit (तीसरा चेकअप):</span>
                {isHindi ? '28 से 34वें सप्ताह में - रक्तचाप, सूजन और अल्ट्रासाउंड।' : '28th to 34th week: Blood pressure, edema check & Albumin urine test.'}
              </li>
              <li className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900 block">4th Visit (चौथा चेकअप):</span>
                {isHindi ? '36वें सप्ताह में - संस्थागत सुरक्षित प्रसव योजना व 102/108 एम्बुलेंस नंबर दर्ज करना।' : '36th week: Delivery plan at PHC/CHC & arranging 102 Kilkari ambulance.'}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold">
              <Heart className="h-5 w-5" />
              <h3>{isHindi ? 'गर्भावस्था में खतरे के लक्षण (Warning Signs)' : 'Pregnancy Danger Signs'}</h3>
            </div>
            <p className="text-xs text-slate-600">
              {isHindi ? 'निम्न में से कोई भी लक्षण दिखने पर बिना देरी के तुरंत पीएचसी या 108 एम्बुलेंस से अस्पताल जाएं:' : 'Rush to hospital immediately if any of these signs appear:'}
            </p>
            <ul className="space-y-2 text-xs font-medium text-rose-950">
              <li className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                <span className="text-rose-600 font-bold">⚠️</span>
                <span>{isHindi ? 'योनि से खून या अत्यधिक पानी गिरना (Vaginal Bleeding/Fluid Leakage)' : 'Vaginal bleeding or sudden water leakage'}</span>
              </li>
              <li className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                <span className="text-rose-600 font-bold">⚠️</span>
                <span>{isHindi ? 'तेज सिरदर्द, धुंधला दिखाई देना व चेहरे-हाथों पर सूजन' : 'Severe headache, blurred vision & face swelling (Pre-eclampsia)'}</span>
              </li>
              <li className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                <span className="text-rose-600 font-bold">⚠️</span>
                <span>{isHindi ? 'पेट में असहनीय दर्द या तेज बुखार' : 'Severe abdominal pain or high fever'}</span>
              </li>
              <li className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                <span className="text-rose-600 font-bold">⚠️</span>
                <span>{isHindi ? 'गर्भ में शिशु की हलचल (मूवमेंट) बंद होना या कम होना' : 'Reduced or absent fetal movements'}</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: VACCINATION SCHEDULE */}
      {activeTab === 'vaccination' && (
        <div className="bg-white rounded-2xl border border-teal-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                {isHindi ? 'राष्ट्रीय सार्वभौमिक टीकाकरण सारणी (0 से 16 वर्ष)' : 'National Universal Immunization Schedule (0-16 Years)'}
              </h3>
              <p className="text-xs text-slate-600">
                {isHindi ? 'सरकारी स्वास्थ्य उपकेंद्र पर सभी टीके 100% मुफ्त उपलब्ध हैं।' : 'All vaccines are 100% free at Sub-Centres & VHSND sessions.'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-purple-50 text-purple-900 border-b border-purple-200 font-bold">
                  <th className="p-3">{isHindi ? 'शिशु की आयु' : 'Child Age'}</th>
                  <th className="p-3">{isHindi ? 'टीके का नाम (Vaccine)' : 'Vaccines Given'}</th>
                  <th className="p-3">{isHindi ? 'सुरक्षा (Prevented Disease)' : 'Protection Against'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {VACCINATION_SCHEDULE.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-purple-900 bg-purple-50/40 rounded-l-lg">
                      {isHindi ? v.ageGroupHi : v.ageGroupEn}
                    </td>
                    <td className="p-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <Syringe className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                        {v.vaccineName}
                      </div>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">
                      {isHindi ? v.diseasePreventedHi : v.diseasePreventedEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: NUTRITION */}
      {activeTab === 'nutrition' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#00A896]/30 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold">
              <Apple className="h-5 w-5" />
              <h3>{isHindi ? 'शिशु पोषण: पहले 6 महीने केवल स्तनपान' : 'Infant Feeding: Exclusive Breastfeeding (0-6 Months)'}</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block">पहला पीला गाढ़ा दूध (Colostrum):</span>
                {isHindi ? 'जन्म के 1 घंटे के भीतर पहला पीला दूध शिशु का पहला टीका है। इसे फेंके नहीं।' : 'First thick yellow milk (Colostrum) within 1 hour protects child from severe infections.'}
              </li>
              <li className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block">6 महीने केवल मां का दूध:</span>
                {isHindi ? '6 महीने तक पानी, घूंटी या शहद भी न दें। केवल मां का दूध पर्याप्त है।' : 'No water, honey, or top milk for 6 months. Breastmilk supplies 100% water & food.'}
              </li>
              <li className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block">6 महीने बाद उपरी आहार (Complementary Feeding):</span>
                {isHindi ? '6 महीने पूरे होने पर दाल का पानी, मसली खिचड़ी, केला और उबला अंडा शुरू करें।' : 'Start mashed dal, rice, banana, and soft cooked vegetables after 6 months.'}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-teal-100 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#028090] font-extrabold">
              <Sparkles className="h-5 w-5" />
              <h3>{isHindi ? 'एनीमिया मुक्त भारत (खून की कमी से बचाव)' : 'Anemia Mukt Bharat Guidelines'}</h3>
            </div>
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 space-y-2 text-xs text-teal-950 font-medium">
              <p>
                {isHindi
                  ? 'गर्भवती महिलाओं व किशोरियों में लाल IFA (आयरन-फॉलिक एसिड) की गोली हीमोग्लोबिन 12g/dL से ऊपर रखती है।'
                  : 'Red IFA iron tablets given free at Anganwadi keep hemoglobin levels safe during pregnancy.'}
              </p>
              <div className="font-bold text-[#0B3B3C]">
                {isHindi ? 'आयरन युक्त देशी भोजन:' : 'Iron-rich local foods:'}
              </div>
              <p className="text-slate-700">
                {isHindi ? 'पालक, मेथी, सरसों का साग, गुड़, भुना चना, अनार, चुकंदर और सहजन (Moringa) की पत्तियां।' : 'Spinach, Jaggery (Gur), Roasted Chana, Pomegranate, Beetroot & Moringa leaves.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ASHA WORKER HELPER */}
      {activeTab === 'asha' && (
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isHindi ? 'गांव की आशा बहू (ASHA) व एएनएम (ANM) से मदद लें' : 'Village ASHA Worker & ANM Directory'}
                </h3>
                <p className="text-xs text-slate-600">
                  {isHindi ? 'गर्भवती महिलाओं का पंजीकरण, ममता कार्ड और टेक होम राशन (THR) मुफ्त प्राप्त करें।' : 'Free pregnancy registration, Mamta MCP card, and supplementary nutrition (Take Home Ration).'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 space-y-2">
              <h4 className="font-extrabold text-amber-950">{isHindi ? 'आशा दीदी के मुख्य काम:' : 'Key Roles of ASHA Worker:'}</h4>
              <ul className="space-y-1 text-amber-900 font-medium">
                <li>✓ {isHindi ? 'गर्भावस्था का पहला जांच कार्ड बनाना' : 'Issue Pregnancy MCP Card'}</li>
                <li>✓ {isHindi ? 'अस्पताल में डिलीवरी कराने पर साथ जाना' : 'Accompany for free hospital delivery'}</li>
                <li>✓ {isHindi ? 'जननी सुरक्षा योजना प्रोत्साहन राशि दिलवाना' : 'Help claim JSY cash incentive'}</li>
              </ul>
            </div>

            <div className="bg-[#028090]/10 p-4 rounded-xl border border-[#028090]/30 space-y-2">
              <h4 className="font-extrabold text-[#0B3B3C]">{isHindi ? '102 किलकारी एम्बुलेंस हेल्पलाइन:' : '102 Mother & Child Free Ambulance:'}</h4>
              <p className="text-slate-700 font-medium">
                {isHindi ? 'प्रसव पीड़ा होने पर या नवजात शिशु की बीमारी में 102 पर निःशुल्क एम्बुलेंस बुलाएं।' : 'Call 102 for free pick-up and drop for pregnant women and sick infants.'}
              </p>
              <a
                href="tel:102"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg font-bold text-xs"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                {isHindi ? '102 कॉल करें' : 'Call 102 Free'}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
