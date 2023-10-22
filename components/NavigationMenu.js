import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import AccountScreen from '../screens/AccountScreen';
import AddSightingScreen from '../screens/AddSightingScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CampaignScreen from '../screens/Explore/Campaign/CampaignScreen';
import ObservationScreen from '../screens/Explore/Observation/ObservationScreen';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
    <Pressable
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
            backgroundColor: '#2E9A99',
        }}>
            {children}
        </View>
    </Pressable>
);

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 60,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Image
                            source={require('../assets/icons/menuIcons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#2E9A99' : '#748c94',
                            }}
                        />
                    </View>
                )
            }} />

            <Tab.Screen name='Explore' component={ExploreScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Image
                            source={require('../assets/icons/menuIcons/map-point-pointer.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#2E9A99' : '#748c94',
                            }}
                        />
                    </View>
                )
            }} />

            <Tab.Screen name='Add Sighting' component={AddSightingScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../assets/icons/menuIcons/binoculars.png')}
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
                        style={{ alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Image
                            source={require('../assets/icons/menuIcons/setting.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#2E9A99' : '#748c94',
                            }}
                        />
                    </View>
                )
            }} />

            <Tab.Screen name='Account' component={AccountScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Image
                            source={require('../assets/icons/menuIcons/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#2E9A99' : '#748c94',
                            }}
                        />
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