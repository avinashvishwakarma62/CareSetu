import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  PhoneCall,
  Clock,
  CheckCircle2,
  Navigation as NavIcon,
  Search,
  X,
  Bed,
  Phone,
  Crosshair,
  Loader2,
  ExternalLink,
  Compass,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Language, HealthcareFacility } from '../../types';
import { translations } from '../../data/translations';
import { useLocation } from '../../context/LocationContext';

interface AffordableHealthcareProps {
  language: Language;
}

export const AffordableHealthcare: React.FC<AffordableHealthcareProps> = ({ language }) => {
  const t = translations[language];
  const {
    userLocation,
    isLoadingLocation,
    locationError,
    nearbyHospitals,
    isLoadingHospitals,
    requestLiveLocation,
    setManualLocation,
    openGoogleMapsNearMe
  } = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [manualQuery, setManualQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'phc' | 'chc' | 'district'>('all');

  const isHindi = language === 'hi';

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;
    const ok = await setManualLocation(manualQuery.trim());
    if (ok) {
      setShowLocationInput(false);
      setManualQuery('');
    }
  };

  const popularDistricts = [
    { en: 'Lucknow', hi: 'लखनऊ' },
    { en: 'Varanasi', hi: 'वाराणसी' },
    { en: 'Gorakhpur', hi: 'गोरखपुर' },
    { en: 'Patna', hi: 'पटना' },
    { en: 'Kanpur', hi: 'कानपुर' },
    { en: 'New Delhi', hi: 'नई दिल्ली' },
    { en: 'Jaipur', hi: 'जयपुर' },
    { en: 'Mumbai', hi: 'मुंबई' },
    { en: 'Bhopal', hi: 'भोपाल' }
  ];

  const filtered = nearbyHospitals.filter(f => {
    const name = (isHindi ? f.nameHi : f.nameEn).toLowerCase();
    const matchesSearch = !searchTerm.trim() || name.includes(searchTerm.toLowerCase()) || f.addressEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || f.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#028090] to-teal-800 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02C39A] text-[#0B3B3C] font-extrabold text-xs uppercase tracking-wide">
            <Building2 className="h-4 w-4" />
            {language === 'hi' ? 'मॉड्यूल 4' : 'Module 4'}
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {t.modHealthcareTitle}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 font-medium">
            {isHindi
              ? 'आपके वर्तमान स्थान के निकटतम सरकारी अस्पताल, सीएचसी और पीएचसी की सूची'
              : 'Find hospitals, PHCs, and CHCs nearest to your real-time GPS location'}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <button
            onClick={openGoogleMapsNearMe}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#02C39A] hover:bg-[#00A896] text-[#0B3B3C] font-extrabold text-xs shadow-md transition-all shrink-0 hover:scale-102"
          >
            <ExternalLink className="h-4 w-4" />
            {isHindi ? 'गूगल मैप पर सभी नजदीकी अस्पताल देखें' : 'Open All Hospitals Near Me on Maps'}
          </button>
        </div>
      </div>

      {/* USER LOCATION DETECTION BAR */}
      <div className="bg-white rounded-2xl border-2 border-teal-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
              <MapPin className="h-5 w-5 animate-pulse text-[#028090]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'सक्रिय स्थान (Active Location):' : 'Active Location:'}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    userLocation.isLiveGps
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {userLocation.isLiveGps
                    ? (isHindi ? '● लाइव GPS सक्रिय' : '● Live GPS Active')
                    : (isHindi ? 'स्थान चुना हुआ' : 'Custom Selected')}
                </span>
              </div>
              <p className="text-sm font-extrabold text-slate-800 line-clamp-1">
                {userLocation.address}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={requestLiveLocation}
              disabled={isLoadingLocation}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#028090] hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
            >
              {isLoadingLocation ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Crosshair className="h-4 w-4 text-[#02C39A]" />
              )}
              {isHindi ? 'मेरा GPS स्थान पहचानें' : 'Use My Current GPS'}
            </button>

            <button
              onClick={() => setShowLocationInput(!showLocationInput)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition-all"
            >
              <Compass className="h-4 w-4 text-teal-600" />
              {isHindi ? 'जिला / शहर बदलें' : 'Change City / Pincode'}
            </button>
          </div>
        </div>

        {/* Location Error Notice */}
        {locationError && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}

        {/* Manual City / District / Pincode Search Drawer */}
        {showLocationInput && (
          <div className="pt-3 border-t border-slate-100 space-y-2 animate-in fade-in duration-150">
            <form onSubmit={handleManualSearch} className="flex gap-2">
              <input
                type="text"
                value={manualQuery}
                onChange={(e) => setManualQuery(e.target.value)}
                placeholder={
                  isHindi
                    ? 'अपना जिला, शहर या पिनकोड लिखें (उदा. वाराणसी, गोरखपुर, पटना, 226001)...'
                    : 'Enter your city, district, town, or 6-digit pincode...'
                }
                className="flex-1 text-xs sm:text-sm font-medium border border-teal-300 rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
              <button
                type="submit"
                disabled={isLoadingLocation || !manualQuery.trim()}
                className="px-4 py-2 bg-[#028090] text-white rounded-xl font-bold text-xs disabled:opacity-50 hover:bg-teal-800"
              >
                {isLoadingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : (isHindi ? 'खोजें' : 'Search')}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
              <span className="text-slate-400 font-bold text-[11px] mr-1">
                {isHindi ? 'त्वरित चुनें:' : 'Quick Select:'}
              </span>
              {popularDistricts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setManualLocation(item.en)}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200 transition-colors"
                >
                  {isHindi ? item.hi : item.en}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FILTER TABS & SEARCH INPUT */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex-1 flex items-center bg-white rounded-xl border border-teal-200 p-2 shadow-2xs">
            <Search className="h-5 w-5 text-teal-600 ml-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isHindi ? 'अस्पताल नाम या सेवा खोजें...' : 'Filter by hospital name, doctor OPD, or service...'}
              className="w-full text-xs sm:text-sm font-medium focus:outline-hidden px-2 text-slate-800"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-xs text-slate-400 hover:text-slate-600 px-2 font-bold">
                ✕
              </button>
            )}
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-teal-200 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                filterType === 'all' ? 'bg-[#028090] text-white font-bold' : 'text-slate-600 hover:bg-teal-50'
              }`}
            >
              {isHindi ? 'सभी केंद्र' : 'All Facilities'}
            </button>
            <button
              onClick={() => setFilterType('phc')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                filterType === 'phc' ? 'bg-[#028090] text-white font-bold' : 'text-slate-600 hover:bg-teal-50'
              }`}
            >
              {isHindi ? 'पीएचसी (PHC)' : 'PHCs'}
            </button>
            <button
              onClick={() => setFilterType('chc')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                filterType === 'chc' ? 'bg-[#028090] text-white font-bold' : 'text-slate-600 hover:bg-teal-50'
              }`}
            >
              {isHindi ? 'सामुदायिक (CHC)' : 'CHCs'}
            </button>
            <button
              onClick={() => setFilterType('district')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                filterType === 'district' ? 'bg-[#028090] text-white font-bold' : 'text-slate-600 hover:bg-teal-50'
              }`}
            >
              {isHindi ? 'जिला अस्पताल' : 'District Hospitals'}
            </button>
          </div>
        </div>

        {/* Hospital Counter & Status */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
          <span>
            {isHindi
              ? `${userLocation.address.split(',')[0]} के निकटतम ${filtered.length} स्वास्थ्य केंद्र (दूरी के अनुसार क्रमबद्ध)`
              : `Found ${filtered.length} healthcare facilities nearest to ${userLocation.address.split(',')[0]} (sorted by distance)`}
          </span>
          {isLoadingHospitals && (
            <span className="flex items-center gap-1 text-teal-600 font-bold">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {isHindi ? 'निकटतम केंद्र खोज रहे हैं...' : 'Finding live hospitals...'}
            </span>
          )}
        </div>
      </div>

      {/* Facilities Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(fac => {
          const name = isHindi ? fac.nameHi : fac.nameEn;
          const typeLabel = isHindi ? fac.typeLabelHi : fac.typeLabelEn;
          const address = isHindi ? fac.addressHi : fac.addressEn;
          const hours = isHindi ? fac.openHoursHi : fac.openHoursEn;
          const services = isHindi ? fac.servicesHi : fac.servicesEn;

          return (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-teal-100 p-5 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#028090] border border-teal-200">
                    {typeLabel}
                  </span>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-300 shrink-0 shadow-2xs flex items-center gap-1">
                    📍 {fac.distanceKm} km
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {name}
                </h3>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {address}
                </p>

                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                  <Clock className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>{hours}</span>
                </div>

                {/* Emergency & Beds Feature Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {fac.hasEmergency && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                      🚑 {isHindi ? '24x7 आपातकालीन' : '24x7 Emergency'}
                    </span>
                  )}
                  {fac.hasBedFacility && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      🛏️ {isHindi ? 'भर्ती (बेड) सुविधा' : 'Inpatient Beds'}
                    </span>
                  )}
                </div>

                {/* Services Pills */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {isHindi ? 'उपलब्ध मुफ्त सेवाएं' : 'Services Offered'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {services.map((s, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-50 text-slate-700 px-2 py-1 rounded-md border border-slate-200/60 font-medium">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${fac.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#028090] font-bold text-xs border border-teal-200 transition-all"
                >
                  <PhoneCall className="h-4 w-4" />
                  {t.callNow}
                </a>
                <button
                  onClick={() => setSelectedFacility(fac)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-bold text-xs transition-all shadow-xs"
                >
                  <NavIcon className="h-4 w-4 text-[#02C39A]" />
                  {t.getDirections}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-teal-100 p-8 text-center space-y-3">
          <Building2 className="h-10 w-10 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">
            {isHindi ? 'कोई अस्पताल नहीं मिला' : 'No facilities matched your filter'}
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {isHindi
              ? 'कृपया अपना खोज शब्द बदलें या "मेरा GPS स्थान पहचानें" बटन दबाकर पुनः प्रयास करें।'
              : 'Try searching with another district name or tap "Use My Current GPS" to find facilities near you.'}
          </p>
          <button
            onClick={openGoogleMapsNearMe}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#028090] text-white text-xs font-bold"
          >
            <ExternalLink className="h-4 w-4" />
            {isHindi ? 'गूगल मैप पर सभी नजदीकी अस्पताल देखें' : 'Search Directly on Google Maps'}
          </button>
        </div>
      )}

      {/* DIRECTIONS / FACILITY DETAIL MODAL */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-teal-200 space-y-5 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-[#028090] border border-teal-200">
                  {isHindi ? selectedFacility.typeLabelHi : selectedFacility.typeLabelEn}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                  {isHindi ? selectedFacility.nameHi : selectedFacility.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <MapPin className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>{isHindi ? selectedFacility.addressHi : selectedFacility.addressEn}</span>
                </div>
                <div className="text-teal-800 font-bold bg-teal-50 p-2 rounded-lg border border-teal-200 flex items-center justify-between">
                  <span>{isHindi ? 'आपके सक्रिय स्थान से वास्तविक दूरी:' : 'Calculated Distance:'}</span>
                  <span className="font-extrabold text-sm text-[#028090]">📍 {selectedFacility.distanceKm} km</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-teal-50 p-3 rounded-xl border border-teal-200 font-medium text-teal-900">
                <span>{isHindi ? 'हेल्पलाइन / फोन नंबर:' : 'Phone Helpline:'}</span>
                <a href={`tel:${selectedFacility.phone}`} className="font-extrabold text-[#028090] underline flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> {selectedFacility.phone}
                </a>
              </div>

              {/* What to bring when visiting */}
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs space-y-1 text-emerald-950 font-medium">
                <span className="font-bold text-emerald-900 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {isHindi ? 'अस्पताल जाते समय साथ ले जाएं:' : 'Documents to Bring:'}
                </span>
                <p>
                  {isHindi
                    ? '1. आधार कार्ड या कोई पहचान पत्र  2. आयुष्मान भारत गोल्डन कार्ड (यदि बना हो)  3. पिछली जांच या डॉक्टर की पुरानी पर्ची'
                    : '1. Aadhaar or any Photo ID card  2. Ayushman Bharat Card (if available)  3. Previous medical reports or prescriptions'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedFacility(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                {t.closeModal}
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedFacility.lat},${selectedFacility.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#028090] hover:bg-[#00A896] text-white font-extrabold text-xs text-center shadow-md flex items-center justify-center gap-2"
              >
                <NavIcon className="h-4 w-4 text-[#02C39A]" />
                {isHindi ? 'गूगल मैप पर सीधा रास्ता देखें' : 'Get Live GPS Directions'}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

