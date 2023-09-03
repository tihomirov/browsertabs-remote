import {FC} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';

import {listRenderConnectionItem} from '../../components/connection-item';
import {AddConnectionButton} from '../../components/add-connection-button';
import {useStores} from '../../hooks';
import {ConnectionListEmpty} from './ConnectionListEmpty';

export type RootStackParamList = {
  Home: undefined;
  AddConnection: undefined;
};

export const ConnectionList: FC = observer(() => {
  const {connectionsStore} = useStores();

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <ConnectionListEmpty />
        <FlatList
          data={connectionsStore.connections}         
          renderItem={listRenderConnectionItem}
          keyExtractor={item => item[0]} 
        />
      </View>
      <AddConnectionButton />
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
  }
});
