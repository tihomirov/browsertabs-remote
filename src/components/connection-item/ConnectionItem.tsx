import {FC, useCallback, useEffect} from 'react';
import {ListRenderItem, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RootStackNavigationProp, ScreenId} from '../../navigation';
import {TabInfo} from '../tab-info';
import {useStores} from '../../hooks';

type ItemProps = Readonly<{
  peerId: string;
}>

const ConnectionItem: FC<ItemProps> = ({peerId}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {connectionsStore} = useStores();

  const onPress = useCallback(() => {
    navigation.navigate(ScreenId.Connection, {
      peerId: peerId
    })
  }, [navigation, peerId]);

  useEffect(() => {
    const closeSubbscription = connectionsStore.getConnectionClose$(peerId)?.subscribe(
      () => connectionsStore.closeConnection(peerId)
    );

    return () => {
      closeSubbscription?.unsubscribe();
    }
  }, [connectionsStore, peerId])

  return (
    <Pressable onPress={onPress}>
      <TabInfo peerId={peerId} />
    </Pressable>
  )
}

export const listRenderConnectionItem: ListRenderItem<string> = ({item}) => <ConnectionItem peerId={item}  />
