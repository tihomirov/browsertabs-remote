import {FC, useCallback} from 'react';
import {StyleSheet, View, useColorScheme, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RootStackNavigationProp, ScreenId} from '../../navigation';
import {colors} from '../../colors';

export const AddConnectionButton: FC = () => {
  const theme = useColorScheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const isDarkTheme = theme === 'dark';

  const navigateToAddConnection = useCallback(() => navigation.navigate(ScreenId.AddConnection), [navigation])

  return (
    <View style={[styles.button, isDarkTheme ? styles.buttonDark : styles.buttonLight]}>
      <Button
        title="Add Connection"
        onPress={navigateToAddConnection}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
