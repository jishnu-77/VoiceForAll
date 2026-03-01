import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import { speak, stopSpeaking } from '../services/ttsService';

type HealthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Health'>;
};

function HealthScreen({ navigation }: HealthScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, language } = useLanguage();
  const [speakingId, setSpeakingId] = React.useState<number | null>(null);

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = isDarkMode ? '#333' : '#E0E0E0';
  const iconBg = isDarkMode ? '#1565C0' : '#E3F2FD';

  const topics = [
    { id: 1, icon: '🦠', title: t.commonDiseases,  description: t.commonDiseasesDesc },
    { id: 2, icon: '🩹', title: t.firstAid,        description: t.firstAidDesc },
    { id: 3, icon: '🥗', title: t.nutrition,       description: t.nutritionDesc },
    { id: 4, icon: '🧠', title: t.mentalHealth,    description: t.mentalHealthDesc },
    { id: 5, icon: '💉', title: t.vaccination,     description: t.vaccinationDesc },
    { id: 6, icon: '🧼', title: t.hygiene,         description: t.hygieneDesc },
  ];

  const handlePress = async (topic: typeof topics[0]) => {
    if (speakingId === topic.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(topic.id);
    await speak(`${topic.title}. ${topic.description}`, language);
    setTimeout(() => setSpeakingId(null), 5000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity
          accessibilityLabel={t.back}
          accessibilityRole="button"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← {t.back}</Text>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>🏥</Text>
          <Text style={[styles.headerTitle, { color: textColor }]}>{t.health}</Text>
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>{t.healthDesc}</Text>
        </View>
      </View>

      {/* Topics */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            accessibilityLabel={topic.title}
            accessibilityRole="button"
            activeOpacity={0.75}
            style={[
              styles.topicCard,
              { backgroundColor: cardBackground },
              speakingId === topic.id && styles.playingCard,
            ]}
            onPress={() => handlePress(topic)}
          >
            <View style={[styles.topicIconContainer, { backgroundColor: iconBg }]}>
              <Text style={styles.topicIcon}>{topic.icon}</Text>
            </View>

            <View style={styles.topicContent}>
              <Text style={[styles.topicTitle, { color: textColor }]}>{topic.title}</Text>
              <Text style={[styles.topicDescription, { color: subtitleColor }]}>{topic.description}</Text>
            </View>

            {speakingId === topic.id ? (
              <Icon name="stop-circle" size={28} color="#F44336" accessible={false} />
            ) : (
              <Icon name="play-circle" size={28} color="#2196F3" accessible={false} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  backButton: { marginBottom: 15 },
  backButtonText: { fontSize: 16, color: '#2196F3', fontWeight: '500' },
  headerContent: { alignItems: 'center' },
  headerIcon: { fontSize: 50, marginBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  headerSubtitle: { fontSize: 14 },
  content: { flex: 1, padding: 15 },
  topicCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 12, padding: 15, marginBottom: 12, elevation: 2,
  },
  playingCard: { borderWidth: 2, borderColor: '#2196F3', elevation: 5 },
  topicIconContainer: {
    width: 50, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
  },
  topicIcon: { fontSize: 25 },
  topicContent: { flex: 1 },
  topicTitle: { fontSize: 16, fontWeight: '600', marginBottom: 3 },
  topicDescription: { fontSize: 13, lineHeight: 18 },
});

export default HealthScreen;