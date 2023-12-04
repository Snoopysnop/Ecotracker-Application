import * as SplashScreen from 'expo-splash-screen';
import TestFetchServer from './TestFetchServer';
import TestPostServer from './TestPostServer';
import { View } from 'react-native';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  return (
    <View>
      {/* <TestFetchServer /> */}
      <TestPostServer />
    </View>
  );
}