import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UI_STRINGS, type Language, type UIStrings } from '../utils/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: UIStrings;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  t: UI_STRINGS.english,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('english');

  // Load saved language on app start
  useEffect(() => {
    AsyncStorage.getItem('selectedLanguage').then(saved => {
      if (saved) setLanguageState(saved as Language);
    });
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem('selectedLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: UI_STRINGS[language],
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);