export type Language = 'en' | 'hi';

export interface Illness {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'infectious' | 'chronic' | 'seasonal' | 'maternal';
  categoryLabelEn: string;
  categoryLabelHi: string;
  iconName: string;
  symptomsEn: string[];
  symptomsHi: string[];
  warningSignsEn: string[];
  warningSignsHi: string[];
  whenToSeekDoctorEn: string;
  whenToSeekDoctorHi: string;
  dosEn: string[];
  dosHi: string[];
  dontsEn: string[];
  dontsHi: string[];
}

export interface EmergencyFirstAid {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: string;
  color: string;
  severity: 'critical' | 'high' | 'medium';
  overviewEn: string;
  overviewHi: string;
  stepsEn: { stepNumber: number; title: string; instruction: string }[];
  stepsHi: { stepNumber: number; title: string; instruction: string }[];
  dosEn: string[];
  dosHi: string[];
  dontsEn: string[];
  dontsHi: string[];
}

export interface Medicine {
  id: string;
  brandName: string;
  genericName: string;
  categoryEn: string;
  categoryHi: string;
  purposeEn: string;
  purposeHi: string;
  brandPriceInr: number;
  genericPriceInr: number;
  savingsPercentage: number;
  availabilityEn: string;
  availabilityHi: string;
}

export interface Pharmacy {
  id: string;
  nameEn: string;
  nameHi: string;
  type: 'janAushadhi' | 'government' | 'charitable';
  addressEn: string;
  addressHi: string;
  distanceKm: number;
  phone: string;
  timingsEn: string;
  timingsHi: string;
  lat: number;
  lng: number;
}

export interface HealthcareFacility {
  id: string;
  nameEn: string;
  nameHi: string;
  type: 'phc' | 'chc' | 'district' | 'subcentre';
  typeLabelEn: string;
  typeLabelHi: string;
  servicesEn: string[];
  servicesHi: string[];
  addressEn: string;
  addressHi: string;
  distanceKm: number;
  phone: string;
  openHoursEn: string;
  openHoursHi: string;
  hasEmergency: boolean;
  hasBedFacility: boolean;
  lat: number;
  lng: number;
}

export interface HealthScheme {
  id: string;
  nameEn: string;
  nameHi: string;
  shortTagEn: string;
  shortTagHi: string;
  coverageEn: string;
  coverageHi: string;
  descriptionEn: string;
  descriptionHi: string;
  eligibilityEn: string[];
  eligibilityHi: string[];
  benefitsEn: string[];
  benefitsHi: string[];
  documentsEn: string[];
  documentsHi: string[];
  howToApplyStepsEn: string[];
  howToApplyStepsHi: string[];
  helpline: string;
  portalUrl: string;
}

export interface VaccinationItem {
  id: string;
  ageGroupEn: string;
  ageGroupHi: string;
  vaccineName: string;
  diseasePreventedEn: string;
  diseasePreventedHi: string;
  doseDetailsEn: string;
  doseDetailsHi: string;
}

export interface ElderlyReminder {
  id: string;
  title: string;
  time: string;
  dosage: string;
  taken: boolean;
  category: 'medicine' | 'bp_check' | 'doctor_visit' | 'walk';
}

export interface MythFact {
  id: string;
  categoryEn: string;
  categoryHi: string;
  mythEn: string;
  mythHi: string;
  factEn: string;
  factHi: string;
  explanationEn: string;
  explanationHi: string;
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

export interface VillageData {
  villageId: string;
  villageNameEn: string;
  villageNameHi: string;
  districtEn: string;
  districtHi: string;
  totalPopulation: number;
  avgAwarenessScore: number;
  vaccinationRatePercent: number;
  janAushadhiUsagePercent: number;
  topSymptoms: { nameEn: string; nameHi: string; count: number }[];
  knowledgeGaps: { topicEn: string; topicHi: string; gapPercent: number }[];
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  phone: string;
  villageEn: string;
  villageHi: string;
  districtEn: string;
  districtHi: string;
  available: boolean;
  lastDonatedEn: string;
  lastDonatedHi: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'ai';
  text: string;
  timestamp: string;
}
