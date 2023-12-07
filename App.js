import React from 'react';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './NavigationMenu';

import LoginScreen from './screens/LoginScreen';
import Register from './screens/Home/Register';


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator();


export default function App() {

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  return (
    <NavigationContainer>
      <Stack.Navigator>
		<Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/>
		<Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs}/>
    <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
	</Stack.Navigator>
    </NavigationContainer>
  );
}