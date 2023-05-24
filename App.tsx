import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const s = new WebSocket('ws://192.168.31.111:8999');
    setSocket(s);

    // Connection opened
    s.addEventListener('open', event => {
      s.send('Hello Server!');
    });

    // Listen for messages
    s.addEventListener('message', event => {
      const message: string = event.data;
      console.log('Message from server', message);
      setMessages([
        ...messages,
        message
      ])
    });

    return () => s.close();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>Socket readyState - {socket?.readyState ?? 'NO SOCKET'}</Text>
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
