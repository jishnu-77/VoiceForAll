import AsyncStorage from '@react-native-async-storage/async-storage';

const TOPICS_KEY = 'voiceforall_topics';
const LAST_SYNC_KEY = 'voiceforall_last_sync';

// Save topics as a map keyed by topic id
export const saveTopics = async (topics: Record<string, any>): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  } catch (error) {
    console.error('cacheService: saveTopics error', error);
  }
};

// Get all cached topics
export const getTopics = async (): Promise<Record<string, any> | null> => {
  try {
    const data = await AsyncStorage.getItem(TOPICS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('cacheService: getTopics error', error);
    return null;
  }
};

// Get last sync timestamp
export const getLastSyncTime = async (): Promise<number> => {
  try {
    const val = await AsyncStorage.getItem(LAST_SYNC_KEY);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
};

// Set last sync timestamp
export const setLastSyncTime = async (timestamp: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(LAST_SYNC_KEY, timestamp.toString());
  } catch (error) {
    console.error('cacheService: setLastSyncTime error', error);
  }
};