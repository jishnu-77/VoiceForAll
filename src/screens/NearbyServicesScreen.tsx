import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NearbyServices'>;
};

const SERVICES = [
  { emoji: '🏥', nameKey: 'hospital',      descKey: 'hospitalDesc',      query: 'government hospital near me',       color: '#F44336' },
  { emoji: '💊', nameKey: 'pharmacy',      descKey: 'pharmacyDesc',      query: 'pharmacy medical store near me',    color: '#E91E63' },
  { emoji: '👨‍🌾', nameKey: 'kvk',          descKey: 'kvkDesc',           query: 'Krishi Vigyan Kendra near me',      color: '#4CAF50' },
  { emoji: '🌾', nameKey: 'rationShop',    descKey: 'rationShopDesc',    query: 'ration shop fair price shop near me', color: '#FF9800' },
  { emoji: '🏦', nameKey: 'bankAtm',       descKey: 'bankAtmDesc',       query: 'bank ATM near me',                  color: '#2196F3' },
  { emoji: '🏛️', nameKey: 'gramPanchayat', descKey: 'gramPanchayatDesc', query: 'gram panchayat office near me',     color: '#9C27B0' },
  { emoji: '🏫', nameKey: 'govSchool',     descKey: 'govSchoolDesc',     query: 'government school near me',         color: '#00BCD4' },
  { emoji: '🌱', nameKey: 'soilLab',       descKey: 'soilLabDesc',       query: 'soil testing laboratory near me',   color: '#8BC34A' },
  { emoji: '💧', nameKey: 'waterOffice',   descKey: 'waterOfficeDesc',   query: 'water supply office near me',       color: '#03A9F4' },
  { emoji: '⚡', nameKey: 'electricOffice',descKey: 'electricOfficeDesc',query: 'electricity board office near me',  color: '#FFC107' },
];

const SERVICE_TRANSLATIONS: Record<string, Record<string, string>> = {
  hospital:           { english: 'Hospital', hindi: 'अस्पताल', malayalam: 'ആശുപത്രി', marathi: 'रुग्णालय', tamil: 'மருத்துவமனை', telugu: 'ఆసుపత్రి', bengali: 'হাসপাতাল' },
  hospitalDesc:       { english: 'Nearest government hospital', hindi: 'नजदीकी सरकारी अस्पताल', malayalam: 'ഏറ്റവും അടുത്ത സർക്കാർ ആശുപത്രി', marathi: 'जवळचे सरकारी रुग्णालय', tamil: 'அருகிலுள்ள அரசு மருத்துவமனை', telugu: 'సమీప ప్రభుత్వ ఆసుపత్రి', bengali: 'নিকটতম সরকারি হাসপাতাল' },
  pharmacy:           { english: 'Pharmacy', hindi: 'दवा की दुकान', malayalam: 'മരുന്ന് കട', marathi: 'औषध दुकान', tamil: 'மருந்தகம்', telugu: 'ఔషధశాల', bengali: 'ফার্মেসি' },
  pharmacyDesc:       { english: 'Nearest medical store', hindi: 'नजदीकी मेडिकल स्टोर', malayalam: 'ഏറ്റവും അടുത്ത മരുന്ന് കട', marathi: 'जवळचे मेडिकल स्टोर', tamil: 'அருகிலுள்ள மருந்து கடை', telugu: 'సమీప మెడికల్ స్టోర్', bengali: 'নিকটতম ওষুধের দোকান' },
  kvk:                { english: 'Krishi Vigyan Kendra', hindi: 'कृषि विज्ञान केंद्र', malayalam: 'കൃഷി വിജ്ഞാന കേന്ദ്രം', marathi: 'कृषी विज्ञान केंद्र', tamil: 'கிருஷி விஞ்ஞான் கேந்திரா', telugu: 'కృషి విజ్ఞాన కేంద్ర', bengali: 'কৃষি বিজ্ঞান কেন্দ্র' },
  kvkDesc:            { english: 'Agriculture knowledge centre', hindi: 'कृषि ज्ञान केंद्र', malayalam: 'കൃഷി അറിവ് കേന്ദ്രം', marathi: 'कृषी ज्ञान केंद्र', tamil: 'விவசாய அறிவு மையம்', telugu: 'వ్యవసాయ జ్ఞాన కేంద్రం', bengali: 'কৃষি জ্ঞান কেন্দ্র' },
  rationShop:         { english: 'Ration Shop', hindi: 'राशन की दुकान', malayalam: 'റേഷൻ കട', marathi: 'रेशन दुकान', tamil: 'ரேஷன் கடை', telugu: 'రేషన్ దుకాణం', bengali: 'রেশন দোকান' },
  rationShopDesc:     { english: 'Fair price food shop', hindi: 'उचित मूल्य खाद्य दुकान', malayalam: 'ന്യായവില ഭക്ഷ്യ കട', marathi: 'वाजवी किमतीचे अन्न दुकान', tamil: 'நியாயவிலை உணவு கடை', telugu: 'న్యాయమైన ధర ఆహార దుకాణం', bengali: 'ন্যায্যমূল্যের খাদ্য দোকান' },
  bankAtm:            { english: 'Bank / ATM', hindi: 'बैंक / एटीएम', malayalam: 'ബാങ്ക് / ATM', marathi: 'बँक / ATM', tamil: 'வங்கி / ATM', telugu: 'బ్యాంక్ / ATM', bengali: 'ব্যাংক / ATM' },
  bankAtmDesc:        { english: 'Nearest bank or ATM', hindi: 'नजदीकी बैंक या एटीएम', malayalam: 'ഏറ്റവും അടുത്ത ബാങ്ക് അല്ലെങ്കിൽ ATM', marathi: 'जवळचे बँक किंवा ATM', tamil: 'அருகிலுள்ள வங்கி அல்லது ATM', telugu: 'సమీప బ్యాంక్ లేదా ATM', bengali: 'নিকটতম ব্যাংক বা ATM' },
  gramPanchayat:      { english: 'Gram Panchayat', hindi: 'ग्राम पंचायत', malayalam: 'ഗ്രാമ പഞ്ചായത്ത്', marathi: 'ग्रामपंचायत', tamil: 'கிராம பஞ்சாயத்து', telugu: 'గ్రామ పంచాయతీ', bengali: 'গ্রাম পঞ্চায়েত' },
  gramPanchayatDesc:  { english: 'Local government office', hindi: 'स्थानीय सरकारी कार्यालय', malayalam: 'പ്രാദേശിക സർക്കാർ ഓഫീസ്', marathi: 'स्थानिक सरकारी कार्यालय', tamil: 'உள்ளூர் அரசு அலுவலகம்', telugu: 'స్థానిక ప్రభుత్వ కార్యాలయం', bengali: 'স্থানীয় সরকারি অফিস' },
  govSchool:          { english: 'Government School', hindi: 'सरकारी स्कूल', malayalam: 'സർക്കാർ സ്കൂൾ', marathi: 'सरकारी शाळा', tamil: 'அரசு பள்ளி', telugu: 'ప్రభుత్వ పాఠశాల', bengali: 'সরকারি বিদ্যালয়' },
  govSchoolDesc:      { english: 'Nearest government school', hindi: 'नजदीकी सरकारी स्कूल', malayalam: 'ഏറ്റവും അടുത്ത സർക്കാർ സ്കൂൾ', marathi: 'जवळची सरकारी शाळा', tamil: 'அருகிலுள்ள அரசு பள்ளி', telugu: 'సమీప ప్రభుత్వ పాఠశాల', bengali: 'নিকটতম সরকারি বিদ্যালয়' },
  soilLab:            { english: 'Soil Testing Lab', hindi: 'मिट्टी परीक्षण लैब', malayalam: 'മണ്ണ് പരിശോധന ലാബ്', marathi: 'माती चाचणी प्रयोगशाळा', tamil: 'மண் பரிசோதனை ஆய்வகம்', telugu: 'నేల పరీక్ష ల్యాబ్', bengali: 'মাটি পরীক্ষা ল্যাব' },
  soilLabDesc:        { english: 'Test your soil quality', hindi: 'अपनी मिट्टी की जांच करें', malayalam: 'മണ്ണ് ഗുണനിലവാരം പരിശോധിക്കുക', marathi: 'आपल्या मातीची चाचणी करा', tamil: 'உங்கள் மண்ணின் தரம் சோதிக்கவும்', telugu: 'మీ నేల నాణ్యతను పరీక్షించండి', bengali: 'আপনার মাটির মান পরীক্ষা করুন' },
  waterOffice:        { english: 'Water Supply Office', hindi: 'जल आपूर्ति कार्यालय', malayalam: 'ജലലഭ്യത ഓഫീസ്', marathi: 'जलपुरवठा कार्यालय', tamil: 'நீர் வழங்கல் அலுவலகம்', telugu: 'నీటి సరఫరా కార్యాలయం', bengali: 'জল সরবরাহ অফিস' },
  waterOfficeDesc:    { english: 'Water department office', hindi: 'जल विभाग कार्यालय', malayalam: 'ജല വകുപ്പ് ഓഫീസ്', marathi: 'जल विभाग कार्यालय', tamil: 'நீர் துறை அலுவலகம்', telugu: 'నీటి శాఖ కార్యాలయం', bengali: 'জল বিভাগ অফিস' },
  electricOffice:     { english: 'Electricity Office', hindi: 'बिजली विभाग', malayalam: 'വൈദ്യുതി ഓഫീസ്', marathi: 'वीज विभाग', tamil: 'மின்சார அலுவலகம்', telugu: 'విద్యుత్ కార్యాలయం', bengali: 'বিদ্যুৎ অফিস' },
  electricOfficeDesc: { english: 'Power department office', hindi: 'बिजली विभाग कार्यालय', malayalam: 'വൈദ്യുതി വകുപ്പ് ഓഫീസ്', marathi: 'वीज विभाग कार्यालय', tamil: 'மின் துறை அலுவலகம்', telugu: 'విద్యుత్ శాఖ కార్యాలయం', bengali: 'বিদ্যুৎ বিভাগ অফিস' },
};

function NearbyServicesScreen({ navigation }: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const { t, language } = useLanguage();

  const bg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1C1C1C' : '#FFFFFF';
  const textPrimary = isDarkMode ? '#F0F0F0' : '#1A1A1A';
  const textMuted = isDarkMode ? '#999999' : '#666666';

  const tr = (key: string) => SERVICE_TRANSLATIONS[key]?.[language] || SERVICE_TRANSLATIONS[key]?.english || key;

  const handleFind = async (query: string, index: number) => {
    setLoadingIndex(index);
    const encodedQuery = encodeURIComponent(query);
    const googleMapsUrl = `https://www.google.com/maps/search/${encodedQuery}`;
    const googleMapsApp = `geo:0,0?q=${encodedQuery}`;
    try {
      const canOpen = await Linking.canOpenURL(googleMapsApp);
      if (canOpen) {
        await Linking.openURL(googleMapsApp);
      } else {
        await Linking.openURL(googleMapsUrl);
      }
    } catch {
      await Linking.openURL(googleMapsUrl);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{t.nearbyHeader}</Text>
          <Text style={styles.headerSub}>{t.nearbyHeaderSub}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={[styles.infoBanner, { backgroundColor: isDarkMode ? '#1A237E22' : '#E3F2FD' }]}>
          <Text style={[styles.infoText, { color: isDarkMode ? '#90CAF9' : '#1565C0' }]}>
            {t.nearbyBannerText}
          </Text>
        </View>

        {SERVICES.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: cardBg }]}
            onPress={() => handleFind(service.query, index)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBox, { backgroundColor: service.color + '22' }]}>
              <Text style={styles.emoji}>{service.emoji}</Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, { color: textPrimary }]}>{tr(service.nameKey)}</Text>
              <Text style={[styles.desc, { color: textMuted }]}>{tr(service.descKey)}</Text>
            </View>
            {loadingIndex === index ? (
              <ActivityIndicator size="small" color={service.color} />
            ) : (
              <View style={[styles.findBtn, { backgroundColor: service.color }]}>
                <Text style={styles.findText}>📍 {t.find}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

export default NearbyServicesScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1565C0', padding: 16, paddingTop: 14 },
  backArrow: { color: '#fff', fontSize: 22 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerSub: { color: '#ffffffcc', fontSize: 12, marginTop: 2 },
  content: { padding: 16 },
  infoBanner: { borderRadius: 12, padding: 12, marginBottom: 16 },
  infoText: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginBottom: 12, elevation: 3 },
  iconBox: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  emoji: { fontSize: 26 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700' },
  desc: { fontSize: 12, marginTop: 2 },
  findBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  findText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
