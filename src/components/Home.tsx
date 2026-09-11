import React, { useState } from 'react';
import {
  Heart,
  ShieldAlert,
  Pill,
  Building2,
  FileText,
  Baby,
  HeartPulse,
  Sparkles,
  FileSearch,
  HelpCircle,
  BarChart3,
  MapPin,
  Bot,
  Search,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HomeProps {
  language: Language;
  onSelectModule: (moduleId: string) => void;
  onSearchQuery?: (query: string) => void;
}

export const Home: React.FC<HomeProps> = ({ language, onSelectModule }) => {
  const t = translations[language];
  const isHindi = language === 'hi';
  const [searchTerm, setSearchTerm] = useState('');

  const modules = [
    {
      id: 'health_awareness',
      title: t.modHealthAwarenessTitle,
      description: t.modHealthAwarenessDesc,
      icon: Heart,
      badgeEn: 'Common Illnesses',
      badgeHi: 'आम बीमारियां',
      color: 'bg-[#028090]',
      keywords: ['fever', 'bukhar', 'बुखार', 'dengue', 'malaria', 'diarrhea', 'dast', 'cough', 'cold', 'khansi', 'jukaam', 'chest pain', 'tb', 'tuberculosis', 'diabetes', 'sugar', 'blood pressure', 'bp', 'headache', 'sirdard', 'illness', 'disease', 'symptoms', 'बीमारी', 'लक्षण', 'डेंगू', 'मलेरिया', 'दस्त', 'खांसी']
    },
    {
      id: 'first_aid',
      title: t.modEmergencyTitle,
      description: t.modEmergencyDesc,
      icon: ShieldAlert,
      badgeEn: 'Life Saving',
      badgeHi: 'जीवन रक्षा',
      color: 'bg-rose-600',
      featured: true,
      keywords: ['snake', 'snake bite', 'samp', 'saap', 'सांप', 'सांप काटना', 'burn', 'jalna', 'जलना', 'bleeding', 'khun', 'खून', 'blood', 'electric shock', 'shock', 'current', 'fracture', 'haddi', 'हड्डी', 'heart attack', 'dil ka daura', 'dog bite', 'kutte ka katna', 'poisoning', 'zahar', 'emergency', 'prathmik upchar', 'प्राथमिक उपचार', 'cpr', '108', 'एम्बुलेंस']
    },
    {
      id: 'medicine',
      title: t.modMedicineTitle,
      description: t.modMedicineDesc,
      icon: Pill,
      badgeEn: 'Save Up to 80%',
      badgeHi: '80% तक बचत',
      color: 'bg-[#00A896]',
      keywords: ['paracetamol', 'crocin', 'azithromycin', 'pantoprazole', 'panto', 'cetirizine', 'generic', 'jan aushadhi', 'medicine', 'dawa', 'davai', 'दवा', 'दवाएं', 'जन औषधि', 'पैरासिटामोल', 'क्रोसिन', 'सिरप', 'गोली', 'price', 'bachat', 'discount', 'खरीद']
    },
    {
      id: 'healthcare',
      title: t.modHealthcareTitle,
      description: t.modHealthcareDesc,
      icon: Building2,
      badgeEn: 'Nearby PHC / CHC',
      badgeHi: 'निकटतम स्वास्थ्य केंद्र',
      color: 'bg-teal-700',
      keywords: ['phc', 'chc', 'sub center', 'district hospital', 'civil hospital', 'doctor', 'hospital', 'aspatal', 'अस्पताल', 'प्राथमिक स्वास्थ्य केंद्र', 'सामुदायिक स्वास्थ्य केंद्र', 'bed', 'icu', 'opd', 'kendra', 'डॉक्टर']
    },
    {
      id: 'schemes',
      title: t.modSchemesTitle,
      description: t.modSchemesDesc,
      icon: FileText,
      badgeEn: 'Free ₹5 Lakh Care',
      badgeHi: '₹5 लाख तक मुफ्त इलाज',
      color: 'bg-emerald-600',
      keywords: ['ayushman', 'pmjay', 'jsy', 'golden card', '5 lakh', '500000', 'free treatment', 'yojana', 'yojna', 'योजना', 'आयुष्मान', 'गोल्डन कार्ड', 'मुफ्त इलाज', 'जननी सुरक्षा', 'सरकारी योजना', 'कार्ड']
    },
    {
      id: 'women_child',
      title: t.modWomenChildTitle,
      description: t.modWomenChildDesc,
      icon: Baby,
      badgeEn: 'Mother & Infant',
      badgeHi: 'मां व शिशु सुरक्षा',
      color: 'bg-purple-600',
      keywords: ['pregnancy', 'pregnant', 'garbh', 'गर्भावस्था', 'maternity', 'anc', 'child', 'baby', 'baccha', 'बच्चा', 'vaccine', 'vaccination', 'tika', 'tikakaran', 'टीकाकरण', 'iron', 'poshan', 'पोषण', 'mother', 'maa', 'मां', 'shishu', 'गर्भवती']
    },
    {
      id: 'elderly_care',
      title: t.modElderlyCareTitle,
      description: t.modElderlyCareDesc,
      icon: HeartPulse,
      badgeEn: 'Daily Reminders',
      badgeHi: 'दैनिक रिमाइंडर',
      color: 'bg-indigo-600',
      keywords: ['elderly', 'elder', 'bujurg', 'बुजुर्ग', 'dada', 'dadi', 'dawa reminder', 'medicine alarm', 'cataract', 'motiyabind', 'मोतियाबिंद', 'fall prevention', 'gimna', 'joint pain', 'jodo ka dard', 'रिमाइंडर', 'दादा']
    },
    {
      id: 'myth_buster',
      title: t.modMythBusterTitle,
      description: t.modMythBusterDesc,
      icon: Sparkles,
      badgeEn: 'Doctor Verified',
      badgeHi: 'डॉक्टर द्वारा सत्यापित',
      color: 'bg-amber-600',
      keywords: ['myth', 'fact', 'superstition', 'jhad phook', 'doctor', 'bharam', 'अंधविश्वास', 'भ्रम', 'तथ्य', 'सच्चाई', 'झाड़-फूंक', 'totka', 'सत्यापित']
    },
    {
      id: 'report_simplifier',
      title: t.modReportSimplifierTitle,
      description: t.modReportSimplifierDesc,
      icon: FileSearch,
      badgeEn: 'Easy Language',
      badgeHi: 'आसान भाषा',
      color: 'bg-blue-600',
      keywords: ['report', 'lab test', 'blood test', 'hemoglobin', 'hb', 'blood sugar', 'glucose', 'platelet', 'sputum', 'khangar', 'urinal', 'रिपोर्ट', 'ब्लड टेस्ट', 'हीमोग्लोबिन', 'प्लेटलेट', 'शुगर', 'खून जांच']
    },
    {
      id: 'health_quiz',
      title: t.modQuizTitle,
      description: t.modQuizDesc,
      icon: HelpCircle,
      badgeEn: 'Earn Badges',
      badgeHi: 'बैज जीतें',
      color: 'bg-sky-600',
      keywords: ['quiz', 'test', 'question', 'game', 'badge', 'score', 'ज्ञान', 'प्रश्नोत्तरी', 'क्विज', 'सवाल', 'परीक्षा', 'बैज']
    },
    {
      id: 'village_dashboard',
      title: t.modVillageDashboardTitle,
      description: t.modVillageDashboardDesc,
      icon: BarChart3,
      badgeEn: 'Village Stats',
      badgeHi: 'ग्राम डेटा',
      color: 'bg-cyan-700',
      keywords: ['village', 'gram panchayat', 'population', 'opd stats', 'water', 'clean water', 'ayushman cards', 'गांव', 'ग्राम पंचायत', 'जनसंख्या', 'आंकड़े', 'डैशबोर्ड']
    },
    {
      id: 'map',
      title: t.modMapTitle,
      description: t.modMapDesc,
      icon: MapPin,
      badgeEn: 'GPS Locations',
      badgeHi: 'नक्शा एवं रास्ता',
      color: 'bg-teal-800',
      keywords: ['map', 'location', 'gps', 'route', 'rasta', 'distance', 'jan aushadhi map', 'phc map', 'नक्शा', 'रास्ता', 'दूरी', 'लोकेशन', 'दिशा']
    },
    {
      id: 'blood_donors',
      title: isHindi ? 'ग्राम रक्तदाता नेटवर्क' : 'Gram Blood Donor Network',
      description: isHindi ? 'स्वैच्छिक रक्तदाताओं से सीधे संपर्क करें या आपातकालीन व्हाट्सएप संदेश भेजें।' : 'Find voluntary local blood donors or send emergency alerts.',
      icon: HeartHandshake,
      badgeEn: 'Lifesaving Network',
      badgeHi: 'जीवन रक्षक नेटवर्क',
      color: 'bg-rose-700',
      featured: true,
      keywords: ['blood', 'blood donor', 'rakt', 'raktdata', 'खून', 'रक्त', 'रक्तदाता', 'रक्तदान', 'blood bank', 'o+', 'a+', 'b+', 'ab+', 'o-', 'emergency blood', 'डोनेशन', 'डोनर']
    },
    {
      id: 'chatbot',
      title: t.modChatbotTitle,
      description: t.modChatbotDesc,
      icon: Bot,
      badgeEn: '24x7 AI Help',
      badgeHi: '24x7 एआई मदद',
      color: 'bg-indigo-700',
      featured: true,
      keywords: ['ai', 'chatbot', 'ask', 'symptom checker', 'assistant', 'doctor ai', 'question', '24x7', 'एआई', 'चैटबॉट', 'सहायक', 'सवाल पूछें', 'मदद']
    }
  ];

  const popularSearches = [
    { en: 'Fever / Bukhar', hi: 'बुखार', query: 'fever' },
    { en: 'Blood Donors', hi: 'रक्तदाता नेटवर्क', query: 'blood' },
    { en: 'Snake Bite', hi: 'सांप काटना', query: 'snake' },
    { en: 'Jan Aushadhi Dawa', hi: 'जन औषधि दवा', query: 'medicine' },
    { en: 'Ayushman Card', hi: 'आयुष्मान कार्ड', query: 'ayushman' },
    { en: 'Pregnancy Care', hi: 'गर्भावस्था', query: 'pregnancy' },
    { en: '108 Ambulance', hi: '108 एम्बुलेंस', query: '108' },
  ];

  const filteredModules = modules.filter(m => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.badgeEn.toLowerCase().includes(q) ||
      m.badgeHi.toLowerCase().includes(q) ||
      m.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner Section */}
      <section className="bg-gradient-to-br from-[#0B3B3C] via-[#028090] to-[#00A896] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-teal-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Heart className="w-80 h-80 text-white" />
        </div>

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02C39A] text-[#0B3B3C] font-extrabold text-xs uppercase tracking-wider shadow-xs">
              <CheckCircle2 className="h-4 w-4" />
              {language === 'hi' ? 'ग्रामीण स्वास्थ्य जागरूकता पहल' : 'Rural Health Awareness Initiative'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white">
            {language === 'hi'
              ? 'आपकी और आपके परिवार की उत्तम स्वास्थ्य सुरक्षा - केयरसेतु'
              : 'Empowering Rural Communities with Accessible Healthcare & First-Aid'}
          </h1>

          <p className="text-sm sm:text-base text-teal-100 font-medium leading-relaxed">
            {language === 'hi'
              ? 'प्राथमिक उपचार, सरकारी स्वास्थ्य योजनाएं, किफायती जन औषधि दवाएं और तुरंत एआई सहायता - सब कुछ आसान भाषा और बड़े बटनों के साथ।'
              : 'Simple, icon-driven health guidance, emergency first-aid guides, generic medicine savings, and hospital locator in Hindi & English.'}
          </p>

          {/* Quick Search Input */}
          <div className="pt-2 space-y-2">
            <div className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-lg max-w-xl text-slate-800 border-2 border-teal-200 focus-within:border-[#02C39A]">
              <Search className="h-5 w-5 text-[#028090] ml-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.quickSearchPlaceholder}
                className="w-full text-xs sm:text-sm font-medium focus:outline-hidden text-slate-900 placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full h-6 w-6 flex items-center justify-center font-bold transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Popular Search Suggestion Tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
              <span className="text-teal-200 font-semibold text-[11px] mr-1">
                {language === 'hi' ? 'लोकप्रिय खोजें:' : 'Popular:'}
              </span>
              {popularSearches.map((ps, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchTerm(ps.query)}
                  className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/30 text-white text-[11px] font-semibold border border-white/20 backdrop-blur-xs transition-all hover:scale-105"
                >
                  {language === 'hi' ? ps.hi : ps.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Quick SOS Call Bar */}
      <section className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="h-12 w-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md animate-bounce">
            <PhoneCall className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-rose-950">
              {language === 'hi' ? 'आपातकालीन एम्बुलेंस: 108 डायल करें' : 'Emergency Ambulance Hotline: Call 108'}
            </h3>
            <p className="text-xs sm:text-sm text-rose-800 font-medium">
              {language === 'hi'
                ? 'सांप काटने, एक्सीडेंट, दिल के दौरे या गंभीर सांस की तकलीफ पर तुरंत कॉल करें।'
                : 'Free 24x7 emergency medical response for accidents, snake bite, severe burns & labor.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <a
            href="tel:108"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md hover:scale-105 transition-all text-center"
          >
            <PhoneCall className="h-4 w-4" />
            {language === 'hi' ? '108 पर तुरंत कॉल करें' : 'Call 108 Now'}
          </a>
          <button
            onClick={() => onSelectModule('first_aid')}
            className="hidden xs:inline-flex items-center justify-center gap-1 px-4 py-3 rounded-xl bg-white text-rose-700 font-bold text-sm border border-rose-300 hover:bg-rose-100 transition-all"
          >
            {language === 'hi' ? 'प्राथमिक गाइड' : 'First Aid'}
          </button>
        </div>
      </section>

      {/* Grid of 13 Modules */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B3B3C]">
              {t.modulesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {searchTerm.trim()
                ? (language === 'hi' ? `"${searchTerm}" के लिए परिणाम` : `Search results for "${searchTerm}"`)
                : t.modulesSubTitle}
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
            {filteredModules.length} {language === 'hi' ? 'मॉड्यूल' : 'Modules'}
          </span>
        </div>

        {/* AI Direct Ask Banner when search term is entered */}
        {searchTerm.trim() && (
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-indigo-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-indigo-100">
                  {language === 'hi' ? `केयरसेतु एआई से पूछें: "${searchTerm}"` : `Ask CareSetu AI Assistant: "${searchTerm}"`}
                </h4>
                <p className="text-xs text-indigo-200 font-medium">
                  {language === 'hi' ? 'लक्षण, प्राथमिक उपचार या दवा की जानकारी हिंदी/अंग्रेजी में तुरंत पाएं।' : 'Get instant 24x7 health guidance and first-aid instructions.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectModule('chatbot')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#02C39A] hover:bg-emerald-400 text-[#0B3B3C] font-extrabold text-xs shrink-0 shadow-sm transition-all hover:scale-105"
            >
              {language === 'hi' ? 'एआई से सवाल पूछें 💬' : 'Ask AI Chatbot 💬'}
            </button>
          </div>
        )}

        {filteredModules.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-teal-200 space-y-4 max-w-xl mx-auto my-6 shadow-sm">
            <div className="h-14 w-14 rounded-full bg-teal-50 text-[#028090] flex items-center justify-center mx-auto">
              <Search className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-lg">
                {language === 'hi' ? 'कोई मॉड्यूल नहीं मिला' : 'No Modules Found'}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {language === 'hi'
                  ? `"${searchTerm}" नाम का कोई सीधा मॉड्यूल शीर्षक नहीं है, पर आप एआई चैटबॉट से तुरंत सवाल पूछ सकते हैं:`
                  : `No exact module title matches "${searchTerm}". Ask CareSetu AI Health Assistant:`}
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => onSelectModule('chatbot')}
                className="px-5 py-2.5 rounded-xl bg-[#0B3B3C] hover:bg-[#028090] text-white text-xs font-bold transition-all shadow-sm"
              >
                {language === 'hi' ? 'एआई चैटबॉट से सवाल पूछें' : 'Ask CareSetu AI Assistant'}
              </button>
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                {language === 'hi' ? 'खोज साफ़ करें' : 'Clear Search'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className={`text-left bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between group focus:outline-hidden ${
                    mod.featured
                      ? 'border-teal-400 ring-2 ring-teal-500/20 shadow-xs'
                      : 'border-teal-100/80 hover:border-teal-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`h-11 w-11 rounded-2xl ${mod.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#028090] border border-teal-200">
                        {language === 'hi' ? mod.badgeHi : mod.badgeEn}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#028090] transition-colors leading-snug">
                      {mod.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                      {mod.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#028090] group-hover:text-[#0B3B3C]">
                    <span>{t.viewDetails}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-[#02C39A]" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Statistics Banner */}
      <section className="bg-teal-900 text-white rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border border-teal-700">
        <div className="space-y-1 p-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#02C39A]">10,000+</div>
          <div className="text-xs text-teal-200 font-medium">
            {language === 'hi' ? 'जन औषधि केंद्र मैप' : 'Jan Aushadhi Stores'}
          </div>
        </div>
        <div className="space-y-1 p-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#02C39A]">24x7</div>
          <div className="text-xs text-teal-200 font-medium">
            {language === 'hi' ? 'एम्बुलेंस हेल्पलाइन (108)' : '108 Ambulance Line'}
          </div>
        </div>
        <div className="space-y-1 p-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#02C39A]">₹5 लाख</div>
          <div className="text-xs text-teal-200 font-medium">
            {language === 'hi' ? 'आयुष्मान मुफ्त इलाज' : 'Ayushman Insurance'}
          </div>
        </div>
        <div className="space-y-1 p-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#02C39A]">100%</div>
          <div className="text-xs text-teal-200 font-medium">
            {language === 'hi' ? 'मुफ्त स्वास्थ्य गाइड' : 'Free Health Guidance'}
          </div>
        </div>
      </section>
    </div>
  );
};
