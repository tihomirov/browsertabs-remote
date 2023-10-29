import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {FC, useCallback, useState} from 'react';
import {View} from 'react-native';
import {IconButton, Menu} from 'react-native-paper';

import {useStores} from '../hooks';
import {RootStackNavigationProp, RootStackParamList, ScreenId} from '../navigation';

type ConnectionScreenRouteProp = RouteProp<RootStackParamList, ScreenId.Connection>;

export const ConnectionHeaderRight: FC = () => {
  const route = useRoute<ConnectionScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {connectionsStore} = useStores();
  const [visible, setVisible] = useState(false);
  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);
  const peerId = route.params.peerId;

  const onDisconnect = useCallback(() => {
    connectionsStore.closeConnection(peerId);
    navigation.navigate(ScreenId.Home);
  }, [connectionsStore, peerId, navigation]);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="menu" onPress={openMenu} />}
      >
        <Menu.Item onPress={onDisconnect} title="Disconnect" />
      </Menu>
    </View>
  );
};
