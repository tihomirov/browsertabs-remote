import {RouteProp, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {ActionType} from 'browsertabs-remote-common/src/common';
import {observer} from 'mobx-react-lite';
import {FC, useEffect, useState} from 'react';
import {ScrollView,StyleSheet} from 'react-native';

import {ActionList} from '../components/action-list';
import {TabInfo} from '../components/tab-info';
import {useStores} from '../hooks';
import {RootStackNavigationProp, RootStackParamList, ScreenId} from '../navigation';

type ConnectionScreenRouteProp = RouteProp<RootStackParamList, ScreenId.Connection>;

export const ConnectionScreen: FC = observer(() => {
  const route = useRoute<ConnectionScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {currentConnectionStore, connectionsStore} = useStores();
  const [actions, setActions] = useState<ReadonlyArray<ActionType>>([]);
  const peerId = route.params.peerId;

  useEffect(() => {
    const connection = connectionsStore.getConnection(peerId);

    if (!connection) {
      return;
    }

    currentConnectionStore.setCurrentConnection(connection);

    const actionSubbscription = connection.actions$?.subscribe(setActions);
    const closeSubbscription = connection.close$?.subscribe(() => {
      currentConnectionStore.clearCurrentConnection();
      connectionsStore.closeConnection(peerId);
      navigation.navigate(ScreenId.Home);
    });

    return () => {
      currentConnectionStore.clearCurrentConnection();
      actionSubbscription?.unsubscribe();
      closeSubbscription?.unsubscribe();
    };
  }, [currentConnectionStore, connectionsStore, peerId]);

  return (
    <ScrollView style={styles.container}>
      <TabInfo peerId={peerId} />
      <ActionList actions={actions} />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
