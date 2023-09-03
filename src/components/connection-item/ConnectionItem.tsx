import {FC, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, Image, ListRenderItem, useColorScheme} from 'react-native';

import {Loader} from '../../components/loader';
import {Connection} from '../../services';
import {TabInfo} from '../../types';
import {colors} from '../../colors';

type ItemProps = Readonly<{
  connection: Connection,
}>

const ConnectionItem: FC<ItemProps> = ({connection}) => {
  const theme = useColorScheme();
  const [tabInfo, setTabInfo] = useState<TabInfo | undefined>(undefined);
  const isDarkTheme = theme === 'dark';

  const itemClassName = useMemo(() => [styles.item, isDarkTheme ? styles.itemDark : styles.itemLight], [isDarkTheme])
  const titleClassName = useMemo(() => [styles.title, isDarkTheme ? styles.titleDark : styles.titleLight], [isDarkTheme])

  useEffect(() => {
    const subbscription = connection.tabInfo$.subscribe(setTabInfo);

    return () => subbscription.unsubscribe();
  }, [connection])

  if (!tabInfo) {
    return (
      <View style={itemClassName}>
        <Loader size="small" />
      </View>
    )
  }

  return (
    <View style={itemClassName}>
      {tabInfo.favIconUrl && (
        <Image source={{uri: tabInfo.favIconUrl}} style={{width: 16, height: 16}} />
      )}
      <Text style={titleClassName}>{tabInfo.title}</Text>
    </View>
  )
}

export const listRenderConnectionItem: ListRenderItem<[string, Connection]> = ({item}) => <ConnectionItem connection={item[1]}  />

const styles = StyleSheet.create({
  item: {
    width: '100%',
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
  itemLight: {
    backgroundColor: colors.backgroundColorLight,
    color: colors.fontColorLight,
  },
  itemDark: {
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
