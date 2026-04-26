// src/data/educationData.ts
// VoiceForAll — Education Category Content
// 8 topics × 7 languages, medium detail (45–60 seconds spoken)

import type { OfficialLink } from './types';

export type Language =
  | 'english'
  | 'hindi'
  | 'malayalam'
  | 'marathi'
  | 'tamil'
  | 'telugu'
  | 'bengali';

export interface TopicContent {
  title: string;
  shortDescription: string;
  fullContent: string;
}

export interface EducationTopic {
  id: string;
  icon: string;
  color: string;
  officialLinks: OfficialLink[];
  content: Record<Language, TopicContent>;
}

export const educationTopics: EducationTopic[] = [

  // ─────────────────────────────────────────
  // 1. Basic Literacy
  // ─────────────────────────────────────────
  {
    id: 'basic_literacy',
    icon: '📖',
    color: '#9C27B0',
    officialLinks: [
      { name: 'National Literacy Mission', url: 'https://nlm.nic.in', phone: null },
      { name: 'ULLAS - New India Literacy', url: 'https://newindialiteracy.gov.in', phone: null },
      { name: 'Education Helpline', url: null, phone: '1800-180-9393' },
    ],
    content: {
      english: {
        title: 'Basic Literacy',
        shortDescription: 'Learn to read, write and sign your own name',
        fullContent:
          'Being able to read and write opens many doors in life. ' +
          'Even learning to read your own name and sign it — instead of using a thumbprint — can give you more confidence and independence. ' +
          'The government runs a free programme called ULLAS — New India Literacy Programme — for adults above 15 years of age who were not able to attend school. ' +
          'Through this programme you can learn to read, write, do basic arithmetic, and understand important things like government forms and medicine labels. ' +
          'Classes are often held in the evenings or early mornings so they do not interfere with your daily work. ' +
          'Your local Anganwadi worker, ASHA worker, or Gram Panchayat can tell you where classes are held in your village. ' +
          'Many states also have mobile learning apps and radio programmes for adult learners. ' +
          'Even learning for one hour daily can make a big difference in just three to six months.',
      },
      hindi: {
        title: 'बुनियादी साक्षरता',
        shortDescription: 'पढ़ना, लिखना और अपना नाम लिखना सीखें',
        fullContent:
          'पढ़ने और लिखने में सक्षम होना जीवन में कई दरवाजे खोलता है। ' +
          'अपना नाम पढ़ना और अंगूठे की जगह हस्ताक्षर करना भी आपको अधिक आत्मविश्वास और स्वतंत्रता दे सकता है। ' +
          'सरकार 15 वर्ष से अधिक आयु के उन वयस्कों के लिए उल्लास — नव भारत साक्षरता कार्यक्रम — चलाती है जो स्कूल नहीं जा सके। ' +
          'इस कार्यक्रम के जरिए आप पढ़ना, लिखना, बुनियादी गणित और सरकारी फॉर्म व दवाओं के लेबल समझना सीख सकते हैं। ' +
          'कक्षाएं अक्सर शाम या सुबह जल्दी होती हैं ताकि आपके दैनिक काम में बाधा न हो। ' +
          'आपकी स्थानीय आंगनवाड़ी कार्यकर्ता, आशा कार्यकर्ता या ग्राम पंचायत बता सकती है कि आपके गांव में कक्षाएं कहां होती हैं। ' +
          'प्रतिदिन एक घंटे पढ़ने से तीन से छह महीने में बड़ा फर्क पड़ सकता है।',
      },
      malayalam: {
        title: 'അടിസ്ഥാന സാക്ഷരത',
        shortDescription: 'വായിക്കാനും എഴുതാനും സ്വന്തം പേര് ഒപ്പിടാനും പഠിക്കുക',
        fullContent:
          'വായിക്കാനും എഴുതാനും കഴിയുന്നത് ജീവിതത്തിൽ പല വഴികൾ തുറക്കുന്നു. ' +
          'സ്വന്തം പേര് വായിക്കാനും തള്ളവിരൽ പതിക്കുന്നതിന് പകരം ഒപ്പിടാനും കഴിയുന്നത് ആത്മവിശ്വാസം നൽകുന്നു. ' +
          'സ്കൂളിൽ പോകാൻ കഴിയാത്ത 15 വയസ്സ് കഴിഞ്ഞ മുതിർന്നവർക്ക് സർക്കാർ ULLAS — നവ ഭാരത് സാക്ഷരതാ പദ്ധതി — നടത്തുന്നു. ' +
          'ഈ പദ്ധതി വഴി വായനയും എഴുത്തും, അടിസ്ഥാന ഗണിതവും, സർക്കാർ ഫോം, മരുന്നിൻ്റെ ലേബൽ മനസ്സിലാക്കലും പഠിക്കാം. ' +
          'ദൈനംദിന ജോലിക്ക് തടസ്സം ഉണ്ടാകാതിരിക്കാൻ ക്ലാസ്സ് സന്ധ്യ അല്ലെങ്കിൽ രാവിലെ നടക്കുന്നു. ' +
          'ദിവസേന ഒരു മണിക്കൂർ പഠിക്കുന്നത് 3-6 മാസത്തിൽ വലിയ മാറ്റം ഉണ്ടാക്കും.',
      },
      marathi: {
        title: 'मूलभूत साक्षरता',
        shortDescription: 'वाचणे, लिहिणे आणि स्वतःचे नाव सही करणे शिका',
        fullContent:
          'वाचणे आणि लिहिणे जीवनात अनेक संधी उघडते. ' +
          'आपले नाव वाचणे आणि अंगठ्याऐवजी सही करणे देखील आत्मविश्वास आणि स्वातंत्र्य देते. ' +
          'शाळेत जाऊ न शकलेल्या १५ वर्षांवरील प्रौढांसाठी सरकार उल्लास — नव भारत साक्षरता कार्यक्रम — चालवते. ' +
          'या कार्यक्रमातून वाचणे, लिहिणे, मूलभूत गणित आणि सरकारी अर्ज समजून घेणे शिकता येते. ' +
          'वर्ग अनेकदा संध्याकाळी किंवा पहाटे असतात जेणेकरून दैनंदिन कामात अडचण येणार नाही. ' +
          'दररोज एक तास शिक्षण घेतल्यास तीन ते सहा महिन्यांत मोठा फरक पडू शकतो।',
      },
      tamil: {
        title: 'அடிப்படை கல்வியறிவு',
        shortDescription: 'படிக்க, எழுத மற்றும் சொந்த பெயர் கையெழுத்திட கற்றுக்கொள்ளுங்கள்',
        fullContent:
          'படிக்கவும் எழுதவும் தெரிவது வாழ்க்கையில் பல வாயில்களை திறக்கிறது. ' +
          'சொந்த பெயரை படிக்கவும் கட்டை விரல் பதிலாக கையெழுத்திடவும் தெரிவது நம்பிக்கையை அளிக்கிறது. ' +
          'பள்ளிக்கு செல்ல முடியாத 15 வயதுக்கு மேற்பட்டவர்களுக்கு அரசு ULLAS — புதிய இந்தியா கல்வியறிவு திட்டம் — நடத்துகிறது. ' +
          'இந்த திட்டம் மூலம் படிக்க, எழுத, அடிப்படை கணிதம் மற்றும் அரசு படிவங்கள் புரிந்துகொள்ள கற்றுக்கொள்ளலாம். ' +
          'தினசரி ஒரு மணிநேரம் படிப்பது மூன்று முதல் ஆறு மாதங்களில் பெரிய மாற்றத்தை ஏற்படுத்தும்.',
      },
      telugu: {
        title: 'ప్రాథమిక అక్షరాస్యత',
        shortDescription: 'చదవడం, రాయడం మరియు సొంత పేరు సంతకం చేయడం నేర్చుకోండి',
        fullContent:
          'చదవడం మరియు రాయడం జీవితంలో చాలా అవకాశాలు తెరుస్తుంది. ' +
          'సొంత పేరు చదవడం మరియు బొటనవేలు ముద్ర బదులు సంతకం చేయడం నమ్మకాన్ని ఇస్తుంది. ' +
          'పాఠశాలకు వెళ్ళలేకపోయిన 15 సంవత్సరాలు దాటిన వయోజనులకు ప్రభుత్వం ULLAS — న్యూ ఇండియా లిటరసీ ప్రోగ్రామ్ — నిర్వహిస్తుంది. ' +
          'ఈ కార్యక్రమం ద్వారా చదవడం, రాయడం, ప్రాథమిక గణితం మరియు ప్రభుత్వ ఫారాలు అర్థం చేసుకోవడం నేర్చుకోవచ్చు. ' +
          'రోజూ ఒక గంట చదవడం మూడు నుండి ఆరు నెలల్లో పెద్ద మార్పు తీసుకొస్తుంది.',
      },
      bengali: {
        title: 'মৌলিক সাক্ষরতা',
        shortDescription: 'পড়তে, লিখতে এবং নিজের নামে সই করতে শিখুন',
        fullContent:
          'পড়তে ও লিখতে পারা জীবনে অনেক দরজা খুলে দেয়। ' +
          'নিজের নাম পড়তে এবং বুড়ো আঙুলের ছাপের বদলে সই করতে পারা আত্মবিশ্বাস দেয়। ' +
          'স্কুলে যেতে না পারা ১৫ বছরের বেশি বয়সীদের জন্য সরকার ULLAS — নতুন ভারত সাক্ষরতা কর্মসূচি — চালায়। ' +
          'এই কর্মসূচিতে পড়া, লেখা, মৌলিক অংক এবং সরকারি ফর্ম বোঝা শেখা যায়। ' +
          'প্রতিদিন এক ঘণ্টা পড়লে তিন থেকে ছয় মাসে বড় পরিবর্তন আসতে পারে।',
      },
    },
  },

  // ─────────────────────────────────────────
  // 2. Financial Literacy
  // ─────────────────────────────────────────
  {
    id: 'financial_literacy',
    icon: '💳',
    color: '#4CAF50',
    officialLinks: [
      { name: 'RBI Financial Education', url: 'https://rbi.org.in/financialeducation', phone: null },
      { name: 'SEBI Investor Education',  url: 'https://investor.sebi.gov.in', phone: null },
      { name: 'Banking Helpline',          url: null, phone: '18001800111' },
    ],
    content: {
      english: {
        title: 'Financial Literacy',
        shortDescription: 'Manage money wisely, avoid debt traps',
        fullContent:
          'Financial literacy means understanding how to manage your money wisely. ' +
          'Always keep track of how much money comes in and how much goes out every month. ' +
          'Try to save at least 10 percent of your income every month, even if it is a small amount. ' +
          'Keep your savings in a bank account — never keep large amounts of cash at home as it can be lost or stolen. ' +
          'Be very careful about taking loans. Before borrowing, make sure you understand the interest rate and monthly repayment amount. ' +
          'Avoid moneylenders who charge very high interest — always prefer bank loans or government credit schemes. ' +
          'Microfinance or Self Help Groups called SHGs are a good option for small loans at low interest. ' +
          'Never invest money in schemes that promise very high returns — these are usually frauds. ' +
          'If you receive a suspicious call about lottery winnings or investment opportunities, hang up immediately and report to the cyber crime helpline at 1930.',
      },
      hindi: {
        title: 'वित्तीय साक्षरता',
        shortDescription: 'पैसे को समझदारी से संभालें, कर्ज के जाल से बचें',
        fullContent:
          'वित्तीय साक्षरता का मतलब है अपने पैसे को समझदारी से प्रबंधित करना। ' +
          'हर महीने कितना पैसा आता है और कितना जाता है इसका हिसाब रखें। ' +
          'चाहे छोटी राशि ही सही, हर महीने कम से कम 10 प्रतिशत बचत करने की कोशिश करें। ' +
          'बचत बैंक खाते में रखें — घर पर बड़ी राशि नकद न रखें। ' +
          'कर्ज लेने से पहले ब्याज दर और मासिक किस्त की राशि जरूर समझें। ' +
          'बहुत अधिक ब्याज लेने वाले साहूकारों से बचें — हमेशा बैंक लोन या सरकारी योजनाओं को प्राथमिकता दें। ' +
          'स्वयं सहायता समूह यानी एसएचजी छोटे कर्ज के लिए एक अच्छा विकल्प है। ' +
          'बहुत ज्यादा रिटर्न का वादा करने वाली योजनाओं में पैसा न लगाएं। ' +
          'संदिग्ध फोन कॉल आने पर तुरंत काटें और साइबर क्राइम हेल्पलाइन 1930 पर रिपोर्ट करें।',
      },
      malayalam: {
        title: 'സാമ്പത്തിക സാക്ഷരത',
        shortDescription: 'പണം ബുദ്ധിപൂർവ്വം കൈകാര്യം ചെയ്യുക, കടക്കെണിയിൽ നിന്ന് രക്ഷപ്പെടുക',
        fullContent:
          'സാമ്പത്തിക സാക്ഷരത എന്നത് പണം ബുദ്ധിപൂർവ്വം കൈകാര്യം ചെയ്യുന്നതിനെ മനസ്സിലാക്കുക എന്നതാണ്. ' +
          'എല്ലാ മാസവും എത്ര വരുന്നു, എത്ര ചെലവാകുന്നു എന്ന് കണക്ക് സൂക്ഷിക്കുക. ' +
          'ആദായത്തിൻ്റെ 10 ശതമാനം എങ്കിലും ഓരോ മാസവും ലഭിക്കാൻ ശ്രമിക്കുക. ' +
          'ബാങ്ക് അക്കൗണ്ടിൽ സൂക്ഷിക്കുക — വീട്ടിൽ വലിയ തുക നേരിട്ട് സൂക്ഷിക്കരുത്. ' +
          'കടം വാങ്ങുന്നതിന് മുമ്പ് പലിശ നിരക്കും, മാസ തിരിച്ചടവ് തുകയും മനസ്സിലാക്കുക. ' +
          'അധിക പലിശ ഈടാക്കുന്ന പണം കടം കൊടുക്കുന്നവരെ ഒഴിവാക്കുക — ബാങ്ക് ലോണ്‍ അല്ലെങ്കിൽ ചെറുകിട വായ്പ ഗ്രൂപ്പ് (SHG) ഉപയോഗിക്കുക. ' +
          'വളരെ ഉയർന്ന ആദായം വാഗ്ദാനം ചെയ്യുന്ന പദ്ധതികളിൽ നിക്ഷേപിക്കരുത് — ഇവ സാധാരണ തട്ടിപ്പ് ആണ്. ' +
          'സൈബർ കുറ്റകൃത്യ ഹെൽപ്‌ലൈൻ 1930.',
      },
      marathi: {
        title: 'आर्थिक साक्षरता',
        shortDescription: 'पैशांचे व्यवस्थापन करा, कर्जाच्या सापळ्यापासून वाचा',
        fullContent:
          'आर्थिक साक्षरता म्हणजे पैशांचे हुशारीने व्यवस्थापन करण्याचे ज्ञान. ' +
          'दरमहा किती पैसे येतात आणि किती खर्च होतात याचा हिशेब ठेवा. ' +
          'दरमहा किमान १० टक्के बचत करण्याचा प्रयत्न करा. ' +
          'बचत बँक खात्यात ठेवा — घरी मोठी रक्कम रोख ठेवू नका. ' +
          'कर्ज घेण्यापूर्वी व्याजदर आणि मासिक हप्ता समजून घ्या. ' +
          'जास्त व्याज आकारणाऱ्या सावकारांपासून दूर राहा — बँक कर्ज किंवा स्वयंसहायता गट वापरा. ' +
          'खूप जास्त परतावा देण्याचे आश्वासन देणाऱ्या योजनांमध्ये पैसे गुंतवू नका. ' +
          'संशयास्पद फोन आल्यास सायबर हेल्पलाइन १९३० वर तक्रार करा.',
      },
      tamil: {
        title: 'நிதி கல்வியறிவு',
        shortDescription: 'பணத்தை புத்திசாலித்தனமாக நிர்வகியுங்கள், கடன் பொறியை தவிர்க்கவும்',
        fullContent:
          'நிதி கல்வியறிவு என்பது பணத்தை புத்திசாலித்தனமாக நிர்வகிப்பது எப்படி என்று புரிந்துகொள்வதாகும். ' +
          'ஒவ்வொரு மாதமும் எவ்வளவு வருகிறது, எவ்வளவு செலவாகிறது என்று கணக்கு வையுங்கள். ' +
          'வருமானத்தில் குறைந்தது 10 சதவீதம் மாதம் சேமியுங்கள். ' +
          'சேமிப்பை வங்கி கணக்கில் வையுங்கள் — வீட்டில் பெரிய தொகை வைக்காதீர்கள். ' +
          'கடன் வாங்குவதற்கு முன் வட்டி விகிதம் மற்றும் மாதாந்திர திருப்பிச் செலுத்தும் தொகை புரிந்துகொள்ளுங்கள். ' +
          'அதிக வட்டி வசூலிக்கும் வட்டிக்காரர்களை தவிர்க்கவும் — வங்கி கடன் அல்லது சுயஉதவி குழுக்களை (SHG) தேர்ந்தெடுங்கள். ' +
          'சந்தேகமான அழைப்புகள் வந்தால் சைபர் கிரைம் ஹெல்ப்லைன் 1930 ல் புகார் செய்யுங்கள்.',
      },
      telugu: {
        title: 'ఆర్థిక అక్షరాస్యత',
        shortDescription: 'డబ్బు తెలివిగా నిర్వహించండి, అప్పు వలలో పడకండి',
        fullContent:
          'ఆర్థిక అక్షరాస్యత అంటే డబ్బు తెలివిగా నిర్వహించడం ఎలాగో అర్థం చేసుకోవడం. ' +
          'ప్రతి నెల ఎంత వస్తుంది, ఎంత ఖర్చవుతుందో లెక్కలు పెట్టుకోండి. ' +
          'ప్రతి నెల ఆదాయంలో కనీసం 10 శాతం పొదుపు చేయండి. ' +
          'పొదుపును బ్యాంక్ ఖాతాలో ఉంచండి — ఇంట్లో పెద్ద మొత్తం నగదు ఉంచకండి. ' +
          'అప్పు తీసుకోవడానికి ముందు వడ్డీ రేటు మరియు నెలసరి తిరిగి చెల్లించే మొత్తం అర్థం చేసుకోండి. ' +
          'అధిక వడ్డీ వసూలు చేసే వడ్డీ వ్యాపారులను తప్పించుకోండి — బ్యాంక్ రుణం లేదా స్వయం సహాయక సంఘాలు (SHG) ఎంచుకోండి. ' +
          'అనుమానాస్పద కాల్‌లు వస్తే సైబర్ క్రైమ్ హెల్ప్‌లైన్ 1930 కి రిపోర్ట్ చేయండి.',
      },
      bengali: {
        title: 'আর্থিক সাক্ষরতা',
        shortDescription: 'টাকা বুদ্ধিমত্তার সাথে পরিচালনা করুন, ঋণের ফাঁদ এড়ান',
        fullContent:
          'আর্থিক সাক্ষরতা মানে টাকা বুদ্ধিমত্তার সাথে পরিচালনা করতে বোঝা। ' +
          'প্রতি মাসে কত টাকা আসে এবং কত যায় তার হিসাব রাখুন। ' +
          'প্রতি মাসে অন্তত ১০ শতাংশ সঞ্চয় করার চেষ্টা করুন। ' +
          'সঞ্চয় ব্যাংক অ্যাকাউন্টে রাখুন — বাড়িতে বড় অঙ্কের নগদ রাখবেন না। ' +
          'ঋণ নেওয়ার আগে সুদের হার ও মাসিক কিস্তি বুঝুন। ' +
          'উচ্চ সুদের মহাজনদের এড়িয়ে চলুন — ব্যাংক ঋণ বা স্বনির্ভর গোষ্ঠী (SHG) বেছে নিন। ' +
          'সন্দেহজনক ফোন এলে সাইবার ক্রাইম হেল্পলাইন ১৯৩০-এ জানান।',
      },
    },
  },

  // ─────────────────────────────────────────
  // 3. Digital Skills
  // ─────────────────────────────────────────
  {
    id: 'digital_skills',
    icon: '💻',
    color: '#2196F3',
    officialLinks: [
      { name: 'PMGDISHA Portal',    url: 'https://pmgdisha.in', phone: null },
      { name: 'DigiLocker',         url: 'https://digilocker.gov.in', phone: null },
      { name: 'Digital India',      url: 'https://digitalindia.gov.in', phone: null },
    ],
    content: {
      english: {
        title: 'Digital Skills',
        shortDescription: 'Use smartphones and internet for daily life benefits',
        fullContent:
          'Basic digital skills can change your life in many ways. ' +
          'Knowing how to use a smartphone allows you to access government services, check bank balances, send money, and get information — all without travelling far. ' +
          'The government runs a free digital training programme called PM Gramin Digital Saksharta Abhiyan, or PMGDISHA, that teaches basic computer and smartphone use to rural citizens. ' +
          'Start with simple skills — learn to make video calls to stay connected with family, learn to use Google Maps to navigate, and learn to use UPI apps like PhonePe or GPay to send and receive money safely. ' +
          'DigiLocker is a free government app where you can store digital copies of all your documents — Aadhaar, driving licence, ration card — so you never need to carry originals. ' +
          'Be careful about online fraud — never share your OTP, bank details, or Aadhaar number with anyone who calls you. ' +
          'If you are cheated online, report immediately to the cyber crime helpline at 1930.',
      },
      hindi: {
        title: 'डिजिटल कौशल',
        shortDescription: 'रोजमर्रा के लाभ के लिए स्मार्टफोन और इंटरनेट का उपयोग करें',
        fullContent:
          'बुनियादी डिजिटल कौशल आपके जीवन को कई तरह से बदल सकता है। ' +
          'स्मार्टफोन का उपयोग करना जानने से आप दूर यात्रा किए बिना सरकारी सेवाएं, बैंक बैलेंस जांच, पैसे भेजना और जानकारी प्राप्त कर सकते हैं। ' +
          'सरकार पीएम ग्रामीण डिजिटल साक्षरता अभियान — पीएमजीदिशा — चलाती है जो ग्रामीण नागरिकों को बुनियादी कंप्यूटर और स्मार्टफोन उपयोग सिखाती है। ' +
          'सरल कौशल से शुरू करें — वीडियो कॉल, गूगल मैप्स और यूपीआई ऐप जैसे PhonePe या GPay से पैसे भेजना सीखें। ' +
          'डिजिलॉकर एक मुफ्त सरकारी ऐप है जहां आधार, ड्राइविंग लाइसेंस, राशन कार्ड के डिजिटल प्रतियां रख सकते हैं। ' +
          'ऑनलाइन धोखाधड़ी से सावधान रहें — कभी भी ओटीपी, बैंक विवरण या आधार नंबर शेयर न करें। ' +
          'साइबर धोखाधड़ी होने पर 1930 पर तुरंत रिपोर्ट करें।',
      },
      malayalam: {
        title: 'ഡിജിറ്റൽ നൈപുണ്യം',
        shortDescription: 'ദൈനംദിന ജീവിത ആനുകൂല്യങ്ങൾക്ക് സ്മാർട്ട്ഫോൺ ഉപയോഗിക്കുക',
        fullContent:
          'ഡിജിറ്റൽ അടിസ്ഥാന നൈപുണ്യം ജീവിതം പലതരത്തിൽ മാറ്റിമറിക്കും. ' +
          'സ്മാർട്ട്ഫോൺ ഉപയോഗിക്കാൻ അറിയുന്നത് ദൂരം യാത്ര ചെയ്യാതെ സർക്കാർ സേവനങ്ങൾ, ബാങ്ക് ബാലൻസ്, പണം അയക്കൽ, വിവരങ്ങൾ ലഭിക്കാൻ അനുവദിക്കുന്നു. ' +
          'PMGDISHA ഗ്രാമീണ ഡിജിറ്റൽ പരിശീലനം സൗജന്യമായി ലഭ്യം. ' +
          'വീഡിയോ കോൾ, ഗൂഗിൾ മാപ്സ്, PhonePe/GPay വഴി പണം അയക്കൽ തുടങ്ങിയ ലളിതമായ നൈപുണ്യം ആദ്യം പഠിക്കുക. ' +
          'DigiLocker ൽ ആധാർ, ഡ്രൈവിംഗ് ലൈസൻസ്, റേഷൻ കാർഡ് ഡിജിറ്റൽ കോപ്പി സൂക്ഷിക്കാം. ' +
          'ഒടിപി, ബാങ്ക് വിവരങ്ങൾ ആരോടും ഒരിക്കലും പങ്കിടരുത്. ' +
          'ഓൺലൈൻ തട്ടിപ്പ് നടന്നാൽ 1930 ൽ ഉടനടി റിപ്പോർട്ട് ചെയ്യുക.',
      },
      marathi: {
        title: 'डिजिटल कौशल्ये',
        shortDescription: 'दैनंदिन जीवनासाठी स्मार्टफोन आणि इंटरनेट वापरा',
        fullContent:
          'मूलभूत डिजिटल कौशल्ये जीवन अनेक प्रकारे बदलू शकतात. ' +
          'स्मार्टफोन वापरणे जाणून घेतल्यास दूर प्रवास न करता सरकारी सेवा, बँक बॅलन्स, पैसे पाठवणे आणि माहिती मिळवता येते. ' +
          'पीएमजीदिशा कार्यक्रम ग्रामीण नागरिकांना मोफत डिजिटल प्रशिक्षण देतो. ' +
          'व्हिडिओ कॉल, गूगल मॅप्स आणि PhonePe सारख्या यूपीआय अॅपने पैसे पाठवणे शिका. ' +
          'DigiLocker मध्ये आधार, रेशन कार्ड यांच्या डिजिटल प्रती साठवता येतात. ' +
          'ओटीपी, बँक माहिती कधीही शेअर करू नका. ' +
          'ऑनलाइन फसवणूक झाल्यास १९३० वर तक्रार करा.',
      },
      tamil: {
        title: 'டிஜிட்டல் திறன்கள்',
        shortDescription: 'அன்றாட வாழ்க்கை பயன்களுக்கு ஸ்மார்ட்போன் பயன்படுத்துங்கள்',
        fullContent:
          'அடிப்படை டிஜிட்டல் திறன்கள் வாழ்க்கையை பல வழிகளில் மாற்றும். ' +
          'ஸ்மார்ட்போன் பயன்படுத்த தெரிந்தால் தொலை பயணம் இல்லாமல் அரசு சேவைகள், வங்கி இருப்பு சோதனை, பணம் அனுப்புதல் அனைத்தும் செய்யலாம். ' +
          'PMGDISHA திட்டம் கிராம மக்களுக்கு இலவச டிஜிட்டல் பயிற்சி வழங்குகிறது. ' +
          'வீடியோ கால், Google Maps, PhonePe போன்ற UPI ஆப்புகள் மூலம் பணம் அனுப்புதல் கற்றுக்கொள்ளுங்கள். ' +
          'DigiLocker ல் ஆதார், ரேஷன் கார்டு டிஜிட்டல் நகல்கள் பாதுகாப்பாக சேமிக்கலாம். ' +
          'ஒடிபி, வங்கி விவரங்களை யாரிடமும் பகிர்ந்துகொள்ளாதீர்கள். ' +
          'ஆன்லைன் மோசடி நடந்தால் 1930 ல் புகார் செய்யுங்கள்.',
      },
      telugu: {
        title: 'డిజిటల్ నైపుణ్యాలు',
        shortDescription: 'రోజువారీ జీవిత ప్రయోజనాల కోసం స్మార్ట్‌ఫోన్ ఉపయోగించండి',
        fullContent:
          'ప్రాథమిక డిజిటల్ నైపుణ్యాలు జీవితాన్ని అనేక విధాలుగా మార్చగలవు. ' +
          'స్మార్ట్‌ఫోన్ ఉపయోగించడం తెలిస్తే దూరం ప్రయాణించకుండా ప్రభుత్వ సేవలు, బ్యాంక్ బాలెన్స్, డబ్బు పంపడం అన్నీ చేయవచ్చు. ' +
          'PMGDISHA కార్యక్రమం గ్రామీణ పౌరులకు ఉచిత డిజిటల్ శిక్షణ అందిస్తుంది. ' +
          'వీడియో కాల్, Google Maps, PhonePe ద్వారా డబ్బు పంపడం నేర్చుకోండి. ' +
          'DigiLocker లో ఆధార్, రేషన్ కార్డ్ డిజిటల్ కాపీలు సేవ్ చేయవచ్చు. ' +
          'ఓటిపి, బ్యాంక్ వివరాలు ఎవరికీ చెప్పకండి. ' +
          'ఆన్‌లైన్ మోసం జరిగితే 1930 కి వెంటనే రిపోర్ట్ చేయండి.',
      },
      bengali: {
        title: 'ডিজিটাল দক্ষতা',
        shortDescription: 'দৈনন্দিন জীবনের সুবিধার জন্য স্মার্টফোন ও ইন্টারনেট ব্যবহার করুন',
        fullContent:
          'মৌলিক ডিজিটাল দক্ষতা জীবনকে অনেকভাবে বদলে দিতে পারে। ' +
          'স্মার্টফোন ব্যবহার জানলে দূরে না গিয়েই সরকারি সেবা, ব্যাংক ব্যালেন্স, টাকা পাঠানো সব করা যায়। ' +
          'PMGDISHA কার্যক্রম গ্রামীণ মানুষদের বিনামূল্যে ডিজিটাল প্রশিক্ষণ দেয়। ' +
          'ভিডিও কল, Google Maps, PhonePe-এর মাধ্যমে টাকা পাঠানো শিখুন। ' +
          'DigiLocker-এ আধার, রেশন কার্ডের ডিজিটাল কপি সংরক্ষণ করুন। ' +
          'ওটিপি, ব্যাংক তথ্য কখনো শেয়ার করবেন না। ' +
          'অনলাইনে প্রতারণা হলে ১৯৩০-এ সঙ্গে সঙ্গে জানান।',
      },
    },
  },

  // ─────────────────────────────────────────
  // 4. Children's Education
  // ─────────────────────────────────────────
  {
    id: 'children_education',
    icon: '👶',
    color: '#FF9800',
    officialLinks: [
      { name: 'Samagra Shiksha',     url: 'https://samagra.education.gov.in', phone: null },
      { name: 'Mid Day Meal Scheme',  url: 'https://mdm.nic.in', phone: null },
      { name: 'Education Helpline',   url: null, phone: '1800-180-9393' },
    ],
    content: {
      english: {
        title: "Children's Education",
        shortDescription: 'Know your child\'s right to free education up to age 14',
        fullContent:
          'Every child in India between 6 and 14 years of age has the legal right to free and compulsory education under the Right to Education Act, also called RTE. ' +
          'No school can deny admission to a child in this age group. ' +
          'Government schools provide completely free education including free textbooks, midday meals, and uniforms. ' +
          'Under RTE, 25 percent of seats in private schools must be reserved for children from poor and disadvantaged families at no cost. ' +
          'If your child is not in school, contact your nearest government school or Gram Panchayat immediately. ' +
          'Never allow children below 14 years to work — child labour is illegal and must be reported to the Child Helpline at 1098. ' +
          'Encourage girls to stay in school — the Kasturba Gandhi Balika Vidyalaya scheme provides free residential schooling for girls from minority and disadvantaged communities. ' +
          'Regular school attendance and parental interest are the most important factors in a child\'s educational success.',
      },
      hindi: {
        title: 'बच्चों की शिक्षा',
        shortDescription: '14 वर्ष तक मुफ्त शिक्षा का अधिकार जानें',
        fullContent:
          'शिक्षा का अधिकार कानून यानी आरटीई के तहत भारत में 6 से 14 वर्ष के हर बच्चे को मुफ्त और अनिवार्य शिक्षा का कानूनी अधिकार है। ' +
          'कोई भी स्कूल इस आयु वर्ग के बच्चे को प्रवेश देने से इनकार नहीं कर सकता। ' +
          'सरकारी स्कूल मुफ्त पाठ्यपुस्तकें, मध्याह्न भोजन और यूनिफॉर्म सहित पूरी तरह मुफ्त शिक्षा देते हैं। ' +
          'आरटीई के तहत निजी स्कूलों में गरीब बच्चों के लिए 25 प्रतिशत सीटें आरक्षित हैं। ' +
          'बच्चा स्कूल नहीं जाता है तो तुरंत नजदीकी सरकारी स्कूल या ग्राम पंचायत से संपर्क करें। ' +
          '14 साल से कम उम्र के बच्चों से काम कराना अवैध है — बाल मजदूरी की शिकायत 1098 चाइल्ड हेल्पलाइन पर करें। ' +
          'लड़कियों को स्कूल में रखने के लिए प्रोत्साहित करें।',
      },
      malayalam: {
        title: 'കുട്ടികളുടെ വിദ്യാഭ്യാസം',
        shortDescription: '14 വയസ്സ് വരെ സൗജന്യ വിദ്യാഭ്യാസം ലഭിക്കാനുള്ള അവകാശം',
        fullContent:
          'ശിക്ഷാ അവകാശ നിയമം (RTE) അനുസരിച്ച് ഇന്ത്യയിൽ 6 മുതൽ 14 വയസ്സ് വരെ ഓരോ കുട്ടിക്കും സൗജന്യ നിർബന്ധ വിദ്യാഭ്യാസം ലഭിക്കാനുള്ള നിയമ അവകാശമുണ്ട്. ' +
          'ഒരു സ്കൂളിനും ഈ പ്രായ വിഭാഗത്തിലെ കുട്ടിയെ പ്രവേശനം നൽകാൻ നിരസിക്കാൻ കഴിയില്ല. ' +
          'സർക്കാർ സ്കൂളിൽ സൗജന്യ പുസ്തകം, ഉച്ചഭക്ഷണം, യൂണിഫോം ലഭിക്കുന്നു. ' +
          'സ്വകാര്യ സ്കൂളിലെ 25 ശതമാനം സീറ്റ് ദരിദ്ര കുട്ടികൾക്ക് RTE പ്രകാരം സൗജന്യം. ' +
          '14 വയസ്സ് താഴെ കുട്ടികളെ ജോലിക്ക് വിടുന്നത് നിയമ ലംഘനമാണ് — 1098 ചൈൽഡ് ഹെൽപ്‌ലൈൻ.',
      },
      marathi: {
        title: 'मुलांचे शिक्षण',
        shortDescription: '14 वर्षापर्यंत मोफत शिक्षणाचा हक्क जाणून घ्या',
        fullContent:
          'शिक्षण हक्क कायदा म्हणजे आरटीई अंतर्गत भारतातील ६ ते १४ वर्षातील प्रत्येक मुलाला मोफत आणि सक्तीच्या शिक्षणाचा कायदेशीर हक्क आहे. ' +
          'कोणतीही शाळा या वयोगटातील मुलाला प्रवेश नाकारू शकत नाही. ' +
          'सरकारी शाळांमध्ये मोफत पाठ्यपुस्तके, मध्यान्ह भोजन आणि गणवेश मिळतो. ' +
          'आरटीई अंतर्गत खाजगी शाळांमध्ये गरीब मुलांसाठी २५ टक्के जागा राखीव आहेत. ' +
          '१४ वर्षांखालील मुलांकडून काम करवून घेणे बेकायदेशीर आहे — बाल कामगार तक्रारीसाठी १०९८ वर फोन करा.',
      },
      tamil: {
        title: 'குழந்தைகள் கல்வி',
        shortDescription: '14 வயது வரை இலவச கல்விக்கான உரிமை தெரிந்துகொள்ளுங்கள்',
        fullContent:
          'கல்வி உரிமை சட்டம் (RTE) கீழ் இந்தியாவில் 6 முதல் 14 வயது வரை உள்ள ஒவ்வொரு குழந்தைக்கும் இலவச மற்றும் கட்டாய கல்வி பெறுவதற்கான சட்டப்பூர்வ உரிமை உள்ளது. ' +
          'எந்த பள்ளியும் இந்த வயது குழந்தைகளுக்கு சேர்க்கை மறுக்க முடியாது. ' +
          'அரசு பள்ளிகளில் இலவச புத்தகங்கள், மதிய உணவு மற்றும் சீருடை கிடைக்கிறது. ' +
          'தனியார் பள்ளிகளில் 25% இடங்கள் ஏழை குழந்தைகளுக்கு RTE கீழ் இலவசம். ' +
          '14 வயதுக்குக் கீழே குழந்தைகளை வேலைக்கு அனுப்புவது சட்டவிரோதம் — 1098 சைல்ட் ஹெல்ப்லைனில் புகார் செய்யுங்கள்.',
      },
      telugu: {
        title: 'పిల్లల విద్య',
        shortDescription: '14 వయసు వరకు ఉచిత విద్యకు హక్కు తెలుసుకోండి',
        fullContent:
          'విద్యా హక్కు చట్టం (RTE) ప్రకారం భారతదేశంలో 6 నుండి 14 సంవత్సరాల మధ్య ప్రతి పిల్లవానికి ఉచిత మరియు నిర్బంధ విద్య పొందే చట్టపరమైన హక్కు ఉంది. ' +
          'ఏ పాఠశాలైనా ఈ వయసు పిల్లలకు ప్రవేశం నిరాకరించలేదు. ' +
          'ప్రభుత్వ పాఠశాలల్లో ఉచిత పుస్తకాలు, మధ్యాహ్న భోజనం మరియు యూనిఫాం లభిస్తాయి. ' +
          'ప్రైవేట్ పాఠశాలల్లో 25% సీట్లు పేద పిల్లలకు RTE కింద ఉచితం. ' +
          '14 సంవత్సరాల లోపు పిల్లలను పని చేయించడం చట్టవిరుద్ధం — 1098 చైల్డ్ హెల్ప్‌లైన్.',
      },
      bengali: {
        title: 'শিশুদের শিক্ষা',
        shortDescription: '14 বছর পর্যন্ত বিনামূল্যে শিক্ষার অধিকার জানুন',
        fullContent:
          'শিক্ষার অধিকার আইন (RTE) অনুযায়ী ভারতে ৬ থেকে ১৪ বছর বয়সী প্রতিটি শিশুর বিনামূল্যে ও বাধ্যতামূলক শিক্ষা পাওয়ার আইনি অধিকার রয়েছে। ' +
          'কোনো স্কুল এই বয়সের শিশুকে ভর্তি নিতে অস্বীকার করতে পারে না। ' +
          'সরকারি স্কুলে বিনামূল্যে বই, মধ্যাহ্নভোজন ও ইউনিফর্ম পাওয়া যায়। ' +
          'বেসরকারি স্কুলে ২৫% আসন গরিব শিশুদের জন্য RTE-তে বিনামূল্যে। ' +
          '১৪ বছরের নিচে শিশুদের কাজে লাগানো বেআইনি — ১০৯৮ চাইল্ড হেল্পলাইনে অভিযোগ করুন।',
      },
    },
  },

  // ─────────────────────────────────────────
  // 5. Adult Education
  // ─────────────────────────────────────────
  {
    id: 'adult_education',
    icon: '👨‍🎓',
    color: '#795548',
    officialLinks: [
      { name: 'ULLAS Programme',       url: 'https://newindialiteracy.gov.in', phone: null },
      { name: 'NIOS Open Schooling',   url: 'https://nios.ac.in', phone: null },
      { name: 'IGNOU Distance Edu',    url: 'https://ignou.ac.in', phone: null },
    ],
    content: {
      english: {
        title: 'Adult Education',
        shortDescription: 'Continue your education at any age through open schooling',
        fullContent:
          'It is never too late to continue your education. ' +
          'The National Institute of Open Schooling, called NIOS, allows adults who could not complete their schooling to appear for Class 10 and Class 12 board exams from home. ' +
          'NIOS offers flexible study — you can study at your own pace and appear for exams when you are ready. ' +
          'IGNOU, the Indira Gandhi National Open University, offers affordable degree and diploma courses that you can study from home including BA, B.Com, and vocational courses. ' +
          'The ULLAS programme provides basic literacy education for adults who never had a chance to attend school. ' +
          'Many state governments also offer evening schools and adult education centres in villages. ' +
          'Getting a Class 10 or 12 certificate opens the door to government jobs and many more opportunities. ' +
          'Do not feel embarrassed about learning at any age — education is a lifelong journey.',
      },
      hindi: {
        title: 'वयस्क शिक्षा',
        shortDescription: 'किसी भी उम्र में ओपन स्कूलिंग के जरिए पढ़ाई जारी रखें',
        fullContent:
          'अपनी शिक्षा जारी रखने में कभी देर नहीं होती। ' +
          'राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान यानी एनआईओएस उन वयस्कों को घर से कक्षा 10 और 12 की परीक्षा देने की सुविधा देता है जो पढ़ाई पूरी नहीं कर सके। ' +
          'एनआईओएस में लचीला अध्ययन है — अपनी गति से पढ़ें और जब तैयार हों तब परीक्षा दें। ' +
          'इग्नू घर से पढ़ाई के लिए सस्ते डिग्री और डिप्लोमा कोर्स जैसे बीए, बी.कॉम, व्यावसायिक पाठ्यक्रम प्रदान करता है। ' +
          'उल्लास कार्यक्रम उन वयस्कों के लिए बुनियादी साक्षरता देता है जिन्हें स्कूल जाने का मौका नहीं मिला। ' +
          'किसी भी उम्र में सीखने में शर्म महसूस न करें।',
      },
      malayalam: {
        title: 'മുതിർന്നവർക്കുള്ള വിദ്യാഭ്യാസം',
        shortDescription: 'ഏത് പ്രായത്തിലും ഓപ്പൺ സ്‌കൂളിംഗ് വഴി പഠനം തുടരുക',
        fullContent:
          'വിദ്യാഭ്യാസം തുടരാൻ ഒരിക്കലും വൈകിയില്ല. ' +
          'NIOS (ദേശീയ മുക്ത വിദ്യാലയ ശിക്ഷണ സ്ഥാപനം) പഠനം പൂർത്തിയാക്കാൻ കഴിയാതിരുന്ന മുതിർന്നവർക്ക് വീട്ടിൽ നിന്ന് 10, 12 ക്ലാസ്സ് പരീക്ഷ എഴുതാൻ സൗകര്യം ഒരുക്കുന്നു. ' +
          'IGNOU ഗൃഹ പഠനത്തിനായി ബിഎ, ബി.കോം ഉൾപ്പെടെ ചിലവ് കുറഞ്ഞ ഡിഗ്രി, ഡിപ്ലോമ കോഴ്‌സ് നൽകുന്നു. ' +
          'ULLAS പദ്ധതി സ്‌കൂളിൽ പോകാൻ കഴിയാതിരുന്ന മുതിർന്നവർക്ക് അടിസ്ഥാന സാക്ഷരത നൽകുന്നു. ' +
          'ഏത് പ്രായത്തിലും പഠിക്കുന്നതിൽ ലജ്ജിക്കേണ്ടതില്ല.',
      },
      marathi: {
        title: 'प्रौढ शिक्षण',
        shortDescription: 'कोणत्याही वयात खुल्या शाळेतून शिक्षण सुरू ठेवा',
        fullContent:
          'शिक्षण सुरू ठेवण्यास कधीही उशीर नाही. ' +
          'राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्था म्हणजे एनआयओएस शिक्षण अपूर्ण राहिलेल्या प्रौढांना घरून इयत्ता १० आणि १२ च्या परीक्षा देण्याची सुविधा देते. ' +
          'इग्नू घरून बीए, बी.कॉम सारखे परवडणारे पदवी आणि डिप्लोमा अभ्यासक्रम देते. ' +
          'उल्लास कार्यक्रम शाळेत जाण्याची संधी न मिळालेल्या प्रौढांना मूलभूत साक्षरता देतो. ' +
          'कोणत्याही वयात शिकण्यात लाज वाटू नका.',
      },
      tamil: {
        title: 'வயது வந்தோர் கல்வி',
        shortDescription: 'எந்த வயதிலும் திறந்தவெளி பள்ளி மூலம் படிப்பை தொடருங்கள்',
        fullContent:
          'கல்வியை தொடர ஒருபோதும் தாமதமில்லை. ' +
          'NIOS (தேசிய திறந்தவெளி பள்ளி கல்வி நிறுவனம்) படிப்பை முடிக்க முடியாதவர்களுக்கு வீட்டிலிருந்தே 10 மற்றும் 12-ம் வகுப்பு தேர்வு எழுத வசதி அளிக்கிறது. ' +
          'IGNOU வீட்டிலிருந்து படிக்க பி.ஏ, பி.காம் உட்பட சிறிய செலவில் பட்டம் மற்றும் டிப்ளோமா படிப்புகள் வழங்குகிறது. ' +
          'ULLAS திட்டம் பள்ளிக்கு செல்ல வாய்ப்பில்லாத பெரியவர்களுக்கு அடிப்படை கல்வி வழங்குகிறது. ' +
          'எந்த வயதிலும் படிப்பதில் வெட்கப்படாதீர்கள்.',
      },
      telugu: {
        title: 'వయోజన విద్య',
        shortDescription: 'ఏ వయసులోనైనా ఓపెన్ స్కూలింగ్ ద్వారా చదువు కొనసాగించండి',
        fullContent:
          'విద్య కొనసాగించడానికి ఎప్పుడూ ఆలస్యం కాదు. ' +
          'NIOS (జాతీయ ఓపెన్ స్కూల్ ఇన్స్టిట్యూట్) చదువు పూర్తి చేయలేకపోయిన వయోజనులకు ఇంటి నుండే 10, 12 తరగతి పరీక్షలు రాయడానికి వీలు కల్పిస్తుంది. ' +
          'IGNOU ఇంటి నుండి బిఎ, బి.కామ్ వంటి చవకైన డిగ్రీ, డిప్లొమా కోర్సులు అందిస్తుంది. ' +
          'ULLAS కార్యక్రమం పాఠశాలకు వెళ్ళలేకపోయిన వయోజనులకు ప్రాథమిక అక్షరాస్యత అందిస్తుంది. ' +
          'ఏ వయసులోనైనా నేర్చుకోవడానికి సిగ్గుపడకండి.',
      },
      bengali: {
        title: 'বয়স্ক শিক্ষা',
        shortDescription: 'যেকোনো বয়সে উন্মুক্ত বিদ্যালয়ের মাধ্যমে পড়াশোনা চালিয়ে যান',
        fullContent:
          'শিক্ষা চালিয়ে যেতে কখনো দেরি হয় না। ' +
          'NIOS (জাতীয় মুক্ত বিদ্যালয় শিক্ষা প্রতিষ্ঠান) পড়াশোনা শেষ করতে না পারা বড়দের ঘর থেকেই ১০ ও ১২ শ্রেণির পরীক্ষা দেওয়ার সুযোগ দেয়। ' +
          'IGNOU ঘর থেকে পড়ার জন্য বিএ, বি.কম সহ সাশ্রয়ী ডিগ্রি ও ডিপ্লোমা কোর্স দেয়। ' +
          'ULLAS কর্মসূচি স্কুলে যাওয়ার সুযোগ না পাওয়া বড়দের মৌলিক সাক্ষরতা দেয়। ' +
          'যেকোনো বয়সে শেখায় লজ্জার কিছু নেই।',
      },
    },
  },

  // ─────────────────────────────────────────
  // 6. Skill Development
  // ─────────────────────────────────────────
  {
    id: 'skill_development',
    icon: '🔧',
    color: '#607D8B',
    officialLinks: [
      { name: 'PMKVY Skill India',   url: 'https://pmkvyofficial.org', phone: null },
      { name: 'Skill India Portal',  url: 'https://skillindia.gov.in', phone: null },
      { name: 'Skill Helpline',      url: null, phone: '1800-123-9626' },
    ],
    content: {
      english: {
        title: 'Skill Development',
        shortDescription: 'Get free vocational training and earn a recognised certificate',
        fullContent:
          'Skill development training helps you learn practical job skills that can improve your income. ' +
          'The government\'s Pradhan Mantri Kaushal Vikas Yojana, called PMKVY, provides completely free skill training in over 300 different trades and job roles. ' +
          'Courses include tailoring, electrical work, plumbing, mobile phone repair, beauty and wellness, construction, healthcare assistance, and many more. ' +
          'Training is done at Skill India Training Centres in every district. ' +
          'After completing the training you receive a government-recognised certificate that is valid across India. ' +
          'Many PMKVY centres also provide placement assistance to help you find a job after training. ' +
          'Women are especially encouraged to join — many centres offer courses specifically designed for women\'s livelihood. ' +
          'To find a PMKVY centre near you, visit skillindia.gov.in or call the helpline at 1800-123-9626. ' +
          'Registration and training are completely free of cost.',
      },
      hindi: {
        title: 'कौशल विकास',
        shortDescription: 'मुफ्त व्यावसायिक प्रशिक्षण लें और मान्यता प्राप्त प्रमाण पत्र पाएं',
        fullContent:
          'कौशल विकास प्रशिक्षण आपको व्यावहारिक नौकरी कौशल सिखाता है जो आपकी आय बढ़ा सकता है। ' +
          'सरकार की प्रधानमंत्री कौशल विकास योजना यानी पीएमकेवीवाई 300 से अधिक ट्रेडों और नौकरी भूमिकाओं में पूरी तरह मुफ्त कौशल प्रशिक्षण देती है। ' +
          'कोर्स में सिलाई, इलेक्ट्रिकल, प्लंबिंग, मोबाइल मरम्मत, ब्यूटी, निर्माण, स्वास्थ्य सहायता और कई अन्य शामिल हैं। ' +
          'हर जिले में स्किल इंडिया प्रशिक्षण केंद्र है। ' +
          'प्रशिक्षण पूरा होने पर पूरे भारत में मान्य सरकारी सर्टिफिकेट मिलता है। ' +
          'पंजीकरण और प्रशिक्षण पूरी तरह मुफ्त हैं।',
      },
      malayalam: {
        title: 'കഴിവ് വികസനം',
        shortDescription: 'സൗജന്യ തൊഴിൽ പരിശീലനം നേടി അംഗീകൃത സർട്ടിഫിക്കറ്റ് ലഭിക്കുക',
        fullContent:
          'കഴിവ് വികസന പരിശീലനം വരുമാനം മെച്ചപ്പെടുത്തുന്ന പ്രായോഗിക തൊഴിൽ നൈപുണ്യം പഠിപ്പിക്കുന്നു. ' +
          'PMKVY 300-ൽ കൂടുതൽ ട്രേഡുകളിൽ പൂർണ്ണ സൗജന്യ കഴിവ് പരിശീലനം നൽകുന്നു. ' +
          'തുന്നൽ, ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, മൊബൈൽ റിപ്പയർ, നിർമ്മാണം, ആരോഗ്യ സഹായം — ഇങ്ങനെ ഒട്ടനവധി കോഴ്‌സ് ലഭ്യം. ' +
          'ഓരോ ജില്ലയിലും സ്‌കിൽ ഇന്ത്യ ട്രെയിനിംഗ് സെൻ്റർ ഉണ്ട്. ' +
          'രജിസ്‌ട്രേഷൻ, പരിശീലനം — എല്ലാം സൗജന്യം.',
      },
      marathi: {
        title: 'कौशल्य विकास',
        shortDescription: 'मोफत व्यावसायिक प्रशिक्षण घ्या आणि मान्यताप्राप्त प्रमाणपत्र मिळवा',
        fullContent:
          'कौशल्य विकास प्रशिक्षण आपल्याला उत्पन्न वाढवणारी व्यावहारिक कौशल्ये शिकवते. ' +
          'पीएमकेव्हीवाय ३०० पेक्षा जास्त व्यापार आणि नोकऱ्यांमध्ये पूर्णपणे मोफत प्रशिक्षण देते. ' +
          'शिवणकाम, इलेक्ट्रिकल, प्लंबिंग, मोबाइल दुरुस्ती, सौंदर्य, बांधकाम, आरोग्य सहाय्य असे अनेक कोर्स उपलब्ध. ' +
          'प्रत्येक जिल्ह्यात स्किल इंडिया प्रशिक्षण केंद्र आहे. ' +
          'नोंदणी आणि प्रशिक्षण पूर्णपणे मोफत आहे.',
      },
      tamil: {
        title: 'திறன் மேம்பாடு',
        shortDescription: 'இலவச தொழில் பயிற்சி பெற்று அங்கீகரிக்கப்பட்ட சான்றிதழ் பெறுங்கள்',
        fullContent:
          'திறன் மேம்பாடு பயிற்சி வருமானத்தை மேம்படுத்தும் நடைமுறை தொழில் திறன்களை கற்றுத்தருகிறது. ' +
          'PMKVY 300-க்கும் மேற்பட்ட தொழில்களில் முற்றிலும் இலவச திறன் பயிற்சி வழங்குகிறது. ' +
          'தையல், மின்சாரம், குழாய், மொபைல் பழுதுபார்ப்பு, கட்டுமானம், சுகாதார உதவி உட்பட பல படிப்புகள் உள்ளன. ' +
          'ஒவ்வொரு மாவட்டத்திலும் ஸ்கில் இந்தியா பயிற்சி மையம் உள்ளது. ' +
          'பதிவு மற்றும் பயிற்சி முற்றிலும் இலவசம்.',
      },
      telugu: {
        title: 'నైపుణ్య అభివృద్ధి',
        shortDescription: 'ఉచిత వృత్తి శిక్షణ పొంది గుర్తింపు పొందిన సర్టిఫికెట్ తీసుకోండి',
        fullContent:
          'నైపుణ్య అభివృద్ధి శిక్షణ ఆదాయాన్ని మెరుగుపరిచే ఆచరణాత్మక ఉద్యోగ నైపుణ్యాలు నేర్పిస్తుంది. ' +
          'PMKVY 300-కి పైగా వృత్తులలో పూర్తిగా ఉచిత నైపుణ్య శిక్షణ అందిస్తుంది. ' +
          'కుట్టుపని, విద్యుత్ పని, ప్లంబింగ్, మొబైల్ రిపేర్, నిర్మాణం, ఆరోగ్య సహాయం వంటి అనేక కోర్సులు ఉన్నాయి. ' +
          'ప్రతి జిల్లాలో స్కిల్ ఇండియా ట్రైనింగ్ సెంటర్ ఉంది. ' +
          'నమోదు మరియు శిక్షణ పూర్తిగా ఉచితం.',
      },
      bengali: {
        title: 'দক্ষতা উন্নয়ন',
        shortDescription: 'বিনামূল্যে বৃত্তিমূলক প্রশিক্ষণ নিন এবং স্বীকৃত সনদ পান',
        fullContent:
          'দক্ষতা উন্নয়ন প্রশিক্ষণ আয় বাড়ানোর জন্য ব্যবহারিক কাজের দক্ষতা শেখায়। ' +
          'PMKVY ৩০০-এরও বেশি ট্রেড ও কাজের ক্ষেত্রে সম্পূর্ণ বিনামূল্যে দক্ষতা প্রশিক্ষণ দেয়। ' +
          'সেলাই, ইলেকট্রিক্যাল, প্লাম্বিং, মোবাইল মেরামত, নির্মাণ, স্বাস্থ্যসেবা সহায়তাসহ অনেক কোর্স আছে। ' +
          'প্রতিটি জেলায় স্কিল ইন্ডিয়া প্রশিক্ষণ কেন্দ্র আছে। ' +
          'নিবন্ধন ও প্রশিক্ষণ সম্পূর্ণ বিনামূল্যে।',
      },
    },
  },

  // ─────────────────────────────────────────
  // 7. Online Learning
  // ─────────────────────────────────────────
  {
    id: 'online_learning',
    icon: '📱',
    color: '#00BCD4',
    officialLinks: [
      { name: 'DIKSHA Platform',     url: 'https://diksha.gov.in', phone: null },
      { name: 'SWAYAM Courses',      url: 'https://swayam.gov.in', phone: null },
      { name: 'e-Pathshala',         url: 'https://epathshala.nic.in', phone: null },
    ],
    content: {
      english: {
        title: 'Online Learning',
        shortDescription: 'Learn for free using government apps and websites',
        fullContent:
          'The government has built several free platforms that allow anyone to learn from home using a smartphone or computer. ' +
          'DIKSHA is the government\'s official school education app where students can access textbooks, videos, and practice exercises for Classes 1 to 12 in multiple languages completely free. ' +
          'SWAYAM is a free online course platform that offers university-level courses in hundreds of subjects — including agriculture, health, business, and technology — taught by top professors. ' +
          'e-Pathshala provides free digital textbooks for school students in all subjects. ' +
          'YouTube also has many free educational channels in regional languages for farming tips, health advice, and exam preparation. ' +
          'Even with limited internet, you can download content on DIKSHA when connected and study offline later. ' +
          'Encourage your children to use these platforms — they are much better than spending money on private tuitions.',
      },
      hindi: {
        title: 'ऑनलाइन शिक्षा',
        shortDescription: 'सरकारी ऐप और वेबसाइट से मुफ्त सीखें',
        fullContent:
          'सरकार ने कई मुफ्त प्लेटफॉर्म बनाए हैं जो किसी भी व्यक्ति को स्मार्टफोन या कंप्यूटर से घर पर सीखने की सुविधा देते हैं। ' +
          'दीक्षा सरकार का आधिकारिक स्कूल शिक्षा ऐप है जहां कक्षा 1 से 12 तक के छात्र कई भाषाओं में पाठ्यपुस्तकें, वीडियो और अभ्यास मुफ्त में देख सकते हैं। ' +
          'स्वयम एक मुफ्त ऑनलाइन कोर्स प्लेटफॉर्म है जिसमें शीर्ष प्रोफेसरों द्वारा कृषि, स्वास्थ्य, व्यवसाय और प्रौद्योगिकी सहित सैकड़ों विषयों में यूनिवर्सिटी स्तर के कोर्स उपलब्ध हैं। ' +
          'ई-पाठशाला स्कूली छात्रों के लिए मुफ्त डिजिटल पाठ्यपुस्तकें प्रदान करती है। ' +
          'अपने बच्चों को इन प्लेटफॉर्म का उपयोग करने के लिए प्रोत्साहित करें।',
      },
      malayalam: {
        title: 'ഓൺലൈൻ പഠനം',
        shortDescription: 'സർക്കാർ ആപ്, വെബ്സൈറ്റ് ഉപയോഗിച്ച് സൗജന്യ പഠനം',
        fullContent:
          'DIKSHA സർക്കാരിൻ്റെ ഔദ്യോഗിക ഒഴിഞ്ഞ ഓൺലൈൻ ആപ്, 1-12 ക്ലാസ്സ് വരെ ഒരു ഡിജിറ്റൽ ടെക്സ്റ്റ്ബുക്ക്, വീഡിയോ, വ്യായാമം ഒക്കെ ഉണ്ട്. ' +
          'SWAYAM ൽ നൂറുകണക്കിന് വിഷയങ്ങളിൽ ഉന്നത പ്രൊഫസർമാർ പഠിപ്പിക്കുന്ന സൗജന്യ ഓൺലൈൻ കോഴ്‌സ് ഉണ്ട്. ' +
          'ഇ-പാഠശാല സ്‌കൂൾ വിദ്യാർഥികൾക്ക് സൗജന്യ ഡിജിറ്റൽ ടെക്സ്റ്റ്ബുക്ക് നൽകുന്നു. ' +
          'കുട്ടികൾ ഈ പ്ലാറ്റ്‌ഫോം ഉപയോഗിക്കാൻ പ്രോത്സാഹിപ്പിക്കുക.',
      },
      marathi: {
        title: 'ऑनलाइन शिक्षण',
        shortDescription: 'सरकारी अॅप आणि वेबसाइटद्वारे मोफत शिका',
        fullContent:
          'सरकारने अनेक मोफत प्लेटफॉर्म बनवले आहेत जे स्मार्टफोन किंवा संगणकावरून घरी शिकण्याची सुविधा देतात. ' +
          'दीक्षा हे सरकारचे अधिकृत शाळा शिक्षण अॅप आहे जिथे इयत्ता १ ते १२ चे विद्यार्थी अनेक भाषांमध्ये पाठ्यपुस्तके, व्हिडिओ मोफत पाहू शकतात. ' +
          'स्वयम वर विद्यापीठ स्तरावरील शेकडो विषयांचे मोफत कोर्स उपलब्ध आहेत. ' +
          'आपल्या मुलांना या प्लेटफॉर्मचा वापर करण्यास प्रोत्साहित करा.',
      },
      tamil: {
        title: 'ஆன்லைன் கற்றல்',
        shortDescription: 'அரசு செயலிகள் மற்றும் வலைத்தளங்கள் மூலம் இலவசமாக கற்றுக்கொள்ளுங்கள்',
        fullContent:
          'DIKSHA என்பது அரசின் அதிகாரப்பூர்வ பள்ளி கல்வி செயலி, 1 முதல் 12-ம் வகுப்பு வரை பல மொழிகளில் பாடப்புத்தகங்கள், வீடியோக்கள் இலவசமாக கிடைக்கின்றன. ' +
          'SWAYAM ல் பல நூறு பாடங்களில் பல்கலைக்கழக அளவிலான இலவச படிப்புகள் உள்ளன. ' +
          'e-Pathshala பள்ளி மாணவர்களுக்கு இலவச டிஜிட்டல் பாடப்புத்தகங்கள் வழங்குகிறது. ' +
          'உங்கள் குழந்தைகளை இந்த தளங்களை பயன்படுத்த ஊக்குவியுங்கள்.',
      },
      telugu: {
        title: 'ఆన్‌లైన్ అభ్యాసం',
        shortDescription: 'ప్రభుత్వ యాప్‌లు మరియు వెబ్‌సైట్‌ల ద్వారా ఉచితంగా నేర్చుకోండి',
        fullContent:
          'DIKSHA ప్రభుత్వం యొక్క అధికారిక స్కూల్ ఎడ్యుకేషన్ యాప్, 1 నుండి 12 తరగతి వరకు పలు భాషల్లో పుస్తకాలు, వీడియోలు ఉచితంగా అందుబాటులో ఉన్నాయి. ' +
          'SWAYAM లో వందల విషయాలలో యూనివర్సిటీ స్థాయి ఉచిత కోర్సులు అందుబాటులో ఉన్నాయి. ' +
          'e-Pathshala పాఠశాల విద్యార్థులకు ఉచిత డిజిటల్ పుస్తకాలు అందిస్తుంది. ' +
          'మీ పిల్లలను ఈ ప్లాట్‌ఫాంలు ఉపయోగించమని ప్రోత్సహించండి.',
      },
      bengali: {
        title: 'অনলাইন শিক্ষা',
        shortDescription: 'সরকারি অ্যাপ ও ওয়েবসাইট ব্যবহার করে বিনামূল্যে শিখুন',
        fullContent:
          'DIKSHA হলো সরকারের অফিসিয়াল স্কুল শিক্ষা অ্যাপ, ১ম থেকে ১২শ শ্রেণি পর্যন্ত বিভিন্ন ভাষায় পাঠ্যবই, ভিডিও বিনামূল্যে পাওয়া যায়। ' +
          'SWAYAM-এ শত শত বিষয়ে বিশ্ববিদ্যালয় মানের বিনামূল্যে অনলাইন কোর্স আছে। ' +
          'e-Pathshala স্কুলের শিক্ষার্থীদের বিনামূল্যে ডিজিটাল পাঠ্যবই দেয়। ' +
          'আপনার সন্তানদের এই প্ল্যাটফর্মগুলো ব্যবহারে উৎসাহিত করুন।',
      },
    },
  },

  // ─────────────────────────────────────────
  // 8. Career Guidance
  // ─────────────────────────────────────────
  {
    id: 'career_guidance',
    icon: '🎯',
    color: '#F44336',
    officialLinks: [
      { name: 'National Career Service', url: 'https://ncs.gov.in', phone: null },
      { name: 'Employment Exchange',     url: 'https://www.ncs.gov.in', phone: null },
      { name: 'Career Helpline',         url: null, phone: '1800-425-1514' },
    ],
    content: {
      english: {
        title: 'Career Guidance',
        shortDescription: 'Explore job opportunities and register for government employment',
        fullContent:
          'Career guidance helps you understand what jobs and opportunities are available based on your education and skills. ' +
          'The National Career Service portal at ncs.gov.in is a free government job portal where you can register, upload your resume, and apply for government and private sector jobs. ' +
          'If you have completed Class 10 or 12, you are eligible for many government jobs including lower division clerk, constable, bank clerk, and postal assistant. ' +
          'Register at your nearest Employment Exchange — they maintain job seeker lists and can notify you of relevant vacancies. ' +
          'For government job exams, organisations like SSC, UPSC, state PSCs conduct regular recruitment — check their websites for notifications. ' +
          'If you are interested in starting your own business, PMEGP — the Prime Minister Employment Generation Programme — provides loans up to 25 lakh rupees at subsidised rates. ' +
          'Mudra loans give small business loans from 50 thousand to 10 lakh rupees without collateral. ' +
          'Never pay anyone to get a government job — all legitimate government recruitment is free.',
      },
      hindi: {
        title: 'करियर मार्गदर्शन',
        shortDescription: 'नौकरी के अवसर खोजें और सरकारी रोजगार के लिए पंजीकरण करें',
        fullContent:
          'करियर मार्गदर्शन आपको यह समझने में मदद करता है कि आपकी शिक्षा और कौशल के आधार पर कौन सी नौकरियां और अवसर उपलब्ध हैं। ' +
          'ncs.gov.in पर राष्ट्रीय करियर सेवा पोर्टल एक मुफ्त सरकारी जॉब पोर्टल है। ' +
          'यदि आपने कक्षा 10 या 12 पूरी की है तो आप एलडीसी, कांस्टेबल, बैंक क्लर्क सहित कई सरकारी नौकरियों के लिए पात्र हैं। ' +
          'नजदीकी रोजगार कार्यालय में पंजीकरण करें। ' +
          'खुद का व्यवसाय शुरू करना चाहते हैं तो पीएमईजीपी 25 लाख तक का ऋण देती है। ' +
          'मुद्रा लोन बिना गारंटी 10 लाख तक का छोटा व्यवसाय ऋण देता है। ' +
          'सरकारी नौकरी के लिए कभी किसी को पैसे न दें — सभी वैध भर्ती मुफ्त है।',
      },
      malayalam: {
        title: 'കരിയർ ഗൈഡൻസ്',
        shortDescription: 'തൊഴിൽ അവസരങ്ങൾ കണ്ടെത്തി സർക്കാർ തൊഴിലിനായി രജിസ്‌ട്രേഷൻ ചെയ്യുക',
        fullContent:
          'ncs.gov.in ൽ സൗജന്യ ദേശീയ കരിയർ സർവീസ് പോർട്ടലിൽ രജിസ്‌ട്രേഷൻ ചെയ്ത് ജോലി തിരയുക. ' +
          '10, 12 ക്ലാസ്സ് പൂർത്തിയായവർക്ക് LDC, കോൺസ്റ്റബിൾ, ബാങ്ക് ക്ലർക്ക് ഉൾപ്പെടെ നിരവധി ജോലികൾ ലഭ്യം. ' +
          'അടുത്തുള്ള എംപ്ലോയ്‌മെൻ്റ് എക്‌സ്‌ചേഞ്ചിൽ രജിസ്‌ട്രേഷൻ ചെയ്യുക. ' +
          'സ്വന്തം ബിസിനസ് തുടങ്ങണമെങ്കിൽ PMEGP 25 ലക്ഷം വരെ വായ്പ നൽകുന്നു. ' +
          'മുദ്ര ലോൺ ഗ്യാരൻ്റി ഇല്ലാതെ 10 ലക്ഷം വരെ ചെറുകിട ബിസിനസ് ലോൺ. ' +
          'സർക്കാർ ജോലിക്ക് ആർക്കും പണം കൊടുക്കരുത്.',
      },
      marathi: {
        title: 'करिअर मार्गदर्शन',
        shortDescription: 'नोकरीच्या संधी शोधा आणि सरकारी रोजगारासाठी नोंदणी करा',
        fullContent:
          'ncs.gov.in वर राष्ट्रीय करिअर सेवा पोर्टलवर मोफत नोंदणी करा आणि नोकरी शोधा. ' +
          'इयत्ता १० किंवा १२ पूर्ण केल्यास एलडीसी, कॉन्स्टेबल, बँक क्लर्कसह अनेक सरकारी नोकऱ्यांसाठी पात्र आहात. ' +
          'जवळच्या रोजगार कार्यालयात नोंदणी करा. ' +
          'स्वतःचा व्यवसाय सुरू करायचा असल्यास पीएमईजीपी २५ लाखांपर्यंत कर्ज देते. ' +
          'मुद्रा कर्ज तारणाशिवाय १० लाखांपर्यंत लहान व्यवसाय कर्ज देते. ' +
          'सरकारी नोकरीसाठी कधीही कोणाला पैसे देऊ नका.',
      },
      tamil: {
        title: 'தொழில் வழிகாட்டுதல்',
        shortDescription: 'வேலை வாய்ப்புகளை ஆராய்ந்து அரசு வேலைக்கு பதிவு செய்யுங்கள்',
        fullContent:
          'ncs.gov.in இல் தேசிய தொழில் சேவை போர்ட்டலில் இலவசமாக பதிவு செய்து வேலை தேடுங்கள். ' +
          '10 அல்லது 12-ம் வகுப்பு முடித்தவர்கள் LDC, கான்ஸ்டபிள், வங்கி எழுத்தர் உட்பட பல அரசு வேலைகளுக்கு தகுதியானவர்கள். ' +
          'அருகிலுள்ள வேலைவாய்ப்பு அலுவலகத்தில் பதிவு செய்யுங்கள். ' +
          'சொந்தத் தொழில் தொடங்க PMEGP 25 லட்சம் வரை கடன் வழங்குகிறது. ' +
          'முத்ரா கடன் பிணை இல்லாமல் 10 லட்சம் வரை சிறு தொழில் கடன் வழங்குகிறது. ' +
          'அரசு வேலைக்கு யாருக்கும் பணம் கொடுக்காதீர்கள்.',
      },
      telugu: {
        title: 'కెరీర్ గైడెన్స్',
        shortDescription: 'ఉద్యోగ అవకాశాలు అన్వేషించి ప్రభుత్వ ఉద్యోగానికి నమోదు చేసుకోండి',
        fullContent:
          'ncs.gov.in లో జాతీయ కెరీర్ సర్వీస్ పోర్టల్‌లో ఉచితంగా నమోదు చేసుకొని ఉద్యోగం వెతకండి. ' +
          '10 లేదా 12 తరగతి పూర్తి చేసినవారు LDC, కానిస్టేబుల్, బ్యాంక్ క్లర్క్ వంటి అనేక ప్రభుత్వ ఉద్యోగాలకు అర్హులు. ' +
          'దగ్గరలోని ఎంప్లాయ్‌మెంట్ ఎక్స్ఛేంజ్‌లో నమోదు చేసుకోండి. ' +
          'స్వంత వ్యాపారం ప్రారంభించాలంటే PMEGP 25 లక్షల వరకు రుణం అందిస్తుంది. ' +
          'ముద్రా లోన్ హామీ లేకుండా 10 లక్షల వరకు చిన్న వ్యాపార రుణం ఇస్తుంది. ' +
          'ప్రభుత్వ ఉద్యోగానికి ఎవరికీ డబ్బు ఇవ్వకండి.',
      },
      bengali: {
        title: 'ক্যারিয়ার গাইডেন্স',
        shortDescription: 'চাকরির সুযোগ খুঁজুন এবং সরকারি কর্মসংস্থানের জন্য নিবন্ধন করুন',
        fullContent:
          'ncs.gov.in-এ জাতীয় ক্যারিয়ার সার্ভিস পোর্টালে বিনামূল্যে নিবন্ধন করে চাকরি খুঁজুন। ' +
          '১০ বা ১২ শ্রেণি পাস করলে LDC, কনস্টেবল, ব্যাংক ক্লার্কসহ অনেক সরকারি চাকরিতে আবেদন করা যায়। ' +
          'নিকটস্থ এমপ্লয়মেন্ট এক্সচেঞ্জে নিবন্ধন করুন। ' +
          'নিজের ব্যবসা শুরু করতে PMEGP ২৫ লাখ পর্যন্ত ঋণ দেয়। ' +
          'মুদ্রা ঋণ জামানত ছাড়াই ১০ লাখ পর্যন্ত ছোট ব্যবসায় ঋণ দেয়। ' +
          'সরকারি চাকরির জন্য কখনো কাউকে টাকা দেবেন না।',
      },
    },
  },
];
