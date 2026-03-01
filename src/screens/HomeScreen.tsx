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
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useLanguage();

  const [isLoading, setIsLoading] = React.useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

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
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* LOADING */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={[styles.loadingText, { color: textColor }]}>
                {t.loading}
              </Text>
            </View>
          )}

          {!isLoading && (
            <>
              {/* HEADER */}
              <View style={styles.header}>
                <Text style={styles.title}>{t.appName}</Text>

                <Text style={[styles.subtitle, { color: subtitleColor }]}>
                  {t.subtitle}
                </Text>

                <Text style={[styles.tagline, { color: subtitleColor }]}>
                  {t.tagline}
                </Text>

                {/* Language Selector */}
                <TouchableOpacity
                  style={styles.languageButton}
                  onPress={() => setShowLanguageSelector(true)}
                  accessibilityRole="button"
                  accessibilityLabel={t.selectLanguage}
                >
                  <Text style={styles.languageButtonText}>
                    🌐 {t.selectLanguage}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* CATEGORY CARDS */}
              <View style={styles.categoriesContainer}>

                {/* Farming */}
                <TouchableOpacity
                  accessibilityLabel={t.farming}
                  accessibilityRole="button"
                  accessibilityHint={t.tapToListen}
                  activeOpacity={0.85}
                  style={[styles.card, { backgroundColor: cardBackground }]}
                  onPress={() => navigation.navigate('Farming')}
                >
                  <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                    <Icon name="tractor" size={40} color="#FFF" />
                  </View>
                  <Text style={[styles.cardTitle, { color: textColor }]}>{t.farming}</Text>
                  <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                    {t.farmingDesc}
                  </Text>
                  <Text style={styles.tapHint}>{t.tapToListen}</Text>
                </TouchableOpacity>

                {/* Health */}
                <TouchableOpacity
                  accessibilityLabel={t.health}
                  accessibilityRole="button"
                  accessibilityHint={t.tapToListen}
                  activeOpacity={0.85}
                  style={[styles.card, { backgroundColor: cardBackground }]}
                  onPress={() => navigation.navigate('Health')}
                >
                  <View style={[styles.iconContainer, { backgroundColor: '#2196F3' }]}>
                    <Icon name="hospital-box" size={40} color="#FFF" />
                  </View>
                  <Text style={[styles.cardTitle, { color: textColor }]}>{t.health}</Text>
                  <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                    {t.healthDesc}
                  </Text>
                  <Text style={styles.tapHint}>{t.tapToListen}</Text>
                </TouchableOpacity>

                {/* Government */}
                <TouchableOpacity
                  accessibilityLabel={t.government}
                  accessibilityRole="button"
                  accessibilityHint={t.tapToListen}
                  activeOpacity={0.85}
                  style={[styles.card, { backgroundColor: cardBackground }]}
                  onPress={() => navigation.navigate('Government')}
                >
                  <View style={[styles.iconContainer, { backgroundColor: '#FF9800' }]}>
                    <Icon name="office-building" size={40} color="#FFF" />
                  </View>
                  <Text style={[styles.cardTitle, { color: textColor }]}>{t.government}</Text>
                  <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                    {t.governmentDesc}
                  </Text>
                  <Text style={styles.tapHint}>{t.tapToListen}</Text>
                </TouchableOpacity>

                {/* Education */}
                <TouchableOpacity
                  accessibilityLabel={t.education}
                  accessibilityRole="button"
                  accessibilityHint={t.tapToListen}
                  activeOpacity={0.85}
                  style={[styles.card, { backgroundColor: cardBackground }]}
                  onPress={() => navigation.navigate('Education')}
                >
                  <View style={[styles.iconContainer, { backgroundColor: '#9C27B0' }]}>
                    <Icon name="school" size={40} color="#FFF" />
                  </View>
                  <Text style={[styles.cardTitle, { color: textColor }]}>{t.education}</Text>
                  <Text style={[styles.cardSubtitle, { color: subtitleColor }]}>
                    {t.educationDesc}
                  </Text>
                  <Text style={styles.tapHint}>{t.tapToListen}</Text>
                </TouchableOpacity>

              </View>
            </>
          )}

        </ScrollView>
      </SafeAreaView>

      {/* LANGUAGE SELECTOR */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  loadingContainer: {
    paddingTop: 80,
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

  subtitle: {
    fontSize: 20,
    marginTop: 6,
  },

  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 6,
  },

  languageButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
  },

  languageButtonText: {
    color: '#2196F3',
    fontSize: 15,
    fontWeight: '600',
  },

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

  cardSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },

  tapHint: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '500',
  },
});