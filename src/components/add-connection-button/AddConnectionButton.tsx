import {useNavigation} from '@react-navigation/native';
import {FC, useCallback} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

import {RootStackNavigationProp, ScreenId} from '../../navigation';

export const AddConnectionButton: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const navigateToAddConnection = useCallback(
    () => navigation.navigate(ScreenId.AddConnection),
    [navigation]
  );

  return (
    <View>
      <Button mode="contained" onPress={navigateToAddConnection}>
        Add Connection
      </Button>
    </View>
  );
};
