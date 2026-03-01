import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import { initTTS } from './src/services/ttsService';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // 🔊 Initialize Text-to-Speech when app starts
  useEffect(() => {
    initTTS();
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