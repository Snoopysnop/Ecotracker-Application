import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, useWindowDimensions, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MapView from 'react-native-maps';

import ViewMore from '../../../components/ViewMore';

export default function CustomTabView({ observationData, comments }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'information', title: 'Description' },
    { key: 'map', title: 'Localisation' },
    { key: 'comment', title: 'Comments' },
  ]);

  const date = new Date(observationData.creationDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
  const firstView = () => (
    <ScrollView>
      <Text style={styles.title}>Description</Text>
      <ViewMore description={observationData.description}></ViewMore>

      <Text style={styles.title}>Details</Text>
      <Text>Creation Date: {date}</Text>
      <Text>Group: {observationData.taxonomyGroup}</Text>
    </ScrollView>
  )

  const secondView = () => (
    <View>
      <Text style={styles.title}>Map</Text>
      {/* <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  )

  const thirdView = () => (
    <Text style={styles.title}>Comments ({comments.comment ? comments.comment.length : 0})</Text>
  )

  const renderScene = SceneMap({
    information: firstView,
    map: secondView,
    comment: thirdView,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#2E9A99' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ display: 'none' }}
      renderIcon={({ route, focused }) => (
        <Image
          source={require('../../../assets/icons/tabIcons/' + route.key + '.png')}
          resizeMode='contain'
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? '#2E9A99' : '#748c94',
          }}
        />
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 15,
    color: '#2E9A99',
  },
})