import {FC, useCallback} from 'react';
import {View, FlatList, StyleSheet, ListRenderItem, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Action} from 'browsertabs-remote-common/src/common';

import {RootStackNavigationProp} from '../../navigation';

export type ActionListProps = Readonly<{
  actions: ReadonlyArray<Action>;
}>;

export type ActionItemProps = Readonly<{
  action: Action;
}>;

const ActionItem: FC<ActionItemProps> = ({action}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPress = useCallback(() => {
    console.log('Click on Action', action)
  }, [navigation, action])

  return (
    <Pressable onPress={onPress}>
      <View>
        <Text>Action: ${action.type}</Text>
      </View>
    </Pressable>
  )
}

const listRenderActionItem: ListRenderItem<Action> = ({item}) => <ActionItem action={item}  />

export const ActionList: FC<ActionListProps> = observer(({actions}) => {

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={actions}         
          renderItem={listRenderActionItem}
          keyExtractor={item => item.type.toString()} 
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    paddingVertical: 12,
    justifyContent: 'space-between',
    gap: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    paddingHorizontal: '10%',
  }
});
