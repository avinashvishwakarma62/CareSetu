import React, { useState } from 'react';
import { HeartHandshake, Phone, MessageSquare, Search, PlusCircle, CheckCircle2, MapPin, UserCheck, ShieldAlert } from 'lucide-react';
import { Language, BloodDonor } from '../../types';
import { BLOOD_DONORS as initialDonors } from '../../data/mockData';
import { AudioPlayerButton } from '../AudioPlayerButton';

interface BloodDonorsProps {
  language: Language;
}

export const BloodDonors: React.FC<BloodDonorsProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [donors, setDonors] = useState<BloodDonor[]>(initialDonors);
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Form State for registering new voluntary donor
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState<'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'>('O+');
  const [newPhone, setNewPhone] = useState('');
  const [newVillage, setNewVillage] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const bloodGroups = ['ALL', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const filteredDonors = donors.filter(d => {
    const matchesGroup = selectedGroup === 'ALL' || d.bloodGroup === selectedGroup;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      d.villageEn.toLowerCase().includes(q) ||
      d.villageHi.toLowerCase().includes(q) ||
      d.bloodGroup.toLowerCase().includes(q);
    return matchesGroup && matchesSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone || !newVillage) return;

    const newDonor: BloodDonor = {
      id: 'bd_' + Date.now(),
      name: newName,
      bloodGroup: newGroup,
      phone: newPhone,
      villageEn: newVillage,
      villageHi: newVillage,
      districtEn: 'Lucknow Rural',
      districtHi: 'लखनऊ ग्रामीण',
      available: true,
      lastDonatedEn: 'Just Now',
      lastDonatedHi: 'अभी पंजीकृत'
    };

    setDonors(prev => [newDonor, ...prev]);
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setShowRegisterModal(false);
      setNewName('');
      setNewPhone('');
      setNewVillage('');
    }, 1800);
  };

  const getWhatsAppUrl = (phone: string, bloodGroup: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msgEn = `Urgent Blood Need! Hello, we need ${bloodGroup} blood at nearby Hospital/PHC via CareSetu helpline. Can you please help?`;
    const msgHi = `आपातकालीन रक्त की आवश्यकता! नमस्ते, हमें केयरसेतु हेल्पलाइन के माध्यम से नजदीकी अस्पताल/पीएचसी में ${bloodGroup} रक्त की आवश्यकता है। क्या आप मदद कर सकते हैं?`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(isHindi ? msgHi : msgEn)}`;
  };

  const summaryVoiceText = isHindi
    ? 'ग्राम रक्तदाता नेटवर्क में अपने रक्त समूह के अनुसार ऐच्छिक रक्तदाताओं को खोजें या आपातकालीन व्हाट्सएप संदेश भेजें।'
    : 'Gram Blood Donor Network. Search voluntary donors by blood group or send instant emergency WhatsApp alert.';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-red-600 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4">
          <HeartHandshake className="h-56 w-56" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <HeartHandshake className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                {isHindi ? 'ग्राम रक्तदाता हेल्पलाइन' : 'Gram Voluntary Blood Network'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isHindi ? 'आपातकालीन रक्तदाता खोजें' : 'Voluntary Blood Donor Finder'}
              </h2>
            </div>
          </div>
          <p className="text-sm text-rose-100 font-medium leading-relaxed">
            {isHindi
              ? 'ग्राम पंचायत व ब्लॉक स्तर पर स्वैच्छिक रक्तदाताओं से सीधे संपर्क करें या खुद को रक्तदाता के रूप में पंजीकृत करें।'
              : 'Connect directly with local voluntary blood donors or register as a lifesaving donor in your block.'}
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <AudioPlayerButton text={summaryVoiceText} language={language} size="md" />
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-extrabold flex items-center gap-2 shadow-sm transition-transform hover:scale-105 cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{isHindi ? 'स्वयं को रक्तदाता बनाएं' : 'Register as Blood Donor'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Callout Card */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1 text-slate-800">
          <p className="font-bold text-rose-900">
            {isHindi ? 'अति-आपात स्थिति में (Emergency Helpline):' : 'In Severe Emergency:'}
          </p>
          <p className="text-slate-600">
            {isHindi
              ? '108 एम्बुलेंस या 104 राज्य स्वास्थ्य हेल्पलाइन पर सीधे कॉल करें। सरकारी अस्पतालों में ब्लड बैंक 24x7 उपलब्ध रहते हैं।'
              : 'Call 108 Ambulance or 104 Health Helpline immediately. Blood banks at District Hospitals operate 24x7.'}
          </p>
        </div>
      </div>

      {/* Search & Blood Group Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isHindi ? 'नाम या गांव खोजें...' : 'Search name or village...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full overflow-x-auto pb-1 sm:pb-0">
            {bloodGroups.map(bg => (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGroup === bg
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {bg === 'ALL' ? (isHindi ? 'सभी समूह' : 'All Groups') : bg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Donor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map(donor => (
          <div
            key={donor.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-rose-300 transition-all space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                  {donor.bloodGroup}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {donor.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                    <span>{isHindi ? donor.villageHi : donor.villageEn}, {isHindi ? donor.districtHi : donor.districtEn}</span>
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                {isHindi ? 'उपलब्ध' : 'Available'}
              </span>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl flex items-center justify-between font-medium">
              <span>{isHindi ? 'अंतिम रक्तदान:' : 'Last Donated:'}</span>
              <span className="font-bold text-slate-800">{isHindi ? donor.lastDonatedHi : donor.lastDonatedEn}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${donor.phone}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all text-center"
              >
                <Phone className="h-3.5 w-3.5 text-rose-400" />
                <span>{isHindi ? 'कॉल करें' : 'Call Direct'}</span>
              </a>

              <a
                href={getWhatsAppUrl(donor.phone, donor.bloodGroup)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all text-center"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300 space-y-3">
          <p className="text-slate-600 font-medium text-sm">
            {isHindi ? 'कोई रक्तदाता नहीं मिला। कृपया अलग रक्त समूह चुनकर देखें।' : 'No blood donors match the current filter.'}
          </p>
          <button
            onClick={() => { setSelectedGroup('ALL'); setSearchTerm(''); }}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
          >
            {isHindi ? 'फ़िल्टर रिसेट करें' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-base">
                <UserCheck className="h-5 w-5" />
                <span>{isHindi ? 'स्वैच्छिक रक्तदाता पंजीकरण' : 'Register Voluntary Donor'}</span>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {registeredSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 text-lg">
                  {isHindi ? 'पंजीकरण सफल रहा!' : 'Registered Successfully!'}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {isHindi ? 'आपकी जानकारी केयरसेतु रक्तदाता नेटवर्क में जोड़ दी गई है।' : 'Your details are added to CareSetu Voluntary Network.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isHindi ? 'पूरा नाम:' : 'Full Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={isHindi ? 'उदा. राजेश कुमार' : 'e.g. Rajesh Kumar'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {isHindi ? 'रक्त समूह:' : 'Blood Group:'}
                    </label>
                    <select
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs font-bold"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {isHindi ? 'मोबाइल नंबर:' : 'Mobile Number:'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isHindi ? 'गांव / ब्लॉक का नाम:' : 'Village / Block Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newVillage}
                    onChange={(e) => setNewVillage(e.target.value)}
                    placeholder={isHindi ? 'उदा. रामपुर कलां' : 'e.g. Rampur Kalan'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    {isHindi ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-sm"
                  >
                    {isHindi ? 'रक्तदाता सूची में जोड़ें' : 'Save as Donor'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
