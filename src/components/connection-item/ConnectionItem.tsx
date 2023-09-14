import {FC, useCallback} from 'react';
import {ListRenderItem, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RootStackNavigationProp, ScreenId} from '../../navigation';
import {TabInfo} from '../tab-info';

type ItemProps = Readonly<{
  peerId: string;
}>

const ConnectionItem: FC<ItemProps> = ({peerId}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPress = useCallback(() => {
    navigation.navigate(ScreenId.Connection, {
      peerId: peerId
    })
  }, [navigation, peerId])

  return (
    <Pressable onPress={onPress}>
      <TabInfo peerId={peerId} />
    </Pressable>
  )
}

export const listRenderConnectionItem: ListRenderItem<string> = ({item}) => <ConnectionItem peerId={item}  />
