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
  Education: undefined;
};

type EducationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Education'>;
};

function EducationScreen({ navigation }: EducationScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = isDarkMode ? '#333' : '#E0E0E0';
  const infoBg = isDarkMode ? '#4A148C' : '#F3E5F5';
  const infoTextColor = isDarkMode ? '#E1BEE7' : '#7B1FA2';
  const iconBg = isDarkMode ? '#6A1B9A' : '#F3E5F5';

  const topics = [
    { id: 1, title: 'Basic Literacy', icon: '📖', description: 'Learn to read and write in your language' },
    { id: 2, title: 'Financial Literacy', icon: '💳', description: 'Banking, savings, and money management' },
    { id: 3, title: 'Digital Skills', icon: '💻', description: 'Using smartphone, internet, and apps' },
    { id: 4, title: 'Children Education', icon: '👶', description: 'School enrollment, homework help' },
    { id: 5, title: 'Adult Education Programs', icon: '👨‍🎓', description: 'Government literacy programs for adults' },
    { id: 6, title: 'Skill Development', icon: '🔧', description: 'Vocational training and skills' },
    { id: 7, title: 'Online Learning', icon: '📱', description: 'Free online courses and resources' },
    { id: 8, title: 'Career Guidance', icon: '🎯', description: 'Job opportunities and career paths' },
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
          <Text style={styles.headerIcon}>🎓</Text>
          <Text style={[styles.headerTitle, { color: textColor }]}>Education</Text>
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>
            Learning & Skill Development
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>

        {/* Info Box */}
        <View style={[styles.infoBox, { backgroundColor: infoBg }]}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={[styles.infoText, { color: infoTextColor }]}>
            Education is the key to progress. Learn at your own pace with voice-guided lessons!
          </Text>
        </View>

        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.topicCard, { backgroundColor: cardBackground }]}
            activeOpacity={0.7}
            onPress={() => {
              console.log(topic.title);
              // future: voice lessons & AI guidance
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
    color: '#9C27B0',
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
    color: '#9C27B0',
  },
});

export default EducationScreen;