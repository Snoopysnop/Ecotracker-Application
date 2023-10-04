import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function AccountScreen() {
    const Tab = createBottomTabNavigator();

    return (
        <View>
            <Text>Account</Text>
        </View>
    );
}