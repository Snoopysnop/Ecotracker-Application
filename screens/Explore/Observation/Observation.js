import React from 'react';
import { StyleSheet, ActivityIndicator, View, ScrollView, Text, Dimensions } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import CustomImageCarousal from '../../../components/Carousel/CustomImageCarousal';
import CustomTabView from './ObservationTabView';

import { exampleComments } from '../../TemporaryData';

export default function Observation({ observationData, navigation, route, ID }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [comments, setComments] = React.useState('');
    // const { observationn } = route.params?.observationData;

    const observationn = route.params?.observationData;

    const fetchComments = () => {
        fetch('http://192.168.1.27:8080/comments/#' + ID)
            .then((response) => setComments(response.json()))
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
            headerTitle: () => <NavigationTitle title={observationn.title} author={observationn.author} />,
        });

        setIsLoading(true);
        // fetchComments();

        setComments(exampleComments);
        setIsLoading(false);
    }, [])

    const width = Dimensions.get('window').width;

    const observationView = (
        <View style={styles.view}>
            <CustomImageCarousal data={observationn.imageList} autoPlay={false} pagination={true} />
            <CustomTabView observation={observationn} comments={comments}/>
        </View>
    )

    return (
        <View style={{ height: '100%'}}>
                {isLoading ?
                    (<View style={styles.loading} >
                        <ActivityIndicator size="large" />
                    </View>) :
                    (error ?
                        // TODO make the error page look nice
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
        marginBottom : 100,
    },
    view: {
        margin: 20,
        marginBottom : 100,
        height: '100%',
    }
})