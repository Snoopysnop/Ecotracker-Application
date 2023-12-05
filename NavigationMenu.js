import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import Account from './screens/Account/Account';
import AddSighting from './screens/AddSighting/AddSighting';
import ListExploreNavigation from './screens/Explore/ListExplore/ListExploreNavigation';
import MapExploreNavigation from './screens/Explore/MapExplore/MapExploreNavigation';
import SigthingAdded from './screens/AddSighting/SightingAdded';
import HomeNavigation from './screens/Home/HomeNavigation';


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

export default function Tabs({ route, navigation }) {
    // const navigation = useNavigation()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarButton: [
                    "SigthingAdded",
                ].includes(route.name)
                    ? () => {
                        return null;
                    }
                    : undefined,
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
            })}
        >
            <Tab.Screen name='HomeNavigation' component={HomeNavigation} initialParams={{ user: route.params?.user }} options={{
                unmountOnBlur: true,
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('./assets/icons/menuIcons/home.png')}
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

            <Tab.Screen name='ListExploreNavigation' component={ListExploreNavigation} initialParams={{ user: route.params?.user }} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('./assets/icons/menuIcons/list.png')}
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

            <Tab.Screen name='Add Sighting' component={AddSighting} initialParams={{ user: route.params?.user }} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ?
                            require('./assets/icons/menuIcons/plus.png') :
                            require('./assets/icons/menuIcons/binoculars.png')}
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

            <Tab.Screen name='MapExploreNavigation' component={MapExploreNavigation} initialParams={{ user: route.params?.user }} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('./assets/icons/menuIcons/map-point-pointer.png')}
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

            <Tab.Screen name='Account' component={Account} initialParams={{ user: route.params?.user }} options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('./assets/icons/menuIcons/user.png')}
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

            <Tab.Screen name='SigthingAdded' component={SigthingAdded} />
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