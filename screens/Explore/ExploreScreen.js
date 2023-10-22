import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CampaignScreen from './Campaign/CampaignScreen';
import ObservationScreen from './Observation/ObservationScreen';
import ExploreAllScreen from './ExploreAllScreen';

const Stack = createNativeStackNavigator();

export default function ExploreScreen({ navigation, route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ExploreScreen" component={ExploreAllScreen} initialParams={{ navigationParent: navigation }} />
            <Stack.Screen name="ObservationScreen" component={ObservationScreen} initialParams={{ observationData: {}, ID: 0, navigationParent: navigation }} />
            <Stack.Screen name="CampaignScreen" component={CampaignScreen} initialParams={{ navigationParent: navigation }} />
        </Stack.Navigator>
    );
}