import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  Pill,
  PhoneCall,
  Navigation as NavIcon,
  Crosshair,
  Loader2,
  ExternalLink,
  Compass
} from 'lucide-react';
import { Language } from '../../types';
import { PHARMACIES } from '../../data/mockData';
import { translations } from '../../data/translations';
import { useLocation } from '../../context/LocationContext';
import { calculateDistanceKm } from '../../services/locationService';

interface HealthcareMapProps {
  language: Language;
}

export const HealthcareMap: React.FC<HealthcareMapProps> = ({ language }) => {
  const t = translations[language];
  const isHindi = language === 'hi';
  const {
    userLocation,
    isLoadingLocation,
    nearbyHospitals,
    requestLiveLocation,
    openGoogleMapsNearMe
  } = useLocation();

  const [filterType, setFilterType] = useState<'all' | 'hospital' | 'pharmacy'>('all');
  const [activeItem, setActiveItem] = useState<any>(null);

  // Recalculate pharmacies distance based on active userLocation
  const dynamicPharmacies = PHARMACIES.map(p => ({
    ...p,
    category: 'pharmacy',
    distanceKm: calculateDistanceKm(userLocation.lat, userLocation.lng, p.lat, p.lng)
  }));

  const dynamicHospitals = nearbyHospitals.map(h => ({
    ...h,
    category: 'hospital'
  }));

  const allMapPoints = [...dynamicHospitals, ...dynamicPharmacies].sort(
    (a, b) => a.distanceKm - b.distanceKm
  );

  const filteredPoints = allMapPoints.filter(p => {
    if (filterType === 'all') return true;
    return p.category === filterType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-[#028090] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02C39A] text-[#0B3B3C] font-extrabold text-xs uppercase tracking-wide">
            <MapPin className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 12' : 'Module 12'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modMapTitle}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 font-medium">
            {isHindi
              ? 'आपके वर्तमान स्थान के निकटतम अस्पताल, पीएचसी और जन औषधि केंद्र'
              : 'Interactive radar of hospitals & pharmacies nearest to your current location'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/20 text-xs font-semibold shrink-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'all' ? 'bg-[#02C39A] text-[#0B3B3C] font-bold' : 'text-white hover:bg-white/10'}`}
          >
            {isHindi ? 'सभी केंद्र' : 'All Facilities'}
          </button>
          <button
            onClick={() => setFilterType('hospital')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'hospital' ? 'bg-[#02C39A] text-[#0B3B3C] font-bold' : 'text-white hover:bg-white/10'}`}
          >
            {isHindi ? 'अस्पताल / PHC' : 'Hospitals'}
          </button>
          <button
            onClick={() => setFilterType('pharmacy')}
            className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'pharmacy' ? 'bg-[#02C39A] text-[#0B3B3C] font-bold' : 'text-white hover:bg-white/10'}`}
          >
            {isHindi ? 'जन औषधि केंद्र' : 'Pharmacies'}
          </button>
        </div>
      </div>

      {/* User Current Location Banner */}
      <div className="bg-white rounded-2xl border border-teal-200 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <div className="h-8 w-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <MapPin className="h-4 w-4 text-[#028090]" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {isHindi ? 'मानचित्र केंद्र (Your Location):' : 'Map Center (Your Location):'}
            </span>
            <span className="text-slate-900 font-extrabold text-xs sm:text-sm">
              {userLocation.address}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={requestLiveLocation}
            disabled={isLoadingLocation}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#028090] font-bold text-xs border border-teal-200"
          >
            {isLoadingLocation ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Crosshair className="h-3.5 w-3.5" />}
            {isHindi ? 'GPS रिफ्रेश करें' : 'Refresh GPS'}
          </button>
          <button
            onClick={openGoogleMapsNearMe}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#028090] text-white font-bold text-xs shadow-xs hover:bg-[#00A896]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {isHindi ? 'गूगल मैप' : 'Google Maps'}
          </button>
        </div>
      </div>

      {/* Visual Map Grid Canvas Component */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Visual Map Pin Interactive List */}
        <div className="lg:col-span-2 bg-slate-900 text-white rounded-3xl p-6 border border-teal-800 shadow-lg relative min-h-[400px] flex flex-col justify-between overflow-hidden">
          {/* Simulated Interactive Map Grid Layer */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#02C39A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between border-b border-teal-800 pb-3">
            <div className="flex items-center gap-2 text-[#02C39A] font-bold text-sm">
              <MapPin className="h-5 w-5 animate-bounce" />
              <span>{isHindi ? 'लाइव जीपीएस स्वास्थ्य रडार' : 'Live Health Radar Map'}</span>
            </div>
            <span className="text-[11px] bg-teal-800 text-teal-200 px-2.5 py-0.5 rounded-full font-bold">
              {filteredPoints.length} {isHindi ? 'नजदीकी केंद्र' : 'Nearby Locations'}
            </span>
          </div>

          {/* User Location Radar Center Pin */}
          <div className="relative z-10 my-2 p-2.5 rounded-xl bg-teal-950/70 border border-teal-500/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-teal-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{isHindi ? 'आपका सक्रिय स्थान (केन्द्र):' : 'Your Position (Center):'}</span>
              <span className="text-white font-extrabold">{userLocation.address.split(',')[0]}</span>
            </div>
            <span className="text-[10px] text-teal-300 font-medium">
              {userLocation.lat.toFixed(3)}, {userLocation.lng.toFixed(3)}
            </span>
          </div>

          {/* Map Interactive Radar Nodes */}
          <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1">
            {filteredPoints.map(p => {
              const isSelected = activeItem?.id === p.id;
              const title = isHindi ? p.nameHi : p.nameEn;

              return (
                <button
                  key={p.id}
                  onClick={() => setActiveItem(p)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#02C39A] text-[#0B3B3C] border-white font-extrabold shadow-md scale-102'
                      : 'bg-teal-950/80 border-teal-700/80 hover:border-[#02C39A] text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    {p.category === 'hospital' ? <Building2 className="h-4 w-4 text-teal-300" /> : <Pill className="h-4 w-4 text-emerald-300" />}
                    <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-md bg-black/30">
                      📍 {p.distanceKm} km
                    </span>
                  </div>
                  <div className="text-xs font-bold line-clamp-1">{title}</div>
                  <div className="text-[10px] opacity-75 truncate mt-0.5">
                    {isHindi ? p.addressHi : p.addressEn}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 bg-teal-950/90 border border-teal-800 p-3 rounded-xl text-xs text-teal-200 flex items-center justify-between">
            <span>{isHindi ? 'कार्ड पर क्लिक करके वास्तविक दूरी एवं गूगल मैप दिशा-निर्देश देखें' : 'Click any card to view distance & Google GPS directions'}</span>
          </div>
        </div>

        {/* Selected Location Details Card */}
        <div className="bg-white rounded-3xl border border-teal-100 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          {activeItem ? (
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-teal-50 text-[#028090] border border-teal-200">
                {activeItem.category === 'hospital' ? (isHindi ? 'सरकारी अस्पताल / PHC' : 'Govt Hospital / PHC') : (isHindi ? 'जन औषधि केंद्र' : 'Jan Aushadhi Store')}
              </span>

              <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                {isHindi ? activeItem.nameHi : activeItem.nameEn}
              </h3>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                📍 {isHindi ? activeItem.addressHi : activeItem.addressEn}
              </p>

              <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-xs font-bold text-teal-900 flex items-center justify-between">
                <span>{isHindi ? 'आपके वर्तमान स्थान से दूरी:' : 'Distance from you:'}</span>
                <span className="text-sm font-extrabold text-[#028090]">📍 {activeItem.distanceKm} km</span>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${activeItem.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#028090] font-extrabold text-xs border border-teal-200"
                >
                  <PhoneCall className="h-4 w-4" />
                  {t.callNow} ({activeItem.phone})
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${activeItem.lat},${activeItem.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-extrabold text-xs shadow-md"
                >
                  <NavIcon className="h-4 w-4 text-[#02C39A]" />
                  {isHindi ? 'गूगल नेविगेशन मैप खोलें' : 'Open Google Maps Navigation'}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center my-auto space-y-2 text-slate-400 py-12">
              <MapPin className="h-10 w-10 mx-auto text-teal-300 animate-pulse" />
              <p className="text-xs font-bold text-slate-600">
                {isHindi ? 'विवरण देखने के लिए किसी भी अस्पताल या दवाखाने पर क्लिक करें' : 'Select any hospital or pharmacy to view details'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

