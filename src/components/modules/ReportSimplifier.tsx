import React, { useState } from 'react';
import {
  FileSearch,
  CheckCircle2,
  Sparkles,
  Bot,
  Loader2,
  FileText,
  FlaskConical,
  Pill,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { AudioPlayerButton } from '../AudioPlayerButton';

interface ReportSimplifierProps {
  language: Language;
}

export const ReportSimplifier: React.FC<ReportSimplifierProps> = ({ language }) => {
  const t = translations[language];
  const isHindi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'calculator' | 'aiScanner'>('calculator');

  // Calculator State
  const [selectedReportType, setSelectedReportType] = useState<string>('cbc');
  const [testValue, setTestValue] = useState<string>('10.5');

  // AI Prescription & Report Scanner State
  const [prescriptionText, setPrescriptionText] = useState<string>('');
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const reportTypes = [
    { id: 'cbc', nameEn: 'Hemoglobin (Hb - Anemia Test)', nameHi: 'हीमोग्लोबिन (खून की मात्रा)', unit: 'g/dL', defaultVal: '10.5' },
    { id: 'sugar_fasting', nameEn: 'Fasting Blood Sugar (डायबिटीज शुगर)', nameHi: 'खाली पेट शुगर (Fasting Sugar)', unit: 'mg/dL', defaultVal: '145' },
    { id: 'sugar_pp', nameEn: 'Post Prandial Sugar (खाने के बाद शुगर)', nameHi: 'खाने के 2 घंटे बाद शुगर (PP Sugar)', unit: 'mg/dL', defaultVal: '190' },
    { id: 'bp_sys', nameEn: 'Blood Pressure (Systolic - ऊपर का बीपी)', nameHi: 'ब्लड प्रेशर (ऊपर वाला BP)', unit: 'mmHg', defaultVal: '140' },
    { id: 'platelets', nameEn: 'Platelet Count (डेंगू / बुखार प्लेटलेट)', nameHi: 'प्लेटलेट काउंट (Platelets)', unit: 'lakhs/mcL', defaultVal: '0.85' },
    { id: 'wbc', nameEn: 'White Blood Cell (WBC - इन्फेक्शन जांच)', nameHi: 'श्वेत रक्त कण (WBC)', unit: '/mcL', defaultVal: '12500' },
    { id: 'thyroid_tsh', nameEn: 'Thyroid TSH Level', nameHi: 'थायराइड टीएसएच (Thyroid TSH)', unit: 'mIU/L', defaultVal: '7.8' }
  ];

  const currentReport = reportTypes.find(r => r.id === selectedReportType) || reportTypes[0];

  const getInterpretation = () => {
    const val = parseFloat(testValue);
    if (isNaN(val)) return null;

    if (selectedReportType === 'cbc') {
      if (val < 11.0) {
        return {
          status: 'low',
          labelHi: 'कम (एनीमिया / खून की कमी)',
          labelEn: 'Low (Anemia / Low Hemoglobin)',
          color: 'bg-amber-100 border-amber-300 text-amber-950',
          badgeColor: 'bg-amber-600 text-white',
          meaningHi: 'आपके खून में हीमोग्लोबिन का स्तर सामान्य से कम है। शरीर में थकावट और कमजोरी रह सकती है।',
          meaningEn: 'Your Hemoglobin is below normal (12-16 g/dL). Indicates anemia or iron deficiency.',
          adviceHi: 'आयरन-फॉलिक एसिड की गोली लें। पालक, गुड़, भुना चना, अनार और हरी पत्तेदार सब्जियां खाएं।',
          adviceEn: 'Take Iron-Folic acid tablets provided free at PHC. Eat spinach, jaggery, chana and pomegranate.'
        };
      } else if (val >= 11.0 && val <= 16.0) {
        return {
          status: 'normal',
          labelHi: 'बिल्कुल सामान्य (उत्तम स्वास्थ्य)',
          labelEn: 'Normal Range (Healthy)',
          color: 'bg-emerald-100 border-emerald-300 text-emerald-950',
          badgeColor: 'bg-emerald-600 text-white',
          meaningHi: 'हीमोग्लोबिन स्तर बिल्कुल सामान्य और स्वास्थ्य उत्तम है।',
          meaningEn: 'Hemoglobin level is within normal healthy range (12-16 g/dL).',
          adviceHi: 'पौष्टिक आहार और पर्याप्त पानी का सेवन जारी रखें।',
          adviceEn: 'Continue eating a balanced traditional diet.'
        };
      } else {
        return {
          status: 'high',
          labelHi: 'अधिक (High Hemoglobin)',
          labelEn: 'High Hemoglobin Level',
          color: 'bg-rose-100 border-rose-300 text-rose-950',
          badgeColor: 'bg-rose-600 text-white',
          meaningHi: 'हीमोग्लोबिन का स्तर 16 g/dL से ऊपर है। डिहाइड्रेशन (पानी की कमी) या धूम्रपान इसका कारण हो सकता है।',
          meaningEn: 'Hemoglobin is higher than normal (>16 g/dL). Dehydration can be a cause.',
          adviceHi: 'पर्याप्त पानी पिएं और डॉक्टर से परामर्श लें।',
          adviceEn: 'Drink plenty of water and consult a PHC doctor.'
        };
      }
    } else if (selectedReportType === 'sugar_fasting') {
      if (val < 100) {
        return {
          status: 'normal',
          labelHi: 'सामान्य खाली पेट शुगर',
          labelEn: 'Normal Fasting Sugar (<100 mg/dL)',
          color: 'bg-emerald-100 border-emerald-300 text-emerald-950',
          badgeColor: 'bg-emerald-600 text-white',
          meaningHi: 'ब्लड शुगर का स्तर बिल्कुल ठीक है। डायबिटीज की शिकायत नहीं है।',
          meaningEn: 'Blood sugar is normal. No diabetes indicated.',
          adviceHi: 'मीठे से दूरी और रोजाना 30 मिनट सैर जारी रखें।',
          adviceEn: 'Maintain daily physical exercise and balanced diet.'
        };
      } else if (val >= 100 && val <= 125) {
        return {
          status: 'warning',
          labelHi: 'प्री-डायबिटीज (सावधानी का संकेत)',
          labelEn: 'Pre-Diabetes (Warning Stage)',
          color: 'bg-amber-100 border-amber-300 text-amber-950',
          badgeColor: 'bg-amber-600 text-white',
          meaningHi: 'शुगर सामान्य से थोड़ी ऊपर है (100-125 mg/dL)। डायबिटीज होने का खतरा है।',
          meaningEn: 'Fasting sugar is elevated (100-125 mg/dL). Pre-diabetes range.',
          adviceHi: 'मीठी चाय, मिठाई और तली चीजें बंद करें। रोजाना 40 मिनट तेज चाल से टहलें।',
          adviceEn: 'Avoid refined sugar, sweets & deep-fried foods. Walk 40 mins daily.'
        };
      } else {
        return {
          status: 'high',
          labelHi: 'उच्च ब्लड शुगर (डायबिटीज)',
          labelEn: 'High Sugar (Diabetes Range >126 mg/dL)',
          color: 'bg-rose-100 border-rose-300 text-rose-950',
          badgeColor: 'bg-rose-600 text-white',
          meaningHi: 'खाली पेट शुगर 126 mg/dL से ऊपर है। यह डायबिटीज का संकेत है।',
          meaningEn: 'Fasting blood sugar is high (>126 mg/dL). Indicates diabetes mellitus.',
          adviceHi: 'पीएचसी जाकर डॉक्टर से मेटफॉर्मिन दवा और डाइट चार्ट समझें। जन औषधि से सस्ती दवा लें।',
          adviceEn: 'Consult PHC doctor for Metformin medicine and diet control.'
        };
      }
    } else if (selectedReportType === 'platelets') {
      if (val < 1.5) {
        return {
          status: 'low',
          labelHi: 'कम प्लेटलेट्स (डेंगू/वायरल बुखार का खतरा)',
          labelEn: 'Low Platelet Count (<1.5 Lakhs)',
          color: 'bg-rose-100 border-rose-300 text-rose-950',
          badgeColor: 'bg-rose-600 text-white',
          meaningHi: 'प्लेटलेट्स 1.5 लाख से कम हैं। डेंगू या तेज वायरल बुखार में यह कम होती हैं।',
          meaningEn: 'Platelets are lower than normal (1.5-4.5 Lakhs). Common in Dengue/Viral fever.',
          adviceHi: 'ओआरएस का पानी, नारियल पानी व पपीते की पत्तियों का रस लें। डॉक्टर को तुरंत दिखाएं।',
          adviceEn: 'Drink ORS fluids, coconut water. Visit PHC immediately.'
        };
      } else {
        return {
          status: 'normal',
          labelHi: 'सामान्य प्लेटलेट्स स्तर',
          labelEn: 'Normal Platelet Count',
          color: 'bg-emerald-100 border-emerald-300 text-emerald-950',
          badgeColor: 'bg-emerald-600 text-white',
          meaningHi: 'प्लेटलेट्स का स्तर सुरक्षित सीमा (1.5 से 4.5 लाख) में है।',
          meaningEn: 'Platelets are in safe healthy range.',
          adviceHi: 'पर्याप्त तरल पदार्थ लें।',
          adviceEn: 'Stay well hydrated.'
        };
      }
    }

    return {
      status: 'normal',
      labelHi: 'परिणाम विश्लेषित',
      labelEn: 'Value Analyzed',
      color: 'bg-blue-50 border-blue-200 text-slate-900',
      badgeColor: 'bg-blue-600 text-white',
      meaningHi: `दर्ज मान: ${testValue} ${currentReport.unit}। कृपया विस्तृत रिपोर्ट के लिए पीएचसी स्वास्थ्य कार्यकर्ता से संपर्क करें।`,
      meaningEn: `Entered Value: ${testValue} ${currentReport.unit}. Consult PHC health worker for detailed evaluation.`,
      adviceHi: 'जन औषधि केंद्र से जेनरिक दवाओं की जानकारी लें।',
      adviceEn: 'Inquire about Jan Aushadhi generic medicines.'
    };
  };

  const handleAiPrescriptionSimplify = async () => {
    if (!prescriptionText.trim()) return;
    setLoadingAi(true);
    setAiAnalysis('');

    try {
      const promptText = `Act as an expert Indian Rural Health AI Assistant. Simplify this doctor prescription or lab report notes into simple, friendly ${isHindi ? 'Hindi (हिन्दी)' : 'English'} for a villager:

Prescription Notes / Text: "${prescriptionText}"

Please format your response clearly into 3 short sections:
1. 🩺 <b>दवा/रिपोर्ट की सरल भाषा में जानकारी (Summary)</b>
2. ⏰ <b>दवा लेने का सही समय व सावधानियां (Dosage & Timing)</b>
3. 💊 <b>जन औषधि सस्ती जनरिक दवा का नाम (Jan Aushadhi Substitute)</b>`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: promptText }]
        })
      });

      const data = await response.json();
      if (data && data.text) {
        setAiAnalysis(data.text);
      } else {
        setAiAnalysis(isHindi ? 'क्षमा करें, AI विश्लेषण प्रस्तुत नहीं हो सका। कृपया पुनः प्रयास करें।' : 'Could not fetch AI analysis. Please try again.');
      }
    } catch (err) {
      setAiAnalysis(isHindi ? 'संजाल (Network) में त्रुटि आई। कृपया बाद में प्रयास करें।' : 'Network error. Please try again.');
    } finally {
      setLoadingAi(false);
    }
  };

  const interpretation = getInterpretation();

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-[#028090] text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-300 text-sky-950 font-extrabold text-xs uppercase tracking-wide">
            <FileSearch className="h-4 w-4" />
            {isHindi ? 'स्मार्ट मेडिकल पर्ची रीडर' : 'Smart Report & Prescription Reader'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.modReportSimplifierTitle}
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
            {t.modReportSimplifierDesc}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
          <div className="text-xl font-extrabold text-[#02C39A]">100% नि:शुल्क AI सहायिका</div>
          <div className="text-xs font-bold text-sky-100">
            {isHindi ? 'आसान बोली-भाषा में उत्तर' : 'Simple Rural Explanation'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FlaskConical className="h-4 w-4 text-[#028090]" />
          <span>{isHindi ? '1. ब्लड टेस्ट मान कैलकुलेटर' : '1. Lab Test Calculator'}</span>
        </button>

        <button
          onClick={() => setActiveTab('aiScanner')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'aiScanner'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
          <span>{isHindi ? '2. डॉक्टर पर्ची AI ट्रांसलेटर' : '2. Doctor Prescription AI Reader'}</span>
        </button>
      </div>

      {/* Tab 1: Calculator */}
      {activeTab === 'calculator' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-[#028090]" />
              <span>{isHindi ? 'अपनी लैब पर्ची का मान दर्ज करें:' : 'Select Test & Enter Result Value:'}</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {isHindi ? 'मेडिकल रिपोर्ट के नंबर दर्ज करें और आसान स्वास्थ्य अर्थ समझें।' : 'Enter test parameters to get instant plain language interpretation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                {isHindi ? 'जांच का प्रकार चुनें:' : 'Select Test Type:'}
              </label>
              <select
                value={selectedReportType}
                onChange={(e) => {
                  setSelectedReportType(e.target.value);
                  const found = reportTypes.find(r => r.id === e.target.value);
                  if (found) setTestValue(found.defaultVal);
                }}
                className="w-full text-xs sm:text-sm font-bold bg-slate-50 p-3.5 rounded-xl border border-slate-200 focus:border-[#028090] focus:outline-none"
              >
                {reportTypes.map(r => (
                  <option key={r.id} value={r.id}>
                    {isHindi ? r.nameHi : r.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                {isHindi ? `पर्ची में लिखी संख्या (${currentReport.unit}):` : `Result Value (${currentReport.unit}):`}
              </label>
              <input
                type="number"
                step="0.1"
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
                className="w-full text-xs sm:text-sm font-extrabold bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-900 focus:border-[#028090] focus:outline-none"
              />
            </div>
          </div>

          {/* Output Interpretation Gauge */}
          {interpretation && (
            <div className={`rounded-2xl p-5 border-2 ${interpretation.color} space-y-4 animate-in fade-in duration-200`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${interpretation.badgeColor}`}>
                  {isHindi ? interpretation.labelHi : interpretation.labelEn}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {isHindi ? 'दर्ज संख्या: ' : 'Value: '} {testValue} {currentReport.unit}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {isHindi ? 'इसका क्या मतलब है?' : 'What does this mean?'}
                </h4>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800">
                  {isHindi ? interpretation.meaningHi : interpretation.meaningEn}
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {isHindi ? 'अगला कदम / स्वास्थ्य सलाह:' : 'Recommended Action:'}
                  </h5>
                  <AudioPlayerButton
                    text={isHindi ? interpretation.adviceHi : interpretation.adviceEn}
                    language={language}
                    size="sm"
                  />
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#0B3B3C]">
                  {isHindi ? interpretation.adviceHi : interpretation.adviceEn}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: AI Doctor Prescription Reader */}
      {activeTab === 'aiScanner' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <span>{isHindi ? 'डॉक्टर की पर्ची / दवाओं के नाम लिखें या पेस्ट करें:' : 'Paste Doctor Prescription or Medicine Names:'}</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {isHindi ? 'डॉक्टर द्वारा लिखी गई दवाओं या टेस्ट के नाम लिखें, हमारी AI सहायिका उसे आसान हिंदी में समझाएगी।' : 'Type or paste handwritten prescription notes or medicine names to simplify.'}
            </p>
          </div>

          <div className="space-y-3">
            <textarea
              rows={4}
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              placeholder={
                isHindi
                  ? 'उदा: Tab Paracetamol 650mg TDS, Cap Omez 20mg OD empty stomach, Syrup IFA 10ml'
                  : 'e.g., Tab Paracetamol 650mg TDS, Cap Omez 20mg OD empty stomach, Syrup IFA 10ml'
              }
              className="w-full p-4 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-600 bg-slate-50"
            />

            <button
              onClick={handleAiPrescriptionSimplify}
              disabled={loadingAi || !prescriptionText.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              {loadingAi ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isHindi ? 'AI विश्लेषण कर रहा है...' : 'AI Analyzing...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{isHindi ? 'AI से आसान भाषा में समझें' : 'Simplify with AI Doctor'}</span>
                </>
              )}
            </button>
          </div>

          {aiAnalysis && (
            <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-700" />
                  <span className="font-extrabold text-slate-900 text-sm">
                    {isHindi ? 'AI डॉक्टर विश्लेषण:' : 'AI Prescription Explanation:'}
                  </span>
                </div>
                <AudioPlayerButton text={aiAnalysis.replace(/<[^>]*>/g, '')} language={language} size="sm" />
              </div>

              <div
                className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium space-y-2 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: aiAnalysis }}
              />

              <div className="bg-white p-3 rounded-xl border border-purple-100 text-[11px] text-slate-500 font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  {isHindi
                    ? 'यह केवल जानकारी के लिए है। दवाएं लेने से पहले हमेशा पीएचसी डॉक्टर की सलाह लें।'
                    : 'For informational guidance only. Always verify prescription dosages with a registered doctor.'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
