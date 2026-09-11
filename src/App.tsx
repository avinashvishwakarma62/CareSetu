import React, { useState } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navigation } from './components/Navigation';

import { Home } from './components/Home';
import { HealthAwareness } from './components/modules/HealthAwareness';
import { EmergencyFirstAid } from './components/modules/EmergencyFirstAid';
import { AffordableMedicine } from './components/modules/AffordableMedicine';
import { AffordableHealthcare } from './components/modules/AffordableHealthcare';
import { GovernmentSchemes } from './components/modules/GovernmentSchemes';
import { WomenChildHealth } from './components/modules/WomenChildHealth';
import { ElderlyCare } from './components/modules/ElderlyCare';
import { MythBuster } from './components/modules/MythBuster';
import { ReportSimplifier } from './components/modules/ReportSimplifier';
import { HealthQuiz } from './components/modules/HealthQuiz';
import { VillageDashboard } from './components/modules/VillageDashboard';
import { HealthcareMap } from './components/modules/HealthcareMap';
import { AIChatbot } from './components/modules/AIChatbot';
import { BloodDonors } from './components/modules/BloodDonors';
import { LocationProvider } from './context/LocationContext';

export function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [activeModule, setActiveModule] = useState<string>('home');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  const handleSelectModule = (moduleId: string) => {
    setActiveModule(moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'home':
        return <Home language={language} onSelectModule={handleSelectModule} />;
      case 'health_awareness':
        return <HealthAwareness language={language} />;
      case 'first_aid':
        return <EmergencyFirstAid language={language} />;
      case 'medicine':
        return <AffordableMedicine language={language} />;
      case 'healthcare':
        return <AffordableHealthcare language={language} />;
      case 'schemes':
        return <GovernmentSchemes language={language} />;
      case 'women_child':
        return <WomenChildHealth language={language} />;
      case 'elderly_care':
        return <ElderlyCare language={language} />;
      case 'myth_buster':
        return <MythBuster language={language} />;
      case 'report_simplifier':
        return <ReportSimplifier language={language} />;
      case 'health_quiz':
        return <HealthQuiz language={language} />;
      case 'village_dashboard':
        return <VillageDashboard language={language} />;
      case 'map':
        return <HealthcareMap language={language} />;
      case 'blood_donors':
        return <BloodDonors language={language} />;
      case 'chatbot':
        return <AIChatbot language={language} />;
      default:
        return <Home language={language} onSelectModule={handleSelectModule} />;
    }
  };

  return (
    <LocationProvider>
      <div className="min-h-screen bg-[#F4F8F8] text-slate-900 flex flex-col font-sans selection:bg-[#02C39A] selection:text-[#0B3B3C]">
        {/* Top Header Navigation */}
        <Header
          language={language}
          onToggleLanguage={toggleLanguage}
          onGoHome={() => handleSelectModule('home')}
          activeModule={activeModule}
        />

        {/* Mandatory Emergency Alert Disclaimer Banner */}
        <DisclaimerBanner language={language} />

        {/* Sub-Header Module Navigation */}
        <Navigation
          activeModule={activeModule}
          onSelectModule={handleSelectModule}
          language={language}
        />

        {/* Main Dynamic Workspace Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
          {renderActiveModule()}
        </main>

        {/* Footer Section */}
        <footer className="bg-[#0B3B3C] text-white border-t border-teal-800 py-8 px-4 mt-auto text-xs">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-teal-800">
              <div>
                <div className="font-extrabold text-base text-white mb-1"> CareSetu (केयरसेतु)</div>
                <p className="text-teal-200 text-xs leading-relaxed font-medium">
                  {language === 'hi'
                    ? 'ग्रामीण भारत के लिए सरल, स्वच्छ, मोबाइल-फर्स्ट स्वास्थ्य जागरूकता एवं मार्गदर्शन मंच।'
                    : 'Rural Health Awareness & Assistance Platform for Indian rural communities.'}
                </p>
              </div>

              <div>
                <div className="font-extrabold text-sm text-[#02C39A] uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'आपातकालीन हेल्पलाइन' : 'Emergency Hotlines'}
                </div>
                <div className="space-y-1 font-bold text-teal-100">
                  <p>📞 108 - {language === 'hi' ? 'मुफ्त एम्बुलेंस हेल्पलाइन' : 'Free Ambulance Hotline'}</p>
                  <p>📞 102 - {language === 'hi' ? 'गर्भवती महिला व नवजात एम्बुलेंस' : 'Pregnant Women & Infant Transport'}</p>
                  <p>📞 104 - {language === 'hi' ? 'राज्य स्वास्थ्य सलाह हेल्पलाइन' : 'State Health Information Line'}</p>
                </div>
              </div>

              <div>
                <div className="font-extrabold text-sm text-[#02C39A] uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'सुरक्षा एवं नीति' : 'Safety & Policy'}
                </div>
                <p className="text-teal-200 leading-relaxed font-medium">
                  {language === 'hi'
                    ? 'केयरसेतु केवल स्वास्थ्य जागरूकता और मार्गदर्शन प्रदान करता है। यह डॉक्टरी इलाज या दवा की पर्ची का विकल्प नहीं है।'
                    : 'CareSetu provides health awareness and guidance only. It does not diagnose, prescribe, or replace a doctor.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-teal-300 text-[11px] gap-3 pt-2">
              <div>
                © {new Date().getFullYear()} CareSetu • {language === 'hi' ? 'ग्रामीण भारत के लिए स्वास्थ्य मंच' : 'Rural Healthcare Awareness Platform'}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-teal-800 text-emerald-300 font-bold">
                  {language === 'hi' ? 'हिंदी मोड सक्रिय' : 'English Mode Active'}
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LocationProvider>
  );
}

export default App;
