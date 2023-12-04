import React from 'react';
import { StyleSheet, ActivityIndicator, View, ScrollView, Text, Dimensions } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import CustomImageCarousal from '../../../components/Carousel/CustomImageCarousal';
import CustomTabView from './ObservationTabView';

import { exampleComments } from '../../TemporaryData';

import { ipAddress } from '../../../config';


export default function Observation({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    const observation = route.params?.observationData;

    const fetchComments = () => {
        fetch('http://' + ipAddress + ':8080/observation/' + route.params?.id + '/comments')
            .then((response) => response.json())
            .then(json => {
                setComments(json);
                setError(false);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => setIsLoading(false));
    }

    React.useEffect(() => {
        route.params?.navigationParent.setOptions({
            headerShown: false,
        });

        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={observation.title} author={observation.author} />,
        });

        setIsLoading(true);
        fetchComments();

        // TODO remove when fetching works
        // setComments(exampleComments);
        // setIsLoading(false);
    }, [])

    const width = Dimensions.get('window').width;

    const observationView = (
        <View style={styles.view}>
            <CustomImageCarousal data={observation.imageList} autoPlay={false} pagination={true} />
            <CustomTabView observation={observation} comments={error ? [] : comments} route={route} />
        </View>
    )

    return (
        <View style={{ height: '100%' }}>
            {isLoading ?
                (<View style={styles.loading} >
                    <ActivityIndicator size="large" />
                </View>) :
                (error ?
                    <Text>Sorry, a problem occured. Please try again later.</Text> :
                    observationView
                )
            }
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