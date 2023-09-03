import {FC} from 'react';
import {StyleSheet, View, ActivityIndicator, ActivityIndicatorProps} from 'react-native';

type LoaderProps = Readonly<{
  size: ActivityIndicatorProps['size'],
}>

export const Loader: FC<LoaderProps> = ({size}) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color="#116DFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
