import {FC, useCallback, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {observer} from 'mobx-react-lite';

import {useStores} from '../hooks';

export const AddConnection: FC = observer(() => {
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
