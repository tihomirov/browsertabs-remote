import {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {RootStore, StoreProvider} from './stores';
import {Home} from './screens';

const rootStore = new RootStore();

export const App: FC = () => {
  return (
    <StoreProvider store={rootStore}>
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
