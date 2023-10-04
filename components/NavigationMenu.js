import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

import AccountScreen from '../screens/AccountScreen';
import AddSightingScreen from '../screens/AddSightingScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#1f5678',
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                    >
                        <Image
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1f5678' : '#748c94',
                            }}
                        />
                        <Text style={{ color: focused ? '#1f5678' : '#748c94', fontSize: 12 }}>Home</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='Explore' component={ExploreScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                    >
                        <Image
                            source={require('../assets/icons/map-point-pointer.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1f5678' : '#748c94',
                            }}
                        />
                        <Text style={{ color: focused ? '#1f5678' : '#748c94', fontSize: 12 }}>Explore</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='Add Sighting' component={AddSightingScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../assets/icons/binoculars.png')}
                        resizeMethod='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: '#fff'
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }} />
            <Tab.Screen name='Settings' component={SettingsScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                    >
                        <Image
                            source={require('../assets/icons/setting.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1f5678' : '#748c94',
                            }}
                        />
                        <Text style={{ color: focused ? '#1f5678' : '#748c94', fontSize: 12 }}>Settings</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='Account' component={AccountScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}
                    >
                        <Image
                            source={require('../assets/icons/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#1f5678' : '#748c94',
                            }}
                        />
                        <Text style={{ color: focused ? '#1f5678' : '#748c94', fontSize: 12 }}>Account</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        ShadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});