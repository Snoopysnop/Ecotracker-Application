import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import Tabs from './components/NavigationMenu';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
  );
}