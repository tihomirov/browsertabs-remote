import {FC, useCallback, useState, useMemo} from 'react';
import {StyleSheet, Text, View, TextInput, Button, useColorScheme} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';

import {RootStackNavigationProp, ScreenId} from '../navigation';
import {colors} from '../colors';
import {useStores} from '../hooks';

export const AddConnectionScreen: FC = observer(() => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {connectionsStore} = useStores();
  const [peerId, setPeerId] = useState('');
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const buttonClassName = useMemo(() => [styles.button, isDarkTheme ? styles.buttonDark : styles.buttonLight], [isDarkTheme])

  const onPressScanQR = useCallback(() => {
    console.log('Open Camera and scan QR')
  }, []);

  const onPressConnect = useCallback(() => {
    if (!peerId) {
      return;
    }

    connectionsStore.connection(peerId);
    navigation.navigate(ScreenId.Connection, {
      peerId: peerId
    })
  }, [connectionsStore, peerId, navigation]);

  const onPressClose = useCallback(() => {
    connectionsStore.close(peerId);
  }, [connectionsStore, peerId]);

  return (
    <View style={styles.container}>
      <View style={buttonClassName}>
        <Button onPress={onPressScanQR}  title="Scan QR code" />
      </View>

      <Text>or you can type Connection ID manually in input below</Text>
      <TextInput style={styles.input} onChangeText={setPeerId} value={peerId} />

      <View style={buttonClassName}>
        <Button onPress={onPressConnect} title="Connect" color="#841584"/>
      </View>
      
      {connectionsStore.hasConnections && (
        <Button onPress={onPressClose} title="Close" color="#841584"/>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: '80%',
    padding: 4,
    marginVertical: 4,
    borderColor: '#dfe5eb',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonLight: {
    backgroundColor: colors.backgroundColorLight,
    color: colors.fontColorLight,
  },
  buttonDark: {
    backgroundColor: colors.backgroundColorDark,
    color: colors.fontColorDark,
  },
});
