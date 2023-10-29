import {ActionType} from 'browsertabs-remote-common/src/common';
import {observer} from 'mobx-react-lite';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

import {ActionItem} from '../../components/action-item';

export type ActionListProps = Readonly<{
  actions: ReadonlyArray<ActionType>;
}>;

export const ActionList: FC<ActionListProps> = observer(({actions}) => {

  return (
    <List.Section>
      <List.Subheader style={styles.subheader}>Actions</List.Subheader>
      {actions.map((action, index) => (<ActionItem key={index} actionType={action} />))}
    </List.Section>
  );
});

const styles = StyleSheet.create({
  subheader: {
    alignSelf: 'center'
  }
});
