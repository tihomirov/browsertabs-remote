import {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Action} from 'browsertabs-remote-common/src/common';

import {TabInfo} from '../components/tab-info';
import {ActionList} from '../components/action-list';
import {DisconnectButton} from '../components/disconnect-button';
import {RootStackParamList, ScreenId} from '../navigation';
import {useStores} from '../hooks';

type ConnectionScreenRouteProp = RouteProp<RootStackParamList, ScreenId.Connection>;

export const ConnectionScreen: FC = observer(() => {
  const route = useRoute<ConnectionScreenRouteProp>();
  const {currentConnectionStore} = useStores();
  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const peerId = route.params.peerId;

  useEffect(() => {
    currentConnectionStore.setCurrentConnectionId(peerId);

    const actionSubbscription = currentConnectionStore.actions$?.subscribe(setActions);

    return () => actionSubbscription?.unsubscribe();
  }, [currentConnectionStore, peerId])

  return (
    <View style={styles.container}>
      <TabInfo peerId={peerId} />
      <DisconnectButton peerId={peerId} />
      <ActionList actions={actions} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
