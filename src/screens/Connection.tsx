import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';

import {TabInfo} from '../components/tab-info';
import {DisconnectButton} from '../components/disconnect-button';
import {RootStackParamList, ScreenId} from '../navigation';

type ConnectionScreenRouteProp = RouteProp<RootStackParamList, ScreenId.Connection>;

export const ConnectionScreen: FC = () => {
  const route = useRoute<ConnectionScreenRouteProp>();

  return (
    <View style={styles.container}>
      <TabInfo peerId={route.params.peerId} />
      <DisconnectButton peerId={route.params.peerId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
