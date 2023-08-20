import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Peer from 'react-native-peerjs';

const peer = new Peer();

export default function App() {
  const [peerId, setPeerId] = useState('');
  const [connection, setConnection] = useState();

  const onPressConnect = useCallback(() => {
    console.log('Peer connect ' + peerId); 
    const conn = peer.connect(peerId);
    setConnection(conn);

    conn.on('open', () => {
      console.log('Peer!!! open');
      conn.send('hi - ' + count);
    });
  }, [peerId]);

  const onPressClose = useCallback(() => {
    if (!connection) {
      return;
    }

    connection.close();
  }, [connection]);

  return (
    <View style={styles.container}>
      <Text>2 Open up App.js to start working on your app!</Text>
      <TextInput style={styles.input} onChangeText={setPeerId} value={peerId} />
      <Button onPress={onPressConnect} title="Connect" color="#841584"/>
      {connection && (
        <Button onPress={onPressClose} title="Close" color="#841584"/>
      )}
    </View>
  );
}

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
