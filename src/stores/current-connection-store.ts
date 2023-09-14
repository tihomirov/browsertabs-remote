import {makeObservable, observable, runInAction, computed} from 'mobx';
import {Action} from 'browsertabs-remote-common/src/common';
import {IDeviceConnection} from 'browsertabs-remote-common/src/device';
import {Observable} from 'rxjs';

import {connectionsService} from '../services';
import {TabInfo} from '../types';

export class CurrentConnectionStore {
  @observable
  private _currentConnection: IDeviceConnection | undefined = undefined;

  constructor() {
    makeObservable(this);
  }

  @computed
  get tabInfo$(): Observable<TabInfo> | undefined {
    return this._currentConnection?.tabInfo$;
  }

  @computed
  get actions$(): Observable<ReadonlyArray<Action>> | undefined {
    return this._currentConnection?.actions$;
  }

  setCurrentConnectionId(peerId: string) {
    const connection = connectionsService.getConnection(peerId);

    runInAction(() => this._currentConnection = connection);
  }
}
