import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import { speak, stopSpeaking } from '../services/ttsService';
import type { OfficialLink } from '../data/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ContentDetail'>;
  route: RouteProp<RootStackParamList, 'ContentDetail'>;
};

const openLink = (url: string) => {
  Linking.openURL(url).catch(() => {});
};

const openPhone = (phone: string) => {
  Linking.openURL(`tel:${phone}`);
};

function ContentDetailScreen({ navigation, route }: Props): React.JSX.Element {
  const { title, icon, accentColor, fullContent, shortDescription, officialLinks } =
    route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const { language } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.5);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();

    return () => {
      stopSpeaking();
    };
  }, []);

  const handlePlayPress = () => {
    if (isPlaying) {
      stopSpeaking(() => setIsPlaying(false));
      return;
    }
    speak(
      fullContent,
      language,
      speechRate,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const handleWhatsAppShare = async () => {
    const message = `${icon} *${title}*\n\n${fullContent}\n\n_Shared via VoiceForAll_`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        await Share.share({ message });
      }
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const bg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1C1C1C' : '#FFFFFF';
  const textPrimary = isDarkMode ? '#F0F0F0' : '#1A1A1A';
  const textMuted = isDarkMode ? '#999999' : '#666666';
  const divider = isDarkMode ? '#2A2A2A' : '#EEEEEE';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: accentColor }]}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsAppShare}>
            <Text style={styles.whatsappText}>📤 Share</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerEmoji}>{icon}</Text>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{shortDescription}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* LISTEN CARD */}
          <View style={[styles.listenCard, { backgroundColor: cardBg }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.listenTitle, { color: textPrimary }]}>
                {isPlaying ? '🔊 Now speaking...' : '🔈 Listen in your language'}
              </Text>
              <Text style={[styles.listenSub, { color: textMuted }]}>
                {isPlaying ? 'Tap stop to pause' : 'Full audio playback'}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.playButton, { backgroundColor: accentColor }]}
              onPress={handlePlayPress}
            >
              <Text style={styles.playButtonText}>
                {isPlaying ? '⏹ Stop' : '▶ Listen'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* SPEED CONTROL */}
          <View style={styles.speedRow}>
            <Text style={{ color: textMuted, marginRight: 8 }}>Speed:</Text>
            <TouchableOpacity
              style={[styles.speedBtn, speechRate === 0.25 && { backgroundColor: accentColor }]}
              onPress={() => setSpeechRate(0.25)}
            >
              <Text style={styles.speedText}>Slow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.speedBtn, speechRate === 0.5 && { backgroundColor: accentColor }]}
              onPress={() => setSpeechRate(0.5)}
            >
              <Text style={styles.speedText}>Normal</Text>
            </TouchableOpacity>
          </View>

          {/* FULL CONTENT */}
          <View style={[styles.contentCard, { backgroundColor: cardBg }]}>
            <Text style={[styles.contentHeading, { color: textPrimary }]}>
              Full Information
            </Text>
            <Text style={[styles.contentText, { color: textPrimary }]}>
              {fullContent}
            </Text>
          </View>

          {/* OFFICIAL RESOURCES */}
          {officialLinks?.length > 0 && (
            <View style={styles.resourcesSection}>
              <Text style={[styles.resourcesTitle, { color: textPrimary }]}>
                📢 Official Resources
              </Text>
              {officialLinks.map((link: OfficialLink, index: number) => (
                <View key={index} style={[styles.resourceCard, { borderColor: divider }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.resourceName, { color: textPrimary }]}>
                      {link.name}
                    </Text>
                    {link.phone && (
                      <Text style={{ color: textMuted }}>📞 {link.phone}</Text>
                    )}
                    {link.url && (
                      <Text style={{ color: textMuted }}>🌐 {link.url}</Text>
                    )}
                  </View>
                  {link.phone && (
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
                      onPress={() => openPhone(link.phone!)}
                    >
                      <Text style={styles.actionText}>Call</Text>
                    </TouchableOpacity>
                  )}
                  {link.url && (
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#2196F3' }]}
                      onPress={() => openLink(link.url!)}
                    >
                      <Text style={styles.actionText}>Open</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ContentDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 14 : 8,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backArrow: { color: '#fff', fontSize: 22 },
  whatsappBtn: {
    backgroundColor: '#25D366',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  whatsappText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  headerEmoji: { fontSize: 34 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
  headerSubtitle: { color: '#ffffffcc', fontSize: 13 },
  scrollContent: { padding: 16 },
  listenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },
  listenTitle: { fontWeight: '600', fontSize: 15 },
  listenSub: { fontSize: 12, marginTop: 2 },
  playButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
  },
  playButtonText: { color: '#fff', fontWeight: '700' },
  speedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  speedBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
  },
  speedText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  contentCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },
  contentHeading: { fontWeight: '700', marginBottom: 6 },
  contentText: { lineHeight: 24, fontSize: 15 },
  resourcesSection: { marginTop: 10 },
  resourcesTitle: { fontWeight: '700', marginBottom: 8 },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  resourceName: { fontWeight: '600' },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 6,
  },
  actionText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
  