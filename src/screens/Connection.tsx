import {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const ConnectionScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Connection Screen</Text>
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
