import {FC, useCallback} from 'react';
import {Text, View, FlatList, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

import {ConnectionItem} from '../../components/connection-item';
import {useStores} from '../../hooks';
import {RootStackNavigationProp} from '../../navigation';

export type RootStackParamList = {
  Home: undefined;
  AddConnection: undefined;
};

export const ConnectionList: FC = observer(() => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {connectionsStore} = useStores();

  const navigateToAddConnection = useCallback(() => navigation.navigate('AddConnection'), [navigation])

  if (connectionsStore.connections.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No connection yet.</Text>
        <Button
          title="Add Connection"
          onPress={navigateToAddConnection}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={connectionsStore.connections}         
      renderItem={({item}) => <ConnectionItem connection={item[1]}  />}
      keyExtractor={item => item[0]} 
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
