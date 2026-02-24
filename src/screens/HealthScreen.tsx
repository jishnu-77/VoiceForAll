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
  Health: undefined;
};

type HealthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Health'>;
};

function HealthScreen({ navigation }: HealthScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = isDarkMode ? '#333' : '#E0E0E0';
  const iconBg = isDarkMode ? '#1565C0' : '#E3F2FD';

  const topics = [
    { id: 1, title: 'Common Diseases', icon: '🦠', description: 'Symptoms and prevention' },
    { id: 2, title: 'First Aid', icon: '🩹', description: 'Emergency medical help' },
    { id: 3, title: 'Nutrition', icon: '🥗', description: 'Healthy eating habits' },
    { id: 4, title: 'Mental Health', icon: '🧠', description: 'Well-being and stress management' },
    { id: 5, title: 'Vaccination', icon: '💉', description: 'Immunization schedules' },
    { id: 6, title: 'Hygiene', icon: '🧼', description: 'Sanitation and cleanliness' },
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
          <Text style={styles.headerIcon}>🏥</Text>
          <Text style={[styles.headerTitle, { color: textColor }]}>Health</Text>
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>
            Health & Wellness Information
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.topicCard, { backgroundColor: cardBackground }]}
            activeOpacity={0.7}
            onPress={() => {
              console.log(topic.title);
              // future: voice playback / health tips
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
  container: {
    flex: 1,
  },

  header: {
    padding: 20,
    borderBottomWidth: 1,
  },

  backButton: {
    marginBottom: 15,
  },

  backButtonText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },

  headerContent: {
    alignItems: 'center',
  },

  headerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  headerSubtitle: {
    fontSize: 14,
  },

  content: {
    flex: 1,
    padding: 15,
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

  topicIcon: {
    fontSize: 25,
  },

  topicContent: {
    flex: 1,
  },

  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },

  topicDescription: {
    fontSize: 13,
  },

  arrow: {
    fontSize: 20,
    color: '#2196F3',
  },
});

export default HealthScreen;