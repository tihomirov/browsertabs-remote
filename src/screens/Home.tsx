import {FC, useCallback, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {observer} from 'mobx-react-lite';

import {ConnectionList} from '../components/connection-list';
import {useStores} from '../hooks';

export const HomeScreen: FC = observer(() => {
  const {connectionsStore} = useStores();
  const [peerId, setPeerId] = useState('');

  const onPressConnect = useCallback(() => {
    connectionsStore.connection(peerId);
  }, [connectionsStore, peerId]);

  const onPressClose = useCallback(() => {
    connectionsStore.close(peerId);
  }, [connectionsStore, peerId]);

  return (
    <View style={styles.container}>
      <Text>1 Open up App.js to start working on your app!</Text>
      <TextInput style={styles.input} onChangeText={setPeerId} value={peerId} />
      <Button onPress={onPressConnect} title="Connect" color="#841584"/>
      {connectionsStore.hasConnections && (
        <Button onPress={onPressClose} title="Close" color="#841584"/>
      )}
      <ConnectionList />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
