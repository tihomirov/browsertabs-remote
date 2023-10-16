import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import {AppRegistry,SafeAreaView, StyleSheet} from 'react-native';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';

import {expo} from '../app.json';
import {RootStack} from './navigation/RootStack';
import {RootStore, StoreProvider} from './stores';

const rootStore = new RootStore();

const theme = {
  ...MD3LightTheme,
};

export const App: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StoreProvider store={rootStore}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(expo.name, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 8,
  },
});
