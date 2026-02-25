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
  ActivityIndicator,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  // ✅ Loading state
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#B0B0B0' : '#424242';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';

  // ✅ Loading Screen
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={[styles.loadingText, { color: textColor }]}>
            Loading VoiceForAll...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#2196F3"
      />

      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ScrollView>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>VoiceForAll</Text>
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              सभी के लिए आवाज़
            </Text>
            <Text style={[styles.tagline, { color: subtitleColor }]}>
              Voice-Based Information for Everyone
            </Text>
          </View>

          {/* CATEGORY CARDS */}
          <View style={styles.categoriesContainer}>

            {/* Farming */}
            <TouchableOpacity
              style={[styles.card, { backgroundColor: cardBackground }]}
              onPress={() => navigation.navigate('Farming')}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                <Icon name="tractor" size={40} color="#FFF" />
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
            >
              <View style={[styles.iconContainer, { backgroundColor: '#2196F3' }]}>
                <Icon name="hospital-box" size={40} color="#FFF" />
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
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FF9800' }]}>
                <Icon name="office-building" size={40} color="#FFF" />
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
            >
              <View style={[styles.iconContainer, { backgroundColor: '#9C27B0' }]}>
                <Icon name="school" size={40} color="#FFF" />
              </View>
              <Text style={[styles.cardTitle, { color: textColor }]}>Education</Text>
              <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                Learning resources
              </Text>
              <Text style={styles.tapHint}>Tap to explore →</Text>
            </TouchableOpacity>

          </View>

          {/* FEATURES */}
          <View style={styles.featuresSection}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Key Features
            </Text>

            <View style={styles.featureItem}>
              <Icon name="microphone" size={28} color="#2196F3" style={styles.featureIcon}/>
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
              <Icon name="web" size={28} color="#4CAF50" style={styles.featureIcon}/>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Multiple Languages
                </Text>
                <Text style={[styles.featureDescription, { color: subtitleColor }]}>
                  Hindi, Marathi, Tamil & more
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Icon name="cellphone-check" size={28} color="#FF9800" style={styles.featureIcon}/>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Simple & Easy
                </Text>
                <Text style={[styles.featureDescription, { color: subtitleColor }]}>
                  Designed for everyone
                </Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },

  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  subtitle: { fontSize: 20, marginTop: 6 },
  tagline: { fontSize: 14, fontStyle: 'italic', marginTop: 6 },

  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  card: {
    width: '45%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSubtitle: { fontSize: 12, textAlign: 'center', marginBottom: 8 },
  tapHint: { fontSize: 11, color: '#2196F3', fontWeight: '500' },

  featuresSection: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },

  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  featureIcon: { marginRight: 15 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600' },
  featureDescription: { fontSize: 14 },
});

export default HomeScreen;