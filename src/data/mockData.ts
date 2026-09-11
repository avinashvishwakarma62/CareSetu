import {
  Illness,
  EmergencyFirstAid,
  Medicine,
  Pharmacy,
  HealthcareFacility,
  HealthScheme,
  VaccinationItem,
  ElderlyReminder,
  MythFact,
  QuizQuestion,
  VillageData
} from '../types';

export const ILLNESSES: Illness[] = [
  {
    id: 'fever_malaria',
    nameEn: 'Malaria & High Fever',
    nameHi: 'मलेरिया और तेज बुखार',
    category: 'infectious',
    categoryLabelEn: 'Infectious Disease',
    categoryLabelHi: 'संक्रामक रोग',
    iconName: 'Thermometer',
    symptomsEn: ['High fever with shivering/chills', 'Headache and muscle pain', 'Sweating after fever reduces', 'Nausea and weakness'],
    symptomsHi: ['कंपकंपी और ठंड के साथ तेज बुखार', 'सिरदर्द और मांसपेशियों में दर्द', 'बुखार उतरने पर पसीना आना', 'जी मिचलाना और कमजोरी'],
    warningSignsEn: ['Fever lasting >3 days', 'Severe confusion or drowsiness', 'Continuous vomiting', 'Yellowish eyes/skin (Jaundice)'],
    warningSignsHi: ['3 दिन से अधिक लगातार बुखार', 'अत्यधिक बेहोशी या भ्रम', 'लगातार उल्टी होना', 'आंखों या त्वचा का पीला पड़ना (पीलिया)'],
    whenToSeekDoctorEn: 'Get a blood test (RDT/Smear) at nearest PHC within 24 hours of shivering fever.',
    whenToSeekDoctorHi: 'ठंड लगकर बुखार आने पर 24 घंटे के अंदर नजदीकी पीएचसी में खून की जांच (मलेरिया टेस्ट) कराएं।',
    dosEn: [
      'Drink plenty of clean ORS or boiled water',
      'Use mosquito nets at night',
      'Wear full-sleeve clothes in evening',
      'Take rest and wipe forehead with damp cloth'
    ],
    dosHi: [
      'उबला हुआ या ओआरएस का पानी प्रचुर मात्रा में पीएं',
      'रात को मच्छरदानी का उपयोग करें',
      'शाम को पूरी बांह के कपड़े पहनें',
      'आराम करें और माथे पर सूती कपड़े की पट्टी रखें'
    ],
    dontsEn: [
      'Do not take unprescribed antibiotics',
      'Do not let stagnant water collect around house',
      'Do not starve during fever'
    ],
    dontsHi: [
      'बिना डॉक्टर की सलाह के एंटीबायोटिक दवाएं न लें',
      'घर के आसपास गड्ढों या बर्तनों में पानी जमा न होने दें',
      'बुखार में भूखे पेट न रहें'
    ]
  },
  {
    id: 'dengue_fever',
    nameEn: 'Dengue Fever',
    nameHi: 'डेंगू बुखार',
    category: 'seasonal',
    categoryLabelEn: 'Seasonal Disease',
    categoryLabelHi: 'मौसमी बीमारी',
    iconName: 'Activity',
    symptomsEn: ['Sudden high fever', 'Severe pain behind eyes and severe body ache', 'Red rashes on skin', 'Extreme tiredness'],
    symptomsHi: ['अचानक तेज बुखार आना', 'आंखों के पीछे और हड्डियों में तेज दर्द', 'त्वचा पर लाल चकत्ते पड़ना', 'अत्यधिक थकान होना'],
    warningSignsEn: ['Bleeding from gums or nose', 'Severe abdominal pain', 'Black stool', 'Rapid drop in blood pressure'],
    warningSignsHi: ['मसूड़ों या नाक से खून बहना', 'पेट में तेज दर्द होना', 'काले रंग का मल आना', 'ब्लड प्रेशर तेजी से गिरना'],
    whenToSeekDoctorEn: 'Seek immediate hospital care if red spots or bleeding signs appear.',
    whenToSeekDoctorHi: 'शरीर पर लाल चकत्ते या रक्तस्राव का कोई भी लक्षण दिखने पर तुरंत अस्पताल जाएं।',
    dosEn: ['Drink coconut water, ORS, and soups', 'Monitor platelet count if advised', 'Rest strictly'],
    dosHi: ['नारियल पानी, ओआरएस और लिक्विड डाइट लें', 'सलाह मिलने पर प्लेटलेट काउंट की जांच कराएं', 'पूरा आराम करें'],
    dontsEn: ['Do NOT take Aspirin or Ibuprofen (causes bleeding)', 'Do not ignore bleeding gums'],
    dontsHi: ['एस्पिरिन या इबुप्रोफेन दवा बिल्कुल न लें (रक्तस्राव बढ़ सकता है)', 'मसूड़ों से खून आने को नजरअंदाज न करें']
  },
  {
    id: 'diarrhea_cholera',
    nameEn: 'Diarrhea & Dehydration',
    nameHi: 'दस्त और डिहाइड्रेशन (पानी की कमी)',
    category: 'infectious',
    categoryLabelEn: 'Gastrointestinal',
    categoryLabelHi: 'पेट एवं पाचन रोग',
    iconName: 'Droplets',
    symptomsEn: ['Watery loose stools (>3 times/day)', 'Vomiting and stomach cramps', 'Dry mouth and sunken eyes', 'Extreme thirst'],
    symptomsHi: ['दिन में 3 से अधिक बार पतला दस्त होना', 'उल्टी और पेट में ऐंठन', 'मुंह सूखना और आंखें धंसना', 'अत्यधिक प्यास लगना'],
    warningSignsEn: ['Blood in stool', 'No urine output for >6 hours', 'Unresponsiveness or lethargy in children'],
    warningSignsHi: ['मल में खून आना', '6 घंटे से अधिक पेशाब न होना', 'बच्चे का अत्यधिक सुस्त या बेहोश होना'],
    whenToSeekDoctorEn: 'Visit PHC immediately if diarrhea lasts over 24 hours or child is extremely weak.',
    whenToSeekDoctorHi: 'यदि दस्त 24 घंटे से अधिक रहे या बच्चा बहुत कमजोर हो जाए तो तुरंत प्राथमिक स्वास्थ्य केंद्र जाएं।',
    dosEn: ['Give ORS solution after every loose stool', 'Continue breastfeeding infants', 'Wash hands with soap before meals'],
    dosHi: ['हर पतले दस्त के बाद ओआरएस (ORS) का घोल दें', 'शिशु को मां का दूध पिलाना जारी रखें', 'खाने से पहले हाथ साबुन से धोएं'],
    dontsEn: ['Do not stop feeding food or liquids', 'Do not give sugary soft drinks or dirty water'],
    dontsHi: ['भोजन या तरल पदार्थ देना बंद न करें', 'मीठे सॉफ्ट ड्रिंक या दूषित पानी न दें']
  },
  {
    id: 'diabetes_hypertension',
    nameEn: 'Diabetes & High Blood Pressure',
    nameHi: 'मधुमेह (शुगर) और उच्च रक्तचाप (बीपी)',
    category: 'chronic',
    categoryLabelEn: 'Chronic Disease',
    categoryLabelHi: 'दीर्घकालिक (क्रॉनिक) बीमारी',
    iconName: 'HeartPulse',
    symptomsEn: ['Frequent urination & excessive thirst', 'Slow healing of wounds', 'Occasional dizziness or blurred vision', 'Unexplained weight loss'],
    symptomsHi: ['बार-बार पेशाब आना और अत्यधिक प्यास लगना', 'घाव का देर से भरना', 'चक्कर आना या धुंधला दिखाई देना', 'अचानक वजन घटना'],
    warningSignsEn: ['Sudden chest discomfort', 'Sudden numbness in arm or face', 'Severe shortness of breath'],
    warningSignsHi: ['सीने में अचानक जकड़न या दर्द', 'हाथ या चेहरे का अचानक सुन्न होना', 'सांस लेने में अत्यधिक तकलीफ'],
    whenToSeekDoctorEn: 'Get free BP and blood sugar checked monthly at your local ASHA worker or Sub-Centre.',
    whenToSeekDoctorHi: 'अपनी स्थानीय आशा कार्यकर्ता या उप-केंद्र पर हर महीने बीपी और शुगर की मुफ्त जांच कराएं।',
    dosEn: ['Walk 30 minutes daily', 'Eat green leafy vegetables and coarse grains ( बाजरा / ज्वार )', 'Take daily medicine regularly'],
    dosHi: ['रोजाना 30 मिनट टहलें', 'हरी सब्जियां और मोटे अनाज (बाजरा, ज्वार) खाएं', 'दैनिक दवाएं समय पर लें'],
    dontsEn: ['Do not stop BP/Sugar medication suddenly', 'Avoid excessive salt, gur, and refined sugar'],
    dontsHi: ['डॉक्टर से पूछे बिना दवाएं अचानक बंद न करें', 'अत्यधिक नमक, गुड़ और चीनी के सेवन से बचें']
  },
  {
    id: 'tuberculosis',
    nameEn: 'Tuberculosis (TB)',
    nameHi: 'टीबी (तपेदिक)',
    category: 'infectious',
    categoryLabelEn: 'Respiratory',
    categoryLabelHi: 'श्वसन रोग',
    iconName: 'Activity',
    symptomsEn: ['Cough lasting more than 2 weeks', 'Low grade fever in evening', 'Weight loss and loss of appetite', 'Night sweats'],
    symptomsHi: ['2 सप्ताह से अधिक समय तक खांसी रहना', 'शाम के समय हल्का बुखार आना', 'वजन घटना और भूख न लगना', 'रात में पसीना आना'],
    warningSignsEn: ['Coughing up blood in sputum', 'Severe chest pain during breathing', 'Rapid weight loss'],
    warningSignsHi: ['बलगम में खून आना', 'सांस लेते समय सीने में तेज दर्द', 'तेजी से वजन कम होना'],
    whenToSeekDoctorEn: 'Get free sputum testing and chest X-Ray at nearest PHC/District Hospital.',
    whenToSeekDoctorHi: 'निकटतम पीएचसी या सरकारी अस्पताल में बलगम की मुफ्त जांच और एक्स-रे कराएं।',
    dosEn: ['Complete the full 6-month DOTS course', 'Cover mouth while coughing', 'Avail Nikshay Poshan Yojana ( ₹1000/month )'],
    dosHi: ['6 महीने का डॉट्स (DOTS) का पूरा कोर्स लें', 'खांसते समय मुंह को कपड़े से ढकें', 'निक्षय पोषण योजना का लाभ लें (₹1000/माह)'],
    dontsEn: ['Do NOT stop medication midway even if feeling better', 'Do not spit openly'],
    dontsHi: ['ठीक महसूस होने पर भी बीच में दवा बंद न करें', 'खुले में यहां-वहां न थूकें']
  },
  {
    id: 'typhoid_fever',
    nameEn: 'Typhoid Fever',
    nameHi: 'टाइफाइड (मियादी बुखार)',
    category: 'infectious',
    categoryLabelEn: 'Bacterial Disease',
    categoryLabelHi: 'जीवाणु रोग',
    iconName: 'Thermometer',
    symptomsEn: ['Continuous high fever increasing day by day (Step-ladder fever)', 'Severe stomach pain and constipation or diarrhea', 'Extreme weakness and loss of appetite', 'Coated white tongue'],
    symptomsHi: ['दिन-ब-दिन बढ़ता हुआ तेज बुखार (सीढ़ीदार बुखार)', 'पेट में तेज दर्द और कब्ज या दस्त', 'अत्यधिक कमजोरी और भूख न लगना', 'जीभ पर सफेद परत जमना'],
    warningSignsEn: ['High fever for >5 days', 'Intense abdominal swelling', 'Confusion or delirium'],
    warningSignsHi: ['5 दिनों से अधिक समय तक तेज बुखार रहना', 'पेट में अत्यधिक सूजन व कड़ापन', 'बेहोशी या बड़बड़ाना'],
    whenToSeekDoctorEn: 'Get Widal test or Blood Culture done at PHC within 3 days of step-ladder fever.',
    whenToSeekDoctorHi: 'बुखार बढ़ने पर 3 दिनों के भीतर प्राथमिक स्वास्थ्य केंद्र पर खून की जांच (टाइफाइड टेस्ट) कराएं।',
    dosEn: ['Drink only boiled or chlorinated water', 'Eat soft, easily digestible food (Khichdi, Dalia)', 'Take full course of prescribed antibiotics'],
    dosHi: ['केवल उबला हुआ या साफ़ पानी पीएं', 'सुपाच्य हल्का भोजन लें (खिचड़ी, दलिया)', 'डॉक्टर द्वारा दी गई एंटीबायोटिक की पूरी खुराक लें'],
    dontsEn: ['Do not eat roadside cut fruits or open food', 'Do not stop antibiotics early when fever drops'],
    dontsHi: ['बाजार में कटे हुए फल या खुला खाना न खाएं', 'बुखार उतरते ही दवा बंद न करें']
  },
  {
    id: 'anemia',
    nameEn: 'Anemia & Iron Deficiency',
    nameHi: 'एनीमिया (शरीर में खून/हीमोग्लोबिन की कमी)',
    category: 'chronic',
    categoryLabelEn: 'Nutritional Deficiency',
    categoryLabelHi: 'पोषण की कमी',
    iconName: 'Droplets',
    symptomsEn: ['Pale skin, tongue, and inner eyelids', 'Constant tiredness & dizziness on standing', 'Shortness of breath on mild walking', 'Brittle nails & cold hands/feet'],
    symptomsHi: ['त्वचा, जीभ और आंखों के अंदर पीलापन या सफेदी', 'लगातार थकान और खड़े होने पर चक्कर आना', 'थोड़ा चलने पर भी सांस फूलना', 'नाखून टूटना और हाथ-पैर ठंडे रहना'],
    warningSignsEn: ['Hemoglobin below 7 g/dL', 'Severe swelling in feet', 'Frequent fainting spells'],
    warningSignsHi: ['हीमोग्लोबिन 7 ग्राम से कम होना', 'पैरों में अत्यधिक सूजन आना', 'बार-बार चक्कर खाकर गिरना'],
    whenToSeekDoctorEn: 'Visit Anganwadi or Sub-Centre for free Hemoglobin test and Iron Folic Acid (IFA) tablets.',
    whenToSeekDoctorHi: 'मुफ्त हीमोग्लोबिन जांच और आयरन-फॉलिक एसिड (IFA) गोलियों के लिए आंगनवाड़ी या स्वास्थ्य उप-केंद्र जाएं।',
    dosEn: ['Eat iron-rich foods: Spinach, Jaggery (Gur), Chana, Beetroot, Dates', 'Take Vitamin C (Lemon/Amla) with meals to boost iron absorption'],
    dosHi: ['आयरन युक्त भोजन खाएं: पालक, गुड़, भुना चना, चुकंदर, खजूर', 'आयरन के बेहतर अवशोषण के लिए भोजन के साथ नींबू या आंवला लें'],
    dontsEn: ['Do not drink tea or coffee immediately after meals', 'Do not take iron tablets on an empty stomach if nauseous'],
    dontsHi: ['खाने के तुरंत बाद चाय या कॉफी न पीएं', 'आयरन की गोली को चाय-दूध के साथ न लें']
  },
  {
    id: 'asthma_copd',
    nameEn: 'Asthma & Breathing Difficulty',
    nameHi: 'दमा (अस्थमा) और सांस फूलना',
    category: 'chronic',
    categoryLabelEn: 'Respiratory',
    categoryLabelHi: 'श्वसन रोग',
    iconName: 'Activity',
    symptomsEn: ['Wheezing sound during breathing', 'Tightness in chest', 'Dry cough worsening at night/early morning', 'Shortness of breath during exertion'],
    symptomsHi: ['सांस लेते समय सीटी जैसी आवाज आना', 'छाती में जकड़न महसूस होना', 'रात या सुबह तड़के सूखी खांसी का बढ़ना', 'थोड़ी मेहनत पर सांस फूलना'],
    warningSignsEn: ['Inability to speak full sentences due to breathlessness', 'Blue lips or fingernails', 'Inhaler not providing relief'],
    warningSignsHi: ['सांस फूलने के कारण एक सांस में बोल न पाना', 'होंठ या नाखूनों का नीला पड़ना', 'इनहेलर लेने पर भी आराम न मिलना'],
    whenToSeekDoctorEn: 'Visit CHC or District Hospital immediately during acute attack for oxygen & nebulization support.',
    whenToSeekDoctorHi: 'सांस का गंभीर दौरा पड़ने पर तुरंत ऑक्सीजन और नेबुलाइजर की सुविधा वाले निकटतम अस्पताल जाएं।',
    dosEn: ['Use doctor-prescribed inhalers regularly', 'Keep house free from dust, smoke, and agarbatti smoke', 'Cover mouth and nose with scarf during winter'],
    dosHi: ['डॉक्टर द्वारा सुझाये गए इनहेलर का नियमित उपयोग करें', 'घर को धूल, बीड़ी-सिगरेट और अगरबत्ती के धुएं से मुक्त रखें', 'सर्दियों में मुंह व नाक को सूती कपड़े से ढकें'],
    dontsEn: ['Do not smoke or stay near chulha smoke', 'Do not discontinue inhaler therapy without consulting doctor'],
    dontsHi: ['धूम्रपान न करें और चूल्हे के धुएं से बचें', 'डॉक्टर की सलाह के बिना इनहेलर लेना अचानक बंद न करें']
  },
  {
    id: 'jaundice_hepatitis',
    nameEn: 'Jaundice & Liver Inflammation',
    nameHi: 'पीलिया और लिवर में सूजन',
    category: 'infectious',
    categoryLabelEn: 'Gastrointestinal & Liver',
    categoryLabelHi: 'लिवर एवं पाचन रोग',
    iconName: 'HeartPulse',
    symptomsEn: ['Yellow discoloration of eyes and urine', 'Loss of appetite and nausea', 'Pale or clay-colored stool', 'Mild pain on upper right side of stomach'],
    symptomsHi: ['आंखों और पेशाब का गहरा पीला होना', 'भूख बिल्कुल न लगना और उल्टी का मन होना', 'हल्के या मिट्टी जैसे रंग का मल आना', 'पेट के दाहिने ऊपरी हिस्से में मीठा दर्द'],
    warningSignsEn: ['Severe persistent vomiting', 'Extreme drowsiness or mental confusion', 'Bleeding from nose or gums'],
    warningSignsHi: ['लगातार तेज उल्टी होना', 'अत्यधिक सुस्ती या बेहोशी छाना', 'नाक या मसूड़ों से खून आना'],
    whenToSeekDoctorEn: 'Get Liver Function Test (LFT) done at nearest PHC/Civil Hospital.',
    whenToSeekDoctorHi: 'प्राथमिक स्वास्थ्य केंद्र या जिला अस्पताल पर लिवर फंक्शन टेस्ट (LFT) कराएं।',
    dosEn: ['Drink clean boiled water and fresh sugarcane juice (hygienic)', 'Eat light boiled meals (Boiled Rice, Papaya, Radish)', 'Take complete physical rest'],
    dosHi: ['उबला पानी और साफ़ जगह से गन्ने का रस पीएं', 'हल्का उबला भोजन खाएं (उबले चावल, पपीता, मूली)', 'शरीर को पूरा आराम दें'],
    dontsEn: ['Avoid fried, oily, spicy foods and alcohol strictly', 'Do not take unverified herbal powders or traditional quack mixtures'],
    dontsHi: ['तले-भुने, मसालेदार भोजन और शराब से सख्त परहेज करें', 'किसी अप्रमाणित जड़ी-बूटी या देसी पुड़िया का सेवन न करें']
  },
  {
    id: 'fungal_skin_infection',
    nameEn: 'Fungal Skin Infection (Ringworm/Itching)',
    nameHi: 'दाद, खाज और खुजली (फंगल इन्फेक्शन)',
    category: 'seasonal',
    categoryLabelEn: 'Skin Disease',
    categoryLabelHi: 'त्वचा रोग',
    iconName: 'Activity',
    symptomsEn: ['Red circular ring-like patches on skin', 'Severe itching worsening at night & during sweating', 'Peeling or flaking of skin in body folds', 'Rashes in waist, thighs or toes'],
    symptomsHi: ['त्वचा पर लाल गोल चकत्ते (दाद) बनना', 'पसीना आने और रात में तेज खुजली होना', 'जांघों, कमर या उंगलियों के बीच त्वचा छिलना', 'चकत्तों का धीरे-धीरे फैलना'],
    warningSignsEn: ['Pus formation or yellow crusting in rashes', 'Spreading over more than half of the body'],
    warningSignsHi: ['खुजली वाले स्थान पर मवाद या पीली पपड़ी जमना', 'शरीर के बड़े हिस्से में इन्फेक्शन फैलना'],
    whenToSeekDoctorEn: 'Consult Medical Officer at PHC for antifungal ointment and oral tablets.',
    whenToSeekDoctorHi: 'फंगस विरोधी मरहम और सही दवाओं के लिए प्राथमिक स्वास्थ्य केंद्र पर डॉक्टर को दिखाएं।',
    dosEn: ['Wear loose, dry cotton clothes', 'Keep skin folds clean and dry', 'Wash clothes separately with hot water and iron inside-out'],
    dosHi: ['सूती, ढीले और सूखे कपड़े पहनें', 'शरीर के जोड़ों और पसीने वाली जगहों को सुखा रखें', 'कपड़ों को गर्म पानी से धोएं और उल्टा करके धूप में सुखाएं'],
    dontsEn: ['Do NOT use steroid creams (Betnovate, Quadriderm) without prescription', 'Do not share soaps, towels or clothes'],
    dontsHi: ['बिना डॉक्टर पूछे स्टेरॉयड वाली क्रीम (बेटनोवेट, क्वाड्रीडर्म) कतई न लगाएं (इससे फंगस जड़ से बढ़ जाता है)', 'दूसरों के तौलिए या कपड़े इस्तेमाल न करें']
  },
  {
    id: 'pneumonia_child',
    nameEn: 'Childhood Pneumonia',
    nameHi: 'बच्चों में निमोनिया (पसली चलना)',
    category: 'infectious',
    categoryLabelEn: 'Pediatric Emergency',
    categoryLabelHi: 'बाल रोग आपातकाल',
    iconName: 'Activity',
    symptomsEn: ['High fever with severe coughing', 'Fast breathing (more than 50 breaths/min in infants)', 'Chest chest-indrawing (lower chest sinks in while breathing)', 'Refusal to feed or drink water'],
    symptomsHi: ['तेज बुखार के साथ तेज खांसी होना', 'तेजी से सांस चलना (शिशु में 50 से ज्यादा बार सांस लेना)', 'छाती/पसली अंदर धंसना (सांस लेते समय पसली चलना)', 'दूध या पानी पीने से मना करना'],
    warningSignsEn: ['Chest indrawing', 'Stridor (noisy breathing while resting)', 'Inability to drink or extreme lethargy'],
    warningSignsHi: ['पसली धंसना', 'सांस लेते समय घड़घड़ाहट की आवाज', 'बच्चे का अत्यधिक सुस्त या बेहोश होना'],
    whenToSeekDoctorEn: 'Pneumonia in children is a life-threatening emergency. Visit CHC/PHC immediately!',
    whenToSeekDoctorHi: 'बच्चों में निमोनिया जानलेवा हो सकता है। पसली चलने पर तुरंत 108 एम्बुलेंस से नजदीकी अस्पताल जाएं!',
    dosEn: ['Keep child warm and dry', 'Continue frequent breastfeeding for infants', 'Get PCV vaccination on time at Anganwadi'],
    dosHi: ['बच्चे को गर्म और सूखे कपड़ों में रखें', 'मां का दूध बार-बार पिलाते रहें', 'आंगनवाड़ी में समय पर निमोनिया का टीका (PCV) लगवाएं'],
    dontsEn: ['Do NOT wait or delay hospital visit when chest sinks in', 'Do not wrap child in suffocating heavy blankets'],
    dontsHi: ['पसली चलने पर अस्पताल जाने में एक घंटे की भी देरी न करें', 'बच्चे का मुंह और नाक कपड़े से न दबाएं']
  },
  {
    id: 'arthritis_joint_pain',
    nameEn: 'Arthritis & Knee/Joint Pain',
    nameHi: 'गठिया, जोड़ों का दर्द और घुटनों की सूजन',
    category: 'chronic',
    categoryLabelEn: 'Bone & Joint Health',
    categoryLabelHi: 'हड्डी एवं जोड़ रोग',
    iconName: 'Activity',
    symptomsEn: ['Pain, stiffness, and swelling in knees, ankles or fingers', 'Difficulty standing up from floor or climbing stairs', 'Morning stiffness lasting >30 minutes'],
    symptomsHi: ['घुटनों, टखनों या उंगलियों के जोड़ों में दर्द और सूजन', 'जमीन से उठने या सीढ़ियां चढ़ने में तकलीफ', 'सुबह उठने पर जोड़ों में अकड़न रहना'],
    warningSignsEn: ['Sudden red, hot, swollen joint with high fever (Septic arthritis)', 'Inability to bear any weight on leg'],
    warningSignsHi: ['जोड़ का अचानक अत्यधिक लाल, गर्म और सूज जाना साथ में तेज बुखार', 'पैर पर बिल्कुल वजन न रख पाना'],
    whenToSeekDoctorEn: 'Visit Medical Officer or NCD clinic at PHC for joint care, calcium, and physiotherapy advice.',
    whenToSeekDoctorHi: 'जोड़ों की देखभाल और उपयुक्त फिजियोथेरेपी सलाह के लिए प्राथमिक स्वास्थ्य केंद्र पर डॉक्टर से परामर्श लें।',
    dosEn: ['Do gentle daily joint mobility exercises & light walking', 'Apply warm compress on stiff joints', 'Maintain healthy body weight to reduce knee load'],
    dosHi: ['प्रतिदिन हल्का व्यायाम और टहलना जारी रखें', 'जोड़ों की हल्के गर्म पानी या सिकाई करें', 'घुटनों पर बोझ कम करने के लिए वजन नियंत्रित रखें'],
    dontsEn: ['Do NOT consume painkiller tablets daily without doctor supervision (damages kidneys)', 'Avoid high-impact jumping'],
    dontsHi: ['बिना डॉक्टर की राय के रोजाना दर्द निवारक गोलियां (पेनकिलर) न खाएं (इससे गुर्दे खराब हो सकते हैं)', 'जोड़ों पर झटका न दें']
  },
  {
    id: 'gastritis_ulcer',
    nameEn: 'Gastritis, Acidity & Stomach Ulcer',
    nameHi: 'पेट में गैस, एसिडिटी और अल्सर',
    category: 'chronic',
    categoryLabelEn: 'Gastrointestinal',
    categoryLabelHi: 'पेट एवं पाचन रोग',
    iconName: 'Droplets',
    symptomsEn: ['Burning sensation in upper chest/stomach (Heartburn)', 'Sour belching (sour taste in mouth)', 'Bloating and feeling full quickly', 'Nausea after meals'],
    symptomsHi: ['सीने और पेट के ऊपरी हिस्से में जलन होना', 'खट्टी डकारें आना और मुंह में कड़वा पानी आना', 'पेट फूलना व भारीपन रहना', 'खाना खाने के बाद जी मिचलाना'],
    warningSignsEn: ['Vomiting blood or dark coffee-ground vomit', 'Black tarry stools', 'Unexplained sharp severe stomach pain'],
    warningSignsHi: ['उल्टी में खून या काले रंग का पदार्थ आना', 'काले रंग का लसदार मल आना', 'पेट में अचानक तेज बर्दाश्त न होने वाला दर्द'],
    whenToSeekDoctorEn: 'Visit PHC for antacids or H2-blockers if acidity persists >1 week.',
    whenToSeekDoctorHi: 'यदि एसिडिटी 1 सप्ताह से अधिक रहे तो जांच व उचित दवा के लिए पीएचसी जाएं।',
    dosEn: ['Eat small, frequent meals at fixed times', 'Drink plenty of water and buttermilk (Chach)', 'Elevate head on pillow while sleeping'],
    dosHi: ['समय पर थोड़ा-थोड़ा सुपाच्य खाना खाएं', 'पर्याप्त मात्रा में पानी और ताजी छाछ पीएं', 'सोते समय सिर को थोड़ा ऊंचा रखें'],
    dontsEn: ['Avoid spicy, fried foods, tea, gutkha, and alcohol', 'Do not lie down immediately after eating dinner'],
    dontsHi: ['अत्यधिक मिर्च-मसाले, चाय, तंबाकू-गुटखा और शराब से बचें', 'रात का खाना खाते ही तुरंत न सोएं (कम से कम 1 घंटा रुकें)']
  },
  {
    id: 'kidney_stones',
    nameEn: 'Kidney Stones (Renal Colic)',
    nameHi: 'गुर्दे की पथरी (पथरी का दर्द)',
    category: 'chronic',
    categoryLabelEn: 'Urinary Health',
    categoryLabelHi: 'मूत्र एवं गुर्दा रोग',
    iconName: 'Activity',
    symptomsEn: ['Sudden severe sharp pain in lower back radiating to lower abdomen/groin', 'Painful urination and burning feeling', 'Urge to urinate frequently in small amounts', 'Pink or reddish urine'],
    symptomsHi: ['पीठ के निचले हिस्से में अचानक उठने वाला असहनीय दर्द जो पेट के निचले हिस्से या जांघ तक जाता है', 'पेशाब में तेज जलन और दर्द होना', 'बार-बार थोड़ा-थोड़ा पेशाब आना', 'पेशाब का रंग लाल या गुलाबी होना'],
    warningSignsEn: ['High fever with chills and severe kidney pain (Kidney infection)', 'Complete stoppage of urine'],
    warningSignsHi: ['तेज बुखार के साथ ठंड लगना और कमर में तेज दर्द', 'पेशाब का पूरी तरह बंद हो जाना'],
    whenToSeekDoctorEn: 'Visit PHC/Civil Hospital for Ultrasound (USG) and antispasmodic pain management.',
    whenToSeekDoctorHi: 'अल्ट्रासाउंड जांच और सुरक्षित दर्द निवारक इलाज के लिए तुरंत निकटतम अस्पताल जाएं।',
    dosEn: ['Drink 3 to 4 liters of clean water daily', 'Lemon water (citric acid) helps prevent stone growth', 'Urinate whenever you feel the urge'],
    dosHi: ['रोजाना 3 से 4 लीटर साफ पानी पीएं', 'नींबू पानी का सेवन करें (साइट्रिक एसिड पथरी को बढ़ने से रोकता है)', 'पेशाब को रोककर न रखें'],
    dontsEn: ['Do not consume excess salt, tomato seeds, or aerated soft drinks', 'Do not ignore pain accompanied by fever'],
    dontsHi: ['अधिक नमक, टमाटर के बीज और कोल्ड ड्रिंक्स के सेवन से बचें', 'दर्द के साथ बुखार आने पर देर न करें']
  },
  {
    id: 'rabies_animal_bite',
    nameEn: 'Animal Bite & Rabies Prevention',
    nameHi: 'कुत्ता या जानवर का काटना (रेबीज से बचाव)',
    category: 'infectious',
    categoryLabelEn: 'Emergency Infectious',
    categoryLabelHi: 'आपातकालीन संक्रामक',
    iconName: 'Thermometer',
    symptomsEn: ['Scratch, tooth mark, or bleeding wound caused by dog, cat, or monkey', 'Danger of fatal Rabies virus infection if left untreated'],
    symptomsHi: ['कुत्ते, बिल्ली या बंदर के काटने से घाव या खरोंच बनना', 'इलाज न कराने पर जानलेवा रेबीज बीमारी का खतरा'],
    warningSignsEn: ['Hydrophobia (fear of water)', 'Aggressive behavior and spasms (Rabies has 100% mortality once symptoms appear - ALWAYS PREVENT IT WITH VACCINE)'],
    warningSignsHi: ['पानी से डर लगना (हाइड्रोफोबिया)', 'रेबीज के लक्षण दिखने पर इलाज असंभव है (टीका ही एकमात्र बचाव है)'],
    whenToSeekDoctorEn: 'Visit PHC/Civil Hospital immediately within 24 hours for FREE Anti-Rabies Vaccine (ARV).',
    whenToSeekDoctorHi: 'काटने के 24 घंटे के भीतर सरकारी अस्पताल जाकर मुफ़्त एंटी-रेबीज़ टीका (ARV) अनिवार्य रूप से लगवाएं!',
    dosEn: ['Wash the bite wound immediately under running tap water with soap for FULL 15 MINUTES', 'Apply antiseptic solution (Betadine)', 'Get the full 4-dose ARV vaccination schedule (Day 0, 3, 7, 28)'],
    dosHi: ['घाव को बहते पानी के नीचे साबुन से पूरे 15 मिनट तक लगातार धोएं', 'धोने के बाद एंटीसेप्टिक (बीटाडीन) लगाएं', 'एंटी-रेबीज टीके की सभी खुराक (दिन 0, 3, 7, 28) समय पर लें'],
    dontsEn: ['Do NOT apply chili powder, lime, mud, or cow dung on wound', 'Do NOT stitch the bite wound immediately'],
    dontsHi: ['घाव पर लाल मिर्च, चूना, मिट्टी या गोबर कतई न लगाएं (इससे इन्फेक्शन बढ़ता है)', 'घाव पर बिना डॉक्टर की सलाह के टांके न लगवाएं']
  }
];

export const EMERGENCY_FIRST_AID: EmergencyFirstAid[] = [
  {
    id: 'snake_bite',
    titleEn: 'Snake Bite',
    titleHi: 'सांप का काटना',
    icon: 'ShieldAlert',
    color: 'bg-rose-600',
    severity: 'critical',
    overviewEn: 'Remain calm. Keep victim still. Snake bites can be treated with Anti-Snake Venom at PHC/Hospital.',
    overviewHi: 'शांत रहें। मरीज को स्थिर रखें। सभी जहरीले सांप के काटने का इलाज एंटी-स्नेक वेनम से सरकारी अस्पताल में उपलब्ध है।',
    stepsEn: [
      { stepNumber: 1, title: 'Keep Calm & Still', instruction: 'Do NOT allow victim to walk or run. Movement speeds up venom circulation.' },
      { stepNumber: 2, title: 'Remove Tight Items', instruction: 'Remove rings, anklets, bangles, or tight clothing near the bite area before swelling occurs.' },
      { stepNumber: 3, title: 'Immobilize the Limb', instruction: 'Immobilize the bitten arm/leg with a stick or splint like a fractured bone. Keep limb at or below heart level.' },
      { stepNumber: 4, title: 'Transport to Hospital', instruction: 'Immediately carry the person to nearest Government Hospital / PHC having Anti-Snake Venom (ASV).' }
    ],
    stepsHi: [
      { stepNumber: 1, title: 'मरीज को शांत और स्थिर रखें', instruction: 'मरीज को चलने या भागने न दें। हिलने-डुलने से जहर शरीर में तेजी से फैलता है।' },
      { stepNumber: 2, title: 'कसे हुए सामान उतारें', instruction: 'सूजन आने से पहले डंक वाले स्थान के पास की अंगूठी, कड़ा, पायल या कसे कपड़े उतार दें।' },
      { stepNumber: 3, title: 'अंग को स्थिर रखें', instruction: 'काटे गए हाथ या पैर को लकड़ी की पट्टी से बांधकर स्थिर रखें (जैसे हड्डी टूटने पर बांधते हैं)।' },
      { stepNumber: 4, title: 'अस्पताल पहुंचाएं', instruction: 'मरीज को तुरंत एम्बुलेंस या वाहन से एंटी-स्नेक वेनम वाले निकटतम सरकारी अस्पताल ले जाएं।' }
    ],
    dosEn: ['Keep the victim reassuringly calm', 'Note down physical features of the snake if seen safely', 'Call 108 Ambulance instantly'],
    dosHi: ['मरीज को ढांढस बंधाएं', 'यदि सुरक्षित रूप से देखा हो तो सांप का रंग या आकार याद रखें', 'तुरंत 108 एम्बुलेंस बुलाएं'],
    dontsEn: ['Do NOT tie tight tourniquets/ropes', 'Do NOT cut the wound or suck venom with mouth', 'Do NOT visit traditional healers or quacks'],
    dontsHi: ['घाव के ऊपर कसी हुई रस्सी या कपड़ा न बांधें', 'घाव पर चीरा न लगाएं और मुंह से जहर न चूसें', 'झाड़-फूंक या तांत्रिक के पास जाकर समय बर्बाद न करें']
  },
  {
    id: 'burns',
    titleEn: 'Thermal Burns & Fire Injuries',
    titleHi: 'जलना और आग से चोट',
    icon: 'Flame',
    color: 'bg-amber-600',
    severity: 'high',
    overviewEn: 'Cool the burn under clean running tap water for 15-20 minutes. Do not apply ghee or paste.',
    overviewHi: 'जले हुए हिस्से पर तुरंत 15-20 मिनट तक साफ बहता पानी डालें। घी या कोलगेट न लगाएं।',
    stepsEn: [
      { stepNumber: 1, title: 'Cool with Water', instruction: 'Pour cool running water over the burn for at least 15 minutes. Never use ice.' },
      { stepNumber: 2, title: 'Cover Cleanly', instruction: 'Cover the burned area loosely with a clean dry cloth or sterile plastic wrap.' },
      { stepNumber: 3, title: 'Give Oral Fluids', instruction: 'If conscious and swallowable, give ORS water or clean water to drink.' },
      { stepNumber: 4, title: 'Seek Medical Help', instruction: 'Take to PHC if burn is larger than palm size, on face, hands, or in children.' }
    ],
    stepsHi: [
      { stepNumber: 1, title: 'ठंडे पानी से ठंडा करें', instruction: 'जले स्थान पर कम से कम 15-20 मिनट साफ नल का पानी डालें। बर्फ का इस्तेमाल न करें।' },
      { stepNumber: 2, title: 'साफ कपड़े से ढकें', instruction: 'जले हुए हिस्से को साफ और सूखे कपड़े से ढीला ढकें।' },
      { stepNumber: 3, title: 'तरल पदार्थ दें', instruction: 'यदि मरीज होश में हो, तो उसे ओआरएस या साफ पानी पीने को दें।' },
      { stepNumber: 4, title: 'अस्पताल जाएं', instruction: 'यदि जलने का निशान हथेली से बड़ा हो या चेहरे पर हो तो तुरंत अस्पताल जाएं।' }
    ],
    dosEn: ['Use cool tap water', 'Keep victim warm with dry blanket around unburned areas'],
    dosHi: ['साफ नल के ठंडे पानी का इस्तेमाल करें', 'बिना जले हिस्से को सूखे कंबल से ढकें'],
    dontsEn: ['Do NOT apply ghee, toothpaste, mud, or ink on burns', 'Do NOT burst blisters'],
    dontsHi: ['जले पर घी, टूथपेस्ट, मिट्टी या स्याही न लगाएं', 'फफोले (छाले) को न फोड़ें']
  },
  {
    id: 'severe_bleeding',
    titleEn: 'Severe Bleeding & Cuts',
    titleHi: 'अत्यधिक रक्तस्राव (खून बहना)',
    icon: 'Droplet',
    color: 'bg-rose-700',
    severity: 'critical',
    overviewEn: 'Apply direct firm pressure with a clean cloth directly over the bleeding wound.',
    overviewHi: 'खून बहने वाले घाव पर साफ कपड़े से सीधा और तेज दबाव बनाएं।',
    stepsEn: [
      { stepNumber: 1, title: 'Apply Direct Pressure', instruction: 'Press a clean cloth firmly directly onto the bleeding site with your hand.' },
      { stepNumber: 2, title: 'Elevate Limb', instruction: 'If on arm or leg, raise the bleeding limb above heart level if no fracture.' },
      { stepNumber: 3, title: 'Keep Bandage On', instruction: 'Do not remove blood-soaked cloth; add more cloth on top and maintain pressure.' },
      { stepNumber: 4, title: 'Transport Immediately', instruction: 'Rush to nearest health facility for stiches and tetanus shot.' }
    ],
    stepsHi: [
      { stepNumber: 1, title: 'सीधा दबाव बनाएं', instruction: 'घाव पर साफ कपड़ा रखकर हाथ से जोर से दबाएं।' },
      { stepNumber: 2, title: 'अंग को ऊपर उठाएं', instruction: 'यदि हाथ या पैर से खून बह रहा हो तो उसे दिल के स्तर से ऊपर उठाएं।' },
      { stepNumber: 3, title: 'पट्टी न हटाएं', instruction: 'खून से भीगे कपड़े को न हटाएं, उसके ऊपर दूसरा कपड़ा रखकर दबाए रखें।' },
      { stepNumber: 4, title: 'अस्पताल ले जाएं', instruction: 'टांके और टिटनेस के इंजेक्शन के लिए तुरंत अस्पताल ले जाएं।' }
    ],
    dosEn: ['Keep direct pressure continuous', 'Keep victim lying down and warm'],
    dosHi: ['लगातार दबाव बनाए रखें', 'मरीज को लिटाकर रखें'],
    dontsEn: ['Do NOT wash large deep wounds with dirty water', 'Do NOT remove embedded objects in wound'],
    dontsHi: ['गहरे घाव को गंदे पानी से न धोएं', 'घाव में धंसी हुई चीज (जैसे कांच/लकड़ी) को बाहर न निकालें']
  },
  {
    id: 'electric_shock',
    titleEn: 'Electric Shock',
    titleHi: 'बिजली का झटका (करंट लगना)',
    icon: 'Zap',
    color: 'bg-amber-500',
    severity: 'critical',
    overviewEn: 'Turn off power main switch immediately before touching the person.',
    overviewHi: 'मरीज को छूने से पहले तुरंत घर की मेन पावर स्विच (एमसीबी) बंद करें।',
    stepsEn: [
      { stepNumber: 1, title: 'Cut the Power', instruction: 'Turn off electricity source or push victim away using a dry wooden stick/bamboo. Never use metal or wet objects.' },
      { stepNumber: 2, title: 'Check Breathing', instruction: 'Check if person is breathing and responsive.' },
      { stepNumber: 3, title: 'Perform CPR if trained', instruction: 'If unconscious and not breathing, start chest compressions.' },
      { stepNumber: 4, title: 'Call 108 Emergency', instruction: 'Get emergency medical help even if person appears okay, as internal electrical burns occur.' }
    ],
    stepsHi: [
      { stepNumber: 1, title: 'बिजली का कनेक्शन काटें', instruction: 'मेन स्विच बंद करें या सूखी लकड़ी/बांस से मरीज को तार से दूर करें। गीली चीज या धातु का उपयोग न करें।' },
      { stepNumber: 2, title: 'सांस की जांच करें', instruction: 'देखें कि मरीज सांस ले रहा है या नहीं।' },
      { stepNumber: 3, title: 'सीपीआर (CPR) दें', instruction: 'यदि सांस न आ रही हो तो सीने पर दबाव (CPR) शुरू करें।' },
      { stepNumber: 4, title: '108 पर कॉल करें', instruction: 'मरीज ठीक दिखे तब भी अंदरूनी चोट के लिए अस्पताल ले जाएं।' }
    ],
    dosEn: ['Use dry wooden stick', 'Stand on dry rubber mat or wooden board'],
    dosHi: ['सूखी लकड़ी के डंडे का प्रयोग करें', 'सूखी चप्पल या लकड़ी के पाटे पर खड़े हों'],
    dontsEn: ['Do NOT touch victim directly while connected to power', 'Do NOT use water near electric wire'],
    dontsHi: ['करंट से चिपके व्यक्ति को नंगे हाथों से न छूएं', 'बिजली के तारों के पास पानी न डालें']
  }
];

export const MEDICINES: Medicine[] = [
  {
    id: 'paracetamol',
    brandName: 'Crocin / Calpol 650mg',
    genericName: 'Paracetamol 650mg (Jan Aushadhi)',
    categoryEn: 'Fever & Pain Relief',
    categoryHi: 'बुखार एवं दर्द निवारक',
    purposeEn: 'Reduces high fever, headache, body pain and toothache.',
    purposeHi: 'तेज बुखार, सिरदर्द, शरीर दर्द और दांत दर्द को कम करता है।',
    brandPriceInr: 32.0,
    genericPriceInr: 5.5,
    savingsPercentage: 82,
    availabilityEn: 'Widely available at all Jan Aushadhi Kendras & PHC pharmacies',
    availabilityHi: 'सभी जन औषधि केंद्रों और पीएचसी पर उपलब्ध'
  },
  {
    id: 'amoxicillin',
    brandName: 'Moxkind / Novamox 500mg',
    genericName: 'Amoxicillin Trihydrate 500mg',
    categoryEn: 'Antibiotic (Doctor Prescription Required)',
    categoryHi: 'एंटीबायोटिक (डॉक्टर पर्ची जरूरी)',
    purposeEn: 'Treats bacterial infections of throat, chest, ear and skin.',
    purposeHi: 'गले, सीने, कान और त्वचा के जीवाणु (बैक्टीरियल) संक्रमण का इलाज।',
    brandPriceInr: 110.0,
    genericPriceInr: 22.0,
    savingsPercentage: 80,
    availabilityEn: 'Jan Aushadhi Kendra & Government Hospitals',
    availabilityHi: 'जन औषधि केंद्र और सरकारी अस्पताल'
  },
  {
    id: 'metformin',
    brandName: 'Glycomet 500mg',
    genericName: 'Metformin Hydrochloride 500mg',
    categoryEn: 'Diabetes Management',
    categoryHi: 'शुगर/मधुमेह नियंत्रण',
    purposeEn: 'Controls blood sugar levels in Type 2 Diabetes.',
    purposeHi: 'टाइप-2 मधुमेह में ब्लड शुगर के स्तर को नियंत्रित करता है।',
    brandPriceInr: 45.0,
    genericPriceInr: 9.0,
    savingsPercentage: 80,
    availabilityEn: 'Jan Aushadhi Kendra & NCD Clinics at PHC',
    availabilityHi: 'जन औषधि केंद्र और पीएचसी क्लिनिक'
  },
  {
    id: 'omeprazole',
    brandName: 'Omez 20mg',
    genericName: 'Omeprazole Capsules 20mg',
    categoryEn: 'Acidity & Stomach Ulcer',
    categoryHi: 'एसिडिटी एवं पेट में जलन',
    purposeEn: 'Reduces stomach acid, heartburn and treats acidity.',
    purposeHi: 'पेट के तेजाब (एसिड), सीने में जलन और गैस को कम करता है।',
    brandPriceInr: 68.0,
    genericPriceInr: 12.0,
    savingsPercentage: 82,
    availabilityEn: 'Jan Aushadhi Kendra',
    availabilityHi: 'जन औषधि केंद्र'
  },
  {
    id: 'cetirizine',
    brandName: 'Cetzine 10mg',
    genericName: 'Cetirizine Hydrochloride 10mg',
    categoryEn: 'Allergy & Cold',
    categoryHi: 'एलर्जी और जुकाम',
    purposeEn: 'Relieves sneezing, runny nose, allergic rashes and itching.',
    purposeHi: 'छींक, बहती नाक, त्वचा की खुजली और एलर्जी में राहत देता है।',
    brandPriceInr: 24.0,
    genericPriceInr: 4.0,
    savingsPercentage: 83,
    availabilityEn: 'Jan Aushadhi Kendra & Health Sub-Centres',
    availabilityHi: 'जन औषधि केंद्र व स्वास्थ्य उपकेंद्र'
  },
  {
    id: 'amlodipine',
    brandName: 'Amlokind / Stamlo 5mg',
    genericName: 'Amlodipine Besylate 5mg',
    categoryEn: 'High Blood Pressure (BP)',
    categoryHi: 'उच्च रक्तचाप (बीपी) नियंत्रण',
    purposeEn: 'Lowers high blood pressure and relaxes blood vessels to protect heart.',
    purposeHi: 'उच्च रक्तचाप (बीपी) को नियंत्रित करता है और दिल का दौरा रोकता है।',
    brandPriceInr: 38.0,
    genericPriceInr: 6.0,
    savingsPercentage: 84,
    availabilityEn: 'Jan Aushadhi Kendra & NCD Clinic PHC',
    availabilityHi: 'जन औषधि केंद्र और पीएचसी क्लिनिक'
  },
  {
    id: 'atorvastatin',
    brandName: 'Atorva / Lipivas 10mg',
    genericName: 'Atorvastatin Calcium 10mg',
    categoryEn: 'Heart & Cholesterol Care',
    categoryHi: 'कोलेस्ट्रॉल एवं हृदय सुरक्षा',
    purposeEn: 'Reduces bad cholesterol (LDL) and prevents heart stroke.',
    purposeHi: 'खराब कोलेस्ट्रॉल को कम करता है और दिल की बीमारियों से बचाता है।',
    brandPriceInr: 85.0,
    genericPriceInr: 14.0,
    savingsPercentage: 83,
    availabilityEn: 'Jan Aushadhi Kendra & District Hospital',
    availabilityHi: 'जन औषधि केंद्र एवं जिला अस्पताल'
  },
  {
    id: 'pantoprazole',
    brandName: 'Pan 40 / Pantocid 40mg',
    genericName: 'Pantoprazole Sodium 40mg',
    categoryEn: 'Acidity & Gastric Relief',
    categoryHi: 'एसिडिटी और पेट की जलन',
    purposeEn: 'Treats severe acidity, GERD, and stomach ulcers.',
    purposeHi: 'गंभीर एसिडिटी, सीने में जलन और पेट के छालों में आराम देता है।',
    brandPriceInr: 120.0,
    genericPriceInr: 18.0,
    savingsPercentage: 85,
    availabilityEn: 'Jan Aushadhi Kendra & All Govt Dispensaries',
    availabilityHi: 'जन औषधि केंद्र व सभी सरकारी डिस्पेंसरी'
  },
  {
    id: 'ors_sachet',
    brandName: 'Electral ORS Sachet (21.8g)',
    genericName: 'Oral Rehydration Salts (ORS) WHO Formula',
    categoryEn: 'Dehydration & Diarrhea Care',
    categoryHi: 'दस्त और डिहाइड्रेशन (पानी की कमी)',
    purposeEn: 'Restores essential body salts and fluids during diarrhea, vomiting & heat stroke.',
    purposeHi: 'दस्त, उल्टी और लू लगने पर शरीर में पानी व खनिजों की पूर्ति करता है।',
    brandPriceInr: 22.0,
    genericPriceInr: 4.5,
    savingsPercentage: 80,
    availabilityEn: 'FREE at Anganwadi, Sub-Centre & Jan Aushadhi',
    availabilityHi: 'आंगनवाड़ी, उपकेंद्र पर मुफ़्त व जन औषधि पर उपलब्ध'
  },
  {
    id: 'azithromycin',
    brandName: 'Azee / Aziwok 500mg',
    genericName: 'Azithromycin 500mg',
    categoryEn: 'Antibiotic (Prescription Required)',
    categoryHi: 'एंटीबायोटिक (डॉक्टर पर्ची जरूरी)',
    purposeEn: 'Treats respiratory chest infections, typhoid, and throat pain.',
    purposeHi: 'छाती का इन्फेक्शन, गले का संक्रमण और टाइफाइड बुखार ठीक करता है।',
    brandPriceInr: 135.0,
    genericPriceInr: 28.0,
    savingsPercentage: 79,
    availabilityEn: 'Jan Aushadhi Kendra & District Civil Hospitals',
    availabilityHi: 'जन औषधि केंद्र व जिला अस्पताल'
  },
  {
    id: 'telmisartan',
    brandName: 'Telma 40 / Telmikind 40mg',
    genericName: 'Telmisartan 40mg',
    categoryEn: 'High Blood Pressure & Kidney Care',
    categoryHi: 'उच्च बीपी और किडनी सुरक्षा',
    purposeEn: 'Effective daily medicine for chronic high BP control.',
    purposeHi: 'उच्च रक्तचाप (बीपी) को नियंत्रित कर गुर्दे और दिल की रक्षा करता है।',
    brandPriceInr: 92.0,
    genericPriceInr: 15.0,
    savingsPercentage: 83,
    availabilityEn: 'Jan Aushadhi Kendra & PHC OPD',
    availabilityHi: 'जन औषधि केंद्र एवं प्राथमिक स्वास्थ्य केंद्र'
  },
  {
    id: 'combiflam',
    brandName: 'Combiflam / Flexon Tablet',
    genericName: 'Ibuprofen 400mg + Paracetamol 325mg',
    categoryEn: 'Severe Joint & Muscle Pain Relief',
    categoryHi: 'जोड़ों व मांसपेशियों का दर्द',
    purposeEn: 'Fast relief in joint swelling, toothache, sprains and muscle soreness.',
    purposeHi: 'जोड़ों के दर्द, चोट, मोच और मांसपेशियों की सूजन में तुरंत आराम।',
    brandPriceInr: 42.0,
    genericPriceInr: 8.0,
    savingsPercentage: 81,
    availabilityEn: 'Jan Aushadhi Kendra',
    availabilityHi: 'जन औषधि केंद्र'
  },
  {
    id: 'iron_folic_acid',
    brandName: 'Dexorange / Autrin Syrup/Cap',
    genericName: 'Ferrous Sulfate + Folic Acid (IFA)',
    categoryEn: 'Anemia & Pregnancy Blood Builder',
    categoryHi: 'खून बढ़ाने की दवा (एनीमिया)',
    purposeEn: 'Cures hemoglobin deficiency in pregnant women, adolescent girls & weak patients.',
    purposeHi: 'गर्भवती महिलाओं और किशोरियों में खून (हीमोग्लोबिन) की कमी दूर करता है।',
    brandPriceInr: 160.0,
    genericPriceInr: 18.0,
    savingsPercentage: 88,
    availabilityEn: 'FREE at Anganwadi & PHC | Jan Aushadhi',
    availabilityHi: 'आंगनवाड़ी और पीएचसी पर मुफ़्त | जन औषधि'
  },
  {
    id: 'vitamin_d3',
    brandName: 'Uprise D3 60K / Calcirol Sachet',
    genericName: 'Cholecalciferol (Vitamin D3) 60,000 IU',
    categoryEn: 'Bone Strength & Calcium Absorber',
    categoryHi: 'हड्डियों की मजबूती (विटामिन D3)',
    purposeEn: 'Strengthens weak bones, cures rickets in children and knee pain in seniors.',
    purposeHi: 'कमजोर हड्डियों, घुटनों के दर्द और कैल्शियम की कमी को ठीक करता है।',
    brandPriceInr: 280.0,
    genericPriceInr: 35.0,
    savingsPercentage: 87,
    availabilityEn: 'Jan Aushadhi Kendra',
    availabilityHi: 'जन औषधि केंद्र'
  },
  {
    id: 'multivitamin_zinc',
    brandName: 'Zincovit / Becosules Capsules',
    genericName: 'Multivitamin + Multimineral + Zinc Capsules',
    categoryEn: 'Immunity & General Weakness',
    categoryHi: 'इम्युनिटी व सामान्य कमजोरी',
    purposeEn: 'Boosts immune power after fever, cures mouth ulcers and weakness.',
    purposeHi: 'रोग प्रतिरोधक क्षमता बढ़ाता है, मुंह के छाले और कमजोरी ठीक करता है।',
    brandPriceInr: 115.0,
    genericPriceInr: 22.0,
    savingsPercentage: 80,
    availabilityEn: 'Jan Aushadhi Kendra & PHCs',
    availabilityHi: 'जन औषधि केंद्र एवं प्राथमिक स्वास्थ्य केंद्र'
  },
  {
    id: 'montelukast_levo',
    brandName: 'Monticope / Telekast-L Tablet',
    genericName: 'Montelukast 10mg + Levocetirizine 5mg',
    categoryEn: 'Asthma & Cold Allergy',
    categoryHi: 'सांस की एलर्जी और नजला',
    purposeEn: 'Relieves chronic allergy, nighttime asthma coughing, and wheezing.',
    purposeHi: 'सांस फूलने, पुरानी एलर्जी, नजला और रात में खांसी आने से रोकता है।',
    brandPriceInr: 185.0,
    genericPriceInr: 32.0,
    savingsPercentage: 82,
    availabilityEn: 'Jan Aushadhi Kendra',
    availabilityHi: 'जन औषधि केंद्र'
  },
  {
    id: 'diclofenac_gel',
    brandName: 'Volini / Omnigel Spray/Ointment 30g',
    genericName: 'Diclofenac Sodium Gel 1% w/w',
    categoryEn: 'Topical Pain Relief Ointment',
    categoryHi: 'दर्द निवारक जेल (मरहम)',
    purposeEn: 'Instant local relief in sprains, backache, and swollen joints.',
    purposeHi: 'कमर दर्द, मोच, घुटनों के दर्द और खिंचाव में तुरंत आराम देता है।',
    brandPriceInr: 140.0,
    genericPriceInr: 25.0,
    savingsPercentage: 82,
    availabilityEn: 'Jan Aushadhi Kendra',
    availabilityHi: 'जन औषधि केंद्र'
  },
  {
    id: 'albendazole',
    brandName: 'Zentel / Bandy 400mg',
    genericName: 'Albendazole Chewable 400mg',
    categoryEn: 'Deworming for Children & Adults',
    categoryHi: 'पेट के कीड़ों की दवा (Deworming)',
    purposeEn: 'Kills stomach worms in children and adults to improve nutrition absorption.',
    purposeHi: 'बच्चों और बड़ों के पेट के कीड़े (कृमि) मारकर सेहत व भूख बढ़ाता है।',
    brandPriceInr: 18.0,
    genericPriceInr: 3.0,
    savingsPercentage: 83,
    availabilityEn: 'FREE on National Deworming Day at Schools | Jan Aushadhi',
    availabilityHi: 'स्कूलों व आंगनवाड़ी पर मुफ़्त | जन औषधि'
  },
  {
    id: 'calcium_vit_d3',
    brandName: 'Shelcal 500 / Cipcal 500',
    genericName: 'Calcium Carbonate 500mg + Vit D3 250 IU',
    categoryEn: 'Calcium Supplement',
    categoryHi: 'कैल्शियम सपलीमेंट',
    purposeEn: 'Prevents bone loss in elderly and pregnancy.',
    purposeHi: 'गर्भावस्था व बुजुर्गों में हड्डियों की कमजोरी और कैल्शियम पूर्ति करता है।',
    brandPriceInr: 130.0,
    genericPriceInr: 24.0,
    savingsPercentage: 81,
    availabilityEn: 'Jan Aushadhi Kendra & Sub-Centre',
    availabilityHi: 'जन औषधि केंद्र एवं उप-केंद्र'
  }
];

export const PHARMACIES: Pharmacy[] = [
  {
    id: 'p1',
    nameEn: 'PM Jan Aushadhi Kendra - Rampur PHC',
    nameHi: 'पीएम जन औषधि केंद्र - रामपुर पीएचसी',
    type: 'janAushadhi',
    addressEn: 'Near PHC Main Gate, Rampur Block, District Hospital Road',
    addressHi: 'पीएचसी मुख्य गेट के पास, रामपुर ब्लॉक, जिला अस्पताल रोड',
    distanceKm: 1.8,
    phone: '+91 98765 43210',
    timingsEn: '8:00 AM - 8:00 PM (All Days)',
    timingsHi: 'सुबह 8:00 से रात 8:00 बजे तक (प्रतिदिन)',
    lat: 26.8467,
    lng: 80.9462
  },
  {
    id: 'p2',
    nameEn: 'Government Sub-District Hospital Pharmacy',
    nameHi: 'सरकारी उप-जिला अस्पताल दवाखाना',
    type: 'government',
    addressEn: 'Sundarpur Sub-Division, Near Bus Stand',
    addressHi: 'सुंदरपुर अनुभाग, बस स्टैंड के पास',
    distanceKm: 4.5,
    phone: '+91 98765 11223',
    timingsEn: '24 Hours Emergency Service',
    timingsHi: '24 घंटे आपातकालीन सेवा',
    lat: 26.8521,
    lng: 80.9589
  },
  {
    id: 'p3',
    nameEn: 'Jan Aushadhi Store - Chandanpur Market',
    nameHi: 'जन औषधि स्टोर - चन्दनपुर बाजार',
    type: 'janAushadhi',
    addressEn: 'Shop No. 12, Main Market, Chandanpur',
    addressHi: 'दुकान नं. 12, मुख्य बाजार, चन्दनपुर',
    distanceKm: 6.2,
    phone: '+91 94150 99887',
    timingsEn: '9:00 AM - 7:00 PM (Closed Sunday)',
    timingsHi: 'सुबह 9:00 से शाम 7:00 बजे तक (रविवार बंद)',
    lat: 26.8390,
    lng: 80.9310
  }
];

export const HEALTHCARE_FACILITIES: HealthcareFacility[] = [
  {
    id: 'phc_rampur',
    nameEn: 'Rampur Primary Health Centre (PHC)',
    nameHi: 'रामपुर प्राथमिक स्वास्थ्य केंद्र (PHC)',
    type: 'phc',
    typeLabelEn: 'Primary Health Centre (Free Govt Care)',
    typeLabelHi: 'प्राथमिक स्वास्थ्य केंद्र (निःशुल्क सरकारी)',
    servicesEn: ['Outpatient Consultation (OPD)', 'Maternal & Child Vaccination', 'Free Blood & Urine Test Lab', 'Basic Delivery Room (24x7)', 'Jan Aushadhi Generic Pharmacy'],
    servicesHi: ['ओपीडी (OPD) परामर्श', 'मातृ एवं शिशु टीकाकरण', 'निःशुल्क खून व पेशाब जांच', '24 घंटे प्रसूति (डिलीवरी) सुविधा', 'जन औषधि जेनेरिक मेडिकल दुकान'],
    addressEn: 'Village Rampur, Post Office Kalan, Tehsil Sadar',
    addressHi: 'ग्राम रामपुर, पोस्ट कलां, तहसील सदर',
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
    addressEn: 'Main Highway Road, Sundarpur Block Headquarters',
    addressHi: 'मुख्य हाईवे रोड, सुंदरपुर ब्लॉक मुख्यालय',
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
    id: 'district_hosp',
    nameEn: 'District Government General Hospital',
    nameHi: 'जिला सरकारी मुख्य अस्पताल',
    type: 'district',
    typeLabelEn: 'District Civil Hospital (Specialist Services)',
    typeLabelHi: 'जिला नागरिक अस्पताल (विशेषज्ञ सेवाएं)',
    servicesEn: ['ICU & Trauma Care', 'Pediatric ICU (SNCU)', 'Dialysis Centre', 'Ayushman Bharat Desk (PM-JAY)', 'Free Medicine Distribution'],
    servicesHi: ['आईसीयू एवं ट्रॉमा सेंटर', 'बाल चिकित्सा आईसीयू (SNCU)', 'डायलिसिस केंद्र', 'आयुष्मान भारत हेल्पडेस्क', 'निःशुल्क दवा वितरण'],
    addressEn: 'Hospital Road, District Headquarters City',
    addressHi: 'अस्पताल मार्ग, जिला मुख्यालय शहर',
    distanceKm: 18.5,
    phone: '0522-2200108',
    openHoursEn: '24x7 Full Emergency & Hospital Care',
    openHoursHi: '24 घंटे पूर्ण आपातकालीन सेवा',
    hasEmergency: true,
    hasBedFacility: true,
    lat: 26.8300,
    lng: 80.9200
  }
];

export const HEALTH_SCHEMES: HealthScheme[] = [
  {
    id: 'ayushman_bharat',
    nameEn: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    nameHi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
    shortTagEn: '₹5 Lakh Free Treatment / Year',
    shortTagHi: '₹5 लाख तक का मुफ्त इलाज प्रति वर्ष',
    coverageEn: 'Up to ₹5,00,000 per family per year for secondary & tertiary hospital treatment.',
    coverageHi: 'प्रतिवर्ष प्रति परिवार ₹5,00,000 तक का मुफ्त अस्पताल इलाज।',
    descriptionEn: 'World\'s largest government-funded health assurance scheme covering hospitalization costs, surgeries, and medicines for eligible low-income families.',
    descriptionHi: 'पात्र परिवारों के लिए अस्पताल में भर्ती, ऑपरेशन, और दवाओं के खर्च को कवर करने वाली दुनिया की सबसे बड़ी स्वास्थ्य योजना।',
    eligibilityEn: [
      'Families listed in SECC 2011 database or possessing Ayushman / Ration Card',
      'Rural families with kutcha houses, landless laborers, or SC/ST households',
      'All senior citizens aged 70+ (newly expanded eligible)'
    ],
    eligibilityHi: [
      'सामाजिक आर्थिक जनगणना (SECC) या राशन कार्ड धारक पात्र परिवार',
      'कच्चे मकान वाले ग्रामीण परिवार, भूमिहीन मजदूर व अनुसूचित जाति/जनजाति',
      '70 वर्ष या उससे अधिक उम्र के सभी वरिष्ठ नागरिक'
    ],
    benefitsEn: [
      '100% Cashless treatment at empaneled government & private hospitals',
      'Covers 3 days pre-hospitalization and 15 days post-hospitalization costs',
      'Includes surgery, ICU, medicine, diagnostic tests & doctor fees'
    ],
    benefitsHi: [
      'सरकारी एवं सूचीबद्ध निजी अस्पतालों में 100% कैशलेस (मुफ्त) इलाज',
      'अस्पताल में भर्ती होने से 3 दिन पहले और 15 दिन बाद तक की जांच व दवा मुफ्त',
      'ऑपरेशन, आईसीयू, दवाइयां व डॉक्टर फीस शामिल'
    ],
    documentsEn: ['Aadhaar Card', 'Ration Card / Ayushman Card', 'Mobile Number linked with Aadhaar'],
    documentsHi: ['आधार कार्ड', 'राशन कार्ड / आयुष्मान कार्ड', 'आधार से लिंक मोबाइल नंबर'],
    howToApplyStepsEn: [
      'Visit your nearest Common Service Centre (CSC) or Ayushman Mitra at Government Hospital.',
      'Check eligibility with Aadhaar or Ration Card number.',
      'Get your free Ayushman Card created and printed.'
    ],
    howToApplyStepsHi: [
      'अपने निकटतम जन सेवा केंद्र (CSC) या सरकारी अस्पताल के आयुष्मान मित्र के पास जाएं।',
      'आधार कार्ड या राशन कार्ड नंबर से अपनी पात्रता चेक कराएं।',
      'अपना आयुष्मान कार्ड बनवाएं और डाउनलोड करें।'
    ],
    helpline: '14555 / 1800-111-565',
    portalUrl: 'https://pmjay.gov.in'
  },
  {
    id: 'janani_suraksha',
    nameEn: 'Janani Suraksha Yojana (JSY)',
    nameHi: 'जननी सुरक्षा योजना (JSY)',
    shortTagEn: 'Cash Assistance for Safe Delivery',
    shortTagHi: 'सुरक्षित प्रसव हेतु नकद सहायता',
    coverageEn: '₹1,400 cash financial aid for rural pregnant women delivering at health centers.',
    coverageHi: 'सरकारी या मान्यता प्राप्त अस्पताल में प्रसव कराने पर ₹1,400 की नकद वित्तीय सहायता।',
    descriptionEn: 'A safe motherhood intervention under National Health Mission reducing maternal and neonatal mortality by encouraging institutional deliveries.',
    descriptionHi: 'राष्ट्रीय स्वास्थ्य मिशन के तहत सुरक्षित मातृत्व योजना, जिसका उद्देश्य अस्पताल में प्रसव को बढ़ावा देना है।',
    eligibilityEn: ['Pregnant women from BPL / SC / ST rural families delivering at Govt Health Centre'],
    eligibilityHi: ['सरकारी स्वास्थ्य केंद्र में प्रसव कराने वाली बीपीएल / एससी / एसटी ग्रामीण गर्भवती महिलाएं'],
    benefitsEn: [
      '₹1,400 direct bank transfer to rural mother upon delivery',
      '₹600 incentive to ASHA worker for escorting mother to hospital',
      'Free transport (102 Ambulance) from home to hospital and back'
    ],
    benefitsHi: [
      'प्रसव के बाद ग्रामीण माता के बैंक खाते में ₹1,400 सीधे ट्रांसफर',
      'अस्पताल लाने वाली आशा (ASHA) बहन को ₹600 का प्रोत्साहन',
      'घर से अस्पताल जाने व वापस आने के लिए 102 एम्बुलेंस मुफ्त'
    ],
    documentsEn: ['Aadhaar Card', 'Bank Passbook (DPT linked)', 'MCP Card (Mamta / Anganwadi Card)'],
    documentsHi: ['आधार कार्ड', 'बैंक पासबुक (डीबीटी लिंक)', 'मातृ एवं शिशु सुरक्षा (MCP) कार्ड'],
    howToApplyStepsEn: [
      'Register your pregnancy with local ASHA worker or ANM at Anganwadi / Sub-Centre.',
      'Obtain Mother & Child Protection (MCP) Card.',
      'Deliver baby at Government PHC/CHC to receive automatic DBT payment.'
    ],
    howToApplyStepsHi: [
      'आंगनबाड़ी या एएनएम (ANM) के पास अपनी गर्भावस्था का पंजीकरण कराएं।',
      'मातृ एवं शिशु सुरक्षा (MCP) कार्ड प्राप्त करें।',
      'सरकारी अस्पताल में प्रसव कराएं और सीधे खाते में राशि पाएं।'
    ],
    helpline: '104 / 1800-180-1104',
    portalUrl: 'https://nhm.gov.in'
  }
];

export const VACCINATION_SCHEDULE: VaccinationItem[] = [
  {
    id: 'v1',
    ageGroupEn: 'At Birth (जन्म के समय)',
    ageGroupHi: 'जन्म के समय',
    vaccineName: 'BCG, Oral Polio (OPV-0), Hepatitis B-0',
    diseasePreventedEn: 'Tuberculosis (TB), Polio, Hepatitis B virus',
    diseasePreventedHi: 'टीबी, पोलियों और हेपेटाइटिस बी',
    doseDetailsEn: 'Single dose given before leaving hospital/PHC',
    doseDetailsHi: 'अस्पताल से छुट्टी से पहले दी जाने वाली खुराक'
  },
  {
    id: 'v2',
    ageGroupEn: '6 Weeks (6 सप्ताह / 1.5 माह)',
    ageGroupHi: '6 सप्ताह (डेढ़ माह)',
    vaccineName: 'Pentavalent-1, OPV-1, Rotavirus-1, fIPV-1, PCV-1',
    diseasePreventedEn: 'Diphtheria, Pertussis (Whooping Cough), Tetanus, Hepatitis B, Hib pneumonia, Diarrhea',
    diseasePreventedHi: 'गलघोंटू, काली खांसी, टिटनेस, निमोनिया व दस्त',
    doseDetailsEn: 'Drops + 2 injections on thigh',
    doseDetailsHi: 'ड्राप्स + जांघ पर टीके'
  },
  {
    id: 'v3',
    ageGroupEn: '10 Weeks (10 सप्ताह / 2.5 माह)',
    ageGroupHi: '10 सप्ताह (ढाई माह)',
    vaccineName: 'Pentavalent-2, OPV-2, Rotavirus-2',
    diseasePreventedEn: 'Diphtheria, Tetanus, Pertussis, Hepatitis B, Pneumonia, Diarrhea',
    diseasePreventedHi: 'गलघोंटू, काली खांसी, टिटनेस व दस्त',
    doseDetailsEn: 'Second routine dose',
    doseDetailsHi: 'दूसरी नियमित खुराक'
  },
  {
    id: 'v4',
    ageGroupEn: '14 Weeks (14 सप्ताह / 3.5 माह)',
    ageGroupHi: '14 सप्ताह (साढ़े तीन माह)',
    vaccineName: 'Pentavalent-3, OPV-3, Rotavirus-3, fIPV-2, PCV-2',
    diseasePreventedEn: 'Complete basic infant immunization against 12 diseases',
    diseasePreventedHi: '12 जानलेवा बीमारियों से शिशु का सुरक्षा कवच',
    doseDetailsEn: 'Third routine dose',
    doseDetailsHi: 'तीसरी नियमित खुराक'
  },
  {
    id: 'v5',
    ageGroupEn: '9 - 12 Months (9 से 12 माह)',
    ageGroupHi: '9 से 12 महीने',
    vaccineName: 'Measles-Rubella (MR-1), JE-1, Vitamin A Dose-1, PCV Booster',
    diseasePreventedEn: 'Measles, Rubella, Brain fever (Japanese Encephalitis), Blindness prevention',
    diseasePreventedHi: 'खसरा, रुबेला, दिमागी बुखार और रतौंधी से बचाव',
    doseDetailsEn: 'Subcutaneous injection + oral Vitamin A spoon',
    doseDetailsHi: 'टीका + चम्मच से विटामिन ए की खुराक'
  }
];

export const MYTH_FACTS: MythFact[] = [
  {
    id: 'm1',
    categoryEn: 'Fever & Cold',
    categoryHi: 'बुखार एवं ठंड',
    mythEn: 'Eating solid food or rice during fever makes the body weaker or worsens fever.',
    mythHi: 'बुखार में भात (चावल) या ठोस खाना खाने से बीमारी बढ़ती है या शरीर कमजोर होता है।',
    factEn: 'FACT: The body needs MORE energy and nutrition during fever to fight infection.',
    factHi: 'सच: बुखार में शरीर को इन्फेक्शन से लड़ने के लिए अधिक ऊर्जा और पोषण की आवश्यकता होती है।',
    explanationEn: 'Provide soft digestible warm food like Khichdi, dalia, soups, and boiled water. Starving weakens immunity and delays recovery.',
    explanationHi: 'मरीज को आसानी से पचने वाला सुपाच्य गर्म खाना जैसे दलिया, खिचड़ी, दाल का पानी दें। भूखे रहने से रोग प्रतिरोधक क्षमता कमजोर होती है।'
  },
  {
    id: 'm2',
    categoryEn: 'Mother & Child',
    categoryHi: 'माता एवं शिशु',
    mythEn: 'Colostrum (first thick yellow mother milk) is dirty milk and should be discarded.',
    mythHi: 'मां का पहला गाढ़ा पीला दूध (खीस/कोलोस्ट्रम) गंदा होता है और इसे फेंक देना चाहिए।',
    factEn: 'FACT: First yellow milk is the baby\'s FIRST NATURAL VACCINE.',
    factHi: 'सच: मां का पहला पीला दूध शिशु का पहला कुदरती टीका होता है।',
    explanationEn: 'Colostrum is rich in antibodies, protein, and Vitamin A protecting the newborn from severe infections and jaundice.',
    explanationHi: 'पहले दूध में प्रचुर मात्रा में एंटीबॉडीज और पोषक तत्व होते हैं जो नवजात शिशु को निमोनिया और इन्फेक्शन से बचाते हैं।'
  },
  {
    id: 'm3',
    categoryEn: 'First Aid & Injury',
    categoryHi: 'प्राथमिक उपचार',
    mythEn: 'Tetanus infection happens ONLY from rusty iron nails or cuts.',
    mythHi: 'टिटनेस की बीमारी केवल जंग लगी लोहे की कील या लोहे की चोट से होती है।',
    factEn: 'FACT: Tetanus bacteria live in soil, animal dung, and dirt anywhere.',
    factHi: 'सच: टिटनेस के जीवाणु मिट्टी, धूल और पशुओं के गोबर में हर जगह मौजूद होते हैं।',
    explanationEn: 'Any cut or wound contaminated with soil, road dirt, or animal waste requires a Tetanus Toxoid (TT) shot within 24-48 hours.',
    explanationHi: 'मिट्टी, कांच या किसी भी चीज से लगी चोट या घाव पर टिटनेस का इंजेक्शन 24-48 घंटे के अंदर लगवाना चाहिए।'
  },
  {
    id: 'm4',
    categoryEn: 'Snake Bite',
    categoryHi: 'सांप का काटना',
    mythEn: 'Sucking venom out with mouth or cutting the bite wound saves the victim.',
    mythHi: 'सांप के काटे स्थान को मुंह से चूसकर जहर निकालना या चीरा लगाने से मरीज बच जाता है।',
    factEn: 'FACT: Mouth sucking and cutting cause deadly infection and severe bleeding.',
    factHi: 'सच: मुंह से जहर चूसने या चीरा लगाने से अत्यधिक खून बहता है और जानलेवा इन्फेक्शन होता है।',
    explanationEn: 'Immobilize the leg/arm and rush immediately to Government Hospital for Anti-Snake Venom (ASV) injection.',
    explanationHi: 'अंग को स्थिर रखें और तुरंत एंटी-स्नेक वेनम इंजेक्शन के लिए सरकारी अस्पताल ले जाएं।'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionEn: 'What is the emergency helpline phone number in India to call a free ambulance?',
    questionHi: 'भारत में मुफ्त एम्बुलेंस बुलाने के लिए आपातकालीन हेल्पलाइन नंबर क्या है?',
    optionsEn: ['100', '108', '112', '1091'],
    optionsHi: ['100', '108', '112', '1091'],
    correctIndex: 1,
    explanationEn: '108 is the nationwide free emergency helpline number for ambulance and medical response.',
    explanationHi: '108 पूरे भारत में मुफ्त एम्बुलेंस और आपातकालीन चिकित्सा सहायता का राष्ट्रीय नंबर है।'
  },
  {
    id: 2,
    questionEn: 'What should be given immediately to a person suffering from severe loose motion (diarrhea)?',
    questionHi: 'अत्यधिक दस्त होने पर मरीज को तुरंत क्या देना चाहिए?',
    optionsEn: ['Sugary soda / Soft drink', 'ORS (Oral Rehydration Solution) & clean water', 'Antibiotic syrup immediately without doctor advice', 'Only solid heavy food'],
    optionsHi: ['मीठा सोडा / सॉफ्ट ड्रिंक', 'ओआरएस (ORS) घोल और साफ पानी', 'बिना डॉक्टर सलाह के एंटीबायोटिक सिरप', 'केवल भारी ठोस भोजन'],
    correctIndex: 1,
    explanationEn: 'ORS replaces lost water and essential salts (electrolytes) preventing life-threatening dehydration.',
    explanationHi: 'ओआरएस शरीर में पानी और आवश्यक लवणों की कमी को दूर कर डिहाइड्रेशन से बचाता है।'
  },
  {
    id: 3,
    questionEn: 'What is the first and most important step if a snake bites a person?',
    questionHi: 'यदि किसी व्यक्ति को सांप काट ले तो पहला और सबसे महत्वपूर्ण कदम क्या है?',
    optionsEn: ['Cut the bitten place with a blade', 'Suck the venom with mouth', 'Keep victim calm and still, and take to PHC/Hospital', 'Tie a tight iron wire above bite'],
    optionsHi: ['ब्लेड से काटे स्थान को चीरें', 'मुंह से जहर चूसें', 'मरीज को शांत व स्थिर रखें और तुरंत अस्पताल ले जाएं', 'लोहे के तार से जोर से बांधें'],
    correctIndex: 2,
    explanationEn: 'Keeping victim calm and immobile prevents rapid spread of venom. Take to hospital for Anti-Snake Venom.',
    explanationHi: 'मरीज को शांत और स्थिर रखने से जहर तेजी से नहीं फैलता। तुरंत एंटी-स्नेक वेनम के लिए अस्पताल जाएं।'
  },
  {
    id: 4,
    questionEn: 'Where can you buy high quality generic medicines at up to 80-90% lower prices?',
    questionHi: '80-90% तक कम कीमत पर उच्च गुणवत्ता वाली जेनेरिक दवाएं कहां से खरीदी जा सकती हैं?',
    optionsEn: ['Private expensive pharmacy', 'Pradhan Mantri Jan Aushadhi Kendra', 'Local quack doctor', 'General grocery store'],
    optionsHi: ['प्राइवेट महंगी दुकान', 'प्रधानमंत्री जन औषधि केंद्र', 'झोलाछाप डॉक्टर', 'किराना दुकान'],
    correctIndex: 1,
    explanationEn: 'PM Jan Aushadhi Kendras sell government quality-tested generic medicines at deeply affordable rates.',
    explanationHi: 'जन औषधि केंद्र सरकार द्वारा प्रमाणित गुणवत्ता वाली जेनेरिक दवाएं बेहद सस्ती दरों पर प्रदान करते हैं।'
  },
  {
    id: 5,
    questionEn: 'Which government scheme provides up to ₹5 Lakh free health insurance per family per year?',
    questionHi: 'कौन सी सरकारी योजना प्रति परिवार प्रतिवर्ष ₹5 लाख तक का मुफ्त इलाज प्रदान करती है?',
    optionsEn: ['Janani Suraksha Yojana', 'Ayushman Bharat (PM-JAY)', 'NREGA Scheme', 'Kisan Samman Nidhi'],
    optionsHi: ['जननी सुरक्षा योजना', 'आयुष्मान भारत (PM-JAY)', 'मनरेगा योजना', 'किसान सम्मान निधि'],
    correctIndex: 1,
    explanationEn: 'Ayushman Bharat PM-JAY provides cashless hospital care up to ₹5 Lakh per year for eligible families.',
    explanationHi: 'आयुष्मान भारत योजना पात्र परिवारों को सूचीबद्ध अस्पतालों में ₹5 लाख तक का मुफ्त कैशलेस इलाज देती है।'
  }
];

export const VILLAGE_DATASETS: VillageData[] = [
  {
    villageId: 'v_rampur',
    villageNameEn: 'Rampur Village',
    villageNameHi: 'रामपुर गांव',
    districtEn: 'Lucknow Rural District',
    districtHi: 'लखनऊ ग्रामीण जिला',
    totalPopulation: 3420,
    avgAwarenessScore: 78,
    vaccinationRatePercent: 92,
    janAushadhiUsagePercent: 68,
    topSymptoms: [
      { nameEn: 'Seasonal Fever', nameHi: 'मौसमी बुखार', count: 142 },
      { nameEn: 'Acidity & Digestion', nameHi: 'एसिडिटी व पेट दर्द', count: 98 },
      { nameEn: 'Joint & Back Pain', nameHi: 'जोड़ों का दर्द', count: 84 },
      { nameEn: 'Eye & Skin Rash', nameHi: 'आंख व त्वचा की एलर्जी', count: 45 }
    ],
    knowledgeGaps: [
      { topicEn: 'Snake Bite First Aid', topicHi: 'सांप काटने पर उपचार', gapPercent: 32 },
      { topicEn: 'ORT / Diarrhea Care', topicHi: 'ओआरएस व दस्त देखभाल', gapPercent: 18 },
      { topicEn: 'Ayushman Bharat Card', topicHi: 'आयुष्मान कार्ड प्रक्रिया', gapPercent: 24 }
    ]
  },
  {
    villageId: 'v_sundarpur',
    villageNameEn: 'Sundarpur Village',
    villageNameHi: 'सुंदरपुर गांव',
    districtEn: 'Lucknow Rural District',
    districtHi: 'लखनऊ ग्रामीण जिला',
    totalPopulation: 2890,
    avgAwarenessScore: 64,
    vaccinationRatePercent: 84,
    janAushadhiUsagePercent: 52,
    topSymptoms: [
      { nameEn: 'Anemia in Women', nameHi: 'महिलाओं में खून की कमी', count: 110 },
      { nameEn: 'Diarrhea in Children', nameHi: 'बच्चों में दस्त', count: 76 },
      { nameEn: 'Cough & Cold', nameHi: 'खांसी-जुकाम', count: 65 },
      { nameEn: 'High Blood Pressure', nameHi: 'हाई बीपी', count: 52 }
    ],
    knowledgeGaps: [
      { topicEn: 'Maternal Iron Intake', topicHi: 'गर्भवती का आयरन सेवन', gapPercent: 42 },
      { topicEn: 'Water Purification', topicHi: 'पानी की सफाई', gapPercent: 35 },
      { topicEn: 'Jan Aushadhi Stores', topicHi: 'जन औषधि दुकान की जानकारी', gapPercent: 48 }
    ]
  }
];

export const VILLAGE_HEALTH_METRICS = {
  villageNameEn: 'Rampur Gram Panchayat',
  villageNameHi: 'रामपुर ग्राम पंचायत',
  populationTotal: 3420,
  immunizationCoveragePct: 92,
  ayushmanCardHolders: 640,
  monthlyPhcOpdVisits: 520,
  cleanWaterIndexPct: 88
};

export const BLOOD_DONORS = [
  {
    id: 'bd1',
    name: 'Rajesh Kumar Verma',
    bloodGroup: 'O+',
    phone: '+91 98765 11200',
    villageEn: 'Rampur Kalan',
    villageHi: 'रामपुर कलां',
    districtEn: 'Lucknow Rural',
    districtHi: 'लखनऊ ग्रामीण',
    available: true,
    lastDonatedEn: '4 months ago',
    lastDonatedHi: '4 महीने पहले'
  },
  {
    id: 'bd2',
    name: 'Suman Sharma',
    bloodGroup: 'B+',
    phone: '+91 94150 88211',
    villageEn: 'Sundarpur',
    villageHi: 'सुंदरपुर',
    districtEn: 'Lucknow Rural',
    districtHi: 'लखनऊ ग्रामीण',
    available: true,
    lastDonatedEn: '6 months ago',
    lastDonatedHi: '6 महीने पहले'
  },
  {
    id: 'bd3',
    name: 'Amit Singh',
    bloodGroup: 'A+',
    phone: '+91 91200 33445',
    villageEn: 'Chandanpur Market',
    villageHi: 'चन्दनपुर बाजार',
    districtEn: 'Lucknow Rural',
    districtHi: 'लखनऊ ग्रामीण',
    available: true,
    lastDonatedEn: '3 months ago',
    lastDonatedHi: '3 महीने पहले'
  },
  {
    id: 'bd4',
    name: 'Rameshwar Yadav',
    bloodGroup: 'AB+',
    phone: '+91 98391 77662',
    villageEn: 'Rampur Kalan',
    villageHi: 'रामपुर कलां',
    districtEn: 'Lucknow Rural',
    districtHi: 'लखनऊ ग्रामीण',
    available: true,
    lastDonatedEn: '5 months ago',
    lastDonatedHi: '5 महीने पहले'
  },
  {
    id: 'bd5',
    name: 'Pooja Vishwakarma',
    bloodGroup: 'O-',
    phone: '+91 99352 44110',
    villageEn: 'Sundarpur',
    villageHi: 'सुंदरपुर',
    districtEn: 'Lucknow Rural',
    districtHi: 'लखनऊ ग्रामीण',
    available: true,
    lastDonatedEn: '8 months ago',
    lastDonatedHi: '8 महीने पहले'
  },
  {
    id: 'bd6',
    name: 'Dr. Vikrant Patel',
    bloodGroup: 'B-',
    phone: '+91 97920 55123',
    villageEn: 'PHC Campus Rampur',
    villageHi: 'पीएचसी परिसर रामपुर',
    districtEn: 'Lucknow Rural',
    districtHi: 'लखनऊ ग्रामीण',
    available: true,
    lastDonatedEn: '2 months ago',
    lastDonatedHi: '2 महीने पहले'
  }
];
