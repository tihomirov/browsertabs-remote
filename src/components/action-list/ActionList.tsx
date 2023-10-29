import {ActionType} from 'browsertabs-remote-common/src/common';
import {observer} from 'mobx-react-lite';
import {FC} from 'react';
import {FlatList, StyleSheet,View} from 'react-native';

import {listRenderActionItem} from '../../components/action-item';

export type ActionListProps = Readonly<{
  actions: ReadonlyArray<ActionType>;
}>;

export const ActionList: FC<ActionListProps> = observer(({actions}) => {

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          scrollEnabled={false}
          data={actions}
          renderItem={listRenderActionItem}
          keyExtractor={item => item.toString()}
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
  },
  listContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    paddingHorizontal: '10%',
  }
});
