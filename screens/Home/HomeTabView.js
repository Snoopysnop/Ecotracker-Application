import * as React from 'react';
import { ScrollView, View, Text, useWindowDimensions } from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import ObservationImageList from '../../components/ObservationImageList';
import CampaignImageList from '../../components/CampaignImageList';
import NoResult from '../../components/NoResult';

export default function HomeTabView({ setFirstTab, campaigns, observations, navigation, route }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'observations', title: 'Observations' },
    { key: 'campaigns', title: 'Campaigns' },
  ]);

  const firstView = () => (
    observations.length ?
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 115 }}>
        <ObservationImageList observations={observations} navigation={navigation} route={route} />
      </ScrollView> :
      <View style={{ paddingBottom: 115 }}>
        <NoResult message='Observations' />
      </View>

  )

  const secondView = () => (
    campaigns.length ?
      <ScrollView showsVerticalScrollIndicator={false}>
        <CampaignImageList campaigns={campaigns} navigation={navigation} route={route} />
      </ScrollView> :
      <View style={{ paddingBottom: 115 }}>
        <NoResult message='Campaigns' />
      </View>
  )

  const renderScene = SceneMap({
    observations: firstView,
    campaigns: secondView,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#2E9A99' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: '#000' }}
      renderLabel={({ route, focused }) => (
        <View>
          {console.log(campaigns)}
          <Text style={{ color: '#2E9A99', textAlign: 'center', fontWeight: '600' }}>
            {route.title == 'Observations' ? (observations ? observations.length : 0) : (campaigns ? campaigns.length : 0)}
          </Text>
          <Text style={{ color: (focused ? '#000' : '#ccc'), textAlign: 'center' }}>
            {route.title.toUpperCase()}
          </Text>
        </View>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => {
        setIndex(index);
        setFirstTab(index == 0);
      }}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}