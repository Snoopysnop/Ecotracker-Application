import React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './NavigationMenu';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 5000);

  return (
    <NavigationContainer>
      <Stack.Navigator>
		<Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/>
		<Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
	</Stack.Navigator>
    </NavigationContainer>
  );
}