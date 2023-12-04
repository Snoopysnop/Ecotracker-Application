import React from 'react';
import { StyleSheet, ActivityIndicator, View, ScrollView, Text, Dimensions } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import CustomImageCarousal from '../../../components/Carousel/CustomImageCarousal';
import CustomTabView from './ObservationTabView';


export default function Observation({ navigation, route }) {
    const observation = route.params?.observationData;

    React.useEffect(() => {
        route.params?.navigationParent.setOptions({
            headerShown: false,
        });

        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={observation.title} author={observation.author} />,
        });
    }, [])

    const width = Dimensions.get('window').width;

    return (
        <View style={{ height: '100%' }}>
            <View style={styles.view}>
                <CustomImageCarousal data={observation.imageList} autoPlay={false} pagination={true} />
                <CustomTabView observation={observation} route={route} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        marginBottom: 100,
    },
    view: {
        margin: 20,
        marginBottom: 100,
        height: '100%',
    }
})