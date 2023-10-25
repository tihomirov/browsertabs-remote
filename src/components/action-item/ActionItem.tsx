import {ActionType} from 'browsertabs-remote-common/src/common';
import {FC} from 'react';
import {ListRenderItem} from 'react-native';

import {ActionItemClose} from './ActionItemClose';
import {ActionItemCreate} from './ActionItemCreate';
import {ActionItemDecreaseZoom} from './ActionItemDecreaseZoom';
import {ActionItemIncreaseZoom} from './ActionItemIncreaseZoom';
import {ActionItemReload} from './ActionItemReload';
import {ActionItemSetZoom} from './ActionItemSetZoom';
import {ActionItemToggleMute} from './ActionItemToggleMute';

const actionItemComponent: Record<ActionType, FC> = {
  [ActionType.Close]: ActionItemClose,
  [ActionType.Create]: ActionItemCreate,
  [ActionType.DecreaseZoom]: ActionItemDecreaseZoom,
  [ActionType.IncreaseZoom]: ActionItemIncreaseZoom,
  [ActionType.Reload]: ActionItemReload,
  [ActionType.SetZoom]: ActionItemSetZoom,
  [ActionType.ToggleMute]: ActionItemToggleMute,
};

export const listRenderActionItem: ListRenderItem<ActionType> = (
  {item}
) => {
  const Component = actionItemComponent[item];

  return <Component />;
};
