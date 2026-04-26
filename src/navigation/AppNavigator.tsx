import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import FarmingScreen from '../screens/FarmingScreen';
import HealthScreen from '../screens/HealthScreen';
import GovernmentScreen from '../screens/GovernmentScreen';
import EducationScreen from '../screens/EducationScreen';
import ContentDetailScreen from '../screens/ContentDetailScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import NearbyServicesScreen from '../screens/NearbyServicesScreen';
import SchemeCheckerScreen from '../screens/SchemeCheckerScreen';
import VoiceSearchScreen from '../screens/VoiceSearchScreen';
import AIChatScreen from '../screens/AIChatScreen';

import type { OfficialLink } from '../data/types';

export type ContentDetailParams = {
  topicId: string;
  title: string;
  icon: string;
  accentColor: string;
  fullContent: string;
  shortDescription: string;
  officialLinks: OfficialLink[];
};

export type RootStackParamList = {
  Home: undefined;
  Farming: undefined;
  Health: undefined;
  Government: undefined;
  Education: undefined;
  ContentDetail: ContentDetailParams;
  Emergency: undefined;
  NearbyServices: undefined;
  SchemeChecker: undefined;
  VoiceSearch: undefined;
  AIChat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Farming" component={FarmingScreen} />
      <Stack.Screen name="Health" component={HealthScreen} />
      <Stack.Screen name="Government" component={GovernmentScreen} />
      <Stack.Screen name="Education" component={EducationScreen} />
      <Stack.Screen name="ContentDetail" component={ContentDetailScreen} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
      <Stack.Screen name="NearbyServices" component={NearbyServicesScreen} />
      <Stack.Screen name="SchemeChecker" component={SchemeCheckerScreen} />
      <Stack.Screen name="VoiceSearch" component={VoiceSearchScreen} />
      <Stack.Screen
        name="AIChat"
        component={AIChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
