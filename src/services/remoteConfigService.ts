import remoteConfig from '@react-native-firebase/remote-config';

export const isAIChatEnabled = (): boolean => {
  return remoteConfig().getBoolean('ai_chat_enabled');
};

export const getGeminiApiKey1 = (): string => {
  return remoteConfig().getString('gemini_api_key_1');
};

export const getGeminiApiKey2 = (): string => {
  return remoteConfig().getString('gemini_api_key_2');
};

export const getMinVersion = (): string => {
  return remoteConfig().getString('app_min_version');
};