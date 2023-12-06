import * as React from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, View, Text, useWindowDimensions, Image } from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import ViewMore from '../../../components/ViewMore';
import CommentSection from '../../../components/CommentSection/CommentSection';
import { ipAddress } from '../../../config';

export default function CustomTabView({ observation, route, setCommentTab }) {
  const layout = useWindowDimensions();

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'information',
      title: 'Description',
      imageSource: require('../../../assets/icons/tabIcons/information.png')
    },
    {
      key: 'map',
      title: 'Localisation',
      imageSource: require('../../../assets/icons/tabIcons/map.png')
    },
    {
      key: 'comment',
      title: 'Comments',
      imageSource: require('../../../assets/icons/tabIcons/comment.png')
    },
  ]);

  const fetchComments = () => {
    fetch('http://' + ipAddress + ':8080/observation/' + observation.id + '/comments')
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
    setIsLoading(true);
    fetchComments();
  }, [reload])

  const date = new Date(observation.creationDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
  const FirstView = () => (
    <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Description</Text>
      <ViewMore description={observation.description}></ViewMore>

      <Text style={styles.title}>Details</Text>
      <Text>Creation Date: {date}</Text>
      <Text>Group: {observation.taxonomyGroup}</Text>
    </ScrollView>
  )

  const SecondView = () => (
    <View style={styles.view}>
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: observation.location.latitude,
          longitude: observation.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: observation.location.latitude,
            longitude: observation.location.longitude,
          }}
          title={observation.title}
          description={observation.author}
        />
      </MapView>
    </View>
  )

  let ThirdView = () => (
    isLoading ?
      (<View style={styles.loading} >
        <ActivityIndicator size="large" />
      </View >) :
      (error ?
        <Text>Sorry, a problem occured. Please try again later.</Text> :
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
          <Text style={{
            marginBottom: 10,
            ...styles.title
          }}>Comments ({comments ? getCommentsLength(comments) : 0})</Text>
          <CommentSection
            comments={comments}
            route={route}
            reload={reload}
            setReload={setReload}
            observationID={observation.id}
          />
        </ScrollView>
      )
  )

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        information: FirstView,
        map: SecondView,
        comment: ThirdView,
      })}
      onIndexChange={(index) => {
        index==2?setCommentTab(true):setCommentTab(false);
        setIndex(index);
      }}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#2E9A99' }}
          style={{ backgroundColor: 'white' }}
          labelStyle={{ display: 'none' }}
          renderIcon={({ route, focused }) => (
            <Image
              source={route.imageSource}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#2E9A99' : '#748c94',
              }}
            />
          )}
        />
      )}
    />
  );
}

const getCommentsLength = (comments) => {
  let length = 0
  comments?.forEach(comment => {
    length += comment.replies?.length
  });
  return length + comments?.length
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    color: '#2E9A99',
  },
  view: {
    marginBottom: 115,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    marginBottom: 100,
  },
})