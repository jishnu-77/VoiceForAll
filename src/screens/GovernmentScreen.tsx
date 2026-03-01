import React, { useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import { speak, stopSpeaking } from '../services/ttsService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type GovernmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Government'>;
};

function GovernmentScreen({ navigation }: GovernmentScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, language } = useLanguage();

  const [speakingId, setSpeakingId] = React.useState<number | null>(null);

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = isDarkMode ? '#333' : '#E0E0E0';
  const infoBg = isDarkMode ? '#0D47A1' : '#E3F2FD';
  const infoTextColor = isDarkMode ? '#BBDEFB' : '#1976D2';
  const iconBg = isDarkMode ? '#E65100' : '#FFF3E0';

  const topics = useMemo(() => [
    { id: 1, icon: '💰', title: t.pmKisan, description: t.pmKisanDesc },
    { id: 2, icon: '🏥', title: t.ayushmanBharat, description: t.ayushmanBharatDesc },
    { id: 3, icon: '🌾', title: t.rationCard, description: t.rationCardDesc },
    { id: 4, icon: '👴', title: t.pensionSchemes, description: t.pensionSchemesDesc },
    { id: 5, icon: '🆔', title: t.aadhaarServices, description: t.aadhaarServicesDesc },
    { id: 6, icon: '🏦', title: t.janDhan, description: t.janDhanDesc },
    { id: 7, icon: '🏠', title: t.awasYojana, description: t.awasYojanaDesc },
    { id: 8, icon: '⛽', title: t.ujjwalaScheme, description: t.ujjwalaSchemeDesc },
    { id: 9, icon: '🌱', title: t.soilHealthCard, description: t.soilHealthCardDesc },
    { id: 10, icon: '🎓', title: t.scholarships, description: t.scholarshipsDesc },
  ], [t]);

  const handlePress = async (topic: typeof topics[0]) => {
    if (speakingId === topic.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }

    stopSpeaking();
    setSpeakingId(topic.id);

    await speak(`${topic.title}. ${topic.description}`, language);

    setSpeakingId(null);
  };

  // stop speech when leaving screen
  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity
          accessibilityLabel={t.back}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← {t.back}</Text>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>🏛️</Text>
          <Text style={[styles.headerTitle, { color: textColor }]}>{t.government}</Text>
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>
            {t.governmentDesc}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Info Box */}
        <View style={[styles.infoBox, { backgroundColor: infoBg }]}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={[styles.infoText, { color: infoTextColor }]}>
            {t.schemeInfo}
          </Text>
        </View>

        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
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
              <Text style={[styles.topicTitle, { color: textColor }]}>
                {topic.title}
              </Text>
              <Text style={[styles.topicDescription, { color: subtitleColor }]}>
                {topic.description}
              </Text>
            </View>

            {speakingId === topic.id ? (
              <Icon name="stop-circle" size={28} color="#F44336" />
            ) : (
              <Icon name="play-circle" size={28} color="#4CAF50" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default GovernmentScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: { padding: 20, borderBottomWidth: 1 },
  backButton: { marginBottom: 15 },
  backButtonText: { fontSize: 16, color: '#FF9800', fontWeight: '500' },

  headerContent: { alignItems: 'center' },
  headerIcon: { fontSize: 50, marginBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  headerSubtitle: { fontSize: 14 },

  content: { flex: 1, padding: 15 },

  infoBox: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },

  infoIcon: { fontSize: 24, marginRight: 10 },
  infoText: { flex: 1, fontSize: 13, lineHeight: 18 },

  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  playingCard: {
    borderWidth: 2,
    borderColor: '#FF9800',
    elevation: 5,
  },

  topicIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  topicIcon: { fontSize: 25 },
  topicContent: { flex: 1 },

  topicTitle: { fontSize: 16, fontWeight: '600', marginBottom: 3 },
  topicDescription: { fontSize: 13, lineHeight: 18 },
});