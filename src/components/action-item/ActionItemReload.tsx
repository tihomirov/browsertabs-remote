import {ActionType} from 'browsertabs-remote-common/src/common';
import {FC, useCallback} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {useStores} from '../../hooks';
import {styles} from './styles';

export const ActionItemReload: FC = () => {
  const {currentConnectionStore} = useStores();

  const onSendAction = useCallback(() => {
    currentConnectionStore.sendAction({
      type: ActionType.Reload
    });
  }, [currentConnectionStore]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Reload Tab</Text>
        <Button onPress={onSendAction}>Send</Button>
      </View>
    </View>
  );
};
