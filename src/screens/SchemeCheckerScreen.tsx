import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SchemeChecker'>;
};

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
  title:         { english:'Scheme Eligibility Checker', hindi:'योजना पात्रता जांच', malayalam:'പദ്ധതി യോഗ്യത പരിശോധന', marathi:'योजना पात्रता तपासणी', tamil:'திட்ட தகுதி சரிபார்ப்பு', telugu:'పథకం అర్హత తనిఖీ', bengali:'প্রকল্প যোগ্যতা যাচাই' },
  subtitle:      { english:'Answer a few questions to find schemes you qualify for', hindi:'कुछ सवालों के जवाब दें — जानें आप किन योजनाओं के लिए पात्र हैं', malayalam:'ചില ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകൂ — ഏതൊക്കെ പദ്ധതികൾ ലഭിക്കുമെന്ന് അറിയൂ', marathi:'काही प्रश्नांची उत्तरे द्या — तुम्ही कोणत्या योजनांसाठी पात्र आहात ते जाणून घ्या', tamil:'சில கேள்விகளுக்கு பதிலளியுங்கள் — உங்களுக்கு தகுந்த திட்டங்களை கண்டறியுங்கள்', telugu:'కొన్ని ప్రశ్నలకు జవాబివ్వండి — మీకు అర్హమైన పథకాలు తెలుసుకోండి', bengali:'কিছু প্রশ্নের উত্তর দিন — আপনি কোন প্রকল্পের যোগ্য তা জানুন' },
  checkBtn:      { english:'Check My Eligibility', hindi:'मेरी पात्रता जांचें', malayalam:'എന്റെ യോഗ്യത പരിശോധിക്കൂ', marathi:'माझी पात्रता तपासा', tamil:'என் தகுதி சரிபார்க்க', telugu:'నా అర్హత తనిఖీ చేయండి', bengali:'আমার যোগ্যতা যাচাই করুন' },
  resetBtn:      { english:'Check Again', hindi:'फिर से जांचें', malayalam:'വീണ്ടും പരിശോധിക്കൂ', marathi:'पुन्हा तपासा', tamil:'மீண்டும் சரிபார்க்க', telugu:'మళ్ళీ తనిఖీ చేయండి', bengali:'আবার যাচাই করুন' },
  resultsTitle:  { english:'You may qualify for these schemes:', hindi:'आप इन योजनाओं के लिए पात्र हो सकते हैं:', malayalam:'നിങ്ങൾക്ക് ഈ പദ്ധതികൾ ലഭിക്കാൻ സാധ്യതയുണ്ട്:', marathi:'तुम्ही या योजनांसाठी पात्र असू शकता:', tamil:'இந்த திட்டங்களுக்கு நீங்கள் தகுதியானவராக இருக்கலாம்:', telugu:'మీరు ఈ పథకాలకు అర్హులు కావచ్చు:', bengali:'আপনি এই প্রকল্পগুলির জন্য যোগ্য হতে পারেন:' },
  noResults:     { english:'No matching schemes found. Please try different answers.', hindi:'कोई योजना नहीं मिली। कृपया अलग उत्तर दें।', malayalam:'ഒരു പദ്ധതിയും കണ്ടെത്തിയില്ല. ദയവായി വ്യത്യസ്ത ഉത്തരങ്ങൾ ശ്രമിക്കൂ.', marathi:'कोणतीही योजना आढळली नाही. कृपया वेगळी उत्तरे द्या.', tamil:'பொருந்தும் திட்டங்கள் இல்லை. வேறு பதில்களை முயற்சிக்கவும்.', telugu:'సరిపోలే పథకాలు కనుగొనబడలేదు. వేరే సమాధానాలు ప్రయత్నించండి.', bengali:'কোনো মিলসম প্রকল্প পাওয়া যায়নি। অন্য উত্তর দেওয়ার চেষ্টা করুন।' },
  benefit:       { english:'Benefit', hindi:'लाभ', malayalam:'ആനുകൂല്യം', marathi:'लाभ', tamil:'நலன்', telugu:'ప్రయోజనం', bengali:'সুবিধা' },
  howToApply:    { english:'How to apply', hindi:'आवेदन कैसे करें', malayalam:'എങ്ങനെ അപേക്ഷിക്കാം', marathi:'अर्ज कसा करावा', tamil:'விண்ணப்பிப்பது எப்படி', telugu:'ఎలా దరఖాస్తు చేయాలి', bengali:'কিভাবে আবেদন করবেন' },
};

const tr = (key: string, lang: string) => T[key]?.[lang] || T[key]?.english || key;

// ── Questions ─────────────────────────────────────────────────────────────────
type Option = { label: Record<string, string>; value: string };
type Question = { id: string; question: Record<string, string>; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: 'occupation',
    question: {
      english: 'What is your occupation?',
      hindi: 'आपका पेशा क्या है?',
      malayalam: 'നിങ്ങളുടെ തൊഴിൽ എന്താണ്?',
      marathi: 'तुमचा व्यवसाय काय आहे?',
      tamil: 'உங்கள் தொழில் என்ன?',
      telugu: 'మీ వృత్తి ఏమిటి?',
      bengali: 'আপনার পেশা কী?',
    },
    options: [
      { value: 'farmer',  label: { english:'Farmer', hindi:'किसान', malayalam:'കർഷകൻ', marathi:'शेतकरी', tamil:'விவசாயி', telugu:'రైతు', bengali:'কৃষক' } },
      { value: 'labour',  label: { english:'Daily Wage Worker', hindi:'मजदूर', malayalam:'തൊഴിലാളി', marathi:'मजूर', tamil:'கூலி தொழிலாளி', telugu:'కూలీ', bengali:'শ্রমিক' } },
      { value: 'business',label: { english:'Small Business', hindi:'छोटा व्यापार', malayalam:'ചെറുകിട ബിസിനസ്', marathi:'छोटा व्यवसाय', tamil:'சிறு வணிகம்', telugu:'చిన్న వ్యాపారం', bengali:'ছোট ব্যবসা' } },
      { value: 'other',   label: { english:'Other / Unemployed', hindi:'अन्य / बेरोजगार', malayalam:'മറ്റുള്ളവ / തൊഴിൽരഹിതൻ', marathi:'इतर / बेरोजगार', tamil:'மற்றவை / வேலையில்லாதவர்', telugu:'ఇతర / నిరుద్యోగి', bengali:'অন্য / বেকার' } },
    ],
  },
  {
    id: 'income',
    question: {
      english: 'What is your annual household income?',
      hindi: 'आपके परिवार की वार्षिक आय क्या है?',
      malayalam: 'നിങ്ങളുടെ വാർഷിക കുടുംബ വരുമാനം എന്ത്?',
      marathi: 'तुमचे वार्षिक कौटुंबिक उत्पन्न किती आहे?',
      tamil: 'உங்கள் வருடாந்திர குடும்ப வருமானம் என்ன?',
      telugu: 'మీ వార్షిక కుటుంబ ఆదాయం ఎంత?',
      bengali: 'আপনার বার্ষিক পারিবারিক আয় কত?',
    },
    options: [
      { value: 'below1l', label: { english:'Below ₹1 Lakh', hindi:'₹1 लाख से कम', malayalam:'₹1 ലക്ഷത്തിൽ താഴെ', marathi:'₹1 लाखापेक्षा कमी', tamil:'₹1 லட்சத்திற்கு கீழ்', telugu:'₹1 లక్ష కంటే తక్కువ', bengali:'₹১ লাখের নিচে' } },
      { value: '1to3l',   label: { english:'₹1–3 Lakh', hindi:'₹1–3 लाख', malayalam:'₹1–3 ലക്ഷം', marathi:'₹1–3 लाख', tamil:'₹1–3 லட்சம்', telugu:'₹1–3 లక్షలు', bengali:'₹১–৩ লাখ' } },
      { value: 'above3l', label: { english:'Above ₹3 Lakh', hindi:'₹3 लाख से अधिक', malayalam:'₹3 ലക്ഷത്തിന് മുകളിൽ', marathi:'₹3 लाखापेक्षा जास्त', tamil:'₹3 லட்சத்திற்கு மேல்', telugu:'₹3 లక్షలకు పైన', bengali:'₹৩ লাখের উপরে' } },
    ],
  },
  {
    id: 'land',
    question: {
      english: 'Do you own agricultural land?',
      hindi: 'क्या आपके पास खेती की जमीन है?',
      malayalam: 'നിങ്ങൾക്ക് കൃഷിഭൂമി ഉണ്ടോ?',
      marathi: 'तुमच्याकडे शेतजमीन आहे का?',
      tamil: 'உங்களிடம் விவசாய நிலம் உள்ளதா?',
      telugu: 'మీకు వ్యవసాయ భూమి ఉందా?',
      bengali: 'আপনার কৃষি জমি আছে কি?',
    },
    options: [
      { value: 'yes_small', label: { english:'Yes, small (below 2 acres)', hindi:'हाँ, छोटी (2 एकड़ से कम)', malayalam:'ഉണ്ട്, ചെറുത് (2 ഏക്കറിൽ കുറവ്)', marathi:'होय, छोटी (2 एकरपेक्षा कमी)', tamil:'ஆம், சிறியது (2 ஏக்கருக்கு கீழ்)', telugu:'అవును, చిన్నది (2 ఎకరాల కంటే తక్కువ)', bengali:'হ্যাঁ, ছোট (২ একরের নিচে)' } },
      { value: 'yes_large', label: { english:'Yes, large (2+ acres)', hindi:'हाँ, बड़ी (2+ एकड़)', malayalam:'ഉണ്ട്, വലുത് (2+ ഏക്കർ)', marathi:'होय, मोठी (2+ एकर)', tamil:'ஆம், பெரியது (2+ ஏக்கர்)', telugu:'అవును, పెద్దది (2+ ఎకరాలు)', bengali:'হ্যাঁ, বড় (২+ একর)' } },
      { value: 'no',        label: { english:'No land', hindi:'जमीन नहीं', malayalam:'ഭൂമി ഇല്ല', marathi:'जमीन नाही', tamil:'நிலம் இல்லை', telugu:'భూమి లేదు', bengali:'জমি নেই' } },
    ],
  },
  {
    id: 'category',
    question: {
      english: 'What is your social category?',
      hindi: 'आपकी सामाजिक श्रेणी क्या है?',
      malayalam: 'നിങ്ങളുടെ സാമൂഹ്യ വിഭാഗം ഏതാണ്?',
      marathi: 'तुमची सामाजिक श्रेणी काय आहे?',
      tamil: 'உங்கள் சமூக வகை என்ன?',
      telugu: 'మీ సామాజిక వర్గం ఏమిటి?',
      bengali: 'আপনার সামাজিক বিভাগ কী?',
    },
    options: [
      { value: 'general', label: { english:'General', hindi:'सामान्य', malayalam:'ജനറൽ', marathi:'सामान्य', tamil:'பொது', telugu:'జనరల్', bengali:'সাধারণ' } },
      { value: 'obc',     label: { english:'OBC', hindi:'OBC', malayalam:'OBC', marathi:'OBC', tamil:'OBC', telugu:'OBC', bengali:'OBC' } },
      { value: 'sc_st',   label: { english:'SC / ST', hindi:'SC / ST', malayalam:'SC / ST', marathi:'SC / ST', tamil:'SC / ST', telugu:'SC / ST', bengali:'SC / ST' } },
    ],
  },
  {
    id: 'gender',
    question: {
      english: 'Gender of the primary earner',
      hindi: 'मुख्य कमाने वाले का लिंग',
      malayalam: 'പ്രധാന വരുമാനക്കാരന്റെ ലിംഗം',
      marathi: 'प्रमुख कमावत्याचे लिंग',
      tamil: 'முதன்மை சம்பாதிப்பவரின் பாலினம்',
      telugu: 'ప్రాథమిక సంపాదకుడి లింగం',
      bengali: 'প্রধান উপার্জনকারীর লিঙ্গ',
    },
    options: [
      { value: 'male',   label: { english:'Male', hindi:'पुरुष', malayalam:'പുരുഷൻ', marathi:'पुरुष', tamil:'ஆண்', telugu:'పురుషుడు', bengali:'পুরুষ' } },
      { value: 'female', label: { english:'Female', hindi:'महिला', malayalam:'സ്ത്രീ', marathi:'महिला', tamil:'பெண்', telugu:'స్త్రీ', bengali:'মহিলা' } },
    ],
  },
];

// ── Schemes database ──────────────────────────────────────────────────────────
type Scheme = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  benefit: Record<string, string>;
  apply: Record<string, string>;
  match: (a: Record<string, string>) => boolean;
};

const SCHEMES: Scheme[] = [
  {
    id: 'pmkisan',
    name: 'PM-KISAN',
    emoji: '🌾',
    color: '#4CAF50',
    benefit: {
      english: '₹6,000 per year directly to your bank account in 3 installments.',
      hindi: '₹6,000 प्रति वर्ष सीधे बैंक खाते में 3 किस्तों में।',
      malayalam: 'വർഷം ₹6,000 നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിൽ 3 ഗഡുക്കളായി.',
      marathi: '₹6,000 प्रति वर्ष थेट बँक खात्यात 3 हप्त्यांमध्ये.',
      tamil: 'வருடம் ₹6,000 நேரடியாக வங்கி கணக்கில் 3 தவணைகளில்.',
      telugu: 'సంవత్సరానికి ₹6,000 నేరుగా బ్యాంక్ ఖాతాకు 3 వాయిదాలలో.',
      bengali: 'বছরে ₹6,000 সরাসরি ব্যাংক অ্যাকাউন্টে ৩ কিস্তিতে।',
    },
    apply: {
      english: 'Visit nearest CSC center or pmkisan.gov.in with Aadhaar and land documents.',
      hindi: 'आधार और जमीन के कागजात के साथ नजदीकी CSC केंद्र या pmkisan.gov.in पर जाएं।',
      malayalam: 'ആധാർ, ഭൂമി രേഖകൾ സഹിതം ഏറ്റവും അടുത്ത CSC കേന്ദ്രത്തിൽ അല്ലെങ്കിൽ pmkisan.gov.in ൽ.',
      marathi: 'आधार आणि जमिनीच्या कागदपत्रांसह जवळच्या CSC केंद्रावर किंवा pmkisan.gov.in वर जा.',
      tamil: 'ஆதார் மற்றும் நில ஆவணங்களுடன் அருகிலுள்ள CSC மையம் அல்லது pmkisan.gov.in.',
      telugu: 'ఆధార్ మరియు భూమి పత్రాలతో దగ్గరలోని CSC కేంద్రం లేదా pmkisan.gov.in.',
      bengali: 'আধার ও জমির কাগজ নিয়ে নিকটস্থ CSC কেন্দ্র বা pmkisan.gov.in এ যান।',
    },
    match: (a) => (a.occupation === 'farmer') && (a.income === 'below1l' || a.income === '1to3l') && (a.land === 'yes_small' || a.land === 'yes_large'),
  },
  {
    id: 'ayushman',
    name: 'Ayushman Bharat (PMJAY)',
    emoji: '🏥',
    color: '#2196F3',
    benefit: {
      english: 'Free health insurance up to ₹5 lakh per year for hospitalisation.',
      hindi: 'अस्पताल में भर्ती के लिए सालाना ₹5 लाख तक मुफ्त स्वास्थ्य बीमा।',
      malayalam: 'ആശുപത്രി ചിലവുകൾക്ക് വർഷം ₹5 ലക്ഷം വരെ സൗജന്യ ആരോഗ്യ ഇൻഷുറൻസ്.',
      marathi: 'रुग्णालयात दाखल होण्यासाठी वार्षिक ₹5 लाखांपर्यंत मोफत आरोग्य विमा.',
      tamil: 'மருத்துவமனை அனுமதிக்கு வருடம் ₹5 லட்சம் வரை இலவச சுகாதார காப்பீடு.',
      telugu: 'ఆసుపత్రి చేరికకు సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత ఆరోగ్య బీమా.',
      bengali: 'হাসপাতালে ভর্তির জন্য বছরে ₹5 লাখ পর্যন্ত বিনামূল্যে স্বাস্থ্য বীমা।',
    },
    apply: {
      english: 'Visit nearest government hospital or CSC with Aadhaar. Check pmjay.gov.in.',
      hindi: 'आधार के साथ नजदीकी सरकारी अस्पताल या CSC जाएं। pmjay.gov.in देखें।',
      malayalam: 'ആധാർ സഹിതം ഏറ്റവും അടുത്ത സർക്കാർ ആശുപത്രി അല്ലെങ്കിൽ CSC. pmjay.gov.in.',
      marathi: 'आधारसह जवळच्या सरकारी रुग्णालयात किंवा CSC मध्ये जा. pmjay.gov.in पहा.',
      tamil: 'ஆதாருடன் அருகிலுள்ள அரசு மருத்துவமனை அல்லது CSC. pmjay.gov.in பார்க்கவும்.',
      telugu: 'ఆధార్‌తో దగ్గరలోని ప్రభుత్వ ఆసుపత్రి లేదా CSC. pmjay.gov.in చూడండి.',
      bengali: 'আধার নিয়ে নিকটস্থ সরকারি হাসপাতাল বা CSC। pmjay.gov.in দেখুন।',
    },
    match: (a) => a.income === 'below1l' || (a.income === '1to3l' && (a.category === 'sc_st' || a.category === 'obc')),
  },
  {
    id: 'ujjwala',
    name: 'Ujjwala Yojana',
    emoji: '🔥',
    color: '#FF9800',
    benefit: {
      english: 'Free LPG connection + first refill free for women below poverty line.',
      hindi: 'गरीबी रेखा से नीचे की महिलाओं को मुफ्त LPG कनेक्शन + पहला रिफिल मुफ्त।',
      malayalam: 'ദാരിദ്ര്യ രേഖയ്ക്ക് താഴെയുള്ള സ്ത്രീകൾക്ക് സൗജന്യ LPG കണക്ഷൻ + ആദ്യ റീഫിൽ.',
      marathi: 'दारिद्र्यरेषेखालील महिलांना मोफत LPG जोडणी + पहिले रिफिल मोफत.',
      tamil: 'வறுமை கோட்டிற்கு கீழ் உள்ள பெண்களுக்கு இலவச LPG இணைப்பு + முதல் ரீஃபில்.',
      telugu: 'పేదరేఖకు దిగువన ఉన్న మహిళలకు ఉచిత LPG కనెక్షన్ + మొదటి రీఫిల్.',
      bengali: 'দারিদ্র্যসীমার নিচের মহিলাদের জন্য বিনামূল্যে LPG সংযোগ + প্রথম রিফিল।',
    },
    apply: {
      english: 'Visit nearest LPG distributor or CSC with Aadhaar and BPL ration card.',
      hindi: 'आधार और BPL राशन कार्ड के साथ नजदीकी LPG वितरक या CSC जाएं।',
      malayalam: 'ആധാർ, BPL റേഷൻ കാർഡ് സഹിതം LPG ഡിസ്ട്രിബ്യൂട്ടർ അല്ലെങ്കിൽ CSC.',
      marathi: 'आधार आणि BPL रेशन कार्डसह जवळच्या LPG वितरकाकडे किंवा CSC मध्ये जा.',
      tamil: 'ஆதார் மற்றும் BPL ரேஷன் கார்டுடன் அருகிலுள்ள LPG விநியோகஸ்தர்.',
      telugu: 'ఆధార్ మరియు BPL రేషన్ కార్డ్‌తో దగ్గరలోని LPG డిస్ట్రిబ్యూటర్.',
      bengali: 'আধার ও BPL রেশন কার্ড নিয়ে নিকটস্থ LPG বিতরণকারী বা CSC।',
    },
    match: (a) => a.gender === 'female' && a.income === 'below1l',
  },
  {
    id: 'awas',
    name: 'PM Awas Yojana (Gramin)',
    emoji: '🏠',
    color: '#9C27B0',
    benefit: {
      english: '₹1.2–1.3 lakh assistance to build a pucca house in rural areas.',
      hindi: 'ग्रामीण क्षेत्रों में पक्का मकान बनाने के लिए ₹1.2–1.3 लाख सहायता।',
      malayalam: 'ഗ്രാമീണ മേഖലകളിൽ പക്കാ വീട് നിർമ്മിക്കാൻ ₹1.2–1.3 ലക്ഷം സഹായം.',
      marathi: 'ग्रामीण भागात पक्के घर बांधण्यासाठी ₹1.2–1.3 लाख सहाय्य.',
      tamil: 'கிராமப்புற பகுதிகளில் பக்கா வீடு கட்ட ₹1.2–1.3 லட்சம் உதவி.',
      telugu: 'గ్రామీణ ప్రాంతాల్లో పక్కా ఇల్లు కట్టడానికి ₹1.2–1.3 లక్షల సహాయం.',
      bengali: 'গ্রামীণ এলাকায় পাকা বাড়ি তৈরিতে ₹1.2–1.3 লাখ সহায়তা।',
    },
    apply: {
      english: 'Contact your Gram Panchayat office or visit pmayg.nic.in with Aadhaar.',
      hindi: 'आधार के साथ अपनी ग्राम पंचायत या pmayg.nic.in पर जाएं।',
      malayalam: 'ആധാർ സഹിതം ഗ്രാമ പഞ്ചായത്ത് ഓഫീസ് അല്ലെങ്കിൽ pmayg.nic.in.',
      marathi: 'आधारसह ग्रामपंचायत कार्यालय किंवा pmayg.nic.in वर जा.',
      tamil: 'ஆதாருடன் உங்கள் கிராம பஞ்சாயத்து அல்லது pmayg.nic.in.',
      telugu: 'ఆధార్‌తో గ్రామ పంచాయతీ కార్యాలయం లేదా pmayg.nic.in.',
      bengali: 'আধার নিয়ে গ্রাম পঞ্চায়েত কার্যালয় বা pmayg.nic.in।',
    },
    match: (a) => a.income === 'below1l' && a.land === 'no',
  },
  {
    id: 'jandhan',
    name: 'Jan Dhan Yojana',
    emoji: '🏦',
    color: '#00BCD4',
    benefit: {
      english: 'Zero balance bank account + ₹2 lakh accident insurance + overdraft facility.',
      hindi: 'जीरो बैलेंस बैंक खाता + ₹2 लाख दुर्घटना बीमा + ओवरड्राफ्ट सुविधा।',
      malayalam: 'സീറോ ബാലൻസ് ബാങ്ക് അക്കൗണ്ട് + ₹2 ലക്ഷം അപകട ഇൻഷുറൻസ്.',
      marathi: 'शून्य शिल्लक बँक खाते + ₹2 लाख अपघात विमा + ओव्हरड्राफ्ट सुविधा.',
      tamil: 'சீரோ பேலன்ஸ் வங்கி கணக்கு + ₹2 லட்சம் விபத்து காப்பீடு.',
      telugu: 'జీరో బ్యాలెన్స్ బ్యాంక్ ఖాతా + ₹2 లక్షల ప్రమాద బీమా.',
      bengali: 'জিরো ব্যালেন্স ব্যাংক অ্যাকাউন্ট + ₹2 লাখ দুর্ঘটনা বীমা।',
    },
    apply: {
      english: 'Visit any bank or post office with Aadhaar card to open account.',
      hindi: 'खाता खोलने के लिए आधार कार्ड के साथ किसी भी बैंक या पोस्ट ऑफिस जाएं।',
      malayalam: 'അക്കൗണ്ട് തുറക്കാൻ ആധാർ സഹിതം ഏത് ബാങ്കിലും അല്ലെങ്കിൽ പോസ്റ്റ് ഓഫീസിലും.',
      marathi: 'खाते उघडण्यासाठी आधार कार्डसह कोणत्याही बँकेत किंवा पोस्ट ऑफिसमध्ये जा.',
      tamil: 'கணக்கு திறக்க ஆதார் அட்டையுடன் எந்த வங்கி அல்லது தபால் நிலையத்திலும்.',
      telugu: 'ఖాతా తెరవడానికి ఆధార్ కార్డ్‌తో ఏ బ్యాంక్ లేదా పోస్ట్ ఆఫీస్‌కైనా.',
      bengali: 'অ্যাকাউন্ট খুলতে আধার কার্ড নিয়ে যেকোনো ব্যাংক বা পোস্ট অফিসে যান।',
    },
    match: (a) => a.income === 'below1l' || a.income === '1to3l',
  },
  {
    id: 'soilhealth',
    name: 'Soil Health Card',
    emoji: '🌱',
    color: '#8BC34A',
    benefit: {
      english: 'Free soil testing + recommendations on fertilizers to improve yield.',
      hindi: 'मुफ्त मिट्टी परीक्षण + उपज बढ़ाने के लिए खाद की सिफारिश।',
      malayalam: 'സൗജന്യ മണ്ണ് പരിശോധന + ഉൽപ്പാദനം മെച്ചപ്പെടുത്താൻ വളം ശുപാർശ.',
      marathi: 'मोफत माती चाचणी + उत्पन्न वाढवण्यासाठी खताच्या शिफारशी.',
      tamil: 'இலவச மண் பரிசோதனை + விளைச்சலை மேம்படுத்த உர பரிந்துரை.',
      telugu: 'ఉచిత నేల పరీక్ష + దిగుబడి మెరుగుపడటానికి ఎరువుల సిఫార్సు.',
      bengali: 'বিনামূল্যে মাটি পরীক্ষা + ফলন উন্নত করতে সার সুপারিশ।',
    },
    apply: {
      english: 'Contact your nearest Krishi Vigyan Kendra or Block Agriculture Officer.',
      hindi: 'नजदीकी कृषि विज्ञान केंद्र या ब्लॉक कृषि अधिकारी से संपर्क करें।',
      malayalam: 'ഏറ്റവും അടുത്ത KVK അല്ലെങ്കിൽ ബ്ലോക്ക് കൃഷി ഓഫീസറുമായി ബന്ധപ്പെടുക.',
      marathi: 'जवळच्या कृषी विज्ञान केंद्र किंवा ब्लॉक कृषी अधिकाऱ्याशी संपर्क साधा.',
      tamil: 'அருகிலுள்ள KVK அல்லது தொகுதி வேளாண் அதிகாரியை தொடர்பு கொள்ளவும்.',
      telugu: 'దగ్గరలోని KVK లేదా బ్లాక్ అగ్రికల్చర్ ఆఫీసర్‌ను సంప్రదించండి.',
      bengali: 'নিকটস্থ KVK বা ব্লক কৃষি কর্মকর্তার সাথে যোগাযোগ করুন।',
    },
    match: (a) => a.occupation === 'farmer',
  },
  {
    id: 'scholarship',
    name: 'NSP Scholarship',
    emoji: '📚',
    color: '#673AB7',
    benefit: {
      english: 'Scholarships from ₹1,000 to ₹25,000/year for students from low-income families.',
      hindi: 'कम आय वाले परिवारों के छात्रों के लिए ₹1,000 से ₹25,000/वर्ष तक छात्रवृत्ति।',
      malayalam: 'കുറഞ്ഞ വരുമാന കുടുംബങ്ങളിലെ വിദ്യാർത്ഥികൾക്ക് ₹1,000 മുതൽ ₹25,000/വർഷം.',
      marathi: 'कमी उत्पन्न असलेल्या कुटुंबातील विद्यार्थ्यांसाठी ₹1,000 ते ₹25,000/वर्ष शिष्यवृत्ती.',
      tamil: 'குறைந்த வருமான குடும்பத்தினரின் மாணவர்களுக்கு ₹1,000 முதல் ₹25,000/ஆண்டு.',
      telugu: 'తక్కువ ఆదాయ కుటుంబాల విద్యార్థులకు ₹1,000 నుండి ₹25,000/సంవత్సరం.',
      bengali: 'কম আয়ের পরিবারের শিক্ষার্থীদের জন্য ₹1,000 থেকে ₹25,000/বছর বৃত্তি।',
    },
    apply: {
      english: 'Apply online at scholarships.gov.in before October each year.',
      hindi: 'हर साल अक्टूबर से पहले scholarships.gov.in पर ऑनलाइन आवेदन करें।',
      malayalam: 'ഓരോ വർഷവും ഒക്ടോബറിന് മുൻപ് scholarships.gov.in ൽ ഓൺലൈനായി.',
      marathi: 'दरवर्षी ऑक्टोबरपूर्वी scholarships.gov.in वर ऑनलाइन अर्ज करा.',
      tamil: 'ஒவ்வொரு ஆண்டும் அக்டோபருக்கு முன் scholarships.gov.in இல் ஆன்லைனில்.',
      telugu: 'ప్రతి సంవత్సరం అక్టోబర్‌కు ముందు scholarships.gov.in లో ఆన్‌లైన్‌లో.',
      bengali: 'প্রতি বছর অক্টোবরের আগে scholarships.gov.in এ অনলাইনে আবেদন করুন।',
    },
    match: (a) => (a.income === 'below1l' || a.income === '1to3l') && (a.category === 'sc_st' || a.category === 'obc'),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
function SchemeCheckerScreen({ navigation }: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { language } = useLanguage();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Scheme[] | null>(null);

  const bg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1C1C1C' : '#FFFFFF';
  const textPrimary = isDarkMode ? '#F0F0F0' : '#1A1A1A';
  const textMuted = isDarkMode ? '#999' : '#666';

  const allAnswered = QUESTIONS.every(q => answers[q.id]);

  const handleCheck = () => {
    const matched = SCHEMES.filter(s => s.match(answers));
    setResults(matched);
  };

  const handleReset = () => {
    setAnswers({});
    setResults(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>🏛️ {tr('title', language)}</Text>
          <Text style={styles.headerSub}>{tr('subtitle', language)}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {results === null ? (
          <>
            {QUESTIONS.map((q) => (
              <View key={q.id} style={[styles.questionCard, { backgroundColor: cardBg }]}>
                <Text style={[styles.questionText, { color: textPrimary }]}>
                  {q.question[language] || q.question.english}
                </Text>
                <View style={styles.optionsRow}>
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.value;
                    return (
                      <TouchableOpacity
                        key={opt.value}
                        style={[
                          styles.optionBtn,
                          selected
                            ? { backgroundColor: '#1976D2', borderColor: '#1976D2' }
                            : { backgroundColor: 'transparent', borderColor: isDarkMode ? '#444' : '#ccc' },
                        ]}
                        onPress={() => setAnswers(prev => ({ ...prev, [q.id]: opt.value }))}
                      >
                        <Text style={[styles.optionText, { color: selected ? '#fff' : textPrimary }]}>
                          {opt.label[language] || opt.label.english}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}

            {allAnswered && (
              <TouchableOpacity style={styles.checkBtn} onPress={handleCheck}>
                <Text style={styles.checkBtnText}>✅ {tr('checkBtn', language)}</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            {results.length === 0 ? (
              <View style={[styles.noResultCard, { backgroundColor: cardBg }]}>
                <Text style={[styles.noResultText, { color: textMuted }]}>{tr('noResults', language)}</Text>
              </View>
            ) : (
              <>
                <Text style={[styles.resultsTitle, { color: textPrimary }]}>
                  🎉 {tr('resultsTitle', language)}
                </Text>
                {results.map((scheme) => (
                  <View key={scheme.id} style={[styles.schemeCard, { backgroundColor: cardBg }]}>
                    <View style={[styles.schemeHeader, { backgroundColor: scheme.color + '22' }]}>
                      <Text style={styles.schemeEmoji}>{scheme.emoji}</Text>
                      <Text style={[styles.schemeName, { color: scheme.color }]}>{scheme.name}</Text>
                    </View>
                    <View style={styles.schemeBody}>
                      <Text style={[styles.schemeLabel, { color: scheme.color }]}>
                        💰 {tr('benefit', language)}
                      </Text>
                      <Text style={[styles.schemeDesc, { color: textPrimary }]}>
                        {scheme.benefit[language] || scheme.benefit.english}
                      </Text>
                      <Text style={[styles.schemeLabel, { color: scheme.color, marginTop: 10 }]}>
                        📋 {tr('howToApply', language)}
                      </Text>
                      <Text style={[styles.schemeDesc, { color: textMuted }]}>
                        {scheme.apply[language] || scheme.apply.english}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}

            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetBtnText}>🔄 {tr('resetBtn', language)}</Text>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

export default SchemeCheckerScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FF9800', padding: 16, paddingTop: 14,
  },
  backArrow: { color: '#fff', fontSize: 22 },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  headerSub: { color: '#ffffffcc', fontSize: 11, marginTop: 2, textAlign: 'center' },
  content: { padding: 16 },

  questionCard: { borderRadius: 14, padding: 16, marginBottom: 14, elevation: 2 },
  questionText: { fontSize: 15, fontWeight: '700', marginBottom: 12 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn: { borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  optionText: { fontSize: 13, fontWeight: '600' },

  checkBtn: {
    backgroundColor: '#4CAF50', padding: 16, borderRadius: 14,
    alignItems: 'center', marginBottom: 20, elevation: 3,
  },
  checkBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  resultsTitle: { fontSize: 16, fontWeight: '800', marginBottom: 14 },

  schemeCard: { borderRadius: 14, marginBottom: 14, overflow: 'hidden', elevation: 3 },
  schemeHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  schemeEmoji: { fontSize: 28 },
  schemeName: { fontSize: 16, fontWeight: '800', flex: 1 },
  schemeBody: { padding: 14 },
  schemeLabel: { fontSize: 12, fontWeight: '800', marginBottom: 4 },
  schemeDesc: { fontSize: 14, lineHeight: 22 },

  noResultCard: { borderRadius: 14, padding: 24, alignItems: 'center', elevation: 2 },
  noResultText: { fontSize: 15, textAlign: 'center' },

  resetBtn: {
    borderWidth: 2, borderColor: '#FF9800', borderRadius: 14,
    padding: 14, alignItems: 'center', marginBottom: 20,
  },
  resetBtnText: { color: '#FF9800', fontWeight: '700', fontSize: 15 },
});
