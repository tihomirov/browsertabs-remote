import {useNavigation} from '@react-navigation/native';
import {FC, useCallback} from 'react';
import {Button,StyleSheet, useColorScheme, View} from 'react-native';

import {colors} from '../../colors';
import {RootStackNavigationProp, ScreenId} from '../../navigation';

export const AddConnectionButton: FC = () => {
  const theme = useColorScheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const isDarkTheme = theme === 'dark';

  const navigateToAddConnection = useCallback(
    () => navigation.navigate(ScreenId.AddConnection),
    [navigation]
  );

  return (
    <View style={[styles.button, isDarkTheme ? styles.buttonDark : styles.buttonLight]}>
      <Button
        title="Add Connection"
        onPress={navigateToAddConnection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
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
