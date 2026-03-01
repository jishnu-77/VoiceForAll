import Tts from 'react-native-tts';

// Language codes for Indian languages
export const TTS_LANGUAGE_CODES: Record<string, string> = {
  english:   'en-IN',
  hindi:     'hi-IN',
  malayalam: 'ml-IN',
  marathi:   'mr-IN',
  tamil:     'ta-IN',
  telugu:    'te-IN',
  bengali:   'bn-IN',
};

// Initialize TTS engine
export const initTTS = async (): Promise<void> => {
  try {
    await Tts.setDefaultRate(0.5);   // slower & rural-friendly
    await Tts.setDefaultPitch(1.0);
    await Tts.setDefaultLanguage('en-IN');
  } catch (error) {
    console.log('TTS init error:', error);
  }
};

// Speak text in selected language
export const speak = async (text: string, language: string): Promise<void> => {
  try {
    const langCode = TTS_LANGUAGE_CODES[language] || 'en-IN';

    console.log('=================================');
    console.log('SPEAK CALLED');
    console.log('Language:', language);
    console.log('LangCode:', langCode);
    console.log('Text:', text);
    console.log('=================================');

    Tts.stop();
    await Tts.setDefaultLanguage(langCode); // ← await added here
    Tts.speak(text);
  } catch (error) {
    console.log('TTS ERROR:', error);
  }
};

// Stop speaking manually
export const stopSpeaking = (): void => {
  try {
    Tts.stop();
  } catch (error) {
    console.log('TTS stop error:', error);
  }
};