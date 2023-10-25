import {ActionType} from 'browsertabs-remote-common/src/common';
import {FC, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

import {useStores} from '../../hooks';
import {styles} from './styles';

export const ActionItemCreate: FC = () => {
  const {currentConnectionStore} = useStores();
  const [url, setUrl] = useState<string>('');
  const [inputError, setInputError] = useState(false);

  const onSendAction = useCallback(() => {
    if (!url) {
      setInputError(true);
      return;
    }

    currentConnectionStore.sendAction({
      type: ActionType.Create,
      url,
    });
  }, [url, currentConnectionStore]);

  useEffect(() => {
    if (url) {
      setInputError(false);
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Create New Tab</Text>
        <Button onPress={onSendAction}>Send</Button>
      </View>
      <View>
        <TextInput
          label="URL"
          onChangeText={setUrl}
          value={url}
          error={inputError}
        />
      </View>
    </View>
  );
};
