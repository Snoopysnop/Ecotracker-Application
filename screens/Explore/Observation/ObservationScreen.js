import React from 'react';
import { StyleSheet, ActivityIndicator, View, ScrollView, Text, Dimensions } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import CustomImageCarousal from '../../../components/Carousel/CustomImageCarousal';
import CustomTabView from './ObservationTabView';

const exempleComments = {
    "comment": [
        { "author": "TomTom", "date": "2023-11-04T12:04:54.977603876", "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { "author": "Anna", "date": "2023-10-05T12:04:54.977603876", "content": "Pellentesque faucibus id diam non lacinia." },
        { "author": "Reiner", "date": "2023-28-08T12:04:54.977603876", "content": "Aliquam vitae fermentum ex, in placerat lectus." }
    ]
}

export default function ObservationScreen({ observationData, navigation, route, ID }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [comments, setComments] = React.useState('');
    // const { observationn } = route.params?.observationData;

    const observationn = route.params?.observationData;

    const fetchComments = () => {
        fetch('https://path-to-server/comments/#' + ID)
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
            title: <NavigationTitle title={observationn.title} author={observationn.author} />,
        });

        setIsLoading(true);
        // fetchComments();

        setComments(exempleComments);
        setIsLoading(false);
    }, [])

    const width = Dimensions.get('window').width;

    const observationView = (
        <ScrollView style={styles.view}>
            <CustomImageCarousal data={observationn.imageList} autoPlay={false} pagination={true} />
            <CustomTabView observationData={observationn} comments={comments}/>
        </ScrollView>
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
        marginBottom : 115,
    },
    view: {
        margin: 20,
        marginBottom : 115,
    }
})