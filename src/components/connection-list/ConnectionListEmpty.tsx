import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react-lite';

import {useStores} from '../../hooks';

export type RootStackParamList = {
  Home: undefined;
  AddConnection: undefined;
};

export const ConnectionListEmpty: FC = observer(() => {
  const {connectionsStore} = useStores();

  if (connectionsStore.connections.length > 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>No connections yet.</Text>
      <Text>Click on Add Connection to add items here.</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
