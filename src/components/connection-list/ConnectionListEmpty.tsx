import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, MD3Colors,Text} from 'react-native-paper';

export type RootStackParamList = {
  Home: undefined;
  AddConnection: undefined;
};

export const ConnectionListEmpty: FC = () => {
  return (
    <View style={styles.container}>
      <Icon
        source="remote-off"
        color={MD3Colors.neutral80}
        size={40}
      />
      <Text variant="headlineMedium">No connections yet.</Text>
      <Text variant="titleMedium">Click on Add Connection to add items here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
  },
});
