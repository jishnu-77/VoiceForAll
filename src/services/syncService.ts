import NetInfo from '@react-native-community/netinfo';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';

import {
  getTopics,
  saveTopics,
  setLastSyncTime,
} from './cacheService';

export const syncTopics = async (): Promise<Record<string, any> | null> => {

  try {

    const netState = await NetInfo.fetch();

    if (!netState.isConnected) {
      console.log('syncService: offline — skipping sync');
      return null;
    }

    console.log('syncService: fetching topics from Firestore');

    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'topics'));

    const firestoreTopics: Record<string, any> = {};

    snapshot.docs.forEach((doc: any) => {
      firestoreTopics[doc.id] = {
        id: doc.id,
        ...doc.data(),
      };
    });

    const cachedTopics = (await getTopics()) || {};

    const firestoreIds = Object.keys(firestoreTopics);
    const cachedIds = Object.keys(cachedTopics);

    const changed =
      firestoreIds.length !== cachedIds.length ||
      firestoreIds.some(id => {
        const ft = firestoreTopics[id];
        const ct = cachedTopics[id];
        return !ct || (ft.updatedAt || 0) !== (ct?.updatedAt || 0);
      });

    if (!changed) {
      console.log('syncService: no updates');
      return null;
    }

    // Replace entire cache (handles deletions automatically)
    await saveTopics(firestoreTopics);

    await setLastSyncTime(Math.floor(Date.now() / 1000));

    console.log(`syncService: synced ${firestoreIds.length} topics`);

    return firestoreTopics;

  } catch (error) {

    console.error('syncService: sync error', error);
    return null;

  }

};