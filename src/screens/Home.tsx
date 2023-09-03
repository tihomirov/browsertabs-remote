import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {ConnectionList} from '../components/connection-list';

export const HomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <ConnectionList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
