import React, { useEffect, useRef } from 'react';
import { StatusBar, useColorScheme, Alert, Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import { initTTS } from './src/services/ttsService';
import { syncTopics } from './src/services/syncService';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const hasSynced = useRef(false);

  useEffect(() => {
    initTTS();

    // 🔥 Crashlytics + Analytics
    crashlytics().setCrashlyticsCollectionEnabled(true);
    analytics().logAppOpen();

    // 🎛️ Remote Config
    const setupRemoteConfig = async () => {
      try {
        await remoteConfig().setDefaults({
          ai_chat_enabled: true,
          gemini_api_key_1: 'AIzaSyD_dIQlvIHFWGGtTHT8y1yEySVvHDUUia4',
          gemini_api_key_2: 'AIzaSyAIOUxiXXXT1vVm7MdFxnlM4D7iUDjDQ6E',
          app_min_version: '1.0',
        });
        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: 3600000,
        });
        await remoteConfig().fetchAndActivate();
        console.log('Remote Config fetched ✅');
      } catch (error) {
        console.log('Remote Config fetch failed, using defaults', error);
      }
    };

    // 🔔 Push Notifications
    const setupNotifications = async () => {
      try {
        // Request permission (Android 13+)
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          console.log('Notification permission:', granted);
        } else {
          console.log('Android version:', Platform.Version, '— no explicit permission needed');
        }

        // Check if messaging is available
        const authStatus = await messaging().requestPermission();
        console.log('FCM auth status:', authStatus);

        // Get FCM token
        const token = await messaging().getToken();
        setTimeout(() => {
          console.log('FCM Token:', token);
        }, 3000);

        // Handle notification when app is in FOREGROUND
        const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
          console.log('Foreground notification received!', remoteMessage);
          Alert.alert(
            remoteMessage.notification?.title || 'VoiceForAll',
            remoteMessage.notification?.body || '',
          );
        });

        // Handle notification when app opened FROM BACKGROUND via notification tap
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log('Notification opened app:', remoteMessage.notification);
        });

        // Handle notification when app was QUIT and opened via notification
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log('App opened from quit state:', remoteMessage.notification);
            }
          });

        return unsubscribeForeground;
      } catch (error) {
        console.log('Notification setup failed', error);
        return () => {};
      }
    };

    setupRemoteConfig();
    let unsubscribeNotifications: (() => void) | undefined;
    setupNotifications().then(unsub => {
      unsubscribeNotifications = unsub;
    });

    const runSync = async () => {
      try {
        const updated = await syncTopics();
        if (updated) {
          console.log('App: Firebase sync complete — cache updated');
        } else {
          console.log('App: No updates or offline — using local/cached data');
        }
      } catch (error) {
        crashlytics().recordError(error as Error);
        console.error('App: sync failed silently', error);
      }
    };

    if (!hasSynced.current) {
      hasSynced.current = true;
      setTimeout(runSync, 1500);
    }

    const interval = setInterval(() => {
      runSync();
    }, 30000);

    return () => {
      clearInterval(interval);
      if (unsubscribeNotifications) unsubscribeNotifications();
    };

  }, []);

  return (
    <LanguageProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#1976D2"
        />
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}

export default App;