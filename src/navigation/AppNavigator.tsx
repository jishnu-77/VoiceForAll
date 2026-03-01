import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FarmingScreen from '../screens/FarmingScreen';
import HealthScreen from '../screens/HealthScreen';
import GovernmentScreen from '../screens/GovernmentScreen';
import EducationScreen from '../screens/EducationScreen';

export type RootStackParamList = {
  Home: undefined;
  Farming: undefined;
  Health: undefined;
  Government: undefined;
  Education: undefined;
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
    </Stack.Navigator>
  );
}

export default AppNavigator;