import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {RootStack} from './navigation/RootStack';
import {RootStore, StoreProvider} from './stores';

const rootStore = new RootStore();

export const App: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StoreProvider store={rootStore}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </StoreProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 8,
  },
});
