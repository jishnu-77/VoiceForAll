import Tts from 'react-native-tts';

export const TTS_LANGUAGE_CODES: Record<string, string> = {
  english:   'en-IN',
  hindi:     'hi-IN',
  malayalam: 'ml-IN',
  marathi:   'mr-IN',
  tamil:     'ta-IN',
  telugu:    'te-IN',
  bengali:   'bn-IN',
};

let isSpeaking = false;
let finishCallback: (() => void) | undefined;
let listenersInitialized = false;

// ── KEY FIX: track whether stop was manual ────────────────────────────────────
// When stopSpeaking() is called manually, we set this flag so the tts-cancel
// event does NOT fire finishCallback (which would trigger the next scene).
let manualStop = false;

export const initTTS = async (): Promise<void> => {
  try {
    await Tts.setDefaultRate(0.6, true);
    await Tts.setDefaultPitch(1.0);
    await Tts.setDefaultLanguage('en-IN');

    if (!listenersInitialized) {
      listenersInitialized = true;

      Tts.addEventListener('tts-finish', () => {
        isSpeaking = false;
        // Only fire callback if this was a natural finish (not a manual stop)
        if (!manualStop && finishCallback) {
          finishCallback();
        }
        manualStop = false;
      });

      Tts.addEventListener('tts-cancel', () => {
        isSpeaking = false;
        // Never fire callback on cancel — cancel always means manual stop
        // or screen unmount. Either way we don't want to advance scenes.
        manualStop = false;
        // Do NOT call finishCallback here
      });

      Tts.addEventListener('tts-error', () => {
        isSpeaking = false;
        manualStop = false;
      });
    }
  } catch (error) {
    console.log('TTS init error:', error);
  }
};

export const speak = async (
  text: string,
  language: string,
  rate: number = 0.6,
  onStart?: () => void,
  onFinish?: () => void
): Promise<void> => {
  try {
    const langCode = TTS_LANGUAGE_CODES[language] || 'en-IN';

    // Reset manual stop flag before new speak
    manualStop = false;
    finishCallback = onFinish;

    // Stop any existing speech first (this is an internal stop, not manual)
    // so we set manualStop = false after to allow the new speak to work
    await Tts.stop();

    await Tts.setDefaultLanguage(langCode);
    await Tts.setDefaultRate(rate, false);

    isSpeaking = true;
    onStart?.();

    Tts.speak(text);
  } catch (error) {
    console.log('TTS ERROR:', error);
  }
};

export const stopSpeaking = async (onStop?: () => void): Promise<void> => {
  try {
    // ── KEY FIX: set manualStop BEFORE calling Tts.stop() ────────────────────
    // This ensures the tts-cancel event sees manualStop = true and does NOT
    // fire finishCallback, which would advance to the next scene.
    manualStop = true;
    finishCallback = undefined; // Clear callback so it can never fire

    await Tts.stop();
    isSpeaking = false;
    onStop?.();
  } catch (error) {
    console.log('TTS stop error:', error);
    manualStop = false;
  }
};

export const getSpeakingStatus = () => isSpeaking;