import {makeObservable, observable, runInAction, computed} from 'mobx';
import {IDeviceConnection} from 'browsertabs-remote-common/src/device';
import {Observable} from 'rxjs';

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

  setCurrentConnection(connection: IDeviceConnection) {
    runInAction(() => this._currentConnection = connection);
  }

  clearCurrentConnection() {
    runInAction(() => this._currentConnection = undefined);
  }
}
