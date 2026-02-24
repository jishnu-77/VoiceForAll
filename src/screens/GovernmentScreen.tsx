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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Government: undefined;
};

type GovernmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Government'>;
};

function GovernmentScreen({ navigation }: GovernmentScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = isDarkMode ? '#333' : '#E0E0E0';
  const infoBg = isDarkMode ? '#0D47A1' : '#E3F2FD';
  const infoTextColor = isDarkMode ? '#BBDEFB' : '#1976D2';
  const iconBg = isDarkMode ? '#E65100' : '#FFF3E0';

  const topics = [
    { id: 1, title: 'PM-KISAN Scheme', icon: '💰', description: '₹6000/year for farmers - eligibility & application' },
    { id: 2, title: 'Ayushman Bharat', icon: '🏥', description: 'Free health coverage up to ₹5 lakh' },
    { id: 3, title: 'Ration Card', icon: '🌾', description: 'How to apply for ration card online' },
    { id: 4, title: 'Pension Schemes', icon: '👴', description: 'Old age, widow & disability pensions' },
    { id: 5, title: 'Aadhaar Services', icon: '🆔', description: 'Update Aadhaar, link with bank account' },
    { id: 6, title: 'Jan Dhan Account', icon: '🏦', description: 'Zero balance bank account benefits' },
    { id: 7, title: 'Pradhan Mantri Awas Yojana', icon: '🏠', description: 'Housing scheme for rural & urban poor' },
    { id: 8, title: 'Ujjwala Scheme', icon: '⛽', description: 'Free LPG connection for poor families' },
    { id: 9, title: 'Soil Health Card', icon: '🌱', description: 'Get your farm soil tested for free' },
    { id: 10, title: 'Scholarship Programs', icon: '🎓', description: 'Education scholarships for students' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>🏛️</Text>
          <Text style={[styles.headerTitle, { color: textColor }]}>Government</Text>
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>
            Government Schemes & Benefits
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>

        {/* Info Box */}
        <View style={[styles.infoBox, { backgroundColor: infoBg }]}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={[styles.infoText, { color: infoTextColor }]}>
            Tap any scheme to learn more about eligibility, documents needed, and how to apply
          </Text>
        </View>

        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.topicCard, { backgroundColor: cardBackground }]}
            activeOpacity={0.7}
            onPress={() => {
              console.log(topic.title);
              // future: voice guidance & eligibility explanation
            }}
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

            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    padding: 20,
    borderBottomWidth: 1,
  },

  backButton: { marginBottom: 15 },

  backButtonText: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: '500',
  },

  headerContent: { alignItems: 'center' },

  headerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  headerSubtitle: { fontSize: 14 },

  content: { flex: 1, padding: 15 },

  infoBox: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },

  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
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

  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },

  topicDescription: {
    fontSize: 13,
    lineHeight: 18,
  },

  arrow: {
    fontSize: 20,
    color: '#FF9800',
  },
});

export default GovernmentScreen;