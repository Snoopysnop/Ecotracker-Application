import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Campaign from '../Explore/Campaign/Campaign';
import Observation from '../Explore/Observation/Observation';
import Home from './Home';

const Stack = createNativeStackNavigator();

export default function HomeNavigation({ navigation, route }) {
    const user = route.params?.user;

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} initialParams={{ navigationParent: navigation, user: user }} />
            <Stack.Screen name="Observation" component={Observation} initialParams={{ observationData: {}, id: 0, navigationParent: navigation, user: user }} />
            <Stack.Screen name="Campaign" component={Campaign} initialParams={{ navigationParent: navigation, user: user }} />
        </Stack.Navigator>
    );
}