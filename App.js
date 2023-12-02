import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import Tabs from './NavigationMenu';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 5000);

  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
  );
}