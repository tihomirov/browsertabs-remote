import {ActionType} from 'browsertabs-remote-common/src/common';
import {FC, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

import {useStores} from '../../hooks';
import {styles} from './styles';

export const ActionItemSetZoom: FC = () => {
  const {currentConnectionStore} = useStores();
  const [zoomValue, setValueFactor] = useState<string>('');
  const [inputError, setInputError] = useState(false);

  const onSendAction = useCallback(() => {
    const zoomFactor = parseInt(zoomValue);

    if (!zoomFactor) {
      setInputError(true);
      return;
    }

    currentConnectionStore.sendAction({
      type: ActionType.SetZoom,
      zoomFactor,
    });
  }, [zoomValue, currentConnectionStore]);

  useEffect(() => {
    if (zoomValue) {
      setInputError(false);
    }
  }, [zoomValue]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Create New Tab</Text>
        <Button onPress={onSendAction}>Send</Button>
      </View>
      <View>
        <TextInput
          label="Zoom"
          onChangeText={setValueFactor}
          value={zoomValue}
          error={inputError}
        />
      </View>
    </View>
  );
};
