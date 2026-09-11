import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { BarChart3, Users, ShieldCheck, Droplets, Activity } from 'lucide-react';
import { Language } from '../../types';
import { VILLAGE_HEALTH_METRICS } from '../../data/mockData';
import { translations } from '../../data/translations';

interface VillageDashboardProps {
  language: Language;
}

export const VillageDashboard: React.FC<VillageDashboardProps> = ({ language }) => {
  const t = translations[language];
  const isHindi = language === 'hi';
  const m = VILLAGE_HEALTH_METRICS;

  const monthlyData = [
    { month: isHindi ? 'जनवरी' : 'Jan', opd: 420, immun: 92 },
    { month: isHindi ? 'फरवरी' : 'Feb', opd: 480, immun: 94 },
    { month: isHindi ? 'मार्च' : 'Mar', opd: 510, immun: 95 },
    { month: isHindi ? 'अप्रैल' : 'Apr', opd: 590, immun: 97 },
    { month: isHindi ? 'मई' : 'May', opd: 640, immun: 98 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900 to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-300 text-cyan-950 font-extrabold text-xs uppercase tracking-wide">
            <BarChart3 className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 11' : 'Module 11'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modVillageDashboardTitle}
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100 font-medium">
            {t.modVillageDashboardDesc} - {isHindi ? m.villageNameHi : m.villageNameEn}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-xl font-extrabold text-[#02C39A]">{m.populationTotal.toLocaleString()}</div>
          <div className="text-[11px] font-bold text-cyan-100">
            {isHindi ? 'ग्राम कुल जनसंख्या' : 'Village Total Population'}
          </div>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isHindi ? 'पूर्ण टीकाकरण %' : 'Child Immunization'}</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{m.immunizationCoveragePct}%</div>
          <p className="text-[11px] text-slate-500 font-medium">{isHindi ? '0-2 वर्ष के सभी शिशु' : 'Target Achieved'}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isHindi ? 'आयुष्मान कार्ड धारक' : 'Ayushman Cards'}</span>
            <Users className="h-4 w-4 text-[#028090]" />
          </div>
          <div className="text-2xl font-extrabold text-[#028090]">{m.ayushmanCardHolders}</div>
          <p className="text-[11px] text-slate-500 font-medium">{isHindi ? '₹5 लाख मुफ्त इलाज' : 'Families Enrolled'}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isHindi ? 'मासिक पीएचसी मरीज' : 'Monthly OPD Patients'}</span>
            <Activity className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-700">{m.monthlyPhcOpdVisits}</div>
          <p className="text-[11px] text-slate-500 font-medium">{isHindi ? 'मुफ्त परामर्श लिया' : 'Free Consultations'}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isHindi ? 'पेयजल शुद्धता सूचकांक' : 'Safe Water Quality'}</span>
            <Droplets className="h-4 w-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-700">{m.cleanWaterIndexPct}%</div>
          <p className="text-[11px] text-slate-500 font-medium">{isHindi ? 'क्लोरीन शुद्ध नल' : 'Safe Chlorinated Taps'}</p>
        </div>
      </div>

      {/* Recharts Data Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* OPD Visits Trend Line Chart */}
        <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base">
            {isHindi ? 'ग्राम पीएचसी ओपीडी मरीज रुझान (महीनेवार)' : 'Monthly PHC OPD Patients Trend'}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="opd" stroke="#028090" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Immunization % Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base">
            {isHindi ? 'टीकाकरण प्रगति दर (Immunization % Progress)' : 'Child Vaccination Coverage % Trend'}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="immun" fill="#02C39A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
