import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Loader} from '../../components/loader';
import {Connection} from '../../services';
import {TabInfo} from '../../types';

type ItemProps = Readonly<{
  connection: Connection,
}>

export const ConnectionItem: FC<ItemProps> = ({connection}) => {
  const [tabInfo, setTabInfo] = useState<TabInfo | undefined>(undefined);

  useEffect(() => {
    const subbscription = connection.tabInfo$.subscribe(setTabInfo);

    return () => subbscription.unsubscribe();
  }, [connection])

  if (!tabInfo) {
    return (
      <View style={styles.item}>
        <Loader size="small" />
      </View>
    )
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{tabInfo.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
