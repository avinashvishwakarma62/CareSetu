import { HealthcareFacility } from '../types';

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
  isLiveGps: boolean;
  timestamp: number;
}

// Default fallback location (Rampur Block, Lucknow Rural) if user has not yet enabled GPS
export const DEFAULT_USER_LOCATION: UserLocation = {
  lat: 26.8467,
  lng: 80.9462,
  address: 'Rampur Kalan, Lucknow Rural',
  isLiveGps: false,
  timestamp: Date.now()
};

const STORAGE_KEY = 'caresetu_user_location';

export function getSavedUserLocation(): UserLocation {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load saved location', e);
  }
  return DEFAULT_USER_LOCATION;
}

export function saveUserLocation(loc: UserLocation): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  } catch (e) {
    console.error('Failed to save location', e);
  }
}

// Calculate Haversine distance in kilometers between two lat/lng points
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

// Reverse Geocoding using OpenStreetMap Nominatim
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      {
        headers: { 'Accept-Language': 'hi,en' },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);
    if (resp.ok) {
      const data = await resp.json();
      const addr = data.address;
      if (addr) {
        const parts = [
          addr.village || addr.suburb || addr.neighbourhood || addr.town || addr.city_district,
          addr.city || addr.county || addr.state_district,
          addr.state
        ].filter(Boolean);
        if (parts.length > 0) {
          return parts.join(', ');
        }
      }
      if (data.display_name) {
        return data.display_name.split(',').slice(0, 3).join(',');
      }
    }
  } catch (e) {
    console.warn('Reverse geocoding timed out or failed:', e);
  }
  return `GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

// Geocode a user-entered location query (City, Tehsil, District, Pincode)
export async function searchLocation(query: string): Promise<{ lat: number; lng: number; displayName: string } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=1`,
      {
        headers: { 'Accept-Language': 'hi,en' },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);
    if (resp.ok) {
      const results = await resp.json();
      if (results && results.length > 0) {
        const r = results[0];
        return {
          lat: parseFloat(r.lat),
          lng: parseFloat(r.lon),
          displayName: r.display_name.split(',').slice(0, 3).join(',')
        };
      }
    }
  } catch (e) {
    console.error('Search location failed:', e);
  }
  return null;
}

// Fetch live hospitals around the user's location via OpenStreetMap Overpass API
export async function fetchLiveOverpassHospitals(userLat: number, userLng: number, radiusMeters = 25000): Promise<HealthcareFacility[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
    const query = `[out:json][timeout:5];
(
  node["amenity"="hospital"](around:${radiusMeters},${userLat},${userLng});
  way["amenity"="hospital"](around:${radiusMeters},${userLat},${userLng});
  node["healthcare"="centre"](around:${radiusMeters},${userLat},${userLng});
  node["amenity"="clinic"](around:${radiusMeters / 2},${userLat},${userLng});
);
out center 15;`;

    const resp = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (resp.ok) {
      const data = await resp.json();
      if (data && data.elements && data.elements.length > 0) {
        const facilities: HealthcareFacility[] = [];

        for (const el of data.elements) {
          const lat = el.lat || (el.center && el.center.lat);
          const lng = el.lon || (el.center && el.center.lon);
          if (!lat || !lng) continue;

          const tags = el.tags || {};
          const name = tags.name || tags['name:en'] || tags['name:hi'] || 'Government Health Centre';
          const nameHi = tags['name:hi'] || name;
          const phone = tags.phone || tags['contact:phone'] || '108 / 102';
          const emergency = tags.emergency === 'yes' || tags.amenity === 'hospital';
          const dist = calculateDistanceKm(userLat, userLng, lat, lng);

          let type: 'phc' | 'chc' | 'district' | 'subcentre' = 'phc';
          let typeLabelEn = 'Primary / Community Health Centre';
          let typeLabelHi = 'स्वास्थ्य केंद्र / अस्पताल';

          if (name.toLowerCase().includes('district') || name.toLowerCase().includes('civil') || name.toLowerCase().includes('medical college')) {
            type = 'district';
            typeLabelEn = 'District / Referral Hospital';
            typeLabelHi = 'जिला / रेफरल अस्पताल';
          } else if (name.toLowerCase().includes('chc') || name.toLowerCase().includes('community')) {
            type = 'chc';
            typeLabelEn = 'Community Health Centre (CHC)';
            typeLabelHi = 'सामुदायिक स्वास्थ्य केंद्र (CHC)';
          }

          facilities.push({
            id: `live_${el.id}`,
            nameEn: name,
            nameHi: nameHi,
            type,
            typeLabelEn,
            typeLabelHi,
            servicesEn: [
              'OPD Doctor Consultation',
              emergency ? '24x7 Emergency Care' : 'General Health Services',
              'Free Government Medicines',
              'Maternal & Child Health'
            ],
            servicesHi: [
              'ओपीडी परामर्श',
              emergency ? '24x7 आपातकालीन देखभाल' : 'सामान्य स्वास्थ्य सेवाएं',
              'निःशुल्क सरकारी दवाएं',
              'मातृ एवं शिशु स्वास्थ्य'
            ],
            addressEn: tags['addr:street'] ? `${tags['addr:street']}, ${tags['addr:city'] || ''}` : `${dist} km from your live location`,
            addressHi: tags['addr:street'] ? `${tags['addr:street']}, ${tags['addr:city'] || ''}` : `आपके स्थान से लगभग ${dist} किमी`,
            distanceKm: dist,
            phone: phone,
            openHoursEn: emergency ? '24 Hours Emergency' : 'OPD: 8 AM - 2 PM',
            openHoursHi: emergency ? '24 घंटे आपातकालीन' : 'ओपीडी: सुबह 8 से दोपहर 2 बजे',
            hasEmergency: emergency,
            hasBedFacility: true,
            lat,
            lng
          });
        }

        // Sort ascending by distance
        facilities.sort((a, b) => a.distanceKm - b.distanceKm);
        return facilities;
      }
    }
  } catch (e) {
    console.warn('Overpass live hospital fetch skipped or timed out, using regional fallback:', e);
  }
  return [];
}

// Comprehensive seed of major hospitals across various regions of India
// Distances are recalculated in real time based on the user's active coordinates
export const REGIONAL_INDIAN_HOSPITALS: HealthcareFacility[] = [
  {
    id: 'phc_rampur',
    nameEn: 'Rampur Primary Health Centre (PHC)',
    nameHi: 'रामपुर प्राथमिक स्वास्थ्य केंद्र (PHC)',
    type: 'phc',
    typeLabelEn: 'Primary Health Centre (Free Govt Care)',
    typeLabelHi: 'प्राथमिक स्वास्थ्य केंद्र (निःशुल्क सरकारी)',
    servicesEn: ['Outpatient Consultation (OPD)', 'Maternal & Child Vaccination', 'Free Blood & Urine Test Lab', 'Basic Delivery Room (24x7)', 'Jan Aushadhi Generic Pharmacy'],
    servicesHi: ['ओपीडी (OPD) परामर्श', 'मातृ एवं शिशु टीकाकरण', 'निःशुल्क खून व पेशाब जांच', '24 घंटे प्रसूति (डिलीवरी) सुविधा', 'जन औषधि जेनेरिक मेडिकल दुकान'],
    addressEn: 'Village Rampur, Post Office Kalan, Tehsil Sadar, Lucknow',
    addressHi: 'ग्राम रामपुर, पोस्ट कलां, तहसील सदर, लखनऊ',
    distanceKm: 2.1,
    phone: '0522-2345678',
    openHoursEn: 'OPD: 8 AM - 2 PM | Emergency 24x7',
    openHoursHi: 'ओपीडी: सुबह 8 से दोपहर 2 बजे | आपातकालीन 24x7',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 26.8467,
    lng: 80.9462
  },
  {
    id: 'chc_sundarpur',
    nameEn: 'Sundarpur Community Health Centre (CHC)',
    nameHi: 'सुंदरपुर सामुदायिक स्वास्थ्य केंद्र (CHC)',
    type: 'chc',
    typeLabelEn: 'Community Health Centre (30 Bed Hospital)',
    typeLabelHi: 'सामुदायिक स्वास्थ्य केंद्र (30 बेड अस्पताल)',
    servicesEn: ['Surgeon & Gynecologist Care', 'X-Ray & Ultrasound Facility', '30-Bed Inpatient Ward', 'Blood Storage Unit', '24x7 Ambulance Facility'],
    servicesHi: ['सर्जन एवं स्त्री रोग विशेषज्ञ', 'एक्स-रे एवं अल्ट्रासाउंड सुविधा', '30-बेड का इनपेशेंट वार्ड', 'ब्लड स्टोरेज यूनिट', '24 घंटे एम्बुलेंस सुविधा'],
    addressEn: 'Main Highway Road, Sundarpur Block Headquarters, Lucknow',
    addressHi: 'मुख्य हाईवे रोड, सुंदरपुर ब्लॉक मुख्यालय, लखनऊ',
    distanceKm: 7.8,
    phone: '0522-8765432',
    openHoursEn: '24x7 Emergency & Inpatient Services',
    openHoursHi: '24 घंटे आपातकालीन एवं भर्ती सेवा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 26.8620,
    lng: 80.9700
  },
  {
    id: 'district_civil_lucknow',
    nameEn: 'Balrampur District Civil Hospital',
    nameHi: 'बलरामपुर जिला नागरिक अस्पताल, लखनऊ',
    type: 'district',
    typeLabelEn: 'District Civil Hospital (Specialist Services)',
    typeLabelHi: 'जिला नागरिक अस्पताल (विशेषज्ञ सेवाएं)',
    servicesEn: ['ICU & Trauma Care', 'Pediatric ICU (SNCU)', 'Dialysis Centre', 'Ayushman Bharat Desk (PM-JAY)', 'Free Medicine Distribution'],
    servicesHi: ['आईसीयू एवं ट्रॉमा सेंटर', 'बाल चिकित्सा आईसीयू (SNCU)', 'डायलिसिस केंद्र', 'आयुष्मान भारत हेल्पडेस्क', 'निःशुल्क दवा वितरण'],
    addressEn: 'Hospital Road, Golaganj, Lucknow, Uttar Pradesh',
    addressHi: 'अस्पताल मार्ग, गोलागंज, लखनऊ, उत्तर प्रदेश',
    distanceKm: 18.5,
    phone: '0522-2200108',
    openHoursEn: '24x7 Full Emergency & Hospital Care',
    openHoursHi: '24 घंटे पूर्ण आपातकालीन सेवा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 26.8687,
    lng: 80.9234
  },
  {
    id: 'aiims_delhi',
    nameEn: 'AIIMS (All India Institute of Medical Sciences)',
    nameHi: 'एम्स (अखिल भारतीय आयुर्विज्ञान संस्थान), नई दिल्ली',
    type: 'district',
    typeLabelEn: 'Apex Referral & Research Hospital',
    typeLabelHi: 'राष्ट्रीय सर्वोच्च रेफरल अस्पताल',
    servicesEn: ['Super Specialty OPD & Surgery', 'Trauma Center & Advanced ICU', 'Ayushman Bharat Cashless', 'Subsidized & Free Diagnostic Services'],
    servicesHi: ['सुपर स्पेशलिटी ओपीडी व सर्जरी', 'ट्रॉमा सेंटर व आधुनिक आईसीयू', 'आयुष्मान भारत कैशलेस इलाज', 'सब्सिडी व मुफ्त जांच सेवा'],
    addressEn: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
    addressHi: 'श्री अरबिंदो मार्ग, अंसारी नगर, नई दिल्ली',
    distanceKm: 480.0,
    phone: '011-26588500',
    openHoursEn: '24x7 Emergency & Trauma',
    openHoursHi: '24 घंटे आपातकालीन व ट्रॉमा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 28.5672,
    lng: 77.2100
  },
  {
    id: 'bhu_varanasi',
    nameEn: 'Sir Sunderlal Hospital, IMS-BHU',
    nameHi: 'सर सुंदरलाल अस्पताल, बीएचयू, वाराणसी',
    type: 'district',
    typeLabelEn: 'Regional Referral Medical College Hospital',
    typeLabelHi: 'क्षेत्रीय रेफरल मेडिकल कॉलेज अस्पताल',
    servicesEn: ['24x7 Emergency & Blood Bank', 'Cardiology & Neurology OPD', 'Ayushman Bharat Free Ward', 'Jan Aushadhi Kendra Inside Campus'],
    servicesHi: ['24x7 आपातकालीन व ब्लड बैंक', 'हृदय एवं न्यूरोलॉजी ओपीडी', 'आयुष्मान भारत मुफ्त वार्ड', 'परिसर में जन औषधि केंद्र'],
    addressEn: 'Banaras Hindu University Campus, Varanasi, Uttar Pradesh',
    addressHi: 'काशी हिंदू विश्वविद्यालय परिसर, वाराणसी, उत्तर प्रदेश',
    distanceKm: 290.0,
    phone: '0542-2309250',
    openHoursEn: '24x7 Emergency Care',
    openHoursHi: '24 घंटे आपातकालीन सेवा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 25.2750,
    lng: 82.9990
  },
  {
    id: 'pmch_patna',
    nameEn: 'Patna Medical College Hospital (PMCH)',
    nameHi: 'पटना मेडिकल कॉलेज अस्पताल (PMCH), पटना',
    type: 'district',
    typeLabelEn: 'State Government Medical College & Hospital',
    typeLabelHi: 'राज्य सरकारी मेडिकल कॉलेज व अस्पताल',
    servicesEn: ['Large Inpatient Ward', 'Free Delivery & Newborn Care (JSSK)', '24x7 Emergency & Trauma', 'Free Anti-Rabies & Snake Venom Treatment'],
    servicesHi: ['बड़ा इनपेशेंट वार्ड', 'मुफ्त प्रसव व नवजात शिशु देखभाल', '24 घंटे आपातकालीन व ट्रॉमा', 'मुफ्त एंटी-रेबीज व सर्पदंश इलाज'],
    addressEn: 'Ashok Rajpath, Patna, Bihar',
    addressHi: 'अशोक राजपथ, पटना, बिहार',
    distanceKm: 500.0,
    phone: '0612-2300080',
    openHoursEn: '24x7 Emergency Services',
    openHoursHi: '24 घंटे आपातकालीन सेवा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 25.6210,
    lng: 85.1580
  },
  {
    id: 'brd_gorakhpur',
    nameEn: 'BRD Medical College & Nehru Hospital',
    nameHi: 'बीआरडी मेडिकल कॉलेज व नेहरू अस्पताल, गोरखपुर',
    type: 'district',
    typeLabelEn: 'Government Medical College Hospital',
    typeLabelHi: 'सरकारी मेडिकल कॉलेज अस्पताल',
    servicesEn: ['Encephalitis & Pediatric ICU', 'Ayushman Bharat Empaneled', 'Free Blood Testing Lab', '24x7 Ambulance & Emergency'],
    servicesHi: ['इंसेफेलाइटिस व बाल चिकित्सा आईसीयू', 'आयुष्मान भारत संबद्ध', 'मुफ्त खून जांच लैब', '24 घंटे एम्बुलेंस व इमरजेंसी'],
    addressEn: 'Medical College Road, Gorakhpur, Uttar Pradesh',
    addressHi: 'मेडिकल कॉलेज रोड, गोरखपुर, उत्तर प्रदेश',
    distanceKm: 270.0,
    phone: '0551-2310108',
    openHoursEn: '24x7 Full Emergency Care',
    openHoursHi: '24 घंटे आपातकालीन सेवा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 26.7900,
    lng: 83.3850
  },
  {
    id: 'kem_mumbai',
    nameEn: 'KEM Hospital & Seth GS Medical College',
    nameHi: 'केईएम अस्पताल, परेल, मुंबई',
    type: 'district',
    typeLabelEn: 'Municipal Corporation General Hospital',
    typeLabelHi: 'महानगर पालिका जनरल अस्पताल',
    servicesEn: ['24x7 Trauma & Emergency', 'Cardiology & Nephrology', 'Free/Subsidized Care', 'Jan Aushadhi Dispensary'],
    servicesHi: ['24 घंटे ट्रॉमा व इमरजेंसी', 'हृदय व गुर्दा रोग विभाग', 'मुफ्त व रियायती इलाज', 'जन औषधि दवाखाना'],
    addressEn: 'Acharya Donde Marg, Parel, Mumbai, Maharashtra',
    addressHi: 'आचार्य दोंडे मार्ग, परेल, मुंबई, महाराष्ट्र',
    distanceKm: 1400.0,
    phone: '022-24107000',
    openHoursEn: '24x7 Emergency',
    openHoursHi: '24 घंटे इमरजेंसी',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 19.0020,
    lng: 72.8420
  },
  {
    id: 'sms_jaipur',
    nameEn: 'Sawai Man Singh (SMS) Hospital',
    nameHi: 'सवाई मानसिंह (SMS) अस्पताल, जयपुर',
    type: 'district',
    typeLabelEn: 'State Apex Government Hospital',
    typeLabelHi: 'राज्य स्तरीय मुख्य सरकारी अस्पताल',
    servicesEn: ['Chiranjeevi / Ayushman Bharat Cashless', 'Trauma Center & 24x7 Emergency', 'Free Medicines (Mukhyamantri Nishulk Dawa)', 'Subsidized Advanced Surgery'],
    servicesHi: ['आयुष्मान भारत / चिरंजीवी कैशलेस', 'ट्रॉमा सेंटर व 24 घंटे इमरजेंसी', 'मुख्यमंत्री निःशुल्क दवा योजना', 'उन्नत सर्जरी सुविधा'],
    addressEn: 'Jawahar Lal Nehru Marg, Ashok Nagar, Jaipur, Rajasthan',
    addressHi: 'जवाहर लाल नेहरू मार्ग, अशोक नगर, जयपुर, राजस्थान',
    distanceKm: 580.0,
    phone: '0141-2560291',
    openHoursEn: '24x7 Emergency',
    openHoursHi: '24 घंटे आपातकालीन सेवा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 26.9015,
    lng: 75.8150
  }
];

// Helper to get hospitals sorted by distance from given coordinates
export function getHospitalsWithDistances(userLat: number, userLng: number, liveList: HealthcareFacility[] = []): HealthcareFacility[] {
  // If we have live Overpass hospitals, use them; otherwise use regional seed
  const source = liveList.length > 0 ? liveList : REGIONAL_INDIAN_HOSPITALS;

  const withDistances = source.map(fac => {
    const dist = calculateDistanceKm(userLat, userLng, fac.lat, fac.lng);
    return {
      ...fac,
      distanceKm: dist
    };
  });

  return withDistances.sort((a, b) => a.distanceKm - b.distanceKm);
}
