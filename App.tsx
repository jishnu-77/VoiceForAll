import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import FarmingScreen from './src/screens/FarmingScreen';
import HealthScreen from './src/screens/HealthScreen';
import GovernmentScreen from './src/screens/GovernmentScreen';
import EducationScreen from './src/screens/EducationScreen';

// (Add later)
// import HealthScreen from './src/screens/HealthScreen';
// import GovernmentScreen from './src/screens/GovernmentScreen';
// import EducationScreen from './src/screens/EducationScreen';

export type RootStackParamList = {
  Home: undefined;
  Farming: undefined;
  Health: undefined;
  Government: undefined;
  Education: undefined;
  // Health: undefined;
  // Government: undefined;
  // Education: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#1976D2"
      />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Farming" component={FarmingScreen} />
        <Stack.Screen name="Health" component={HealthScreen} />
        <Stack.Screen name="Government" component={GovernmentScreen} />
        <Stack.Screen name="Education" component={EducationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;