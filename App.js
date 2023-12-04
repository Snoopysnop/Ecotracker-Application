import TestFetchServer from './TestFetchServer';
import TestPostServer from './TestPostServer';
import { View } from 'react-native';
import BetterTestPostServer from './BetterTestPostServer';

export default function App() {
  return (
    <View style={{ marginTop: 200 }}>
      {/* <TestFetchServer /> */}
      {/* <TestPostServer /> */}
      <BetterTestPostServer />
    </View>
  );
}