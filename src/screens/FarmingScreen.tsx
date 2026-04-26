// src/screens/FarmingScreen.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import { speak, stopSpeaking } from '../services/ttsService';
import { farmingTopics } from '../data/farmingData';
import { getTopics } from '../services/cacheService';
import { useIsFocused } from '@react-navigation/native';
import TopicCard from '../components/TopicCard';
import ScreenHeader from '../components/ScreenHeader';

const TOPIC_EMOJIS: Record<string, string> = {
  crop_cultivation: '🌱',
  pest_control:     '🐛',
  irrigation:       '💧',
  organic_farming:  '🌿',
  market_prices:    '💰',
  weather_forecast: '🌤️',
};

const LANG_MAP: Record<string, string> = {
  english: 'en', hindi: 'hi', malayalam: 'ml',
  marathi: 'mr', tamil: 'ta', telugu: 'te', bengali: 'bn',
};

type FarmingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Farming'>;
};

function FarmingScreen({ navigation }: FarmingScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, language } = useLanguage();
  const isFocused = useIsFocused();
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [allTopics, setAllTopics] = useState<any[]>(farmingTopics);
  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';

  useEffect(() => {
    const loadCachedTopics = async () => {
      try {
        const cached = await getTopics();
        if (!cached) return;
        const firestoreTopics = Object.values(cached).filter((t: any) => t.category === 'farming');
        if (firestoreTopics.length === 0) return;
        const converted = firestoreTopics.map((ft: any) => {
          const contentMap = Object.fromEntries(
            Object.keys(LANG_MAP).map(fullLang => {
              const shortKey = LANG_MAP[fullLang];
              const fullText = ft.content?.[shortKey] || ft.content?.en || '';
              return [fullLang, {
                title: ft.title?.[shortKey] || ft.title?.en || ft.id,
                shortDescription: fullText.length > 120 ? fullText.slice(0, 120) + '...' : fullText,
                fullContent: fullText,
              }];
            })
          );
          return {
            id: ft.id, color: '#4CAF50',
            icon: ft.icon || TOPIC_EMOJIS[ft.id] || '🌾',
            officialLinks: [
              ...(ft.website ? [{ name: 'Website', url: ft.website }] : []),
              ...(ft.helpline ? [{ name: 'Helpline', phone: ft.helpline }] : []),
            ],
            content: contentMap,
          };
        });

        // Only show topics that have content in the selected language
        const validTopics = converted.filter((topic: any) => {
  const shortKey = LANG_MAP[language];
  const ft = firestoreTopics.find((f: any) => f.id === topic.id);
  return ft?.content?.[shortKey] && ft?.title?.[shortKey];
});

        const localIds = farmingTopics.map(t => t.id);
        const newTopics = validTopics.filter((ft: any) => !localIds.includes(ft.id));
        setAllTopics([...farmingTopics, ...newTopics]);
      } catch (e) {
        console.error('FarmingScreen: failed to load cached topics', e);
      }
    };
    loadCachedTopics();
  }, [isFocused, language]);

  const handleCardTap = (topicId: string) => {
    const topic = allTopics.find(tp => tp.id === topicId);
    if (!topic) return;
    const content = topic.content[language] ?? topic.content['english'];
    stopSpeaking(); setSpeakingId(null);
    navigation.navigate('ContentDetail', {
      topicId, title: content.title, icon: topic.icon ?? '🌾',
      accentColor: topic.color, fullContent: content.fullContent,
      shortDescription: content.shortDescription, officialLinks: topic.officialLinks,
    });
  };

  const handlePlayPress = (topicId: string) => {
    const topic = allTopics.find(tp => tp.id === topicId);
    if (!topic) return;
    const content = topic.content[language] ?? topic.content['english'];
    if (speakingId === topicId) { stopSpeaking(() => setSpeakingId(null)); return; }
    speak(content.fullContent, language, 0.5, () => setSpeakingId(topicId), () => setSpeakingId(null));
  };

  useEffect(() => { return () => { stopSpeaking(); }; }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScreenHeader title={t.farming} subtitle={t.farmingDesc} emoji="🌾"
        accentColor="#4CAF50" backLabel={t.back} onBack={() => navigation.goBack()} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {allTopics.map((topic) => {
          const content = topic.content[language] ?? topic.content['english'];
          return (
            <TopicCard key={topic.id} id={topic.id} icon={topic.icon ?? '🌾'}
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

export default FarmingScreen;
