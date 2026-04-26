// src/screens/AIChatScreen.tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';
import { useIsFocused } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import { getGeminiApiKey1, getGeminiApiKey2 } from '../services/remoteConfigService';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

// ─── Strip markdown so TTS never reads symbols aloud ─────────────────────────
function stripMarkdownForTTS(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')   // **bold** → bold
    .replace(/\*(.+?)\*/g, '$1')        // *italic* → italic
    .replace(/^[\s]*\*\s+/gm, '')       // * bullet point → remove star
    .replace(/^[\s]*-\s+/gm, '')        // - bullet point → remove dash
    .replace(/^[\s]*\d+\.\s+/gm, '')    // 1. numbered list → remove number
    .replace(/#{1,6}\s+/g, '')          // ### heading → remove hashes
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // `code` → remove backticks
    .replace(/_(.+?)_/g, '$1')          // _italic_ → italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // [link](url) → link text only
    .replace(/\n{3,}/g, '\n\n')         // collapse excess newlines
    .trim();
}

// ─── Gemini Config ────────────────────────────────────────────────────────────
const KEY_INDEX_STORAGE = 'gemini_key_index';

const getGeminiKeys = (): string[] => {
  const key1 = getGeminiApiKey1();
  const key2 = getGeminiApiKey2();
  return [
    key1 || '',
    key2 || '',
  ];
};

const getGeminiUrl = async (): Promise<string> => {
  try {
    const keys = getGeminiKeys();
    const saved = await AsyncStorage.getItem(KEY_INDEX_STORAGE);
    const idx = saved ? parseInt(saved, 10) : 0;
    const safeIdx = idx % keys.length;
    return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keys[safeIdx]}`;
  } catch {
    const keys = getGeminiKeys();
    return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keys[0]}`;
  }
};

const rotateKey = async () => {
  try {
    const keys = getGeminiKeys();
    const saved = await AsyncStorage.getItem(KEY_INDEX_STORAGE);
    const idx = saved ? parseInt(saved, 10) : 0;
    const next = (idx + 1) % keys.length;
    await AsyncStorage.setItem(KEY_INDEX_STORAGE, String(next));
  } catch {}
};

// ─── Language code → full name map for system prompt ─────────────────────────
const LANG_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ml: 'Malayalam',
  mr: 'Marathi',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali',
};

const LANG_MAP: Record<string, string> = {
  english: 'en',
  hindi: 'hi',
  malayalam: 'ml',
  marathi: 'mr',
  tamil: 'ta',
  telugu: 'te',
  bengali: 'bn',
};

// ─── UI strings ───────────────────────────────────────────────────────────────
const UI_STRINGS: Record<string, Record<string, string>> = {
  en: {
    title: 'AI Assistant',
    subtitle: 'Ask anything about farming & health',
    placeholder: 'Type your question...',
    send: 'Send',
    thinking: 'Thinking...',
    errorTitle: 'Error',
    errorMsg: 'Could not reach AI. Please check your internet connection and try again.',
    welcome:
      'Hello! I am your AI assistant for farming and health. You can ask me about crops, diseases, government schemes, medicines, or any rural topic. How can I help you today?',
    clearChat: 'Clear',
    aiDisabled: 'AI Chat is currently unavailable. Please try again later.',
  },
  hi: {
    title: 'AI सहायक',
    subtitle: 'खेती और स्वास्थ्य के बारे में कुछ भी पूछें',
    placeholder: 'अपना सवाल लिखें...',
    send: 'भेजें',
    thinking: 'सोच रहा हूँ...',
    errorTitle: 'त्रुटि',
    errorMsg: 'AI से संपर्क नहीं हो सका। कृपया इंटरनेट जांचें और दोबारा प्रयास करें।',
    welcome:
      'नमस्ते! मैं खेती और स्वास्थ्य का AI सहायक हूँ। आप फसल, बीमारी, सरकारी योजना, दवाई या किसी भी ग्रामीण विषय के बारे में पूछ सकते हैं।',
    clearChat: 'साफ करें',
    aiDisabled: 'AI चैट अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।',
  },
  ml: {
    title: 'AI സഹായി',
    subtitle: 'കൃഷിയും ആരോഗ്യവും കുറിച്ച് ചോദിക്കൂ',
    placeholder: 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യൂ...',
    send: 'അയക്കൂ',
    thinking: 'ചിന്തിക്കുന്നു...',
    errorTitle: 'പിശക്',
    errorMsg: 'AI-ലേക്ക് എത്താൻ കഴിഞ്ഞില്ല. ഇന്റർനെറ്റ് പരിശോധിക്കുക.',
    welcome:
      'ഹലോ! ഞാൻ കൃഷി, ആരോഗ്യം, സർക്കാർ പദ്ധതികൾ എന്നിവ കുറിച്ച് സഹായിക്കാൻ ഇവിടെ ഉണ്ട്.',
    clearChat: 'മായ്ക്കുക',
    aiDisabled: 'AI ചാറ്റ് ഇപ്പോൾ ലഭ്യമല്ല. പിന്നീട് ശ്രമിക്കുക.',
  },
  mr: {
    title: 'AI सहाय्यक',
    subtitle: 'शेती व आरोग्याबद्दल काहीही विचारा',
    placeholder: 'तुमचा प्रश्न टाइप करा...',
    send: 'पाठवा',
    thinking: 'विचार करत आहे...',
    errorTitle: 'त्रुटी',
    errorMsg: 'AI शी संपर्क होऊ शकला नाही. इंटरनेट तपासा.',
    welcome:
      'नमस्कार! मी शेती, आरोग्य, सरकारी योजना याबद्दल मदत करण्यासाठी येथे आहे.',
    clearChat: 'साफ करा',
    aiDisabled: 'AI चॅट सध्या उपलब्ध नाही. नंतर प्रयत्न करा.',
  },
  ta: {
    title: 'AI உதவியாளர்',
    subtitle: 'விவசாயம் & சுகாதாரம் பற்றி கேளுங்கள்',
    placeholder: 'உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள்...',
    send: 'அனுப்பு',
    thinking: 'யோசிக்கிறேன்...',
    errorTitle: 'பிழை',
    errorMsg: 'AI ஐ அடைய முடியவில்லை. இணையத்தை சரிபார்க்கவும்.',
    welcome:
      'வணக்கம்! விவசாயம், சுகாதாரம், அரசு திட்டங்கள் பற்றி கேட்கலாம்.',
    clearChat: 'அழி',
    aiDisabled: 'AI அரட்டை தற்போது கிடைக்கவில்லை. பின்னர் முயற்சிக்கவும்.',
  },
  te: {
    title: 'AI సహాయకుడు',
    subtitle: 'వ్యవసాయం & ఆరోగ్యం గురించి అడగండి',
    placeholder: 'మీ ప్రశ్న టైప్ చేయండి...',
    send: 'పంపు',
    thinking: 'ఆలోచిస్తున్నాను...',
    errorTitle: 'లోపం',
    errorMsg: 'AI ని చేరుకోలేకపోయాం. ఇంటర్నెట్ తనిఖీ చేయండి.',
    welcome:
      'నమస్కారం! వ్యవసాయం, ఆరోగ్యం, ప్రభుత్వ పథకాల గురించి అడగవచ్చు.',
    clearChat: 'తొలగించు',
    aiDisabled: 'AI చాట్ ప్రస్తుతం అందుబాటులో లేదు. తర్వాత ప్రయత్నించండి.',
  },
  bn: {
    title: 'AI সহায়ক',
    subtitle: 'কৃষি ও স্বাস্থ্য সম্পর্কে যেকোনো প্রশ্ন করুন',
    placeholder: 'আপনার প্রশ্ন টাইপ করুন...',
    send: 'পাঠান',
    thinking: 'ভাবছি...',
    errorTitle: 'ত্রুটি',
    errorMsg: 'AI-এর সাথে সংযোগ হয়নি। ইন্টারনেট পরীক্ষা করুন।',
    welcome:
      'নমস্কার! আমি কৃষি, স্বাস্থ্য, সরকারি প্রকল্প সম্পর্কে সাহায্য করতে এখানে আছি।',
    clearChat: 'মুছুন',
    aiDisabled: 'AI চ্যাট এখন উপলব্ধ নেই। পরে আবার চেষ্টা করুন।',
  },
};

// ─── Build Gemini conversation payload ───────────────────────────────────────
function buildGeminiPayload(messages: Message[], langCode: string): object {
  const langName = LANG_NAMES[langCode] || 'English';

  const systemInstruction = `You are a knowledgeable and friendly AI assistant for rural India.

CRITICAL LANGUAGE RULE: You MUST respond EXCLUSIVELY in ${langName}. 
- No matter what language the user types in, your reply must ALWAYS be in ${langName} only.
- Do NOT use English unless ${langName} IS English.
- Do NOT mix languages. Every single word of your response must be in ${langName}.
- If the user types in English but the language is ${langName}, still reply fully in ${langName}.

Your expertise covers:
- Farming: crops, seeds, soil health, irrigation, pesticides, fertilizers, crop diseases, weather farming tips
- Health: common diseases, first aid, medicines, nutrition, maternal & child health, hygiene
- Government schemes: PM-KISAN, Ayushman Bharat, Ujjwala, PM Awas, Jan Dhan, MNREGA, and other central/state schemes
- Education: scholarships, vocational training, digital literacy
- Emergency contacts and nearby services

Additional rules:
1. Keep answers clear, practical, and easy to understand for a rural audience with limited literacy.
2. Use simple words. Avoid technical jargon.
3. If a question is outside your expertise, politely say so in ${langName} and suggest consulting a local expert or doctor.
4. Never give harmful medical advice. For serious medical concerns, always recommend seeing a doctor.
5. Be warm, respectful, and encouraging.
6. REMEMBER: Every word of every response must be in ${langName}. This is non-negotiable.`;

  const systemTurn = [
    { role: 'user', parts: [{ text: systemInstruction }] },
    { role: 'model', parts: [{ text: 'Understood. I will always respond only in ' + langName + ' and follow all guidelines.' }] },
  ];

  const contents = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  return {
    contents: [...systemTurn, ...contents],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const AIChatScreen: React.FC = () => {
  const { language } = useLanguage();
  const langCode = LANG_MAP[language as string] || 'en';
  const strings = UI_STRINGS[langCode] || UI_STRINGS.en;

  const STORAGE_KEY = 'aichat_history_' + langCode;

  const defaultMessages: Message[] = [
    {
      id: 'welcome',
      role: 'assistant',
      text: strings.welcome,
      timestamp: Date.now(),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const flatListRef = useRef<FlatList>(null);
  const isFocused = useIsFocused();

  // ── Load chat history ───────────────────────────────────────────────────────
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(saved => {
      if (saved) {
        try {
          const parsed: Message[] = JSON.parse(saved);
          if (parsed.length > 0) setMessages(parsed);
        } catch (_) {}
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langCode]);

  // ── Save chat history ───────────────────────────────────────────────────────
  useEffect(() => {
    if (messages.length > 0) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // ── Stop TTS when screen loses focus ───────────────────────────────────────
  useEffect(() => {
    if (!isFocused) {
      Tts.stop();
      setSpeakingId(null);
    }
  }, [isFocused]);

  // ── Stop TTS on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => { Tts.stop(); };
  }, []);

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const payload = buildGeminiPayload(updatedMessages, langCode);
      const geminiUrl = await getGeminiUrl();

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        await rotateKey();
        throw new Error('quota_exceeded');
      }

      if (!response.ok) {
        let errBody = '';
        try { errBody = await response.text(); } catch (_e) {}
        throw new Error('HTTP ' + response.status + ': ' + errBody);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error('Gemini error ' + data.error.code + ': ' + data.error.message);
      }

      const aiText: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || '...';

      const aiMsg: Message = {
        id: 'a_' + Date.now(),
        role: 'assistant',
        text: aiText.trim(),
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      if (err?.message === 'quota_exceeded') {
        Alert.alert(
          strings.errorTitle,
          'Daily limit reached. Switched to next key. Please try again.',
        );
      } else {
        Alert.alert(strings.errorTitle, strings.errorMsg + '\n\nDebug: ' + (err?.message ?? String(err)));
      }
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, langCode, strings]);

  // ── TTS — strip markdown before speaking ────────────────────────────────────
  const handleSpeak = (msg: Message) => {
    if (speakingId === msg.id) {
      Tts.stop();
      setSpeakingId(null);
    } else {
      Tts.stop();
      setSpeakingId(msg.id);
      Tts.setDefaultLanguage(langCode);
      Tts.setDefaultRate(0.55);
      Tts.setDefaultPitch(1.0);
      Tts.speak(stripMarkdownForTTS(msg.text)); // ← stripped, not raw text
      Tts.addEventListener('tts-finish', () => setSpeakingId(null));
    }
  };

  // ── Clear chat ──────────────────────────────────────────────────────────────
  const clearChat = () => {
    Tts.stop();
    setSpeakingId(null);
    const fresh: Message[] = [{
      id: 'welcome',
      role: 'assistant',
      text: strings.welcome,
      timestamp: Date.now(),
    }];
    setMessages(fresh);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  };

  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  // ── Render bubble ───────────────────────────────────────────────────────────
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    const isSpeaking = speakingId === item.id;

    return (
      <View style={[styles.bubbleRow, isUser ? styles.bubbleRowUser : styles.bubbleRowAI]}>
        {!isUser && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🤖</Text>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
          <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextAI]}>
            {item.text}
          </Text>
          {!isUser && (
            <TouchableOpacity
              style={styles.listenBtn}
              onPress={() => handleSpeak(item)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.listenBtnText}>
                {isSpeaking ? '⏹ Stop' : '🔊 Listen'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {isUser && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 24}>
      <StatusBar backgroundColor="#1a5c38" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.headerTitle}>{strings.title}</Text>
          <Text style={styles.headerSubtitle}>{strings.subtitle}</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={clearChat}>
          <Text style={styles.clearBtnText}>{strings.clearChat}</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      />

      {/* Typing indicator */}
      {loading && (
        <View style={styles.typingRow}>
          <ActivityIndicator size="small" color="#1a5c38" />
          <Text style={styles.typingText}>{strings.thinking}</Text>
        </View>
      )}

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder={strings.placeholder}
          placeholderTextColor="#aaa"
          multiline
          maxLength={500}
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
          onFocus={scrollToBottom}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!input.trim() || loading}>
          <Text style={styles.sendBtnText}>
            {loading ? '...' : strings.send}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  header: {
    backgroundColor: '#1a5c38',
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  headerTextGroup: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: 0.3 },
  headerSubtitle: { fontSize: 12, color: '#a8d5b5', marginTop: 2 },
  clearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a8d5b5',
  },
  clearBtnText: { color: '#a8d5b5', fontSize: 12, fontWeight: '600' },
  messageList: { paddingHorizontal: 12, paddingVertical: 12, paddingBottom: 8 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 4 },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowAI: { justifyContent: 'flex-start' },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#e8f5e9',
    alignItems: 'center', justifyContent: 'center', marginHorizontal: 4,
  },
  avatarText: { fontSize: 16 },
  bubble: { maxWidth: '75%', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10, elevation: 1 },
  bubbleUser: { backgroundColor: '#1a5c38', borderBottomRightRadius: 4 },
  bubbleAI: { backgroundColor: '#fff', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#e0e0e0' },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextUser: { color: '#fff' },
  bubbleTextAI: { color: '#222' },
  listenBtn: {
    marginTop: 8, alignSelf: 'flex-start',
    backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10,
  },
  listenBtnText: { fontSize: 12, color: '#1a5c38', fontWeight: '600' },
  typingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 6 },
  typingText: { marginLeft: 8, fontSize: 13, color: '#888', fontStyle: 'italic' },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd',
    paddingHorizontal: 12, paddingVertical: 8,
    paddingBottom: Platform.OS === 'android' ? 12 : 8,
  },
  textInput: {
    flex: 1, backgroundColor: '#f5f5f0', borderRadius: 20,
    borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 16,
    paddingVertical: 10, fontSize: 15, color: '#222', maxHeight: 120, marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#1a5c38', borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 11,
    justifyContent: 'center', alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#b0bfb8' },
  sendBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});

export default AIChatScreen;
