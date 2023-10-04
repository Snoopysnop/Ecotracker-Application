import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function SettingsScreen() {
    const Tab = createBottomTabNavigator();

    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
}