import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function AddSightingScreen() {
    const Tab = createBottomTabNavigator();

    return (
        <View>
            <Text>AddSighting</Text>
        </View>
    );
}