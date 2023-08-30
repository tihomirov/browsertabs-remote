import {FC} from 'react';
import {Text, View, FlatList, Button, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';

import {ConnectionItem} from '../../components/connection-item';
import {useStores} from '../../hooks';

export const ConnectionList: FC = observer(() => {
  const {connectionsStore} = useStores();

  if (connectionsStore.connections.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No connection yet.</Text>
        <Button
          title="Add Connection"
          onPress={() => console.log('Open new page')}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={connectionsStore.connections}         
      renderItem={({item}) => <ConnectionItem connection={item[1]}  />}
      keyExtractor={item => item[0]} 
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
