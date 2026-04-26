import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import CategoryCard from '../components/CategoryCard';
import { isAIChatEnabled } from '../services/remoteConfigService';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const DAILY_TIPS: Record<string, string[]> = {
  english: [
    '🌱 Sow seeds in the early morning for better germination.',
    '💧 Water crops at the base, not on leaves, to prevent fungal disease.',
    '🌿 Add compost to soil before planting for better yield.',
    '🐛 Use neem oil spray to control pests without chemicals.',
    '☀️ Crop rotation every season keeps soil healthy.',
    '🌾 Harvest wheat when 80% of grains turn golden yellow.',
    '💊 Drink ORS immediately if you feel dehydrated.',
    '🏥 Wash hands with soap before eating to prevent 80% of diseases.',
    '💰 Open a Jan Dhan account for free banking and government benefits.',
    '📋 PM-KISAN gives ₹6000/year — register at your nearest CSC center.',
    '📱 Learn to use UPI for safe and easy digital payments.',
    '🌧️ Collect rainwater for irrigation — saves water and money.',
    '🐄 Keep animal sheds clean to prevent livestock diseases.',
    '📞 Call 1551 for free farming advice anytime.',
    '❤️ Walk 30 minutes daily for a healthy heart.',
  ],
  hindi: [
    '🌱 बेहतर अंकुरण के लिए सुबह जल्दी बीज बोएं।',
    '💧 फंगल रोग से बचने के लिए जड़ में पानी दें, पत्तियों पर नहीं।',
    '🌿 रोपण से पहले मिट्टी में खाद डालें।',
    '🐛 कीटों के लिए नीम का तेल छिड़कें।',
    '☀️ हर मौसम में फसल बदलने से मिट्टी स्वस्थ रहती है।',
    '🌾 जब 80% दाने सुनहरे हों तो गेहूं काटें।',
    '💊 निर्जलीकरण होने पर ORS पिएं।',
    '🏥 खाने से पहले साबुन से हाथ धोएं।',
    '💰 मुफ्त बैंकिंग के लिए जन धन खाता खोलें।',
    '📋 PM-KISAN से सालाना ₹6000 — नजदीकी CSC में रजिस्टर करें।',
    '📱 सुरक्षित भुगतान के लिए UPI सीखें।',
    '🌧️ सिंचाई के लिए वर्षा जल संग्रहित करें।',
    '🐄 पशुशाला साफ रखें।',
    '📞 मुफ्त कृषि सलाह के लिए 1551 पर कॉल करें।',
    '❤️ स्वस्थ हृदय के लिए रोज 30 मिनट टहलें।',
  ],
  malayalam: [
    '🌱 നല്ല മുളയ്ക്കായി രാവിലെ വിത്ത് പാകുക.',
    '💧 ഫംഗൽ രോഗം തടയാൻ വേരിൽ വെള്ളം ഒഴിക്കുക.',
    '🌿 നടുന്നതിന് മുൻപ് മണ്ണിൽ കമ്പോസ്റ്റ് ചേർക്കുക.',
    '🐛 കീടങ്ങൾക്ക് വേപ്പ് എണ്ണ തളിക്കുക.',
    '☀️ ഓരോ മൗസുമും വിള മാറ്റം മണ്ണ് ആരോഗ്യകരമാക്കുന്നു.',
    '🌾 80% ധാന്യങ്ങൾ സ്വർണ നിറമായാൽ ഗോതമ്പ് കൊയ്യുക.',
    '💊 നിർജലീകരണം ഉണ്ടെങ്കിൽ ORS കുടിക്കുക.',
    '🏥 ഭക്ഷണത്തിന് മുൻപ് കൈ കഴുകുക.',
    '💰 ജൻ ധൻ അക്കൗണ്ട് തുറക്കുക.',
    '📋 PM-KISAN — CSC-ൽ രജിസ്റ്റർ ചെയ്യുക.',
    '📱 UPI ഉപയോഗിക്കുക.',
    '🌧️ മഴ വെള്ളം ശേഖരിക്കുക.',
    '🐄 കന്നുകാലി ഷെഡ് വൃത്തിയായി സൂക്ഷിക്കുക.',
    '📞 1551 — സൗജന്യ കൃഷി ഉപദേശം.',
    '❤️ ദിവസം 30 മിനിറ്റ് നടക്കുക.',
  ],
  marathi: [
    '🌱 चांगल्या उगवणासाठी सकाळी लवकर बियाणे पेरा.',
    '💧 बुरशीजन्य रोग टाळण्यासाठी मुळाशी पाणी द्या.',
    '🌿 लागवडीपूर्वी मातीत कंपोस्ट मिसळा.',
    '🐛 कीड नियंत्रणासाठी कडुनिंबाचे तेल फवारा.',
    '☀️ दरहंगाम पीक बदल केल्याने माती निरोगी राहते.',
    '🌾 ८०% दाणे सोनेरी झाले की गहू काढणी करा.',
    '💊 निर्जलीकरण जाणवल्यास ORS प्या.',
    '🏥 जेवणापूर्वी साबणाने हात धुवा.',
    '💰 मोफत बँकिंगसाठी जन धन खाते उघडा.',
    '📋 PM-KISAN — जवळच्या CSC मध्ये नोंदणी करा.',
    '📱 सुरक्षित पेमेंटसाठी UPI शिका.',
    '🌧️ सिंचनासाठी पावसाचे पाणी साठवा.',
    '🐄 गोठा स्वच्छ ठेवा.',
    '📞 मोफत शेती सल्ल्यासाठी १५५१ वर कॉल करा.',
    '❤️ निरोगी हृदयासाठी दररोज ३० मिनिटे चाला.',
  ],
  tamil: [
    '🌱 நல்ல முளைப்பிற்காக காலையில் விதை விதைக்கவும்.',
    '💧 பூஞ்சை நோயை தவிர்க்க வேரில் தண்ணீர் ஊற்றவும்.',
    '🌿 நடுவதற்கு முன் மண்ணில் உரம் சேர்க்கவும்.',
    '🐛 பூச்சிகளை கட்டுப்படுத்த வேப்ப எண்ணெய் தெளிக்கவும்.',
    '☀️ ஒவ்வொரு பருவமும் பயிர் மாற்றம் மண்ணை ஆரோக்கியமாக வைக்கும்.',
    '🌾 80% தானியங்கள் தங்க நிறமாகும்போது கோதுமை அறுவடை செய்யவும்.',
    '💊 நீரிழப்பு தோன்றினால் ORS குடிக்கவும்.',
    '🏥 உணவிற்கு முன் கை கழுவவும்.',
    '💰 ஜன் தன் கணக்கு திறக்கவும்.',
    '📋 PM-KISAN — CSC-ல் பதிவு செய்யவும்.',
    '📱 UPI கற்றுக்கொள்ளுங்கள்.',
    '🌧️ மழை நீரை சேகரிக்கவும்.',
    '🐄 கால்நடை கொட்டகை சுத்தமாக வைக்கவும்.',
    '📞 1551 — இலவச வேளாண் ஆலோசனை.',
    '❤️ தினமும் 30 நிமிடம் நடக்கவும்.',
  ],
  telugu: [
    '🌱 మంచి మొలకెత్తడానికి ఉదయాన్నే విత్తనాలు వేయండి.',
    '💧 శిలీంద్ర వ్యాధి నివారించడానికి వేళ్ళకు నీరు పెట్టండి.',
    '🌿 నాటడానికి ముందు కంపోస్ట్ వేయండి.',
    '🐛 పురుగులకు వేప నూనె చల్లండి.',
    '☀️ ప్రతి సీజన్లో పంట మార్పు మట్టిని ఆరోగ్యంగా ఉంచుతుంది.',
    '🌾 80% గింజలు బంగారు రంగుకు మారినప్పుడు కోయండి.',
    '💊 నీరసం అనిపిస్తే ORS తాగండి.',
    '🏥 తినే ముందు చేతులు కడగండి.',
    '💰 జన్ ధన్ ఖాతా తెరవండి.',
    '📋 PM-KISAN — CSC లో నమోదు చేయండి.',
    '📱 UPI నేర్చుకోండి.',
    '🌧️ వర్షపు నీరు నిల్వ చేయండి.',
    '🐄 పశువుల పాక శుభ్రంగా ఉంచండి.',
    '📞 1551 — ఉచిత వ్యవసాయ సలహా.',
    '❤️ రోజుకు 30 నిమిషాలు నడవండి.',
  ],
  bengali: [
    '🌱 ভালো অঙ্কুরোদগমের জন্য সকালে বীজ বপন করুন।',
    '💧 ছত্রাকজনিত রোগ প্রতিরোধে শিকড়ে জল দিন।',
    '🌿 রোপণের আগে মাটিতে কম্পোস্ট মেশান।',
    '🐛 পোকামাকড়ের জন্য নিম তেল স্প্রে করুন।',
    '☀️ প্রতি মৌসুমে ফসল পরিবর্তন মাটি সুস্থ রাখে।',
    '🌾 ৮০% শস্য সোনালি হলে গম কাটুন।',
    '💊 পানিশূন্যতায় ORS পান করুন।',
    '🏥 খাওয়ার আগে হাত ধুন।',
    '💰 জন ধন অ্যাকাউন্ট খুলুন।',
    '📋 PM-KISAN — CSC-তে নিবন্ধন করুন।',
    '📱 UPI শিখুন।',
    '🌧️ বৃষ্টির জল সংগ্রহ করুন।',
    '🐄 গবাদিপশুর আস্তাবল পরিষ্কার রাখুন।',
    '📞 1551 — বিনামূল্যে কৃষি পরামর্শ।',
    '❤️ প্রতিদিন ৩০ মিনিট হাঁটুন।',
  ],
};

const getTodaysTip = (language: string): string => {
  const tips = DAILY_TIPS[language] || DAILY_TIPS.english;
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return tips[dayOfYear % tips.length];
};

const OFFLINE_TEXT: Record<string, string> = {
  english:   '📵 You are offline — all content still works',
  hindi:     '📵 आप ऑफलाइन हैं — सभी सामग्री फिर भी काम करती है',
  malayalam: '📵 നിങ്ങൾ ഓഫ്‌ലൈനാണ് — എല്ലാ ഉള്ളടക്കവും പ്രവർത്തിക്കുന്നു',
  marathi:   '📵 तुम्ही ऑफलाइन आहात — सर्व माहिती तरीही उपलब्ध आहे',
  tamil:     '📵 நீங்கள் ஆஃப்லைனில் உள்ளீர்கள் — எல்லா உள்ளடக்கமும் செயல்படுகிறது',
  telugu:    '📵 మీరు ఆఫ్‌లైన్‌లో ఉన్నారు — అన్ని కంటెంట్ ఇంకా పని చేస్తుంది',
  bengali:   '📵 আপনি অফলাইনে আছেন — সব বিষয়বস্তু এখনও কাজ করছে',
};

const AI_CHAT_TEXT: Record<string, { title: string; sub: string }> = {
  english:   { title: 'AI Assistant',    sub: 'Ask farming & health questions' },
  hindi:     { title: 'AI सहायक',         sub: 'खेती और स्वास्थ्य के सवाल पूछें' },
  malayalam: { title: 'AI സഹായി',         sub: 'കൃഷി & ആരോഗ്യ ചോദ്യങ്ങൾ ചോദിക്കൂ' },
  marathi:   { title: 'AI सहाय्यक',        sub: 'शेती आणि आरोग्याचे प्रश्न विचारा' },
  tamil:     { title: 'AI உதவியாளர்',     sub: 'விவசாயம் & சுகாதார கேள்விகள் கேளுங்கள்' },
  telugu:    { title: 'AI సహాయకుడు',      sub: 'వ్యవసాయం & ఆరోగ్య ప్రశ్నలు అడగండి' },
  bengali:   { title: 'AI সহায়ক',         sub: 'কৃষি ও স্বাস্থ্য প্রশ্ন জিজ্ঞেস করুন' },
};

function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, language } = useLanguage();

  const [isLoading, setIsLoading] = React.useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor       = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor   = isDarkMode ? '#B0B0B0' : '#424242';
  const tipBg           = isDarkMode ? '#1A2E1A' : '#E8F5E9';
  const tipText         = isDarkMode ? '#A5D6A7' : '#1B5E20';

  const todaysTip  = getTodaysTip(language);
  const aiChatLang = AI_CHAT_TEXT[language] || AI_CHAT_TEXT.english;

  // ← Read from Remote Config
  const aiEnabled = isAIChatEnabled();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#2196F3"
      />

      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            {OFFLINE_TEXT[language] || OFFLINE_TEXT.english}
          </Text>
        </View>
      )}

      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={[styles.loadingText, { color: textColor }]}>{t.loading}</Text>
            </View>
          )}

          {!isLoading && (
            <>
              {/* TOP BAR */}
              <View style={styles.topBar}>
                <TouchableOpacity
                  style={[styles.searchIconBtn, { backgroundColor: isDarkMode ? '#1C1C1C' : '#E3F2FD' }]}
                  onPress={() => navigation.navigate('VoiceSearch')}>
                  <Text style={styles.searchIconText}>🔍</Text>
                </TouchableOpacity>
              </View>

              {/* HEADER */}
              <View style={styles.header}>
                <Text style={styles.title}>{t.appName}</Text>
                <Text style={[styles.subtitle, { color: subtitleColor }]}>{t.subtitle}</Text>
                <Text style={[styles.tagline,  { color: subtitleColor }]}>{t.tagline}</Text>
                <TouchableOpacity
                  style={styles.languageButton}
                  onPress={() => setShowLanguageSelector(true)}
                  accessibilityRole="button"
                  accessibilityLabel={t.selectLanguage}>
                  <Text style={styles.languageButtonText}>🌐 {t.selectLanguage}</Text>
                </TouchableOpacity>
              </View>

              {/* DAILY TIP */}
              <View style={[styles.tipCard, { backgroundColor: tipBg }]}>
                <Text style={[styles.tipLabel, { color: tipText }]}>💡 {t.dailyTip}</Text>
                <Text style={[styles.tipText,  { color: tipText }]}>{todaysTip}</Text>
              </View>

              {/* QUICK ACTION BANNERS */}
              <View style={styles.bannersRow}>
                <TouchableOpacity
                  style={[styles.bannerBtn, { backgroundColor: '#F44336' }]}
                  onPress={() => navigation.navigate('Emergency')}>
                  <Text style={styles.bannerEmoji}>🆘</Text>
                  <Text style={styles.bannerTitle}>{t.emergency}</Text>
                  <Text style={styles.bannerSub}>{t.emergencyHelplines}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.bannerBtn, { backgroundColor: '#1565C0' }]}
                  onPress={() => navigation.navigate('NearbyServices')}>
                  <Text style={styles.bannerEmoji}>📍</Text>
                  <Text style={styles.bannerTitle}>{t.nearby}</Text>
                  <Text style={styles.bannerSub}>{t.nearbyServices}</Text>
                </TouchableOpacity>
              </View>

              {/* SCHEME CHECKER */}
              <TouchableOpacity
                style={styles.schemeBanner}
                onPress={() => navigation.navigate('SchemeChecker')}>
                <Text style={styles.schemeEmoji}>🏛️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.schemeTitle}>{t.schemeCheckerTitle}</Text>
                  <Text style={styles.schemeSub}>{t.schemeCheckerSub}</Text>
                </View>
                <Text style={styles.schemeArrow}>→</Text>
              </TouchableOpacity>

              {/* AI CHAT BANNER — hidden if disabled via Remote Config */}
              {aiEnabled && (
                <TouchableOpacity
                  style={styles.aiBanner}
                  onPress={() => navigation.navigate('AIChat')}
                  activeOpacity={0.88}>
                  <Text style={styles.aiEmoji}>🤖</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.aiTitle}>{aiChatLang.title}</Text>
                    <Text style={styles.aiSub}>{aiChatLang.sub}</Text>
                  </View>
                  <Text style={styles.aiArrow}>→</Text>
                </TouchableOpacity>
              )}

              {/* CATEGORY CARDS */}
              <View style={styles.categoriesContainer}>
                <CategoryCard
                  title={t.farming}
                  subtitle={t.farmingDesc}
                  icon="tractor"
                  color="#4CAF50"
                  tapHint={t.tapToListen}
                  onPress={() => navigation.navigate('Farming')}
                />
                <CategoryCard
                  title={t.health}
                  subtitle={t.healthDesc}
                  icon="hospital-box"
                  color="#2196F3"
                  tapHint={t.tapToListen}
                  onPress={() => navigation.navigate('Health')}
                />
                <CategoryCard
                  title={t.government}
                  subtitle={t.governmentDesc}
                  icon="office-building"
                  color="#FF9800"
                  tapHint={t.tapToListen}
                  onPress={() => navigation.navigate('Government')}
                />
                <CategoryCard
                  title={t.education}
                  subtitle={t.educationDesc}
                  icon="school"
                  color="#9C27B0"
                  tapHint={t.tapToListen}
                  onPress={() => navigation.navigate('Education')}
                />
              </View>
            </>
          )}

        </ScrollView>
      </SafeAreaView>

      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  offlineBanner: {
    backgroundColor: '#37474F', paddingVertical: 8,
    paddingHorizontal: 16, alignItems: 'center',
  },
  offlineText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingTop: 12 },
  searchIconBtn: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#2196F3', elevation: 2,
  },
  searchIconText: { fontSize: 20 },
  loadingContainer: { paddingTop: 80, alignItems: 'center' },
  loadingText: { marginTop: 15, fontSize: 16 },
  header: { alignItems: 'center', paddingTop: 16, paddingBottom: 32 },
  title: { fontSize: 42, fontWeight: 'bold', color: '#2196F3' },
  subtitle: { fontSize: 20, marginTop: 6 },
  tagline: { fontSize: 14, fontStyle: 'italic', marginTop: 6 },
  languageButton: {
    marginTop: 16, paddingHorizontal: 20, paddingVertical: 10,
    backgroundColor: '#E3F2FD', borderRadius: 20,
    borderWidth: 1, borderColor: '#2196F3',
  },
  languageButtonText: { color: '#2196F3', fontSize: 15, fontWeight: '600' },
  tipCard: { marginHorizontal: 16, marginBottom: 14, borderRadius: 14, padding: 14, elevation: 2 },
  tipLabel: { fontSize: 12, fontWeight: '800', marginBottom: 6 },
  tipText:  { fontSize: 15, lineHeight: 22, fontWeight: '500' },
  bannersRow: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12, gap: 12 },
  bannerBtn: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center', elevation: 3 },
  bannerEmoji: { fontSize: 28 },
  bannerTitle: { color: '#fff', fontSize: 14, fontWeight: '800', marginTop: 4 },
  bannerSub:   { color: '#ffffffcc', fontSize: 11, marginTop: 2 },
  schemeBanner: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginBottom: 12,
    backgroundColor: '#E65100', borderRadius: 14,
    padding: 16, elevation: 3, gap: 12,
  },
  schemeEmoji: { fontSize: 30 },
  schemeTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  schemeSub:   { color: '#ffffffcc', fontSize: 11, marginTop: 3 },
  schemeArrow: { color: '#fff', fontSize: 20, fontWeight: '700' },
  aiBanner: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginBottom: 16,
    backgroundColor: '#1a5c38', borderRadius: 14,
    padding: 16, elevation: 3, gap: 12,
  },
  aiEmoji: { fontSize: 30 },
  aiTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  aiSub:   { color: '#a8d5b5', fontSize: 11, marginTop: 3 },
  aiArrow: { color: '#a8d5b5', fontSize: 20, fontWeight: '700' },
  categoriesContainer: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-around', paddingHorizontal: 10,
  },
});