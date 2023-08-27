import type {DataConnection} from 'peerjs';
import {makeObservable, observable, runInAction, computed} from 'mobx';

import { connectionService } from '../services/connection-service';

export class ConnectionStore {
  private readonly _connections: Set<DataConnection> = observable.set();

  constructor() {
    makeObservable(this);
  }

  async connection(peerId: string): Promise<void> {
    const connection = await connectionService.addTabConnection(peerId);

    runInAction(() => {
      this._connections.add(connection);
		});
  }

  async close(peerId: string): Promise<void> {
    const closedConnection = await connectionService.closeTabConnection(peerId);

    runInAction(() => {
      this._connections.delete(closedConnection);
		});
  }

  @computed
  get hasConnections(): boolean {
    return this._connections.size > 0;
  }
}
