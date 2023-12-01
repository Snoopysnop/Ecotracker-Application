import { NavigationContainer } from '@react-navigation/native';

// import Tabs from './NavigationMenu';

import * as SplashScreen from 'expo-splash-screen';
import TestServer from './TestServer';

export default function App() {
 SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  return (
    // <NavigationContainer>
    //   <Tabs></Tabs>
    // </NavigationContainer>
    <TestServer/>
  );
}