import {FC, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, useColorScheme,View} from 'react-native';

import {colors} from '../../colors';
import {useStores} from '../../hooks';
import {TabInfo as TabInfoType} from '../../types';
import {Loader} from '../loader';

type TabInfoProps = Readonly<{
  peerId: string,
}>;

export const TabInfo: FC<TabInfoProps> = ({peerId}) => {
  const {connectionsStore} = useStores();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [tabInfo, setTabInfo] = useState<TabInfoType | undefined>(undefined);

  const containerClassName = useMemo(() => [styles.container, isDarkTheme ? styles.containerDark : styles.containerLight], [isDarkTheme]);
  const titleClassName = useMemo(() => [styles.title, isDarkTheme ? styles.titleDark : styles.titleLight], [isDarkTheme]);

  useEffect(() => {
    const subbscription = connectionsStore.getTabInfo$(peerId)?.subscribe(setTabInfo);
    return () => subbscription?.unsubscribe();
  }, [peerId]);

  if (!tabInfo) {
    return (
      <View style={containerClassName}>
        <Loader size={20} />
      </View>
    );
  }

  return (
    <View style={containerClassName}>
      {tabInfo.favIconUrl && (
        <Image source={{uri: tabInfo.favIconUrl}} style={{width: 16, height: 16}} />
      )}
      <Text style={titleClassName}>{tabInfo.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
    borderColor: '#dfe5eb',
    borderWidth: 1,
    borderRadius: 4,
  },
  containerLight: {
    backgroundColor: colors.backgroundColorLight,
    color: colors.fontColorLight,
  },
  containerDark: {
    backgroundColor: colors.backgroundColorDark,
    color: colors.fontColorDark,
  },
  title: {
    fontSize: 16,
  },
  titleLight: {
    color: colors.fontColorLight,
  },
  titleDark: {
    color: colors.fontColorDark,
  },
});
