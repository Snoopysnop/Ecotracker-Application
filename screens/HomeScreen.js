import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function HomeScreen() {
    const Tab = createBottomTabNavigator();

    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}