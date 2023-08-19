import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Peer from 'react-native-peerjs';

let inited = false

export default function App() {

  useEffect(() => {
    if (!inited) {
      const peer = new Peer('0296b895-b0a8-96a9-cae1-fcc0ced0119R');

      peer.on('error', console.log);

      peer.on('open', localPeerId => {
        console.log('Local peer open with ID', localPeerId);
      });

      peer.on('connection', conn => {
        console.log('Local peer has received connection.', conn);

        conn.on('error', console.log);

        conn.on('data', data => console.log('Received from remote peer', data));

        conn.on('open', () => {
          console.log('Local peer has opened connection.');
          console.log('conn', conn);

          let count = 0;
          setInterval(() => {
            console.log('Local peer sending data.', count);        
            conn.send('Hello, this is the LOCAL peer! - ' + count);
            count++;
          }, 1000)
        });
      });

			inited = true;
		}

  }, [])

  return (
    <View style={styles.container}>
      <Text>4 Open up App.js to start working on your app!</Text>
      {/* <StatusBar style="auto" /> */}
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
});
