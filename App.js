import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import Tabs from './NavigationMenu';
import React from 'react';

export default function App() {
  // TODO retrieve user with KeyCloak
  const user = {
    pseudo: 'Srall',
    userName: 'Jenny Hess',
    profilePicture: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
    creationDate: '2023-12-03T10:58:32.078Z',
  }

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  return (
    <NavigationContainer>
      <Tabs user={user}></Tabs>
    </NavigationContainer>
  );
}