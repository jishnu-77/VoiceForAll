import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  useColorScheme,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import { speak, stopSpeaking } from '../services/ttsService';
import { farmingTopics } from '../data/farmingData';
import { healthTopics } from '../data/healthData';
import { governmentTopics } from '../data/governmentData';
import { educationTopics } from '../data/educationData';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VoiceSearch'>;
};

const UI: Record<string, Record<string, string>> = {
  title: {
    english: 'Search Topics', hindi: 'विषय खोजें', malayalam: 'വിഷയങ്ങൾ തിരയൂ',
    marathi: 'विषय शोधा', tamil: 'தலைப்புகளை தேடு', telugu: 'అంశాలు వెతకండి', bengali: 'বিষয় খুঁজুন',
  },
  placeholder: {
    english: 'Type or use keyboard mic to speak...', hindi: 'टाइप करें या कीबोर्ड माइक से बोलें...',
    malayalam: 'ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ കീബോർഡ് മൈക്ക് ഉപയോഗിക്കുക...',
    marathi: 'टाइप करा किंवा कीबोर्ड माइक वापरा...', tamil: 'டைப் செய்யுங்கள் அல்லது கீபோர்டு மைக் பயன்படுத்துங்கள்...',
    telugu: 'టైప్ చేయండి లేదా కీబోర్డ్ మైక్ వాడండి...', bengali: 'টাইপ করুন বা কীবোর্ড মাইক ব্যবহার করুন...',
  },
  hint: {
    english: '🎤 Tap the mic on your keyboard to speak — results appear instantly',
    hindi: '🎤 बोलने के लिए कीबोर्ड का माइक दबाएं — परिणाम तुरंत दिखेंगे',
    malayalam: '🎤 സംസാരിക്കാൻ കീബോർഡ് മൈക്ക് ടാപ്പ് ചെയ്യുക — ഫലങ്ങൾ ഉടൻ കാണും',
    marathi: '🎤 बोलण्यासाठी कीबोर्डचा माइक दाबा — निकाल लगेच दिसतील',
    tamil: '🎤 பேச கீபோர்டு மைக்கை தட்டவும் — முடிவுகள் உடனே தோன்றும்',
    telugu: '🎤 మాట్లాడటానికి కీబోర్డ్ మైక్ నొక్కండి — ఫలితాలు వెంటనే కనిపిస్తాయి',
    bengali: '🎤 কথা বলতে কীবোর্ডের মাইক ট্যাপ করুন — ফলাফল তাৎক্ষণিক দেখাবে',
  },
  noResults: {
    english: 'No results found. Try different words.',
    hindi: 'कोई परिणाम नहीं मिला। अलग शब्द आज़माएं।',
    malayalam: 'ഫലങ്ങൾ കണ്ടെത്തിയില്ല. വ്യത്യസ്ത വാക്കുകൾ ശ്രമിക്കൂ.',
    marathi: 'कोणतेही परिणाम आढळले नाहीत. वेगळे शब्द वापरा.',
    tamil: 'முடிவுகள் இல்லை. வேறு வார்த்தைகளை முயற்சிக்கவும்.',
    telugu: 'ఫలితాలు కనుగొనబడలేదు. వేరే పదాలు ప్రయత్నించండి.',
    bengali: 'কোনো ফলাফল পাওয়া যায়নি। ভিন্ন শব্দ চেষ্টা করুন।',
  },
  results: {
    english: 'Search Results', hindi: 'खोज परिणाम', malayalam: 'തിരയൽ ഫലങ്ങൾ',
    marathi: 'शोध परिणाम', tamil: 'தேடல் முடிவுகள்', telugu: 'శోధన ఫలితాలు', bengali: 'অনুসন্ধান ফলাফল',
  },
};

const tr = (key: string, lang: string) => UI[key]?.[lang] || UI[key]?.english || key;

const EXAMPLES: Record<string, string> = {
  english:  '"PM Kisan"  "fever"  "ration card"  "soil"',
  hindi:    '"PM Kisan"  "बुखार"  "राशन कार्ड"  "मिट्टी"',
  malayalam:'"PM Kisan"  "രോഗം"  "റേഷൻ"  "മണ്ണ്"',
  marathi:  '"PM Kisan"  "आजार"  "रेशन"  "माती"',
  tamil:    '"PM Kisan"  "நோய்"  "ரேஷன்"  "மண்"',
  telugu:   '"PM Kisan"  "జబ్బు"  "రేషన్"  "నేల"',
  bengali:  '"PM Kisan"  "রোগ"  "রেশন"  "মাটি"',
};

const CATEGORIES = [
  { key: 'farming',    label: { english:'Farming', hindi:'खेती', malayalam:'കൃഷി', marathi:'शेती', tamil:'விவசாயம்', telugu:'వ్యవసాయం', bengali:'কৃষি' }, color: '#4CAF50', emoji: '🌾' },
  { key: 'health',     label: { english:'Health', hindi:'स्वास्थ्य', malayalam:'ആരോഗ്യം', marathi:'आरोग्य', tamil:'சுகாதாரம்', telugu:'ఆరోగ్యం', bengali:'স্বাস্থ্য' }, color: '#2196F3', emoji: '🏥' },
  { key: 'government', label: { english:'Government', hindi:'सरकारी', malayalam:'സർക്കാർ', marathi:'सरकारी', tamil:'அரசு', telugu:'ప్రభుత్వం', bengali:'সরকার' }, color: '#FF9800', emoji: '🏛️' },
  { key: 'education',  label: { english:'Education', hindi:'शिक्षा', malayalam:'വിദ്യാഭ്യാസം', marathi:'शिक्षण', tamil:'கல்வி', telugu:'విద్య', bengali:'শিక్ষা' }, color: '#9C27B0', emoji: '📚' },
];

const SYNONYMS: Record<string, string[]> = {
  'crop_cultivation':  ['crop','crops','seed','seeds','plant','planting','sow','sowing','बीज','फसल','खेती','விதை','పంట','बियाणे','ফসল','വിത്ത്'],
  'pest_control':      ['pest','insect','bug','neem','spray','कीट','कीड़े','பூச்சி','పురుగు','कीड','পোকা','കീട'],
  'irrigation':        ['water','irrigation','drought','सिंचाई','पानी','நீர்','నీరు','पाणी','জল','ജലം'],
  'organic_farming':   ['organic','compost','manure','fertilizer','जैविक','खाद','இயற்கை','సేంద్రీయ','सेंद्रिय','জৈব','ജൈവ'],
  'market_prices':     ['price','market','sell','mandi','rate','भाव','मंडी','விலை','ధర','बाजार','দাম','വില'],
  'weather_forecast':  ['weather','rain','season','forecast','मौसम','बारिश','வானிலை','వాతావరణం','हवामान','আবহাওয়া','കാലാവസ്ഥ'],
  'common_diseases':   ['disease','sick','fever','illness','symptoms','बीमारी','बुखार','நோய்','జబ్బు','आजार','রোগ','രോഗം'],
  'first_aid':         ['first aid','emergency','injury','accident','प्राथमिक','आपातकाल','முதலுதவி','ప్రథమ','প্রাথমিক','പ്രഥമ'],
  'nutrition':         ['food','nutrition','diet','eat','vitamin','खाना','पोषण','உணவு','ఆహారం','अन्न','খাদ্য','ഭക്ഷണം'],
  'mental_health':     ['stress','mental','anxiety','depression','tension','तनाव','மன','మానసిక','मानसिक','মানসিক','മാനസിക'],
  'vaccination':       ['vaccine','vaccination','टीका','टीकाकरण','தடுப்பூசி','టీకా','लसीकरण','টিকা','വാക്സിൻ'],
  'hygiene':           ['clean','hygiene','wash','soap','sanitation','स्वच्छता','சுத்தம்','శుభ్రత','পরিষ্কার','ശുചിത്വം'],
  'pm_kisan':          ['pm kisan','pmkisan','6000','किसान','கிசான்','కిసాన్','কিসান','കിസാൻ'],
  'ayushman_bharat':   ['ayushman','health insurance','5 lakh','आयुष्मान','ஆயுஷ்மான்','ఆయుష్మాన్','আয়ুষ্মান','ആയുഷ്മാൻ'],
  'ration_card':       ['ration','bpl','राशन','ரேஷன்','రేషన్','रेशन','রেশন','റേഷൻ'],
  'pension_schemes':   ['pension','old age','widow','पेंशन','ஓய்வூதியம்','పెన్షన్','পেনশন','പെൻഷൻ'],
  'aadhaar_services':  ['aadhaar','aadhar','आधार','ஆதார்','ఆధార్','আধার','ആധാർ'],
  'jan_dhan':          ['bank','account','jan dhan','जन धन','ஜன் தன்','జన్ ధన్','জন ধন','ജൻ ധൻ'],
  'awas_yojana':       ['house','home','housing','awas','मकान','घर','வீடு','ఇల్లు','বাড়ি','ഭവന'],
  'ujjwala_scheme':    ['lpg','gas','cylinder','ujjwala','उज्ज्वला','உஜ்வலா','ఉజ్జ్వల','উজ্জ্বলা','ഉജ്ജ്വല'],
  'soil_health_card':  ['soil','soil health','मिट्टी','மண்','నేల','माती','মাটি','മണ്ണ്'],
  'scholarships':      ['scholarship','student','छात्रवृत्ति','உதாரியம்','స్కాలర్షిప్','বৃত্তি','സ്കോളർഷിപ്പ്'],
  'basic_literacy':    ['read','write','literacy','पढ़ना','படிக்க','చదవడం','পড়া','വായിക്കുക'],
  'financial_literacy':['money','finance','save','loan','पैसा','பணம்','డబ్బు','টাকা','പണം'],
  'digital_skills':    ['phone','mobile','internet','digital','फोन','மொபைல்','మొబైల్','ফোন','ഫോൺ'],
  'children_education':['children','child','school','kids','बच्चे','குழந்தை','పిల్లలు','শিশু','കുട്ടി'],
  'skill_development': ['skill','job','training','career','कौशल','திறன்','నైపుణ్యం','দক্ষতা','നൈപുണ്യം'],
  'online_learning':   ['online','course','ऑनलाइन','ஆன்லைன்','ఆన్‌లైన్','অনলাইন','ഓൺലൈൻ'],
};

type SearchResult = {
  topicId: string;
  category: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  color: string;
  emoji: string;
  officialLinks: any[];
};

const getAllTopics = (language: string): SearchResult[] => {
  const lang = language as keyof typeof farmingTopics[0]['content'];
  const results: SearchResult[] = [];
  farmingTopics.forEach(topic => {
    const c = topic.content[lang] || topic.content.english;
    results.push({ topicId: topic.id, category: 'farming', title: c.title, shortDescription: c.shortDescription, fullContent: c.fullContent, color: '#4CAF50', emoji: '🌾', officialLinks: topic.officialLinks });
  });
  healthTopics.forEach(topic => {
    const c = topic.content[lang] || topic.content.english;
    results.push({ topicId: topic.id, category: 'health', title: c.title, shortDescription: c.shortDescription, fullContent: c.fullContent, color: '#2196F3', emoji: '🏥', officialLinks: topic.officialLinks });
  });
  governmentTopics.forEach(topic => {
    const c = topic.content[lang] || topic.content.english;
    results.push({ topicId: topic.id, category: 'government', title: c.title, shortDescription: c.shortDescription, fullContent: c.fullContent, color: '#FF9800', emoji: '🏛️', officialLinks: topic.officialLinks });
  });
  educationTopics.forEach(topic => {
    const c = topic.content[lang] || topic.content.english;
    results.push({ topicId: topic.id, category: 'education', title: c.title, shortDescription: c.shortDescription, fullContent: c.fullContent, color: '#9C27B0', emoji: '📚', officialLinks: topic.officialLinks });
  });
  return results;
};

const searchTopics = (query: string, language: string): SearchResult[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const allTopics = getAllTopics(language);
  const matchedIds = new Set<string>();

  Object.entries(SYNONYMS).forEach(([topicId, keywords]) => {
    if (keywords.some(kw => q.includes(kw.toLowerCase()) || kw.toLowerCase().includes(q))) {
      matchedIds.add(topicId);
    }
  });

  const directMatches = allTopics.filter(topic =>
    topic.title.toLowerCase().includes(q) ||
    topic.shortDescription.toLowerCase().includes(q) ||
    topic.topicId.toLowerCase().includes(q.replace(/\s/g, '_'))
  );

  const synonymMatches = allTopics.filter(topic => matchedIds.has(topic.topicId));
  const combined = [...synonymMatches];
  directMatches.forEach(dm => {
    if (!combined.find(c => c.topicId === dm.topicId)) combined.push(dm);
  });
  return combined;
};

function VoiceSearchScreen({ navigation }: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { language } = useLanguage();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const bg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1C1C1C' : '#FFFFFF';
  const textPrimary = isDarkMode ? '#F0F0F0' : '#1A1A1A';
  const textMuted = isDarkMode ? '#999' : '#666';

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length >= 2) {
      setResults(searchTopics(text, language));
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleListen = (result: SearchResult) => {
    if (playingId === result.topicId) {
      stopSpeaking(() => setPlayingId(null));
      return;
    }
    stopSpeaking(() => {
      speak(result.fullContent, language, 0.5, () => setPlayingId(result.topicId), () => setPlayingId(null));
    });
  };

  const getCategoryLabel = (cat: string) => {
    const found = CATEGORIES.find(c => c.key === cat);
    return found ? (found.label[language as keyof typeof found.label] || found.label.english) : cat;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>🔍 {tr('title', language)}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      {/* SEARCH BAR */}
      <View style={[styles.searchBar, { backgroundColor: cardBg }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: textPrimary }]}
          placeholder={tr('placeholder', language)}
          placeholderTextColor={textMuted}
          value={query}
          onChangeText={handleSearch}
          autoFocus
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); setResults([]); setHasSearched(false); }}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* HINT CARD */}
      {!hasSearched && (
        <View style={[styles.hintCard, { backgroundColor: isDarkMode ? '#0D1B2A' : '#E3F2FD' }]}>
          <Text style={[styles.hintMain, { color: isDarkMode ? '#90CAF9' : '#1565C0' }]}>
            {tr('hint', language)}
          </Text>
          <Text style={[styles.hintExamples, { color: textMuted }]}>
            {EXAMPLES[language] || EXAMPLES.english}
          </Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* NO RESULTS */}
        {hasSearched && results.length === 0 && (
          <View style={[styles.noResultCard, { backgroundColor: cardBg }]}>
            <Text style={styles.noResultEmoji}>🔍</Text>
            <Text style={[styles.noResultText, { color: textMuted }]}>{tr('noResults', language)}</Text>
          </View>
        )}

        {/* RESULTS */}
        {results.length > 0 && (
          <>
            <Text style={[styles.resultsLabel, { color: textMuted }]}>
              {tr('results', language)} ({results.length})
            </Text>

            {results.map((result) => (
              <TouchableOpacity
                key={result.topicId}
                style={[styles.resultCard, { backgroundColor: cardBg }]}
                onPress={() => navigation.navigate('ContentDetail', {
                  topicId: result.topicId,
                  title: result.title,
                  icon: result.emoji,
                  accentColor: result.color,
                  fullContent: result.fullContent,
                  shortDescription: result.shortDescription,
                  officialLinks: result.officialLinks,
                })}
                activeOpacity={0.8}
              >
                <View style={[styles.iconBox, { backgroundColor: result.color + '22' }]}>
                  <Text style={styles.resultEmoji}>{result.emoji}</Text>
                </View>

                <View style={styles.resultInfo}>
                  <Text style={[styles.resultTitle, { color: textPrimary }]}>{result.title}</Text>
                  <Text style={[styles.resultDesc, { color: textMuted }]}>{result.shortDescription}</Text>
                  <View style={[styles.categoryBadge, { backgroundColor: result.color + '22' }]}>
                    <Text style={[styles.categoryText, { color: result.color }]}>
                      {getCategoryLabel(result.category)}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.listenBtn, { backgroundColor: result.color }]}
                  onPress={() => handleListen(result)}
                >
                  <Text style={styles.listenBtnText}>
                    {playingId === result.topicId ? '⏹' : '🔊'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default VoiceSearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1565C0', padding: 16, paddingTop: 14,
  },
  backArrow: { color: '#fff', fontSize: 22 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    margin: 16, borderRadius: 14, paddingHorizontal: 12,
    elevation: 3, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 12 },
  clearBtn: { fontSize: 16, color: '#999', paddingHorizontal: 4 },

  hintCard: {
    marginHorizontal: 16, marginBottom: 12,
    borderRadius: 12, padding: 14,
  },
  hintMain: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  hintExamples: { fontSize: 12, lineHeight: 20 },

  content: { paddingHorizontal: 16, paddingBottom: 20 },
  resultsLabel: { fontSize: 13, fontWeight: '600', marginBottom: 10 },

  resultCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 14, padding: 14, marginBottom: 12, elevation: 3, gap: 12,
  },
  iconBox: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  resultEmoji: { fontSize: 24 },
  resultInfo: { flex: 1 },
  resultTitle: { fontSize: 15, fontWeight: '700' },
  resultDesc: { fontSize: 12, marginTop: 2 },
  categoryBadge: { alignSelf: 'flex-start', marginTop: 6, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  categoryText: { fontSize: 11, fontWeight: '700' },
  listenBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  listenBtnText: { fontSize: 18 },

  noResultCard: { borderRadius: 14, padding: 30, alignItems: 'center', elevation: 2 },
  noResultEmoji: { fontSize: 40, marginBottom: 12 },
  noResultText: { fontSize: 15, textAlign: 'center' },
});
