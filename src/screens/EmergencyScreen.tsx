import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  useColorScheme,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Emergency'>;
};

const EMERGENCY_CONTACTS = [
  { emoji: '🚑', nameKey: 'ambulance',       number: '108',  color: '#F44336', descKey: 'ambulanceDesc' },
  { emoji: '🚔', nameKey: 'police',           number: '100',  color: '#1565C0', descKey: 'policeDesc' },
  { emoji: '🔥', nameKey: 'fire',             number: '101',  color: '#FF6F00', descKey: 'fireDesc' },
  { emoji: '👨‍🌾', nameKey: 'farmerHelpline', number: '1551', color: '#2E7D32', descKey: 'farmerHelplineDesc' },
  { emoji: '🏥', nameKey: 'healthHelpline',  number: '104',  color: '#00838F', descKey: 'healthHelplineDesc' },
  { emoji: '👩‍⚕️', nameKey: 'womenHelpline', number: '1091', color: '#AD1457', descKey: 'womenHelplineDesc' },
  { emoji: '👶', nameKey: 'childHelpline',   number: '1098', color: '#6A1B9A', descKey: 'childHelplineDesc' },
  { emoji: '☎️', nameKey: 'disasterMgmt',   number: '1078', color: '#4527A0', descKey: 'disasterMgmtDesc' },
];

// Translations for contact names and descriptions
const CONTACT_TRANSLATIONS: Record<string, Record<string, string>> = {
  ambulance:         { english: 'Ambulance', hindi: 'एम्बुलेंस', malayalam: 'ആംബുലൻസ്', marathi: 'रुग्णवाहिका', tamil: 'ஆம்புலன்ஸ்', telugu: 'అంబులెన్స్', bengali: 'অ্যাম্বুলেন্স' },
  ambulanceDesc:     { english: 'Medical emergency', hindi: 'चिकित्सा आपात स्थिति', malayalam: 'വൈദ്യ അടിയന്തരം', marathi: 'वैद्यकीय आणीबाणी', tamil: 'மருத்துவ அவசரநிலை', telugu: 'వైద్య అత్యవసరం', bengali: 'চিকিৎসা জরুরি' },
  police:            { english: 'Police', hindi: 'पुलिस', malayalam: 'പോലീസ്', marathi: 'पोलीस', tamil: 'காவல்துறை', telugu: 'పోలీసు', bengali: 'পুলিশ' },
  policeDesc:        { english: 'Law & order', hindi: 'कानून व्यवस्था', malayalam: 'നിയമ ക്രമം', marathi: 'कायदा व सुव्यवस्था', tamil: 'சட்டம் ஒழுங்கு', telugu: 'చట్టం మరియు క్రమం', bengali: 'আইন ও শৃঙ্খলা' },
  fire:              { english: 'Fire', hindi: 'अग्निशमन', malayalam: 'അഗ്നിശമനം', marathi: 'अग्निशमन', tamil: 'தீயணைப்பு', telugu: 'అగ్నిమాపక', bengali: 'দমকল' },
  fireDesc:          { english: 'Fire emergency', hindi: 'आग की आपात स्थिति', malayalam: 'തീ അടിയന്തരം', marathi: 'आग आणीबाणी', tamil: 'தீ அவசரநிலை', telugu: 'అగ్ని అత్యవసరం', bengali: 'আগুনের জরুরি অবস্থা' },
  farmerHelpline:    { english: 'Farmer Helpline', hindi: 'किसान हेल्पलाइन', malayalam: 'കർഷക ഹെൽപ്‌ലൈൻ', marathi: 'शेतकरी हेल्पलाइन', tamil: 'விவசாயி உதவி எண்', telugu: 'రైతు హెల్ప్‌లైన్', bengali: 'কৃষক হেল্পলাইন' },
  farmerHelplineDesc:{ english: 'Agriculture support', hindi: 'कृषि सहायता', malayalam: 'കൃഷി സഹായം', marathi: 'कृषी सहाय्य', tamil: 'விவசாய ஆதரவு', telugu: 'వ్యవసాయ సహాయం', bengali: 'কৃষি সহায়তা' },
  healthHelpline:    { english: 'Health Helpline', hindi: 'स्वास्थ्य हेल्पलाइन', malayalam: 'ആരോഗ്യ ഹെൽപ്‌ലൈൻ', marathi: 'आरोग्य हेल्पलाइन', tamil: 'சுகாதார உதவி எண்', telugu: 'ఆరోగ్య హెల్ప్‌లైన్', bengali: 'স্বাস্থ্য হেল্পলাইন' },
  healthHelplineDesc:{ english: 'Medical advice', hindi: 'चिकित्सा सलाह', malayalam: 'വൈദ്യ ഉപദേശം', marathi: 'वैद्यकीय सल्ला', tamil: 'மருத்துவ ஆலோசனை', telugu: 'వైద్య సలహా', bengali: 'চিকিৎসা পরামর্শ' },
  womenHelpline:     { english: 'Women Helpline', hindi: 'महिला हेल्पलाइन', malayalam: 'വനിതാ ഹെൽപ്‌ലൈൻ', marathi: 'महिला हेल्पलाइन', tamil: 'பெண்கள் உதவி எண்', telugu: 'మహిళా హెల్ప్‌లైన్', bengali: 'নারী হেল্পলাইন' },
  womenHelplineDesc: { english: 'Women in distress', hindi: 'महिलाओं के लिए सहायता', malayalam: 'സ്ത്രീകൾക്ക് സഹായം', marathi: 'महिलांसाठी मदत', tamil: 'பெண்களுக்கு உதவி', telugu: 'మహిళలకు సహాయం', bengali: 'নারীদের সহায়তা' },
  childHelpline:     { english: 'Child Helpline', hindi: 'बाल हेल्पलाइन', malayalam: 'ശിശു ഹെൽപ്‌ലൈൻ', marathi: 'बाल हेल्पलाइन', tamil: 'குழந்தை உதவி எண்', telugu: 'శిశు హెల్ప్‌లైన్', bengali: 'শিশু হেল্পলাইন' },
  childHelplineDesc: { english: 'Child in distress', hindi: 'बच्चों के लिए सहायता', malayalam: 'കുട്ടികൾക്ക് സഹായം', marathi: 'मुलांसाठी मदत', tamil: 'குழந்தைகளுக்கு உதவி', telugu: 'పిల్లలకు సహాయం', bengali: 'শিশুদের সহায়তা' },
  disasterMgmt:      { english: 'Disaster Mgmt', hindi: 'आपदा प्रबंधन', malayalam: 'ദുരന്ത നിവാരണം', marathi: 'आपत्ती व्यवस्थापन', tamil: 'பேரிடர் மேலாண்மை', telugu: 'విపత్తు నిర్వహణ', bengali: 'দুর্যোগ ব্যবস্থাপনা' },
  disasterMgmtDesc:  { english: 'Natural disasters', hindi: 'प्राकृतिक आपदाएं', malayalam: 'പ്രകൃതി ദുരന്തങ്ങൾ', marathi: 'नैसर्गिक आपत्ती', tamil: 'இயற்கை பேரிடர்கள்', telugu: 'సహజ విపత్తులు', bengali: 'প্রাকৃতিক দুর্যোগ' },
};

function EmergencyScreen({ navigation }: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, language } = useLanguage();

  const bg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1C1C1C' : '#FFFFFF';
  const textPrimary = isDarkMode ? '#F0F0F0' : '#1A1A1A';
  const textMuted = isDarkMode ? '#999999' : '#666666';

  const tr = (key: string) => CONTACT_TRANSLATIONS[key]?.[language] || CONTACT_TRANSLATIONS[key]?.english || key;

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{t.emergencyHeader}</Text>
          <Text style={styles.headerSub}>{t.emergencyHeaderSub}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={[styles.warningBanner, { backgroundColor: '#FFF3E0' }]}>
          <Text style={styles.warningText}>{t.emergencyBannerText}</Text>
        </View>

        {EMERGENCY_CONTACTS.map((contact, index) => (
          <View key={index} style={[styles.card, { backgroundColor: cardBg }]}>
            <View style={[styles.iconBox, { backgroundColor: contact.color + '22' }]}>
              <Text style={styles.emoji}>{contact.emoji}</Text>
            </View>

            <View style={styles.info}>
              <Text style={[styles.name, { color: textPrimary }]}>{tr(contact.nameKey)}</Text>
              <Text style={[styles.desc, { color: textMuted }]}>{tr(contact.descKey)}</Text>
              <Text style={[styles.number, { color: contact.color }]}>{contact.number}</Text>
            </View>

            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: contact.color }]}
              onPress={() => handleCall(contact.number)}
            >
              <Text style={styles.callText}>📞 {t.call}</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 16,
    paddingTop: 14,
  },
  backArrow: { color: '#fff', fontSize: 22 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerSub: { color: '#ffffffcc', fontSize: 12, marginTop: 2 },
  content: { padding: 16 },
  warningBanner: { borderRadius: 12, padding: 12, marginBottom: 16 },
  warningText: { color: '#E65100', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginBottom: 12, elevation: 3 },
  iconBox: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  emoji: { fontSize: 26 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700' },
  desc: { fontSize: 12, marginTop: 2 },
  number: { fontSize: 18, fontWeight: '800', marginTop: 4 },
  callBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  callText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
