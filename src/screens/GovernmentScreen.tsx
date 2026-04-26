import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import { speak, stopSpeaking } from '../services/ttsService';
import { governmentTopics } from '../data/governmentData';
import { getTopics } from '../services/cacheService';
import { useIsFocused } from '@react-navigation/native';
import TopicCard from '../components/TopicCard';
import ScreenHeader from '../components/ScreenHeader';

const TOPIC_EMOJIS: Record<string, string> = {
  pm_kisan: '💰', ayushman_bharat: '🏥', ration_card: '🌾',
  pension: '👴', aadhaar: '🆔', jan_dhan: '🏦',
  awas_yojana: '🏠', ujjwala: '⛽', soil_health: '🌱', scholarships: '🎓',
};

const LANG_MAP: Record<string, string> = {
  english: 'en', hindi: 'hi', malayalam: 'ml',
  marathi: 'mr', tamil: 'ta', telugu: 'te', bengali: 'bn',
};

type GovernmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Government'>;
};

function GovernmentScreen({ navigation }: GovernmentScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, language } = useLanguage();
  const isFocused = useIsFocused();
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [allTopics, setAllTopics] = useState<any[]>(governmentTopics);
  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';

  useEffect(() => {
    const loadCachedTopics = async () => {
      try {
        const cached = await getTopics();
        if (!cached) return;
        const firestoreTopics = Object.values(cached).filter((t: any) => t.category === 'government');
        if (firestoreTopics.length === 0) return;
        const converted = firestoreTopics.map((ft: any) => ({
          id: ft.id, color: '#FF9800',
          icon: ft.icon || TOPIC_EMOJIS[ft.id] || '🏛️',
          officialLinks: [
            ...(ft.website ? [{ name: 'Website', url: ft.website }] : []),
            ...(ft.helpline ? [{ name: 'Helpline', phone: ft.helpline }] : []),
          ],
          content: Object.fromEntries(
            Object.keys(LANG_MAP).map(fullLang => [fullLang, {
              title: ft.title?.[LANG_MAP[fullLang]] || ft.title?.en || ft.id,
              shortDescription: (ft.content?.[LANG_MAP[fullLang]] || ft.content?.en || '').slice(0, 100),
              fullContent: ft.content?.[LANG_MAP[fullLang]] || ft.content?.en || '',
            }])
          ),
        }));

        // Only show topics that have content in the selected language
        const validTopics = converted.filter((topic: any) => {
  const shortKey = LANG_MAP[language];
  const ft = firestoreTopics.find((f: any) => f.id === topic.id);
  return ft?.content?.[shortKey] && ft?.title?.[shortKey];
});

        const localIds = governmentTopics.map(t => t.id);
        const newTopics = validTopics.filter((ft: any) => !localIds.includes(ft.id));
        setAllTopics([...governmentTopics, ...newTopics]);
      } catch (e) {
        console.error('GovernmentScreen: failed to load cached topics', e);
      }
    };
    loadCachedTopics();
  }, [isFocused, language]);

  const handleCardTap = (topicId: string) => {
    const topic = allTopics.find(tp => tp.id === topicId);
    if (!topic) return;
    const content = topic.content[language] ?? topic.content.english;
    stopSpeaking(); setSpeakingId(null);
    navigation.navigate('ContentDetail', {
      topicId, title: content.title, icon: topic.icon ?? TOPIC_EMOJIS[topicId] ?? '🏛️',
      accentColor: topic.color, fullContent: content.fullContent,
      shortDescription: content.shortDescription, officialLinks: topic.officialLinks,
    });
  };

  const handlePlayPress = (topicId: string) => {
    const topic = allTopics.find(tp => tp.id === topicId);
    if (!topic) return;
    const content = topic.content[language] ?? topic.content.english;
    if (speakingId === topicId) { stopSpeaking(() => setSpeakingId(null)); return; }
    speak(content.fullContent, language, 0.5, () => setSpeakingId(topicId), () => setSpeakingId(null));
  };

  useEffect(() => { return () => { stopSpeaking(); }; }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScreenHeader title={t.government} subtitle={t.governmentDesc} emoji="🏛️"
        accentColor="#FF9800" backLabel={t.back} onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {allTopics.map((topic) => {
          const content = topic.content[language] ?? topic.content.english;
          return (
            <TopicCard key={topic.id} id={topic.id} icon={topic.icon ?? TOPIC_EMOJIS[topic.id] ?? '🏛️'}
              title={content.title} description={content.shortDescription}
              accentColor={topic.color} speakingId={speakingId}
              onPress={() => handleCardTap(topic.id)} onPlayPress={() => handlePlayPress(topic.id)} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 15 },
});

export default GovernmentScreen;
