import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  Droplet,
  Zap,
  Dog,
  Skull,
  Waves,
  HeartPulse,
  PhoneCall,
  CheckCircle2,
  XCircle,
  X,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { Language, EmergencyFirstAid as EmergencyType } from '../../types';
import { EMERGENCY_FIRST_AID } from '../../data/mockData';
import { translations } from '../../data/translations';
import { AudioPlayerButton } from '../AudioPlayerButton';

interface EmergencyFirstAidProps {
  language: Language;
}

export const EmergencyFirstAid: React.FC<EmergencyFirstAidProps> = ({ language }) => {
  const t = translations[language];
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyType | null>(null);

  // Additional mock emergencies to complete all 8 requested types
  const fullEmergencies: EmergencyType[] = [
    ...EMERGENCY_FIRST_AID,
    {
      id: 'animal_bite',
      titleEn: 'Animal / Rabid Dog Bite',
      titleHi: 'कुत्ते या जानवर का काटना (रेबीज)',
      icon: 'Dog',
      color: 'bg-amber-700',
      severity: 'high',
      overviewEn: 'Wash the wound under running tap water with soap for 15 minutes immediately.',
      overviewHi: 'घाव को बहते पानी और साबुन से तुरंत 15 मिनट तक लगातार धोएं।',
      stepsEn: [
        { stepNumber: 1, title: 'Wash with Soap & Water', instruction: 'Wash the bite wound thoroughly with soap and running water for at least 15 minutes.' },
        { stepNumber: 2, title: 'Apply Antiseptic', instruction: 'Apply povidone-iodine or alcohol antiseptic. Do NOT cover wound tightly.' },
        { stepNumber: 3, title: 'Get Anti-Rabies Vaccine (ARV)', instruction: 'Rush to PHC/Hospital for Anti-Rabies Vaccine (ARV) and Rabies Immunoglobulin (RIG) within 24 hours.' }
      ],
      stepsHi: [
        { stepNumber: 1, title: 'साबुन और पानी से 15 मिनट धोएं', instruction: 'काटे स्थान को तुरंत बहते पानी और कपड़े धोने वाले साबुन से 15 मिनट तक धोएं।' },
        { stepNumber: 2, title: 'एंटीसेप्टिक लगाएं', instruction: 'घाव पर पियोडिन (Betadine) लगाएं। घाव को कसकर न बांधें।' },
        { stepNumber: 3, title: 'रेबीज का टीका लगवाएं', instruction: '24 घंटे के अंदर सरकारी अस्पताल जाकर रेबीज की मुफ्त वैक्सीन (ARV) लगवाएं।' }
      ],
      dosEn: ['Wash thoroughly with soap', 'Get anti-rabies vaccine dose Day 0, 3, 7, 14, 28'],
      dosHi: ['साबुन से अच्छी तरह धोएं', 'रेबीज का पहला टीका 24 घंटे में लें'],
      dontsEn: ['Do NOT apply chili powder, lime, or turmeric', 'Do NOT stitch fresh animal bite wound'],
      dontsHi: ['घाव पर मिर्च पाउडर, चूना या मिट्टी न लगाएं', 'जानवर के काटे ताजा घाव पर टांके न लगवाएं']
    },
    {
      id: 'poisoning',
      titleEn: 'Pesticide / Chemical Poisoning',
      titleHi: 'कीटनाशक व जहर का सेवन',
      icon: 'Skull',
      color: 'bg-[#0B3B3C]',
      severity: 'critical',
      overviewEn: 'Keep airway clear. Transport victim along with the poison container/label to hospital.',
      overviewHi: 'सांस की नली खुली रखें। जहर की बोतल/शीशी साथ लेकर तुरंत एम्बुलेंस से अस्पताल भागें।',
      stepsEn: [
        { stepNumber: 1, title: 'Safe Airway & Fresh Air', instruction: 'Move victim into open fresh air. Turn victim onto side if vomiting.' },
        { stepNumber: 2, title: 'Remove Contaminated Clothes', instruction: 'If pesticide spilled on skin/clothes, remove clothes and wash skin with water.' },
        { stepNumber: 3, title: 'Carry Bottle & Call 108', instruction: 'Rush to District Hospital immediately along with the pesticide wrapper/bottle.' }
      ],
      stepsHi: [
        { stepNumber: 1, title: 'खुली हवा में लाएं', instruction: 'मरीज को खुली हवा में लाएं। उल्टी आने पर मरीज को करवट लिटाएं।' },
        { stepNumber: 2, title: 'जहर लगे कपड़े हटाएं', instruction: 'यदि शरीर पर कीटनाशक गिरा हो तो कपड़े बदलकर त्वचा पानी से धोएं।' },
        { stepNumber: 3, title: 'जहर का डिब्बा साथ रखें', instruction: 'कीटनाशक का डिब्बा या रैपर साथ लेकर 108 एम्बुलेंस से तुरंत अस्पताल जाएं।' }
      ],
      dosEn: ['Turn person on left side (recovery position)', 'Keep pesticide bottle for doctor inspection'],
      dosHi: ['मरीज को बाईं करवट लिटाकर रखें', 'डॉक्टर को दिखाने के लिए दवा का डिब्बा साथ रखें'],
      dontsEn: ['Do NOT induce vomiting forcefully', 'Do NOT give salt water, raw milk or cow dung'],
      dontsHi: ['जबरदस्ती उल्टी कराने की कोशिश न करें', 'मरीज को गोबर, नमक का पानी या केरोसिन न पिलाएं']
    },
    {
      id: 'drowning',
      titleEn: 'Drowning / Water Immersion',
      titleHi: 'पानी में डूबना',
      icon: 'Waves',
      color: 'bg-cyan-700',
      severity: 'critical',
      overviewEn: 'Rescue safely using rope/bamboo. Perform CPR chest compressions immediately if not breathing.',
      overviewHi: 'रस्सी या बांस से सुरक्षित बाहर निकालें। सांस न आने पर तुरंत सीपीआर (सीने पर दबाव) दें।',
      stepsEn: [
        { stepNumber: 1, title: 'Safe Water Rescue', instruction: 'Throw a rope or bamboo pole. Do not jump in unless trained swimmer.' },
        { stepNumber: 2, title: 'Check Airway & Pulse', instruction: 'Place victim on dry ground. Clear mouth of weeds/mud.' },
        { stepNumber: 3, title: 'Perform Rescue CPR', instruction: 'If not breathing, push firmly on center of chest 30 times and give 2 rescue breaths.' }
      ],
      stepsHi: [
        { stepNumber: 1, title: 'सुरक्षित बाहर निकालें', instruction: 'रस्सी, बाल्टी या बांस का सहारा दें। तैरना न आने पर पानी में न कूदें।' },
        { stepNumber: 2, title: 'मुंह साफ करें', instruction: 'सूखी जगह पर लिटाएं और मुंह से मिट्टी या काई बाहर निकालें।' },
        { stepNumber: 3, title: 'सीपीआर (CPR) दें', instruction: 'सांस बंद होने पर सीने के बीच 30 बार दबाएं और मुंह से सांस दें।' }
      ],
      dosEn: ['Keep body warm with dry blanket', 'Call 108 while performing CPR'],
      dosHi: ['मरीज को सूखे कपड़े या कंबल में लपेटें', '108 पर एम्बुलेंस बुलाएं'],
      dontsEn: ['Do NOT roll person over barrel', 'Do NOT delay CPR to empty water'],
      dontsHi: ['मरीज को उल्टे ड्रम (बैरल) पर न घुमाएं', 'पेट से पानी निकालने में सीपीआर में देरी न करें']
    },
    {
      id: 'heart_stroke',
      titleEn: 'Heart Attack / Brain Stroke',
      titleHi: 'दिल का दौरा (हार्ट अटैक) व लकवा (स्ट्रोक)',
      icon: 'HeartPulse',
      color: 'bg-[#028090]',
      severity: 'critical',
      overviewEn: 'Sudden chest squeezing pain or facial drooping is a critical emergency. Rush to ICU.',
      overviewHi: 'सीने में जकड़न, बाएं हाथ में दर्द या चेहरा एक तरफ लटकना गंभीर लक्षण हैं। तुरंत एम्बुलेंस बुलाएं।',
      stepsEn: [
        { stepNumber: 1, title: 'Recognize FAST Signs', instruction: 'Face drooping, Arm weakness, Speech difficulty = TIME to Call 108.' },
        { stepNumber: 2, title: 'Loosen Tight Clothes', instruction: 'Sit person comfortably backed against wall. Keep calm.' },
        { stepNumber: 3, title: 'Give Aspirin 300mg if advised', instruction: 'If heart attack suspected and chewable Aspirin available, chew 1 tablet.' }
      ],
      stepsHi: [
        { stepNumber: 1, title: 'लक्षण पहचानें', instruction: 'चेहरा टेढ़ा होना, हाथ का बेजान होना, बोली लड़खड़ाना = 108 एम्बुलेंस का समय।' },
        { stepNumber: 2, title: 'आरामदायक स्थिति में बैठाएं', instruction: 'मरीज को दीवार के सहारे आराम से बैठाएं और ढीले कपड़े पहनाएं।' },
        { stepNumber: 3, title: 'अस्पताल भागें', instruction: 'आईसीयू सुविधा वाले नजदीकी सरकारी अस्पताल ले जाएं।' }
      ],
      dosEn: ['Keep person sitting comfortably', 'Keep emergency window open for air'],
      dosHi: ['मरीज को बैठाकर शांत रखें', 'ताजी हवा आने दें'],
      dontsEn: ['Do NOT allow person to walk or exertion', 'Do NOT give solid food or tea'],
      dontsHi: ['मरीज को पैदल या बाइक पर न चलाएं', 'खाने या पीने की चीजें न दें']
    }
  ];

  const getEmergencyIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'Flame': return Flame;
      case 'Droplet': return Droplet;
      case 'Zap': return Zap;
      case 'Dog': return Dog;
      case 'Skull': return Skull;
      case 'Waves': return Waves;
      case 'HeartPulse': return HeartPulse;
      default: return ShieldAlert;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#0B3B3C] text-white rounded-2xl p-6 shadow-sm border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wide">
            <ShieldAlert className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 2' : 'Module 2'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modEmergencyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 font-medium">
            {t.modEmergencyDesc}
          </p>
        </div>

        {/* Big 108 Call Button */}
        <a
          href="tel:108"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md animate-pulse shrink-0"
        >
          <PhoneCall className="h-5 w-5" />
          <span>{language === 'hi' ? 'तुरंत एम्बुलेंस (108) कॉल करें' : 'Call 108 Ambulance Now'}</span>
        </a>
      </div>

      {/* Grid of Emergency Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fullEmergencies.map((item) => {
          const IconComp = getEmergencyIcon(item.icon);
          const isHindi = language === 'hi';
          const title = isHindi ? item.titleHi : item.titleEn;
          const overview = isHindi ? item.overviewHi : item.overviewEn;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedEmergency(item)}
              className="text-left bg-white rounded-2xl border border-rose-100 p-5 shadow-2xs hover:shadow-md transition-all hover:border-rose-300 flex flex-col justify-between group focus:outline-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                    {language === 'hi' ? 'प्राथमिक उपचार' : 'First Aid'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-rose-700 transition-colors">
                  {title}
                </h3>

                <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                  {overview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:text-rose-800">
                <span>{language === 'hi' ? 'उपचार कदम देखें' : 'View Action Steps'}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* EMERGENCY STEP-BY-STEP MODAL / DRAWER */}
      {selectedEmergency && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-rose-200 relative animate-in fade-in zoom-in duration-200">
            {/* Modal Top Red Alert Header */}
            <div className="bg-rose-600 text-white p-5 sticky top-0 z-10 flex items-center justify-between border-b border-rose-700">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white text-rose-600 flex items-center justify-center font-bold">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold bg-rose-800 px-2 py-0.5 rounded-md text-rose-100">
                      {language === 'hi' ? 'आपातकालीन निर्देश' : 'Emergency Protocol'}
                    </span>
                    <AudioPlayerButton
                      text={`${language === 'hi' ? selectedEmergency.titleHi : selectedEmergency.titleEn}. ${language === 'hi' ? selectedEmergency.overviewHi : selectedEmergency.overviewEn}`}
                      language={language}
                      size="sm"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {language === 'hi' ? selectedEmergency.titleHi : selectedEmergency.titleEn}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmergency(null)}
                className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-6 space-y-6">
              {/* TOP BOLD 108 REMINDER */}
              <div className="bg-rose-100 border-2 border-rose-400 rounded-2xl p-4 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-rose-950 font-extrabold text-sm sm:text-base">
                  <AlertTriangle className="h-5 w-5 text-rose-600 animate-bounce" />
                  {language === 'hi'
                    ? 'अस्पताल पहुंचने तक तुरंत ये कदम उठाएं — 108 एम्बुलेंस को कॉल करें!'
                    : 'CALL 108 AMBULANCE / SEEK MEDICAL HELP IMMEDIATELY!'}
                </div>
                <p className="text-xs text-rose-900 font-medium">
                  {language === 'hi' ? selectedEmergency.overviewHi : selectedEmergency.overviewEn}
                </p>
              </div>

              {/* Step-by-Step Numbered Guide */}
              <div className="space-y-4">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b pb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  {t.emergencySteps}
                </h4>

                <div className="space-y-3">
                  {(language === 'hi' ? selectedEmergency.stepsHi : selectedEmergency.stepsEn).map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4 flex items-start gap-3.5"
                    >
                      <div className="h-8 w-8 rounded-xl bg-[#028090] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
                        {step.stepNumber}
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                          {step.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {step.instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOs and DON'Ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <h5 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {t.dos}
                  </h5>
                  <ul className="text-xs text-emerald-950 space-y-1.5 font-medium">
                    {(language === 'hi' ? selectedEmergency.dosHi : selectedEmergency.dosEn).map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
                  <h5 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-rose-600" />
                    {t.donts}
                  </h5>
                  <ul className="text-xs text-rose-950 space-y-1.5 font-medium">
                    {(language === 'hi' ? selectedEmergency.dontsHi : selectedEmergency.dontsEn).map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BOTTOM BOLD 108 REMINDER */}
              <div className="bg-rose-600 text-white rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md">
                <div>
                  <div className="font-extrabold text-sm sm:text-base">
                    {language === 'hi' ? '108 आपातकालीन हेल्पलाइन निःशुल्क है' : '108 Helpline is 100% Free'}
                  </div>
                  <div className="text-xs text-rose-100">
                    {language === 'hi' ? 'बिना बैलेंस के भी 108 पर कॉल कर सकते हैं' : 'Call 108 even without mobile balance'}
                  </div>
                </div>

                <a
                  href="tel:108"
                  className="px-4 py-2.5 bg-white text-rose-700 font-extrabold text-xs sm:text-sm rounded-xl hover:bg-rose-50 transition-all shrink-0 shadow-xs"
                >
                  {language === 'hi' ? 'अभी 108 मिलाएं' : 'Call 108 Now'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
