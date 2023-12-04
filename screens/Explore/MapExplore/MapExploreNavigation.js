import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Campaign from '../Campaign/Campaign';
import Observation from '../Observation/Observation';
import MapExplore from './MapExplore';

const Stack = createNativeStackNavigator();

export default function MapExploreNavigation({ navigation, route }) {
    const user = route.params?.user;

    return (
        <Stack.Navigator>
            <Stack.Screen name="MapExplore" component={MapExplore} initialParams={{ navigationParent: navigation, user: user }} />
            <Stack.Screen name="Observation" component={Observation} initialParams={{ observationData: {}, id: 0, navigationParent: navigation, user: user }} />
            <Stack.Screen name="Campaign" component={Campaign} initialParams={{ navigationParent: navigation, user: user }} />
        </Stack.Navigator>
    );
}