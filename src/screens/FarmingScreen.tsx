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
  Farming: undefined;
};

type FarmingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Farming'>;
};

function FarmingScreen({ navigation }: FarmingScreenProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#121212' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = isDarkMode ? '#333' : '#E0E0E0';
  const iconBg = isDarkMode ? '#2E7D32' : '#E8F5E9';

  const topics = [
    { id: 1, title: 'Crop Cultivation', icon: '🌱', description: 'Best practices for growing crops' },
    { id: 2, title: 'Pest Control', icon: '🐛', description: 'Organic pest management techniques' },
    { id: 3, title: 'Irrigation', icon: '💧', description: 'Water management and irrigation tips' },
    { id: 4, title: 'Fertilizers', icon: '🌿', description: 'Choosing the right fertilizers' },
    { id: 5, title: 'Market Prices', icon: '💰', description: 'Current market rates and trends' },
    { id: 6, title: 'Weather Updates', icon: '🌤️', description: 'Weather forecasts for farming' },
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
          <Text style={styles.headerIcon}>🌾</Text>
          <Text style={[styles.headerTitle, { color: textColor }]}>Farming</Text>
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>
            Agricultural Information
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
              // future: trigger voice playback here
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

export default FarmingScreen;