import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Campaign from '../Campaign/Campaign';
import Observation from '../Observation/Observation';
import MapExplore from './MapExplore';

const Stack = createNativeStackNavigator();

export default function MapExploreNavigation({ navigation, route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MapExplore" component={MapExplore} initialParams={{ navigationParent: navigation }} />
            <Stack.Screen name="Observation" component={Observation} initialParams={{ observationData: {}, ID: 0, navigationParent: navigation }} />
            <Stack.Screen name="Campaign" component={Campaign} initialParams={{ navigationParent: navigation }} />
        </Stack.Navigator>
    );
}