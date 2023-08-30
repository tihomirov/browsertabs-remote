import {FC} from 'react';
import {StyleSheet, View, ActivityIndicator, ActivityIndicatorProps} from 'react-native';

type LoaderProps = Readonly<{
  size: ActivityIndicatorProps['size'],
}>

export const Loader: FC<LoaderProps> = ({size}) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={size} color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
