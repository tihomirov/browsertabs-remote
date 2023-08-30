import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';


export const AddConnection: FC = observer(() => {
  // const {connectionsStore} = useStores();
  // const [peerId, setPeerId] = useState('');

  // const onPressConnect = useCallback(() => {
  //   connectionsStore.connection(peerId);
  // }, [connectionsStore, peerId]);

  // const onPressClose = useCallback(() => {
  //   connectionsStore.close(peerId);
  // }, [connectionsStore, peerId]);

  return (
    <View style={styles.container}>
      <Text>AddConnection 111</Text>
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
