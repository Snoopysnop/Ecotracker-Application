import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import Tabs from './NavigationMenu';

import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 5000);

  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
  );
}