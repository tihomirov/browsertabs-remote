import { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {observer} from 'mobx-react-lite';

import { useStores } from '../../hooks';

export const Home: FC = observer(() => {
  const {connectionStore} = useStores();
  const [peerId, setPeerId] = useState('');

  const onPressConnect = useCallback(() => {
    connectionStore.connection(peerId);
  }, [connectionStore, peerId]);

  const onPressClose = useCallback(() => {
    connectionStore.close(peerId);
  }, [connectionStore, peerId]);

  return (
      <View style={styles.container}>
        <Text>2 Open up App.js to start working on your app!</Text>
        <TextInput style={styles.input} onChangeText={setPeerId} value={peerId} />
        <Button onPress={onPressConnect} title="Connect" color="#841584"/>
        {connectionStore.hasConnections && (
          <Button onPress={onPressClose} title="Close" color="#841584"/>
        )}
      </View>
  );
});

const styles = StyleSheet.create({
  container: {
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
