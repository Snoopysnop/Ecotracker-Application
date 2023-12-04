import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './NavigationMenu';
import React from 'react';

import LoginScreen from './screens/LoginScreen';
import Register from './screens/Home/Register';

const Stack = createNativeStackNavigator();


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

      <Stack.Navigator>
		<Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/>
		<Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
    <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
	</Stack.Navigator>
      <Tabs user={user}></Tabs>
    </NavigationContainer>
  );
}