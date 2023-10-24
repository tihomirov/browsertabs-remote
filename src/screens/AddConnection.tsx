import {StackActions, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, MD3Colors, Text, TextInput} from 'react-native-paper';

import {useStores} from '../hooks';
import {RootStackNavigationProp, ScreenId} from '../navigation';
import {QrCodeCamera} from './QrCodeCamera';

export const AddConnectionScreen: FC = observer(() => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {connectionsStore} = useStores();
  const [peerId, setPeerId] = useState('');
  const [inputError, setInputError] = useState(false);

  const onPressConnect = useCallback(() => {
    if (!peerId) {
      setInputError(true);
      return;
    }

    connectionsStore.createConnection(peerId);
    navigation.dispatch(StackActions.replace(ScreenId.Connection, {
      peerId: peerId
    }));
  }, [connectionsStore, peerId, navigation]);

  useEffect(() => {
    if (peerId) {
      setInputError(false);
    }
  }, [peerId]);

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">Scan QR from chrome extention</Text>

      <View style={styles.cameraContainer}>
        <QrCodeCamera />
      </View>

      <View style={styles.inputContainer}>
        <Divider />
        <Text variant="bodyMedium">Or you can type Connection ID manually in input below</Text>
        <TextInput
          label="Connection ID"
          onChangeText={setPeerId}
          value={peerId}
          error={inputError}
        />
        {inputError && (
          <Text style={styles.errorLabel} variant="labelMedium">Field is requiered</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onPressConnect}>
          Connect
        </Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  cameraContainer: {
    width: '100%',
    height: '50%',
  },
  inputContainer: {
    padding: 8,
    width: '100%',
    display: 'flex',
    gap: 8,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: '10%',
  },
  errorLabel: {
    color: MD3Colors.error40,
  },
});
