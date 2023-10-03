import {Action,ActionType} from 'browsertabs-remote-common/src/common';
import {FC, useCallback, useMemo, useState} from 'react';
import {Button,ListRenderItem, StyleSheet, Text, View} from 'react-native';

import {useStores} from '../../hooks';
import {actionDataMap} from './action-data-map';

type ActionItemProps = Readonly<{
  actionType: ActionType;
}>;

const ActionItem: FC<ActionItemProps> = ({actionType}) => {
  const {currentConnectionStore} = useStores();
  const {title, ActionDataComponent, initialState} = useMemo(() => actionDataMap[actionType], [actionType]);
  const [actionData, setActionData] = useState<Action>(initialState);

  const onSendAction = useCallback(() => {
    currentConnectionStore.sendAction(actionData);
  }, [actionData, currentConnectionStore]);

  const onDataChange = useCallback((actionData: Action) => {
    setActionData(actionData);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>{title}</Text>
        <Button title="Send" onPress={onSendAction}/>
      </View>
      <View style={styles.bottom}>
        {ActionDataComponent && (
          <ActionDataComponent onDataChange={onDataChange} />
        )}
      </View>
    </View>
  );
};

export const listRenderActionItem: ListRenderItem<ActionType> = ({item}) => <ActionItem actionType={item}  />;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '10%',
    marginVertical: 8,
    paddingHorizontal: 8,
    borderColor: '#dfe5eb',
    borderWidth: 1,
    borderRadius: 4,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom: {

  }
});
