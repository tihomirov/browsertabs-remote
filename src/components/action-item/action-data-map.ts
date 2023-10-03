import {Action,ActionType} from 'browsertabs-remote-common/src/common';
import {FC} from 'react';

import {CreateActionData} from './CreateActionData';
import {SetZoomActionData} from './SetZoomActionData';

type ActionDataProps = Readonly<{
  onDataChange: (data: Action) => void;
}>;

export const actionDataMap: Record<ActionType, {
  title: string;
  initialState: Action;
  ActionDataComponent?: FC<ActionDataProps>;
}> = {
  [ActionType.Create]: {
    title: 'Create New Tab',
    initialState: {type: ActionType.Create, url: ''},
    ActionDataComponent: CreateActionData,
  },
  [ActionType.SetZoom]: {
    title: 'Set Custom Zoom',
    initialState: {type: ActionType.SetZoom, zoomFactor: 0},
    ActionDataComponent: SetZoomActionData,
  },
  [ActionType.Close]: {
    title: 'Close Tab',
    initialState: {type: ActionType.Close}
  },
  [ActionType.DecreaseZoom]: {
    title: 'Decrease Zoom',
    initialState: {type: ActionType.DecreaseZoom}
  },
  [ActionType.IncreaseZoom]: {
    title: 'Increase Zoom',
    initialState: {type: ActionType.IncreaseZoom}
  },
  [ActionType.Reload]: {
    title: 'Reload Tab',
    initialState: {type: ActionType.Reload}
  },
  [ActionType.ToggleMute]: {
    title: 'Toggle Mute',
    initialState: {type: ActionType.ToggleMute}
  },
};
