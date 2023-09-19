import {FC, useCallback} from 'react';
import {View, ListRenderItem, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Action, ActionType} from 'browsertabs-remote-common/src/common';

import {RootStackNavigationProp} from '../../navigation';

export type ActionItemProps = Readonly<{
  action: Action;
}>;

const actionTitleMap: Record<ActionType, string> = {
  [ActionType.Close]: 'Close Tab',
  [ActionType.Create]: 'Create New Tab',
  [ActionType.DecreaseZoom]: 'Decrease Zoom',
  [ActionType.IncreaseZoom]: 'Increase Zoom',
  [ActionType.Reload]: 'Reload Tab',
  [ActionType.SetZoom]: 'Set Custom Zoom',
  [ActionType.ToggleMute]: 'Toggle Mute',
}

const ActionItem: FC<ActionItemProps> = ({action}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPress = useCallback(() => {
    console.log('Click on Action', action)
  }, [navigation, action])

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text>{actionTitleMap[action.type]}</Text>
      </View>
    </Pressable>
  )
}

export const listRenderActionItem: ListRenderItem<Action> = ({item}) => <ActionItem action={item}  />

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dfe5eb',
    borderWidth: 1,
    borderRadius: 4,
  },
});

