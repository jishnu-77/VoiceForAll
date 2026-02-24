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
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Farming: undefined;
  Health: undefined;
  Government: undefined;
  Education: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#B0B0B0' : '#424242';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#2196F3"
      />
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>VoiceForAll</Text>
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              सभी के लिए आवाज़
            </Text>
            <Text style={[styles.tagline, { color: subtitleColor }]}>
              Voice-Based Information for Everyone
            </Text>
          </View>

          {/* Category Cards */}
          <View style={styles.categoriesContainer}>

            {/* Farming */}
            <TouchableOpacity
              style={[styles.card, { backgroundColor: cardBackground }]}
              onPress={() => navigation.navigate('Farming')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.cardIcon}>🌾</Text>
              </View>
              <Text style={[styles.cardTitle, { color: textColor }]}>Farming</Text>
              <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                Agricultural tips & info
              </Text>
              <Text style={styles.tapHint}>Tap to explore →</Text>
            </TouchableOpacity>

            {/* Health */}
            <TouchableOpacity
              style={[styles.card, { backgroundColor: cardBackground }]}
              onPress={() => navigation.navigate('Health')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#2196F3' }]}>
                <Text style={styles.cardIcon}>🏥</Text>
              </View>
              <Text style={[styles.cardTitle, { color: textColor }]}>Health</Text>
              <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                Health & wellness advice
              </Text>
              <Text style={styles.tapHint}>Tap to explore →</Text>
            </TouchableOpacity>

            {/* Government */}
            <TouchableOpacity
              style={[styles.card, { backgroundColor: cardBackground }]}
              onPress={() => navigation.navigate('Government')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FF9800' }]}>
                <Text style={styles.cardIcon}>🏛️</Text>
              </View>
              <Text style={[styles.cardTitle, { color: textColor }]}>Government</Text>
              <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                Schemes & benefits
              </Text>
              <Text style={styles.tapHint}>Tap to explore →</Text>
            </TouchableOpacity>

            {/* Education */}
            <TouchableOpacity
              style={[styles.card, { backgroundColor: cardBackground }]}
              onPress={() => navigation.navigate('Education')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#9C27B0' }]}>
                <Text style={styles.cardIcon}>🎓</Text>
              </View>
              <Text style={[styles.cardTitle, { color: textColor }]}>Education</Text>
              <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                Learning resources
              </Text>
              <Text style={styles.tapHint}>Tap to explore →</Text>
            </TouchableOpacity>

          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Key Features
            </Text>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎤</Text>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Voice-Based Interface
                </Text>
                <Text style={[styles.featureDescription, { color: subtitleColor }]}>
                  No reading required - everything through voice
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌐</Text>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Multiple Languages
                </Text>
                <Text style={[styles.featureDescription, { color: subtitleColor }]}>
                  Hindi, Marathi, Tamil, Telugu & more
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Simple & Easy
                </Text>
                <Text style={[styles.featureDescription, { color: subtitleColor }]}>
                  Designed for everyone, no tech knowledge needed
                </Text>
              </View>
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusDot}>●</Text>
              <Text style={styles.statusText}>App Running Successfully</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: subtitleColor }]}>
              MCA Final Year Project
            </Text>
            <Text style={[styles.footerText, { color: subtitleColor }]}>
              Version 1.0.0
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  subtitle: { fontSize: 20, marginBottom: 8 },
  tagline: { fontSize: 14, fontStyle: 'italic', textAlign: 'center' },

  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  card: {
    width: '45%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: { fontSize: 35 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  cardSubtitle: { fontSize: 12, textAlign: 'center', marginBottom: 8 },
  tapHint: { fontSize: 11, color: '#2196F3', fontWeight: '500' },

  featuresSection: { paddingHorizontal: 20, marginTop: 30 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  featureIcon: { fontSize: 30, marginRight: 15 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', marginBottom: 3 },
  featureDescription: { fontSize: 14 },

  statusContainer: { alignItems: 'center', marginTop: 30 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  statusDot: { color: '#FFFFFF', fontSize: 12, marginRight: 8 },
  statusText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },

  footer: { alignItems: 'center', paddingVertical: 30, marginTop: 20 },
  footerText: { fontSize: 12, marginBottom: 5 },
});

export default HomeScreen;