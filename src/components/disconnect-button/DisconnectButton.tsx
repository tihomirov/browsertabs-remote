import {FC, useMemo, useCallback} from 'react';
import {StyleSheet, View, useColorScheme, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';


import {RootStackNavigationProp, ScreenId} from '../../navigation';
import {useStores} from '../../hooks';
import {colors} from '../../colors';

type DisconnectButtonProps = Readonly<{
  peerId: string,
}>

export const DisconnectButton: FC<DisconnectButtonProps> = ({peerId}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {connectionsStore} = useStores();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const buttonClassName = useMemo(() => [styles.button, isDarkTheme ? styles.buttonDark : styles.buttonLight], [isDarkTheme])

  const onClick = useCallback(() => {
    connectionsStore.closeConnection(peerId);
    navigation.navigate(ScreenId.Home);
  }, [connectionsStore, peerId, navigation]);

  return (
    <View style={buttonClassName}>
      <Button onPress={onClick} title="Disconnect" color="#841584"/>
    </View>
  )};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: '10%',
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
