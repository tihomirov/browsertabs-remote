import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';

import {Connection} from '../../services';
import {useStores} from '../../hooks';

type ItemProps = Readonly<{
  connection: Connection,
}>

const Item: FC<ItemProps> = ({connection}) => {
  const [tabTitle, setTabTitle] = useState('');

  useEffect(() => {
    connection.tabInfo$.subscribe((tabInfo) => {
      setTabTitle(tabInfo.title);
    })
  }, [connection])

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{tabTitle}</Text>
    </View>
  )
}

export const ConnectionList: FC = observer(() => {
  const {connectionsStore} = useStores();

  return (
    <FlatList
      data={connectionsStore.connections}         
      renderItem={({item}) => <Item connection={item[1]}  />}
      keyExtractor={item => item[0]} 
    />
  );
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
