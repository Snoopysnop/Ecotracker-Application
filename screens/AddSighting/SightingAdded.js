import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import NavigationTitle from '../../components/NavigationTitle';

export default function SigthingAdded({ navigation, creation }) {
    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Observation Creation"} />,
        });
    }, [])

    return (
        (creation ?
            <View style={styles.view}>
                <Image style={styles.image} source={require('../../assets/icons/happy_bear.png')} />
                <Text style={styles.title}>Congratulation!</Text>
                <Text style={styles.subtitle}>Your observation was created successfully, you will see it shortly under “My Observations”</Text>
            </View> :
            <View style={styles.view}>
                <Image style={styles.image} source={require('../../assets/icons/sad_bear.png')} />
                <Text style={styles.title}>Oops!</Text>
                <Text style={styles.subtitle}>There was a problem creating your observation, please try again later</Text>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    view: {
        paddingBottom: 100,
        width: '100%',
        height: '100%',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
    },
    image: {
        height: 110,
        width: 110,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
    },
    subtitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '200',
        color: '#aaa',
        fontStyle: 'italic',
        maxWidth: 250,
    },
})