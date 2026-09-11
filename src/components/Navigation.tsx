import React from 'react';
import {
  Home,
  ShieldAlert,
  Pill,
  Building2,
  FileText,
  Baby,
  Bot,
  MapPin,
  HelpCircle,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavigationProps {
  activeModule: string;
  onSelectModule: (moduleId: string) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeModule,
  onSelectModule,
  language
}) => {
  const t = translations[language];

  const quickNavItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'first_aid', label: language === 'hi' ? 'प्राथमिक उपचार' : 'First Aid', icon: ShieldAlert, highlight: true },
    { id: 'blood_donors', label: language === 'hi' ? 'रक्तदाता' : 'Blood Donors', icon: HeartHandshake },
    { id: 'medicine', label: language === 'hi' ? 'सस्ती दवाएं' : 'Medicines', icon: Pill },
    { id: 'healthcare', label: language === 'hi' ? 'स्वास्थ्य केंद्र' : 'Hospitals', icon: Building2 },
    { id: 'schemes', label: language === 'hi' ? 'योजनाएं' : 'Schemes', icon: FileText },
    { id: 'women_child', label: language === 'hi' ? 'महिला व बच्चा' : 'Maternal Care', icon: Baby },
    { id: 'map', label: language === 'hi' ? 'मानचित्र' : 'Health Map', icon: MapPin },
    { id: 'chatbot', label: language === 'hi' ? 'एआई सहायक' : 'AI Assistant', icon: Bot, badge: '24x7' }
  ];

  return (
    <>
      {/* Desktop Navigation Sub-bar */}
      <nav className="bg-white border-b border-teal-100 hidden md:block shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {quickNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#028090] text-white shadow-xs'
                    : item.highlight
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    : 'text-slate-600 hover:text-[#0B3B3C] hover:bg-teal-50/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#02C39A]' : item.highlight ? 'text-rose-600' : 'text-[#028090]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-[#02C39A] text-[#0B3B3C] px-1.5 py-0.2 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-teal-200 z-40 md:hidden py-1 px-2 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {quickNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive ? 'text-[#028090] font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-xl ${isActive ? 'bg-teal-50 text-[#028090]' : ''}`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[#028090]' : item.highlight ? 'text-rose-600' : 'text-slate-500'}`} />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 line-clamp-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
