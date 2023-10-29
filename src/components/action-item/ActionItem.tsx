import {ActionType} from 'browsertabs-remote-common/src/common';
import {FC, memo} from 'react';
import {Divider,List} from 'react-native-paper';

// import {ActionItemClose} from './ActionItemClose';
// import {ActionItemCreate} from './ActionItemCreate';
// import {ActionItemDecreaseZoom} from './ActionItemDecreaseZoom';
// import {ActionItemIncreaseZoom} from './ActionItemIncreaseZoom';
// import {ActionItemReload} from './ActionItemReload';
// import {ActionItemSetZoom} from './ActionItemSetZoom';
// import {ActionItemToggleMute} from './ActionItemToggleMute';

// const actionItemComponent: Record<ActionType, FC> = {
//   [ActionType.Close]: ActionItemClose,
//   [ActionType.Create]: ActionItemCreate,
//   [ActionType.DecreaseZoom]: ActionItemDecreaseZoom,
//   [ActionType.IncreaseZoom]: ActionItemIncreaseZoom,
//   [ActionType.Reload]: ActionItemReload,
//   [ActionType.SetZoom]: ActionItemSetZoom,
//   [ActionType.ToggleMute]: ActionItemToggleMute,
// };

type ActionItemProps = Readonly<{
  actionType: ActionType;
}>;

type ActionData = Readonly<{
  icon: string;
  title: string;
}>;

const actionsData: Record<ActionType, ActionData> = {
  [ActionType.Reload]: {
    icon: 'reload',
    title: 'Reload',
  },
  [ActionType.Close]: {
    icon: 'close',
    title: 'Close',
  },
  [ActionType.ToggleMute]: {
    icon: 'volume-source',
    title: 'Toggle Mute',
  },
  [ActionType.IncreaseZoom]: {
    icon: 'magnify-plus-outline',
    title: 'Increase Zoom',
  },
  [ActionType.DecreaseZoom]: {
    icon: 'magnify-minus-outline',
    title: 'Decrease Zoom',
  },
  [ActionType.SetZoom]: {
    icon: 'magnify',
    title: 'Set Zoom',
  },
  [ActionType.Create]: {
    icon: 'plus',
    title: 'Create',
  },
};

export const ActionItem: FC<ActionItemProps> = memo(function ActionItem({actionType}) {
  const actionData = actionsData[actionType];
  return (
    <>
      <List.Item
        title={actionData.title}
        left={() => <List.Icon icon={actionData.icon} />}
        right={() => <List.Icon icon={actionData.icon} />}
      />
      <Divider />
    </>
  );
});
