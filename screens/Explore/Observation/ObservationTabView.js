import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, useWindowDimensions, Image } from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import ViewMore from '../../../components/ViewMore';
import CommentSection from '../../../components/CommentSection/CommentSection';

export default function CustomTabView({ observation, comments }) {
  const layout = useWindowDimensions();

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

  const ThirdView = () => (
    <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
      <Text style={{
        marginBottom: 10,
        ...styles.title
      }}>Comments ({getCommentsLength(comments)})</Text>
      <CommentSection comments={comments} />
    </ScrollView>
  )

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        information: FirstView,
        map: SecondView,
        comment: ThirdView,
      })}
      onIndexChange={setIndex}
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
  comments.forEach(comment => {
    length += comment.replies?.length
  });
  return length + comments.length
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
  }
})