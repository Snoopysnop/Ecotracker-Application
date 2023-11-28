import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import Tabs from './NavigationMenu';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
  );
}