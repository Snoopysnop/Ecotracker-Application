import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function ExploreScreen() {
    const Tab = createBottomTabNavigator();

    return (
        <View>
            <Text>Explore</Text>
        </View>
    );
}