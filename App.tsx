import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.31.111:8999');

    // Connection opened
    socket.addEventListener('open', event => {
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', event => {
      const message: string = event.data;
      console.log('Message from server', message);
      setMessages([
        ...messages,
        message
      ])
    });
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!</Text>
      {messages.map((message, index) => (<Text key={index}>{index} - {message}</Text>))}
      <StatusBar style="auto" />
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
